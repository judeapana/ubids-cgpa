import {Bar} from 'vue-chartjs'
import {mapGetters} from "vuex";
// eslint-disable-next-line no-unused-vars
import VueCharts from 'vue-chartjs'

export default {
    extends: Bar,
    computed: {
        ...mapGetters('gpa', ['getForm'])
    },
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: this.getForm.map(x => x.courseName),
            datasets: [
                {
                    label: 'Schema',
                    backgroundColor: '#f87979',
                    data: this.getForm.map(x => x.score)
                }
            ]
        })
    }
}
