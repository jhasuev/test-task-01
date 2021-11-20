<template>
  <div>
    <h2 class="mb-3">Операционные дни</h2>

    <b-table
      :fields="fields"
      :items="getOpDate"
      select-mode='single'
      selectable
      @row-selected="onAccNumRowSelected"
      class="mb-5"
    />

    <entries
      :entry="selectedEntry"
      :fields-for-filter="['OpDate']"
    />
  </div>
</template>

<script>
import Entries from "@/components/entries"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "OperationDates",
  components: {
    Entries,
  },
  data() {
    return {
      fields: [
        {
          key: 'OpDate',
          label: 'Дата',
        },
      ],

      selectedEntry: "",
    }
  },

  computed: {
    ...mapGetters([ 'getOpDate' ]),
  },

  async created() {
    await this.loadFile('opDate')
  },

  methods: {
    ...mapActions([ 'loadFile' ]),

    onAccNumRowSelected(items) {
      this.selectedEntry = items[0]?.OpDate
    },
  },

}
</script>