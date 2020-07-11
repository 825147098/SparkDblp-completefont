<template>
    <el-main>
        <RefineByAuthor name="协作者"></RefineByAuthor>
        <RefineByType></RefineByType>
        <RefineByVenue></RefineByVenue>
        <RefineByYear></RefineByYear>
        <RefineByTypeInDetail></RefineByTypeInDetail>
    </el-main>
</template>

<script>
    // @ is an alias to /src

    import RefineByAuthor from "../components/refineListItem/RefineByAuthor";
    import RefineByType from "../components/refineListItem/RefineByType";
    import RefineByVenue from "../components/refineListItem/RefineByVenue";
    import RefineByYear from "../components/refineListItem/RefineByYear";
    import RefineByTypeInDetail from "../components/refineListItem/RefineByTypeInDetail";

    export default {
        name: 'Home',
        components: {
            RefineByTypeInDetail,
            RefineByYear,
            RefineByVenue,
            RefineByType,
            RefineByAuthor

        },

    }
</script>
<style scoped>

</style>
