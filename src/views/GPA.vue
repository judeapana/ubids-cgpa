<template>
  <div>
    <v-bottom-navigation class="mt-15" horizontal>
      <v-btn :disabled="!valid" @click="run" color="deep-purple accent-4" text>
        <span>Calculate</span>
        <v-icon color="green">mdi-history</v-icon>
      </v-btn>

      <v-btn to="graph" :disabled="!valid" color="deep-purple accent-4" text>
        <span>Graph</span>
        <v-icon color="indigo">mdi-graph</v-icon>
      </v-btn>
      <v-btn to="view" :disabled="!valid" color="deep-purple accent-4" text>
        <span>View</span>
        <v-icon color="orange">mdi-eye</v-icon>
      </v-btn>
      <v-btn @click="reset" color="deep-purple accent-4" text>
        <span>Reset All</span>
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <GPAForm></GPAForm>
    <v-dialog
        v-model="dialog"
        width="500">
      <v-card>
        <v-card-title class="headline">
          Your Results
        </v-card-title>

        <v-card-text>
          <div v-if="!isNaN(gpa)">
            <p> Your Accumulative/Grade Point Average (GPA) is :<b>{{ gpa }}</b></p>
            <p>Your Class: <b>{{ finalClass(gpa) }}</b></p>
          </div>
          <div v-else>
            <p class="text-center font-italic">Sorry but it seem you haven't completed some of the fields,
              please
              check</p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      gpa: 0,
      snackbar: false,
      text: ""
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
      this.text = "Resetting Form";
      this.snackbar = true;
    },
    run() {
      this.a_GetGPA(this.gradePoint).then((gpa) => {
        this.dialog = true
        this.gpa = gpa
        this.text = "Calculating Results.";
        this.snackbar = true;
      }).catch((error) => {
        alert(error)
      })
    }
  },
  components: {GPAForm},
}
</script>
