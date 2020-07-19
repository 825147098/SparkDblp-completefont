<template>
    <el-container>
        <el-header class="header" >
            <h1 class="headline">搜索 Spark Dblp</h1>
        </el-header>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>搜索</el-breadcrumb-item>
            </el-breadcrumb>
            <header class="head-hide">
                <h3>
                    <el-button size="mini"
                               @click="changeFalg"
                               type="text">
                        [{{flag}}]
                    </el-button>
                    请输入搜索查询
                </h3>
            </header>
<!--            手风琴模式的搜索规则-->
            <el-collapse v-model="activeName"
                         accordion>
                <el-collapse-item
                        name="1">
                    <div style="font-size: 13px; text-align: left">
                        <span>Title允许使用一个字符串作为输。例如:</span><br>
                        <span style="margin-left: 10%">title:bigdata title中含有bigdata字符串的论文</span><br>
                        <span style="margin-left: 10%">注意：</span><br>
                        <span style="margin-left: 10%">1）title大小写不敏感，这意味着输入BigData也会返回bigdata的数据</span>
                        <span>Year允许输入一个整形数字，或者整形数字的Range。例如：</span><br>
                        <span style="margin-left: 10%">year:2019 查询2019的论文</span><br>
                        <span style="margin-left: 10%">year:2010..2020 查询2010到2020的论文</span><br>
                        <span>Author允许输入字符串或者字符串集合。例如:</span><br>
                        <span style="margin-left: 10%">author: Yang 查询含有作者姓名含有Yang的论文</span><br>
                        <span style="margin-left: 10%">author: Yang,mike 查询作者姓名的含有Yang或者mike的论文</span><br>
                        <span style="margin-left: 10%">注意：</span><br>
                        <span style="margin-left: 10%">1）作者姓名只允许精确匹配，这意味着当输入为Yan的时候，不会显示作者包含Yang的论文。</span><br>
                        <span style="margin-left: 10%">2）作者姓名大小写敏感，这意味着当输入为yan的时候，不会显示作者包含Yan的论文。</span><br>
                        <span style="margin-left: 10%">e.g.,distribut&year:2010..2020&author:tom,mike</span><br>
                        <span>Venue与Type类型不允许用户直接输入，可以根据搜索结果优化列表点击筛选</span>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "searchRule",

        data: function () {
            return {
                activeName: '1',
                flag: '-',
            }
        },

        props:{
          titleShow:Boolean,
        },
        methods: {
            //修改手风琴标记
            changeFalg() {
                if (this.flag == '-')
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
        },

        mounted() {
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

    .breadClass {
        padding: 0 20px;
    }

    .head-hide {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 0;
        text-align: left;
        margin: 20px 0 0 0;
    }
</style>
