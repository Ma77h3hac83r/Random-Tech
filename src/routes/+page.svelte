<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '$lib/firebase';

  let items: string[] = [];

  onMount(async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    items = querySnapshot.docs.map(doc => doc.data().name);
  });
</script>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Welcome to My App</h1>
  <p class="mb-4">This is the home page content. You can add more sections or components here.</p>
</main>