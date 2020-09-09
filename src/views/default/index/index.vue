<template>
  <div style="padding: 20px;">欢迎来到{{ title }}！</div>
</template>

<script>
import { Settings } from '@/config';

export default {
  name: 'index',
  data() {
    return {
      title: Settings.title
    };
  }
};
</script>

<style scoped>

</style>
