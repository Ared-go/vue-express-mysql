<template>
    <el-container class="home">
      <el-header class="header">
        <div class="logo">
          <img src="" alt="">
          <span>后台管理系统</span>
        </div>
        <el-button type="warning" plain @click="loginOff">退出</el-button>
      </el-header>
      <el-container>
            <el-aside :width="isCollapse ? '64px' : '150px'" class="aside">
            <div class="toggleButton" @click="toggle">|||</div>
            <el-col>
              <el-menu
                :default-active="this.$router.history.current.path"
                class="el-menu-vertical-demo"
                background-color="#444"
                text-color="#fff"
                active-text-color="#409EFF"
                :collapse="isCollapse"
                :collapse-transition="false"
                router>
                <!-- <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                </el-submenu> -->
                <!-- 这里的index 数据类型为字符串  id为数值型 所以需要转换 -->
                <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id">
                  <i :class="iconObj[item.id]"></i>
                  <span slot="title">{{item.listTag}}</span>
                </el-menu-item>
              </el-menu>
          </el-col>
          </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: false,
        menuList: [],
        iconObj: {
          '1': 'el-icon-s-marketing',
          '2': 'el-icon-user-solid',
          '3': 'el-icon-setting',
          '4': 'el-icon-s-custom'
        }
      }
    },
    created() {
      console.log(this.$router);
      this.getList();
      // this.deleteList();
    },
    methods: {
      loginOff() {
        // 清楚sessionStorage中的token
        window.sessionStorage.clear();
        console.log(this);
        // 将页面重定向到登录页面
        this.$router.push('/login');
      },
      async getList() {
         const {data: res} = await this.$http.get('/user/list');
         if(res.code!== 0) return this.$message.error('获取数据失败');
         this.menuList = res.data;
         console.log(this.menuList);
      },
      // deleteList() {
      //   this.$http.delete('/user/delete_list',{
      //     params: {
      //       id: 5
      //     }
      //   });
      // },
      toggle() {
        this.isCollapse = !this.isCollapse;
      }

    }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .header {
    height: 40px;
    background-color: #333;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .el-button {
      padding: 5px 10px;
    }
    .logo {
      span {
        color: #fff;
        // background-color: #fff;
      }
    }
  }
  .aside {
    background-color: #444;
    .el-menu {
      border-right: none;
    }
    .toggleButton {
      font-size: 15px;
      line-height: 30px;
      text-align:center;
      color: #fff;
      background-color: #000;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
  }
  .main {
    background-color: #eee;
  }
}
</style>
