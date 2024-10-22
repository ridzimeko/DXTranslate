import { translate } from '$lib/translate';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, url }) => {
	const { source_lang, target_lang, text } = await request.json();

	if (!target_lang)
		return json({ message: 'Error: please insert target language' }, { status: 400 });
	else if (!text) 
		return json({ message: "Error: text can't be empty" }, { status: 400 });

	try {
		const result = await translate(text, source_lang, target_lang, 3);
		return json(result);
	} catch (error: any) {
		return json(
			{
				message: 'Translation failed!',
				error: error.message
			},
			{ status: 500 }
		);
	}
};
