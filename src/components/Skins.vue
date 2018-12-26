<template>
  <v-carousel class="carousel" height="717">
    <v-carousel-item v-for="skin in skins" :key="skin.id" :src="'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+championId+'_'+skin.num+'.jpg'">
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
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
