import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const start = performance.now(); // ! TESTING

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

	return { ...RET.data, code: CODE, start };
};
