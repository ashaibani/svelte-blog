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

  onMount(async () => {
    initClientParse();
    if (process.browser) {
      currentUser = Parse.User.current();
      if (!currentUser) {
        goto("/login");
      }
    }
    update();
    loaded = true;
  });

  function initClientParse() {
    Parse.serverURL = "https://api.m-a.me/parse";
    Parse.initialize("XWRqEdUNs6uVxo8xUk7j4Z3pCZ4ozbqw");
  }

  async function saveArticle(title, shortDescription, content) {
    const Article = Parse.Object.extend("Article");
    const article = new Article();
    article.set("title", title);
    article.set("shortDescription", shortDescription);
    article.set("content", content);

    article.save().then(
      article => {
        // Execute any logic that should take place after the object is saved.
        // console.log("New object created with objectId: " + article.id);
      },
      error => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log(
          "Failed to create new object, with error code: " + error.message
        );
      }
    );
  }

  async function update() {
    articles = await getArticles();
  }

  async function create() {
    saveArticle("Another Example", "Some other example", "ASDasdqwdsa").then(
      () => {
        update();
      }
    );
  }

  async function wipe() {
    const Article = Parse.Object.extend("Article");
    const query = new Parse.Query(Article);
    articles = [];
    const results = await query.find();
    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      object.destroy().then(
        object => {
          // console.log(
          //   "removing object " + object.id + " - " + object.get("title")
          // );
        },
        error => {
          // console.log(
          //   "failed to remove object " + object.id + " - " + object.get("title")
          // );
        }
      );
    }
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

<article>

  {#if loaded}
    {#if currentUser}
      <UserNav />
    {/if}
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
    <ArticleList {articles} />
    <Footer />
  {:else}
    <div>LOADING</div>
  {/if}
</article>
