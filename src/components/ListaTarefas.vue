<template>
  <div>
    <h1 class="font-weight-light">Lista de Tarefas</h1>

    <ul class="list-group" v-if="tarefas.length > 0">
      <lista-item-tarefas
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa criada.</p>

    <salvar-tarefas />
  </div>
</template>

<script>
import axios from "axios";

import config from "@/config/config";
import ListaItemTarefas from "@/components/ListaItemTarefas.vue";
import SalvarTarefas from "@/components/SalvarTarefas.vue";

export default {
  name: "ListaTarefas",
  components: {
    ListaItemTarefas,
    SalvarTarefas,
  },
  data() {
    return {
      tarefas: [],
    };
  },
  created() {
    axios.get(`${config.apiURL}/tarefas`)
    .then((response) => {
      this.tarefas = response.data;
    });
  },
};
</script>