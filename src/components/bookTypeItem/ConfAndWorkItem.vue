<template>
    <el-container>
        <!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Conference and Workshop Papers"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
        <!--        链接按钮-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="confAndWorkData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in confAndWorkData.ee" :key="item._VALUE">
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
            <span v-for="authors in confAndWorkData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                <p class="mark" v-html="getMatch(authors._VALUE)">{{authors._VALUE}}</p>
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="confAndWorkData.author.indexOf(authors) < confAndWorkData.author.length - 1">,</span>
            </span>
            :<br>
            <!--            标题-->
            <span class="title">
                <p class="mark" v-html="getMatch(confAndWorkData.title)">
                    {{confAndWorkData.title}}
                </p>
             </span>
            <!--            链接要补-->
            <el-link class="name">
                <p class="mark" v-html="getMatch(confAndWorkData.booktitle)">
                    {{confAndWorkData.booktitle}}
                </p>
            </el-link>
            <span class="name">&nbsp;{{confAndWorkData.year}}</span>
            <span class="name">:{{confAndWorkData.pages}}</span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "ConfAndWorkItem",

        data: function () {
            return {
                confAndWorkData: {
                    "_key": "conf/igarss/CzechMI16",
                    "prefix1": "conf/",
                    "prefix2": "conf/igarss/",
                    "author": [
                        {
                            "_VALUE": "Daniel Czech",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Amit Kumar Mishra",
                            "_orcid": null,
                            "_aux": null
                        },
                        {
                            "_VALUE": "Michael R. Inggs",
                            "_orcid": "0000-0003-2162-7710",
                            "_aux": null
                        }
                    ],
                    "ee": [
                        {
                            "_VALUE": "https://doi.org/10.1109/IGARSS.2016.7729071",
                            "_type": null
                        }
                    ],
                    "title": "Time domain classification of transient radio frequency interference.",
                    "year": 2016,
                    "month": null,
                    "_publtype": null,
                    "booktitle": "IGARSS",
                    "crossref": "conf/igarss/2016",
                    "editor": null,
                    "pages": "302-305",
                },
            }
        },

        methods: {
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
                this.confAndWorkData = this.innerData;
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
        background-color: #196ca3;
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
