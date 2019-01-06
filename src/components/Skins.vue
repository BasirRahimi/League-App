<template>
  <v-carousel class="carousel" ref="skinsCarousel" :class="{loading: loading}" :height="height" :hide-controls="loading" hide-delimiters>
    <v-carousel-item v-for="skin in skins" :key="skin.id" :src="imgSrc(skin)">
      <div v-if="!loading" class="skin-name">
        {{skin.name === 'default' ? championId : skin.name}}
      </div>
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
    },
  },
  data() {
    return {
      height: ''
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.loading) {
        this.height = 560
      } else {
        this.height = this.$refs.skinsCarousel.$el.clientWidth*(717/1215)
      }
    })
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
.skin-name {
  text-align: center;
  color: #FBC02D;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
