<script lang="ts">
	import { ArrowRightLeft } from 'lucide-svelte';
	import { langs } from '$lib/constants/langs';
	import type { TranslateResult } from '$lib/translate';
	import LangSelect from '$lib/components/LangSelect.svelte';
	import DxTextareaInput from '$lib/components/DXTextareaInput.svelte';
	import DxTextareaResult from '$lib/components/DXTextareaResult.svelte';

	let text = '';
	let translatedText = '';
	let alternatives: string[] = [];
	let detectedLang = '';
	let isLoading = false;

	// Selected source and target language state
	let source_lang = 'AUTO';
	let target_lang = 'EN';

	async function getTranslate() {
		if (!text) {
			detectedLang = '';
			translatedText = '';
			alternatives = [];
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
			alternatives = data.alternatives;
			isLoading = false;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

<div>
	<div class="lang-select">
		<LangSelect
			label="Source language"
			bind:value={source_lang}
			on:change={getTranslate}
			{detectedLang}
			{langs}
		/>
		<button
			on:click={swapLangHandler}
			disabled={source_lang === 'AUTO' && !detectedLang}
			class="swap-button"
			title="Swap language"
		>
			<ArrowRightLeft class="icon" size="32" />
		</button>
		<LangSelect
			label="Target language"
			bind:value={target_lang}
			on:change={getTranslate}
			langs={langs.slice(1)}
		/>
	</div>
	<div class="grid dxtranslate-form">
		<DxTextareaInput bind:value={text} on:dx-input={(e) => getTranslate()} />
		<DxTextareaResult value={translatedText} {alternatives} {isLoading} />
	</div>
</div>

<style scoped>
	.lang-select {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.swap-button {
		margin-bottom: var(--pico-spacing);
		background: transparent;
		color: var(--pico-muted-color);
		border: none;
	}

	.dxtranslate-form {
		gap: 0;
		height: 360px;
	}

	@media (max-width: 768px) {
		.dxtranslate-form {
			height: 512px;
		}
	}
</style>
