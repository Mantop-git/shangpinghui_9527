<template>
  <div>
    <div class="cart" v-if="cartInfoList.length > 0">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul class="cart-list" v-for="(item, index) in cartInfoList" :key="item.id">
            <li class="cart-list-con1">
              <input
                type="checkbox"
                name="chk_list"
                :checked="item.isChecked"
                @click="changeCheck(cartInfoList[index], cartInfoList[index])"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="item.imgUrl" />
              <div class="item-msg">{{ item.skuName }}</div>
            </li>

            <li class="cart-list-con4">
              <span class="price">{{ item.skuPrice }}</span>
            </li>
            <li class="cart-list-con5">
              <a
                href="javascript:void(0)"
                class="mins"
                @click="changeNum('mins', -1, cartInfoList[index])"
                >-</a
              >
              <input
                autocomplete="off"
                type="text"
                :value="item.skuNum"
                minnum="1"
                class="itxt"
                @change="
                  changeNum(
                    'change',
                    $event.target.value * 1 - cartInfoList[index].skuNum
                  )
                "
              />
              <a
                href="javascript:void(0)"
                class="plus"
                @click="changeNum('add', 1, cartInfoList[index])"
                >+</a
              >
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
            </li>
            <li class="cart-list-con7">
              <a href="#none" class="sindelet" @click="deleteCart(item)">删除</a>
              <br />
              <a href="#none">移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input
            class="chooseAll"
            type="checkbox"
            :checked="isAllCheck"
            @click="chooseAll"
            ref="chooseAll"
          />
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteCart">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">
            已选择 <span>{{ isAllCheck ? cartInfoList.length : chosed }}</span
            >件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ total }}元</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn"  target="_blank" @click="$router.push('/trade')">结算</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="font-size: 24px; text-align: center">你还未添加商品购物车</div>
      <div style="font-size: 24px; text-align: center">
        <router-link to="/detail/2359">点击这里添加商品</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { reqChangeGoodsNum, reqDeleteCart } from "@/api";
  import _ from "lodash";
  export default {
    name: "ShopCart",
    data() {
      return {
        total: 0,
        chosed: 0,
      };
    },
    computed: {
      ...mapGetters(["cartInfoList"]),
      //计算商品总价
      totalPrice() {
        let total = 0;
        this.cartInfoList.map(item => {
          total += item.skuPrice * item.skuNum;
        });
        return total;
      },
      //isAllCheck全选
      isAllCheck() {
        let res;
        if (this.cartInfoList.length <= 0) {
          res = false;
        } else {
          res = this.cartInfoList.every(item => {
            return item.isChecked == 1;
          });
        }

        //  console.log(res);
        return res;
      },
      //已选择商品数量
      hasChoice() {
        let chosed = 0;
        this.cartInfoList.map(item => {
          if ((item.isChecked = 1)) {
            chosed++;
          }
          this.chosed = chosed;
          return chosed;
        });
        return chosed;
      },
    },

    watch: {
      totalPrice: {
        handler(newValue, oldValue) {
          this.total = this.totalPrice;
          // console.log(this.totalPrice,'dsaaaaaaaaaaa');
        },
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.$store.dispatch("getShopCartList");
      },
      //网络请求 购物车数据数量修改
      async changeGoodsNum(skuId, skuNum) {
        let res = await reqChangeGoodsNum(skuId, skuNum);
        console.log(res, "购物车数据数量修改");
      },

      //修改check
      changeCheck(curArr) {
        // console.log(curArr);
        //选中状态 => 未选中
        if (curArr.isChecked == 1) {
          curArr.isChecked = 0;
          this.total -= curArr.skuNum * curArr.skuPrice;
          this.chosed -= 1;
          // console.log(this.totalPrice);
        } else {
          this.total += curArr.skuNum * curArr.skuPrice;
          curArr.isChecked = 1;
          this.chosed += 1;
        }
      },
      //全选
      chooseAll(event) {
        //全选状态
        if (this.isAllCheck == true) {
          this.chosed=0
          this.cartInfoList.map(item => {
            item.isChecked = 0;
            this.total = 0;
            return item;
          });
        } else {
                            this.chosed=this.cartInfoList.length
          this.cartInfoList.map(item => {
            item.isChecked = 1;
            this.total = this.totalPrice;
            return item;
          });

        }

      },
      //+数量
      changeNum: _.throttle(async function (curNum, disNum, cart) {
        // curNum.skuNum += 1;
        switch (curNum) {
          case "add":
            disNum = 1;
            break;
          case "mins":
            disNum = cart.skuNum > 1 ? -1 : 0;
            break;
        }
        try {
          // if(cart.skuNum>=1)
          await this.$store.dispatch("getShopCateInfo", {
            skuId: cart.skuId,
            skuNum: disNum,
          });
        } catch (error) {
          console.log(error, "erron in shopCart.changeNum()");
        }
        //刷新页面
        this.getData();
      }, 800),
      //删除商品
      deleteCart: _.throttle(async function (cart) {
        let res = await reqDeleteCart(cart.skuId);
        // console.log(res);
        if (res.data.code == 200) {
          this.getData();
          return "ok";
        } else {
          return Promise.reject(new Error("fail"));
        }
      }, 1),
    },
  };
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
