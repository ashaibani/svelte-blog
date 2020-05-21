<script>
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import Footer from "~/components/Footer.svelte";
  import UserNav from "~/components/UserNav.svelte";
  import Parse from "parse/dist/parse";
  import Editor from "cl-editor/dist/index.js";

  let loaded = false;
  let title, shortDescription, content;
  let editArea;
  let editor;
  let isLoggedIn;
  var currentUser;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
      if (!currentUser) {
        goto("/");
      } else {
        isLoggedIn = true
      }
    }
    loaded = true;
    editor = new Editor({
      target: editArea
    });
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  async function updateArticle() {
    const Article = Parse.Object.extend("Article");
    const article = new Article();
    article.set("title", title);
    article.set("shortDescription", shortDescription);
    article.set("content", editor.getHtml(true));

    article.save().then(
      article => {
        goto("read/" + article.id);
        console.log("New object updated with objectId: " + article.id);
      },
      error => {
        console.log(
          "Failed to update object, with error code: " + error.message
        );
      }
    );
  }

  async function saveAndView() {
    await updateArticle();
  }
</script>
<svelte:head>
   <title>CREATE ARTICLE - BLOG</title>
</svelte:head>
<article>
  <section>
  <UserNav {isLoggedIn} />
    {#if loaded}
      <h1>Article Creator</h1>
      <p>
        Title:
        <input type="text" bind:value={title} />
        <label for="mn-back-create" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-back-create"
          class="margin-toggle" />
        <span class="marginnote">
          <a href="/">GO BACK</a>
        </span>
      </p>
      <p>
        Short Description:
        <input type="text" bind:value={shortDescription} />
      </p>
    {:else}LOADING{/if}
    <div bind:this={editArea} class="editArea" />
    {#if loaded}
      <p>
        <label for="mn-save-create" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-save-create"
          class="margin-toggle"
          checked />
        <span class="marginnote">
          <Button on:click={saveAndView}>SAVE AND VIEW</Button>
        </span>
      </p>

      <Footer />
    {/if}
  </section>
</article>
