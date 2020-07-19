<template>
    <el-main style="padding: 0">
        <div class="refine-by">
            <p><b>
                按照会议细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in venueList" :key="item._VALUE == '' ? item.venue : item._VALUE">
                    <i :class=item.img
                       class="icon"
                       v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addVenToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE == '' ? item.venue : item._VALUE}}({{toThousands(item.num)}})
                        <span v-show="item.show">✔</span>
                    </el-button>
                </li>
            </ul>
            <ul v-show="loadFlag">
                <li>
                    <el-icon class="el-icon-loading"
                             style="font-size: 20px "
                    ></el-icon>
                </li>
            </ul>
            <ul v-show="!loadFlag && sqlSize - venueList.length > 0">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreVenData"
                            class="authorButton"
                            size="small">
                        <em>
                            {{sqlSize - venueList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
            <ul v-show="venueList.length == 0 && !loadFlag"
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
        name: "RefineByVenue",

        data: function () {
            return {
                venueList: [],

                loadFlag: true,

                sqlSize: 0,

                venTestList: [],

                venArrCount: 0,
                venNumCount: 0,

                paramsObj: {}
            }
        },

        methods: {
            getVenueData() {
                this.loadFlag = true;
                let cont = 0;
                this.venArrCount = 0;
                this.setParams()

                axios.get(this.$store.state.host + "/onlyDoc/findAllByTitleMatchesTextPrefix2RefineList", {
                    params: this.paramsObj
                }).then(res => {
                    this.venTestList = res.data.map(function (item) {
                        return {
                            "_VALUE": item.property,
                            "img": "el-icon-circle-plus",
                            "show": false,
                            "venue": item.group,
                            "num": item.count
                        };
                    })

                    for (let i = 0; i < this.venTestList.length; i++) {
                        if (this.$store.state.serchObj.venue === '')
                            break;
                        else {
                            if (this.$store.state.serchObj.venue == this.venTestList[i].venue) {
                                this.venTestList[i].show = true;
                                this.venTestList[i].img = "el-icon-remove";
                            }
                        }
                    }

                    if (this.venArrCount + 10 <= this.venTestList.length) {
                        this.venueList = this.venTestList.slice(this.venArrCount, this.venArrCount + 10);
                        this.venArrCount += 10;
                    } else {
                        this.venueList = this.venTestList.slice(this.venArrCount);
                        this.venArrCount += this.venTestList.length;
                    }

                    this.sqlSize = this.venTestList.length;

                    this.venNumCount = cont
                    this.loadFlag = false;
                    this.$store.commit("incrementCleanFlag", {flag: "venflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                    console.log(error)
                })

            },

            getMoreVenData() {
                this.loadFlag = true;

                if (this.venArrCount + 10 < this.venTestList.length) {
                    this.venueList = this.venueList.concat(this.venTestList.slice(this.venArrCount, this.venArrCount + 10));
                    this.venArrCount += 10;
                } else {
                    this.venueList = this.venTestList;
                    this.venArrCount += this.venTestList.length;
                }

                this.loadFlag = false;
            },

            mouseEnter(index) {
                if (this.venueList[index].img === "el-icon-circle-plus")
                    this.venueList[index].show = true;
            },

            mouseLeave(index) {
                if (this.venueList[index].img === "el-icon-circle-plus")
                    this.venueList[index].show = false;
            },

            addVenToInput(index) {
                if (this.venueList[index].img === "el-icon-circle-plus") {
                    this.venueList[index].show = true;
                    this.venueList[index].img = "el-icon-remove";
                    this.$store.commit("incrementVenue", {newVenue: this.venueList[index].venue});

                    let temp = this.venueList[index];
                    // this.venueList = []
                    this.venueList.push(temp)
                } else {
                    this.venueList[index].show = false;
                    this.venueList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanVenue")
                    // this.getVenueData()
                }
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
            },

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
            '$store.state.serchObj.venflag': function () {
                if (this.$store.state.serchObj.venflag) {
                    this.getVenueData();
                    //     this.$store.commit("incrementCleanFlag")
                }
            }
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

