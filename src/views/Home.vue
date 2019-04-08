<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <Breadcrumb />
        </el-header>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/components/main.vue';
import Sidebar from '@/components/sidebar/index.vue';
import Breadcrumb from '@/components/breadcrumb.vue';

@Component({
  components: {
    Main,
    Sidebar,
    Breadcrumb
  },
})
export default class Home extends Vue {}
</script>
