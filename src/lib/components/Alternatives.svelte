<script lang="ts">
	export let alternatives: string[];
</script>

<div class="dx-alternatives">
	{#if alternatives.length}
		<div class="dx-alternatives-container">
			<h4 class="dx-alternatives-title">Alternatives :</h4>
			{#each alternatives as alt}
				<p class="dx-alternatives-text">{alt}</p>
			{/each}
		</div>
	{/if}
</div>

<style scoped>
	.dx-alternatives-container {
		border: 1px solid var(--pico-form-element-border-color);
		border-right: 0;
		border-bottom: 0;
		background-color: var(--pico-form-element-background-color);
		width: 100%;
		padding: 0.4rem 1.2rem 1rem 1.2rem;
		max-height: 200px;
		overflow: auto;
	}

	.dx-alternatives-title {
		font-size: 1em;
		color: var(--pico-muted-color);
		margin-left: 0;
		padding-top: 0.4rem;
	}

	.dx-alternatives-text {
		margin: 0.2rem 0;
	}
</style>
