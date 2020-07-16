<template>
    <el-container>
        <BookAndTheseItem></BookAndTheseItem>
        <ConfAndWorkItem></ConfAndWorkItem>
        <EditorShipItem></EditorShipItem>
        <InformalPubItem></InformalPubItem>
        <PartInBookOrCollItem></PartInBookOrCollItem>
        <JournalItem></JournalItem>
        <ComRefineList></ComRefineList>
        <MainPageMenu></MainPageMenu>
        <ClassNavigatain></ClassNavigatain>
        <SearchBar></SearchBar>
    </el-container>
</template>

<script>
    // @ is an alias to /src

    import BookAndTheseItem from "../components/bookTypeItem/BookAndTheseItem";
    import ConfAndWorkItem from "../components/bookTypeItem/ConfAndWorkItem";
    import EditorShipItem from "../components/bookTypeItem/EditorShipItem";
    import InformalPubItem from "../components/bookTypeItem/InformalPubItem";
    import PartInBookOrCollItem from "../components/bookTypeItem/PartInBookOrCollItem";
    import JournalItem from "../components/bookTypeItem/JournalItem";
    import ComRefineList from "../components/refineList/ComRefineList";
    import MainPageMenu from "../components/MainPageMenu";
    import ClassNavigatain from "../components/ClassNavigatain";
    import SearchBar from "../components/SearchBar";
    export default {
        name: 'Home',
        components: {
            SearchBar,
            ClassNavigatain,
            MainPageMenu,
            ComRefineList,
            JournalItem,
            PartInBookOrCollItem,
            InformalPubItem,
            EditorShipItem,
            ConfAndWorkItem,
            BookAndTheseItem

        },

    }
</script>
<style scoped>

</style>
