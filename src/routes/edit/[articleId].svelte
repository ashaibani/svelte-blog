<script>
  import { goto, stores } from "@sapper/app";

  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import Footer from "~/components/Footer.svelte";
  import UserNav from "~/components/UserNav.svelte";
  import Parse from "parse/dist/parse";
  import Editor from "cl-editor/dist/index.js";

  const { page } = stores();
  const { articleId } = $page.params;
  let loaded = false;
  let articleData;
  let articleObject;
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
        isLoggedIn = true;
      }
    }
    articleObject = await getArticleObject(articleId);
    articleData = {
      id: articleObject.id,
      title: articleObject.get("title"),
      desc: articleObject.get("shortDescription"),
      content: articleObject.get("content"),
      createdAt: articleObject.createdAt.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      updatedAt: articleObject.updatedAt.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    };
    loaded = true;
    editor = new Editor({
      target: editArea,
      html: articleData.content
    });
    editor.setHtml(articleData.content);
  });

  async function getArticleObject(articleId) {
    const Article = Parse.Object.extend("Article");
    const query = new Parse.Query(Article);
    try {
      const result = await query.get(articleId);
      return result;
    } catch (error) {
      goto("/");
    }
  }

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  async function updateArticle() {
    const article = articleObject,
      title = articleData.title,
      shortDescription = articleData.desc,
      content = editor.getHtml(true);
    article.set("title", title);
    article.set("shortDescription", shortDescription);
    article.set("content", content);

    article.save().then(
      article => {
        // Execute any logic that should take place after the object is saved.
        console.log("New object updated with objectId: " + article.id);
      },
      error => {
        console.log(
          "Failed to update object, with error code: " + error.message
        );
      }
    );
  }

  async function remove() {
    articleObject.destroy().then(
      myObject => {
        goto("/");
      },
      error => {
        // The delete failed.
        // error is a Parse.Error with an error code and message.
        console.log(
          "Failed to remove object, with error code: " + error.message
        );
      }
    );
  }

  async function save() {
    await updateArticle();
  }

  async function saveAndView() {
    await updateArticle().then(() => {
      goto("read/" + articleData.id);
    });
  }
</script>
<svelte:head>
   <title>BLOG</title>
</svelte:head>

<article>
  <section>
  <UserNav {isLoggedIn} />
    {#if loaded}
      <h1>Article Editor</h1>
      <p>
        Title:
        <input type="text" bind:value={articleData.title} />
        <label for="mn-back-{articleData.id}" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-back-{articleData.id}"
          class="margin-toggle" />
        <span class="marginnote">
          <a href="read/{articleData.id}">GO BACK</a>
        </span>
      </p>
      <p>
        Short Description:
        <input type="text" bind:value={articleData.desc} />
      </p>
    {:else}LOADING{/if}
    <div bind:this={editArea} class="editArea" />
    {#if loaded}
      <p>
        <label for="mn-remove-{articleData.id}" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-remove-{articleData.id}"
          class="margin-toggle"
          checked />
        <span class="marginnote">
          <Button on:click={remove}>REMOVE</Button>
        </span>
        <label for="mn-saveview-{articleData.id}" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-saveview-{articleData.id}"
          class="margin-toggle"
          checked />
        <span class="marginnote">
          <Button on:click={saveAndView}>SAVE AND VIEW</Button>
        </span>
        <label for="mn-save-{articleData.id}" class="margin-toggle">
          &#11621;
        </label>
        <input
          type="checkbox"
          id="mn-save-{articleData.id}"
          class="margin-toggle"
          checked />
        <span class="marginnote">
          <Button on:click={save}>SAVE</Button>
        </span>
      </p>

      <Footer />
    {/if}
  </section>
</article>
