<script lang="ts">
	import type { Langs } from '$lib/constants/langs';

	export let value = '';
	export let langs: Langs[];
	export let detectedLang = '';

	function getLang(langCode: string) {
		return langs.find((lang) => lang.code === langCode)?.name ?? '';
	}
</script>

<select bind:value on:change required>
	{#each langs as lang}
		<option value={lang.code}>
			{lang.name}
			{#if lang.code === 'AUTO' && detectedLang}
				<span>({getLang(detectedLang)})</span>
			{/if}
		</option>
	{/each}
</select>
