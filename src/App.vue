<template>
  <div class="text-center">
    <button @click="startGame">Start</button>
  </div>
  <div class="game-container">
    <player-hand :name="'Player 1'" :hand="playerHand" />
    <section class="deck-area">
      <button>Take Deck</button>
    </section>
    <section class="player-hand">
      <h1>Player 2</h1>
    </section>
  </div>
</template>

<script>
import PlayerHand from './components/PlayerHand'
import { RANKS } from './constants/ranks'
import { SUITS } from './constants/suits'

export default {
  name: 'App',
  components: {
    PlayerHand,
  },
  data() {
    return {
      deck: [],
      playerHand: [],
    }
  },
  mounted() {
    
  },
  methods: {
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
      this.playerHand = this.deck.slice(0, cardsPerPlayer)
      this.deck = this.deck.slice(cardsPerPlayer, this.deck.length)
    }
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
