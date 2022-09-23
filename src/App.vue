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
import axios from 'axios'
import config from '@/config/config'

import ListaTarefas from '@/components/ListaTarefas.vue'

export default {
  components: {
    ListaTarefas
  },
  async created() {
    /*axios.all([
      axios.get(`${config.apiURL}/tarefas/1`),
      axios.get(`${config.apiURL}/tarefas/3`)
    ]).then(axios.spread((tarefa1, tarefa3) => {
      console.log('Requisições simultâneas...')
      console.log('Tarefa 1: ', tarefa1)
      console.log('Tarefa 3: ', tarefa3)
    }))*/

    /*axios.all([
      axios.get(`${config.apiURL}/tarefas/1`),
      axios.get(`${config.apiURL}/tarefas/3`)
    ]).then(response => {
      const [tarefa1, tarefa3] = response
      console.log('Tarefa 1: ', tarefa1)
      console.log('Tarefa 3: ', tarefa3)
    })*/

    const tarefa1 = await axios.get(`${config.apiURL}/tarefas/1`)
    const tarefa3 = await axios.get(`${config.apiURL}/tarefas/3`)
    console.log('Requisições simultâneas...')
    console.log('Tarefa 1: ', tarefa1)
    console.log('Tarefa 3: ', tarefa3)
  }
}
</script>