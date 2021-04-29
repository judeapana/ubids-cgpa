<template>
    <v-app>
        <NavBar/>
        <router-view/>
        <div class="text-center ma-2">
            <v-snackbar v-model="snackbar">
                {{ text }}
                <template v-slot:action="{ attrs }">
                    <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>

    </v-app>
</template>

<script>

    import NavBar from "./components/partials/NavBar";

    export default {

        name: 'App',
        components: {NavBar},
        data: () => ({
            snackbar: false,
            text: "",
        }),
    };
</script>
