<template>
  <div class="card" :style="cardColor">
    {{rank}} <span v-html="suitSymbol"></span>
  </div>
</template>

<script>
import { CLUB, RANKS, SPADE, SUITS } from "../constants/cards"

export default {
  props: {
    rank: {
      validator: value => RANKS.includes(value)
    },
    suit: {
      validator: value => SUITS.includes(value)
    }
  },
  computed: {
    suitSymbol() {
      return `&${this.suit};`
    },

    cardColor() {
      if (this.suit === SPADE || this.suit === CLUB) {
        return { color: 'black' }
      } else {
        return { color: 'red '}
      }
    }
  }
}
</script>

<style>

</style>