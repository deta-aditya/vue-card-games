import { RANKS } from "../constants/ranks"
import { SUITS } from "../constants/suits"

// takeFromDeck :: [Card] -> Int -> (Card, [Card])
export function takeFromDeck(currentDeck, count) {
  const takenCards = currentDeck.slice(0, count)
  const newDeck = currentDeck.slice(count, currentDeck.length)

  return {
    cards: takenCards,
    deck: newDeck,
  }
}

// takeOneFromDeck :: [Card] -> (Card, [Card])
export function takeOneFromDeck(currentDeck) {
  const { cards, deck } = takeFromDeck(currentDeck, 1)

  return { card: cards[0], deck }
}

// initializeDeck :: () -> [Card]
export function initializeDeck() {
  let deck = SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank })))

  for (let i = 0; i < 5; i++) {
    deck = deck.sort(() => Math.random() - 0.5)
  }

  return deck
}

// initializePlayers :: Rules -> [Card] -> [String] -> ([Card], [Player])
export function initializePlayers({ startingCard }, currentDeck, playerNames) {
  const playersCount = playerNames.length
  const cardsCount = startingCard * playersCount

  const { cards: undistributed, deck } = takeFromDeck(currentDeck, cardsCount)

  let distributed = Array.from({ length: playersCount }).fill([])
  undistributed.forEach((card, idx) => {
    const distIdx = idx % playersCount

    distributed[distIdx] = [...distributed[distIdx], card]
  })

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

// generateTurnRandomly :: [Player] -> Int
export function generateTurnRandomly(players) {
  return Math.floor(Math.random() * players.length)
}

// getWinner :: [Player] -> Some Player
export function getWinner(players) {
  return players.reduce((previous, current) => { 
    if (current.hand.length === 0) {
      return current
    }
    return previous
  }, null)
}

// placeCard :: Player -> Card -> Player
export function placeCard(player, card) {
  return {
    ...player,
    placed: card,
    hand: player.hand.filter(held => !isCardEquals(held, card))
  }
}

// haveAllPlaced :: [Players] -> Bool
export function haveAllPlaced(players) {
  return players.every(player => player.placed !== null)
}

// currentPlayWinnerIndex :: [Players] -> Int
export function currentPlayWinnerIndex(players) {
  const rankedPlacedCards = players.map(player => RANKS.indexOf(player.placed?.rank))

  console.log(rankedPlacedCards)

  const { playerIndex } = rankedPlacedCards.reduce((prev, current, idx) => {
    if (current > prev.card) {
      return { playerIndex: idx, card: current }
    }

    return prev
  }, { playerIndex: -1, card: -1 })

  return playerIndex
}

// refreshPlayersPlaced :: [Player] -> [Player]
export function refreshPlayersPlaced(players) {
  return players.map(player => ({ ...player, placed: null }))
}

// determineNextTurn :: [Card] -> [Player] -> Int -> Int
export function determineNextTurn(deck, players, turn) {
  const shouldLoopBack = turn === players.length - 1
  const nextTurn = shouldLoopBack ? 0 : turn + 1
  
  if (playerShouldSkip(deck, players, nextTurn)) {
    return determineNextTurn(deck, players, nextTurn)
  }
  
  return nextTurn
}

// digFromDeck :: [Card] -> Player -> ([Card], Player)
export function digFromDeck(oldDeck, oldPlayer) {
  const { card, deck } = takeOneFromDeck(oldDeck)
  const player = { ...oldPlayer, hand: [ ...oldPlayer.hand, card ] }
  
  return { player, deck }
}

// movePlacedToCurrentPlayer :: [Player] -> Int -> [Player]
export function movePlacedToCurrentPlayer(players, turn) {
  const cards = getPlacedCards(players)
  const currentPlayer = players[turn]
  const newCurrentPlayer = transferCardsToPlayer(currentPlayer, cards)
  
  const newPlayers = players.map((player, idx) => {
    if (idx === turn) {
      return newCurrentPlayer 
    }
    return player 
  })

  return newPlayers
}

// playerShouldSkip :: [Card] -> [Player] -> Int -> Bool 
export function playerShouldSkip(deck, players, turn) {
  const activeSuit = getActiveSuit(players)
  const deckExhausted = deck.length === 0
  const currentPlayer = players[turn]
  const onTakingPhase = activeSuit !== null && deckExhausted

  const currentPlayerWillTakeCard = ! playerHasSuit(currentPlayer, activeSuit) && somePlayersHasActiveSuit(players, activeSuit)
  const currentPlayerAlreadyPlacedCard = playerHasPlaced(currentPlayer) && somePlayersCantPlaceCard(players, activeSuit)

  return onTakingPhase && (currentPlayerWillTakeCard || currentPlayerAlreadyPlacedCard)
}

// playerShouldDig :: [Card] -> [Player] -> Int -> Bool
export function playerShouldDig(deck, players, turn) {
  const activeSuit = getActiveSuit(players)
  const deckExhausted = deck.length === 0
  const currentPlayer = players[turn]

  return activeSuit !== null && ! playerHasSuit(currentPlayer, activeSuit) && ! deckExhausted
}

// playerShouldTake :: [Card] -> [Player] -> Int -> Bool
export function playerShouldTake(deck, players, turn) {
  const activeSuit = getActiveSuit(players)
  const deckExhausted = deck.length === 0
  const currentPlayer = players[turn]

  return activeSuit !== null && ! playerHasSuit(currentPlayer, activeSuit) && deckExhausted
}

// getActiveSuit :: [Player] -> Some Suit
export function getActiveSuit(players) {
  return players
    .map(player => player.placed)
    .reduce((prev, current) => current !== null ? current.suit : prev, null)
}

// somePlayersHasActiveSuit :: [Player] -> Suit -> Bool
function somePlayersHasActiveSuit(players, activeSuit) {
  return players.some(player => playerHasSuit(player, activeSuit) && ! playerHasPlaced(player))
}

// somePlayersCantPlaceCard :: [Player] -> Suit -> Bool
function somePlayersCantPlaceCard(players, activeSuit) {
  return players.some(player => ! (playerHasSuit(player, activeSuit) || playerHasPlaced(player)))
}

// transferCardsToPlayer :: Player -> [Card] -> Player
function transferCardsToPlayer(player, cards) {
  return { ...player, hand: [ ...player.hand, ...cards ] }
}

// playerHasPlaced :: Player -> Bool
function playerHasPlaced(player) {
  return player.placed !== null
}

// playerHasSuit :: Player -> Suit -> Bool
function playerHasSuit(player, suit) {
  return player.hand.some(card => card.suit === suit)
}

// isCardEquals :: Card -> Card -> Bool
function isCardEquals(former, latter) {
  return former.suit === latter.suit && former.rank === latter.rank
}

// getPlacedCards :: [Player] -> [Card]
export function getPlacedCards(players) {
  return players
    .map(player => player.placed)
    .filter(card => card !== null)
}