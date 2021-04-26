<template>
  <div class="starting-game">
    <h1>Start New Game</h1>
    <div class="players">
      <h2>Number of Players</h2>
      <div
        class="player-item"
        v-for="(name, idx) in playerNames"
        :key="idx">
        <input
          :name="`player-name-${idx + 1}`" 
          :id="`player-name-${n + 1}`" 
          :placeholder="`Player ${idx + 1}`"
          v-model="playerNames[idx]"
          type="text"
        />
        <button :disabled="isMinPlayers" @click="removePlayer(idx)">&times;</button>
      </div>
      <button :disabled="isMaxPlayers" @click="addPlayer">Add Player</button>
    </div>
    <div>
      <button @click="$emit('back')">Cancel</button>
      <button @click="start">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['start', 'back'],
  data() {
    return {
      playerNames: ['Player 1', 'Player 2'],
    }
  },
  computed: {
    isMaxPlayers() {
      return this.playerNames.length === 7
    },
    isMinPlayers() {
      return this.playerNames.length === 2
    },
  },
  methods: {
    resizePlayerNames(to) {
      const existingNames = this.playerNames
      const placeholderNames = Array(Math.max(to - existingNames.length, 0)).fill('')

      this.playerNames = [...existingNames, ...placeholderNames]
    },

    addPlayer() {
      this.playerNames = [...this.playerNames, `Player ${this.playerNames.length + 1}`]
    },

    removePlayer(at) {
      this.playerNames = this.playerNames.filter((_, idx) => idx !== at)
    },

    start() {
      this.$emit('start', this.playerNames)
    }
  }
}
</script>

<style>
.starting-game {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.players {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.player-item {
  margin-bottom: 10px;
}
</style>