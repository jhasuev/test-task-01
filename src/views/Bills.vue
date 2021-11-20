<template>
  <div>
    <h2 class="mb-3">Счета с остатками на дату</h2>

    <b-form-select
      v-model="selectedOpDate"
      :options="getOpDateOptions"
      size="sm"
      class="mt-3"
    />

    <b-table
      :fields="fields"
      :items="getFilteredAcctPos"
      select-mode='single'
      selectable
      @row-selected="onAccNumRowSelected"
      class="mb-5"
    />

    <entries
      :entry="selectedEntry"
      :fields-for-filter="['AcctNumCr', 'AcctNumDb']"
    />
  </div>
</template>

<script>
import Entries from "@/components/entries"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Bills",
  components: {
    Entries,
  },
  data() {
    return {
      fields: [
        {
          key: 'AcctNum',
          label: 'Номер счета',
        },
        {
          key: 'Balance',
          label: 'Остаток',
        },
        {
          key: 'OpDate',
          label: 'Дата',
        },
      ],

      selectedOpDate: null,
      selectedEntry: "",
    }
  },

  computed: {
    ...mapGetters([ 'getAcctPos' ]),

    getOpDateOptions() {
      return this.getAcctPos.reduce((acc, acct) => {

        // убираем дублирование элементов для селектора
        if (!acc.some(acctIn => acctIn.text == acct.OpDate)) {
          acc.push({ value: acct.OpDate, text: acct.OpDate })
        }

        return acc
      }, [])
    },
    
    getFilteredAcctPos() {
      return this.getAcctPos.filter(acct => acct.OpDate === this.selectedOpDate)
    },
  },

  async created() {
    await this.loadFile('acctPos')
    
    this.setDefaultOpDateSelected()
  },

  methods: {
    ...mapActions([ 'loadFile' ]),

    setDefaultOpDateSelected() {
      // выбираем последний элемент в селекторе
      this.selectedOpDate = this.getAcctPos.slice(-1)[0].OpDate
    },

    onAccNumRowSelected(items) {
      this.selectedEntry = items[0]?.AcctNum
    },
  },

}
</script>