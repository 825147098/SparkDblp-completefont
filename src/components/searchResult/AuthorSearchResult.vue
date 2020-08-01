<!--作者搜索结果-->
<template>
    <el-main >
        <div v-show="webPage">
<!--            面包头-->
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
        </div>
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1" v-if="webPage">
                <div class="body">
                    <p v-show="warnflag" class="warning">
                        超过300条匹配项,请优化搜索语句
                    </p>
                    <p v-show="luckflag">幸运匹配项</p>
                    <!--                        随机列表-->
                    <ul v-if="luckflag">
                        <li v-for="luckly in luckList" :key="luckly._VALUE">
                            <el-button type="text"  size="mini">
                                <router-link :to="{path:'/resAut',query:{autName:luckly._VALUE}}"
                                             class="name">
                                    <p class="mark" v-html="getMatch(luckly._VALUE)">{{getMatch(luckly._VALUE)}}</p>
                                </router-link>
                                <el-tooltip class="item" effect="dark" :content=luckly._orcid placement="bottom-end"
                                            v-if="luckly._orcid != null">
                                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                              style="padding-left:0.25em;" alt=""></el-image>
                                </el-tooltip>
                            </el-button>
                        </li>
                    </ul>
<!--                    结果提示-->
                    <p v-if="totalElements > 300 && !loadFlag">前300条匹配项</p>
                    <p v-else-if="totalElements > 0 && !loadFlag">所有{{totalElements}}条匹配项</p>
                    <p v-else v-show="!loadFlag">无匹配项</p>
<!--                    结果列表-->
                    <ul v-if="!loadFlag && totalElements > 0">
                        <li v-for="author in authorList" :key="author._VALUE">
                            <el-button type="text"  size="mini">
                                <router-link :to="{path:'/resAut',query:{autName:author._VALUE}}"
                                             class="name">
                                    <p  class="mark" v-html="getMatch(author._VALUE)">{{getMatch(author._VALUE)}}</p>
                                </router-link>
                                <el-tooltip class="item" effect="dark" :content=author._orcid placement="bottom-end"
                                            v-if="author._orcid != null">
                                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                              style="padding-left:0.25em;" alt=""></el-image>
                                </el-tooltip>
                            </el-button>
                        </li>
                        <p v-if="totalElements > 300">忽略{{totalElements - 300}}条匹配项</p>
                    </ul>
                    <ul v-show="loadFlag"
                        class="putList">
                        <li style="color: #409EFF">
                            Loading
                            <el-icon class="el-icon-loading"
                                     style="font-size: 20px "
                            ></el-icon>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
<!--            组合搜索显示列表-->
            <el-collapse-item name="1" v-else>
                <template slot="title">
                    [{{flag}}] 作者搜索结果
                </template>
                <div class="body">
<!--                    幸运匹配列表-->
                    <ul v-if="luckflag">
                        <li v-for="luckly in luckList" :key="luckly._VALUE">
                            <el-button type="text"  size="mini">
                                <router-link :to="{path:'/resAut',query:{autName:luckly._VALUE}}"
                                             class="name">
                                    <p class="mark" v-html="getMatch(luckly._VALUE)">{{getMatch(luckly._VALUE)}}</p>
                                </router-link>
                                <el-tooltip class="item" effect="dark" :content=luckly._orcid placement="bottom-end"
                                            v-if="luckly._orcid != null">
                                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                              style="padding-left:0.25em;" alt=""></el-image>
                                </el-tooltip>
                            </el-button>
                        </li>
                        <li v-show="!loadFlag && luckflag">
                            <router-link :to="{path:'/search/author',query:{autName:searchName}}" class="name">
                                <el-button size="small" type="text">
                                    显示所有{{totalElements}}条匹配项
                                </el-button>
                            </router-link>
                        </li>
                    </ul>
<!--                    数量少显示全部结果-->
                    <ul v-if="authorList.length <= 6 && !loadFlag">
                        <li v-for="author in authorList" :key="author._VALUE">
                            <el-button type="text"  size="mini">
                                <router-link :to="{path:'/resAut',query:{autName:author._VALUE}}"
                                             class="name">
                                    <p  class="mark" v-html="getMatch(author._VALUE)">{{getMatch(author._VALUE)}}</p>
                                </router-link>
                                <el-tooltip class="item" effect="dark" :content=author._orcid placement="bottom-end"
                                            v-if="author._orcid != null">
                                    <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                              style="padding-left:0.25em;" alt=""></el-image>
                                </el-tooltip>
                            </el-button>
                        </li>
                    </ul>
<!--                    加载图标-->
                    <ul v-show="loadFlag"
                        class="putList">
                        <li style="color: #409EFF">
                            Loading
                            <el-icon class="el-icon-loading"
                                     style="font-size: 20px "
                            ></el-icon>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
        </el-collapse>
    </el-main>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "AuthorSearchResult",
        data: function () {
            return {
                loadFlag:false,

                activeName: '1',
                flag: '-',
                warnflag: false,
                //搜索信息
                searchName: '',
                listSize: 300,

                totalElements:"",
                //幸运列表
                luckList: [],
                luckflag: false,

                authorList: [],

                webPage:false,


            }
        },

        methods: {
            //修改手风琴标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
                // console.log(this.flag)
            },

            //获取作者数据
            getAuthorData() {
                this.loadFlag = true;
                this.warnflag = false
                this.luckflag = false;
                this.luckList = []
                axios.get(this.$store.state.host + "/authorses/search/findAllBy_VALUEContainingIgnoreCase", {
                    params: {
                        author: this.searchName,
                        size: this.listSize,
                    }
                }).then(res => {
                    this.authorList = res.data._embedded.authorses;
                    this.totalElements = res.data.page.totalElements;
                    if(this.totalElements >= 20 || (this.totalElements > 6 && !this.webPage))
                        this.getLuckly();
                    if(this.totalElements > 300)
                        this.warnflag = true;
                    this.loadFlag = false;

                    this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error);
                })
            },
            //筛选幸运列表
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
            //匹配标记
            getMatch(val) {
                let str = this.searchName;

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

        props:{
          searchAuthor: Boolean,
        },

        watch: {
            //监控搜索栏
            // '$store.state.serchObj.title': function () {
            //     if((this.$store.state.radioLabel === 1  || !this.webPage)&& this.$store.state.serchObj.title != '' ){
            //         this.searchName = this.$store.state.serchObj.title;
            //         this.getAuthorData();
            //         console.log("a3")
            //     }
            // },
            //监控搜索标记
            "$store.state.serchObj.conflag": function () {
                if (this.$store.state.serchObj.conflag) {
                    if(this.searchName != this.$store.state.serchObj.title){
                        this.searchName = this.$store.state.serchObj.title;
                        this.getAuthorData();
                    }
                    // console.log("a2")
                }
            },
            //通知组合搜索是否显示
            totalElements:function () {
                if(this.totalElements > 0){
                    this.$store.commit("incrementSetSerchAut")
                } else {
                    this.$store.commit("incrementCleanSerchAut")
                }
            }


        },

        mounted() {
            if (this.$route.query.autName != null) {
                this.searchName = this.$route.query.autName;
                // console.log(this.activeShow)
                this.activeShow = true;
            }
            if(this.activeShow){
                this.getAuthorData();
            }
        }
        ,

        created() {
            if(this.searchAuthor === true){
                this.webPage = true;
            }else {
                this.webPage = false;
            }
            if (this.$store.state.inputData != null) {
                this.searchName = this.$store.state.serchObj.title;
                this.activeShow = true;
            } else {
                this.activeShow = false;
            }

        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

</style>
