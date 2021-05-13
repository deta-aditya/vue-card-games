<script>
import { h } from 'vue'
import PlayerHandVue from './PlayerHand.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('game', [
      'players',
      'turn',
    ]),

    ...mapGetters('game', [
      'activeSuit',
    ]),

    numberOfPlayers() {
      return this.players.length
    },

    layoutSelection() {
      return this.numberOfPlayers - 2
    }
  },
  render() {
    const GameLayoutShell = (layout) => {
      return h('div', { class: `game-layout for-${this.numberOfPlayers}-players` }, layout)
    }

    const PlayerHandComponent = ({ number: playerIndex, horizontal }) => {
      return h(PlayerHandVue, { horizontal, playerIndex })
    }

    const FlexColumn = children => h('div', { class: 'flex-column'}, children)
    const FlexRow = children => h('div', { class: 'flex-row'}, children)

    const layouts = [
      [
        PlayerHandComponent({ number: 0, horizontal: false }),
        this.$slots.default(),
        PlayerHandComponent({ number: 1, horizontal: false }),
      ],
      [
        PlayerHandComponent({ number: 0, horizontal: false }),
        FlexColumn([
          this.$slots.default(),
          PlayerHandComponent({ number: 1, horizontal: true }),
        ]),
        PlayerHandComponent({ number: 2, horizontal: false }),
      ],
      [
        PlayerHandComponent({ number: 0, horizontal: false }),
        FlexColumn([
          PlayerHandComponent({ number: 3, horizontal: true }),
          this.$slots.default(),
          PlayerHandComponent({ number: 1, horizontal: true }),
        ]),
        PlayerHandComponent({ number: 2, horizontal: false }),
      ],
      [
        PlayerHandComponent({ number: 0, horizontal: false }),
        FlexColumn([
          PlayerHandComponent({ number: 4, horizontal: true }),
          this.$slots.default(),
          FlexRow([
            PlayerHandComponent({ number: 1, horizontal: true }),
            PlayerHandComponent({ number: 2, horizontal: true }),
          ])
        ]),
        PlayerHandComponent({ number: 3, horizontal: false }),
      ],
      [
        PlayerHandComponent({ number: 0, horizontal: false }),
        FlexColumn([
          FlexRow([
            PlayerHandComponent({ number: 5, horizontal: true }),
            PlayerHandComponent({ number: 4, horizontal: true }),
          ]),
          this.$slots.default(),
          FlexRow([
            PlayerHandComponent({ number: 1, horizontal: true }),
            PlayerHandComponent({ number: 2, horizontal: true }),
          ])
        ]),
        PlayerHandComponent({ number: 3, horizontal: false }),
      ],
    ]

    return GameLayoutShell(layouts[this.layoutSelection])
  }
}
</script>

<style>
.game-layout {
  display: flex;
  justify-content: space-between;
}

.game-layout.for-2-players.for-3-players {
  margin-top: 50px;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row {
  display: flex;
}
</style>