<template>
  <b-modal ref="modal">
    <template #modal-header>
      <h5>Подтвердите действие</h5>
    </template>

    <template #default>
      <p>Вы действительно хотите удалить запись?</p>
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
import { mapActions } from "vuex"
export default {
  name: 'RemoveItem',
  data() {
    return {
      storeName: '',
      id: null,
    }
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
