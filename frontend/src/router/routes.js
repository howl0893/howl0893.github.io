import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Chart from '../components/Chart.vue';
// import About from '../views/About.vue';
// import Halas from '../views/Halas.vue';
// import Projects from '../views/Projects.vue';


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
        }
        // {
        //     path:'/about',
        //     name:'About',
        //     component: About,
        // },
        // {
        //     path:'/halas',
        //     name:'Halas',
        //     component: Halas,
        // },
        // {
        //     path:'/projects',
        //     name:'Projects',
        //     component: Projects,
        // },
            
    ],
})