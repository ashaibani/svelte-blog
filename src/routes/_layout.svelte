<script>
  import Notifications from "@beyonk/svelte-notifications/src/Notifications";
  export let segment;
</script>

<style lang="scss">

</style>

<svelte:head>
  <meta name="version" content="pkg.version" />
</svelte:head>

<main>
  <Notifications />
  <slot {segment} />
</main>
