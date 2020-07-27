<template>
    <el-container>
        <div id="site-landing">
            <MainPageMenu v-if="false"></MainPageMenu>
            <div class="webTitle">Spark Dblp</div>
            <div class="homeInputGroup">
                <el-input
                        class="homeInput"
                        @keyup.enter.native="putInputData"
                        v-model="inputData" clearable>
                </el-input>
                <el-button
                        class="homeButton"
                        @click="putInputData"
                >
                    搜索
                </el-button>
            </div>
            <RuleCom class="rule"></RuleCom>
        </div>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import $ from "jquery";
    import "../style/polygonizr";
    import MainPageMenu from "../components/MainPageMenu";
    import RuleCom from "../components/RuleCom";


    export default {
        name: 'Home',
        components: {RuleCom, MainPageMenu},

        data: function () {
            return {
                inputData: '',
            }
        },

        methods: {
            //设置搜索条件
            putInputData() {
                // if (this.radio == 0)
                this.$store.commit("increment", {newInput: this.splitText(), newLabel: 0});
                this.$store.commit("incrementInputData", {data: this.inputData});

                this.changePage()

            },

            splitText() {
                let data = this.inputData.split("&");
                let len = data.length;
                for (let i = 0; i < len; i++) {
                    let temp = data[i].toString();
                    data[i] = temp.split(":");
                }

                let title = '';
                let year = '';
                let venue = '';
                let author = [];
                let type = '';
                let titleFlag = false;


                for (let i = 0; i < data.length; i++) {
                    switch (data[i].length) {
                        case 1:
                            if (data[i][0] != ' ') {
                                if (!titleFlag) {
                                    titleFlag = true;
                                    title = data[i][0]
                                } else {
                                    title += ' ' + data[i][0];
                                }
                            }
                            break;
                        default:
                            if (data[i][0] == "year") {
                                let yearData = data[i][1].split("..");
                                if (yearData.length > 1) {
                                    let starYear = Math.min(yearData[0], yearData[1]);
                                    let endYear = Math.max(yearData[0], yearData[1]);
                                    year = starYear;
                                    for (let j = starYear + 1; j <= endYear; j++) {
                                        year += ',' + j;
                                    }
                                } else {
                                    year = yearData[0];
                                }
                            } else if (data[i][0] == "author") {
                                let authorItem = data[i][1].split(",")
                                for (let j = 0; j < authorItem.length; j++) {
                                    author.push(authorItem[j])
                                }
                            } else if (data[i][0] == "venue") {
                                venue = data[i][1];
                            } else if (data[i][0] == "type") {
                                type = data[i][1];
                            } else {
                                break;
                            }
                            break;
                    }
                }
                // console.log(author)
                return {
                    title: title,
                    author: author,
                    year: year,
                    venue: venue,
                    type: type
                }
            },

            changePage() {
                this.$router.push({
                    path: '/search/complete',
                })
            },
        },

        mounted() {
            $('#site-landing').polygonizr();
        },

    }
</script>
<style scoped>
    @import "../style/normalize.css";

    #site-landing {
        height: calc(100vh);
        width: 100%;
        /*background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);*/
        background-color: #409EFF;
    }

    .webTitle {
        color: white;
        font-family: "微软雅黑,sans-serif";
        font-size: 84px;
        font-weight: 500;
        font-style: oblique;
        text-shadow: #f03740 -1px -3px, #2addfd 3px 0; /*抖音字体效果*/
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 1em 0 1em;
        letter-spacing: -1px;
        text-align: center;
    }

    .homeInput {
        width: 480px;
        font-size: 16px;
        margin: 0;
        vertical-align: top;
        outline: 0;
        box-shadow: none;
        border-radius: 10px 0 0 10px;
        border: 2px solid #c4c7ce;
        background: #fff;
        color: #222;
        overflow: hidden;
    }

    .homeButton {
        cursor: pointer;
        width: 108px;
        height: 44px;
        line-height: 45px;
        line-height: 44px \9;
        padding: 0;
        background-color: #4e6ef2;
        border-radius: 0 10px 10px 0;
        font-size: 17px;
        color: #fff;
        box-shadow: none;
        font-weight: 400;
        border: none;
        outline: 0;
    }

    .homeInputGroup {
        position: fixed;
        display: inline-block;
        zoom: 1;
        background: 0 0;
        padding: 280px 0 0 0;
        vertical-align: top;
        width: 100%;
        justify-content: center;
        z-index: 5;
    }

    .rule {
        font-size: 16px;
        text-align: left;
        color: whitesmoke;
        position: fixed;
        padding: 360px 0 0 calc(50vw - 320px);
        justify-content: center;
        width: 750px;
        height: 350px;
    }
</style>
