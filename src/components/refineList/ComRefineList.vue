<template>
    <el-aside class="asideCon">
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1" >
                <template slot="title">
                    [{{flag}}] 搜索优化列表
                </template>
                <!--                作者细化-->
                <RefineByAuthor name="作者"></RefineByAuthor>
                <!--                会议细化-->
                <RefineByVenue></RefineByVenue>
                <!--                类型细化-->
                <RefineByType></RefineByType>
                <!--                年份细化-->
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
                toShow: false,
            }
        },

        methods: {
            // 折叠板标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },
        },

        watch: {
            "$store.state.serchObj.conflag": function () {
                if (this.$store.state.serchObj.conflag) {
                    // console.log(this.toShow)
                    setTimeout(() => {
                        this.toShow = true;
                        // console.log(this.toShow)
                    }, 2500)
                }
            },
        },

        created() {
        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

</style>
