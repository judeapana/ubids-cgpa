<template>
    <div>
        <v-bottom-navigation class="mt-15">
            <v-btn to="/" color="deep-purple accent-4" text>
                <span>Back</span>
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-bottom-navigation>
      <v-data-table
          disable-pagination
          :headers="headers"
          :items="this.getForm"
          item-key="index"
          sort-by="accy"
          group-by="accy"
          class="elevation-1"
          show-group-by
      ></v-data-table>
    </div><!--        <vue-chart></vue-chart>-->
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'View',
        mounted() {
            this.series[0].data = this.getForm.map(x => x.score)
        },
        computed: {
            ...mapGetters('gpa', ['getForm']),

        },
        methods: {
        },
        data() {
            return {
              headers: [
                {
                  text: 'Academic Year',
                  align: 'start',
                  value: 'accy',
                  groupable: true,
                },{
                  text: 'Trimester/Semester',
                  align: 'right',
                  value: 'term',
                  groupable: false,
                },
                { text: 'Course Title/Code', value: 'courseName', align: 'right',groupable: false },
                { text: 'Credit Hours', value: 'creditHours', align: 'right',groupable: false,},
                { text: 'Score', value: 'score', align: 'right',groupable: false, },
              ],
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
