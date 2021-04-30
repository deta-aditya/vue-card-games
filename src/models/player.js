export function playerHasSuitOnHand(player, suit) {
  return player.hand?.some(card => card.suit === suit) ?? false
}