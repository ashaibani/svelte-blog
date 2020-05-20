<script>
  export let article;
</script>

<h1>{article.title}</h1>
<p class="subtitle">{article.desc}</p>
<section>
  <p>
    {@html article.content}
  </p>
  <p>
    <label for="mn-back" class="margin-toggle">&#11621;</label>
    <input type="checkbox" id="mn-back" class="margin-toggle" />
    <span class="marginnote">
      <a href="/">GO BACK...</a>
    </span>
    <small><i>{article.createdAt}</i></small>
  </p>

</section>
