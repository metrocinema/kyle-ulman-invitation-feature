import type { PageLoad } from './$types';

// export const load: PageLoad = async ({ params, fetch }) => {
// 	const start = performance.now();

// 	const code: string = params.invitationCode;
// 	const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);
// 	const ret = await res.json();

// 	if (ret) {
// 		const end = performance.now();
// 		console.log(`Module: ${end - start}`);
// 	}
// 	// return ret;
// };
// * 296ms
// * 290ms
