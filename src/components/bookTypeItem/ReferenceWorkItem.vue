<template>
    <el-container>
<!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Reference Works"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
<!--        链接-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="referData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in referData.ee" :key="item._VALUE">
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
            <span v-if="referData.author != null">
                <span v-for="authors in referData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                {{authors._VALUE}}
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="referData.author.indexOf(authors) < referData.author.length - 1">,</span>
            </span>
            :<br>
            </span>
            <!--类型划分加链接-->
            <span class="title">
                <p class="mark" v-html="getMatch(referData.title)">
                    {{referData.title}}
                </p>
             </span>
            <span class="title">
                <p class="mark" v-html="getMatch(referData.booktitle)">
                    {{referData.booktitle}}
                </p>
             </span>
            <span class="name" v-if="referData.pages != null">:{{referData.pages}}</span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "ReferenceWorkItem",

        data: function () {
            return {
                referData: {
                    author: [{
                        _VALUE: "Mohamed A. Soliman",
                        _aux: null,
                        _orcid: null,
                    }],
                    booktitle: "Encyclopedia of Big Data Technologies",
                    cdrom: null,
                    chapter: null,
                    crossref: "reference/bdt/2019",
                    editor: null,
                    ee: [{
                        _VALUE: "https://doi.org/10.1007/978-3-319-63962-8_323-1",
                        _type: null,
                    }],
                    isbn: null,
                    journal: null,
                    month: null,
                    number: null,
                    pages: "2032-2036",
                    prefix1: "reference/",
                    prefix2: "reference/bdt/",
                    prefix2Option: "reference/bdt/",
                    publisher: null,
                    school: null,
                    series: null,
                    title: "Query Optimization Challenges for SQL-on-Hadoop.",
                    type: "reference",
                    typeOption: "reference",
                    type_xml: "incollection",
                    volume: null,
                    year: 2019,
                    yearOption: 2019,
                    _id: "5f0d1f4a71995e558f832b3a",
                    _key: "reference/bdt/Soliman19",
                    _publtype: "encyclopedia"
                }
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
                this.referData = this.innerData;
            // this.mapData()
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
        background-color: #96ad2c;
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
    .mark{
        display: inline;
    }
</style>
