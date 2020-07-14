<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
       <el-header class="header" height="auto">
           <SearchBar></SearchBar>
           <h3 class="headline">
               {{authorName}}
           </h3>
       </el-header>
        <el-container>
            <AuthorCompleteResult></AuthorCompleteResult>
            <AuthorRefienList class="refineList"></AuthorRefienList>

        </el-container>
    </el-container>
</template>

<script>
    import axios from 'axios';
    import SearchBar from "../../components/SearchBar";
    import AuthorRefienList from "../../components/refineList/AuthorRefienList";
    import AuthorCompleteResult from "../../components/AuthorCompleteResult";
    export default {
        name: "resultAuthor",
        components: {AuthorCompleteResult, AuthorRefienList, SearchBar},
        data: function () {
            return{
                da:[]  ,
                authorName:'Xi Zheng ',
            }
        },

        methods:{
          getAuthorDeatil(){
            axios.get(this.$store.state.host +'/articles/search/findAllByAuthorContainingAccurate',{
                params:{
                    author:this.authorName
                }
            }).then(res =>{
                this.da = res.data;
                console.log(res.data)
            }).catch(error =>{
                console.log(error);
            })
          }
        },

        mounted() {
            // this.getAuthorDeatil();
        },

        created() {
            if (this.$route.query.autName != null) {
                this.authorName = this.$route.query.autName;
                console.log(this.authorName)
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
        height: auto;
        margin: auto;
    }
    .refineList{
        margin-right: 20px;
    }
</style>
