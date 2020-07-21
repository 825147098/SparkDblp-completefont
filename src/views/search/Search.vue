<template>
    <el-container style="width: 80%;margin: auto; max-width: 1150px">
        <el-header height="auto" style="padding: 0">
            <SearchBar></SearchBar>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>

<script>
    import SearchBar from "../../components/SearchBar";

    export default {
        name: "search",
        components: {SearchBar}
    }
</script>

<style scoped>

</style>
