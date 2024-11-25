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
	Referer: 'https://www.deepl.com/',
	Origin: 'chrome-extension://cofdbpoegempjloogbagkncekinflcnj',
	'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh-HK;q=0.6,zh;q=0.5',
	'Accept-Encoding': 'gzip, deflate, br',
	'Pragma': 'no-cache',
	'Priority': 'u=1, i',
	'Sec-Fetch-Dest': 'empty',
	'Sec-Fetch-Mode': 'cors',
	'Sec-Fetch-Site': 'none',
	'User-Agent': 'DeepLBrowserExtension/1.28.0 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
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
