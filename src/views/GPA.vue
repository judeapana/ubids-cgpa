<template>
    <div>
        <GPAForm></GPAForm>
        <v-bottom-navigation absolute horizontal>
            <v-btn :disabled="!valid" @click="run" color="deep-purple accent-4" text>
                <span>Calculate</span>
                <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="reset" color="deep-purple accent-4" text>
                <span>Reset All</span>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn :disabled="!valid" color="deep-purple accent-4" text>
                <span>Graph</span>
                <v-icon>mdi-graph</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <v-dialog
                v-model="dialog"
                width="500">
            <v-card>
                <v-card-title class="headline">
                    Your Results
                </v-card-title>

                <v-card-text>
                    <div v-if="!isNaN(gpa)">
                        Your Accumulative/Grade Point Average (GPA) is {{gpa}}<br> {{finalClass(gpa)}}
                    </div>
                    <div v-else>
                        <p class="text-center font-italic">Sorry but it seem you haven't completed some of the fields,
                            please
                            check</p>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!--                    <v-btn v-if="!isNaN(gpa)" color="green darken-1" text @click="dialog = false">-->
                    <!--                        Disagree-->
                    <!--                    </v-btn>-->

                    <v-btn color="green darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import GPAForm from "../components/forms/GPAForm";
    import {mapActions, mapState} from "vuex";
    import ComputationMixin from '../utils/computations.mixin'

    export default {
        mixins: [ComputationMixin],
        name: 'GPA',
        data() {
            return {
                dialog: false,
                gpa: 0
            }
        },
        computed: {
            ...mapState('gpa', {
                valid: state => state.valid
            })
        },
        methods: {
            ...mapActions('gpa', ['a_GetGPA', 'a_Reset']),
            reset() {
                this.a_Reset().then(() => {
                    this.$router.go(this.$router.currentRoute)
                })
            },
            run() {
                this.a_GetGPA(this.gradePoint).then((gpa) => {
                    this.dialog = true
                    this.gpa = gpa
                }).catch((error) => {
                    alert(error)
                })
            }
        },
        components: {GPAForm},
    }
</script>
