<template>
    <el-container>
        <el-header class="header" v-show="activeShow">
            <h1 class="headline">搜索 Spark Dblp For 会议</h1>
        </el-header>
<!--        会议搜索结果-->
        <VenueSearchResult :search-venue="true" v-if="activeShow"></VenueSearchResult>
        <SearchRule v-else ></SearchRule>
    </el-container>
</template>

<script>
    import SearchRule from "./SearchRule";
    import VenueSearchResult from "../../components/searchResult/VenueSearchResult";
    export default {
        name: "SearchVenue",

        components: {VenueSearchResult, SearchRule},
        data: function () {
            return {
                activeShow:false,
                activeName: '1',
            }
        },

        methods: {
        },

        watch: {
            //监视标记,手风琴标记为string格式

            '$store.state.inputfalg': function () {
                if(this.$store.state.radioLabel === 2){
                    this.activeShow = true;
                }
            },

        },

        mounted() {
            if (this.$route.query.venName != null) {
                // this.searchName = this.$route.query.autName;
                // console.log(this.activeShow)
                this.activeShow = true;
            }
        },

        created() {
            this.$store.commit("incrementRadio",{newLabel: 2})
            if(this.$store.state.inputData != null){
                this.activeShow = true
            }
        }
    }
</script>

<style scoped>
    @import "../../style/public.css";

</style>
