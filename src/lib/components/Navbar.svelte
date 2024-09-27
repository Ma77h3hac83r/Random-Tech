<script lang="ts">
    let navItems = [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ];
    import logo from '$lib/assets/random_tech_logo.png';
  </script>
  
  <nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="text-white text-2xl font-bold">
        <img src={logo} alt="Random Tech" class="h-12" />
      </a>
      <ul class="flex space-x-4">
        {#each navItems as item}
          <li>
            <a href={item.href} class="text-white hover:text-blue-200">{item.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>