<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
       <el-header class="header" height="auto">
           <SearchBar></SearchBar>
           <h3 class="headline">
               {{authorName}}
           </h3>
       </el-header>
        <el-container>
<!--            作者详细结果-->
            <AuthorCompleteResult :name=authorName></AuthorCompleteResult>
        </el-container>
    </el-container>
</template>

<script>
    import SearchBar from "../../components/SearchBar";
    import AuthorCompleteResult from "../../components/searchResult/AuthorCompleteResult";
    export default {
        name: "resultAuthor",
        components: {AuthorCompleteResult, SearchBar},
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
