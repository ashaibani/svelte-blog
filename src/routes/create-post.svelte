<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import Parse from "parse/dist/parse";

  let loaded = false;
  let username;
  let password;
  var currentUser;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
      if (!currentUser) {
        goto("/login");
      }
    }
    loaded = true;
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize(
      "XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw",
      "",
      "NMvCRYdHjsU7r9aVMqqwTiJpnSpkgnJT"
    );
  }
</script>

<input type="text" bind:value={username} placeholder="Username" />
<br />
<input type="password" bind:value={password} placeholder="Password" />
<br />
<Button>Login</Button>
