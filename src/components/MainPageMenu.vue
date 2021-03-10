<template>
    <!--    <el-container>-->
    <!--    所有页面的路由导航菜单-->
    <el-menu mode="horizontal"
             class="menuStyle"
             router
             background-color="#8696A6"
             default-active="$route.path"
             text-color="#fff">
        <!--                <el-submenu index="homeMenue" >-->
        <!--                    <template slot="title">主页</template>-->
        <el-menu-item index="/">首页</el-menu-item>
        <!--                    <el-menu-item index="homeStatistics">统计</el-menu-item>-->
        <!--                </el-submenu>-->
        <el-submenu index="brores">
            <template slot="title">浏览</template>
            <el-menu-item
                    route="/brores/per"
                    index="browsePerson">作者
            </el-menu-item>
            <el-menu-item
                    route="/brores/journals"
                    index="browseJournals">期刊</el-menu-item>
            <el-menu-item
                    route="/brores/conf"
                    index="browseConferences">会议</el-menu-item>
<!--            <el-menu-item index="browseSeries">系列</el-menu-item>-->
        </el-submenu>
        <el-submenu index="search">
            <template slot="title">搜索</template>
            <el-menu-item
                    route="/search/complete"
                    index="searchDblp">搜索dblp
            </el-menu-item>
            <!--                    <el-menu-item index="searchByID">搜索ID</el-menu-item>-->
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "MainPageMenu",

        data:function () {
            return{
                value:true,
            }
        },

        watch:{
          value:function () {
            if(this.value){
                this.$store.commit("turnOnbackgroundEffect")
            } else {
                this.$store.commit("turnOffbackgroundEffect")
            }
          }
        }
    }
</script>

<style scoped>
    .menuStyle {
        /*display: table-cell;*/
        /*color: #ffffff;*/
        /*background: #8696A6;*/
        background-color: #C1CBD7;
        color: #2c3e50;
        border-bottom: none;
        /*margin: 0;*/
        /*width: 270px;*/
    }
</style>
