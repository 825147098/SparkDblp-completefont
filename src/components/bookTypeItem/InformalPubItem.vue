<template>
    <el-container>
        <!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Informal and Other Publications"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
        <!--        链接按钮-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="inforData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in inforData.ee" :key="item._VALUE">
                        <el-link
                                target="_blank"
                                :href="item._VALUE">
                            <i class="el-icon-link"></i>
                            链接{{index + 1}}
                        </el-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-tooltip v-else content="sorry,无链接" placement="bottom-end">
                <el-button circle icon="el-icon-document" size="mini" disabled
                           style="margin-right: 20px"></el-button>
            </el-tooltip>
        </div>
        <cite class="data">
            <!--            作者-->
            <span v-for="authors in inforData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                {{authors._VALUE}}
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="inforData.author.indexOf(authors) < inforData.author.length - 1">,</span>
            </span>
            :<br>
            <!--            标题-->
            <span class="title">{{inforData.title}}</span>
            <!--            链接要补-->
            <el-link class="name">
                <span>
                    {{inforData.journal}}
                </span>
                <span>
                    {{inforData.volume}}
                </span>
            </el-link>
            <span class="name">&nbsp;({{inforData.year}})</span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "InformalPubItem",

        data:function () {
            return{
                inforData:{
                    "_id": "5f049504b073270c2204c5ec",
                    "_key": "journals/corr/abs-2001-00062",
                    "prefix1": "journals/",
                    "prefix2": "journals/corr/",
                    "author": [
                        {
                            "_VALUE": "Hiba Arnout",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Johannes Kehrer",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Johanna Bronner",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Thomas A. Runkler",
                            "_orcid": null,
                            "_aux": null
                        }
                    ],
                    "ee": [
                        {
                            "_VALUE": "http://arxiv.org/abs/2001.00062",
                            "_type": "oa"
                        }
                    ],
                    "title": "Visual Evaluation of Generative Adversarial Networks for Time Series Data.",
                    "year": 2020,
                    "month": null,
                    "_publtype": "informal",
                    "booktitle": null,
                    "crossref": null,
                    "editor": null,
                    "journal": "CoRR",
                    "pages": null,
                    "publisher": null,
                    "volume": "abs/2001.00062"
                },
            }
        },

        methods: {},

        props: [
            'innerData',
        ],

        created() {

        },

        mounted() {
            if (this.innerData != null)
                this.inforData = this.innerData;
        }
    }
</script>

<style scoped>
    .box {
        display: table-cell;
        padding: 0 2px;
    }

    .box > div {
        width: 12px;
        height: 12px;
        margin: 7px;
        background-color: #606b70;
    }

    .articelButton {
        display: table-cell;
    }

    .title {
        color: #666666;
        font-weight: 700;
    }

    .name {
        color: #7d848a;
        text-decoration: none;
    }

    .data {
        display: table-cell;
        font: inherit;
        padding: 0 2px;
        max-width: 800px;
        text-align: left;
    }

</style>
