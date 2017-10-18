<template>
  <div class="search-results">
    <div class="container">
      <h3>{{ headline }}</h3>
      <div class="row" v-if="searchResponse.results.length > 0">
        <div class="col-md-4" v-for="movie in searchResponse.results">
            <div class="card d-flex align-items-stretch">
              <router-link  :to="{path: '/movie/' + movie.id}">
                <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" alt="Card image cap">
              </router-link>
              <div class="card-body">
                <router-link :to="{path: '/movie/' + movie.id}">
                  <h4 class="card-title">{{ movie.original_name || movie.title }}</h4>
                </router-link> 
              </div>
            </div>
          </div>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  props: ['searchResponse'],
  name: 'SearchResults',
  watch: {
    // watch URL, so when you change movie from this component, content will reload
    searchResponse: function (newVal, oldVal) {
      alert(1)
    }
  },
  beforeMount () {
    // load all data before mounting this component
    console.log(this.searchResponse)
    this.changeHeadline()
  },
  data () {
    return {
      headline: 'There is no data for your search'
    }
  },
  methods: {
    changeHeadline () {
      if (this.searchResponse != null) {
        this.headline = 'Your Search Results:'
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
