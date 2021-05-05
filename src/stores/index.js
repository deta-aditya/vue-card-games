import { createStore } from "vuex"
import game from "./game"
import starting from "./starting"

const store = createStore({
  modules: {
    starting,
    game,
  },
})

export default store
