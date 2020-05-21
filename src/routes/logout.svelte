<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Parse from "parse/dist/parse";

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      Parse.User.logOut().then(() => {
        goto("/");
      });
    }
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }
</script>
