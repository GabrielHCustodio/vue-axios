<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>

      <div class="col-sm-2">
        <button class="btn btn-primary float-right" @click="exibirFormulario = !exibirFormulario">
          <i class="fa fa-plus" style="margin-right: 8px"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <ul class="list-group" v-if="tarefas.length > 0">
      <lista-item-tarefas
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarEditarTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa criada.</p>

    <salvar-tarefas 
      v-if="exibirFormulario"
      :tarefa="tarefaSelecionada"
      @criar="criarTarefa"
      @editar="editarTarefa"/>
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
      exibirFormulario: false,
      tarefaSelecionada: undefined
    };
  },
  created() {
    axios.get(`${config.apiURL}/tarefas`).then((response) => {
      this.tarefas = response.data;
    });
  },
  methods: {
    criarTarefa(tarefa) {
      axios.post(`${config.apiURL}/tarefas` , tarefa).then((response) => {
        this.tarefas.push(response.data)
        this.resetar()
      })
    },
    editarTarefa(tarefa) {
      axios.put(`${config.apiURL}/tarefas/${tarefa.id}` , tarefa).then(response => {
        const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
        this.tarefas.splice(indice, 1, tarefa)
        this.resetar()
      })
    },
    resetar() {
      this.tarefaSelecionada = undefined
      this.exibirFormulario = false
    },
    selecionarEditarTarefa(tarefa) {
      this.tarefaSelecionada = tarefa
      this.exibirFormulario = true
    }
  }
};
</script>