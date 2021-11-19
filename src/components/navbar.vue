<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="px-3">
    <b-navbar-toggle target="nav-collapse" class="my-2" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item
          v-for="route, i in routesList"
          :key="i"
          :active="route.name === $route.name"
          :to="{ name: route.name }"
        >{{ route.label }}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      routesList: [
        {
          name: 'bills',
          label: 'Счета',
        },
        {
          name: 'operation-dates',
          label: 'Операционные дни',
        },
        {
          name: 'operations',
          label: 'Операции',
        },
      ],
    }
  },
}

</script>