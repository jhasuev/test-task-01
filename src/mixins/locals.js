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
  },
}