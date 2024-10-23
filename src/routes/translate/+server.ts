import { translate } from '$lib/translate';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { source, target, q, alternatives } = await request.json();

	if (!target)
		return json({ error: 'please insert target language' }, { status: 400 });
	else if (!q) 
		return json({ error: "text can't be empty" }, { status: 400 });

	try {
		const result = await translate(q, source, target, alternatives ?? 3);
		return json(result);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
