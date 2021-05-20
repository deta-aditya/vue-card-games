import { currentPlayWinnerIndex, determineNextTurn, digFromDeck, generateTurnRandomly, getWinner, haveAllPlaced, initializeDeck, initializePlayers, movePlacedToCurrentPlayer, placeCard, refreshPlayersPlaced, takeOneFromDeck, playerShouldSkip, getActiveSuit, playerShouldDig, playerShouldTake, getPlacedCards } from '../models/game'

const initialState = {
  rules: {},
  players: [],
  deck: [],
  history: [],
  turn: -1,
  starter: null,
}

function state() {
  return initialState
}

const getters = {
  winner: ({ players }) => getWinner(players),
  activeSuit: ({ starter, players }) => getActiveSuit(starter, players),
  placedCards: ({ players }) => getPlacedCards(players),
  isGameOver: (_, { winner }) => winner !== null,
  haveAllPlaced: ({ players }) => haveAllPlaced(players),
  currentPlayerShouldSkip: ({ starter, deck, players, turn }) => playerShouldSkip(starter, deck, players, turn),
  currentPlayerShouldDig: ({ starter, deck, players, turn }) => playerShouldDig(starter, deck, players, turn),
  currentPlayerShouldTake: ({ starter, deck, players, turn }) => playerShouldTake(starter, deck, players, turn),
  getPlayerByIndex: ({ players }) => idx => players[idx] ?? null
}

const mutations = {
  INIT_GAME(state, { rules, players: playerNames }) {
    const undistDeck = initializeDeck()
    const { deck, players } = initializePlayers(rules, undistDeck, playerNames)
    
    state.rules = rules
    state.deck = deck
    state.players = players
  },

  START_GAME(state, { turn }) {
    const { rules } = state

    if (rules.startFromDeck) {
      const { card, deck } = takeOneFromDeck(state.deck)
      state.starter = card
      state.deck = deck
    }

    state.turn = turn
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
    state.turn = determineNextTurn(state.starter, state.deck, state.players, state.turn)
  },

  DIG_CARD(state) {
    const { deck, player } = digFromDeck(state.deck, state.players[state.turn])
    state.players[state.turn] = player
    state.deck = deck
  },

  TAKE_CARDS(state) {
    state.players = movePlacedToCurrentPlayer(state.players, state.turn)
  },
}

const actions = {
  startGame({ commit, rootState }) {
    const { rules, players } = rootState.starting

    commit('INIT_GAME', { rules, players })

    const turn = generateTurnRandomly(players)

    commit('START_GAME', { turn })
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
}

const game = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default game