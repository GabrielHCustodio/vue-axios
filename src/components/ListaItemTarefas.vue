<template>
  <li class="list-group-item d-flex">
    <span>{{ tarefa.titulo }}</span>
    <span class="espacar"></span>
    <button
      class="btn btn-sm"
      :class="classCSS"
      :title="tituloBotao"
    >
      <i class="fa fa-check"></i>
    </button>
    <button class="btn btn-primary btn-sm" title="Editar">
      <i class="fa fa-pencil-alt"></i>
    </button>
    <button class="btn btn-danger btn-sm" title="Deletar">
      <i class="fa fa-trash"></i>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    tarefa: {
      type: Object,
      requred: true,
    },
  },
  computed: {
    classCSS() {
      return {
        "btn-secondary": !this.tarefa.concluido,
        "btn-success": this.tarefa.concluido,
      };
    },
    tituloBotao() {
      return this.tarefa.concluido ? "Refazer Tarefa" : "Concluir Tarefa";
    },
  },
};
</script>

<style scoped>
button {
    margin-right: 8px;
}

.espacar {
  flex: 1 1 auto;
}
</style>

