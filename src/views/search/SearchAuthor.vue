<template>
    <el-container >
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp For 作者</h1>
        </el-header>
<!--        作者搜索结果-->
       <AuthorSearchResult v-if="activeShow" :search-author="true"></AuthorSearchResult>
        <SearchRule v-else ></SearchRule>
    </el-container>
</template>

<script>
    import SearchRule from "./SearchRule";
    import AuthorSearchResult from "../../components/searchResult/AuthorSearchResult";

    export default {
        name: "SearchAuthor",
        components: {AuthorSearchResult, SearchRule},
        data: function () {
            return {
                activeShow:false,
                activeName: '1',
            }
        },

        methods: {
        },

        watch: {
            //监视标记,手风琴标记为string格式

            '$store.state.inputfalg': function () {
                if(this.$store.state.radioLabel === 1){
                    this.activeShow = true;
                }
            },
        },

        mounted() {
            if (this.$route.query.autName != null) {
                // this.searchName = this.$route.query.autName;
                console.log(this.activeShow)
                this.activeShow = true;
            }
        },

        created() {
            this.$store.commit("incrementRadio",{newLabel: 1});
            if(this.$store.state.inputData != null){
                this.activeShow = true
            }
        }
    }
</script>

<style scoped>
    .headline {
        position: relative;
        clear: both;
        background-color: #C1CBD7;
        font-size: x-large;
        color: #7d848a;
        font-weight: 600;
        text-align: left;
        padding: 4px 24px;
        margin: auto;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
        padding: 0;
    }


</style>
