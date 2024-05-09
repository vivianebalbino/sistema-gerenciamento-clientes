<template>
  <CadastroForm/>
</template>
<script>

import CadastroForm from "../components/CadastroForm.vue";

export default { 
  name: "CadastroCliente",
  components: { CadastroForm },
  mounted() {
    this.hideNavLinks();
  },

  methods: {
    hideNavLinks() {
      document.querySelector("#nav").childNodes.forEach((elemento, posicao) => {
        if (posicao > 0) {
          elemento.style.display = "block";
        }
      });
    },
  }
};
</script>
<style>

</style>
