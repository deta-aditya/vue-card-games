import { currentPlayWinnerIndex, determineNextTurn, digFromDeck, generateTurnRandomly, getWinner, haveAllPlaced, initializeDeck, initializePlayers, movePlacedToCurrentPlayer, placeCard, refreshPlayersPlaced, takeOneFromDeck, playerShouldSkip, getActiveSuit, playerShouldDig, playerShouldTake, getPlacedCards } from '../models/game'

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
    winner: ({ players }) => getWinner(players),
    activeSuit: ({ starter, players }) => starter?.suit ?? getActiveSuit(players),
    placedCards: ({ players }) => getPlacedCards(players),
    isGameOver: (_, { winner }) => winner !== null,
    haveAllPlaced: ({ players }) => haveAllPlaced(players),
    currentPlayerShouldSkip: ({ deck, players, turn }) => playerShouldSkip(deck, players, turn),
    currentPlayerShouldDig: ({ deck, players, turn }) => playerShouldDig(deck, players, turn),
    currentPlayerShouldTake: ({ deck, players, turn }) => playerShouldTake(deck, players, turn),
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

    PLACE_CARD(state, { card }) {
      state.players[state.turn] = placeCard(state.players[state.turn], card)
    },

    NEXT_PLAY(state) {
      state.turn = currentPlayWinnerIndex(state.players)
      state.players = refreshPlayersPlaced(state.players)
      state.starter = null
    },

    NEXT_TURN(state) {
      state.turn = determineNextTurn(state.deck, state.players, state.turn)
    },

    DIG_CARD(state) {
      const { deck, player } = digFromDeck(state.deck, state.players[state.turn])
      state.players[state.turn] = player
      state.deck = deck
    },

    TAKE_CARDS(state) {
      state.players = movePlacedToCurrentPlayer(state.players, state.turn)
    },
  },

  actions: {
    startGame({ commit, rootState }) {
      const { rules, players } = rootState.starting

      commit('INIT_GAME', { rules, players })
      
      if (rules.startFromDeck) {
        commit('PLACE_STARTER')
      }
    },

    playCard({ commit, getters }, { card }) {
      commit('PLACE_CARD', { card })

      if (getters.isGameOver) {
        return
      } else if (getters.haveAllPlaced) {
        commit('NEXT_PLAY')
      } else {
        commit('NEXT_TURN')
      }
    },

    digFromDeck({ commit, getters }) {
      commit('DIG_CARD')
      
      if (getters.currentPlayerShouldSkip) {
        commit('NEXT_TURN')
      }
    },

    takeFromPlaced({ commit }) {
      commit('TAKE_CARDS')
      commit('NEXT_PLAY')
    },
  },
}

export default game