<template>
    <el-main style="padding: 0">
        <div class="refine-by">
            <p><b>
                按照{{name}}细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in authorList" :key="item._VALUE">
                    <i :class=item.img v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE}}({{item.num}})
                    </el-button>
                    <span v-show="item.show">✔</span>
                </li>
            </ul>
            <ul v-show="loadFlag">
                <li>
                    <el-icon class="el-icon-loading"></el-icon>
                </li>
            </ul>
            <ul v-show="!loadFlag">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreData"
                            class="authorButton"
                            size="samll">
                        <em>
                            {{sqlSize - authorList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "RefineByAuthor",

        data: function () {
            return {
                authorList: [],

                loadFlag: true,

                sqlSize: 300,

                testList: [
                    {
                        "_VALUE": "A. A. C. de Souza",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cc"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cc"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Davydov",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cd"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cd"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Kabanov",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2ce"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2ce"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. McKenzie",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cf"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2cf"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Perevalov",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d0"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d0"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. S. Zaghrout",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d1"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d1"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Sawant",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d2"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d2"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Smirnov",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d3"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d3"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. A. Sulaiman",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d4"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d4"
                            }
                        }
                    },
                    {
                        "_VALUE": "A. Allam",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d5"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2d5"
                            }
                        }
                    }
                ],

                numCount: 0,
            }
        },

        methods: {
            getAuthorData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.authorList = this.testList.map(function (item) {

                    return {
                        "_VALUE": item._VALUE,
                        "img": "el-icon-circle-plus",
                        "index": cont++,
                        "show": false,
                        "num":10
                    };
                });
                this.numCount = cont;
                this.loadFlag = false;
            },

            mouseEnter(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = true;
            },

            mouseLeave(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = false;
            },

            addAuthorToInput(index) {
                if (this.authorList[index].img === "el-icon-circle-plus") {
                    this.authorList[index].show = true;
                    this.authorList[index].img = "el-icon-remove"
                    this.$store.commit("incrementAuthor" ,{newAuthor: this.authorList[index]._VALUE})
                } else {
                    this.authorList[index].show = false;
                    this.authorList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanAuthor" ,{moveAuthor: this.authorList[index]._VALUE})
                }
                console.log(this.$store.state.authors)
            },

            getMoreData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.authorList = this.authorList.concat(this.testList.map(function (item) {
                        return {
                            "_VALUE": item._VALUE,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false
                        };
                    })
                );
                this.numCount = cont;
                this.loadFlag = false;
            }

        },

        props:[
            'name'
        ],
        watch: {},

        created() {
            this.getAuthorData();
        }
    }
</script>

<style scoped>
    .refine-by {
        margin: 0 0 2ex;
        font-size: smaller;
        text-align: left;
    }

    .refine-by > p {
        margin: 0;
        padding: 0;
    }

    .refine-by > ul {
        margin: 0;
        padding: 0;
    }

    .refine-by > ul > li {
        display: block;
        padding: 0 4px 0 0;
        margin: 0;
        text-decoration: none;
    }

    .authorButton {
        display: inline;
        overflow: visible;
        text-align: left;
        color: #7d848a;
        text-decoration: none;
        border: none;
        cursor: pointer;
        font-family: 'Open Sans', sans-serif;
        font-size: 1em;
        font-weight: 400;
        background-color: transparent;
        margin: 0px;
        padding: 0px;
    }
    .buttonSelect{
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>
