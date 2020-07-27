<template>
    <div>
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp</h1>
        </el-header>
        <!--        作者会议碎片结果-->
        <el-container v-show="activeShow">
            <AuthorSearchResult v-if="showAutList" :search-author=false class="autList"></AuthorSearchResult>
            <VenueSearchResult v-if="showVenList" :search-venue="false"></VenueSearchResult>
        </el-container>
        <el-container v-if="activeShow">
            <!--            出版物结果-->
            <CompleteResult></CompleteResult>
            <!--            搜索结果细化栏-->
            <ComRefineList v-if="refineList"></ComRefineList>
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

        data: function () {
            return {
                activeShow: false,
                showAutList: false,
                showVenList: false,
                refineList: false,
            }
        },

        watch: {
            '$store.state.inputfalg': function () {
                if ((this.$store.state.inputfalg || this.$store.state.serchObj.venflag) && this.$store.state.radioLabel === 0) {
                    // console.log(2)
                    this.activeShow = true;
                    setTimeout(() => {
                        this.refineList = true;
                    },1000)
                    setTimeout(() => {
                        this.showVenList = true;
                    }, 1500)
                    setTimeout(() => {
                        this.showAutList = true
                    }, 2000)
                }
            },

            //作者结果标记
            '$store.state.showObj.authorflag': function () {
                if (this.$store.state.showObj.authorflag)
                    this.showAutList = true;
                else
                    this.showAutList = false
                // console.log(this.showAutList)
            },
            //会议结果标记
            '$store.state.showObj.venueflag': function () {
                if (this.$store.state.showObj.venueflag)
                    this.showVenList = true;
                else
                    this.showVenList = false
                // console.log(this.showVenList)
            }
        },

        mounted() {
            if (this.$store.state.inputData != null) {
                this.activeShow = true
            }
        },

        created() {
            // this.activeShow = this.$store.state.inputfalg
            this.$store.commit("incrementRadio", {newLabel: 0})

        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

    .autList {
        min-width: 300px;
    }

</style>
