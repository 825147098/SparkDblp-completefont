<template>
    <!--    组合搜索结果-->
    <el-main style="padding-top: 0; max-width: 850px">
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1">
                <template slot="title" class="head-hide">
                    [{{flag}}] 出版物搜索结果
                </template>
                <p v-show="dataFlag"
                   class="infoMatch"
                >
                    匹配到{{pageDetail.totalElements}}条结果</p>
                <!--                出版物列表-->
                <ul v-show="dataFlag"
                    class="putList"
                    v-for="year in yearList" :key="year"
                >
                    <li class="year">{{year}}</li>
                    <li v-for="item in pubList[year]" :key="JSON.stringify(item)">
                        <BookAndTheseItem v-if="item.type == 'Book and Theses'"
                                          :inner-data="item"
                        ></BookAndTheseItem>
                        <ConfAndWorkItem v-else-if="item.type == 'Conference and Workshop Papers'"
                                         :inner-data="item"
                        ></ConfAndWorkItem>
                        <EditorShipItem v-else-if="item.type == 'Editorshop'"
                                        :inner-data="item"
                        ></EditorShipItem>
                        <InformalPubItem v-else-if="item.type == 'Informal Publications'"
                                         :inner-data="item"
                        ></InformalPubItem>
                        <PartInBookOrCollItem v-else-if="item.type == 'Parts in Books or Collections'"
                                              :inner-data="item"
                        ></PartInBookOrCollItem>
                        <JournalItem v-else-if="item.type == 'Journals Article'"
                                     :inner-data="item"
                        ></JournalItem>
                        <ReferenceWorkItem v-else-if="item.type == 'Reference Works'"
                                           :inner-data="item">
                        </ReferenceWorkItem>
                        <WithdrawnItem v-else-if="item.type == 'Withdrawn Item'"
                                       :inner-data="item">
                        </WithdrawnItem>
                    </li>
                </ul>
                <!--                加载图标-->
                <ul v-show="loadFlag"
                    class="putList">
                    <li style="color: #409EFF">
                        Loading
                        <el-icon class="el-icon-loading"
                                 style="font-size: 20px "
                        ></el-icon>
                    </li>
                </ul>
                <!--                加载按钮-->
                <ul v-show="!loadFlag && this.page < this.pageDetail.totalPages - 1"
                    class="putList">
                    <li style="width: 100%">
                        <el-button type="text" @click="load" style="float: left">
                            点击获取更多
                            <img src="https://dblp.uni-trier.de/img/waiting.anim.gif" alt="">
                        </el-button>
                        <div style="display: inline; float: right">
                            当前页码：{{page + 1}} / {{this.pageDetail.totalPages}}
                        </div>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </el-main>
</template>

<script>
    import axios from 'axios';
    import BookAndTheseItem from "../bookTypeItem/BookAndTheseItem";
    import ConfAndWorkItem from "../bookTypeItem/ConfAndWorkItem";
    import EditorShipItem from "../bookTypeItem/EditorShipItem";
    import InformalPubItem from "../bookTypeItem/InformalPubItem";
    import JournalItem from "../bookTypeItem/JournalItem";
    import ReferenceWorkItem from "../bookTypeItem/ReferenceWorkItem";
    import WithdrawnItem from "../bookTypeItem/WithdrawnItem";
    import PartInBookOrCollItem from "../bookTypeItem/PartInBookOrCollItem";

    export default {
        name: "CompleteResult",
        components: {
            WithdrawnItem,
            ReferenceWorkItem,
            PartInBookOrCollItem,
            JournalItem,
            InformalPubItem,
            EditorShipItem,
            ConfAndWorkItem,
            BookAndTheseItem
        },
        data: function () {
            return {
                title: 'hadoop',
                page: 0,
                size: '',
                pageDetail: {},

                flag: '-',
                activeName: '1',
                loadFlag: true,
                dataFlag: false,

                pubList: [],
                waitList: [],
                yearList: [],

                parmasObj: {},
                parmasFlag: false
            }
        },


        methods: {
            //false调用
            //获取数据，根据标题搜索不含筛选条件
            getPubData() {
                this.loadFlag = true;
                this.dataFlag = false;
                // this.setParams()
                axios.get(this.$store.state.host + "/onlyDocs/search/findAllByText", {
                    params: {
                        title: this.title,
                        page: this.page,
                    }
                }).then(res => {
                    this.waitList = res.data._embedded.onlyDocs;
                    this.pageDetail = res.data.page;

                    this.changeType();
                    this.pubSort()

                    this.loadFlag = false;
                    this.dataFlag = true;

                    this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error);
                })
            },
            //true调用
            //含筛选条件获取数据
            getFilPubData() {
                this.loadFlag = true;
                this.dataFlag = false;
                this.setParams();
                axios.get(this.$store.state.host + "/onlyDoc/findAllByTextReturnList", {
                    params: this.paramsObj
                }).then(res => {
                    this.waitList = res.data._embedded.onlyDocs;
                    this.pageDetail = res.data.page;
                    // console.log(res.data)

                    this.changeType();
                    this.pubSort()

                    this.loadFlag = false;
                    this.dataFlag = true;
                    // console.log(this.waitList)
                    this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error);
                })
            },
            //修改折叠板标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },
            //获得更多的加载函数
            load() {
                if (this.dataFlag) {
                    this.loadFlag = true;
                    setTimeout(() => {
                        this.page++;
                        if (this.page > this.pageDetail.totalPages) {
                            this.$alert('没有下一页了', '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `action: ${action}`
                                    });
                                }
                            });
                        }
                        this.checkFlag();
                        if(this.parmasFlag){
                            this.setParams();
                            axios.get(this.$store.state.host + "/onlyDoc/findAllByTextReturnList", {
                                params: this.paramsObj
                            }).then(res => {
                                this.waitList = this.waitList.concat(res.data._embedded.onlyDocs);


                                this.changeType();
                                this.pubSort()

                                this.loadFlag = false;
                                console.log(1)

                                // this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                                // this.$store.commit("incrementCleanInputFlag");
                            }).catch(error => {
                                console.log(error);
                            })
                        } else {
                            axios.get(this.$store.state.host + "/onlyDocs/search/findAllByText", {
                                params: {
                                    title: this.title,
                                    page: this.page
                                }
                            }).then(res => {
                                this.waitList = this.waitList.concat(res.data._embedded.onlyDocs);
                                this.changeType();
                                this.pubSort();
                                this.loadFlag = false;

                                // this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                                // this.$store.commit("incrementCleanInputFlag");
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                    }, 2000)
                }
            },
            //分组函数
            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },
            //按照年份分组
            groupBy() {
                if (this.pubList.length > 0) {
                    this.pubList.splice(0, this.pubList);
                }
                this.pubList = this.group_signal(this.waitList, "year");
                // console.log(this.pubList)
            },
            //年份提取排序
            sortYear() {
                if (this.yearList.length > 0) {
                    this.yearList.splice(0, this.yearList.length);
                }
                let yearArr = [];
                let length = this.waitList.length;
                for (let i = 0; i < length; i++) {
                    // console.log(this.waitList[i].type)
                    if (yearArr.indexOf(this.waitList[i].year) == -1) {
                        yearArr.push(this.waitList[i].year);
                    }
                }
                yearArr = yearArr.sort(function (a, b) {
                    return b - a;
                });
                this.yearList = yearArr;
                // console.log(this.yearList)
            },

            //类型转换处理
            changeType() {
                let len = this.waitList.length;
                for (let i = 0; i < len; i++) {
                    switch (this.waitList[i].type) {
                        case "inproceedings":
                            this.waitList[i].type = 'Conference and Workshop Papers';
                            break;
                        case "book and thesis":
                            this.waitList[i].type = 'Book and Theses';
                            break;
                        case 'series':
                            this.waitList[i].type = 'Book and Theses';
                            break;
                        case 'proceedings':
                            this.waitList[i].type = 'Editorshop';
                            break;
                        case "informal":
                            this.waitList[i].type = 'Informal Publications';
                            break;
                        case "incollection":
                            this.waitList[i].type = 'Parts in Books or Collections';
                            break;
                        case "journals article":
                            this.waitList[i].type = 'Journals Article';
                            break;
                        case  "reference":
                            this.waitList[i].type = 'Reference Works';
                            break;
                        case "withdrawn":
                            this.waitList[i].type = 'Withdrawn Item';
                            break;
                    }
                }
            },
            //数据拉取后分组
            pubSort() {
                this.groupBy();
                this.sortYear();
            },
            //设置过滤参数
            setParams() {
                this.paramsObj = {};
                {
                    if (this.$store.state.serchObj.title != '') {
                        this.paramsObj["title"] = this.$store.state.serchObj.title;
                    }
                    if (this.$store.state.serchObj.year != '') {
                        this.paramsObj["year"] = this.$store.state.serchObj.year;
                    }
                    if (this.$store.state.serchObj.venue != '') {
                        this.paramsObj["venue"] = this.$store.state.serchObj.venue;
                    }
                    if (this.$store.state.serchObj.authors.length > 0) {
                        let len = this.$store.state.serchObj.authors.length;
                        let author = this.$store.state.serchObj.authors[0];
                        for (let i = 1; i < len; i++) {
                            author += ',' + this.$store.state.serchObj.authors[i];
                        }
                        this.paramsObj["author"] = author;
                    }
                    if (this.$store.state.serchObj.type != '') {
                        this.paramsObj["type"] = this.$store.state.serchObj.type;
                    }
                    this.paramsObj["page"] = this.page
                }
            },
            //标记检测是否含有筛选条件
            checkFlag() {
                this.parmasFlag = false;
                if (this.$store.state.serchObj.type != '') {
                    this.parmasFlag = true;
                }
                if (this.$store.state.serchObj.year != '') {
                    this.parmasFlag = true;
                }
                if (this.$store.state.serchObj.venue != '') {
                    this.parmasFlag = true;
                }
                if (this.$store.state.serchObj.authors.length > 0) {
                    this.parmasFlag = true;
                }
            },


        },


        watch: {
            "$store.state.serchObj.conflag": function () {
                if (this.$store.state.serchObj.conflag) {
                    this.title = this.$store.state.serchObj.title
                    this.checkFlag();
                    this.page = 0
                    if (this.parmasFlag)
                        this.getFilPubData()
                    else
                        this.getPubData()
                    // this.$store.commit("incrementCleanFlag")
                }
            }
        },

        mounted() {
            this.title = this.$store.state.serchObj.title;
            this.checkFlag();
            if (this.parmasFlag)
                this.getFilPubData()
            else
                this.getPubData()
        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

    .year {
        font-size: small;
        font-weight: 800;
    }

</style>
