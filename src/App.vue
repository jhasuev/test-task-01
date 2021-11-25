<template>
  <div>
    <navbar />
    <b-container class="py-3">
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
    
    <remove-item-modal />
    <edit-item-modal />
    <add-item-modal />
  </div>
</template>

<script>
import Navbar from "@/components/navbar"
import RemoveItemModal from "@/components/remove-item-modal"
import EditItemModal from "@/components/edit-item-modal"
import AddItemModal from "@/components/add-item-modal"
export default {
  name: 'App',
  components: {
    Navbar,
    RemoveItemModal,
    EditItemModal,
    AddItemModal,
  },
}
</script>

<style>
</style>
