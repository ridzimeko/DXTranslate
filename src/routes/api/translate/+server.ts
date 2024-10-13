import { translate } from '$lib/translate';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, url }) => {
	const from = url.searchParams.get('from');  // source lang
	const to = url.searchParams.get('to'); // target lang
	const text = url.searchParams.get('text');

	if (!from || !to)
		return new Response(
			JSON.stringify({
				message: 'Error: please insert source and target language.'
			}),
			{ status: 400 }
		);
	else if (!text)
		return new Response(
			JSON.stringify({
				message: "Error: text can't be empty"
			}),
			{ status: 400 }
		);

	try {
		const result = await translate(text, from, to, 3);
		return new Response(JSON.stringify(result));
	} catch (error: any) {
		return new Response(
			JSON.stringify({
                message: 'Translation failed!',
				error: error.message
			}),
			{ status: 500 }
		);
	}
};
