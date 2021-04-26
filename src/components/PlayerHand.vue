<template>
  <section class="player">
    <h1>{{name}}</h1>
    <div class="hand">
      <card 
        v-for="(card, idx) in hand" 
        :key="card.rank + '' + card.suit"
        :card="card"
        :style="{ position: 'absolute', top: `${50 * idx}px` }"
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
    name: {
      type: String,
      required: true,
    },
    hand: {
      type: Array,
      // validator(value) {
      //   return Array.isArray(value) && value.every(isValidCard)
      // }
    }
  },
  methods: {
  }
}
</script>

<style>
.hand {
  position: relative;
}
</style>