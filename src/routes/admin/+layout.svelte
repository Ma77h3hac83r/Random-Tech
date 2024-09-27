<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { goto } from '$app/navigation';

  let isAdmin = false;
  let isLoading = true;

  onMount(() => {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        isAdmin = adminDoc.exists();
      } else {
        isAdmin = false;
      }
      isLoading = false;
      if (!isAdmin && window.location.pathname !== '/admin/login') {
        goto('/admin/login');
      }
    });
  });
</script>

{#if isLoading}
  <p>Loading...</p>
{:else if isAdmin || window.location.pathname === '/admin/login'}
  <slot />
{:else}
  <p>Redirecting to login...</p>
{/if}