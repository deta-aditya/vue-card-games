<template>
  <main-menu 
    v-show="state === MAIN_MENU" 
    @started="toStartingGame" />
  <starting-game 
    v-show="state === STARTING_GAME" 
    @start="toStartGame" 
    @back="toMainMenu" />
  <div v-show="state === INGAME" class="game-container">
    <player-hand :name="'Player 1'" :hand="playerHands[0]" />
    <section class="deck-area">
      <button>Take Deck</button>
    </section>
    <player-hand :name="'Player 2'" :hand="playerHands[1]" />
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue';
import PlayerHand from './components/PlayerHand'
import StartingGame from './components/StartingGame.vue';
import { MAIN_MENU, STARTING_GAME, INGAME } from "./constants/game-status";
import { RANKS } from './constants/ranks'
import { SUITS } from './constants/suits'

export default {
  name: 'App',
  components: {
    PlayerHand,
    MainMenu,
    StartingGame,
  },
  data() {
    return {
      state: MAIN_MENU,
      deck: [],
      playerHands: [[], []],
    }
  },
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
      this.startGame()
    },

    startGame() {
      this.initializeDeck()
      this.shuffleDeck()
      this.distributeHand()
    },

    initializeDeck() {
      this.deck = SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank })))
    },

    shuffleDeck() {
      this.deck = this.deck.sort(() => Math.random() - 0.5)
    },

    distributeHand() {
      const cardsPerPlayer = 7
      this.playerHands.forEach((_, idx) => {
        this.playerHands[idx] = this.deck.slice(0, cardsPerPlayer)
        this.deck = this.deck.slice(cardsPerPlayer, this.deck.length)
      })
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
  margin-top: 60px;
}

.text-center {
  text-align: center;
}

.game-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.deck-area {
  width: 400px;
  text-align: center;
}
</style>
