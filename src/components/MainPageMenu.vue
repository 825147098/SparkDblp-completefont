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
<!--        <el-menu-item style="float: right">-->
<!--            <template slot="title" style="float: left">-->
<!--                背景特效开关-->
<!--            </template>-->
<!--            <el-switch-->
<!--                    v-model="value"-->
<!--                    active-color="#13ce66"-->
<!--                    inactive-color="#ff4949">-->
<!--            </el-switch>-->
<!--        </el-menu-item>-->
        <!--                <el-submenu index="about">-->
        <!--                    <template slot="title">about</template>-->
        <!--                    <el-menu-item index="aboutFAQ">问题查找</el-menu-item>-->
        <!--                    &lt;!&ndash;//Frequently Asked Questions&ndash;&gt;-->
        <!--                    <el-menu-item index="aboutTeam">团队</el-menu-item>-->
        <!--                    &lt;!&ndash;//项目团队&ndash;&gt;-->
        <!--                    <el-menu-item index="aboutLicense">许可</el-menu-item>-->
        <!--                    &lt;!&ndash;//版权，许可，使用条款，免责声明&ndash;&gt;-->
        <!--                    <el-menu-item index="aboutPrivacy">隐私</el-menu-item>-->
        <!--                    &lt;!&ndash;//数据隐私政策&ndash;&gt;-->
        <!--                </el-submenu>-->
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
