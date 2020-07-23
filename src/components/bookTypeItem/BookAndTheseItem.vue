<template>
    <el-container>
<!--        //颜色图标-->
        <div class="box">
            <el-tooltip class="item"
                        effect="dark"
                        content="Books And Theses"
                        placement="bottom-end">
                <div></div>
            </el-tooltip>
        </div>
<!--        链接按钮-->
        <div class="articelButton">
            <el-dropdown style="padding: 0 10px" :underline="false"
                         v-if="bookData.ee != null">
                    <span>
                       <el-button circle icon="el-icon-document" size="mini"></el-button>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in bookData.ee" :key="item._VALUE">
                        <el-link
                                target="_blank"
                                :href="item._VALUE">
                            <i class="el-icon-link"></i>
                            链接{{index + 1}}
                        </el-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
<!--            无链接提示-->
            <el-tooltip v-else content="sorry,无链接" placement="bottom-end">
                <el-button circle icon="el-icon-document" size="mini" disabled
                           style="margin-right: 20px"></el-button>
            </el-tooltip>
        </div>
<!--        主体数据-->
        <cite class="data">
            <span v-if="bookData.author != null">
            <span v-for="authors in bookData.author" :key="authors._VALUE" class="name">
<!--                人名精确搜索链接-->
                <router-link :to="{path:'/resAut',query:{autName:authors._VALUE}}"
                             class="name">
                               <p class="mark" v-html="getMatch(authors._VALUE)">{{authors._VALUE}}</p>
                </router-link>
                <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                            v-if="authors._orcid != null">
                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                              style="padding-left:0.25em;"></el-image>
                </el-tooltip>
<!--                人名分割-->
                <span v-if="bookData.author.indexOf(authors) < bookData.author.length - 1">,</span>
            </span>
            :<br>
            </span>
<!--            文章名-->
            <span class="title">
                <p class="mark" v-html="getMatch(bookData.title)">
                    {{bookData.title}}
                </p>
            </span>
            <!--类型划分加链接-->
<!--            出版学校-->
            <span class="name" v-for="item in bookData.school" :key="item">
                {{item}}
            </span>
<!--            出版人-->
            <span class="name" v-if="bookData.publisher != null">
                ,{{bookData.publisher._VALUE}}
            </span>
            <span class="name">{{bookData.year}}</span>
<!--            ISBN-->
            <span class="name" v-if="bookData.isbn != null">
                ,ISBN
                <span v-for="item in bookData.isbn" :key="item._VALUE">
                    {{item._VALUE}}
                     <span v-if="bookData.isbn.indexOf(item) < bookData.isbn.length - 1">,</span>
                </span>
            </span>
            <span class="name" v-if="bookData.isbn != null && bookData.pages != null">
                pp.&nbsp;
                <span v-for="page in bookData.pages" :key="page">
                    {{page}}
<!--                    <span v-if="bookData.pages.indexOf(page) < bookData.pages.length - 1">,</span>-->
                </span>
            </span>
        </cite><br>
    </el-container>
</template>

<script>
    export default {
        name: "BookAndTheseItem",

        data: function () {
            return {
                bookData: {
                    "_key": "phd/dnb/Knieke19",
                    "prefix1": "phd/",
                    "prefix2": "phd/dnb/",
                    "_publtype": "habil",
                    "author": [
                        {
                            "_VALUE": "Christoph Knieke",
                            "_orcid": null,
                            "_aux": null
                        }
                    ],
                    "booktitle": null,
                    "crossref": null,
                    "editor": null,
                    "ee": [
                        {
                            "_VALUE": "http://www.dr.hut-verlag.de/978-3-8439-4205-8.html",
                            "_type": null
                        },
                        {
                            "_VALUE": "https://nbn-resolving.org/urn:nbn:de:101:1-2019110122350057754631",
                            "_type": null
                        },
                        {
                            "_VALUE": "http://d-nb.info/1198542608",
                            "_type": null
                        }
                    ],
                    "isbn": [
                        {
                            "_VALUE": "978-3-658-28414-5",
                            "_type": null
                        },
                        {
                            "_VALUE": "978-3-658-28414-4",
                            "_type": null
                        }
                    ],
                    "month": null,
                    "pages":  [
                        "1-169","2-158"
                    ],
                    "publisher": {
                        "_VALUE": "Verlag Dr. Hut",
                        "_href": null
                    },
                    "school": [
                        "Clausthal University of Technology, Clausthal-Zellerfeld, Germany"
                    ],
                    "series": null,
                    "title": "Managed Evolution of Automotive Software Product Line Architectures.",
                    "volume": null,
                    "year": 2019,
                    "_links": {
                        "self": {
                            "href": "http://localhost:8080/books/5f0498b7b073270c224915ca"
                        },
                        "book": {
                            "href": "http://localhost:8080/books/5f0498b7b073270c224915ca"
                        }
                    }
                }
            }
        },

        methods: {
            //匹配标记
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
                this.bookData = this.innerData;
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
        background-color: #f8c91f;
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
