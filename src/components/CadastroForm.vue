<template>
  <Message :msg="msg" v-show="msg" />
  <div>
    <form id="cadastro-form" @submit="enviarFormulario">
      <h2 class="titulos">Novo Cadastro</h2>
      <div class="tituloBox">
        <span>Dados Pessoais</span>
      </div>
      <div class="col-md-0">
        <div class="col-md-1">
          <label for="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            v-model="cpf"
            @keyup="formatarCPF()"
            maxlength="14"
            placeholder="Digite o seu cpf"
            class="form-control cpfMask"
          />
        </div>
        <div class="col-md-6">
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu Nome"
            class="form-control"
          />
        </div>
        <div class="col-md-1">
          <label for="rg">RG:</label>
          <input
            type="text"
            id="rg"
            name="rg"
            v-model="rg"
            placeholder="Digite o seu RG"
            class="form-control"
          />
        </div>
        <div class="col-md-2">
          <label for="dtaExpedicao">Data Expedição:</label>
          <input
            type="date"
            id="dtaExpedicao"
            name="dtaExpedicao"
            v-model="dtaExpedicao"
            placeholder="Data Expedição"
            class="form-control"
            @change="formatarData"
          />
        </div>
        <div class="col-md-2">
          <label for="orgaoExpeditor">Órgão Expedição:</label>
          <input
            type="text"
            id="orgaoExpeditor"
            name="orgaoExpeditor"
            v-model="orgaoExpeditor"
            placeholder="Órgão Expeditor"
            class="form-control"
          />
        </div>
        <div class="col-md-3">
          <label for="orgaoExpeditor">UF:</label>
          <input
            type="text"
            id="uf"
            name="uf"
            v-model="uf"
            placeholder="UF"
            class="form-control"
          />
        </div>
        <div class="col-md-2">
          <label for="dtaNascimento">Data de nascimento:</label>
          <input
            type="date"
            id="dtaNascimento"
            name="dtaNascimento"
            v-model="dtaNascimento"
            placeholder="Data Nascimento"
            class="form-control"
          />
        </div>
        <div class="col-md-2">
          <label for="sexo">Sexo:</label>
          <select id="sexo" name="sexo" class="form-control" v-model="sexo">
            <option value="">Selecione</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="estadoCivil">Estado Civil:</label>
          <select
            id="estadoCivil"
            name="estadoCivil"
            class="form-control"
            v-model="estadoCivil"
          >
            <option value="" selected>Selecione</option>
            <option value="Solteiro">Solteiro (a)</option>
            <option value="Cadado">Casado (a) / União estável</option>
            <option value="Divorciado">
              Divorciado (a) / Separado (a) / Desquitado (a)
            </option>
            <option value="viuvo">Viúvo (a)</option>
          </select>
        </div>
      </div>

      <div class="tituloBox">
        <span>Endereço Residencial</span>
      </div>
      <div class="col-md-0">
        <div class="col-md-1">
          <label for="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            @keyup="searchCep()"
            maxlength="9"
            v-model="cep"
            placeholder="Digite o seu cep"
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <label for="logradouro">Logradouro:</label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            v-model="logradouro"
            placeholder="Digite o seu Logradouro"
            class="form-control"
          />
        </div>
        <div class="col-md-5">
          <label for="nro">Número:</label>
          <input
            type="text"
            id="nro"
            name="nro"
            v-model="nro"
            placeholder="Número"
            class="form-control"
          />
        </div>
        <div class="col-md-7">
          <label for="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            v-model="complemento"
            placeholder="Complementoo"
            class="form-control"
          />
        </div>
        <div class="col-md-7">
          <label for="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            v-model="bairro"
            placeholder="Digite o seu Bairro"
            class="form-control"
          />
        </div>
        <div class="col-md-7">
          <label for="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            v-model="cidade"
            placeholder="Digite sua Cidade"
            class="form-control"
          />
        </div>
        <div class="col-md-3">
          <label for="ufEndereco">UF:</label>
          <input
            type="text"
            id="ufEndereco"
            name="ufEndereco"
            v-model="ufEndereco"
            placeholder="UF"
            class="form-control"
          />
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Enviar Dados" />
      </div>
    </form>
  </div>
</template>
<script>
import Message from "./Message";
import axios from "axios";
export default {
  name: "CadastroForm",
  data() {
    return {
      cpf: null,
      nome: null,
      messageCep: null,
      rg: null,
      dtaExpedicao: null,
      orgaoExpeditor: null,
      dtaNascimento: null,
      sexo: null,
      estadoCivil: null,
      cep: null,
      logradouro: null,
      nro: null,
      complemento: null,
      bairro: null,
      cidade: null,
      ufEndereco: null,
      uf: null,
      msg: null,
    };
  },
  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/clientes");
      const data = await req.json();
      console.log(data);
      console.log(data.nome);
    },

    formatarCPF() {
      let cpfMask = this.cpf.replace(/\D/g, "");
      cpfMask = cpfMask.replace(/(\d{3})(\d)/, "$1.$2");
      cpfMask = cpfMask.replace(/(\d{3})(\d)/, "$1.$2");
      cpfMask = cpfMask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      this.cpf = cpfMask;
    },

    async enviarFormulario(e) {
      e.preventDefault();
      if (!this.cpf) {
        alert("Por favor, preencha o campo CPF.");
        return;
      }

      if (!this.dtaNascimento) {
        alert("Por favor, preencha o campo Data Nascimento.");
        return;
      }
      window.scrollTo(0, 0);
      const data = {
        nome: this.nome,
        cpf: this.cpf,
        rg: this.rg,
        dtaExpedicao: this.dtaExpedicao,
        orgaoExpeditor: this.orgaoExpeditor,
        uf: this.uf,
        dtaNascimento: this.dtaNascimento,
        sexo: this.sexo,
        estadoCivil: this.estadoCivil,
        endereco: {
          cep: this.cep,
          logradouro: this.logradouro,
          nro: this.nro,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
        },
      };
      axios
        .post("http://localhost:3000/clientes", data)
        .then((response) => {
          console.log("Cliente enviado com sucesso:", response.data);
          document.querySelectorAll(".col-md-0").forEach(function (elemento) {
            elemento.childNodes.forEach(function (div) {
              div.children[1].value = "";
            });
          });
        })
        .catch((error) => {
          console.error("Erro ao enviar cliente:", error);
        });

      this.msg = "Cadastro realizado com sucesso!";
      

      // Limpa todos os campos do cliente
    },

    async searchCep() {
      let cepMask = this.cep.replace(/\D/g, "");
      this.cep = cepMask;
      if (this.cep.length == 8) {
        const req = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
        const data = await req.json();

        cepMask = cepMask.replace(/^(\d{5})(\d)/, "$1-$2");
        this.cep = cepMask;

        this.logradouro = data.logradouro;
        this.bairro = data.bairro;
        this.cidade = data.localidade;
        this.ufEndereco = data.uf;
      }
    },
  },

  mounted() {
    this.getIngredientes();
  },

  components: {
    Message,
  },
};
</script>
<style scoped>
label {
  display: inline-block;
  margin-bottom: 5px;
  font-weight: 700;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333;
}

.input-container{
  text-align: end;
}
.submit-btn {
  background-color: #a90637;
  color: #ffff;
  font-weight: bold;
  border: 2px solid #a90637;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  margin-bottom: 100px;
  border-radius: 10px;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

form {
  padding-right: 300px;
  padding-left: 300px;
}

.col-md-0 {
  background-color: #eee;
  padding-left: 21px;
  padding-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.col-md-1 {
  width: 20%;
  display: inline-table;
  margin-right: 40px;
  margin-bottom: 23px;
}
.col-md-2 {
  width: 24%;
  margin-right: 40px;
  margin-bottom: 23px;
  display: inline-table;
}
.col-md-4 {
  width: 35%;
  margin-right: 40px;
  margin-bottom: 23px;
  display: inline-table;
}
.col-md-3 {
  width: 10%;
  margin-right: 40px;
  margin-bottom: 23px;
  display: inline-table;
}

.col-md-5 {
  width: 12%;
  display: inline-table;
}
.col-md-6 {
  width: 72%;
  margin-right: 40px;
  margin-bottom: 23px;
  display: inline-table;
}
.col-md-7 {
  width: 40%;
  margin-right: 40px;
  margin-bottom: 23px;
  display: inline-table;
}


</style>