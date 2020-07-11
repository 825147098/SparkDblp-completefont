<template>
    <el-main style="padding: 0">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照时间（年）细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in yearList" :key="item._VALUE">
                    <i :class=item.img v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE}}({{toThousands(item.num)}})
                    </el-button>
                    <span v-show="item.show">✔</span>
                </li>
            </ul>
            <ul v-show="loadFlag">
                <li>
                    <el-icon class="el-icon-loading"></el-icon>
                </li>
            </ul>
            <ul v-show="!loadFlag">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreData"
                            class="authorButton"
                            size="samll">
                        <em>
                            {{sqlSize - yearList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "RefineByYear",

        data: function () {
            return {
                yearList: [],

                loadFlag: true,

                sqlSize: 300,

                testList: [
                    {
                        "venue": "2020",
                        "num": 93292,
                    },
                    {
                        "venue": "2019",
                        "num": 78105,
                    },
                    {
                        "venue": "2018",
                        "num": 9701,
                    },
                    {
                        "venue": "2016",
                        "num": 2159,
                    },
                    {
                        "venue": "2010",
                        "num": 868,
                    },
                    {
                        "venue": "2008",
                        "num": 425,
                    },
                    {
                        "venue": "2005",
                        "num": 425,
                    },
                    {
                        "venue": "2004",
                        "num": 425,
                    },
                    {
                        "venue": "2002",
                        "num": 425,
                    },
                    {
                        "venue": "2000",
                        "num": 425,
                    },
                ],

                numCount: 0,
            }
        },

        methods: {
            getVenueData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.yearList = this.testList.map(function (item) {
                    // item.num = this.toThousands(item.num);
                    return {
                        "_VALUE": item.venue,
                        "img": "el-icon-circle-plus",
                        "index": cont++,
                        "show": false,
                        "num": item.num
                    };
                });
                this.loadFlag = false;
            },

            getMoreData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.yearList = this.yearList.concat(this.testList.map(function (item) {
                        return {
                            "_VALUE": item.venue,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false,
                            "num": item.num
                        };
                    })
                );
                this.numCount = cont;
                this.loadFlag = false;
            },

            mouseEnter(index) {
                if (this.yearList[index].img === "el-icon-circle-plus")
                    this.yearList[index].show = true;
            },

            mouseLeave(index) {
                if (this.yearList[index].img === "el-icon-circle-plus")
                    this.yearList[index].show = false;
            },

            addAuthorToInput(index) {
                if (this.yearList[index].img === "el-icon-circle-plus") {
                    this.yearList[index].show = true;
                    this.yearList[index].img = "el-icon-remove";
                    this.$store.commit("incrementYear",{newYear:this.yearList[index]._VALUE});
                } else {
                    this.yearList[index].show = false;
                    this.yearList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanYear")
                }
                console.log(this.$store.state.year)
            },

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
            }

        },

        watch: {

        },

        created() {
            this.getVenueData();
        }
    }
</script>

<style scoped>
    .refine-by {
        margin: 0 0 2ex;
        font-size: smaller;
        text-align: left;
        width: 245px;
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
    .buttonSelect{
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>
