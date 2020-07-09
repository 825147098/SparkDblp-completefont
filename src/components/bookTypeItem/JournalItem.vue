<template>
    <el-container class="con">
        <div class="box">
            <div></div>
        </div>
        <div class="articelButton">
            <el-link :href=jourData.ee[0]._VALUE style="padding-right: 20px" :underline="false"
                     v-if="jourData.ee != null">
                <el-button circle icon="el-icon-document" size="mini"></el-button>
            </el-link>
            <el-tooltip v-else content="sorry,无链接" placement="bottom-end">
                <el-button circle icon="el-icon-document" size="mini" disabled
                           style="margin-right: 20px"></el-button>
            </el-tooltip>
        </div>
        <cite class="data">
            <span v-for="authors in jourData.author" :key="authors._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                                {{authors._VALUE}}
                            </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="jourData.author.indexOf(authors) < jourData.author.length - 1">,</span>
            </span>
            :<br>
            <span class="title">{{jourData.title}}</span>
            <!--类型划分加链接-->
            <el-link class="nameVolume name" v-show="showNameVolme">
                <span class="name">
                    {{jourData.journal}}
                </span>
                <span class="name">
                    {{jourData.volume}}
                </span>
            </el-link>
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

        methods: {},

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
    .con {
        /*width: 850px;*/
        /*border: solid 2px #42b983;*/
    }

    .box {
        display: table-cell;
        padding: 0px 2px;
    }

    .box > div {
        width: 12px;
        height: 12px;
        margin: 7px;
        background-color: #c32b72;
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

    .nameVolume {
        display: inline;
    }

</style>
