<template>
  <main-menu 
    v-if="state === MAIN_MENU" 
    @started="toStartingGame"
  />
  <starting-game 
    v-if="state === STARTING_GAME" 
    @start="toStartGame" 
    @back="toMainMenu" 
  />
  <game 
    v-if="state === INGAME" 
    :settings="currentGameSettings"
    @exit="toMainMenu"
  />
</template>

<script>
import { mapState } from 'vuex'
import Game from './components/Game.vue'
import MainMenu from './components/MainMenu.vue'
import StartingGame from './components/StartingGame.vue'
import { MAIN_MENU, STARTING_GAME, INGAME } from "./constants/status"

export default {
  name: 'App',
  components: {
    MainMenu,
    StartingGame,
    Game,
  },
  data() {
    return {
      state: MAIN_MENU,
    }
  },
  computed: mapState({
    currentGameSettings: ({ starting }) => {
      const players = starting.players.map(name => ({ name, hand: [] }))

      return {
        ...starting,
        players
      }
    }
  }),
  created() {
    this.MAIN_MENU = MAIN_MENU
    this.STARTING_GAME = STARTING_GAME
    this.INGAME = INGAME
  },
  methods: {
    toStartingGame() {
      this.state = STARTING_GAME
    },

    toMainMenu() {
      this.state = MAIN_MENU
    },

    toStartGame() {
      this.state = INGAME
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.text-center {
  text-align: center;
}
</style>
