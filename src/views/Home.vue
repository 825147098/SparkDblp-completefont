<template>
    <el-container style="width: 1100px">
        <div>
            <!--            {{silkMouse()}}-->
            <div id="container">
                <div id="output"></div>
            </div>
        </div>
        <ul class="color">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import $ from "jquery";
    import Victor from "../style/vector.js";
    export default {
        name: 'Home',
        components: {},

        methods: {
        },

        mounted() {
            $(function(){
                // 初始化 传入dom id
                var victor = Victor.Victor("container", "output");
                var theme = [
                    ["#002c4a", "#005584"],
                    ["#35ac03", "#3f4303"],
                    ["#ac0908", "#cd5726"],
                    ["#18bbff", "#00486b"]
                ]
                $(".color li").each(function(index) {
                    var color = theme[index];
                    $(this).mouseover(function(){
                        victor(color).set();
                    })
                });
            })
        },

    }
</script>
<style scoped>
    *{margin: 0;padding: 0;}
    #container {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    #output {
        width: 100%;
        height: 100%;
    }

    .color{
        width: 120px;
        height: 20px;
        margin: 0 auto;
        position: fixed;
        left: 50%;
        margin-left: -60px;
        bottom: 20px;
    }
    .color li{
        float: left;
        margin: 0 5px;
        width: 20px;
        height: 20px;
        background: #ccc;
        box-shadow: 0 0 4px #FFF;
        list-style: none;
        cursor: pointer;
    }
    .color li:nth-child(1){
        background: #002c4a;
    }
    .color li:nth-child(2){
        background: #35ac03;
    }
    .color li:nth-child(3){
        background: #ac0908;
    }
    .color li:nth-child(4){
        background: #18bbff;
    }
</style>
