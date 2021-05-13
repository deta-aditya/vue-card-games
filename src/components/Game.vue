<template>
  <game-layout @play="cardPlayed">
    <section class="game-table">
      <div v-show="!isGameOver" class="deck-placeholder">
        <button v-show="currentPlayerShouldDig" @click="digFromDeck">Dig!</button>
        <button v-show="currentPlayerShouldTake" @click="takeFromPlaced">Take</button>
      </div>
      <div v-show="!isGameOver" class="placed">
        <card v-if="starter !== null" :card="starter" />
        <template v-for="(card, idx) in placedCards" :key="idx">
          <card v-if="card !== null" :card="card" />
          <div v-else class="empty-card-slot"></div>
        </template>
      </div>
      <div class="winner-placeholder" v-show="isGameOver">
        <h1>{{ winner?.name }} Win!</h1>
        <div>
          <button @click="restartGame">Play Again</button>
          <button @click="exitGame">Main Menu</button>
        </div>
      </div>
    </section>
  </game-layout>
</template>

<script>
import Card from './Card.vue'
import GameLayout from './GameLayout.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: { Card, GameLayout },
  emits: ['exit'],
  mounted() {
    this.startGame()
  },
  computed: {
    ...mapState('game', [
      'rules',
      'players',
      'deck',
      'history',
      'turn',
      'starter',
    ]),

    ...mapGetters('game', [
      'winner',
      'activeSuit',
      'placedCards',
      'isGameOver',
      'haveAllPlaced',
      'currentPlayerShouldSkip',
      'currentPlayerShouldDig',
      'currentPlayerShouldTake',
    ]),
  },
  methods: {
    ...mapActions('game', [
      'startGame',
      'playCard',
      'digFromDeck',
      'takeFromPlaced',
    ]),

    async cardPlayed(card) {
      this.playCard({ card })
    },

    restartGame() {
      this.startGame()
    },

    exitGame() {
      this.$emit('exit')
    },
  }
}
</script>

<style>
.game-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.game-table {
  width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.deck-placeholder {
  text-align: center;
}

.placed {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.winner-placeholder {
  text-align: center;
}

.empty-card-slot {
  border: 1px solid #DDD;
  padding: 5px;
  width: 50px;
  height: 60px;
  background: #aaa;
}
</style>