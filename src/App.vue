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
    
    <remove-item />
    <edit-item />
    <add-item />
  </div>
</template>

<script>
import Navbar from "@/components/navbar"
import RemoveItem from "@/components/remove-item"
import EditItem from "@/components/edit-item"
import AddItem from "@/components/add-item"
export default {
  name: 'App',
  components: {
    Navbar,
    RemoveItem,
    EditItem,
    AddItem,
  },
}
</script>

<style>
</style>
