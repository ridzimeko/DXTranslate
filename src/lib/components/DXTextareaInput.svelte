<script lang="ts">
	import debounce from '$lib/actions/debounce';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let value = '';

	function handleValue() {
		dispatch('dx-input', { value });
	}
</script>

<div>
	<textarea
		style="resize: none; margin: 0; height: 100%;"
		use:debounce={{ value, func: handleValue, duration: 600 }}
		bind:value
		placeholder="Enter text here to translate..."
		aria-label="Translate text input"
	></textarea>
</div>
