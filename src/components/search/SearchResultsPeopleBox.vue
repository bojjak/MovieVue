<template>
  <div class="card bg-light">
    <div class="card-body">
      <div class="row">
        <div class="col-md-3 d-flex align-items-center">
          <router-link  :to="{path: '/actor/' + resultData.id}">
            <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w90_and_h90_bestv2' + resultData.profile_path" alt="Card image cap">
          </router-link>
        </div>
        <div class="col-md-9">
            <!-- <span>{{ resultData.title }}</span> -->
            <router-link :to="{path: '/actor/' + resultData.id}">
              <h4 class="card-title">{{ resultData.name }}</h4>
            </router-link> 
            <p>
              <small v-for="cast in resultData.known_for" class="h6">
                {{ cast.title || cast.name }} <br>
              </small>
            </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resultData'],
  name: 'SearchResultsPeopleBox'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    margin-bottom: 0
  }
</style>
