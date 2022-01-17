<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{categoryListCop}}</h1> -->
    <div class="container">
      <h2 class="all" @mouseenter="isShowCate" @mouseleave="isShowLeave">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" @mouseleave="isShowLeave" v-show="isShow">
        <div class="all-sort-list2">
          <div
            class="item bo"
            v-for="(item1, index) in categoryListCop"
            :key="item1.categoryId"
            @click="toSearch"
          >
            <h3
              @mouseenter="getCurrentIndex(index)"
              :class="index == currentIndex ? 'backColor' : ''"
              @mouseleave="leaveIndex"
              :data-categoryname="item1.categoryName"
              :data-category1Id="item1.categoryId"
            >
              <a
                :data-categoryname="item1.categoryName"
                :data-category1Id="item1.categoryId"
                >{{ item1.categoryName }}</a
              >
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="(item2, index2) in item1.categoryChild"
                :key="item2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a
                      :data-categoryname="item2.categoryName"
                      :data-category2Id="item2.categoryId"
                      >{{ item2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em
                      v-for="(item3, index3) in item2.categoryChild"
                      :key="item3.categoryId"
                    >
                      <a style="cursor:pointer;"
                        :data-categoryname="item3.categoryName"
                        :data-category3Id="item3.categoryId"
                        >{{ item3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  //import _ from "lodash";   //全局导入
  import { throttle } from "lodash";
  export default {
    name: "TypeNav",
    data() {
      return {
        currentIndex: -1,
        isShow: true,
      };
    },
    mounted() {
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    computed: {
      ...mapState({
        //categoryList计算属性的名称  state是vuex大仓库里面的数据
        categoryListCop(state) {
          console.log(state, "state IN Component of TypeNav");
          return state.home.categoryList.data;
        },
      }),
    },
    methods: {
      getCurrentIndex: throttle(function (index) {
        // console.log(index, "indasdsa"); 看有没有实现节流
        this.currentIndex = index;
        this.isShow = true;
      }, 50),

      leaveIndex() {
        this.currentIndex = -1;
      },
      isShowCate() {
        this.isShow = true;
      },
      isShowLeave() {
        if (this.$route.path !== "/home") {
          this.isShow = false;
        }
      },

      //点击跳转到search组件
      toSearch(event) { 
        /*这个函数写到最外立面是关键，这样里面的元素都能接受监听，
        而给了data-属性 的元素点击后就能拿到值传给后台。如果是我写：给那三级一人一个函数，分别拿到对应的id*/
      console.log('点击这个大区域都会触发点击事件');
        let targetDataset = event.target;
        console.log(targetDataset);
        let {
          categoryname,
          category1Id,
          category2Id,
          category3Id,
        } = targetDataset.dataset;
        console.log(category1Id);
        //典型的通过data-自定义属性来获取路由传参，在微信小程序也应用广泛
        
        if (categoryname) {
          let path = { name: "Search" };
          let query = { categoryName: categoryname };

          if (category1Id) {
            query.category1Id = category1Id;
          } else if (category2Id) {
            query.category2Id = category2Id;
          } else {
            query.category3Id = category3Id;
          }
          console.log(path, query);
          path.query = query;
          this.$router.push(path);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        ::-webkit-scrollbar {
          /*隐藏滚轮*/
          display: none;
        }

        .all-sort-list2 {
          max-height: 450px;
          overflow: auto;

          .backColor {
            background: #f4c3c5;
            border-radius: 5px;
          }
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>
