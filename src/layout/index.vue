<template>
  <gt-layout>
    <template slot="logo">
      <logo />
    </template>
    <template slot="setting">
      <router-link to="/">
        <el-dropdown-item>其他</el-dropdown-item>
      </router-link>
    </template>
    <template slot="navbar-dropdown">
      <span />
      <router-link to="/">
        <el-dropdown-item>Welcome</el-dropdown-item>
      </router-link>
    </template>
  </gt-layout>
</template>
<script>
import Layout from '@framework/layout';
import logo from './components/logo';

export default {
  components: {
    GtLayout: Layout,
    logo
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>
