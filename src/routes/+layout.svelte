<script>
	import '@picocss/pico/css/pico.min.css';
	import { Coffee, Github } from 'lucide-svelte';
</script>

<body class="container">
	<nav style="align-items: center;">
		<ul>
			<li>
				<a class="dx-title" href="/">DXTranslate</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="https://github.com/ridzimeko/DXTranslate">
					<Github color="#dfe3eb" aria-label="github" />
				</a>
			</li>
		</ul>
	</nav>

	<main>
		<slot />
	</main>

	<footer>
		<div class="footer-container">
			<p>Made with <Coffee size={20} aria-label="coffe" /> by Ridzimeko</p>
		</div>
	</footer>
</body>

<style scoped>
	.dx-title {
		color: var(--pico-contrast);
		text-decoration: none;
		font-size: 28px;
		font-weight: bold;
	}

	.footer-container {
		text-align: center;
		font-size: 16px;
	}
</style>
