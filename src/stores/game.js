import { generateTurnRandomly, initializeDeck, initializePlayers, takeOneFromDeck } from '../models/game'

const game = {
  namespaced: true,

  state() {
    return {
      rules: {},
      players: [],
      deck: [],
      history: [],
      turn: -1,
      starter: null,
    }
  },

  getters: {
    takeFromDeck: state => count => state.deck.slice(0, count)
  },

  mutations: {
    INIT_GAME(state, { rules, players: playerNames }) {
      const undistDeck = initializeDeck()
      const { deck, players } = initializePlayers(rules, undistDeck, playerNames)
      const turn = generateTurnRandomly(players)
      
      state.rules = rules
      state.deck = deck
      state.players = players
      state.turn = turn
    },

    PLACE_STARTER(state) {
      const { card, deck } = takeOneFromDeck(state.deck)
      state.starter = card
      state.deck = deck
    },

    // addPlayer: state => state.players = [
    //   ...state.players, 
    //   `Player ${state.players.length + 1}`
    // ],
    
    // removePlayer: (state, { at }) => 
    //   state.players = state.players.filter((_, idx) => idx !== at),
  },

  actions: {
    startGame({ commit }, { rules, players }) {
      commit('INIT_GAME', { rules, players })
      
      if (rules.startFromDeck) {
        commit('PLACE_STARTER')
      }
    },


  },
}

export default game