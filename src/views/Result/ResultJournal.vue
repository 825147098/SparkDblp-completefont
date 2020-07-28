<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
        <el-header class="header" height="auto">
            <SearchBar></SearchBar>
            <h3 class="headline">
                {{jourName}}
            </h3>
        </el-header>
        <el-container>
            <!--            会议详细结果-->
            <JournalCompleteResult></JournalCompleteResult>
        </el-container>
    </el-container>
</template>

<script>
    import SearchBar from "../../components/SearchBar";
    import JournalCompleteResult from "../../components/searchResult/JournalCompleteResult";

    export default {
        name: "ResultJournal",
        components: {JournalCompleteResult, SearchBar},

        data: function () {
            return {
                jourName: '',
            }
        },

        methods: {},

        mounted() {

        },

        watch: {
            '$route.query.jourName': function () {
                this.jourName = this.$route.query.jourName;
            }
        },

        created() {
            if (this.$route.query.jourName != null) {
                this.jourName = this.$route.query.jourName;
            }
        }
    }
</script>

<style scoped>

</style>
