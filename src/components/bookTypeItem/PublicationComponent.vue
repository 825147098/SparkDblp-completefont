<template>
  <BookAndTheseItem v-if="item.type === 'Book and Theses'"
                    :inner-data="item"/>
  <ConfAndWorkItem v-else-if="item.type === 'Conference and Workshop Papers'"
                   :inner-data="item"/>
  <EditorShipItem v-else-if="item.type === 'Editorshop'"
                  :inner-data="item"/>
  <InformalPubItem v-else-if="item.type === 'Informal Publications'"
                   :inner-data="item"/>
  <PartInBookOrCollItem v-else-if="item.type === 'Parts in Books or Collections'"
                        :inner-data="item"/>
  <JournalItem v-else-if="item.type === 'Journals Article'"
               :inner-data="item"/>
  <ReferenceWorkItem v-else-if="item.type === 'Reference Works'"
                     :inner-data="item"/>
  <WithdrawnItem v-else-if="item.type === 'Withdrawn Item'"
                 :inner-data="item"/>
</template>
<script>
import BookAndTheseItem from "@/components/bookTypeItem/BookAndTheseItem"
import WithdrawnItem from "@/components/bookTypeItem/WithdrawnItem";
import ReferenceWorkItem from "@/components/bookTypeItem/ReferenceWorkItem";
import PartInBookOrCollItem from "@/components/bookTypeItem/PartInBookOrCollItem";
import JournalItem from "@/components/bookTypeItem/JournalItem";
import InformalPubItem from "@/components/bookTypeItem/InformalPubItem";
import EditorShipItem from "@/components/bookTypeItem/EditorShipItem";
import ConfAndWorkItem from "@/components/bookTypeItem/ConfAndWorkItem";

export default {
  name: 'PublicationComponent',
  components: {
    BookAndTheseItem,
    WithdrawnItem,
    ReferenceWorkItem,
    PartInBookOrCollItem,
    JournalItem,
    InformalPubItem,
    EditorShipItem,
    ConfAndWorkItem
  },
  props: {
    item: {}
  }
}
</script>
