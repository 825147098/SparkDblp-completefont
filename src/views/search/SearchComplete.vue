<template>
    <el-container>
        <el-header class="header" >
            <h1 class="headline">搜索 Spark Dblp</h1>
        </el-header>
        <el-container v-if="activeShow">
            <CompleteResult></CompleteResult>
            <ComRefineList></ComRefineList>
        </el-container>
        <SearchRule v-else ></SearchRule>
    </el-container>
</template>

<script>
    import CompleteResult from "../../components/CompleteResult";
    import ComRefineList from "../../components/refineList/ComRefineList";
    export default {
        name: "ResultComplete",
        components: {ComRefineList, CompleteResult},

        data:function () {
            return{
                activeShow:true,
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
        margin: auto;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
    }
</style>
