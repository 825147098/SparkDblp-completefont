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
            <VenusCompleteResult></VenusCompleteResult>
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

        watch:{
          '$route.query.venName':function () {
              this.venueTitle = this.$route.query.venName;
              this.venueSearch = this.$route.query.cross;
              this.venueBook = this.$route.query.book
          }
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
    @import "../../style/public.css";

</style>
