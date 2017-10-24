<template>
  <div class="search-results">
    <div class="container">
      <h3>{{ headline }}</h3>
      
      <tabs>
        <tab name="Movies" :selected="true" :quantity="movieResults.length">
          <div class="col-md-12 mb-3" v-for="single in movieResults">
            <search-result-box :resultData="single"></search-result-box>
          </div>
        </tab>
        <tab name="TV shows" :quantity="2">
          <div class="col-md-12 mb-3" v-for="single in showResults">
            <search-result-box :resultData="single"></search-result-box>
          </div>
        </tab>
        <tab name="People" :quantity="personResults.length">
          <div class="col-md-12 mb-3" v-for="single in personResults">
            <search-result-box :resultData="single"></search-result-box>
          </div>
        </tab>
        <tab name="Collections" :quantity="5">
          <div class="col-md-12 mb-3" v-for="single in collectionResults">
            <search-result-box :resultData="single"></search-result-box>
          </div>
        </tab>
      </tabs>


      

     <!--  <div class="row">
        <div class="col-md-3">
          <div class="list-group mb-3">
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
            <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{ disabled: collectionResults.length == 0 }" >
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
      </div> -->
    </div>
    

  </div>
</template>

<script>
import SearchResultsBox from '@/components/SearchResultsBox'
import Tabs from '@/components/Tabs'
import Tab from '@/components/Tab'
import axios from 'axios' // enable axios api requests

export default {
  props: ['searchQuery'],
  name: 'SearchResults',
  components: {
    'search-result-box': SearchResultsBox,
    'tabs': Tabs,
    'tab': Tab
  },
  watch: {
    searchQuery: function (newVal, oldVal) {
      this.searchMovie(newVal)
      this.searchShows(newVal)
      this.searchPeople(newVal)
      this.searchCollections(newVal)
    }
  },
  beforeMount () {
    // load all data before mounting this component
    this.searchMovie(this.searchQuery)
    this.searchShows(this.searchQuery)
    this.searchPeople(this.searchQuery)
    this.searchCollections(this.searchQuery)
  },
  data () {
    return {
      headline: 'Your results',
      results: [],
      movieResults: [],
      showResults: [],
      personResults: [],
      collectionResults: []
    }
  },
  methods: {
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
