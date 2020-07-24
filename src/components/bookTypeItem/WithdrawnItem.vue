<template>
    <el-container>
        <!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Withdrawn Items"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
        <!--        链接-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="withDrawnData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in withDrawnData.ee" :key="item._VALUE">
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
            <!--类型划分加链接-->
            <span class="title">
                (Withdrawn)
            </span>
            <span class="name">
                <p class="mark" v-html="getMatch(withDrawnData.title)">
                    {{withDrawnData.title}}
                </p>
             </span>
            <span class=" name" >
                <span class="name">
                    <p class="mark" v-html="getMatch(withDrawnData.journal)">
                    {{withDrawnData.journal}}
                </p>
                </span>
                <span class="name">
                    {{withDrawnData.volume}}
                </span>
            </span>
            (<span class="name">{{withDrawnData.year}}</span>)
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "WithdrawnItem",

        data: function () {
            return {
                withDrawnData: {
                    author: null,
                    authorOption: null,
                    booktitle: null,
                    cdrom: null,
                    chapter: null,
                    crossref: null,
                    editor: null,
                    ee:
                        {
                            _VALUE: "https://doi.org/10.1007/s11042-018-5645-x",
                            _type: null,
                        },
                    isbn: null,
                    journal: "Multim. Tools Appl.",
                    month: null,
                    number: "13-14",
                    pages: "9699",
                    prefix1: "journals/",
                    prefix2: "journals/mta/",
                    prefix2Option: "journals/mta/",
                    publisher: null,
                    school: null,
                    series: null,
                    title: "Data acquisition ad hoc network system based on wireless sensor.",
                    type: "withdrawn",
                    typeOption: "withdrawn",
                    type_xml: "article",
                    volume: "79",
                    year: 2020,
                    yearOption: 2020,
                    _id: "5f0d1c5771995e558f55ec54",
                    _key: "journals/mta/LuY20",
                    _publtype: "withdrawn",
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
                this.withDrawnData = this.innerData;
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
        background: #ebebeb;
        border: 1px #cccccc solid;
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

    .mark {
        display: inline;
    }
</style>
