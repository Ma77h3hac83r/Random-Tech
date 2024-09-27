<script lang="ts">
  import Icon from '@iconify/svelte';
  import { theme, toggleTheme } from '$lib/stores/theme';
</script>

<button on:click={toggleTheme} class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
  {#if $theme === 'light'}
    <Icon icon="mdi:moon-full" />
  {:else}
    <Icon icon="mdi:white-balance-sunny" />  
  {/if}
</button>