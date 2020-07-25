<template>
    <el-container style="width: 80%;margin: auto ;max-width: 1150px">
        <el-header height="auto " style="padding: 0" >
<!--            搜索栏-->
            <SearchBar></SearchBar>
        </el-header>
<!--        子路由-->
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
            this.$store.commit("incrementRadio",{newLabel: 4});
        }
    }
</script>

<style scoped>

</style>
