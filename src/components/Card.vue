<template>
  <div class="card" :class="cardColor">
    {{card.rank}} <span v-html="suitSymbol"></span>
  </div>
</template>

<script>
import { CLUB, DIAMOND, HEART, SPADE } from "../constants/cards"
import { isValidCard } from '../models/card'

export default {
  props: {
    card: {
      validator: value => isValidCard(value)
    },
  },
  computed: {
    suitSymbol() {
      return `&${this.card.suit};`
    },

    cardColor() {
      return {
        'black-suit': this.card.suit === SPADE || this.card.suit === CLUB,
        'red-suit': this.card.suit === HEART || this.card.suit === DIAMOND,
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