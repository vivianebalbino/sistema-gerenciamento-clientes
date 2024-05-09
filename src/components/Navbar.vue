<template>
  <div id="nav">
    <router-link to="/" id="logo_url">
      <img :src="logo" :alt="alt" id="logo" />
    </router-link>
    <router-link to="/cadastro-clientes">Incluir</router-link>
    <router-link to="/lista-cadastro">Gerenciar Cadastro</router-link>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props: ["logo", "alt"]
};
</script>
<style scoped>
#nav{
    background-color: #E7E7E7;
    border-bottom: 2px solid #686465;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#nav #logo_url{
    margin: auto;
    margin-left: 0;
}

#nav a {
    color: #667;
    margin: 12px;
    transition: .5s;
    text-decoration: none;
}

#nav a:hover {
    color: #a90637
}
</style>