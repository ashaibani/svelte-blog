<script context="module">
  export async function preload(page, session) {
    return {};
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";

  import { onMount } from "svelte";
  import Button from "~/components/Button.svelte";
  import ArticleView from "~/components/ArticleView.svelte";
  import Footer from "~/components/Footer.svelte";
  import UserNav from "~/components/UserNav.svelte";
  import Parse from "parse/dist/parse";

  const { page } = stores();
  const { articleId } = $page.params;
  let loaded = false;
  let articleObject;
  let article;
  var currentUser;
  let isLoggedIn = false;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
      if (currentUser) {
        isLoggedIn = true;
      }
    }
    articleObject = await getArticleObject(articleId);
    article = {
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

  function handleRemove(event) {
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
</script>

<article>
  <UserNav {isLoggedIn} />
  {#if loaded}
    <ArticleView {article} {isLoggedIn} on:remove={handleRemove} />
    <Footer />
  {:else}LOADING{/if}
</article>
