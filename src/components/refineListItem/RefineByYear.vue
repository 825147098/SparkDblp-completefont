<template>
    <el-main style="padding: 0">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照时间（年）细化
            </b></p>
            <ul v-show="!loadFlag">
<!--                年份列表-->
                <li v-for="(item,index) in yearList" :key="item._VALUE">
                    <i :class=item.img
                       class="icon"
                       v-show="item.show"></i>
                    <el-button type="text"
                               size="small"

                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE}}({{toThousands(item.num)}})
                        <span v-show="item.show">✔</span>
                    </el-button>
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
<!--            获取更多按钮-->
            <ul v-show="!loadFlag && sqlSize - yearList.length > 0">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreData"
                            class="authorButton"
                            size="small">
                        <em>
                            {{sqlSize - yearList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
<!--            结果null-->
            <ul v-show="yearList.length == 0 && !loadFlag"
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
        name: "RefineByYear",

        data: function () {
            return {
                yearList: [],

                loadFlag: true,

                sqlSize: 0,

                yearTestList: [],

                numCount: 0,
                yearArrCount: 0,

                paramsObj: {}
            }
        },

        methods: {
            //获取数据
            getYearData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.yearArrCount = 0;
                this.setParams()
                axios.get(this.$store.state.host + "/onlyDoc/findAllByTitleMatchesTextYearRefineList", {
                    params: this.paramsObj
                }).then(res => {
                    //数据清洗
                    this.yearTestList = res.data.map(function (item) {
                        // item.num = this.toThousands(item.num);
                        return {
                            "_VALUE": item.group,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false,
                            "num": item.count
                        };
                    });

                    for (let i = 0; i < this.yearTestList.length; i++) {
                        if (this.$store.state.serchObj.year === '')
                            break;
                        else {
                            if (this.$store.state.serchObj.year == this.yearTestList[i]._VALUE) {
                                this.yearTestList[i].show = true;
                                this.yearTestList[i].img = "el-icon-remove";
                            }
                        }
                    }
                    //排序
                    this.yearTestList.sort(function (a, b) {
                        return b._VALUE - a._VALUE;
                    })

                    if (this.yearArrCount + 10 <= this.yearTestList.length) {
                        this.yearList = this.yearTestList.slice(this.yearArrCount, this.yearArrCount + 10);
                        this.yearArrCount += 10;
                    } else {
                        this.yearList = this.yearTestList.slice(this.yearArrCount);
                        this.yearArrCount += this.yearTestList.length;
                    }

                    this.sqlSize = this.yearTestList.length
                    this.loadFlag = false;
                    //加载完成清除标记
                    this.$store.commit("incrementCleanFlag", {flag: "yearflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error)
                })

            },
            //显示更多结果
            getMoreData() {
                this.loadFlag = true;

                if (this.yearArrCount + 10 < this.yearTestList.length) {
                    this.yearList = this.yearList.concat(this.yearTestList.slice(this.yearArrCount, this.yearArrCount + 10));
                    this.yearArrCount += 10;
                } else {
                    this.yearList = this.yearTestList;
                    this.yearArrCount += this.yearTestList.length;
                }

                this.loadFlag = false;
            },
            //鼠标移入
            mouseEnter(index) {
                if (this.yearList[index].img === "el-icon-circle-plus")
                    this.yearList[index].show = true;
            },
            //鼠标移出
            mouseLeave(index) {
                if (this.yearList[index].img === "el-icon-circle-plus")
                    this.yearList[index].show = false;
            },
            //选中函数
            addAuthorToInput(index) {
                if (this.yearList[index].img === "el-icon-circle-plus") {
                    this.yearList[index].show = true;
                    this.yearList[index].img = "el-icon-remove";
                    this.$store.commit("incrementYear", {newYear: this.yearList[index]._VALUE});
                } else {
                    this.yearList[index].show = false;
                    this.yearList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanYear")
                }
                // console.log(this.$store.state.year)
                // this.$store.commit("incrementCleanFlag")
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
            }

        },

        watch: {
            //监控标记
            '$store.state.serchObj.yearflag': function () {
                if (this.$store.state.serchObj.yearflag) {
                    this.getYearData();
                    //     this.$store.commit("incrementCleanFlag")
                }
            }
        },

        created() {
            this.getYearData();
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
        margin: 0;
        padding: 0;
    }

    .buttonSelect {
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>
