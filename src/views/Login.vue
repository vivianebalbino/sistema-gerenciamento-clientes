<template>
    <div class="logo-image">
      <img
        id="marca"
        src="/img/logo_fcc_transparente.png"
        alt="Logo Fundação Carlos Chagas"
      />
  </div>
  <div class="loginCliente">
    <div> 
        <h2 class="login">Login</h2>
        <div class="boxLogin">
          <div class="form-group">
						<label for="username">Username</label>
            <input type="text" v-model="username" class="control" id="username" placeholder="Username"/>
          </div>
          <div class="form-group">
						<label for="passoword">Senha</label>
            <input type="password" v-model="password" class="control" id="passoword" placeholder="Password"/>
          </div>
          <button class="btn-logar" @click="login" aria-label="Entrar">Entrar</button>
      </div>
    </div> 
  </div>
</template>

<script scoped>
import users from "/db/users.json";

export default {
  components: {
    users,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },

  mounted() {
    this.hideCabecalhoRodape();
  },

  methods: {
    hideCabecalhoRodape() {
      document.querySelector("#nav").style = "visibility: hidden;"
      document.querySelector("#footer").style = "visibility: hidden;"
    }, 

    login() {
      const user = users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );
      if (user) {
        document.querySelector("#nav").style = "visibility: visible;"
        document.querySelector("#footer").style = "visibility: visible;"
        this.$router.push('/cadastro-clientes');
      } else {
        alert("Credenciais inválidas");
      }
    },
  },
};
</script>
<style scoped>
.login {
    font-size: 40px !important;
    color: #9f2d34;
    border: 0px !important;
    margin-top: 9px !important;
    margin-bottom: 4px !important;
    line-height: 30px;
    font-weight: normal;
    letter-spacing: normal;
    padding-bottom: 15px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
}

.loginCliente {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0755a3;
  margin-top: 60px;
}

.boxLogin{
    padding-left: 80px;
    padding-right: 80px;
    border-radius: 10px;
    padding-top: 18px;
    padding-bottom: 30px;
    margin-bottom: 30px;
    color: inherit;
    background-color: #eee;
    margin-left: 9%;
    width: 26%;
    position: relative;
    min-height: 1px;
    display: inline-block;
    margin-right: 9%;
}
.col-md-4{
  display: inline-flex;
  width: 65%;
}


label{
  display: flex;
    margin-bottom: 5px;
    font-weight: 700;
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.428571429;
    color: #333;
    margin-top: 6%;
}

.control{
  display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #9f2d34;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#marca{
    margin: -62px 0px 0px 150px;
    width: 14%;
}
.btn-logar{
    background-repeat: repeat-x;
    border-color: #8f292f;
    color: #fff;
    background-color: #9f2d34;
    display: flex;
    margin-bottom: 0;
    margin-top: 10%;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 17px;
    line-height: 1.428571429;
    border-radius: 4px;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
</style>

