<template>
    <el-container style="width: 80%; margin: auto; max-width: 1150px">
        <el-header class="header" height="auto">
            <SearchBar></SearchBar>
            <h3 class="headline">
                {{venueBook}}
            </h3>
        </el-header>
        <el-container>
<!--            会议详细结果-->
            <VenusCompleteResult
                    :texttitle="venueTitle"
                    :cross="venueSearch"></VenusCompleteResult>
        </el-container>
    </el-container>
</template>

<script>
    import SearchBar from "../../components/SearchBar";
    import VenusCompleteResult from "../../components/searchResult/VenusCompleteResult";
    export default {
        name: "ResultVenue",
        components: {VenusCompleteResult, SearchBar},

        data: function () {
            return{
                da:[]  ,
                venueTitle:'',
                venueSearch:'',
                venueBook:'',
            }
        },

        methods:{

        },

        mounted() {

        },

        created() {
            if (this.$route.query.venName != null) {
                this.venueTitle = this.$route.query.venName;
                this.venueSearch = this.$route.query.cross;
                this.venueBook = this.$route.query.book
            }
        }
    }
</script>

<style scoped>
    .headline {
        position: relative;
        clear: both;
        background: #606b70;
        color: #ffffff;
        font-size: x-large;
        font-weight: 600;
        text-align: left;
        padding: 4px 24px;
        margin: 0;
    }

    .header {
        width: 100%;
        min-width: 1000px;
        margin: auto;
        padding: 0;
    }
</style>
