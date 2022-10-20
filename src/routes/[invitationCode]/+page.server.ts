import type { PageServerLoad, Actions } from './$types';

// ? Why arrow function works?
export const load: PageServerLoad = async ({ params }) => {
	const code = params.invitationCode;

	const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
		}
	});

	const ret = await res.json();

	return ret;
};

// export async function load({ params, fetch }): PageServerLoad {
// 	const code = params.invitationCode;

// 	console.log(code);

// 	// const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`, {
// 	// 	method: 'GET',
// 	// 	Headers: {
// 	// 		'content-type': 'application/json',
// 	// 		accept: 'application/json'
// 	// 	}
// 	// });

// 	// const ret = await res.json();

// 	// console.log(ret);

// 	return {};
// }

export const actions: Actions = {};
