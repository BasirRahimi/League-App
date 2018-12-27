<template>
  <v-container fluid>
    <!-- <v-avatar size="240">
      <img :src="'http://ddragon.leagueoflegends.com/cdn/'+$store.state.lolVersion+'/img/champion/'+champion.image.full" :alt="champion.name">
    </v-avatar> -->
    <h1>Skins</h1>
    <skins :skins="champion.skins" :champion-id="$route.params.id"/>
  </v-container>
</template>

<script>
import Skins from '../components/Skins.vue'
export default {
  name: 'champion',
  components: {
    'skins': Skins
  },
  data() {
    return {
      champion: []
    }
  },
  beforeMount() {
    this.$http.get('http://ddragon.leagueoflegends.com/cdn/'+this.$store.state.lolVersion+'/data/en_US/champion/'+this.$route.params.id+'.json')
    .then(response=>{
      this.champion = response.body.data[this.$route.params.id];
    })
  }
}
</script>
<style lang="scss" scoped>
.carousel {
  max-width: 1217px;
}
</style>
