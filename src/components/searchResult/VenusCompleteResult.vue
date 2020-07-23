<template>
    <el-main >
        <div>
<!--            面包头-->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/search' }">搜索</el-breadcrumb-item>
                <el-breadcrumb-item v-show="!loadFlag">{{publisher}}</el-breadcrumb-item>
            </el-breadcrumb>
<!--            标题-->
            <header class="head-hide">
                <h2>
                    {{title}}
                </h2>
            </header>
        </div>
<!--        <el-collapse v-model="activeName" accordion @change="changeFalg">-->
<!--            <el-collapse-item name="1">-->
        <ul v-show="dataFlag"
            class="putList"
        >
<!--            文章列表-->
            <li v-for="item in pubList" :key="item.title + item.type">
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
            </li>
        </ul>
<!--        加载图标-->
        <div v-show="loadFlag"
            class="putList">
            <div style="color: #409EFF">
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
    export default {
        name: "VenusCompleteResult",
        components: {
            ReferenceWorkItem,
            // PartInBookOrCollItem,
            JournalItem, InformalPubItem, EditorShipItem, ConfAndWorkItem, BookAndTheseItem
        },
        data: function () {
            return {
                crossref: '',

                loadFlag: true,
                dataFlag: false,

                publisher:'',
                title:'',

                pubList: [],
                waitList: [],

                flag: '-',
                activeName: '1',
            }
        },

        methods: {
            //获取数据
            getVenPubData() {
                this.loadFlag = true;
                this.dataFlag = false;
                axios.get(this.$store.state.host + "/onlyDocs/search/findAllByCrossref", {
                    params: {
                        crossref:this.crossref
                    }
                }).then(res => {
                    this.waitList = res.data._embedded.onlyDocs;

                    this.changeType();
                    this.pubList = this.waitList;
                    this.loadFlag = false;
                    this.dataFlag = true;

                    this.publisher = this.pubList[0].booktitle
                    // console.log(this.pubList)

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
        },
        //传入数据
        props:["cross","texttitle"],

        watch:{
            //数据更新
            cross:function () {
                this.crossref = this.cross;
                this.title = this.texttitle;
                this.getVenPubData()
            },

        },

        created() {
            this.crossref = this.cross;
            this.title = this.texttitle;
            this.getVenPubData()
        }
    }
</script>

<style scoped>
    .infoMatch {
        margin: 1ex 0 1ex 24px;
        padding: 0;
        text-align: left;
    }

    .putList {
        margin: 3ex 0 1ex;
        padding: 0;
    }

    .putList > li {
        text-decoration: none;
        display: table;
        margin: 0 0 1ex;
        padding: 0;
    }

    .breadClass {
        padding: 0 20px;
    }

    .head-hide {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0 16px 0 24px;
        text-align: left;
        margin: 20px 0 0 0;
    }
    .head-hide>h2{
        display: inline;
        font-size: 1em;
        font-weight: 700;
        border-bottom: none;
        padding: 0;
        margin: 0;
    }
</style>
