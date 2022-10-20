import type { PageServerLoad, Actions } from './$types';

// export const load: PageServerLoad = async ({ params, fetch }) => {
// 	const start = performance.now();

// 	const code: string = params.invitationCode;
// 	const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);
// 	const ret = await res.json();

// 	if (ret) {
// 		const end = performance.now();
// 		console.log(`Server: ${end - start}`);
// 	}

// 	// return ret;
// };
// * 307ms
// * 298ms

export const actions: Actions = {
	default: () => {
		// Do something
	}
};
