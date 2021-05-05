import { RANKS } from "../constants/ranks"
import { SUITS } from "../constants/suits"

export function takeFromDeck(currentDeck, count) {
  const takenCards = currentDeck.slice(0, count)
  const newDeck = currentDeck.slice(count, currentDeck.length)

  return {
    cards: takenCards,
    deck: newDeck,
  }
}

export function takeOneFromDeck(currentDeck) {
  const { cards, deck } = takeFromDeck(currentDeck, 1)

  return { card: cards[0], deck }
}

export function initializeDeck() {
  let deck = SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank })))

  for (let i = 0; i < 5; i++) {
    deck = deck.sort(() => Math.random() - 0.5)
  }

  return deck
}

export function initializePlayers({ startingCard }, currentDeck, playerNames) {
  const playersCount = playerNames.length
  const cardsCount = startingCard * playersCount

  const { cards: undistributed, deck } = takeFromDeck(currentDeck, cardsCount)

  const distributed = undistributed.reduce((prev, current, idx) => {
    const distIdx = idx % playersCount

    if (distIdx === 0) {
      return [...prev, [current]]
    }

    prev[distIdx] = [...prev[distIdx], current]
    return prev
  }, [])

  const players = playerNames.map((name, idx) => {
    return {
      name,
      placed: null,
      hand: distributed[idx]
    }
  })

  return {
    deck,
    players
  }
}

export function generateTurnRandomly(players) {
  return Math.floor(Math.random() * players.length)
}