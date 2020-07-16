<template>
    <el-main style="padding: 0">
        <div class="refine-by">
            <p><b>
                按照{{name}}细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in authorList" :key="item._VALUE">
                    <i :class=item.img v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
                               :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                        {{item._VALUE}}({{item.num}})
                        <span v-show="item.show">✔</span>
                    </el-button>
                </li>
            </ul>
            <ul v-show="loadFlag">
                <li>
                    <el-icon class="el-icon-loading"></el-icon>
                </li>
            </ul>
            <ul v-show="!loadFlag && sqlSize - authorList > 0">
                <li>
                    <el-button
                            type="text"
                            @click="getMoreData"
                            class="authorButton"
                            size="samll">
                        <em>
                            {{sqlSize - authorList.length}}更多可选项
                        </em>
                    </el-button>
                </li>
            </ul>
        </div>
    </el-main>
</template>

<script>

    export default {
        name: "RefineByAuthor",

        data: function () {
            return {
                authorList: [],

                loadFlag: true,

                sqlSize: '',

                testList: [],

                numCount: 0,
            }
        },

        methods: {
            getAuthorData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.authorList = this.testList.map(function (item) {

                    return {
                        "_VALUE": item._VALUE,
                        "img": "el-icon-circle-plus",
                        "index": cont++,
                        "show": false,
                        "num":item.num,
                    };
                });
                this.numCount = cont;
                this.loadFlag = false;
            },

            mouseEnter(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = true;
            },

            mouseLeave(index) {
                if (this.authorList[index].img === "el-icon-circle-plus")
                    this.authorList[index].show = false;
            },

            addAuthorToInput(index) {
                if (this.authorList[index].img === "el-icon-circle-plus") {
                    this.authorList[index].show = true;
                    this.authorList[index].img = "el-icon-remove"
                    this.$store.commit("incrementAuthor" ,{newAuthor: this.authorList[index]._VALUE})
                } else {
                    this.authorList[index].show = false;
                    this.authorList[index].img = "el-icon-circle-plus";
                    this.$store.commit("incrementCleanAuthor" ,{moveAuthor: this.authorList[index]._VALUE})
                }
                console.log(this.$store.state.authors)
            },

            getMoreData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.authorList = this.authorList.concat(this.testList.map(function (item) {
                        return {
                            "_VALUE": item._VALUE,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false,
                            "num":10,
                        };
                    })
                );
                this.numCount = cont;
                this.loadFlag = false;
            },


        },

        props:[
            'name'
        ],
        watch: {},

        created() {
            this.testList = this.c()
            this.sqlSize = this.testList.length
            console.log(this.testList)
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
