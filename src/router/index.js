import Vue from 'vue'
import VueRouter from 'vue-router'
import GPA from "../views/GPA";
import Graph from "../components/partials/Graph";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'GPA',
        component: GPA
    },
    {
        path: '/graph',
        name: 'graph',
        component: Graph
    }, {
        path: '*',
        name: 'Nowhere',
        component: GPA
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
