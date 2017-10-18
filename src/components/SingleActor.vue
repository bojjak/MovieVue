<template>
  <div class="Single">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <img :src="'https://image.tmdb.org/t/p/w500' + actor.profile_path" alt="Img not available" class="img-fluid">
          <hr>
          <div class="text-left">
            <h3 class="mb-2">Personal info</h3>
            <hr>
            <p class="m-0"><strong>Gender</strong></p>
            <p>{{ gender }}</p>
            <hr>
            <p class="m-0"><strong>Birthday</strong></p>
            <p>{{ actor.birthday }}</p>
            <hr>
            <p class="m-0"><strong>Place of Birth</strong></p>
            <p>{{ actor.place_of_birth }}</p>
            <hr>
            <p class="m-0"><strong>Known Credits:</strong></p>
            <p>{{ casts.length }}</p>
          </div>
        </div>
        <div class="col-md-8">
          <h1>{{ actor.name }} <a :href="imdbLink" v-if="actor.imdb_id"><i class="fa fa-imdb" aria-hidden="true"></i></a> <img src="http://www.ecsmokes.com/assets/images/under-18-no-admit.png" v-if="actor.adult == true"></h1>

          <p>{{ actor.biography }}</p>

          <p>Known for:</p>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Name</th>
                <th>Character</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cast, index) in casts">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <img :src="'https://image.tmdb.org/t/p/w500' + cast.poster_path" alt="Img not available" class="img-fluid" v-if="cast.poster_path">
                  <img :src="'https://image.tmdb.org/t/p/w500' + cast.backdrop_path" alt="Img not available" class="img-fluid" v-if="!cast.poster_path">
                </td>
                <td>{{ cast.title || cast.name }}</td>
                <td>{{ cast.character }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>   

  </div>
</template>

<script>
import axios from 'axios' // enable axios api requests
export default {
  props: ['id'],

  name: 'SingleActor',

  watch: {
    // watch URL, so when you change movie from this component, content will reload
    '$route' (to, from) {
      this.getThisActor(to.params.id)
      this.getMovieCast(to.params.id)
    }
  },

  beforeMount () {
    // load all data before mounting this component
    this.getThisActor(this.id)
    this.getMovieCast(this.id)
  },

  data () {
    return {
      actor: [],
      casts: []
    }
  },
  computed: {
    imdbLink () {
      return 'http://www.imdb.com/name/' + this.actor.imdb_id
    },
    gender () {
      if (this.actor.gender === 1) {
        return 'Female'
      } else if (this.actor.gender === 2) {
        return 'Male'
      }
    }
  },

  methods: {
    getThisActor (paramId) {
      // get this movie info API
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/person/' + paramId + '?api_key=d6567c81b3f90902e0886a226056f0d6&page=1',
        responseType: 'stream'
      })
        .then(function (response) {
          that.actor = response.data
        })
    },
    getMovieCast (param) {
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/person/' + param + '/combined_credits?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(function (response) {
          console.log(response)
          that.casts = response.data.cast
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .jumbotron{
    height: 500px;
  }
  tbody td {
    text-align: left;
  }
  tbody td img {
    height: 100px;
  }
</style>
