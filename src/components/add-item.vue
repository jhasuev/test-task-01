<template>
  <b-modal ref="modal" body-bg-variant="light">
    <template #modal-header>
      <h5>Добавление записи</h5>
    </template>

    <template #default>
      <div
        v-for="(item, i) in items"
        :key="i"
        class="mb-3"
      >
        <label class="mb-1">{{ FIELDS_DESC[item.key].label }}</label>
        <b-form-input
          :id="`${i}`"
          v-model="item.value"
          @input="item.typed = true"
          :state="!item.typed || checkValid(item.key, item.value)"
        />
        <b-form-invalid-feedback v-if="item.typed" :id="`${i}-feedback`">
          {{ FIELDS_DESC[item.key].invalidText }}
        </b-form-invalid-feedback>
      </div>
    </template>

    <template #modal-footer="{ cancel }">
      <b-button size="sm" @click="cancel()">
        Вернуться
      </b-button>
      <b-button size="sm" variant="primary" @click="add()" :disabled="!canAdd">
        Добавить
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex"
import helpers from "@/helpers"
import MixinsLocals from "@/mixins/locals"

const { FIELDS_DESC, STORE_COLUMNS } = helpers

export default {
  name: 'EditItem',
  mixins: [ MixinsLocals ],
  data() {
    return {
      storeName: '',
      fieldsForAdd: [],
      items: [],
      FIELDS_DESC,
      STORE_COLUMNS,
    }
  },
  computed: {
    canAdd() {
      return !this.items.some(item => !this.checkValid(item.key, item.value))
    },
  },
  mounted() {
    this.$root.$on('addItem', this.open)
  },
  methods: {
    ...mapActions([ 'addItem' ]),

    open(storeName) {
      this.storeName = storeName
      this.fieldsForAdd = STORE_COLUMNS[storeName]

      this.createFieldsForAdd()
      this.$refs.modal.show()
    },

    add() {
      if (!this.canAdd) {
        return
      }

      const items = this.items.reduce((acc, item) => {
        let val = item.value
        if (FIELDS_DESC[item.key].type) {
          val = FIELDS_DESC[item.key].type(val)
        }
        acc[item.key] = val
        return acc
      }, {})

      this.addItem({
        items,
        storeName: this.storeName,
      })
      this.$refs.modal.hide()
    },

    createFieldsForAdd() {
      this.items = this.fieldsForAdd.reduce((acc, key) => {
        acc.push({
          key,
          value: "",
          typed: false,
        })

        return acc
      }, [])
    },
  },
}
</script>
