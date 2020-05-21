<script>
  import Notifications from "svelte-notifications/src/components/Notifications.svelte";
  export let segment;
</script>

<style lang="scss">

</style>

<svelte:head>
  <meta name="version" content="pkg.version" />
</svelte:head>
<Notifications />
<main>
  <slot {segment} />
</main>
