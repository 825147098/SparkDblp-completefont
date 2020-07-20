<template>
    <el-aside>
        <el-aside class="asideCon">
            <el-collapse v-model="activeName" accordion @change="changeFalg">
                <el-collapse-item name="1">
                    <template slot="title">
                        [{{flag}}] 搜索优化列表
                    </template>
                    <div class="refine-by">
                        <p><b>按搜索词优化</b></p>
                        <el-input size="mini"
                                  v-model="refineInput"
                                  @keydown.enter.native="setFilter"
                                  style="width: 180px">

                        </el-input>
                    </div>
                    <RefineByTypeInDetail></RefineByTypeInDetail>
                    <RefineByAuthor name="协作者"></RefineByAuthor>
                    <RefineByVenue></RefineByVenue>
                </el-collapse-item>
            </el-collapse>

        </el-aside>
    </el-aside>
</template>

<script>
    import RefineByTypeInDetail from "../refineListItem/RefineByTypeInDetail";
    import RefineByVenue from "../refineListItem/RefineByVenue";
    import RefineByAuthor from "../refineListItem/RefineByAuthor";
    export default {
        name: "AuthorRefienList",
        components: {RefineByAuthor, RefineByVenue, RefineByTypeInDetail},
        data:function () {
            return {
                flag:'-',
                activeName:'1',

                refineInput:''
            }
        },

        methods:{
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },

            setFilter(){
                this.$store.commit("incrementRefineData",{newFilter: this.refineInput});
            }

        },
    }
</script>

<style scoped>
    .refine-by {
        margin: 0 0 2ex;
        font-size: smaller;
        text-align: left;
    }

    .refine-by > p {
        margin: 0;
        padding: 0;
    }
    .asideCon {
        /*float: right;*/
        display: inline;
        max-width: 250px;
        background: #ffffff;
        margin: 0;
    }
</style>
