<template>
    <el-main>
        <JournalItem></JournalItem>
        <BookAndTheseItem></BookAndTheseItem>
        <ConfAndWorkItem></ConfAndWorkItem>
        <EditorShipItem></EditorShipItem>
        <InformalPubItem></InformalPubItem>
        <PartInBookOrColl></PartInBookOrColl>
    </el-main>
</template>

<script>
    // @ is an alias to /src

    import JournalItem from "../components/bookTypeItem/JournalItem";
    import BookAndTheseItem from "../components/bookTypeItem/BookAndTheseItem";
    import ConfAndWorkItem from "../components/bookTypeItem/ConfAndWorkItem";
    import EditorShipItem from "../components/bookTypeItem/EditorShipItem";
    import InformalPubItem from "../components/bookTypeItem/InformalPubItem";
    import PartInBookOrColl from "../components/bookTypeItem/PartInBookOrCollItem";
    export default {
        name: 'Home',
        components: {
            PartInBookOrColl,
            InformalPubItem,
            EditorShipItem,
            ConfAndWorkItem,
            BookAndTheseItem,
            JournalItem

        },

    }
</script>
<style scoped>

</style>
