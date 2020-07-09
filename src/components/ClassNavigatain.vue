<template>
    <el-container>
        <el-main>
            <ul class="browtable">
                <li>
                    <div class="liimg" style="background-color: #606b70"/>
                    <header>浏览 作者 | 出版人</header>
                    <ul>
                        <li v-for="n in 26" :key="n">
                            <router-link :to="{path:'/brores/per',query:{prefix:getPrefix(n)}}"
                                         class="router-link-text"
                            >
                                {{getPrefix(n)}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="liimg" style="background-color: #c32b72"/>
                    <header>浏览 期刊</header>
                    <ul>
                        <li v-for="n in 26" :key="n">
                            <router-link :to="{path:'/brores/journals',query:{journalfix:getPrefix(n)}}"
                                         class="router-link-text"
                            >
                                {{getPrefix(n)}}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path:'/brores/journals',query:{journalfix:'publ'}}"
                                         class="router-link-text"
                            >
                                出版商
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="liimg" style="background-color: #196ca3"/>
                    <header>浏览 会议与研讨会</header>
                    <ul>
                        <li v-for="n in 26" :key="n">
                            <router-link :to="{path:'/brores/conf',query:{confix:getPrefix(n)}}"
                                         class="router-link-text"
                            >
                                {{getPrefix(n)}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="liimg" style="background-color: #33c3ba"/>
                    <header>浏览 系列论文库</header>
                    <ul>
                        <li v-for="item in seriesArry" :key="item">
                            <router-link :to="{path:'/brores/journals',query:{journalfix:item.toLowerCase}}"
                                         class="router-link-text"
                            >
                                {{item}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="liimg" style="background-color: #f8c91f"/>
                    <header>浏览 专著</header>
                    <ul>
                        <li v-for="mongo in mongoArry" :key="mongo">
                            <router-link :to="{path:'/brores/journals',query:{mongofix:mongo.toLowerCase}}"
                                         class="router-link-text"
                            >
                                {{mongo}}
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "ClassNavigatain",

        data: function () {
            return {
                seriesArry: ["CoRR", "LNCS", "CEUR-WS", "LNEE", "IFIP", "LNI", "EPTCS", "LIPICS", "other"],
                mongoArry:["books & theses","reference works","edited collections"],
            }
        },

        computed: {},

        methods: {
            getPrefix(n) {
                return String.fromCharCode(64 + n);
            },
        },
    }
</script>

<style scoped>
    .browtable {
        background-color: #ebebeb;
        width: 650px;
        height: 250px;
        margin-left: 20px;
        padding: 1ex 1em 1ex 35px
    }

    .liimg {
        top: 5px;
        left: -20px;
        width: 12px;
        height: 12px;
        background: #196ca3;
        position: absolute;
    }

    .browtable > li {
        position: relative;
        list-style-type: none;
        margin: 0.5ex 0em;
        padding: 0px;
    }

    .browtable > li > ul {
        display: flex;
        padding: 0;
        min-width: ;
    }

    .browtable > li > ul > li {
        display: inline-block;
        list-style-type: none;
        margin: 0ex 0.5em 0ex 0em;
        text-decoration: none;
        padding: 0px;
    }

    .browtable > li > header {
        font-weight: 700;
        border: none;
        margin: 0px;
        padding: 0px;
        display: flex;
        min-height: 27px;
    }

    .router-link-text {
        text-decoration: none;
        color: #606266;
        font-size: 14px;
    }
</style>
