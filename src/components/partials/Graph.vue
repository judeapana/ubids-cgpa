<template>
    <div>
        <v-bottom-navigation>
            <v-btn to="/" color="deep-purple accent-4" text>
                <span>Back</span>
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <apexchart type="line" :options="chartOptions" :series="series"></apexchart>

    </div><!--        <vue-chart></vue-chart>-->
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'Graph',
        mounted() {

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
                        categories: this.getCourseNames(),
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
