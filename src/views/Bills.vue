<template>
  <div>
    <h2 class="mb-3" >
      <template v-if="getFilteredAcctPos.length">Счета с остатками на дату</template>
      <template v-else>Нет данных</template>
    </h2>

    <b-form-select
      v-if="getOpDateOptions.length"
      v-model="selectedOpDate"
      :options="getOpDateOptions"
      size="sm"
      class="mt-3"
    />

    <b-table
      v-if="getFilteredAcctPos.length"
      :fields="fields"
      :items="getFilteredAcctPos"
      select-mode='single'
      selectable
      @row-selected="onRowSelected($event, [ 'AcctNum' ])"
      class="mb-5 mt-3"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ 
            width: field.key === 'action' ? '230px' : '',
          }"
        >
      </template>
      <template #cell(action)="data">
        <div class="text-end">
          <b-button
            variant="danger"
            size="sm"
            class="mx-1"
            @click="removeItem('acctPos', data.item.id)"
          >Удалить</b-button>

          <b-button
            variant="primary"
            size="sm"
            class="mx-1"
            @click="editItem('acctPos', data.item.id, ['AcctNum', 'Balance'])"
          >Редактировать</b-button>
        </div>
      </template>
    </b-table>

    <entries
      v-if="getFilteredAcctPos.length"
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
        {
          key: 'action',
          label: 'Действие',
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

  watch: {
    getOpEntry() {
      this.setDefaultOpDateSelected()
    },

    getAcctPos() {
      this.setDefaultOpDateSelected()
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
      if (this.getAcctPos.length) {
        this.selectedOpDate = this.getAcctPos.slice(-1)[0].OpDate
      }
    },
  },

}
</script>