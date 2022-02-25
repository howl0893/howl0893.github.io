import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Chart from '../components/Chart.vue';
import Chart2 from '../components/Chart2.vue';

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
        {
            path:'/chart2',
            name:'Chart2',
            component: Chart2,
        },
    ],
})