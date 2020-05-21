<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import Parse from "parse/dist/parse";
  import UserNav from "~/components/UserNav.svelte";

  let loaded = false;
  var currentUser;
  let username;
  let password;
  let isLoggedIn = false;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
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
      console.log("Error: " + error.code + " " + error.message);
    }
  }
</script>

<svelte:head>
  <title>LOGIN - BLOG</title>
</svelte:head>
<article>
  <UserNav {isLoggedIn} />
  <h1>LOGIN</h1>
  <section>
    <p>
      <input
        type="text"
        bind:value={username}
        placeholder="Username"
        style="width:40%;" />
    </p>
    <p>
      <input
        type="password"
        bind:value={password}
        placeholder="Password"
        style="width:40%;" />
    </p>
    <p>
      <Button on:click={login}>Login</Button>
    </p>
  </section>
</article>
