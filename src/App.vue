<template>
  <div class="text-center">
    <button>Start</button>
  </div>
  <div class="game-container">
    <section class="player-hand">
      <h1>Player 1</h1>
      <Card :rank="'A'" :suit="'clubs'" />
      <Card :rank="'K'" :suit="'hearts'" />
      <Card :rank="'10'" :suit="'spades'" />
      <Card :rank="'3'" :suit="'diams'" />
    </section>
    <section class="deck-area">
      <button>Take Deck</button>
    </section>
    <section class="player-hand">
      <h1>Player 2</h1>
    </section>
  </div>
</template>

<script>
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Card,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.text-center {
  text-align: center;
}

.game-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.deck-area {
  width: 400px;
  text-align: center;
}
</style>
