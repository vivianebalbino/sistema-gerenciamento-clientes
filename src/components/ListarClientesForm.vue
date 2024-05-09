<template>
  <div id="cliente-table">
    <div>
      <div id="cliente-table-heading">
        <div>Nome</div>
        <div>CPF</div>
        <div>RG</div>
        <div>Nascimento</div>
        <div>Sexo</div>
        <div>Estado Civil</div>
      </div>
    </div>
    <div id="cliente-table-rows">
      <div class="cliente-table-row" v-for="clientes in clientes" :key="clientes.id">
        <div>{{ clientes.nome }}</div>
        <div>{{ clientes.cpf }}</div>
        <div>{{ clientes.rg }}</div>
        <div>{{ clientes.dataNascimento }}</div>
        <div>{{ clientes.sexo }}</div>
        <div>{{ clientes.estadoCivil }}</div>
        <div class="actionButton"><button class="delete-btn" @click="alterarCliente(clientes.id)">Alterar</button></div>
        <div class="actionButton"><button class="delete-btn" @click="exlcuirCliente(clientes.id)">Excluir</button></div>
      </div>
    </div>
  </div>
  <div v-if="mostrarModal">
      <div class="modal">
        <h3>Editar Cliente</h3>
        <label>Estado Civil:</label>
        <input type="text" v-model="clienteEditando.nome">
        <label>CEP:</label>
        <input type="text" v-model="clienteEditando.cep">
        <label>Logradouro:</label>
        <input type="text" v-model="clienteEditando.logradouro">
        <label>Numero:</label>
        <input type="text" v-model="clienteEditando.numero">
        <label>Complemento:</label>
        <input type="text" v-model="clienteEditando.complemento">
        <label>Bairro:</label>
        <input type="text" v-model="clienteEditando.bairro">
        <label>Cidade:</label>
        <input type="text" v-model="clienteEditando.cidade">
        <label>Estado:</label>
        <input type="text" v-model="clienteEditando.uf">
        <button @click="salvarClienteEditado">Salvar</button>
        <button @click="cancelarEdicao">Cancelar</button>
      </div>
      <div class="overlay" @click="fecharModal"></div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ListarClientesForm",
  data() {
    return {
      clientes: null,
      cliente_id: null, 
      clienteEditando: null,
      mostrarModal: false 

    };
  },
  methods: {
    async getCliente() {
      const req = await fetch("http://localhost:3000/clientes");
      const data = await req.json();
      this.clientes = data;
      console.log(this.clientes);
    },
    async carregarClientes() {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    },
    async exlcuirCliente(id){
        console.log(id)
        try {
            await axios.delete(`http://localhost:3000/clientes/${id}`);
            // Atualizar a lista de clientes após a exclusão
        this.carregarClientes();
        } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        }
    }
  },

  
  mounted() {
    this.getCliente();
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

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

.actionButton{
    width: 7% !important;
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
  background-color: #a90637;
  color: #ffff;
  font-weight: bold;
  border: 2px solid #a90637;
  padding: 10px;
  font-size: 12px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 10px;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>