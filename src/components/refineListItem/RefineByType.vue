<template>
    <el-main style="padding: 0;">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照类型细化
            </b></p>
            <ul v-show="!loadFlag">
                <li v-for="(item,index) in typeList" :key="item._VALUE">
                    <i :class=item.img
                       class="icon"
                       v-show="item.show"></i>
                    <el-button type="text"
                               size="small"
                               disabled
                               @mouseenter.native="mouseEnter(index)"
                               @mouseleave.native="mouseLeave(index)"
                               @click="addAuthorToInput(index)"
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

                sqlSize: 300,

                typeTestList: [

                ],

                numCount: 0,

                paramsObj:{

                }
            }
        },

        methods: {
            getTypeData() {
                this.loadFlag = true;
                let cont = this.numCount;
                this.setParams()
                axios.get(this.$store.state.host + "/onlyDoc/findAllByTitleMatchesTextTypeRefineList",{
                    params: this.paramsObj
                }).then(res => {
                    this.typeTestList = res.data.map(function (item) {
                        // item.num = this.toThousands(item.num);
                        return {
                            "_VALUE": item.group,
                            "img": "el-icon-circle-plus",
                            "index": cont++,
                            "show": false,
                            "num": item.count
                        };
                    });
                    // console.log(res.data)
                    this.changeType()
                    this.typeList = this.typeTestList
                    this.sqlSize = this.typeTestList.length
                    this.loadFlag = false;
                    this.$store.commit("incrementCleanFlag",{flag:"typeflag"})
                    this.$store.commit("incrementCleanInputFlag");
                }).catch(error =>{
                    console.log(error)
                })
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
            },

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
                    }
                }
            },

            setParams(){
                if(this.$store.state.serchObj.title != ''){
                    this.paramsObj["title"] = this.$store.state.serchObj.title;
                }
                if(this.$store.state.serchObj.year != ''){
                    this.paramsObj["year"] = this.$store.state.serchObj.year;
                }
                if(this.$store.state.serchObj.venue != ''){
                    this.paramsObj["venue"] = this.$store.state.serchObj.venue;
                }
                if(this.$store.state.serchObj.authors.length > 0){
                    let len = this.$store.state.serchObj.authors.length;
                    let author = this.$store.state.serchObj.authors[0];
                    for(let i = 1; i < len; i++){
                        author += ',' + this.$store.state.serchObj.authors[i];
                    }
                    this.paramsObj["author"] = author;
                }
                // if(this.$store.state.serchObj.type != ''){
                //     this.paramsObj["type"] = this.$store.state.serchObj.type;
                // }
                // this.$store.commit("incrementCleanFlag")
            }

        },

        watch: {
            '$store.state.serchObj.typeflag':function () {
                if (this.$store.state.serchObj.typeflag){
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
    .buttonSelect{
        font-weight: 700;
        font-style: italic;
        padding-right: 4px
    }
</style>

