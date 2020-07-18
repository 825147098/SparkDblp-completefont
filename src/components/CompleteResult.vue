<template>
    <el-main style="padding-top: 0; max-width: 850px">
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1">
                <template slot="title">
                    [{{flag}}] 搜索结果
                </template>
                <p v-show="dataFlag"
                   class="infoMatch"
                >
                    匹配到{{this.pageDetail.totalElements}}条结果</p>
                <ul v-show="dataFlag"
                    class="putList"
                    v-for="year in yearList" :key="year"
                >
                    <li class="year">{{year}}</li>
                    <li v-for="item in pubList[year]" :key="item.title">
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
                    </li>
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
                <ul v-show="!loadFlag"
                    class="putList">
                    <li>
                        <el-button type="text" @click="load">
                            点击获取更多
                            <img src="https://dblp.uni-trier.de/img/waiting.anim.gif" alt="">
                        </el-button>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </el-main>
</template>

<script>
    import axios from 'axios';
    import BookAndTheseItem from "./bookTypeItem/BookAndTheseItem";
    import ConfAndWorkItem from "./bookTypeItem/ConfAndWorkItem";
    import EditorShipItem from "./bookTypeItem/EditorShipItem";
    import InformalPubItem from "./bookTypeItem/InformalPubItem";
    import JournalItem from "./bookTypeItem/JournalItem";
    // import PartInBookOrCollItem from "./bookTypeItem/PartInBookOrCollItem";
    export default {
        name: "CompleteResult",
        components: {
            // PartInBookOrCollItem,
            JournalItem, InformalPubItem, EditorShipItem, ConfAndWorkItem, BookAndTheseItem
        },
        data: function () {
            return {
                title: 'hadoop',
                page: 0,
                size: '',
                pageDetail: '',

                flag: '-',
                activeName: '1',
                loadFlag: true,
                dataFlag: false,

                pubList: [],
                waitList: [],
                yearList: [],
            }
        },

        methods: {
            getPubData() {
                axios.get(this.$store.state.host + "/onlyDocs/search/findAllByTitleMatches", {
                    params: {
                        title: this.title,
                        page: this.page,
                    }
                }).then(res => {
                    this.waitList = res.data._embedded.onlyDocs;
                    this.pageDetail = res.data.page;
                    // this.waitList = testData.data().test
                    this.loadFlag = false;
                    this.dataFlag = true;
                    this.changeType();
                    this.pubSort()
                    // console.log(this.waitList);
                }).catch(error => {
                    console.log(error);
                })
            },

            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
            },

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
                        axios.get(this.$store.state.host + "/onlyDocs/search/findAllByTitleContainingIgnoreCase", {
                            params: {
                                title: this.title,
                                page: this.page
                            }
                        }).then(res => {
                            this.waitList = this.waitList.concat(res.data._embedded.onlyDocs);
                            this.pubSort();
                            this.loadFlag = false;
                            // console.log(this.waitList);
                        }).catch(error => {
                            console.log(error);
                        })
                    }, 2000)
                }
            },

            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },

            groupBy() {
                if (this.pubList.length > 0) {
                    this.pubList.splice(0, this.pubList);
                }
                this.pubList = this.group_signal(this.waitList, "year");
                // console.log(this.pubList)
            },

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
                            console.log(this.waitList[i]);
                            break;
                    }
                }
            },

            pubSort() {
                this.groupBy();
                this.sortYear();
            }
        },

        computed: {},

        watch: {
            // "$store.state.serchObj.flag":function () {
            //     if (this.$store.state.serchObj.flag){
            //         this.getPubData();
            //         this.$store.commit("incrementCleanFlag")
            //     }
            // }
        },

        mounted() {
            this.getPubData();
        }
    }
</script>

<style scoped>
    .infoMatch {
        margin: 1ex 0px 1ex 24px;
        padding: 0px;
        text-align: left;
    }

    .putList {
        margin: 1ex 0em 1ex;
        padding: 0px;
    }

    .putList > li {
        text-decoration: none;
        display: table;
        margin: 0ex 0em 1ex;
        padding: 0px;
    }

    putList > li.year {
        font-size: small;
        font-weight: 800;
    }
</style>
