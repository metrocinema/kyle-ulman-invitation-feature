import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const CODE: string = params.invitationCode;

	if (CODE.length !== 6) {
		throw error(400, {
			message: `No invitation found with code '${CODE}'`
		});
	}

	const DATA = await getInvitation(CODE);

	return { ...DATA, code: CODE };
};

async function getInvitation(CODE: string) {
	const RES = await fetch(`${import.meta.env.VITE_API_URL}/${CODE}`);
	const RET = await RES.json();

	if (RES.status !== 200) {
		throw error(RES.status, { message: RET.error.errorMessage });
	}

	return RET.data;
}
