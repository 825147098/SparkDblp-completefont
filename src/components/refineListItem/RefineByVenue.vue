<template>
    <el-main style="padding: 0">
        <div class="refine-by">
            <p><b>
                按照会议细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in venueList" :key="item._VALUE">
                    <i :class=item.img v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addVenToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE}}({{toThousands(item.num)}})
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
                            @click="getMoreData"
                            class="authorButton"
                            size="samll">
                        <em>
                            {{sqlSize - venueList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
        </div>
    </el-main>
</template>

<script>
    import testData from "../../testData";

    export default {
        name: "RefineByVenue",

        data: function () {
            return {
                venueList: [],

                loadFlag: true,

                sqlSize: 0,

                testList: [
                    {
                        "venue": "ICASSP",
                        "num": 93292,
                    },
                    {
                        "venue": "CDC",
                        "num": 78105,
                    },
                    {
                        "venue": "ISCAS",
                        "num": 9701,
                    },
                    {
                        "venue": "ACC",
                        "num": 2159,
                    },
                    {
                        "venue": "ICC",
                        "num": 868,
                    },
                    {
                        "venue": "IGRASS",
                        "num": 425,
                    },
                    {
                        "venue": "IORS",
                        "num": 425,
                    },
                    {
                        "venue": "TESS",
                        "num": 425,
                    },
                    {
                        "venue": "GLOBECOM",
                        "num": 425,
                    },
                    {
                        "venue": "ICPC",
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
                this.venueList = this.testList.map(function (item) {
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
                this.venueList = this.venueList.concat(this.testList.map(function (item) {
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
                    this.$store.commit("incrementFliterVenue",{newVenue:this.venueList[index]._VALUE});

                    let temp = this.venueList[index];
                    this.venueList = []
                    this.venueList.push(temp)
                } else {
                    this.venueList[index].show = false;
                    this.venueList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementFliterCleanVenue")
                    this.getVenueData()
                }
                 console.log(this.$store.state.filterOb.venue)
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

            c(){
                let data = testData.data().test;
                let arr = []
                for (let i = 0; i < data.length; i++) {
                        arr.push({_VALUE: data[i].journal});
                }
                let sort = testData.group_signal(arr, "_VALUE");
                let arrlist=[];

                for(let item in sort ){
                    arrlist.push({venue:item, num: sort[item].length})
                }
                return arrlist
            }
        },

        watch: {

        },

        created() {
            this.testList = this.c()
            // console.log(this.testList)
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

