<template>
  <div class="spec-preview" >
    <img  :src="skuImageList[index].imgUrl" />
    <div class="event" @mousemove="handler" ref="bigBox"></div>
    <div class="big" ref="big">
      <img :src="skuImageList[index].imgUrl"  />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        index:0
      }
    },
    methods: {
      handler(event){
        let mask = this.$refs.mask
        let bigBox = this.$refs.bigBox
        //offsetX 是当前鼠标距离绑定事件元素的盒子的x距离
        let left=event.offsetX-(mask.offsetWidth/2)
        let top=event.offsetY-(mask.offsetHeight/2)
        // console.log(top);
        console.log(bigBox.offsetWidth,'offsetWidth和offsetheight 分别是元素包括padding和border');

        if(event.offsetX<mask.offsetWidth/2) left=0 
        if(event.offsetX+mask.offsetWidth/2>bigBox.offsetWidth) left=mask.offsetWidth

        if(event.offsetY<mask.offsetHeight/2) top=0
        if(event.offsetY+mask.offsetHeight/2>bigBox.offsetHeight) top=mask.offsetHeight
        mask.style.left=left+'px'
        mask.style.top=top+'px'


        // console.log(event);
      }
    },
    created() {
      this.$bus.$on('emitIndex',(index)=>{
        this.index=index
          console.log(index,'form emit');
      })
    },
    props:{
      skuImageList:{
        type:Array,
        defalut:[]
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>