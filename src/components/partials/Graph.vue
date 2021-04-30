<template>
    <div>
        <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
        <v-bottom-navigation >
            <v-btn v-if="$route.name!=='graph'" to="graph" :disabled="!valid" color="deep-purple accent-4" text>
                <span>Graph</span>
                <v-icon>mdi-graph</v-icon>
            </v-btn>
            <v-btn to="gpa" v-if="$route.name==='graph'" color="deep-purple accent-4" text>
                <span>Back</span>
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div><!--        <vue-chart></vue-chart>-->
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'Graph',
        mounted() {
            this.chartOptions.xaxis.categories = this.getCourseNames()
            this.series[0].data = this.getForm.map(x => x.score)
        },
        computed: {
            ...mapGetters('gpa', ['getForm'])
        },
        methods: {
            ...mapGetters('gpa', ['getCourseNames'])
        },
        data() {
            return {
                series: [{
                    name: "Course Scores",
                    data: []
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Performance',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: [],
                    }
                }
            }
        }
    }
</script>

<style>
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
</style>
