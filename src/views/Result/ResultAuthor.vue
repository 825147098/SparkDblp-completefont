<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
      <el-header>
        <PageHeader :head-name="authorName"/>
      </el-header>
        <el-container>
<!--            作者详细结果-->
            <AuthorCompleteResult :name=authorName></AuthorCompleteResult>
        </el-container>
    </el-container>
</template>

<script>
    // import SearchBar from "../../components/SearchBar";
    import AuthorCompleteResult from "../../components/searchResult/AuthorCompleteResult";
    import PageHeader from "@/views/search/PageHeader";
    export default {
        name: "resultAuthor",
        components: {PageHeader, AuthorCompleteResult},
        data: function () {
            return{
                da:[]  ,
                authorName:'',
            }
        },

        watch:{
            "$route.query.autName":function () {
                if (this.$route.query.autName != this.authorName) {
                    this.authorName = this.$route.query.autName;
                }
            }
        },

        mounted() {

        },

        created() {
            if (this.$route.query.autName != null) {
                this.authorName = this.$route.query.autName;
            }
        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

</style>
