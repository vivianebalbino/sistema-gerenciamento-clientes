<template>
  <Navbar :logo="logo_src" :alt="app_name"/>
  <router-view/>
  <Footer/>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data(){
    return{
      logo_src: "/img/logo_fcc_transparente.png",
      app_name: "Controle Cadastro Cliente"
    }
     
  }
  
}
</script>

<style>
*{
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main-container{
  margin: 50px;
  min-height: 380px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #a90637;
}
.titulos {
    font-size: 24px !important;
    color: #9f2d34;
    border: 0px !important;
    margin-top: 9px !important;
    margin-bottom: 4px !important;
    line-height: 30px;
    font-weight: normal;
    letter-spacing: normal;
    padding-bottom: 15px;
    text-align: center;
}

.tituloBox {
    font-weight: bold;
    color: #FFFFFF;
    padding-bottom: 5px;
    background: #b0b2b3;
    padding-top: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.tituloBox span {
    margin-left: 10px;
    font-weight: bold;
    color: #FFFFFF;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.428571429;
}
</style>
