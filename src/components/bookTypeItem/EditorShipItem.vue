<template>
    <el-container>
        <!--        分辨图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="EditorShip"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
        <!--        链接按钮-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="editorData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in editorData.ee" :key="item._VALUE">
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
            <span v-for="editor in editorData.editor" :key="editor._VALUE" class="name">
                <router-link :to="{path:'/resAut',query:{autName:editor._VALUE}}"
                             class="name">
                                {{editor._VALUE}}
                </router-link>
                <el-tooltip class="item" effect="dark" :content=editor._orcid placement="bottom-end"
                            v-if="editor._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
                <span v-if="editorData.editor.indexOf(editor) < editorData.editor.length - 1">,</span>
            </span>
            :<br>
            <!--            标题-->
            <span class="title">{{editorData.title}}&nbsp;</span>
            <!--            链接要补-->
            <span v-if="editorData.series != null" class="name">
                <el-link :href="editorData.series._href">
                    {{editorData.series._VALUE}}
                </el-link>
            </span>
            <span class="name">,{{editorData.publisher._VALUE}}</span>
            <span class="name">&nbsp;{{editorData.year}}</span>
            <span class="name" v-if="editorData.isbn != null">
                ,ISBN
                <span v-for="item in editorData.isbn" :key="item._VALUE">
                    {{item._VALUE}}&nbsp;
                </span>
            </span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "EditorShipItem",

        data: function () {
            return {
                editorData: {
                    "_key": "series/lnsn/2018kkkd",
                    "prefix1": "series/",
                    "prefix2": "series/lnsn/",
                    "author": null,
                    "ee": [
                        {
                            "_VALUE": "https://doi.org/10.1007/978-3-319-78196-9",
                            "_type": null
                        },
                        {
                            "_VALUE": "https://www.wikidata.org/entity/Q53538348",
                            "_type": null
                        }
                    ],
                    "title": "Social Network Based Big Data Analysis and Applications.",
                    "year": 2018,
                    "month": null,
                    "_publtype": null,
                    "booktitle": null,
                    "crossref": null,
                    "editor": [
                        {
                            "_VALUE": "Mehmet Kaya",
                            "_orcid": null
                        },
                        {
                            "_VALUE": "Jalal Kawash",
                            "_orcid": null
                        },
                        {
                            "_VALUE": "Suheil Khoury",
                            "_orcid": null
                        },
                        {
                            "_VALUE": "Min-Yuh Day",
                            "_orcid": null
                        }
                    ],
                    "isbn": [
                        {
                            "_VALUE": "978-3-319-78195-2",
                            "_type": null
                        },
                        {
                            "_VALUE": "978-3-319-78196-9",
                            "_type": null
                        }
                    ],
                    "pages": null,
                    "publisher": {
                        "_VALUE": "Springer",
                        "_href": null
                    },
                    "school": null,
                    "series": {
                        "_VALUE": "Lecture Notes in Social Networks",
                        "_href": "db/series/lnsn/index.html"
                    },
                    "volume": null,
                    "_links": {
                        "self": {
                            "href": "http://localhost:8080/books/5f0498d4b073270c224923c0"
                        },
                        "book": {
                            "href": "http://localhost:8080/books/5f0498d4b073270c224923c0"
                        }
                    }
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
                this.editorData = this.innerData;
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
        background-color: #33c3ba;
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
