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
        <div class="linkButton">
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
            <span v-if="PartData.author != null">
            <span v-for="authors in PartData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             target="_blank"
                             class="name">
                                <p class="mark" v-html="getMatch(authors._VALUE)">{{authors._VALUE}}</p>
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="PartData.author.indexOf(authors) < PartData.author.length - 1">,</span>
            </span>
            :<br>
            </span>
            <!--            标题-->
            <span class="title">
                <p class="mark" v-html="getMatch(PartData.title)">
                    {{PartData.title}}
                </p>
             </span>
            <!--            链接要补-->
            <router-link class="name"
                         target="_blank"
                         :to="{path:'/resVen',query:{venName:PartData.title,cross:PartData.crossref,book:PartData.booktitle}}">>
                <span>
                     <p class="mark" v-html="getMatch(PartData.booktitle)">
                   {{PartData.booktitle}}
                     </p>
                </span>
                <span>&nbsp;{{PartData.year}}</span>
            </router-link>
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

        methods: {
            //标记匹配
            getMatch(val) {
                let str = this.$store.state.serchObj.title;

                let copyVal = val.toLowerCase();
                let copyStr = str.toLowerCase();

                let num = copyVal.indexOf(copyStr);

                if (num === -1) {
                    return val
                } else {
                    let or = val.substring(num, num + str.length)
                    // console.log(or + num)
                    let re = new RegExp(str, "gim")
                    return val.replace(re, "<mark style='background-color: #fff8c6'>" + or + "</mark>")
                }


            },
        },

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
    @import "../../style/public.css";
    .box > div {
        width: 12px;
        height: 12px;
        margin: 7px;
        background-color: #ef942d;
    }

</style>
