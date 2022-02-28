import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Chart from '../components/Chart.vue';
import Scatter from '../components/Scatter.vue';
import TimeSeries from '../components/TimeSeries.vue';
import LineChart from '../components/LineChart.vue';

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
            path:'/scatter',
            name:'Scatter',
            component: Scatter,
        },
        {
            path:'/time-series',
            name:'TimeSeries',
            component: TimeSeries,
        },
        {
            path:'/line-chart',
            name:'LineChart',
            component: LineChart,
        },
    ],
})