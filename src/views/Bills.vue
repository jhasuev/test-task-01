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
      @row-selected="onRowSelected($event, [ 'AcctNum' ])"
      class="mb-5"
    />

    <entries
      header="Проводки по счету"
      :compare-items="selectedEntry"
      :compare-fields="['AcctNumCr', 'AcctNumDb']"
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
  name: "Bills",
  components: {
    Entries,
  },
  mixins: [ MixinsLocals ],
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
      ],

      entryFields: [
        {
          key: 'OpDate',
          label: 'Дата операционного дня',
        },
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

      selectedOpDate: null,
    }
  },

  computed: {
    ...mapGetters([ 'getOpEntry', 'getAcctPos' ]),

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
    await this.loadFile('opEntry')
    
    this.setDefaultOpDateSelected()
  },

  methods: {
    ...mapActions([ 'loadFile' ]),

    setDefaultOpDateSelected() {
      // выбираем последний элемент в селекторе
      this.selectedOpDate = this.getAcctPos.slice(-1)[0].OpDate
    },
  },

}
</script>