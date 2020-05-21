<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let article;
  export let isLoggedIn = false;

  function remove() {
    dispatch("remove", { articleId: article.id });
  }
</script>

<h1>{article.title}</h1>
<p class="subtitle">{article.desc}</p>
<section>
  {#if isLoggedIn}
    <p>
      <label for="mn-edit-{article.id}" class="margin-toggle">&#11570;</label>
      <input type="checkbox" id="mn-edit-{article.id}" class="margin-toggle" />
      <span style="cursor: pointer;" class="marginnote" on:click={() => {}}>
        <a href="edit/{article.id}">EDIT</a>
      </span>
      <label for="mn-remove-{article.id}" class="margin-toggle">&#11569;</label>
      <input
        type="checkbox"
        id="mn-remove-{article.id}"
        class="margin-toggle" />
      <span style="cursor: pointer;" class="marginnote" on:click={remove}>
        REMOVE
      </span>
    </p>
  {/if}
  <p>
    {@html article.content}
  </p>
  <p>
    <label for="mn-back-{article.id}" class="margin-toggle">&#11621;</label>
    <input
      type="checkbox"
      id="mn-back-{article.id}"
      class="margin-toggle"
      checked />
    <span class="marginnote">
      <a href="/">GO BACK</a>
    </span>
    <small>
      <i>{article.createdAt}</i>
    </small>
  </p>

</section>
