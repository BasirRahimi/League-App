<template>
  <v-container fluid>
    <v-layout justify-center wrap>
      <v-card hover ripple class="ma-2" v-for="champion in champions" :key="champion.id" @click="loadChampion(champion.id)">
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
      champions: {},
      count: 0,
    }
  },
  beforeMount() {
    this.$http.get('http://ddragon.leagueoflegends.com/cdn/'+this.$store.state.lolVersion+'/data/en_US/champion.json')
    .then(response => {
      this.champions = response.body.data
      this.count = Object.keys(this.champions).length;
    })
  },
  methods: {
    loadChampion(championId) {
      this.$router.push({name: 'champion', params: {id: championId}});
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

