<template>
  <section class="player" :class="conditionalClass">
    <h1>{{player.name}}</h1>
    <div class="hand">
      <card 
        v-for="(card, idx) in player.hand" 
        :key="idx"
        :card="card"
        :enabled="shouldEnable(card)"
        :style="{ position: 'absolute', top: `${50 * idx}px` }"
        @select="$emit('play', card)"
      />
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
}

.is-turn h1 {
  color: red;
}
</style>