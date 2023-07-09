import Vue from 'vue'
import VueRouter from 'vue-router'
import GPA from "../views/GPA";
import Graph from "../components/partials/Graph";
import View from "../components/partials/View";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'gpa',
        component: GPA
    },
    {
        path: '/graph',
        name: 'graph',
        component: Graph
    },{
        path: '/view',
        name: 'download',
        component: View
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
