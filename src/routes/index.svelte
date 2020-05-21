<script context="module">
  export async function preload(page, session) {
    return {};
  }
</script>

<script>
  //style="position:fixed;width:100%;top:calc(50vh - 22px);text-align:center">
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Footer from "~/components/Footer.svelte";
  import ArticleList from "~/components/ArticleList.svelte";
  import UserNav from "~/components/UserNav.svelte";
  import { post } from "~/library/utils.js";
  import Parse from "parse/dist/parse";
  let articles = [];
  let loaded = false;
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
    update();
    loaded = true;
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  async function update() {
    articles = await getArticles();
  }

  async function getArticles() {
    const Article = Parse.Object.extend("Article");
    const query = new Parse.Query(Article);
    let localArticles = [];
    const results = await query.find();
    // console.log("Successfully retrieved " + results.length + " articles.");
    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      localArticles.push({
        id: object.id,
        title: object.get("title"),
        desc: object.get("shortDescription"),
        content: object.get("content"),
        createdAt: object.createdAt.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        updatedAt: object.updatedAt.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      });
      // console.log(object.id + " - " + object.get("title"));
    }
    return localArticles;
  }
</script>

<style lang="scss">

</style>
<svelte:head>
   <title>BLOG</title>
</svelte:head>
<article>
  <UserNav {isLoggedIn} />
  {#if loaded}
    <span class="title">
      BLOG
      <span
        class="title-domain"
        style="cursor: pointer;"
        on:click={() => {
          goto('https://m-a.me');
        }}>
        m-a.me
      </span>
    </span>
    <ArticleList {articles} {isLoggedIn} />
    <Footer />
  {:else}
    <div>LOADING</div>
  {/if}
</article>
