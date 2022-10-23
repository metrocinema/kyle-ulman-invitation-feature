import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const code: string = params.invitationCode;

	if (code.length !== 6) {
		return {
			status: 400,
			ret: `No invitation found with code ${code}`,
			code
		};
	}

	const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);
	const ret = await res.json();

	if (res.status !== 200) {
		return { status: res.status, ret: ret.errorMessage, code };
	}

	return { status: 200, ret, code };
};
