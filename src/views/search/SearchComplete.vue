<template>
    <div>
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp</h1>
        </el-header>
<!--        作者会议碎片结果-->
        <el-container v-show="activeShow">
            <AuthorSearchResult v-show="showAutList" :search-author=false class="autList"></AuthorSearchResult>
            <VenueSearchResult v-show="showVenList" :search-venue="false"></VenueSearchResult>
        </el-container>
        <el-container v-if="activeShow">
<!--            出版物结果-->
            <CompleteResult></CompleteResult>
<!--            搜索结果细化栏-->
            <ComRefineList></ComRefineList>
        </el-container>
        <SearchRule v-else></SearchRule>
    </div>
</template>

<script>
    import CompleteResult from "../../components/searchResult/CompleteResult";
    import ComRefineList from "../../components/refineList/ComRefineList";
    import SearchRule from "./SearchRule";
    import AuthorSearchResult from "../../components/searchResult/AuthorSearchResult";
    import VenueSearchResult from "../../components/searchResult/VenueSearchResult";
    export default {
        name: "SearchComplete",
        components: {VenueSearchResult, AuthorSearchResult, SearchRule, ComRefineList, CompleteResult},

        data:function () {
            return{
                activeShow:false,
                showAutList:true,
                showVenList:true,
            }
        },

        watch:{
            '$store.state.inputfalg': function(){
                    // console.log(this.$store.state)
                    if(this.$store.state.inputfalg && this.$store.state.radioLabel === 0){
                        this.activeShow = true;
                        // console.log(this.$store.state)
                    }
            },
            //作者结果标记
            '$store.state.showObj.authorflag':function () {
                if(this.$store.state.showObj.authorflag)
                    this.showAutList =true;
                else
                    this.showAutList = false
                // console.log(this.showAutList)
            },
            //会议结果标记
            '$store.state.showObj.venueflag':function () {
                if(this.$store.state.showObj.venueflag)
                    this.showVenList =true;
                else
                    this.showVenList = false
                // console.log(this.showVenList)
            }
        },

        created() {
            this.activeShow = this.$store.state.inputfalg
            this.$store.commit("incrementRadio",{newLabel: 0})
        }
    }
</script>

<style scoped>
    .headline {
        position: relative;
        clear: both;
        /*background: #606b70;*/
        /*color: #ffffff;*/
        background-color: #C1CBD7;
        color: #7d848a;
        font-size: x-large;
        font-weight: 600;
        text-align: left;
        padding: 4px 24px;
        margin-top: 0;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
        padding: 0;
    }

    .autList{
        min-width: 300px;
    }

</style>
