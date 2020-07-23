<template>
    <el-main style="padding: 0">
        <div class="refine-by">
            <p><b>
                按照{{name}}细化
            </b></p>
            <ul v-show="!loadFlag">
<!--                作者名单-->
                <li v-for="(item,index) in authorList" :key="item._VALUE">
                    <i :class=item.img
                       class="icon"
                       v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
<!--                        选中切换-->
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
<!--            更多按钮-->
            <ul v-show="!loadFlag && sqlSize - authorList.length > 0">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreAutData"
                            class="authorButton"
                            size="small">
                        <em>
                            {{sqlSize - authorList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
<!--            null标识-->
            <ul v-show="authorList.length == 0 && !loadFlag"
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
        name: "RefineByAuthor",

        data: function () {
            return {
                authorList: [],

                loadFlag: true,

                sqlSize: '',

                autTestList: [],

                autNumCount: 0,
                autArrCount: 0,

                url: "/onlyDoc/findAllByTitleMatchesTextAuthorRefineList",

                paramsObj: {}


            }
        },

        methods: {
            //获取数据
            getAuthorData() {
                this.loadFlag = true;
                let cont = 0;
                this.autArrCount = 0;
                this.setParams()

                axios.get(this.$store.state.host + this.url, {
                    params: this.paramsObj
                }).then(res => {
                    let data = res.data;
                    //映射数据清洗
                    this.autTestList = data.map(function (item) {
                        return {
                            "_VALUE": item.group,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false,
                            "num": item.count,
                        };
                    });
                    //数量排序
                    this.autTestList.sort(function (a, b) {
                        return b.num > a.num;
                    })
                    //选中标记
                    for (let i = 0; i < this.autTestList.length; i++) {
                        if (this.$store.state.serchObj.authors.length == 0)
                            break;
                        else {
                            if (this.$store.state.serchObj.authors.indexOf(this.autTestList[i]._VALUE) != -1) {
                                this.autTestList[i].show = true;
                                this.autTestList[i].img = "el-icon-remove";
                            }
                        }
                    }
                    //前十项
                    if (this.autArrCount + 10 < this.autTestList.length) {
                        this.authorList = this.autTestList.slice(this.autArrCount, this.autArrCount + 10);
                        this.autArrCount += 10;
                    } else {
                        this.authorList = this.autTestList.slice(this.autArrCount);
                        this.autArrCount += this.autTestList.length;
                    }

                    this.sqlSize = this.autTestList.length;

                    this.authorNumCount = cont;
                    // console.log(this.autTestList)
                    this.loadFlag = false;
                    //加载完成标记
                    this.$store.commit("incrementCleanFlag", {flag: "autflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error)
                })

            },
            //获得更多显示
            getMoreAutData() {
                this.loadFlag = true;

                if (this.autArrCount + 10 < this.autTestList.length) {
                    this.authorList = this.authorList.concat(this.autTestList.slice(this.autArrCount, this.autArrCount + 10));
                    this.autArrCount += 10;
                } else {
                    this.authorList = this.autTestList;
                    this.autArrCount += this.autTestList.length;
                }

                this.loadFlag = false;
            },
            //鼠标移入
            mouseEnter(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = true;
            },
            //鼠标移出
            mouseLeave(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = false;
            },
            //选中函数
            addAuthorToInput(index) {
                if (this.authorList[index].img === "el-icon-circle-plus") {
                    this.authorList[index].show = true;
                    this.authorList[index].img = "el-icon-remove"
                    this.$store.commit("incrementAuthor", {newAuthor: this.authorList[index]._VALUE})
                    // console.log(this.$store.state)

                } else {
                    this.authorList[index].show = false;
                    this.authorList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanAuthor", {moveAuthor: this.authorList[index]._VALUE})
                }
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
                // this.$store.commit("incrementCleanFlag")
            }
        },
        //显示名称
        props: [
            'name'
        ],
        watch: {
            //监察
            '$store.state.serchObj.autflag': function () {
                if (this.$store.state.serchObj.autflag) {
                    this.getAuthorData();
                    // this.$store.commit("incrementCleanFlag")
                }
            }
        },

        created() {
            // console.log(this.$store.state.serchObj)
            this.getAuthorData();


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
        white-space: pre-line;
    }

    .buttonSelect {
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>
