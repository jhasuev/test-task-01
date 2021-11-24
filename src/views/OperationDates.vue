<template>
  <div>
    <h2 class="mb-3" >
      <template v-if="getOpDate.length">Операционные дни</template>
      <template v-else>Нет данных</template>
    </h2>

    <b-table
      v-if="getOpDate.length"
      :fields="fields"
      :items="getOpDate"
      select-mode='single'
      selectable
      @row-selected="onRowSelected($event, [ 'OpDate' ])"
      class="mb-5"
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
            @click="removeItem('opDate', data.item.id)"
          >Удалить</b-button>

          <b-button
            variant="primary"
            size="sm"
            class="mx-1"
            @click="editItem('opDate', data.item.id, ['OpDate'])"
          >Редактировать</b-button>
        </div>
      </template>
    </b-table>

    <entries
      v-if="getOpDate.length"
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