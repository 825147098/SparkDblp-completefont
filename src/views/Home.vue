<template>
    <el-main>
        <JournalItem></JournalItem>
    </el-main>
</template>

<script>
    // @ is an alias to /src

    import JournalItem from "../components/bookTypeItem/JournalItem";
    export default {
        name: 'Home',
        components: {
            JournalItem

        },

    }
</script>
<style scoped>

</style>
