<template>
  <div class="pageMain">
    <transition name="fade-page" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade-page" mode="out-in">
      <router-view v-if="!$route.meta.noCache"></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>
