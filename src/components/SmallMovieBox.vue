<template>
  <div class="col-md-3 d-flex align-items-stretch">
      <router-link  :to="{path: '/movie/' + movie.id}" v-if="movie.title">
        <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card image cap">
      </router-link>
      <router-link  :to="{path: '/show/' + movie.id}" v-if="movie.name">
        <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card image cap">
      </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'movie'
  ],
  name: 'movieBox'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-md-3{
    margin-bottom: 25px;
  }
</style>
