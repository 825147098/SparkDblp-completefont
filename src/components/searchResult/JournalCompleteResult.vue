<template>
    <el-main>
        <div>
            <!--            面包头-->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/search' }">搜索</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!--        有Number标记-->
        <div v-if="dataFlag && this.numFlag">
            <div v-for="num in numList" :key="num"
            >
                <!--            标题-->
                <header class="head-hide">
                    <h3>
                        Volumne {{volume}}, Number {{num}}
                    </h3>
                </header>
                <ul v-show="dataFlag"
                    class="putList"
                >
                    <!--            文章列表-->
                    <li v-for="item in journalList[num]" :key="item.title + item.type">
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
            </div>
        </div>
        <div v-if="dataFlag && !this.numFlag">
            <header class="head-hide">
                <h3>
                    Volumne {{volume}}
                </h3>
            </header>
            <ul v-show="dataFlag"
                class="putList"
            >
                <!--            文章列表-->
                <li v-for="item in journalList" :key="item.title + item.type">
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
        </div>
        <!--        加载图标-->
        <div v-show="loadFlag"
             class="putList">
            <div class="resultLoad">
                Loading
                <el-icon class="el-icon-loading"
                         style="font-size: 20px "
                ></el-icon>
            </div>
        </div>
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
        name: "JournalCompleteResult",
        components: {
            WithdrawnItem,
            ReferenceWorkItem,
            PartInBookOrCollItem,
            JournalItem, InformalPubItem, EditorShipItem, ConfAndWorkItem, BookAndTheseItem
        },
        data: function () {
            return {
                prefix: '',

                loadFlag: true,
                dataFlag: false,
                numFlag: true,

                volume: '',
                title: '',

                journalList: [],
                waitList: [],
                numList: [],

                flag: '-',
                activeName: '1',
            }
        },

        methods: {
            //获取数据
            getJouData() {
                this.loadFlag = true;
                this.dataFlag = false;
                axios.get(this.$store.state.host + "/onlyDocs/search/findAllByPrefix2AndVolume", {
                    params: {
                        prefix2: this.prefix,
                        volume: this.volume
                    }
                }).then(res => {
                    this.waitList = res.data._embedded.onlyDocs;

                    this.changeType();
                    if (this.waitList[0].number != null){
                        this.numFlag = true;
                        this.groupByNum()
                    } else {
                        this.numFlag = false;
                        this.groupByPage()
                    }
                    this.loadFlag = false;
                    this.dataFlag = true;

                    // console.log(this.journalList)

                }).catch(error => {
                    console.log(error);
                })
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
                            this.waitList[i].type = 'Editorshop';
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
            //折叠面板标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },

            //分组函数
            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },
            //按照num分组
            groupByNum() {
                if (this.journalList.length > 0) {
                    this.journalList.splice(0, this.journalList);
                }
                this.journalList = this.group_signal(this.waitList, "number");
                // console.log(this.pubList)

                if (this.numList.length > 0) {
                    this.numList.splice(0, this.numList.length);
                }
                let numArr = [];
                let length = this.waitList.length;
                for (let i = 0; i < length; i++) {
                    // console.log(this.waitList[i].type)
                    if (numArr.indexOf(this.waitList[i].number) == -1) {
                        numArr.push(this.waitList[i].number);
                    }
                }
                numArr = numArr.sort(function (a, b) {
                    return a - b;
                });
                this.numList = numArr;

                for (let i = 0; i < numArr.length; i++) {
                    this.journalList[numArr[i]].sort(function (a, b) {
                        let pa = a.pages.split('-');
                        let pb = b.pages.split('-');
                        return pa[0] - pb[0];
                    })
                }
            },

            groupByPage() {
                this.journalList = this.waitList.sort(function (a, b) {
                    let pa = a.pages.split('-');
                    let pb = b.pages.split('-');
                    return pa[0] - pb[0];
                })
            }
        },
        //传入数据

        watch: {
            '$route.query.prefix': function () {
                if (this.$route.query.prefix != this.prefix) {
                    this.title = this.$route.query.jourName;
                    this.prefix = this.$route.query.prefix;
                    // console.log(this.$route.query.cross + " +" +this.crossref)
                    this.volume = this.$route.query.volume;
                    this.getJouData()
                } else {
                    this.$alert('提示', '已在当前页面', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }
            }

        },

        created() {
            if (this.$route.query.prefix != null) {
                this.title = this.$route.query.jourName;
                this.prefix = this.$route.query.prefix;
                this.volume = this.$route.query.volume;
                this.getJouData()
            }

        }
    }
</script>

<style scoped>

</style>
