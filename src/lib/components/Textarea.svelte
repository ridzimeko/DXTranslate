<script lang="ts">
	export let isLoading = false;
	export let value;
	export let label;
</script>

<div class="dx-textarea">
	<div class={isLoading ? 'loading' : ''}></div>
	<textarea aria-label={label} cols="40" rows="10" {value}></textarea>
</div>

<style scoped>
	.dx-textarea {
		position: relative;
		height: fit-content;
	}

	.dx-textarea textarea {
		margin: 0;
		resize: none;
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
