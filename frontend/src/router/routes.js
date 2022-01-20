import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Halas from '../components/Halas.vue';
// import Projects from '../components/Projects.vue';


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
            path:'/about',
            name:'About',
            component: About,
        },
        {
            path:'/halas',
            name:'Halas',
            component: Halas,
        },
        // {
        //     path:'/projects',
        //     name:'Projects',
        //     component: Projects,
        // },
            
    ],
})