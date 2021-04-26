<template>
  <div class="card" :class="conditionalClass" @click="onClick">
    {{card.rank}} <span v-html="suitSymbol"></span>
  </div>
</template>

<script>
import { CLUB, DIAMOND, HEART, SPADE } from "../constants/cards"
// import { isValidCard } from '../models/card'

export default {
  props: {
    card: Object,
    enabled: {
      type: Boolean,
      default: true,
    },
    open: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['select'],
  computed: {
    suitSymbol() {
      return `&${this.card.suit};`
    },

    conditionalClass() {
      return {
        'black-suit': this.card.suit === SPADE || this.card.suit === CLUB,
        'red-suit': this.card.suit === HEART || this.card.suit === DIAMOND,
        'is-enabled': this.enabled,
      }
    }
  },
  methods: {
    onClick() {
      if (this.enabled) {
        this.$emit('select')
      }
    },
  },
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
  background: #eee;
}

.is-enabled {
  cursor: pointer;
  background: #fff;
}

.black-suit {
  color: black;
}

.red-suit {
  color: red;
}
</style>