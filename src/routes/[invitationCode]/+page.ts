import type { PageLoad, Actions } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const code: string = params.invitationCode;

	const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);

	const ret = await res.json();

	return ret;
};

export const actions: Actions = {};
