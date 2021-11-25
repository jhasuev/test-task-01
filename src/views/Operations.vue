<template>
  <div>
    <template v-if="getOpEntry.length">
      <h2 class="mb-3" >Проводки</h2>

      <div class="d-flex">
        <b-button
          class="ml-auto"
          variant="primary"
          @click="addItem('opEntry')"
        >Добавить запись</b-button>
      </div>

      <b-table
        :fields="fields"
        :items="getOpEntry"
        select-mode='single'
        selectable
        @row-selected="onRowSelected($event, [ 'AcctNumCr', 'AcctNumDb' ])"
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
          <action-buttons
            store-name="opEntry"
            :item-id="data.item.id"
            :fields-for-edit="['OpDate','AcctNumDb','AcctNumCr','Amount']"
          />
        </template>
      </b-table>

      <entries
        header="Счета проводок"
        :compare-items="selectedEntry"
        :compare-fields="['AcctNum']"
        :fields="entryFields"
        :items="getFilteredEntryItems"
      />
    </template>
    <template v-else>
      <h2 class="mb-3" >Нет данных</h2>
    </template>
  </div>
</template>

<script>
import Entries from "@/components/entries"
import ActionButtons from "@/components/action-buttons"
import MixinsLocals from "@/mixins/locals"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Operations",
  components: {
    Entries,
    ActionButtons,
  },
  mixins: [ MixinsLocals ],
  data() {
    return {
      fields: [
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
          label: 'Сумма',
        },
        {
          key: 'action',
          label: 'Действие',
        },
      ],

      entryFields: [
        {
          key: 'AcctNum',
          label: 'Номер счета',
        },
        {
          key: 'Balance',
          label: 'Остаток',
        },
      ],
    }
  },

  computed: {
    ...mapGetters([ 'getOpEntry', 'getAcctPos' ]),

    // получаем по одной записи по каждому счету (в нашем случае только 2 записи)
    getFilteredEntryItems() {
      return this.getAcctPos.reduce((acc, item) => {
        const itemInIndex = acc.findIndex(itemIn => itemIn.AcctNum === item.AcctNum)
        if (itemInIndex != -1) {
          acc[itemInIndex].Balance += item.Balance
        } else {
          acc.push(item)
        }

        return acc
      }, [])
    },
  },

  async created() {
    await this.loadFile('opEntry')
    await this.loadFile('acctPos')
  },

  methods: {
    ...mapActions([ 'loadFile' ]),
  },

}
</script>