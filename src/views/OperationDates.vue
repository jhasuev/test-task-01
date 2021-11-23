<template>
  <div>
    <h2 class="mb-3">Операционные дни</h2>

    <b-table
      :fields="fields"
      :items="getOpDate"
      select-mode='single'
      selectable
      @row-selected="onRowSelected($event, [ 'OpDate' ])"
      class="mb-5"
    />

    <entries
      header="Проводки операционного дня"
      :compare-items="selectedEntry"
      :compare-fields="['OpDate']"
      :fields="entryFields"
      :items="getOpEntry"
    />
  </div>
</template>

<script>
import Entries from "@/components/entries"
import MixinsLocals from "@/mixins/locals"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "OperationDates",
  components: {
    Entries,
  },
  mixins: [ MixinsLocals ],
  data() {
    return {
      fields: [
        {
          key: 'OpDate',
          label: 'Дата',
        },
      ],

      entryFields: [
        {
          key: 'AcctNumDb',
          label: 'Счет дебета',
        },
        {
          key: 'AcctNumCr',
          label: 'Счет кредита',
        },
        {
          key: 'Amount',
          label: 'Сумма',
        },
      ],
    }
  },

  computed: {
    ...mapGetters([ 'getOpEntry', 'getOpDate' ]),
  },

  async created() {
    await this.loadFile('opEntry')
    await this.loadFile('opDate')
  },

  methods: {
    ...mapActions([ 'loadFile' ]),
  },

}
</script>