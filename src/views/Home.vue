<template>
    <el-container style="width: 1100px">
    <VenueSearchResult :search-venue="true"></VenueSearchResult>
    </el-container>
</template>

<script>
    // @ is an alias to /src

    import VenueSearchResult from "../components/searchResult/VenueSearchResult";
    export default {
        name: 'Home',
        components: {
            VenueSearchResult,

        },

    }
</script>
<style scoped>

</style>
