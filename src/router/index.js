import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro-clientes',
    name: 'CadastroCliente',
    component: () => import(/* webpackChunkName: "CadastroCliente" */ '../views/CadastroCliente.vue')
  },

]

const router = createRouter({ 
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
