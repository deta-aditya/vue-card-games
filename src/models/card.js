import { RANKS, SUITS } from "../constants/cards"

export function createCard(rank, suit) {
  return { suit, rank }
}

export function isValidCard(card) {
  return ['suit', 'rank'].includes(Object.keys(card)) 
    && SUITS.includes(card.suit) 
    && RANKS.includes(card.rank)
}