<template>
<!--    <el-container>-->
        <el-main style="display: inline">
            <el-menu mode="horizontal"
                     class="menuStyle"
                     background-color="#959595"
                     default-active="$route.path"
                     text-color="#fff">
                <el-submenu index="homeMenue" >
                    <template slot="title">主页</template>
                    <el-menu-item index="home" style="width: 50px">首页</el-menu-item>
                    <el-menu-item index="homeStatistics">统计</el-menu-item>
                </el-submenu>
                <el-submenu index="brores">
                    <template slot="title">浏览</template>
                    <el-menu-item index="browsePerson">作者</el-menu-item>
                    <el-menu-item index="browseConferences">会议</el-menu-item>
                    <el-menu-item index="browseJournals">期刊</el-menu-item>
                    <el-menu-item index="browseSeries">系列</el-menu-item>
                </el-submenu>
                <el-submenu index="search">
                    <template slot="title">搜索</template>
                    <el-menu-item index="searchDblp">搜索dblp</el-menu-item>
                    <el-menu-item index="searchByID">搜索ID</el-menu-item>
                </el-submenu>
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
        </el-main>
<!--    </el-container>-->
</template>

<script>
    export default {
        name: "MainPageMenu"
    }
</script>

<style scoped>
    .menuStyle {
        display: table-cell;
        color: #ffffff;
        background: #606b70;
        border-bottom: 2px solid #606B70;
        margin: 0px;
        width: 270px;
    }
</style>
