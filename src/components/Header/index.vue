<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>

          <p v-if="!$store.state.user.userInfo.name" :key="key">
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <router-link to="/login">登录</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <router-link to="/login">登录</router-link> -->
          </p>
          <p v-else>
            <a>{{ $store.state.user.userInfo.name }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            v-model="keyWords"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="searchClick"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from "vuex";
  import { reqLogout } from "@/api";
  export default {
    name: "",
    data() {
      return {
        keyWords: "",
        key:1
      };
    },
    computed: {
      ...mapState(["count"]),
    },
    created() {
      this.$bus.$on("cleanHeaderKeywords", () => {
        this.keyWords = "";
      });
    },
    methods: {
      searchClick() {
        //最简单的传参数
        // this.$router.push('/search/'+this.keyWords+'?k='+this.keyWords.toUpperCase()) query:get传参 params:post传参
        //模板字符串
        // this.$router.push(`/search/${this.keyWords}?k=${this.keyWords.toUpperCase()}`)
        //对象传参  通过params传参要设置name 给路由起名字，不是组件内的名字
        this.$router.push({
          name: "Search",
          params: {
            name: "Search",
            keyword: this.keyWords,
          },
          // query: {
          //   categoryName: this.keyWords
          // },
        });
      },
      //退出登录
      async logout() {
        sessionStorage.removeItem("token");
        let res = await reqLogout();
        window.location.reload() //只能通过此方法重新渲染 ui
        this.$store.dispatch("getUserInfo");
        this.$nextTick(()=>{
          this.reRender()
        })
        console.log(res, "logoutt");
      },
      reRender(){
        this.$forceUpdate()
         this.key+=1
         
      }
    },
  };
</script>

<style lang="less" scoped>
  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }

    & > .bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>
