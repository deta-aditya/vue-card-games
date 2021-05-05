<template>
  <div class="starting-game">
    <h1>Start New Game</h1>
    <div class="players">
      <h2>Number of Players</h2>
      <button 
        class="add-player-button" 
        :disabled="isMaxPlayers" 
        @click="addPlayer"
      >
        Add Player
      </button>
      <div
        class="player-item"
        v-for="(name, idx) in players"
        :key="idx"
      >
        <input
          :name="`player-name-${idx + 1}`" 
          :id="`player-name-${n + 1}`" 
          :placeholder="`Player ${idx + 1}`"
          :value="players[idx]"
          @input="modifyPlayer({ value: $event.target.value, at: idx })"
          type="text"
        />
        <button :disabled="isMinPlayers" @click="removePlayer({ at: idx })">&times;</button>
      </div>
    </div>
    <div>
      <button @click="$emit('back')">Cancel</button>
      <button @click="start">Start</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex"

export default {
  emits: ['start', 'back'],
  computed: {
    ...mapState('starting', [
      'rules',
      'players'
    ]),
    ...mapGetters('starting', [
      'isMaxPlayers',
      'isMinPlayers'
    ]),
  },
  methods: {
    ...mapMutations('starting', {
      addPlayer: 'ADD_PLAYER',
      removePlayer: 'REMOVE_PLAYER',
      modifyPlayer: 'MODIFY_PLAYER',
    }),

    start() {
      this.$emit('start')
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

.player-item, .add-player-button {
  margin-bottom: 10px;
}
</style>