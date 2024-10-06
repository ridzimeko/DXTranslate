<script lang="ts">
    import { ArrowRightLeft } from 'lucide-svelte';

	let text = '';
	let result = '';

    // Selected source and target language state
    let current_source = 'AUTO';
    let current_target = 'EN';

	const langs = [
    { code: "AUTO", name: "Auto" },
    { code: "AR", name: "Arabic" },
    { code: "BG", name: "Bulgarian" },
    { code: "CS", name: "Czech" },
    { code: "DA", name: "Danish" },
    { code: "DE", name: "German" },
    { code: "EL", name: "Greek" },
    { code: "EN", name: "English" },
    { code: "ES", name: "Spanish" },
    { code: "ET", name: "Estonian" },
    { code: "FI", name: "Finnish" },
    { code: "FR", name: "French" },
    { code: "HU", name: "Hungarian" },
    { code: "ID", name: "Indonesian" },
    { code: "IT", name: "Italian" },
    { code: "JA", name: "Japanese" },
    { code: "KO", name: "Korean" },
    { code: "LT", name: "Lithuanian" },
    { code: "LV", name: "Latvian" },
    { code: "NB", name: "Norwegian" },
    { code: "NL", name: "Dutch" },
    { code: "PL", name: "Polish" },
    { code: "PT", name: "Portuguese" },
    { code: "RO", name: "Romanian" },
    { code: "RU", name: "Russian" },
    { code: "SK", name: "Slovak" },
    { code: "SL", name: "Slovenian" },
    { code: "SV", name: "Swedish" },
    { code: "TR", name: "Turkish" },
    { code: "UK", name: "Ukrainian" },
    { code: "ZH", name: "Chinese" }
];

function swapLangHandler() {
    [current_source, current_target] = [current_target, current_source]
}
</script>

<main class="container">
	<div class="lang-select">
		<select bind:value={current_source} aria-label="Source language" required>
			{#each langs as lang}
                <option value="{lang.code}">{lang.name}</option>
            {/each}
		</select>
        <button on:click={swapLangHandler} class="swap-button">
            <ArrowRightLeft size="32" />
        </button>
        <select bind:value={current_target} aria-label="Target language" required>
			{#each langs as lang}
                <option value="{lang.code}">{lang.name}</option>
            {/each}
		</select>
	</div>
	<div class="grid">
		<textarea bind:value={text} id="text" cols="30" rows="10" placeholder="Enter text..."
		></textarea>
		<textarea bind:value={result} id="text" cols="30" rows="10"></textarea>
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