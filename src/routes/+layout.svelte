<script lang="ts">
	import '../app.css';
	import '$lib/firebase';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte'; 
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<main class="flex-grow container mx-auto p-4">
		<slot />
		<ThemeToggle />
	</main>
	<Footer />
</div>
