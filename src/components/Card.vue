<template>
  <div class="card" :class="conditionalClass" @click="onClick">
    <div v-show="!faceDown">
      {{card.rank}} <span v-html="suitSymbol"></span>
    </div>
  </div>
</template>

<script>
import { CLUB, DIAMOND, HEART, SPADE } from "../constants/cards"

export default {
  props: {
    card: Object,
    enabled: {
      type: Boolean,
      default: true,
    },
    faceDown: {
      type: Boolean,
      default: false,
    },
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
        'is-face-down': this.faceDown,
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

.is-face-down {
  background-image: url('https://ic.pics.livejournal.com/dailyafirmation/691132/529371/529371_original.jpg');
  background-size: cover;
  background-position: center;
}

.black-suit {
  color: black;
}

.red-suit {
  color: red;
}
</style>