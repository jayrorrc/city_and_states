<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-2">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification is-primary">
            <div class="content">
              <p class="title">Menu</p>
              <div class="content">
                <!-- Content -->
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-warning is-2">
        <div class="content">
          <p class="title">Sub Menu</p>
          <div class="content">
            <!-- Content -->
          </div>
        </div>
      </article>
      <article class="tile is-child notification is-success">
        <div class="content">
          <p class="title">List</p>
          <div class="content">
            <!-- Content -->
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  components: {},
};
</script>
<style scoped>
.is-ancestor {
  margin: 5px;
}
</style>
