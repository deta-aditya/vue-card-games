<template>
  <div class="main-menu">
    <h1>Cangkulan</h1>
    <img 
      class="img-placeholder" 
      src="https://images.unsplash.com/photo-1530724405623-486caa8def56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop" 
      alt="Placeholder" 
      width="200" 
    />
    <button @click="$emit('started')">Start New Game</button>
  </div>
</template>

<script>
export default {
  emits: ['started'],
}
</script>

<style>
.main-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.img-placeholder {
  margin-bottom: 20px;
}
</style>