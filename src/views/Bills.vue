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
      :fields="fieldsAcctPos"
      :items="getFilteredAcctPos"
      select-mode='single'
      selectable
      @row-selected="onAccNumRowSelected"
      class="mb-5"
    />

    <template v-if="!selectedAcctNum">
      <h6 class="text-center">Выберите счет...</h6>
    </template>
    
    <template v-else-if="!getFilteredOpEntry.length">
      <h6 class="text-center">Нет проводки по этому счету...</h6>
    </template>

    <template v-else>
      <h2 class="mb-3">Проводки по счету</h2>
      
      <b-table
        :fields="fieldsOpEntry"
        :items="getFilteredOpEntry"
      />
    </template>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Bills",
  data() {
    return {
      fieldsAcctPos: [
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

      fieldsOpEntry: [
        {
          key: 'OpDate',
          label: 'Дата',
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
          label: 'Сумма проводки',
        },
      ],

      selectedOpDate: null,
      selectedAcctNum: null,
    }
  },

  computed: {
    ...mapGetters([
      'getAcctPos',
      'getOpEntry',
    ]),

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
    
    getFilteredOpEntry() {
      return this.getOpEntry.filter(
        item => item.AcctNumCr === this.selectedAcctNum || item.AcctNumDb === this.selectedAcctNum
      )
    },
  },

  async created() {
    await this.loadFile('acctPos')
    await this.loadFile('opEntry')
    
    this.setDefaultOpDateSelected()
  },

  methods: {
    ...mapActions([
      'loadFile',
    ]),

    setDefaultOpDateSelected() {
      // выбираем последний элемент в селекторе
      this.selectedOpDate = this.getAcctPos.slice(-1)[0].OpDate
    },

    onAccNumRowSelected(items) {
      this.selectedAcctNum = items[0]?.AcctNum
    },
  },

}
</script>