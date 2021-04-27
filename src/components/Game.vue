<template>
  <div class="game-container">
    <player-hand 
      :player="players[0]" 
      :isTurn="turn === 0" 
      :activeSuit="activeSuit" 
      @play="cardPlayed" />
    <section class="table">
      <div v-show="!gameOver" class="deck-placeholder">
        <button v-show="currentPlayerShouldDig" @click="digDeck">Dig!</button>
        <button v-show="isDeckExhausted">Take</button>
      </div>
      <div v-show="!gameOver" class="placed">
        <template v-for="(card, idx) in placed" :key="idx">
          <card v-if="card !== null" :card="card" />
        </template>
      </div>
      <div class="winner-placeholder" v-show="gameOver">
        <h1>{{ winner.name }} Win!</h1>
        <div>
          <button @click="restartGame">Play Again</button>
          <button @click="exitGame">Main Menu</button>
        </div>
      </div>
    </section>
    <player-hand 
      :player="players[1]" 
      :isTurn="turn === 1" 
      :activeSuit="activeSuit" 
      @play="cardPlayed" />
  </div>
</template>

<script>
import PlayerHand from './PlayerHand.vue'
import { RANKS } from '../constants/ranks'
import { SUITS } from '../constants/suits'
import Card from './Card.vue'

const defaultState = {
  turn: -1,
  placed: [],
  deck: [],
}

export default {
  components: { PlayerHand, Card },
  props: {
    settings: Object
  },
  emits: ['exit'],
  data() {
    return {
      ...this.settings,
      ...defaultState,
    }
  },
  mounted() {
    this.startGame()
  },
  computed: {
    activeSuit() {
      const anyPlacedCard = this.placed.find(card => card !== null)
      if (anyPlacedCard === undefined) {
        return null
      }
      
      return anyPlacedCard.suit
    },

    allPlaced() {
      return this.placed.every(card => card !== null)
    },

    currentPlayer() {
      return this.players[this.turn]
    },

    currentPlayerhasNoActiveSuit() {
      return this.currentPlayer.hand.every(card => card.suit !== this.activeSuit)
    },

    currentPlayerShouldDig() {
      return this.activeSuit !== null 
        && this.currentPlayerhasNoActiveSuit
        && ! this.isDeckExhausted
    },

    isDeckExhausted() {
      return this.deck.length === 0
    },

    gameOver() {
      return this.winnerIndex >= 0
    },

    winner() {
      return this.players[this.winnerIndex] ?? {}
    },

    winnerIndex() {
      return this.players.reduce((previous, current, idx) => { 
        if (current.hand.length === 0) {
          return idx
        }
        return previous
      }, -1)
    },
  },
  methods: {
    startGame() {
      this.initializeGame()
      this.shuffleDeck()
      this.distributeHand()
      this.placeStartingCard()
      this.setTurnRandomly()
    },

    initializeGame() {
      this.deck = SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank })))
      this.placed = [ ...this.players.map(() => null), null ]
    },

    shuffleDeck() {
      for (let i = 0; i < 5; i++) {
        this.deck = this.deck.sort(() => Math.random() - 0.5)
      }
    },

    distributeHand() {
      const cardsPerPlayer = 7
      this.players.forEach((_, idx) => {
        this.players[idx].hand = this.takeFromDeck(cardsPerPlayer)
      })
    },

    placeStartingCard() {
      this.placed[this.players.length] = this.takeOneFromDeck()
    },

    setTurnRandomly() {
      this.turn = Math.floor(Math.random() * this.players.length)
    },

    digDeck() {
      this.currentPlayer.hand = [...this.currentPlayer.hand, this.takeOneFromDeck()]
    },

    takeFromDeck(cards) {
      const takenCards = this.deck.slice(0, cards)
      this.deck = this.deck.slice(cards, this.deck.length)

      return takenCards
    },

    takeOneFromDeck() {
      return this.takeFromDeck(1)[0]
    },

    cardPlayed(card) {
      if (this.gameOver) {
        return
      }

      this.placeCard(card)

      if (this.allPlaced && !this.gameOver) {
        this.nextPlay()
      } else {
        this.nextTurn()
      }
    },

    placeCard(card) {
      this.placed[this.turn] = card
      
      this.currentPlayer.hand = this.currentPlayer.hand
        .filter(held => !(held.suit === card.suit && held.rank === card.rank))
    },

    nextTurn() {
      if (this.turn + 1 === this.players.length) {
        this.turn = 0
      } else {
        this.turn += 1
      }
    },

    nextPlay() {
      const { playWinner } = this.placed
        .map(card => RANKS.indexOf(card.rank))
        .reduce((prev, current, idx) => {
          const isThisBigger = current > prev.card
          const isThisNotFromDeck = idx < this.players.length

          if (isThisBigger && isThisNotFromDeck) {
            return { playWinner: idx, card: current }
          } else {
            return prev
          }
        }, { playWinner: -1, card: -1 })

      this.placed = this.players.map(() => null)
      this.turn = playWinner
    },

    restartGame() {
      this.players = this.players.map(player => ({ ...player, hand: [] }))
      this.startGame()
    },

    exitGame() {
      this.$emit('exit')
    }
  }
}
</script>

<style>
.game-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.table {
  width: 400px;
}

.deck-placeholder {
  text-align: center;
}

.placed {
  display: flex;
  justify-content: center;
}

.winner-placeholder {
  text-align: center;
}
</style>