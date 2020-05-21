<script>
  import UserNav from "~/components/UserNav.svelte";
  import { onMount } from "svelte";
  import Parse from "parse/dist/parse";

  export let status;
  export let error;
  let isLoggedIn = false;
  var currentUser;
  let loaded = false;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
      if (currentUser) {
        isLoggedIn = true;
      }
    }
    loaded = true;
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>
<article>
  <UserNav {isLoggedIn} />
  <h1>{status}</h1>

  <section>
    <p>{error.message}</p>

    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </section>
</article>
