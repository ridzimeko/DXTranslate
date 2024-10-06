<script>
    import '@picocss/pico/css/pico.min.css'
</script>

<body class="container">
    <nav style="align-items: center;">
        <ul>
          <li>
            <a class="dx-title" href="/">DXTranslate</a>
          </li>
        </ul>
        <ul>
          <!-- <li><a href="/about">About</a></li> -->
        </ul>
      </nav>

   <main>
        <slot />
   </main>
</body>

<style scoped>
    .dx-title {
        color: var(--pico-contrast);
        text-decoration: none;
        font-size: 28px;
        font-weight: bold;
    }
</style>