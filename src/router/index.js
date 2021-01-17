import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:countryId',
    name: 'Details',
    component: Details
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})


export default router