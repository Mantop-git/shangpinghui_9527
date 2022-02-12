<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="(floorItem,index) in getFloorList" :key="floorItem.id" :floorList='floorItem'></Floor>
    <!--商标-->
    <Brand />
    <TodayRecommend />
  </div>
</template>

<script>
  import Brand from "./Brand/Brand";
  import Floor from "./Floor/Floor";
  import Like from "./Like/Like";
  import ListContainer from "./ListContainer/ListContainer";
  import Rank from "./Rank/Rank";
  import TodayRecommend from "./TodayRecommend/TodayRecommend";
  import {mapState} from 'vuex'
  export default {
    name: "Home",
    components: {
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank,
      TodayRecommend,
    },
    data() {
      return {};
    },
    computed:{
      ...mapState({
      getFloorList(state){
        return state.home.floorList.data
      }
      })

    },
    mounted() {
      this.$store.dispatch("getFloorList");
      // this.$store.dispatch("getCategoryList");
      this.$store.dispatch('getUserInfo')
    },
  };
</script>

<style lang="less" scoped></style>
