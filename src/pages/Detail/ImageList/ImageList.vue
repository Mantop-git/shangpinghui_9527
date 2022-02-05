<template>
  <div>
    <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id" >
          <img @click="isInto(index)" :class="{active:curIndex==index}" :src="item.imgUrl" />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import "swiper/css/swiper.css";
  export default {
    name: "ImageList",
    data() {
      return {
        curIndex:-1
      }
    },
    methods: {
      isInto(index){
        this.curIndex=index;
        this.$bus.$emit('emitIndex',index)
      }
    },
    props: ["skuImageList"],
    watch: {
      skuImageList: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.cur, {
              direction: "horizontal", // shuiping切换选项
              loop: false, // 循环模式选项
              autoplay: false, //自动切换

              slidesPerView: 4,//
              slidesPerGrop:1,//
              grid: {
                fill: "column",
                rows: 3,  
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

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
