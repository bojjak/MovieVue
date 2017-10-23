<template>
  <div class="search-results">
    <div class="container">
      <h3>{{ headline }}</h3>

      <div class="row">
        <div class="col-md-3">
          <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action  d-flex justify-content-between align-items-center active" :class="{ disabled: movieResults.length == 0 }">
              Movies
              <span class="badge badge-dark badge-pill" v-if="movieResults.length > 0">{{ movieResults.length }}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{ disabled: showResults.length == 0 }" @click="results = showResults">
              TV shows
              <span class="badge badge-dark badge-pill" v-if="showResults.length > 0">{{ showResults.length }}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{ disabled: personResults.length == 0 }" @click="results = personResults">
              People
              <span class="badge badge-dark badge-pill" v-if="personResults.length > 0">{{ personResults.length }}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{ disabled: collectionResults.length == 0 }">
              Collections
              <span class="badge badge-dark badge-pill" v-if="collectionResults.length > 0">{{ collectionResults.length }}</span>
            </button>
          </div>
        </div>

        <div class="col-md-9">
          <div class="row">

            <div class="col-md-12 mb-3" v-for="single in results">
              <search-result-box :resultData="single"></search-result-box>
            </div>

          </div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import SearchResultsBox from '@/components/SearchResultsBox'
import axios from 'axios' // enable axios api requests

export default {
  props: ['searchQuery'],
  name: 'SearchResults',
  components: {
    'search-result-box': SearchResultsBox
  },
  watch: {
    // watch URL, so when you change movie from this component, content will reload
    searchQuery: function (newVal, oldVal) {
      // asd
      this.searchMovie(newVal)
      this.searchShows(newVal)
      this.searchPeople(newVal)
      this.searchCollections(newVal)
    }
  },
  beforeMount () {
    // load all data before mounting this component
    this.changeHeadline()
    this.searchMovie(this.searchQuery)
    this.searchShows(this.searchQuery)
    this.searchPeople(this.searchQuery)
    this.searchCollections(this.searchQuery)
  },
  data () {
    return {
      headline: 'There is no data for your search',
      results: [],
      movieResults: [],
      showResults: [],
      personResults: [],
      collectionResults: []
    }
  },
  methods: {
    changeHeadline () {
      if (this.searchQuery != null) {
        this.headline = 'Your Search Results:'
      }
    },
    searchMovie (param) {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/movie?api_key=d6567c81b3f90902e0886a226056f0d6&' + param,
        responseType: 'stream'
      })
        .then(response => {
          this.results = response.data.results
          this.movieResults = response.data.results
        })
    },
    searchShows (param) {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/tv?api_key=d6567c81b3f90902e0886a226056f0d6&' + param,
        responseType: 'stream'
      })
        .then(response => {
          this.showResults = response.data.results
        })
    },
    searchPeople (param) {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/person?api_key=d6567c81b3f90902e0886a226056f0d6&' + param,
        responseType: 'stream'
      })
        .then(response => {
          this.personResults = response.data.results
        })
    },
    searchCollections (param) {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/collection?api_key=d6567c81b3f90902e0886a226056f0d6&' + param,
        responseType: 'stream'
      })
        .then(response => {
          console.log(response)
          this.collectionResults = response.data.results
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
