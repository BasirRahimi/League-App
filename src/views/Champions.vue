<template>
  <v-container fluid>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <v-text-field label="Filter Champions" color="yellow darken-2" class="champion-filter" v-model="championFilter"></v-text-field>
      </v-flex>
      <v-card hover ripple class="ma-2" v-for="champion in filteredChampions" :key="champion.id" @click="loadChampion(champion.id)">
        <v-img 
          :src="'http://ddragon.leagueoflegends.com/cdn/'+$store.state.lolVersion+'/img/champion/'+champion.image.full" :alt="champion.name"
          width="100px"
          height="100px">
        </v-img>
        <p class="mx-auto my-0 py-1 text-xs-center">{{champion.name}}</p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'champions',
  data() {
    return {
      champions: [],
      count: 0,
      championFilter: ''
    }
  },
  beforeMount() {
    this.$http.get('http://ddragon.leagueoflegends.com/cdn/'+this.$store.state.lolVersion+'/data/en_US/champion.json')
    .then(response => {
      let champions = response.body.data
      for(var key in champions) {
        this.champions.push(champions[key])
      }
      this.count = this.champions.length
    })
  },
  computed: {
    filteredChampions() {
      return this.champions.filter((champion)=>{
        return champion.name.toLowerCase().match(this.championFilter.toLowerCase())
      })
    },
  },
  methods: {
    loadChampion(championId) {
      this.$router.push({name: 'champion', params: {id: championId}})
    }
  },
}
</script>

<style lang="scss" scoped>
.champion-filter {
  max-width: 520px;
  margin: auto;
}
</style>

