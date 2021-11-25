import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "bills",
    },
    {
      path: "/bills",
      name: "bills",
      component: () => import("@/views/Bills")
    },
    {
      path: "/operation-dates",
      name: "operation-dates",
      component: () => import("@/views/OperationDates")
    },
    {
      path: "/operations",
      name: "operations",
      component: () => import("@/views/Operations")
    },
  ],
})
