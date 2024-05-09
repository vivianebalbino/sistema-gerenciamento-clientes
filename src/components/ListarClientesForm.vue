<template>
  <div id="cliente-table">
    <div>
      <div id="cliente-table-heading">
        <div>Nome</div>
        <div>CPF</div>
        <div>Nascimento</div>
        <div>Sexo</div>
        <div>Estado Civil</div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div id="cliente-table-rows">
      <div class="cliente-table-row" v-for="clientes in clientes" :key="clientes.id">
        <div>{{ clientes.nome }}</div>
        <div>{{ clientes.cpf }}</div>
        <div>{{ clientes.dataNascimento }}</div>
        <div>{{ clientes.sexo }}</div>
        <div>{{ clientes.estadoCivil }}</div>
        <div>
            <a href="" class="links" @click="alterCliente(burger.id)"><span>Alterar</span></a>
        </div>
        <div>
            <a href="" class="links" @click="alterCliente(burger.id)"><span>Excluir</span></a>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>
<script>
export default {
  name: "ListarClientesForm",
  data() {
    return {
      clientes: null,
      cliente_id: null,
    };
  },
  methods: {
    async getCliente() {
      const req = await fetch("http://localhost:3000/clientes");
      const data = await req.json();
      this.clientes = data;
      console.log(this.clientes);
    },
  },
  mounted() {
    this.getCliente();
  },
};
</script>
<style scoped>
#cliente-table {
  max-width: 1200px;
  margin: 0 auto;
}

#cliente-table-heading,
#cliente-table-rows,
.cliente-table-row {
  display: flex;
  flex-wrap: wrap;
}

#cliente-table-heading {
  font-weight: bold;
  font-size: 14px;
  padding: 12px;
  border-bottom: 3px solid #333;
}

.cliente-table-row {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}

#cliente-table-heading div,
.cliente-table-row div {
  width: 14%;
}

#cliente-table-heading .order-id,
.cliente-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.links {
    color: #a84762;
    font-size: 17px;
    padding: 38px 15px;
    text-decoration: underline;
}
.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>