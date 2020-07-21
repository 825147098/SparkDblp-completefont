<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
       <el-header class="header" height="auto">
           <SearchBar></SearchBar>
           <h3 class="headline">
               {{authorName}}
           </h3>
       </el-header>
        <el-container>
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

        methods:{

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
    .headline {
        position: relative;
        clear: both;
        background: #606b70;
        color: #ffffff;
        font-size: x-large;
        font-weight: 600;
        text-align: left;
        padding: 4px 24px;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
        padding: 0;
    }
</style>
