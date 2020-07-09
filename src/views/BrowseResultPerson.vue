<template>
    <el-container>
        <el-header class="header">
            <h1 class="headline">计算机科学 作者与出版人</h1>
        </el-header>
        <el-main>
            <div class="namePrefixCon">
                <span>跳转到姓氏前缀为&nbsp;：</span>
                <el-select
                        v-model="nameValue"
                        filterable
                        size="mini"
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                    <el-option

                            v-for="item in nameOption"
                            :key="item.id"
                            :value="item._VALUE">
                    </el-option>
                </el-select>
            </div>
            <div class="buttonGrop">
                <el-button type="text"
                           @click="getPreData"
                           :disabled="preButton">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;前30条数据&nbsp;]
                </el-button>
                <el-button type="text"
                           @click="getNextData"
                           :disabled="nextButton">
                    [&nbsp;后30条数据&nbsp;
                    <i class="el-icon-arrow-right"></i>
                </el-button>
            </div>
            <header class="head-hide">
                <h3 v-if="authorNameList[0]._VALUE != null">结果按照姓氏排序,从"{{authorNameList[0]._VALUE}}"开始</h3>
            </header>
            <div>
                <ul>
                    <li v-for="item in authorNameList" :key="item._VALUE">
                        {{item._VALUE}}
                    </li>
                </ul>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BrowseResultPerson",
        data: function () {
            return {
                namePrefix: 'A',
                authorNameList: [
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
                ],
                nameValue: "",
                nameList: [],
                nameOption: [],
                nowPage: 0,
                loading: false,

                preButton: true,
                nextButton: false,
            }
        },

        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.loading = false;
                    axios.get("http://192.168.3.5:8080/authorses/search/findTop10By_VALUEStartingWith", {
                        params: {
                            prefix: query
                        }
                    }).then(res => {
                        this.nameList = res.data;
                        this.nameOption = this.nameList.filter(item => {
                            return item._VALUE.toLowerCase();
                        });
                        console.log(this.nameOption)
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },

            getAuthorData() {
                axios.get("http://192.168.3.5:8080/authorses", {
                    page: this.nowPage,
                    size: "300",
                    sort: this.namePrefix
                }).then(res => {
                    this.authorNameList = res.data._embedded.authorses;
                    console.log(this.authorNameList)
                }).catch(error => {
                    console.log(error);
                })
            },

            getPreData(){
                if(this.nowPage > 0){
                    this.nowPage --;
                    axios.get("http://192.168.3.5:8080/authorses",{
                        page:this.nowPage,
                        size:300
                    }).then(res => {
                        this.authorNameList = res.data._embedded.authorses;
                        console.log(this.authorNameList)
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },

            getNextData(){
                this.nowPage ++;
                console.log(this.nowPage);
                axios.get("http://192.168.3.5:8080/authorses",{
                    page:this.nowPage,
                    size:300,
                    sort: this.namePrefix
                }).then(res => {
                    this.authorNameList = res.data._embedded.authorses;
                    console.log(res.data)
                }).catch(error => {
                    console.log(error);
                })
            }

        },

        watch: {
            nowPage: function () {
                if (this.nowPage > 0) {
                    this.preButton = false;
                } else {
                    this.preButton = true;
                }
            }
        },

        mounted() {


        },

        created() {
            this.namePrefix = this.$route.query.prefix;

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
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
    }

    .namePrefixCon {
        display: inline;
        display: flex;
        margin: 0px 0px 0px 0px;
        padding: 0px 0px 20px 20px;
    }

    .drop-down-con > ul {
        padding: 0 0 0 15px;
        float: left;
    }

    .buttonGrop {
        text-align: left;
        margin-left: 20px;
        color: #606266;
    }

    .head-hide {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 0;
        text-align: left;
    }

    .head-hide > h3 {
        margin: 0;
    }
</style>
