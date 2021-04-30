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
          :faceDown="!isTurn"
          :style="cardStyle(idx)"
          @select="$emit('play', card)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Card from './Card'

export default {
  components: {
    Card,
  },
  props: {
    player: {
      type: Object,
    },
    isTurn: {
      type: Boolean,
      default: false,
    },
    activeSuit: {
      default: null,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['play'],
  computed: {
    conditionalClass() {
      return { 
        'is-turn': this.isTurn,
        'horizontal': this.horizontal,
      }
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
    },

    cardStyle(pageIndex) {
      const initialStyle = { position: 'absolute' }
      const offsetSide = this.horizontal ? 'left' : 'top'
      const offsetValue = `${50 * pageIndex}px`

      return { ...initialStyle, [offsetSide]: offsetValue, }
    }
  }
}
</script>

<style>
.player.horizontal {
  min-width: 400px;
}

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

.horizontal .hand {
  width: auto;
  height: 75px;
}

.horizontal .hand-placeholder {
  flex-direction: column;
}
</style>