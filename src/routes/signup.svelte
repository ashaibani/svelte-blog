<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import UserNav from "~/components/UserNav.svelte";
  import Parse from "parse/dist/parse";
  let loaded = false;

  let username;
  let password;
  let isLoggedIn;

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

  async function signup() {
    if (!loaded) {
      initClientParse();
    }
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    try {
      await user.signUp();
      goto("/");
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  }
</script>

<article>
  <UserNav {isLoggedIn} />
  {#if loaded}
    <h1>SIGN UP</h1>
    <section>
      <p>
        <input type="text" bind:value={username} placeholder="Username" />
      </p>

      <p>
        <input type="password" bind:value={password} placeholder="Password" />
      </p>

      <p>
        <Button on:click={signup}>Sign Up</Button>
      </p>

    </section>
  {:else}LOADING{/if}
</article>
