<template>
  <div class="input-wrapper">
    <label for="filter" class="sr-only">Busca Nome:</label>
    <input
      id="filterNome"
      class="form-control"
      type="text"
      placeholder="Nome"
      @keyup="filterDados"
    />
    <label for="filterCPF" class="sr-only">Busca CPF:</label>
    <input
      id="filterCPF"
      class="form-control"
      type="text"
      placeholder="CPF"
      @keyup="filterDados"
    />
  </div>
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
      <div
        class="cliente-table-row"
        v-for="clientes in clientes"
        :key="clientes.id"
      >
        <div>{{ clientes.nome }}</div>
        <div>{{ clientes.cpf }}</div>
        <div>{{ clientes.rg }}</div>
        <div>{{ clientes.dtaNascimento }}</div>
        <div>{{ clientes.sexo }}</div>
        <div>{{ clientes.estadoCivil }}</div>
        <div class="actionButton">
          <button class="delete-btn" @click="editarCliente(clientes)">
            Alterar
          </button>
        </div>
        <div class="actionButton">
          <button class="delete-btn" @click="exlcuirCliente(clientes.id)">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="mostrarModal">
    <div class="modal">
      <h2 class="titulos">Editar Cliente</h2>
      <label>Estado Civil:</label>
      <input class="col-m1" type="text" v-model="clienteEditando.estadoCivil" />
      <label>CEP:</label>
      <input
        class="col-m1"
        type="text"
        v-model="clienteEditando.endereco.cep"
      /><br />
      <label>Logradouro:</label>
      <input
        class="col-m3"
        type="text"
        v-model="clienteEditando.endereco.logradouro"
      />
      <label>Numero:</label>
      <input
        class="col-m2"
        type="text"
        v-model="clienteEditando.endereco.nro"
      />
      <label>Complemento:</label>
      <input
        class="col-m4"
        type="text"
        v-model="clienteEditando.endereco.complemento"
      />
      <label>Bairro:</label>
      <input type="text" v-model="clienteEditando.endereco.bairro" />
      <label>Cidade:</label>
      <input type="text" v-model="clienteEditando.endereco.cidade" />
      <label>UF:</label>
      <input class="col-m2" type="text" v-model="clienteEditando.uf" /><br />
      <div class="col-m5">
        <button class="delete-btn col-m6" @click="salvarClienteEditado">
          Salvar
        </button>
        <button class="delete-btn col-m6" @click="fecharModal">Cancelar</button>
      </div>
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
      mostrarModal: false,
    };
  },
  methods: {
    async getCliente() {
      const req = await fetch("http://localhost:3000/clientes");
      const data = await req.json();

      data.forEach(cliente => {
        const dataFormatada = new Date(cliente.dtaNascimento);
        const dia = dataFormatada.getDate();
        const mes = dataFormatada.getMonth() + 1;
        const ano = dataFormatada.getFullYear();
        const DataCliente =  `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
        cliente.dtaNascimento = DataCliente;
      });

      this.clientes = data;
    },
    async carregarClientes() {
      try {
        const response = await axios.get("http://localhost:3000/clientes");
        this.clientes = response.data;
      } catch (error) {
      }
    },
    async exlcuirCliente(id) {
      try {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
        this.carregarClientes();
      } catch (error) {
      }
    },
    editarCliente(cliente) {
      this.clienteEditando = { ...cliente };
      this.mostrarModal = true;
    },

    async salvarClienteEditado() {
      try {
        await axios.put(
          `http://localhost:3000/clientes/${this.clienteEditando.id}`,
          this.clienteEditando
        );
        this.carregarClientes();
        this.fecharModal();
      } catch (error) {
      }
    },
    fecharModal() {
      this.clienteEditando = null;
      this.mostrarModal = false;
    },

    filterDados() {
      document
        .querySelector("#cliente-table-rows")
        .childNodes.forEach(function (elemento) {
          const inputSearch = document
            .querySelector("#filterNome")
            .value.toLowerCase();
          const inputSearchCPF = document
            .querySelector("#filterCPF")
            .value.replace(/\D/g, "");
          if (elemento.nodeName == "DIV") {
            if (inputSearch != "" || inputSearchCPF != "") {
              const nomeCliente =
                elemento.childNodes[0].textContent.toLowerCase();
              const cpfCliente = elemento.childNodes[1].textContent.replace(
                /\D/g,
                ""
              );
              if (
                !nomeCliente.match(inputSearch) ||
                !cpfCliente.match(inputSearchCPF)
              ) {
                elemento.style.display = "none";
              } else {
                elemento.style.display = "";
              }
            } else {
              elemento.style.display = "";
            }
          }
        });
    },
  },

  mounted() {
    this.getCliente();
  },
};
</script>
<style scoped>
.sr-only {
  font-size: 13px;
  color: #261d20;
  font-weight: bold;
  margin-right: 10px;
}

#filterCPF {
  width: 25%;
  margin-right: 9%;
}
#filterNome {
  width: 25%;
  margin-right: 9%;
}
.input-wrapper {
  width: 100%;
  display: ruby;
}
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
.modal label {
  font-size: 14px;
  padding-right: 12px;
  font-weight: bold;
  color: #4e4246;
}
.col-m1 {
  width: 18%;
}
.col-m2 {
  width: 10%;
}
.col-m3 {
  width: 50%;
}
.col-m4 {
  width: 35%;
}
.col-m5 {
  text-align: end;
}
.col-m6 {
  margin-right: 2% !important;
  width: 13%;
}

.modal input {
  margin-right: 18px;
    margin-bottom: 10px;
    font-size: 14px;
    padding-bottom: 6px;
    line-height: 1.428571429;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
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
  margin-bottom: 10%;
  margin-top: 3%;
}

h1 {
  margin-top: 4% !important;
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

.actionButton {
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