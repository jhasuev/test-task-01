<template>
  <div>
    <template v-if="getOpDate.length">
      <h2 class="mb-3">Операционные дни</h2>

      <div class="d-flex">
        <b-button
          class="ml-auto"
          variant="primary"
          @click="addItem('opDate')"
        >Добавить запись</b-button>
      </div>

      <b-table
        :fields="fields"
        :items="getOpDate"
        select-mode='single'
        selectable
        @row-selected="onRowSelected($event, [ 'OpDate' ])"
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
            store-name="opDate"
            :item-id="data.item.id"
            :fields-for-edit="['OpDate']"
          />
        </template>
      </b-table>

      <entries
        header="Проводки операционного дня"
        :compare-items="selectedEntry"
        :compare-fields="['OpDate']"
        :fields="entryFields"
        :items="getOpEntry"
      />
    </template>
    <template v-else>
      <h2 class="mb-3">Нет данных</h2>
    </template>
  </div>
</template>

<script>
import Entries from "@/components/entries"
import MixinsLocals from "@/mixins/locals"
import ActionButtons from '@/components/action-buttons'
import { mapGetters, mapActions } from "vuex"
export default {
  name: "OperationDates",
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
          key: 'action',
          label: 'Действие',
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