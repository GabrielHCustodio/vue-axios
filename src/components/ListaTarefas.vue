<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>

      <div class="col-sm-2">
        <button class="btn btn-primary float-right" @click="exibirFormularioTarefa">
          <i class="fa fa-plus" style="margin-right: 8px"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <ul class="list-group" v-if="tarefas.length > 0">
      <lista-item-tarefas
        v-for="tarefa in tarefasOrdenadas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarEditarTarefa"
        @deletar="deletarTarefa"
        @concluir="editarTarefa"
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
  computed: {
    tarefasOrdenadas() {
      return this.tarefas.sort((t1, t2) => {
        if(t1.concluido === t2.concluido) {
          return t1.titulo < t2.titulo
            ? -1
            : t1.titulo > t2.titulo
              ? 1
              : 0
        }
        return t1.concluido - t2.concluido
      })
    }
  },
  methods: {
    criarTarefa(tarefa) {
      axios.post(`${config.apiURL}/tarefas` , tarefa).then((response) => {
        this.tarefas.push(response.data)
        this.resetar()
      })
    },
    deletarTarefa(tarefa) {
      const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
      if(confirmar) {
        axios.delete(`${config.apiURL}/tarefas/${tarefa.id}` , tarefa).then(response => {
          const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
          this.tarefas.splice(indice, 1)
        })
      }
    },
    editarTarefa(tarefa) {
      axios.put(`${config.apiURL}/tarefas/${tarefa.id}` , tarefa).then(response => {
        const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
        this.tarefas.splice(indice, 1, tarefa)
        this.resetar()
      })
    },
    exibirFormularioTarefa() {
      if(this.tarefaSelecionada) {
        this.tarefaSelecionada = undefined
        return
      }
      this.exibirFormulario = !this.exibirFormulario
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