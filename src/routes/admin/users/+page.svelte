<script lang="ts">
    import { setAdminRole } from '$lib/adminUtils';
 
    let email = '';
    let message = '';
 
    async function handleSetAdmin() {
      try {
        const result = await setAdminRole(email);
        message = result.message;
      } catch (error) {
        message = 'Error setting admin role';
      }
    }
    </script>
 
    <h1>Set Admin Role</h1>
    <input bind:value={email} placeholder="User's email" />
    <button on:click={handleSetAdmin}>Set as Admin</button>
    {#if message}
      <p>{message}</p>
    {/if}