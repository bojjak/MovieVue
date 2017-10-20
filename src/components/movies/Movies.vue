<template>
  <div class="container">
    <h1>{{ msg }}</h1>

    <div class="row">
      <div class="col-md-12">
        <nav aria-label="Page navigation example" class="col-xs-12 d-flex justify-content-center">
          <ul class="pagination">
            <!-- <li class="page-item"><a class="page-link" href="javascript:void(0);" :disabled="true" @click="paginationPage(-1)" >Previous</a></li> -->
            <li class="page-item"><a class="page-link" href="javascript:void(0);" @click="setPage(1)">1</a></li>
            <li class="page-item"><a class="page-link" href="javascript:void(0);" @click="setPage(2)">2</a></li>
            <li class="page-item"><a class="page-link" href="javascript:void(0);" @click="setPage(3)">3</a></li>
            <!-- <li class="page-item"><a class="page-link" href="javascript:void(0);" @click="paginationPage(1)">Next</a></li> -->
          </ul>
        </nav>
        </div>
        
        <MovieBox v-for="movie in movieList" :movie="movie"></MovieBox>    

        <!-- <div class="col-md-3 d-flex align-items-stretch" v-for="movie in movieList">
          <div class="card" style="width: 20rem;">
            <router-link  :to="{path: '/movie/' + movie.id}">
              <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card image cap">
            </router-link>
            <div class="card-body">
              <router-link :to="{path: '/movie/' + movie.id}">
                <h4 class="card-title">{{ movie.title }}</h4>
              </router-link> 
              <p class="card-text">{{ movie.vote_average }}</p>
            </div>
          </div>
        </div>  -->       
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieBox from '@/components/MovieBox'

export default {
  name: 'Movies',
  components: {
    'MovieBox': MovieBox
  },
  beforeMount () {
    this.getMovies()
  },
  data () {
    return {
      page: 1,
      msg: 'Popular movies',
      movieList: []
    }
  },
  methods: {
    getMovies () {
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/popular?api_key=d6567c81b3f90902e0886a226056f0d6&page=' + this.page,
        responseType: 'stream'
      })
        .then(function (response) {
          that.movieList = response.data.results
        })
    },
    paginationPage (param) {
      if (this.page-- <= 0 || this.page ++ >= 4) {
        return
      }
      this.page += param
      console.log(this.page)
      this.getMovies()
    },
    setPage (param) {
      this.page = param
      console.log(this.page)
      this.getMovies()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    margin-bottom: 25px;
  }
</style>
