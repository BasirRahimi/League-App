<template>
  <v-carousel class="carousel" :class="{loading: loading}" :height="height" :hide-controls="loading" :hide-delimiters="loading">
    <v-carousel-item v-for="skin in skins" :key="skin.id" :src="imgSrc(skin)">
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: 'skins',
  props: {
    skins: {
      type: Array
    },
    championId: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      height: '717'
    }
  },
  beforeMount() {
    if(this.loading) {
      this.height = '560'
    }
  },
  methods: {
    imgSrc(skin) {
      if(this.loading) {
        return 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+this.championId+'_'+skin.num+'.jpg'
      } else {
        return 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+this.championId+'_'+skin.num+'.jpg'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel {
  max-width: 1217px;
  &.loading {
    max-width: 308px;
  }
}
</style>
