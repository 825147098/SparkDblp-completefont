<template>
    <el-container>
        <div id="site-landing">
            <MainPageMenu v-if="false"></MainPageMenu>
            <div class="webTitle">Spark Dblp</div>
            <div class="homeInputGroup">
                <el-input
                        class="homeInput"
                        v-model="inputData" clearable>
                </el-input>
                <el-button
                        class="homeButton"
                >
                    搜索
                </el-button>
            </div>
        </div>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import $ from "jquery";
    import "../style/polygonizr";
    import MainPageMenu from "../components/MainPageMenu";
    // import silkMouse from "../style/silkMouse";

    export default {
        name: 'Home',
        components: {MainPageMenu},

        data: function () {
            return {
                inputData: '',
            }
        },

        mounted() {
            $('#site-landing').polygonizr();
        },

    }
</script>
<style scoped>
    @import "../style/normalize.css";

    #site-landing {
        height: 985px;
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
        padding: 300px 0 0 0;
        vertical-align: top;
        width: 100%;
        justify-content: center;
    }
</style>
