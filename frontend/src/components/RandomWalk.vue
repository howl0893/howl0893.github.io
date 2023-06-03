<template>
    <div ref="random-walk"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
    data() {
        return {
            maxStep: 500,
            maxIndex: 50,
            timeStep: 0.001,
            walkerNum: 6,
            time: null,
            xMaster: null,
            yMaster: null,
            scatters: null,
            colors: null,
            anim: null,
        };
    },
    methods: {
        randomWalk() {
            this.time = d3.range(0, (0.001 * 50) + this.timeStep, this.timeStep);
            this.xMaster = d3.range(this.walkerNum).map(() => new Array(this.maxIndex + 1).fill(0));
            this.yMaster = d3.range(this.walkerNum).map(() => new Array(this.maxIndex + 1).fill(0));
            this.scatters = [];
            this.colors = d3.scaleSequential(d3.interpolateRainbow).domain([0, this.walkerNum]);

            const svg = d3.select(this.$refs['random-walk'])
                .append('svg')
                .attr('width', 500)
                .attr('height', 500)
                .style('background-color', '#F5F5F5');

            const g = svg.append('g').attr('transform', 'translate(50,50)');

            const xScale = d3.scaleLinear().domain([0, this.maxStep]).range([0, 400]);
            const yScale = d3.scaleLinear().domain([0, this.maxStep]).range([400, 0]);

            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            g.append('g').call(xAxis).attr('transform', 'translate(0,400)');
            g.append('g').call(yAxis);

            for (let walker = 0; walker < this.walkerNum; walker++) {
                let x = new Array(this.maxIndex + 1).fill(0);
                let y = new Array(this.maxIndex + 1).fill(0);
                for (let i = 0; i < this.maxIndex; i++) {
                    const first = Math.random(); // first random number
                    const second = Math.random(); // second random number
                    const stepsize = first * this.maxStep; // step size of random walk
                    const angle = second * 2 * Math.PI; // direction of random walk
                    x[i + 1] = x[i] + stepsize * Math.cos(angle); // next x position
                    y[i + 1] = y[i] + stepsize * Math.sin(angle); // next y position

                    const s = g.append('line')
                        .attr('x1', xScale(x[i]))
                        .attr('y1', yScale(y[i]))
                        .attr('x2', xScale(x[i + 1]))
                        .attr('y2', yScale(y[i + 1]))
                        .attr('stroke', this.colors(walker))
                        .attr('stroke-width', 2)
                        .style('opacity', 0);

                    this.scatters.push(s);

                    this.xMaster[walker][i + 1] = x[i + 1];    // store walker's x-coordinate
                    this.yMaster[walker][i + 1] = y[i + 1];    // store walker's y-coordinate
                }
            }

            const legend = svg.append('g')
                .attr('transform', 'translate(450,50)');

            const legendItems = legend.selectAll('.legend-item')
                .data(d3.range(this.walkerNum))
                .join('g')
                .attr('class', 'legend-item')
                .attr('transform', (d, i) => `translate(0,${i * 20})`);

            legendItems.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 8)
                .attr('fill', (d) => this.colors(d));

            legendItems.append('text')
                .attr('x', 15)
                .attr('y', 5)
                .text((d) => `Walker ${d + 1}`);

            this.anim = d3
                .transition()
                .delay(1000)
                .duration(25)
                .ease(d3.easeLinear);

            this.update(0);
        },
        update(frame) {
            for (let i = 0; i < this.scatters.length; i++) {
                if (i <= frame) {
                    this.scatters[i].style('opacity', 1);
                } else {
                    this.scatters[i].style('opacity', 0);
                }
            }

            const rSquared = new Array(this.time.length - 1).fill(0).map(() => new Array(this.walkerNum).fill(0));
            const rSquaredAvg = new Array(this.time.length - 1).fill(0);

            for (let tIndex = 1; tIndex < this.time.length; tIndex++) {
                for (let i = 0; i < this.walkerNum; i++) {
                    rSquared[tIndex - 1][i] = this.xMaster[i][tIndex] ** 2 + this.yMaster[i][tIndex] ** 2;
                }
                rSquaredAvg[tIndex - 1] = d3.sum(rSquared[tIndex - 1]) / this.walkerNum;
            }

            // Plotting MSD
            // const msdSvg = d3.select('#msd-chart');
            // msdSvg.selectAll('*').remove();
            // const msdG = msdSvg.append('g').attr('transform', 'translate(50,50)');
            // const msdXScale = d3.scaleLinear().domain([0, this.time[this.time.length-1]]).range([0, 400]);
            // const msdYScale = d3.scaleLinear().domain([0, d3.max(rSquaredAvg)]).range([400, 0]);
            // const msdLine = d3.line().x((d, i) => msdXScale(this.time[i+1])).y((d) => msdYScale(d));
            // msdG.append('path').datum(rSquaredAvg).attr('d', msdLine).attr('stroke', 'steelblue').attr('stroke-width', 2).attr('fill', 'none');
        }
    },
    mounted() {
        this.randomWalk();
    }
};
</script>