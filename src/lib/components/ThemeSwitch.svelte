<script lang="ts">
	import { MonitorCog, Moon, Sun, SwatchBook } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import clickOutside from '$lib/actions/clickOutside';

	type ThemeOptions = 'system' | 'light' | 'dark';
	let theme: ThemeOptions = 'system';
	let isExpanded = false;

	function changeTheme(selectedTheme: ThemeOptions) {
		theme = selectedTheme;

		if (browser) {
			const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (theme === 'system') {
				document.documentElement.removeAttribute('data-theme');
				localStorage.removeItem('theme');
			} else {
				document.documentElement.setAttribute('data-theme', theme);
				localStorage.setItem('theme', theme);
			}
		}
	}

	onMount(() => {
		const initialTheme = localStorage.getItem('theme') || '';
		if (initialTheme) document.documentElement.setAttribute('data-theme', initialTheme);
	});
</script>

<div use:clickOutside={() => (isExpanded = false)} class="dropdown">
	<button
		aria-label="Switch theme"
		aria-expanded={isExpanded}
		type="button"
		class="theme-button"
		on:click={() => (isExpanded = !isExpanded)}
	>
		<SwatchBook />
	</button>
	{#if isExpanded}
		<ul class="theme-menu" role="tablist">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				role="tab"
				tabindex={theme === 'system' ? 0 : -1}
				aria-selected={theme === 'system'}
				on:click={() => changeTheme('system')}
			>
				<MonitorCog />
				<span>System</span>
			</li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				role="tab"
				tabindex={theme === 'light' ? 0 : -1}
				aria-selected={theme === 'light'}
				on:click={() => changeTheme('light')}
			>
				<Sun />
				<span>Light</span>
			</li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				role="tab"
				tabindex={theme === 'dark' ? 0 : -1}
				aria-selected={theme === 'dark'}
				on:click={() => changeTheme('dark')}
			>
				<Moon />
				<span>Dark</span>
			</li>
		</ul>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
	}

	.theme-button {
		background: transparent;
		color: var(--pico-muted-color);
		border: none;
		margin: 0;
		padding: 0;
	}

	.theme-button:focus {
		outline: 0;
		box-shadow: none;
	}

	.theme-button:is(:hover, :focus-visible, .active) {
		color: var(--pico-contrast);
	}

	.theme-menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: start;
		z-index: 10;
		background-color: var(--pico-dropdown-background-color);
		border: 1px solid var(--pico-dropdown-border-color);
		right: 0;
		top: 36px;
	}

	.theme-menu li {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 8px;
		cursor: pointer;
		padding: 0.6rem 0.8rem;
		user-select: none;
		width: 100%;
	}

	.theme-menu li[aria-selected='true'] {
		background-color: var(--pico-form-element-selected-background-color);
	}
</style>
