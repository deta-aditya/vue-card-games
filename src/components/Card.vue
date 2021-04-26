<template>
  <div class="card" :class="cardColor">
    {{rank}} <span v-html="suitSymbol"></span>
  </div>
</template>

<script>
import { CLUB, DIAMOND, HEART, RANKS, SPADE, SUITS } from "../constants/cards"

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
      return {
        'black-suit': this.suit === SPADE || this.suit === CLUB,
        'red-suit': this.suit === HEART || this.suit === DIAMOND,
      }
    }
  }
}
</script>

<style>
.black-suit {
  color: black;
}

.red-suit {
  color: red;
}
</style>