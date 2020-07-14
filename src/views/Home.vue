<template>
    <el-container>
        <CompleteResult></CompleteResult>
    </el-container>
</template>

<script>
    // @ is an alias to /src

    import CompleteResult from "../components/CompleteResult";
    export default {
        name: 'Home',
        components: {
            CompleteResult,
        },

    }
</script>
<style scoped>

</style>
