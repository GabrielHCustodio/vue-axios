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
      tarefas: [
        { id: 1, titulo: "Aprender JavaScript", concluido: true },
        { id: 2, titulo: "Aprender Vue", concluido: true },
        { id: 3, titulo: "Aprender Axios", concluido: false },
      ],
    };
  },
};
</script>