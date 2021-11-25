import helpers from "@/helpers"
const { FIELDS_DESC } = helpers

export default {
  data() {
    return {
      selectedEntry: [],
    }
  },
  methods: {
    onRowSelected(items, itemsNames) {
      this.selectedEntry = []
      const item = items[0]
      if (item) {
        for(let itemName of itemsNames) {
          this.selectedEntry.push(item[itemName])
        }
      }
    },

    removeItem(storeName, id) {
      this.$root.$emit('removeItem', storeName, id)
    },

    editItem(storeName, id, fieldsForEdit) {
      this.$root.$emit('editItem', storeName, id, fieldsForEdit)
    },

    addItem(storeName) {
      this.$root.$emit('addItem', storeName)
    },

    checkValid(key, value) {
      return FIELDS_DESC[key].regExp.test(value)
    },
  },
}