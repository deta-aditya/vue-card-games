<template>
  <div class="card" :class="cardColor">
    {{card.rank}} <span v-html="suitSymbol"></span>
  </div>
</template>

<script>
import { CLUB, DIAMOND, HEART, SPADE } from "../constants/cards"
// import { isValidCard } from '../models/card'

export default {
  props: {
    card: Object,
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
.card {
  border: 1px solid #DDD;
  padding: 5px;
  width: 50px;
  height: 60px;
  font-size: 18pt;
  margin-bottom: 5px;
  box-shadow: 0px 2px 3px 1px #aaa;
  background: white;
}

.black-suit {
  color: black;
}

.red-suit {
  color: red;
}
</style>