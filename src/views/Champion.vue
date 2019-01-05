<template>
  <v-container fluid class="champion-container">
    <v-avatar class="champion-avatar elevation-10" ref="championAvatar">
      <v-img lazy-src="/loader.gif" :src="'/champion-avatars/'+champion.id+'_0.jpg'"></v-img>
    </v-avatar>
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
      champion: []
    }
  },
  beforeMount() {
    this.$http.get('http://ddragon.leagueoflegends.com/cdn/'+this.$store.state.lolVersion+'/data/en_US/champion/'+this.$route.params.id+'.json')
    .then(response=>{
      this.champion = response.body.data[this.$route.params.id]
    })
  },
  mounted() {
    var _self = this;
    this.$nextTick(()=>{
      _self.setAvatarStyle()
    })
  },
  computed: {
    championPosition() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'top: 150px;'
        case 'sm': return 'top: 50%;'
        case 'md': return 'top: 50%;'
        case 'lg': return 'top: 50%;'
        case 'xl': return 'top: 50%;'
      }
      return 'top: 50%;'
    }
  },
  methods: {
    setAvatarStyle() {
      this.$refs.championAvatar.setAttribute('style', this.championPosition + 'height: 256px; width: 256px;')
    }
  }
}
</script>
<style lang="scss" scoped>
.champion-container {
  position: relative;
  height: 100%;
  .champion-avatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
