import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Chart from '../components/Chart.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Home',
            component: Home,
        },
        {
            path:'/chart',
            name:'Chart',
            component: Chart,
        },
    ],
})