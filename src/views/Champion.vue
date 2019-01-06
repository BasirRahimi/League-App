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
    <v-layout row wrap class="mb-5">
      <v-flex xs12>
        <v-card class="pa-3 champion-lore" :height="loreExpanded ? calculatedLoreHeight() : 125">
          <h2 ref="championLoreTitle">Lore</h2>
          <div class="text font-weight-light"><p ref="championLoreText">{{champion.lore}}</p></div>
          <v-btn small absolute right bottom @click="loreExpanded = !loreExpanded">{{loreExpanded ? 'Show Less' : 'Show More'}}</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="pa-3 champion-abilities">
          <h2>Abilities</h2>
          <v-tabs height="76px" centered slider-color="yellow darken-2" show-arrows v-model="abilityTab">
            <v-tab href="#tab-0"><img height="64" width="64" :src="'http://ddragon.leagueoflegends.com/cdn/'+$store.state.lolVersion+'/img/passive/'+ champion.passive.image.full"></v-tab>
            <v-tab v-for="(spell,index) in champion.spells" :key="spell.id" :href="'#tab-'+(index + 1)"><img height="64" width="64" :src="'http://ddragon.leagueoflegends.com/cdn/'+$store.state.lolVersion+'/img/spell/' + spell.image.full"></v-tab>
          </v-tabs>
          <v-tabs-items v-model="abilityTab">
            <v-tab-item class="font-weight-light ability-tab" value="tab-0">
              <div class="font-weight-light ability-header my-3 title">
                {{champion.passive.name}}
                <v-chip color="yellow darken-2" label disabled text-color="black" class="font-weight-medium ability-key-chip">Passive</v-chip>
              </div>
              {{champion.passive.description}}
            </v-tab-item>
            <v-tab-item class="font-weight-light ability-tab" v-for="(spell,index) in champion.spells" :key="spell.id" :value="'tab-'+(index + 1)">
              <div class="font-weight-light ability-header my-3 title">
                {{spell.name}}
                <v-chip color="yellow darken-2" label disabled text-color="black" class="font-weight-medium ability-key-chip">{{abilityKey(index)}}</v-chip>
              </div>
              {{spell.description}}
            </v-tab-item>
          </v-tabs-items>
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
      abilityTab: 'tab-1'
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
    },
    abilityKey(index) {
      switch (index) {
        case 0:
          return 'Q';
        case 1:
          return 'W';
        case 2:
          return 'E';
        case 3:
          return 'Ultimate';
      }
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
  .ability-key-chip {
    float: right;
    margin: 0;
  }
  .ability-header {
    border-bottom: 2px solid #FBC02D;
    padding-bottom: 12px;
  }
}
</style>
