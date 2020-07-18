<template>
    <el-container>
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp</h1>
        </el-header>
        <el-container v-if="activeShow">
            <CompleteResult></CompleteResult>
            <ComRefineList></ComRefineList>
        </el-container>
        <SearchRule v-else></SearchRule>
    </el-container>
</template>

<script>
    import CompleteResult from "../../components/CompleteResult";
    import ComRefineList from "../../components/refineList/ComRefineList";
    import SearchRule from "./SearchRule";
    export default {
        name: "SearchComplete",
        components: {SearchRule, ComRefineList, CompleteResult},

        data:function () {
            return{
                activeShow:false,
            }
        },

        watch:{
            '$store.state.inputfalg': {
                handler() {
                    // console.log(this.$store.state)
                    if(this.$store.state.inputfalg && this.$store.state.radioLabel === 0){
                        this.activeShow = true;
                        // console.log(this.$store.state)
                    }
                },
                deep:true
            }
        },

        created() {
            this.activeShow = this.$store.state.inputfalg
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
