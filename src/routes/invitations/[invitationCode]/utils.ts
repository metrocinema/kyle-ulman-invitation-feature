export async function postView(CODE: string) {
	const RES = await fetch(`${import.meta.env.VITE_API_URL}/${CODE}/view`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
		},
		body: CODE
	});

	const RET = await RES.json();

	console.log('viewCount:', RET.data.invitation.viewCount);
	console.log('raw:', RET);
}
