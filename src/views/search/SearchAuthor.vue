<template>
    <el-container >
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp For 作者</h1>
        </el-header>
       <AuthorSearchResult v-if="activeShow"></AuthorSearchResult>
        <SearchRule v-else ></SearchRule>
    </el-container>
</template>

<script>
    import SearchRule from "./SearchRule";
    import AuthorSearchResult from "../../components/searchResult/AuthorSearchResult";

    export default {
        name: "author",
        components: {AuthorSearchResult, SearchRule},
        data: function () {
            return {
                activeShow:false,

                activeName: '1',
                flag: '-',
                warnflag: false,
                //搜索信息
                searchName: '',
                listSize: 0,

                totalElements:"",
                //幸运列表
                luckList: [
                ],
                luckflag: false,

                authorList: [
                ],


            }
        },

        methods: {
            //修改手风琴标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },

        },

        watch: {
            //监视标记,手风琴标记为string格式
            flag: function () {
                switch (this.flag) {
                    case '+':
                        this.activeName = "0";
                        break;
                    case'-':
                        this.activeName = "1";
                        break;
                }
            },
            '$store.state.inputfalg': function () {
                if(this.$store.state.radioLabel === 1){
                    this.activeShow = true;
                }
            }


        },

        mounted() {
            if(this.activeShow){
                this.getAuthorData();
            }
        },

        created() {

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
        margin: auto;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
    }


</style>
