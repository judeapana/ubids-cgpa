<template>
    <v-card color="red lighten-grey" flat tile :loading="false">
        <v-toolbar dense>
            <v-toolbar-title>UBIDS C/GPA</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="webShareApiSupported" @click="shareViaWebShare" icon title="Share">
              <v-icon>mdi-share</v-icon>
            </v-btn>
            <v-btn v-if="$route.name!=='graph'" @click="add" class="ml-2" color="green darken-green" outlined fab small
                   bottom>
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
            webShareApiSupported() {
                return navigator.share
            },
        },
        name: "NavBar",
        methods: {
            shareViaWebShare() {
                navigator.share({
                    title: 'Share UBIDS GPA Calculator with your friends',
                    text: 'Accumulative/ Grade point Calculator developed by https://gh.linkedin.com/in/apana-jude-241424156',
                    url: this.$route.fullPath
                })
            },
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
