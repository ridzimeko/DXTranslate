import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { langs } from '$lib/constants/langs';

interface Language {
	code: string;
	name: string;
	targets: string[];
}

const createLanguageList = (): Language[] => {
	// Get all language codes except 'AUTO' and convert to lowercase
	const targetLanguages = langs
		.filter((lang) => lang.code !== 'AUTO')
		.map((lang) => lang.code.toLowerCase());

	// Create the final language list with source languages and their targets
	const languageList: Language[] = langs
		.filter((lang) => lang.code !== 'AUTO')
		.map((lang) => ({
			code: lang.code.toLowerCase(),
			name: lang.name,
			targets: targetLanguages
		}));

	return languageList;
};

export const GET: RequestHandler = async () => {
	// return static list of languages based on libretranslate API
	// https://libretranslate.com/docs/#/translate/get_languages
	return json(createLanguageList(), { status: 200 });
};
