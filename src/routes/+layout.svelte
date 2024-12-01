<script>
	import '@picocss/pico/css/pico.min.css';
	import { Coffee, Github } from 'lucide-svelte';
	import { browser, dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';

	let baseUrl = browser ? window.location.origin : '';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>DXTranslate</title>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="DXTranslate" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="description" content="Simple DeepL translate frontend with no tracker and ads" />
	<meta
		property="og:description"
		content="Simple DeepL translate frontend with no tracker and ads"
	/>
	<meta property="og:url" content={baseUrl} />
	<meta property="og:title" content="DXTranslate" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{baseUrl}/dxtranslate-banner.png" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#13171f" />
</svelte:head>

<div class="container">
	<nav style="align-items: center; padding: 1rem 0;">
		<a class="dx-title" href="/">DXTranslate</a>
		<div class="navbar-icons">
			<ThemeSwitch />
			<a class="svg-icon" href="https://github.com/ridzimeko/DXTranslate">
				<Github aria-label="github" />
			</a>
		</div>
	</nav>

	<main style="margin-top: 0.2rem;">
		<slot />
	</main>

	<footer>
		<div class="footer-container">
			<p>Made with <Coffee size={20} aria-label="coffe" /> by Ridzimeko</p>
		</div>
	</footer>
</div>

<style scoped>
	.dx-title {
		color: var(--pico-contrast);
		text-decoration: none;
		font-size: 1.4em;
		font-weight: bold;
	}

	.footer-container {
		text-align: center;
		font-size: 0.8em;
		margin-top: 2.4rem;
	}

	.svg-icon {
		color: var(--pico-muted-color);
	}

	.svg-icon:hover {
		color: var(--pico-contrast);
	}

	.navbar-icons {
		display: flex;
		align-items: center;
		gap: 20px;
	}
</style>
