<template>
  <section class="player" :class="conditionalClass">
    <h1>{{player.name}}</h1>
    <div class="hand-placeholder">
      <div v-for="(hand, idx) in paginatedHands" :key="idx" class="hand">
        <card 
          v-for="(card, idx) in hand" 
          :key="idx"
          :card="card"
          :enabled="shouldEnable(card)"
          :style="{ position: 'absolute', top: `${50 * idx}px` }"
          @select="$emit('play', card)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Card from './Card'
// import { isValidCard } from "../models/card"

export default {
  components: {
    Card,
  },
  props: {
    player: {
      type: Object,
    },
    // name: {
    //   type: String,
    //   required: true, 
    // },
    // hand: {
    //   type: Array,
      // validator(value) {
      //   return Array.isArray(value) && value.every(isValidCard)
      // }
    // },
    isTurn: {
      type: Boolean,
      default: false,
    },
    activeSuit: {
      default: null,
    }
  },
  emits: ['play'],
  computed: {
    conditionalClass() {
      return { 'is-turn': this.isTurn }
    },

    paginatedHands() {
      const cardsPerPage = 7
      return this.player.hand.reduce((all, current, idx) => {
        if (idx % cardsPerPage === 0) {
          return [...all, [current]]
        }
        
        const currentIndex = Math.floor(idx / cardsPerPage)  
        const currentPage = [...all[currentIndex], current]
        const allWithoutCurrent = all.filter((_, index) => index !== currentIndex)

        return [...allWithoutCurrent, currentPage]
      }, [])
    }
  },
  methods: {
    shouldEnable(card) {
      return this.isTurn && (this.activeSuit === null || card.suit === this.activeSuit)
    }
  }
}
</script>

<style>
.hand {
  position: relative;
  width: 75px;
}

.hand-placeholder {
  display: flex;
}

.is-turn h1 {
  color: red;
}
</style>