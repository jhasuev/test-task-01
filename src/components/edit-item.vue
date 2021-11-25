<template>
  <b-modal ref="modal" body-bg-variant="light">
    <template #modal-header>
      <h5>Редактирование</h5>
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
          :state="checkValid(item.key, item.value)"
        />
        <b-form-invalid-feedback :id="`${i}-feedback`">
          <div v-html="FIELDS_DESC[item.key].invalidText" />
        </b-form-invalid-feedback>
      </div>
    </template>

    <template #modal-footer="{ cancel }">
      <b-button size="sm" @click="cancel()">
        Вернуться
      </b-button>
      <b-button size="sm" variant="primary" @click="edit()" :disabled="!canSave">
        Изменить
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import helpers from "@/helpers"
import MixinsLocals from "@/mixins/locals"

const { FIELDS_DESC } = helpers

export default {
  name: 'EditItem',
  mixins: [ MixinsLocals ],
  data() {
    return {
      storeName: '',
      id: null,
      fieldsForEdit: [],
      items: [],
      FIELDS_DESC,
    }
  },
  computed: {
    ...mapGetters(['getStoreItemByParams']),
    
    canSave() {
      return !this.items.some(item => !this.checkValid(item.key, item.value))
    },
  },
  mounted() {
    this.$root.$on('editItem', this.open)
  },
  methods: {
    ...mapActions([ 'editItem' ]),

    open(storeName, id, fieldsForEdit) {
      this.storeName = storeName
      this.id = id
      this.fieldsForEdit = fieldsForEdit
      this.createFieldsForEdit()

      this.$refs.modal.show()
    },

    edit() {
      if (!this.canSave) {
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

      this.editItem({
        items,
        storeName: this.storeName,
        id: this.id,
      })
      this.$refs.modal.hide()
    },

    createFieldsForEdit() {
      const fields = { ...this.getStoreItemByParams(this.storeName, this.id) }
      this.items = Object.keys(fields).reduce((acc, key) => {
        if (this.fieldsForEdit.includes(key)) {
          acc.push({ key, value: fields[key] })
        }

        return acc
      }, [])
    },
  },
}
</script>
