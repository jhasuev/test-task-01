<template>
  <div>
    <template v-if="!compareItems.length">
      <h6 class="text-center">Выберите запись...</h6>
    </template>
    
    <template v-else-if="!getFilteredItems.length">
      <h6 class="text-center">Нет данных по выбранному записи...</h6>
    </template>

    <template v-else>
      <h2 class="mb-3">{{ header }}</h2>
      
      <b-table
        :fields="fields"
        :items="getFilteredItems"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "Entries",
  props: {
    header: { type: String, default: "Таблица данных" },
    items: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    
    // данные для сравнения 
    compareItems: { type: Array, default: () => [] },
    compareFields: { type: Array, default: () => [] },
  },

  computed: {
    getFilteredItems() {
      return this.items.filter(
        item => this.compareFields.some(
          field => this.compareItems.includes(item[field])
        )
      )
    },
  },

}
</script>