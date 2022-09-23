<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>

      <div class="col-sm-2">
        <button
          class="btn btn-primary float-right"
          @click="exibirFormularioTarefa"
        >
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

    <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

    <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>

    <salvar-tarefas
      v-if="exibirFormulario"
      :tarefa="tarefaSelecionada"
      @criar="criarTarefa"
      @editar="editarTarefa"
    />
  </div>
</template>

<script>
import axios from "@/axios";

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
      tarefaSelecionada: undefined,
      mensagemErro: ''
    };
  },
  created() {
    axios.get(`tarefas`).then((response) => {
      this.tarefas = response.data;
      return 'Resposta sucesso'
    }, error => {
      console.log('Erro capturado no then : ', error)
      return Promise.reject(error)
    }).catch( error => {
      console.log('Erro capturado no catch : ', error)
      if(error.response) {
        this.mensagemErro = `Servidor retornou um erro: ${error.mensage} ${error.response.status}`
        console.log('Erro [resposta]: ', error.response)
      }else if(error.request) {
        this.mensagemErro = `Erro de comunicação com o servidor: ${error.mensage} ${error.response.status}`
        console.log('Erro [request]: ', error.request)
      }else {
        this.mensagemErro = `Erro ao fazer requisição ao servidor: ${error.mensage} ${error.response.status}`
      }
      return 'Resposta catch'
    }).then((msg) => {
      console.log('Executado ', msg)
    })
  },
  computed: {
    tarefasOrdenadas() {
      return this.tarefas.slice().sort((t1, t2) => {
        if (t1.concluido === t2.concluido) {
          return t1.titulo < t2.titulo ? -1 : t1.titulo > t2.titulo ? 1 : 0;
        }
        return t1.concluido - t2.concluido;
      });
    },
  },
  methods: {
    criarTarefa(tarefa) {
      /*axios.post(`tarefas` , tarefa).then((response) => {
        this.tarefas.push(response.data)
        this.resetar()
      })*/

      /*axios.get('url', {objeto-de-config})
      axios.post('url', {body}, {objeto-de-config})
      axios.put('url', {body}, {objeto-de-config})
      axios.delete('url', {objeto-de-config})*/

      axios
        .request({
          method: "post",
          url: "/tarefas",
          data: tarefa,
        })
        .then((response) => {
          this.tarefas.push(response.data);
          this.resetar();
        });
    },
    deletarTarefa(tarefa) {
      const confirmar = window.confirm(
        `Deseja deletar a tarefa "${tarefa.titulo}"?`
      );
      if (confirmar) {
        /*axios
          .delete(`tarefas/${tarefa.id}`, tarefa)
          .then((response) => {
            const indice = this.tarefas.findIndex((t) => t.id === tarefa.id);
            this.tarefas.splice(indice, 1);
          });*/
        axios
          .request({
            method: "delete",
            url: `/tarefas/${tarefa.id}`,
            data: tarefa,
          })
          .then((response) => {
            const indice = this.tarefas.findIndex((t) => t.id === tarefa.id);
            this.tarefas.splice(indice, 1);
          });
      }
    },
    editarTarefa(tarefa) {
      axios
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then((response) => {
          const indice = this.tarefas.findIndex((t) => t.id === tarefa.id);
          this.tarefas.splice(indice, 1, tarefa);
          this.resetar();
        });
    },
    exibirFormularioTarefa() {
      if (this.tarefaSelecionada) {
        this.tarefaSelecionada = undefined;
        return;
      }
      this.exibirFormulario = !this.exibirFormulario;
    },
    resetar() {
      this.tarefaSelecionada = undefined;
      this.exibirFormulario = false;
    },
    selecionarEditarTarefa(tarefa) {
      this.tarefaSelecionada = tarefa;
      this.exibirFormulario = true;
    },
  },
};
</script>