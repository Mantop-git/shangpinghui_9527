<template>
  <div>
    <!-- <div class="Router" style="width:222px;height:200px ">parms:参数----{{$route.param.keyWords}}</div>
            <div class="Router" style="width:222px;height:200px ">query:参数----{{$route.query.k}}</div> -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果{{ $route.params.keyWords }}</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="cleanRes">×</i>
            </li>
            <!-- 点击搜索后增加一个li，li的内容为你搜索的keyword -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="cleanParams">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="cleanTrademark">×</i>
            </li>
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{ prop.toString().split(":")[1] }}<i @click="cleanProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- <SearchSelector @trademarkInfo="trademarkInfo" /> -->
        <SearchSelector @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav" @click="changeActive">
                <li
                  @click="changeOrder('1')"
                  :class="currentActive == 'zonghe' ? 'active' : ''"
                >
                  <a data-Active="zonghe">
                    综合<i
                      v-if="currentActive == 'zonghe'"
                      class="iconfont"
                      :class="
                        searchParams.order.indexOf('desc') == -1
                          ? 'icon-paixushengxu'
                          : 'icon-jiangxu'
                      "
                    ></i
                  ></a>
                </li>
                <li
                  @click="changeOrder('2')"
                  :class="currentActive == 'jiage' ? 'active' : ''"
                >
                  <a data-Active="jiage"
                    >价格<i
                      v-if="currentActive == 'jiage'"
                      class="iconfont"
                      :class="
                        searchParams.order.indexOf('desc') == -1
                          ? 'icon-paixushengxu'
                          : 'icon-jiangxu'
                      "
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goodItem in searchGetter" :key="goodItem.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goodItem.id}`">
                      <img v-lazy="goodItem.defaultImg" />
                    </router-link>

                    <!-- <a href="item.html" target="_blank"
                      ><img :src="goodItem.defaultImg"
                    /></a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ &nbsp;</em>
                      <i>{{ goodItem.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goodItem.title">{{
                      goodItem.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapState } from "vuex";
  import { mapGetters, mapState } from "vuex";
  import SearchSelector from "./SearchSelector/SearchSelector";
  export default {
    name: "Search",
    components: {
      SearchSelector,
    },
    data() {
      return {
        searchParams: {
          //产品相应的id
          category1Id: "",
          category2Id: "",
          category3Id: "",
          //产品的名字
          categoryName: "",
          //搜索的关键字
          keyword: "",
          //排序:初始状态应该是综合且降序
          order: "1:desc",
          //第几页
          pageNo: 1,
          //每一页展示条数
          pageSize: 3,
          //平台属性的操作
          props: [],
          //品牌
          trademark: "",
        },
        currentActive: "zonghe",
        flag: true, //true jiangxu  moren jiangxu
      };
    },
    created() {
      this.$bus.$on("trademarkEvent", trademark => {
        if (trademark) {
          console.log(trademark, "是儿子的trademark,传过来了,oH Yeap");
        } else {
          console.log(trademark, "不是儿子的trademark,它没传过来");
        }
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        // console.log(this.searchParams.trademark);
        this.getSearchData();
      });
    },
    computed: {
      ...mapGetters(["searchGetter"]),
      // routeWatch(){
      //   return this.$route
      // }
      ...mapState({
        total(state) {
          return state.search.searchList.total;
        },
      }),
    },
    watch: {
      //直接可以监听到$reoute 不用加this
      $route: {
        handler(newValue, oldValue) {
          Object.assign(this.searchParams, this.$route.query, this.$route.params);
          this.getSearchData();

          this.searchParams.category1Id = "";
          this.searchParams.category2Id = "";
          this.searchParams.category3Id = "";

          console.log(this.searchParams, "searchParams");
        },
      },
    },
    //在组件挂载之前给searchParams赋值
    beforeMount() {
      let queryList = this.$route.query;
      let paramsList = this.$route.params;
      //通过Object.assign方法合并到一个对象
      Object.assign(this.searchParams, queryList, paramsList);
      //通过...的方法合并 合并的空属性值无
      // this.searchParams={
      //   ...queryList,
      //   ...paramsList
      // }

      console.log(queryList, paramsList, "search组件的beforeMouted");
    },
    mounted() {
      this.getSearchData();
    },
    methods: {
      getSearchData() {
        this.$store.dispatch("getSearchList", this.searchParams);
        //beforMounted 只执行一次，故searchParams的数据也只会更新一次,调用此方法在进行整理
      },
      //清除第一个面包屑
      cleanRes() {
        this.searchParams.categoryName = "";
        this.searchParams.category2Id = "";
        this.searchParams.category1Id = "";
        this.searchParams.category3Id = "";
        if (this.$route.params) {
          this.$router.push({
            name: "Search",
            params: this.$route.params,
          });
        }
        this.getSearchData();
      },
      //清除Params的keyword
      cleanParams() {
        this.$bus.$emit("cleanHeaderKeywords");
        this.searchParams.keyword = undefined;
        this.getSearchData();
        if (this.$route.query) {
          this.$router.push({
            name: "Search",
            query: this.$route.query,
          });
        }
      },
      //清除searchParams的trademark
      cleanTrademark() {
        this.searchParams.trademark = undefined;
        this.getSearchData();
        // this.$router.push({
        //   name:"Search"
        // })
      },
      //清除searchParams的props
      cleanProps(index) {
        this.searchParams.props.splice(index, 1);
        this.getSearchData();
      },

      //获取子组件SearchSelect传过来的平台售卖属性值----自定义事件
      attrInfo(attr, attrChil) {
        // console.log(attr,attrChil,'zizzzzzzzzzzzzzzzzzzzzzzzz');
        let propsArr = `${attr.attrId}:${attrChil}:${attr.attrName}`;
        // if(this.searchParams.props.includes(propsArr)==false){
        //   return this.searchParams.props.push(propsArr)
        // }

        this.searchParams.props.push(propsArr);
        //es6新的数据结构 set 成员值唯一
        this.searchParams.props = [...new Set(this.searchParams.props)];
        this.getSearchData();
      },

      changeActive(event) {
        let currentActive = event.target.dataset.active;
        this.currentActive = currentActive;
        // let index= event.target.dataset.index
        // let newOrder='1:decs'
        console.log(event);
        // if(index=='1'){
        //   newOrder=`${newOrder=='1:desc'?'1:asc':'1:desc'}`
        // }else{
        //   newOrder=`${}`
        // }
        console.log(this.currentActive);
      },
      changeOrder(flag) {
        console.log(flag);
        let originFlag = this.searchParams.order.split(":")[0]; //orginFlag=1
        let originSort = this.searchParams.order.split(":")[1];
        let newOrder;
        if (flag == originFlag) {
          //flag=1||2 originFlag=1||2 点击的是自身=》降序变升序
          newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        } else {
          //flag=2||1  点击的是另一个
          newOrder = `${flag}:${"desc"}`;
        }
        this.searchParams.order = newOrder;
        this.getSearchData();
      },
      getPageNo(pageNo) {
        //整理带给服务器参数
        this.searchParams.pageNo = pageNo;
        //再次发请求
        this.getSearchData();
      },

      //获取子组件SearchSelect传过来的trademark----自定义事件
      // trademarkInfo(trade){
      //   console.log(trade,'我是父组件看看有没有拿到儿子给的数据');
      // }
    },
  };
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
