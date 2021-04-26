import { RANKS, SUITS } from "../constants/cards"

export function createCard(rank, suit) {
  return { suit, rank }
}

export function isValidCard(card) {
  return Object.keys(card).every(['suit', 'rank'].includes)
    && SUITS.includes(card.suit) 
    && RANKS.includes(card.rank)
}