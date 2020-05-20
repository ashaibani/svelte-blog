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
  import Parse from "parse/dist/parse";

  const { page } = stores();
  const { articleId } = $page.params;
  let loaded = false;
  let article;
  var currentUser;

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
    }
    article = await getArticle(articleId);
    loaded = true;
  });

  async function getArticle(articleId) {
    let localArticle = {};
    const Article = Parse.Object.extend("Article");
    const query = new Parse.Query(Article);
    try {
      const result = await query.get(articleId);
      localArticle = {
        id: result.id,
        title: result.get("title"),
        desc: result.get("shortDescription"),
        content: result.get("content"),
        createdAt: result.createdAt.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        updatedAt: result.updatedAt.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      };
    } catch (error) {
      goto("/");
    }

    return localArticle;
  }

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }
</script>

<article>
  {#if loaded}
    <ArticleView {article} />
    <Footer />
  {:else}LOADING{/if}
</article>
