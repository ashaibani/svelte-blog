<script>
  export let isLoggedIn = false;
</script>

<style>
  .sidenav {
    height: 10%; /* Full-height: remove this if you want "auto" height */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    float: right;
    clear: right;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }
</style>

<div class="sidenav">
<a href="/">HOME</a>
  {#if isLoggedIn}
    <a href="create-article">CREATE</a>
    <a href="logout">LOGOUT</a>
  {:else}
    <a href="/login">LOGIN</a>
  {/if}
</div>
