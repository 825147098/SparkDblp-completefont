<template>
    <el-aside class="asideCon">
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1">
                <template slot="title">
                    [{{flag}}] 搜索优化列表
                </template>
                <RefineByAuthor name="作者"></RefineByAuthor>
                <RefineByVenue></RefineByVenue>
                <RefineByType></RefineByType>
                <RefineByYear></RefineByYear>
            </el-collapse-item>
        </el-collapse>

    </el-aside>
</template>

<script>
    import RefineByAuthor from "../refineListItem/RefineByAuthor";
    import RefineByVenue from "../refineListItem/RefineByVenue";
    import RefineByType from "../refineListItem/RefineByType";
    import RefineByYear from "../refineListItem/RefineByYear";

    export default {
        name: "ComRefineList",
        components: {RefineByYear, RefineByType, RefineByVenue, RefineByAuthor},
        data: function () {
            return {
                flag: '-',
                activeName: '1',
            }
        },

        methods: {
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },
        },


    }
</script>

<style scoped>
    .asideCon {
        float: right;
        display: inline;
        max-width: 250px;
        background: #ffffff;
        margin: 0;
    }
</style>
