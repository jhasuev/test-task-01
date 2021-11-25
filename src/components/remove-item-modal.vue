<template>
  <b-modal ref="modal">
    <template #modal-header>
      <h5 class="text-center flex-grow-1">Подтвердите действие</h5>
    </template>

    <template #default>
      <p class="text-center">Вы действительно хотите удалить эту запись?</p>
      <div
        v-for="(item, i) in getItems"
        :key="i"
      >
        <hr v-if="i != 0" class="my-2">
        <b>{{ item.label }}</b>:
        <div>{{ item.value }}</div>
      </div>
    </template>

    <template #modal-footer="{ cancel }">
      <b-button size="sm" @click="cancel()">
        Нет, оставить
      </b-button>
      <b-button size="sm" variant="danger" @click="remove()">
        Да, удалить
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import helpers from "@/helpers"
const { FIELDS_DESC } = helpers

export default {
  name: 'RemoveItem',
  data() {
    return {
      storeName: '',
      id: null,
      FIELDS_DESC,
    }
  },
  computed: {
    ...mapGetters(['getStoreItemByParams']),

    getItems() {
      const item = { ...this.getStoreItemByParams(this.storeName, this.id) }
      const fields = []
      for(let key in item) {
        fields.push({
          key,
          value: item[key],
          label: FIELDS_DESC[key]?.label,
        })
      }

      return fields.filter(field => field.key != 'id')
    },
  },
  created() {
    this.$root.$on('removeItem', this.open)
  },
  methods: {
    ...mapActions([ 'removeItem' ]),

    open(storeName, id) {
      this.storeName = storeName
      this.id = id

      this.$refs.modal.show()
    },

    remove() {
      this.removeItem({ storeName: this.storeName, id: this.id })
      this.$refs.modal.hide()
    },
  },
}
</script>
