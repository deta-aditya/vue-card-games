<template>
  <div class="game-container">
    <player-hand v-bind="settings.players[0]" />
    <section class="deck-area">
      <button>Take Deck</button>
    </section>
    <player-hand v-bind="settings.players[1]" />
  </div>
</template>

<script>
import PlayerHand from './PlayerHand.vue'
import { RANKS } from '../constants/ranks'
import { SUITS } from '../constants/suits'

export default {
  components: { PlayerHand },
  props: {
    settings: Object
  },
  data() {
    return {
      ...this.settings,
      deck: [],
    }
  },
  mounted() {
    this.startGame()
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
      this.players.forEach((_, idx) => {
        this.players[idx].hand = this.deck.slice(0, cardsPerPlayer)
        this.deck = this.deck.slice(cardsPerPlayer, this.deck.length)
      })
    },
  }
}
</script>

<style>

</style>