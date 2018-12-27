<template>
  <v-container fluid>
    
    <skins :skins="champion.skins" :champion-id="$route.params.id" loading/>
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
      this.champion = response.body.data[this.$route.params.id]
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
