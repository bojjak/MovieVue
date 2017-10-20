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
      
        <!-- <div class="col-md-4 d-flex align-items-stretch" v-for="show in movieList">
          <div class="card" style="width: 20rem;">
            <router-link  :to="{path: '/show/' + show.id}">
              <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + show.poster_path" alt="Card image cap">
            </router-link>
            <div class="card-body">
              <router-link :to="{path: '/movie/' + show.id}">
                <h4 class="card-title">{{ show.title }}</h4>
              </router-link> 
              <p class="card-text">{{ show.overview }}</p>
            </div>
          </div>
        </div>  -->    
        <movie-box v-for="show in seriesList" :movie="show"></movie-box>   
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieBox from '@/components/MovieBox'

export default {
  name: 'Series',
  components: {
    'movie-box': MovieBox
  },
  beforeMount () {
    this.getMovies()
  },
  data () {
    return {
      page: 1,
      msg: 'Popular Series',
      seriesList: []
    }
  },
  methods: {
    getMovies () {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/tv/popular?api_key=d6567c81b3f90902e0886a226056f0d6&page=' + this.page,
        responseType: 'stream'
      })
        .then(response => {
          this.seriesList = response.data.results
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
