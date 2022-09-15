<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisição HTTP no vue</h1>
        <p class="lead">
          Usando a bibliotaca Axios para fazer requisições AJAX à uma API REST.
        </p>
      </div>
    </div>

    <div class="container">
      <lista-tarefas />
    </div>
  </div>
</template>

<script>
import ListaTarefas from '@/components/ListaTarefas.vue'

export default {
  components: {
    ListaTarefas
  }
}
</script>