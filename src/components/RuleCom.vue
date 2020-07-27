<template>
    <div style="font-size: 16px; text-align: left;">
        <ul>
            <li>Title允许使用一个字符串作为输入。例如:</li>
            <!--                        <li style="margin-left: 5%"></li><br>-->
            <li style="margin-left: 5%">title:bigdata title中含有bigdata字符串的论文</li>
            <li style="margin-left: 5%">注意：</li>
            <li style="margin-left: 5%">1）title大小写不敏感，这意味着输入BigData也会返回bigdata的数据</li>
            <li>Year允许输入一个整形数字，或者整形数字的Range。例如：</li>
            <li style="margin-left: 5%">year:2019 查询2019的论文</li>
            <li style="margin-left: 5%">year:2010..2020 查询2010到2020的论文</li>
            <li>Author允许输入字符串或者字符串集合。例如:</li>
            <li style="margin-left: 5%">author: Yang 查询含有作者姓名含有Yang的论文</li>
            <li style="margin-left: 5%">author: Yang,mike 查询作者姓名的含有Yang或者mike的论文</li>
            <li style="margin-left: 5%">注意：</li>
            <li style="margin-left: 5%">1）作者姓名只允许精确匹配，这意味着当输入为Yan的时候，不会显示作者包含Yang的论文。</li>
            <li style="margin-left: 5%">2）作者姓名大小写敏感，这意味着当输入为yan的时候，不会显示作者包含Yan的论文。</li>
            <li style="margin-left: 5%">e.g.,distribut&year:2010..2020&author:tom,mike</li>
            <li>Venue与Type类型不允许用户直接输入，可以根据搜索结果优化列表点击筛选</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "RuleCom"
    }
</script>

<style scoped>

</style>
