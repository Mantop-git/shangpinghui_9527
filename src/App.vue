<template>
  <div>
    <Header v-show="$route.meta.isShow"></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  export default {
    name: "",
    components: {
      Header,
      Footer,
    },
    data() {
      return {};
    },
    //app.vue根组件 中的mounted只执行一次
    mounted() {
      //组件一渲染完成就发送请求将数据存在vuex小仓库
        //只有组件才有this，路由对象
      this.$store.dispatch("getCategoryList");
    },
  };
</script>

<style lang="less" scoped></style>
