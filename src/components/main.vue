<template>
  <div id="main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Main extends Vue {}
</script>

<style lang="less" scoped>
#main {
  overflow: hidden;
}
</style>