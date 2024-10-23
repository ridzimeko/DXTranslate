<script lang="ts">
	import { ArrowRightLeft } from 'lucide-svelte';
	import { langs } from '$lib/constants/langs';
	import debounce from '$lib/actions/debounce';
	import type { TranslateResult } from '$lib/translate';
	import Textarea from '$lib/components/Textarea.svelte';
	import LangSelect from '$lib/components/LangSelect.svelte';

	let text = '';
	let translatedText = '';
	let detectedLang = '';
	let isLoading = false;

	// Selected source and target language state
	let source_lang = 'AUTO';
	let target_lang = 'EN';

	async function getTranslate() {
		if (!text) {
			detectedLang = '';
			translatedText = '';
			return false;
		}

		isLoading = true;
		const body = {
			source: source_lang,
			target: target_lang,
			q: text
		};

		try {
			const res = await fetch('/translate', { method: 'POST', body: JSON.stringify(body) });
			const data: TranslateResult = await res.json();
			translatedText = data.translatedText;
			detectedLang = data.detectedLanguage.language;
			isLoading = false;
		} catch (error: any) {
			console.error(error.message);
			isLoading = false;
		}
	}

	function swapLangHandler() {
		if (source_lang.toUpperCase() === 'AUTO') {
			source_lang = detectedLang || 'EN';
		}
		[source_lang, target_lang] = [target_lang, source_lang];
		[text, translatedText] = [translatedText, text];
	}
</script>

<main class="container">
	<div class="lang-select">
		<LangSelect bind:value={source_lang} on:change={getTranslate} {detectedLang} {langs} />
		<button
			on:click={swapLangHandler}
			disabled={source_lang === 'AUTO' && !detectedLang}
			class="swap-button"
		>
			<ArrowRightLeft size="32" />
		</button>
		<LangSelect bind:value={target_lang} on:change={getTranslate} langs={langs.slice(1)} />
	</div>
	<div class="grid" style="gap: 0;">
		<textarea
			style="resize: none; margin: 0;"
			use:debounce={{ value: text, func: getTranslate, duration: 750 }}
			bind:value={text}
			cols="30"
			rows="10"
			placeholder="Enter text..."
		></textarea>
		<Textarea {isLoading} value={translatedText} />
	</div>
</main>

<style scoped>
	.lang-select {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.swap-button {
		margin-bottom: var(--pico-spacing);
		background: transparent;
		border: none;
	}
</style>
