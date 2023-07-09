<template>
    <div v-if="form.length > 0">
        <v-card :loading="getLoading" class="mx-auto" tile>
            <v-form v-model="valid">
                <v-expansion-panels v-model="panel" accordion>
                    <v-expansion-panel v-model="panel" v-for="(form,index) in form" :key="index">
                        <v-expansion-panel-header>
                            <template v-slot:default="{ open }">
                                <v-row no-gutters>
                                    <v-col cols="4">
                                        <v-chip small color="green" text-color="white" class="font-italic sm10">Record
                                            {{form.index}}
                                        </v-chip>
                                    </v-col>
                                    <v-col cols="8" class="text--secondary">
                                        <v-fade-transition leave-absolute>
                                        <span class="sm1 font-italic text-sm-subtitle-2" v-if="open" :key="0">
                                          Complete fields
                                        </span>
                                            <span class="font-italic text-sm-center" v-else :key="1">
                                            <v-chip class="mr-3" x-small>Grade Point {{gradePoint(form)}} </v-chip>
                                            <v-chip x-small>{{form.courseName}}</v-chip>
                                        </span>
                                        </v-fade-transition>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container fluid>
                                <v-row class="mx-auto align-center">
                                    <v-col md="2" cols="12">
                                        <v-select :rules="rules.accy" type="text"
                                                      label="Academic Year" :items="accys"
                                                   v-model="form.accy"></v-select>
                                    </v-col>
                                  <v-col md="2" cols="12">
                                        <v-select :rules="rules.term" type="text"
                                                      label="Trimester/Semester" :items="terms"
                                                   v-model="form.term"></v-select>
                                    </v-col>
                                </v-row>
                              <v-row class="mx-auto align-center">
                                <v-col md="2" cols="12">
                                  <v-text-field :rules="rules.courseName" type="text"
                                                label="The Course"
                                                v-model="form.courseName"></v-text-field>
                                </v-col>
                                <v-col md="2" cols="12">
                                  <v-text-field :min="0" :rules="rules.creditHours" type="number"
                                                label="Credit Hours"
                                                v-model.number="form.creditHours"></v-text-field>
                                </v-col>
                                <v-col md="2" cols="12">
                                  <v-text-field :min="0" :rules="rules.score" type="number" label="Score/Mark"
                                                v-model.number="form.score"></v-text-field>
                                </v-col>
                                <v-col md="2" cols="12">
                                  <p class="text-sm-subtitle-2">Your Grade Point : {{gradePoint(form)}}</p>
                                </v-col>
                                <v-col md="4" cols="12">
                                  <v-btn @click="add" class="mr-4" color="green darken-green" outlined fab small
                                         bottom>
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn @click="remove(index)" color="red darken-red" outlined fab small bottom>
                                    <v-icon>mdi-minus</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>

                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-form>
        </v-card>
    </div>
    <div v-else>
        <v-parallax height="750" dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 font-weight-thin mb-4">
                        GPA Calculator
                    </h1>
                    <div class="subheading">
                        <p>Kindly click on the (+) to start/continue</p>
                        <p class="text-sm-subtitle-1 font-italic">Developed by <a href="https://gh.linkedin.com/in/apana-jude-241424156">https://gh.linkedin.com/in/apana-jude-241424156</a></p>

                    </div>
                </v-col>
            </v-row>
        </v-parallax>
    </div>
</template>
<script>
    import FormMixin from '../../utils/form.mixin';
    import ComputationMixin from '../../utils/computations.mixin'
    import {mapActions, mapGetters} from "vuex";

    export default {
        mounted() {
            this.form = this.getForm
        },
        mixins: [FormMixin, ComputationMixin],
        name: 'GPAForm',
        methods: {
            createNew() {
                this.snackbar = true
                this.text = "New Record Created"
            }, deleteAll() {
                this.snackbar = true
                this.text = "Records Deleted"
            },
            ...mapActions('gpa', ["a_AddForm", "a_RemoveForm"]),
            remove(index) {

                this.a_RemoveForm(index)
            },
            add() {
                let len = this.form.length;
                this.createNew()
                if (len === 0) {
                    this.a_AddForm(this.getInitialState)
                } else {
                    this.a_AddForm({
                        ...this.getInitialState,
                        index: this.form[len - 1].index + 1,
                        courseName: `Course ${this.form[len - 1].index + 1}`
                    },)
                }
            }
        },
        computed: {
          accys(){
            return Array.from({ length: this.endYear - this.startYear + 1 }).reduce((acc, _, index) => {
              const year = `${this.startYear + index}/${this.startYear + index + 1}`;
              acc.push(year);
              return acc;
            }, []);
          },
            ...mapGetters('gpa', ['getForm', 'getInitialState', 'getLoading']),
            valid: {
                get() {
                    return this.$store.state.gpa.valid
                }, set(value) {
                    return this.$store.commit('gpa/setValid', value)
                }
            }

        },
        data() {
          return {
            panel: [],
            startYear: 2017,
            endYear: 2030,
            form: [],
            terms: ["First","Second","Third","Fourth","Fifth"],
            rules: {
              courseName: [this.required()],
              creditHours: [this.required(), this.lessThan(0), this.greaterThan(6)],
              score: [this.required(), this.lessThan(0), this.greaterThan(100)],
              gradePoint: [this.required()],
              term: [this.required()],
              accy: [this.required()]
            }
          }
        }
    }
</script>
