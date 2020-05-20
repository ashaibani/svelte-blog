<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import Parse from "parse/dist/parse";

  let loaded = false;
  let username;
  let password;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      var currentUser = Parse.User.current();
      if (currentUser) {
        goto("/");
      }
    }
    loaded = true;
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  async function login() {
    if (!loaded) {
      initClientParse();
    }
    try {
      currentUser = await Parse.User.logIn(username, password);
      goto("/");
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  }
</script>

<article>
  <section>
    <input type="text" bind:value={username} placeholder="Username" />
    <br />
    <input type="password" bind:value={password} placeholder="Password" />
    <br />
    <Button on:click={login}>Login</Button>
  </section>
</article>
