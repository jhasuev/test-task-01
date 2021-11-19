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
  </div>
</template>

<script>
import Navbar from "@/components/navbar"
export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
</style>
