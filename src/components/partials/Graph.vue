<template>
    <div>
        <Graph/>
    </div>
</template>

<script>
    import Graph from '../../utils/graph'

    export default {
        components: {
            Graph
        },
        data() {
            return {}
        },
        mounted() {
        },
        methods: {},
    }
</script>

<style>
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
</style>
