import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch, setHeaders }) => {
	const CODE: string = params.invitationCode;

	if (CODE.length !== 6) {
		throw error(400, {
			message: `No invitation found with code '${CODE}'`
		});
	}

	const RES = await fetch(`${import.meta.env.VITE_API_URL}/${CODE}`);
	const RET = await RES.json();

	if (RES.status !== 200) {
		throw error(RES.status, { message: RET.errorMessage });
	}

	const maxAge = 60 * 60 * 6; // 6 hours

	setHeaders({
		'cache-control':
			RES.headers.get('cache-control') || `public, max-age=${maxAge}`
	});

	return { ...RET.data, code: CODE };
};
