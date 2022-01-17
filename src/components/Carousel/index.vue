<template>
  <div>
    <div
      class="swiper-container"
      @mouseenter="showBtn = true"
      @mouseleave="showBtn = false"
      ref="cur"
      id="floor1Swiper"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev swiper-button-pink" v-show="showBtn"></div>
      <div class="swiper-button-next swiper-button-pink" v-show="showBtn"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import "swiper/css/swiper.css";
  export default {
    name: "Carousel",

    data() {
      return {
        showBtn: false,
      };
    },
    mounted() {
      // this.showBtn=false
    },
    methods: {},
    props: ["list"],
    watch: {
      list: {
        //无论监听是否触发，我都先触发一次
        immediate: true,
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.cur, {
              direction: "horizontal", // shuiping切换选项
              loop: true, // 循环模式选项
              autoplay: true, //自动切换

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          });
        },
      },
    },
  };
</script>

<style lang="less" scoped></style>
