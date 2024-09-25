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
  <h1 class="text-3xl font-bold mb-4">My SvelteKit Firebase App</h1>
  <ul class="list-disc pl-5">
    {#each items as item}
      <li class="mb-2">{item}</li>
    {/each}
  </ul>
</main>