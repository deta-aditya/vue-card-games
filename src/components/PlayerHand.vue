<template>
  <section class="player-hand">
    <h1>{{name}}</h1>
    <card 
      v-for="card in hand" 
      :key="card.rank + '' + card.suit"
      :card="card"
    />
  </section>
</template>

<script>
import Card from './Card'
import { isValidCard } from "../models/card"

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
      validator(value) {
        return Array.isArray(value) && value.every(isValidCard)
      }
    }
  },
  methods: {
  }
}
</script>

<style>

</style>