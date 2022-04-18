import Vue from 'vue';
import VueRouter from 'vue-router';
import Charts from '../components/Charts.vue';
import SVG from '../components/sandbox/SVG.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Charts',
            component: Charts,
        },
        {
            path:'/svg-sandbox',
            name:'SVG',
            component: SVG,
        }
    ],
})