<template>
  <div>
    <template v-if="!entry">
      <h6 class="text-center">Выберите счет...</h6>
    </template>
    
    <template v-else-if="!getFilteredOpEntry.length">
      <h6 class="text-center">Нет проводки по этому счету...</h6>
    </template>

    <template v-else>
      <h2 class="mb-3">Проводки по счету</h2>
      
      <b-table
        :fields="fields"
        :items="getFilteredOpEntry"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Entries",
  props: {
    entry: { type: String, default: "" },
    fieldsForFilter: { type: Array, default: () => [] },
  },
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
          label: 'Сумма проводки',
        },
      ],
    }
  },

  computed: {
    ...mapGetters([ 'getOpEntry' ]),
    
    getFilteredOpEntry() {
      return this.getOpEntry.filter(
        item => this.fieldsForFilter.some(field => item[field] === this.entry)
      )
    },
  },

  async created() {
    await this.loadFile('opEntry')
  },

  methods: {
    ...mapActions([ 'loadFile' ]),
  },

}
</script>