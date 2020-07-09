<template>
    <el-container>
        <el-header height="auto" >
            <SearchBar></SearchBar>
        </el-header>
            <router-view style="width: 80%;margin: auto"></router-view>
    </el-container>
</template>

<script>
    import SearchBar from "../components/SearchBar";

    export default {
        name: "BrowseResult",
        components: {SearchBar},
        data: function () {
            return {
            }
        },

        created() {

        }
    }
</script>

<style scoped>

</style>
