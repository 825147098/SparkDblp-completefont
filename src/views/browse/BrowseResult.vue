<template>
    <el-container style="width: 80%;margin: auto ;max-width: 1150px">
        <el-header height="auto" >
            <SearchBar></SearchBar>
        </el-header>
            <router-view ></router-view>
    </el-container>
</template>

<script>
    import SearchBar from "../../components/SearchBar";

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
