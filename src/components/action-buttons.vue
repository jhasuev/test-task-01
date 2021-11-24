<template>
  <div class="text-end">
    <b-button
      variant="danger"
      size="sm"
      class="mx-1"
      @click="removeItem(storeName, itemId)"
    >Удалить</b-button>

    <b-button
      variant="primary"
      size="sm"
      class="mx-1"
      @click="editItem(storeName, itemId, fieldsForEdit)"
    >Редактировать</b-button>
  </div>
</template>

<script>
import MixinsLocals from "@/mixins/locals"
export default {
  name: "ActionButtons",
  props: {
    storeName: { type: String, default: "" },
    itemId: { type: [Number, String], default: "" },
    fieldsForEdit: { type: [Array], default: () => [] },
  },
  mixins: [ MixinsLocals ],
}
</script>