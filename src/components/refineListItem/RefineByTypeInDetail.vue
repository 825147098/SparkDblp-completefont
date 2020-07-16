<template>
    <el-main style="padding: 0">
        <div class="refine-by" style="padding: 0">
            <p><b>
                按照类型细化
            </b></p>
            <ul v-show="!loadFlag">
                <el-checkbox-group v-model="typeList">
                    <li v-for="item in typeNameList"
                        :key="item.type">
                        <el-checkbox :label="item.label"
                                     size="mini"
                                     class="authorButton">
                            {{item.type}}(only)
                        </el-checkbox>
                    </li>
                </el-checkbox-group >
            </ul>
            <ul v-show="!loadFlag">
                <li>
                    <el-button size="mini"
                               class="authorButton"
                               @click="handleCheckAllChange"
                               type="text">
                        全选
                    </el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button size="mini"
                               @click="handleDeleteAllChange"
                               class="authorButton"
                               type="text">
                        取消
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
        </div>
    </el-main>
</template>

<script>
    import testData from "../../testData";
    // import axios from 'axios' ;

    export default {
        name: "RefineByTypeInDetail",

        data: function () {
            return {
                typeList: [],

                loadFlag: false,


                typeNameList: [
                    {
                        "type": "Conference and Workshop Papers",
                        label:0,
                    },
                    {
                        "type": "Journal Articles",
                        label:1,
                    },
                    {
                        "type": "Informal Publications",
                        label:2,
                    },
                    {
                        "type": "Books and Theses",
                        label:3,
                    },
                    {
                        "type": "Parts in Books or Collections",
                        label:4,
                    },
                    {
                        "type": "Editorship",
                        label:5,
                    },
                ],

                numCount: 0,
            }
        },

        methods: {
            // con(){
            //     // axios.get(this.$store.state.host + "/onlyDocReactive/test")
            //     //     .then(res => {
            //     //         for(var key in res.data){
            //     //             console.log(res.data[key])
            //     //         }
            //     //     }).catch(error => {
            //     //         console.log(error)
            //     // })
            //     let es = new EventSource(this.$store.state.host + '/onlyDocReactive/test');
            //     es.addEventListener('message', event => {
            //         let data = JSON.parse(event.data);
            //         // this.typeList.push(data)
            //         console.log(data)
            //     }, false);
            // },

            handleCheckAllChange() {
                this.typeList = this.typeNameList.map(function (item) {
                    return item.label;
                })
                // this.setTypeArray()
            },

            handleDeleteAllChange(){
                this.typeList = [];
                // this.setTypeArray()
            },

            c(){
                let data = testData.data().test;
                let arr = []
                for (let i = 0; i < data.length; i++) {

                        arr.push({_VALUE: data[i].type});

                }
                let sort = testData.group_signal(arr, "_VALUE");
                let arrlist=[];

                for(let item in sort ){
                    arrlist.push({type:item, label: item})
                }
                return arrlist
            }
        },

        watch: {
            typeList:function () {
                console.log(this.typeList)
            }
        },

        created() {
            this.typeNameList = this.c()
            this.handleCheckAllChange()
            // this.con()
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
