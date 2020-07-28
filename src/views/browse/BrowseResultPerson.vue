<template>
    <el-container>
        <!--        标题-->
        <el-header class="header">
            <h1 class="headline">计算机科学 作者与出版人</h1>
        </el-header>
        <el-main style="background-color:aliceblue;">
            <!--            搜索选择栏-->
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
            <!--            前进后退按钮组-->
            <div class="buttonGrop">
                <el-button type="text"
                           @click="getPreData"
                           :disabled="preButton">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;前{{pageSize}}条数据&nbsp;]
                </el-button>
                <el-button type="text"
                           @click="getNextData"
                           :disabled="nextButton">
                    [&nbsp;后{{pageSize}}条数据&nbsp;
                    <i class="el-icon-arrow-right"></i>
                </el-button>
            </div>
            <header class="head-hide">
                <h3 v-if="authorNameList[0]._VALUE != null && !loadFlag">结果按照姓氏排序,从"{{authorNameList[0]._VALUE}}"开始</h3>
            </header>
            <!--            三个列表显示作者-->
            <div style="display: table-row" v-show="!loadFlag">
                <div class="nameList">
                    <ul v-show="showNameFlag0">
                        <li v-for="item in showNamelist0" :key="item._VALUE">
                            <router-link :to="{path:'/resAut',query:{autName:item._VALUE}}"
                                         class="router-link-text">
                                {{item._VALUE}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="nameList">
                    <ul v-show="showNameFlag1">
                        <li v-for="item in showNamelist1" :key="item._VALUE">
                            <router-link :to="{path:'/resAut',query:{autName:item._VALUE}}"
                                         class="router-link-text">
                                {{item._VALUE}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="nameList">
                    <ul v-show="showNameFlag2">
                        <li v-for="item in showNamelist2" :key="item._VALUE">
                            <router-link :to="{path:'/resAut',query:{autName:item._VALUE}}"
                                         class="router-link-text">
                                {{item._VALUE}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="loadFlag"
                 class="putList">
                <div style="color: #409EFF">
                    Loading
                    <el-icon class="el-icon-loading"
                             style="font-size: 20px "
                    ></el-icon>
                </div>
            </div>
            <div class="buttonGrop">
                <el-button type="text"
                           @click="getPreData"
                           :disabled="preButton">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;前{{pageSize}}条数据&nbsp;]
                </el-button>
                <el-button type="text"
                           @click="getNextData"
                           :disabled="nextButton">
                    [&nbsp;后{{pageSize}}条数据&nbsp;
                    <i class="el-icon-arrow-right"></i>
                </el-button>
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
                namePrefix: 'A',//作者名参数

                pageSize: 300,//页面作者数量


                loadFlag:true,

                authorNameList: [//列表格式
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
                nameValue: "",//选择器绑定值
                nameList: [],//选择器返回值列表
                nameOption: [],//选择器参数
                nowPage: 0,//当前页码
                loading: false,
                //按钮组v-show值
                preButton: true,
                nextButton: false,
                //显示列表和v-show值
                showNamelist0: [],
                showNamelist1: [],
                showNamelist2: [],

                showNameFlag0: false,
                showNameFlag1: false,
                showNameFlag2: false,
            }
        },

        methods: {
            //选择器拉取选项
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    axios.get(this.$store.state.host + "/authorses/search/findBy_VALUEStartingWith", {
                        params: {
                            prefix: query,
                            size: 10
                        }
                    }).then(res => {
                        this.nameList = res.data._embedded.authorses;
                        // console.log(res.data)
                        this.nameOption = this.nameList.filter(item => {
                            return item._VALUE.substring(0, 1).toLocaleLowerCase();
                        });
                        this.loading = false;
                        // console.log(this.nameOption)
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            //获取作者列表
            getAuthorData() {
                this.loadFlag = true;
                this.nextButton = true
                axios.get(this.$store.state.host + "/authorses/search/findAllBy_VALUEContainingIgnoreCase", {
                    params: {
                        author: this.namePrefix,
                        page: this.nowPage,
                        size: this.pageSize,
                    }
                }).then(res => {
                    this.authorNameList = res.data._embedded.authorses;
                    this.dividerList();
                    this.loadFlag = false
                    this.nextButton = false
                }).catch(error => {
                    console.log(error);
                })
            },
            //上一页按钮函数
            getPreData() {
                if (this.nowPage > 0) {
                    this.nowPage--;
                    this.getAuthorData();
                }
            },
            //下一页按钮函数
            getNextData() {
                this.nowPage++;
                console.log(this.nowPage);
                this.getAuthorData();
            },
            //对返回的列表进行拆分
            dividerList() {
                let length = this.authorNameList.length;
                if (length <= 100) {
                    this.showNamelist0 = this.authorNameList;
                    this.showNameFlag0 = true;

                    if (this.showNamelist1.length > 0) {
                        this.showNamelist1.splice(0, this.showNamelist1);
                        this.showNameFlag1 = false;
                    }
                    if (this.showNamelist2.length > 0) {
                        this.showNamelist2.splice(0, this.showNamelist1);
                        this.showNameFlag2 = false;
                    }
                } else if (length <= 200) {
                    this.showNamelist0 = this.authorNameList.slice(0, 99);
                    this.showNameFlag0 = true;
                    this.showNamelist1 = this.authorNameList.slice(100, length);
                    this.showNameFlag1 = true;

                    if (this.showNamelist2.length > 0) {
                        this.showNamelist2.splice(0, this.showNamelist1);
                        this.showNameFlag2 = false;
                    }
                } else {
                    this.showNamelist0 = this.authorNameList.slice(0, 99);
                    this.showNameFlag0 = true;
                    this.showNamelist1 = this.authorNameList.slice(100, 199);
                    this.showNameFlag1 = true;
                    this.showNamelist2 = this.authorNameList.slice(200, length);
                    this.showNameFlag2 = true;
                }
            }

        },
        //监视器
        watch: {
            nowPage: function () {
                if (this.nowPage > 0) {
                    this.preButton = false;
                } else {
                    this.preButton = true;
                }
            },
            nameValue: function () {
                this.namePrefix = this.nameValue;
                this.getAuthorData();
            }
        },

        mounted() {
            this.getAuthorData();

        },

        created() {
            //接收路由跳转参数
            if (this.$route.query.prefix != null) {
                this.namePrefix = this.$route.query.prefix;
            }

        }
    }
</script>

<style scoped>
    @import "../../style/public.css";


    .drop-down-con > ul {
        padding: 0 0 0 15px;
        float: left;
    }


    .head-hide > h3 {
        margin: 0;
    }


    .router-link-text {
        text-decoration: none;
        color: #606266;
        font-size: 14px;
    }
</style>
