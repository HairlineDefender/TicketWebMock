<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="activeBar">
      <van-tabbar-item icon="home-o" to="home">主页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      activeBar: 0,
    };
  },
  mounted() {
    const routes = this.$route.path.split("/");
    const tab = routes[routes.length - 1].replace(/\?.*/g, "");
    this.activeBar = ["home", "mine"].indexOf(tab);
  },
};
</script>

<style></style>
