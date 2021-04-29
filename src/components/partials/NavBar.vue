<template>
    <v-card color="red lighten-grey" flat tile :loading="false">
        <v-toolbar dense>
            <!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
            <v-toolbar-title>C/GPA</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-share</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-btn @click="add" class="ml-2" color="green darken-green" outlined fab small bottom>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>
    </v-card>

</template>
<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        mixins: [],
        computed: {
            ...mapGetters('gpa', ['getForm', 'getInitialState']),
        },

        name: "NavBar",
        methods: {
            add() {
                let len = this.getForm.length;
                if (len === 0) {
                    this.a_AddForm(this.getInitialState)
                } else {
                    this.a_AddForm({
                        ...this.getInitialState,
                        index: this.getForm[len - 1].index + 1,
                        courseName: `Course ${this.getForm[len - 1].index + 1}`
                    },)
                }
            },
            ...mapActions('gpa', ["a_AddForm"]),

        },
        data: () => ({

            items: [
                {title: 'About Us'},
                {title: 'Share'},
            ],
        })
    }
</script>
