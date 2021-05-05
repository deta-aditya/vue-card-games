import { MIN_PLAYERS, MAX_PLAYERS } from "../constants/rules"

const starting = {
  namespaced: true,
  
  state() {
    return {
      rules: {
        startingCard: 7,
        startFromDeck: true,
        progression: false,
      },
      players: [
        'Player 1',
        'Player 2',
      ],
    }
  },

  getters: {
    isMaxPlayers: ({ players }) => players.length === MAX_PLAYERS,
    isMinPlayers: ({ players }) => players.length === MIN_PLAYERS,
  },

  mutations: {
    ADD_PLAYER: state => state.players = [
      ...state.players, 
      `Player ${state.players.length + 1}`
    ],
    
    REMOVE_PLAYER: (state, { at }) => 
      state.players = state.players.filter((_, idx) => idx !== at),

    MODIFY_PLAYER: (state, { at, value }) =>
      state.players = state.players.map((player, idx) =>
        idx === at ? value : player
      )
  },
}

export default starting