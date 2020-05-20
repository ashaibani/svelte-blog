<script>
  import { goto } from "@sapper/app";
  export let articles;
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
      <p class="subtitle">{article.desc}</p>
      <p>{article.content}</p>
      <p>
        <label for="mn-date" class="margin-toggle">&#11621;</label>
        <input type="checkbox" id="mn-date" class="margin-toggle" />
        <span class="marginnote">{article.createdAt}</span>
        <a href="/read/{article.id}">Read more...</a>
      </p>
    </section>
  {/each}
{/if}
