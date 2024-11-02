<script lang="ts">
	import Alternatives from './Alternatives.svelte';

	export let isLoading = false;
	export let value = '';
	export let alternatives: string[];
</script>

<div class="dx-textarea">
	<textarea aria-label="Translation result" {value} readonly={!value}></textarea>
	<Alternatives {alternatives} />
	<div class={isLoading ? 'loading' : ''}></div>
</div>

<style scoped>
	.dx-textarea {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.dx-textarea textarea {
		margin: 0;
		resize: none;
		flex-grow: 1;
	}

	/* From Uiverse.io by satyamchaudharydev */
	.loading {
		display: block;
		--height-of-loader: 4px;
		--loader-color: #0071e2;
		height: var(--height-of-loader);
		border-radius: 30px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.loading::before {
		content: '';
		position: absolute;
		background: var(--loader-color);
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
		border-radius: 30px;
		animation: moving 1s ease-in-out infinite;
	}

	@keyframes moving {
		50% {
			width: 100%;
		}

		100% {
			width: 0;
			right: 0;
			left: unset;
		}
	}
</style>
