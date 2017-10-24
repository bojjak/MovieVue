<template>
  <div class="card bg-light">
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <router-link  :to="{path: '/show/' + resultData.id}">
            <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + resultData.poster_path" alt="Card image cap">
          </router-link>
          <!-- <img class="" :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + resultData.poster_path" alt="Card image cap"> -->
        </div>
        <div class="col-md-9">
          <div class="d-flex justify-content-between mb-3">
            <!-- <span>{{ resultData.title }}</span> -->
            <router-link :to="{path: '/show/' + resultData.id}">
              <h4 class="card-title">{{ resultData.name }}</h4>
            </router-link> 
            <span>{{ resultData.vote_average }} <i class="fa fa-star" aria-hidden="true"></i></span>
          </div>

          <div class="d-flex justify-content-between mb-5">
            <span><i class="fa fa-calendar" aria-hidden="true"></i> {{ resultData.first_air_date }} </span>
            <span>
              <span class="badge badge-pill badge-dark mr-1" v-for="genre in resultData.genre_ids"> {{ genre }} </span>
            </span>
          </div>
          
          <div class="overview">
            <p> {{ resultData.overview }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resultData'],
  name: 'SearchResultsShowBox'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
