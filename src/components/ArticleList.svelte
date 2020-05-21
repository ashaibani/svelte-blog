<script>
  import { goto } from "@sapper/app";
  export let articles;
  export let isLoggedIn = false;
</script>

{#if articles.length <= 0}
  <section>Seems like theres nothing here yet!</section>
{:else}
  {#each articles as article}
    <section>
      <h2
        style="margin-bottom: 0px;cursor: pointer;"
        on:click={() => {
          goto('read/' + article.id);
        }}>
        {article.title}
      </h2>
      <p class="subtitle">
        {article.desc}
        {#if isLoggedIn}
          <label for="mn-edit-{article.id}" class="margin-toggle">
             &#11570;
          </label>
          <input
            type="checkbox"
            id="mn-edit-{article.id}"
            class="margin-toggle" />
          <span style="cursor: pointer;" class="marginnote" on:click={() => {}}>
            <a href="edit/{article.id}">EDIT</a>
          </span>
        {/if}
      </p>
      <p>
        {@html article.content.substr(0, 300)}
      </p>

      <p>
        <label for="mn-date-{article.id}" class="margin-toggle">&#11621;</label>
        <input
          type="checkbox"
          id="mn-date-{article.id}"
          class="margin-toggle" checked/>
        <span class="marginnote">
          <small>{article.createdAt}</small>
        </span>
        <a href="/read/{article.id}">READ MORE</a>
      </p>
    </section>
  {/each}
{/if}
