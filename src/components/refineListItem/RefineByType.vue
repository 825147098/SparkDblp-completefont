<template>
    <el-main style="padding: 0;">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照类型细化
            </b></p>
            <ul v-show="!loadFlag">
                <!--                列表类型显示//只显示返回数据类型-->
                <li v-for="(item,index) in typeList" :key="item.type">
                    <i :class=item.img
                       class="icon"
                       v-show="item.show"></i>
                    <el-tooltip class="item"
                                effect="dark"
                                :content="item.type"
                                placement="bottom-end">


                        <el-button type="text"
                                   size="small"
                                   @mouseenter.native="mouseEnter(index)"
                                   @mouseleave.native="mouseLeave(index)"
                                   @click="addAuthorToInput(index)"
                                   :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                            {{item._VALUE}}({{toThousands(item.num)}})
                            <span v-show="item.show">✔</span>
                        </el-button>
                    </el-tooltip>
                </li>
            </ul>
            <!--            加载图标-->
            <ul v-show="loadFlag">
                <li>
                    <el-icon class="el-icon-loading"
                             style="font-size: 20px "
                    ></el-icon>
                </li>
            </ul>
            <!--            null结果-->
            <ul v-show="typeList.length == 0 && !loadFlag"
                class="putList">
                <li>
                    结果为空
                </li>
            </ul>
        </div>
    </el-main>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "RefineByType",

        data: function () {
            return {
                typeList: [],

                loadFlag: true,

                sqlSize: 0,

                typeTestList: [],

                numCount: 0,

                paramsObj: {}
            }
        },

        methods: {
            //获取数据
            getTypeData() {
                this.loadFlag = true;
                this.setParams()
                axios.get(this.$store.state.host + "/onlyDoc/findAllByTitleMatchesTextTypeRefineList", {
                    params: this.paramsObj
                }).then(res => {
                    //数据清洗
                    this.typeTestList = res.data.map(function (item) {
                        // item.num = this.toThousands(item.num);
                        return {
                            "_VALUE": item.group,
                            "type": item.group,
                            "img": "el-icon-circle-plus",
                            "show": false,
                            "num": item.count
                        };
                    });
                    // console.log(res.data)
                    //类型映射
                    this.changeType()
                    //类型选中
                    for (let i = 0; i < this.typeTestList.length; i++) {
                        if (this.$store.state.serchObj.type === '')
                            break;
                        else {
                            if (this.$store.state.serchObj.type == this.typeTestList[i].type) {
                                this.typeTestList[i].show = true;
                                this.typeTestList[i].img = "el-icon-remove";
                            }
                        }
                    }

                    this.typeList = this.typeTestList
                    //结果全部数量
                    this.sqlSize = this.typeTestList.length
                    this.loadFlag = false;
                    //加载完成删除标记
                    this.$store.commit("incrementCleanFlag", {flag: "typeflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error)
                })
            },
            //鼠标移入
            mouseEnter(index) {
                if (this.typeList[index].img === "el-icon-circle-plus")
                    this.typeList[index].show = true;
            },
            //鼠标移出
            mouseLeave(index) {
                if (this.typeList[index].img === "el-icon-circle-plus")
                    this.typeList[index].show = false;
            },
            //选中函数
            addAuthorToInput(index) {
                if (this.typeList[index].img === "el-icon-circle-plus") {
                    this.typeList[index].show = true;
                    this.typeList[index].img = "el-icon-remove";
                    this.$store.commit("incrementType", {newType: this.typeList[index].type});
                } else {
                    this.typeList[index].show = false;
                    this.typeList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanType")
                }
                // console.log(this.$store.state.type)
            },
            //数量格式化
            toThousands(num) {
                num = (num || 0).toString();
                let result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
                return result;
            },
            //类型映射转换
            changeType() {
                let len = this.typeTestList.length;
                for (let i = 0; i < len; i++) {
                    switch (this.typeTestList[i]._VALUE) {
                        case "inproceedings":
                            this.typeTestList[i]._VALUE = 'Conference and Workshop Papers';
                            break;
                        case "book and thesis":
                            this.typeTestList[i]._VALUE = 'Book and Theses';
                            break;
                        case 'series':
                            this.typeTestList[i]._VALUE = 'Book and Theses';
                            break;
                        case 'proceedings':
                            this.typeTestList[i]._VALUE = 'Editorshop';
                            break;
                        case "informal":
                            this.typeTestList[i]._VALUE = 'Informal Publications';
                            break;
                        case "incollection":
                            this.typeTestList[i]._VALUE = 'Parts in Books or Collections';
                            break;
                        case "journals article":
                            this.typeTestList[i]._VALUE = 'Journals Article';
                            break;
                        case  "reference":
                            this.typeTestList[i]._VALUE = 'Reference Works';
                            break;
                        case "withdrawn":
                            this.typeTestList[i]._VALUE = 'Withdrawn Item';
                            break;
                    }
                }
            },
            //设置axios参数
            setParams() {
                this.paramsObj = {};
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
                // this.$store.commit("incrementCleanFlag")
            }

        },

        watch: {
            //标记监控
            '$store.state.serchObj.typeflag': function () {
                if (this.$store.state.serchObj.typeflag) {
                    this.getTypeData();
                    //     this.$store.commit("incrementCleanFlag")
                }
            }
        },

        created() {
            this.getTypeData();
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
        padding: 2px 4px 0 0;
        margin: 0;
        text-decoration: none;
        word-wrap: break-word;
        word-break: break-all;
    }

    .refine-by > ul > li > .icon {
        position: absolute;
        margin: 3px -15px;
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
        white-space: pre-line;
    }

    .buttonSelect {
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>

