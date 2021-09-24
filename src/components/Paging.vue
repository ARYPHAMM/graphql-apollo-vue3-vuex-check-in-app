<template>
  <div class="max-w-7xl flex w-full justify-center my-5">
    <div class="flex">
      <router-link
        v-if="paging.allPage != 0"
        class="block mx-1 bg-black text-white px-2 py-1 shadow-sm rounded-md"
        :to="{
          path: route.path,
          query: {
            page:
              route.query.page == null && route.query.page >= 2
                ? route.query.page - 1
                : 1,
          },
        }"
      >
        <i class="fas fa-chevron-left    "></i>
      </router-link>
      <router-link
        v-for="(page, index) in paging.allPage"
        :key="index"
        :class="
          `block mx-1 ${
            page == route.query.page || (route.query.page == null && page == 1)
              ? 'bg-blue-800'
              : 'bg-black'
          } text-white font-semibold px-2 py-1 shadow-sm rounded-md`
        "
        :to="{ path: route.path, query: { page: page } }"
        >{{ page }}</router-link
      >

      <router-link
        v-if="paging.allPage != 0"
        class="block mx-1 bg-black text-white px-2 py-1 shadow-sm rounded-md"
        :to="{
          path: route.path,
          query: {
            page:
              route.query.page == null && route.query.page <= paging.allPage
                ? route.query.page + 1
                : paging.allPage,
          },
        }"
      >
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  props: ["paging"],
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<style></style>
