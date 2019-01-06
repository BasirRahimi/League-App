<template>
  <v-container fluid class="champion-container">
    <v-layout justify-center class="mb-3">
      <v-card class="px-4 py-2 text-xs-center">
        <h1>{{champion.name}}</h1>
        <div class="subheading">{{champion.title}}</div>
      </v-card>
    </v-layout>
    <v-layout justify-center class="mb-3">
      <v-avatar class="champion-avatar elevation-10" size="256">
        <v-img lazy-src="/loader.gif" :src="'/champion-avatars/'+champion.id+'_0.jpg'"></v-img>
      </v-avatar>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="pa-3 champion-lore" :height="loreExpanded ? calculatedLoreHeight() : 125">
          <h2 ref="championLoreTitle">Lore</h2>
          <div class="text"><p ref="championLoreText">{{champion.lore}}</p></div>
          <v-btn small absolute right bottom @click="loreExpanded = !loreExpanded">{{loreExpanded ? 'Show Less' : 'Show More'}}</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Skins from '../components/Skins.vue'
export default {
  name: 'champion',
  components: {
    // 'skins': Skins
  },
  data() {
    return {
      champion: [],
      loreExpanded: false,
    }
  },
  beforeMount() {
    this.$http.get('http://ddragon.leagueoflegends.com/cdn/'+this.$store.state.lolVersion+'/data/en_US/champion/'+this.$route.params.id+'.json')
    .then(response=>{
      this.champion = response.body.data[this.$route.params.id]
    })
  },
  methods: {
    calculatedLoreHeight() {
      return (this.$refs.championLoreText.scrollHeight + this.$refs.championLoreTitle.scrollHeight + 32);
    }
  }
}
</script>
<style lang="scss" scoped>
.champion-container {
  position: relative;
  height: 100%;
  .champion-avatar {
    @media only screen and (min-width: 960px) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    } 
  }
  .champion-lore {
    display: flex;
    flex-direction: column;
    height: 125px;
    .text {
      flex: 0 1 auto;
      min-height: 0;
      overflow: hidden;
      p {
        margin: 0;
      }
    }
  }
}
</style>
