<template>
    <el-container>
        {{da}}
    </el-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "resultAuthor",

        data: function () {
            return{
                da:[]  ,
                authorName:'',
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
            this.getAuthorDeatil();
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

</style>
