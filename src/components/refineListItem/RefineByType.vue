<template>
    <el-main style="padding: 0;">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照类型细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in typeList" :key="item._VALUE">
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
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "RefineByType",

        data: function () {
            return {
                typeList: [],

                loadFlag: true,

                sqlSize: 300,

                testList: [
                    {
                        "type": "Conference and Workshop Papers",
                        "num": 93292,
                    },
                    {
                        "type": "Journal Articles",
                        "num": 78105,
                    },
                    {
                        "type": "Informal Publications",
                        "num": 9701,
                    },
                    {
                        "type": "Books and Theses",
                        "num": 2159,
                    },
                    {
                        "type": "Parts in Books or Collections",
                        "num": 868,
                    },
                    {
                        "type": "Editorship",
                        "num": 425,
                    },
                ],

                numCount: 0,
            }
        },

        methods: {
            getTypeData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.typeList = this.testList.map(function (item) {
                    // item.num = this.toThousands(item.num);
                    return {
                        "_VALUE": item.type,
                        "img": "el-icon-circle-plus",
                        "index": cont++,
                        "show": false,
                        "num": item.num
                    };
                });
                this.loadFlag = false;
            },

            mouseEnter(index) {
                if (this.typeList[index].img === "el-icon-circle-plus")
                    this.typeList[index].show = true;
            },

            mouseLeave(index) {
                if (this.typeList[index].img === "el-icon-circle-plus")
                    this.typeList[index].show = false;
            },

            addAuthorToInput(index) {
                if (this.typeList[index].img === "el-icon-circle-plus") {
                    this.typeList[index].show = true;
                    this.typeList[index].img = "el-icon-remove";
                    this.$store.commit("incrementType",{newType:this.typeList[index]._VALUE});
                } else {
                    this.typeList[index].show = false;
                    this.typeList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanType")
                }
                console.log(this.$store.state.type)
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

        watch: {},

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
        margin: 0px;
        padding: 0px;
    }
    .buttonSelect{
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>

