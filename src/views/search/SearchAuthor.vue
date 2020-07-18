<template>
    <el-container >
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp For 作者</h1>
        </el-header>
        <el-main v-if="activeShow">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>搜索</el-breadcrumb-item>
            </el-breadcrumb>
            <header class="head-hide">
                <h3>
                    <el-button size="mini"
                               @click="changeFalg"
                               type="text">
                        [{{flag}}]
                    </el-button>
                    作者搜索结果
                </h3>
            </header>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <div class="body">
                        <p v-show="warnflag" class="warning">
                            超过300条匹配项,请优化搜索语句
                        </p>
                        <p v-show="luckflag">幸运匹配项</p>
<!--                        随机列表-->
                        <ul v-show="luckList">
                            <li v-for="luckly in luckList" :key="luckly._VALUE">
                                <el-button type="text"  size="mini">
                                    {{luckly._VALUE}}
                                    <el-tooltip class="item" effect="dark" :content=luckly._orcid placement="bottom-end"
                                                v-if="luckly._orcid != null">
                                        <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                                  style="padding-left:0.25em;" alt=""></el-image>
                                    </el-tooltip>
                                </el-button>
                            </li>
                        </ul>
                        <p v-if="totalElements > 300">前300条匹配项</p>
                        <p v-else>{{totalElements}}</p>
                        <ul >
                            <li v-for="author in authorList" :key="author._VALUE">
                                <el-button type="text"  size="mini">
                                    {{author._VALUE}}
                                    <el-tooltip class="item" effect="dark" :content=author._orcid placement="bottom-end"
                                                v-if="author._orcid != null">
                                        <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                                  style="padding-left:0.25em;" alt=""></el-image>
                                    </el-tooltip>
                                </el-button>
                            </li>
                            <p v-if="totalElements > 300">忽略{{totalElements - 300}}条匹配项</p>
                        </ul>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-main>
        <SearchRule v-else ></SearchRule>
    </el-container>
</template>

<script>
    import axios from "axios";
    import SearchRule from "./SearchRule";

    export default {
        name: "author",
        components: {SearchRule},
        data: function () {
            return {
                activeShow:false,

                activeName: '1',
                flag: '-',
                warnflag: false,
                //搜索信息
                searchName: 'Base',
                listSize: 300,

                totalElements:"",
                //幸运列表
                luckList: [
                    {
                        "_VALUE": "A. Habeeb",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2f7"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2f7"
                            }
                        }
                    },
                ],
                luckflag: false,

                authorList: [
                    {
                        "_VALUE": "A. Habeeb",
                        "_orcid": null,
                        "_aux": null,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2f7"
                            },
                            "authors": {
                                "href": "http://localhost:8080/authorses/5f04943ce27d337efceaa2f7"
                            }
                        }
                    },
                ],


            }
        },

        methods: {
            //修改手风琴标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },


            getAuthorData() {
                this.warnflag = this.luckflag = false;
                axios.get("http://192.168.3.5:8080/authorses/search/findAllBy_VALUEContainingIgnoreCase", {
                    params: {
                        author: this.searchName,
                        size: this.listSize,
                    }
                }).then(res => {
                    this.authorList = res.data._embedded.authorses;
                    this.totalElements = res.data.page.totalElements;
                    if(this.totalElements >= 20)
                        this.getLuckly();
                    if(this.totalElements > 300)
                        this.warnflag = true;
                }).catch(error => {
                    console.log(error);
                })
            },

            getLuckly() {
                let list = [];
                let length = this.authorList.length;
                for (let i = 0; i < 6; i++) {
                    let num = Math.floor(Math.random() * length);
                    if (list.indexOf(this.authorList[num]) == -1) {
                        list.push(this.authorList[num]);
                    }
                }
                this.luckList = list;
                this.luckflag = true;
                // console.log(this.lucklyList);
            },

        },

        watch: {
            //监视标记,手风琴标记为string格式
            flag: function () {
                switch (this.flag) {
                    case '+':
                        this.activeName = "0";
                        break;
                    case'-':
                        this.activeName = "1";
                        break;
                }
            },
            '$store.state.inputfalg': function (newValue) {
                if(this.$store.state.radioLabel === 1){
                    this.searchName = newValue;
                    this.getAuthorData();
                    this.activeShow = true;
                }
            }


        },

        mounted() {
            if(this.activeShow){
                this.getAuthorData();
            }
        }
        ,

        created() {
            if (this.$store.state.inputData != '') {
                this.searchName = this.$store.state.inputData;
                this.activeShow = true;
            } else {
                this.activeShow = false;
            }
        }
    }
</script>

<style scoped>
    .headline {
        position: relative;
        clear: both;
        background: #606b70;
        color: #ffffff;
        font-size: x-large;
        font-weight: 600;
        text-align: left;
        padding: 4px 24px;
        margin: auto;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
    }

    .breadClass {
        padding: 0 20px;
    }

    .head-hide {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 0;
        text-align: left;
        margin: 20px 0 0 0;
    }

    .warning {
        color: maroon;
        font-style: italic;
        text-align: left;
        margin-left: 24px;
    }

    .body {
        color: #505b62;
        font-family: 'Open Sans', sans-serif;
        font-size: 11pt;
        font-weight: 400;
        min-width: 768px;
        margin: 0px;
        padding: 0px;
    }
    .body>p{
        text-align: left;
        margin-left: 24px;
    }
    .body>ul>li{
        text-align: left;
    }
</style>
