<template>
    <el-container>
        <!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Parts in Books or Collections"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
        <!--        链接按钮-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="PartData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in PartData.ee" :key="item._VALUE">
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
            <span v-for="authors in PartData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                {{authors._VALUE}}
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="PartData.author.indexOf(authors) < PartData.author.length - 1">,</span>
            </span>
            :<br>
            <!--            标题-->
            <span class="title">{{PartData.title}}</span>
            <!--            链接要补-->
            <el-link class="name">
                <span>{{PartData.booktitle}}</span>
                <span>&nbsp;{{PartData.year}}</span>
            </el-link>
            <span class="name">&nbsp;:{{PartData.pages}}</span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "PartInBookOrCollItem",

        data:function () {
            return{
                PartData:{
                    "_id": "5f049941b073270c2249d78a",
                    "_key": "books/sp/20/0003C20",
                    "prefix1": "books/",
                    "prefix2": "books/sp/",
                    "author": [
                        {
                            "_VALUE": "Feng Gao 0003",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Edward Curry",
                            "_orcid": null,
                            "_aux": null
                        }
                    ],
                    "ee": [
                        {
                            "_VALUE": "https://doi.org/10.1007/978-3-030-29665-0_11",
                            "_type": null
                        }
                    ],
                    "title": "Quality of Service-Aware Complex Event Service Composition in Real-time Linked Dataspaces.",
                    "year": 2020,
                    "month": null,
                    "_publtype": null,
                    "booktitle": "Real-time Linked Dataspaces",
                    "crossref": "books/sp/20/C2020",
                    "cdrom": null,
                    "chapter": null,
                    "number": null,
                    "pages": "169-190",
                    "publisher": null
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
                this.PartData = this.innerData;
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
        background-color: #ef942d;
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
