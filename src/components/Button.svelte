<script>
  export let href = false;
</script>

{#if href}
  <a {href} class="button1 bouncy" on:click>
    <slot />
  </a>
{:else} 
  <button class="button1 bouncy" on:click>
    <slot />
  </button>
{/if}
