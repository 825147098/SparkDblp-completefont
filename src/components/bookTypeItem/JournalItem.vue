<template>
    <el-container class="con">
<!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Journal Articles"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
<!--        文章链接-->
        <div class="linkButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="jourData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in jourData.ee" :key="item._VALUE">
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
            <span v-if="jourData.author != null">
            <span v-for="authors in jourData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                <p class="mark" v-html="getMatch(authors._VALUE)">{{authors._VALUE}}</p>
                    <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                                v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                    <span v-if="jourData.author.indexOf(authors) < jourData.author.length - 1">,</span>
                </router-link>

            </span>
            :<br>
            </span>
            <span class="title">
                <p class="mark" v-html="getMatch(jourData.title)">
                    {{jourData.title}}
                </p>
            </span>
            <!--类型划分加链接-->
            <span class="nameVolume name" v-show="showNameVolme">
                <span class="name">
                    <p class="mark" v-html="getMatch(jourData.journal)">
                    {{jourData.journal}}
                </p>
                </span>
                <span class="name">
                    {{jourData.volume}}
                </span>
            </span>
            <span class="name" v-if="jourData.pages != null">
                {{jourData.pages}}
            </span>
            (<span class="name">{{jourData.year}}</span>)
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "JournalItem",

        data: function () {
            return {
                jourData:
                    {
                        "_key": "journals/ijon/CroonONI13",
                        "prefix": null,
                        "_publtype": null,
                        "author": [
                            {
                                "_VALUE": "G. C. H. E. de Croon",
                                "_orcid": null,
                                "_aux": null
                            },
                            {
                                "_VALUE": "L. M. O'Connor",
                                "_orcid": null,
                                "_aux": null
                            },
                            {
                                "_VALUE": "C. Nicol",
                                "_orcid": null,
                                "_aux": null
                            },
                            {
                                "_VALUE": "Dario Izzo",
                                "_orcid": "0000-0002-9846-8423",
                                "_aux": null
                            }
                        ],
                        "booktitle": null,
                        "cite": null,
                        "crossref": null,
                        "editor": null,
                        "ee": [
                            {
                                "_VALUE": "https://doi.org/10.1016/j.neucom.2013.05.028",
                                "_type": null
                            }
                        ],
                        "journal": "Neurocomputing",
                        "month": null,
                        "publisherList": null,
                        "title": "Evolutionary robotics approach to odor source localization.",
                        "volume": "121",
                        "year": 2013,
                        "pages": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/articles/5f0494b2b073270c22fd2331"
                            },
                            "article": {
                                "href": "http://localhost:8080/articles/5f0494b2b073270c22fd2331"
                            }
                        }
                    },

                showNameVolme: true,
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
            'showFlag',
        ],

        created() {

        },

        mounted() {
            if (this.innerData != null)
                this.jourData = this.innerData;
            if (this.showFlag != null)
                this.showNameVolme = this.showFlag;

        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

    .box > div {
        width: 12px;
        height: 12px;
        margin: 7px;
        background-color: #c32b72;
    }

</style>
