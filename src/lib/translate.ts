import axios, { AxiosError } from 'axios';

export interface TranslateResult {
	detectedLanguage: {
		language: string;
		isConfident: boolean;
	};
	translatedText: string;
	alternatives: string[];
}

const DEEPL_BASE_URL = 'https://www2.deepl.com/jsonrpc';
const headers = {
	'Content-Type': 'application/json',
	Accept: '*/*',
	'x-app-os-name': 'iOS',
	'x-app-os-version': '16.3.0',
	'Accept-Language': 'en-US,en;q=0.9',
	'Accept-Encoding': 'gzip, deflate, br',
	'x-app-device': 'iPhone13,2',
	'User-Agent': 'DeepL-iOS/2.9.1 iOS 16.3.0 (iPhone13,2)',
	'x-app-build': '510265',
	'x-app-version': '2.9.1',
	Connection: 'keep-alive'
};

function getICount(translateText: string): number {
	return (translateText || '').split('i').length - 1;
}

function getRandomNumber(): number {
	const id = Math.floor(Math.random() * (8399998 - 8300000 + 1)) + 8300000;
	return id * 1000;
}

function getTimestamp(iCount: number): number {
	const ts = Date.now();
	if (iCount === 0) {
		return ts;
	}
	iCount++;
	return ts - (ts % iCount) + iCount;
}

export async function translate(
	text = 'Error: The original text cannot be empty!',
	sourceLang = 'AUTO',
	targetLang = 'EN',
	alternativeCount = 0
): Promise<TranslateResult | undefined> {
	const iCount = getICount(text);
	const id = getRandomNumber();

	const postData = {
		jsonrpc: '2.0',
		method: 'LMT_handle_texts',
		id,
		params: {
			texts: [{ text, requestAlternatives: alternativeCount }],
			splitting: 'newlines',
			lang: {
				source_lang_user_selected: sourceLang,
				target_lang: targetLang
			},
			timestamp: getTimestamp(iCount)
		}
	};

	let postDataStr = JSON.stringify(postData);

	if ((id + 5) % 29 === 0 || (id + 3) % 13 === 0) {
		postDataStr = postDataStr.replace('"method":"', '"method" : "');
	} else {
		postDataStr = postDataStr.replace('"method":"', '"method": "');
	}

	try {
		const response = await axios.post(DEEPL_BASE_URL, postDataStr, { headers });
		const result: TranslateResult = {
			detectedLanguage: {
				language: response.data.result.lang,
				isConfident: response.data.result.lang_is_confident
			},
			translatedText: response.data.result.texts[0].text,
			alternatives: response.data.result.texts[0].alternatives.map(
				(alternative: { text: string }) => alternative.text
			)
		};

		return result;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			const { response } = err;
			if (response) {
				if (response.status === 429) {
					throw new Error(
						`Hmmm... looks like this server gettin' a bit too popular and making too many requests to DeepL API, try again later.`
					);
				}
			}

			throw new Error(err.message);
		}
	}
}
