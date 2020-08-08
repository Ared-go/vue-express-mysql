<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>这是角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="roleList"
        style="width: 100%"
        border
        stripe
        >
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row type="flex" justify="center">
                <el-col :span="7" >
                  <el-tag> {{scope.row.authName}}</el-tag>
                </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"
        label="#">
        </el-table-column>
        <el-table-column
        prop="roleName"
        label="角色名称"
        >      
        </el-table-column>
        <el-table-column
        prop="roleDesc"
        label="角色描述"
        > 
        </el-table-column>     
      </el-table> 
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      roleList: []
    }
  },
  created() {
    this.divRights();
  },
  methods: {
    async divRights() {
      const {data: res} = await this.$http.get('/right/divRights');
      console.log(res);
      if(res.code !== 0) return this.$message.error('获取数据失败');
      this.roleList = res.data;
    }
  }
}

</script>
<style lang='less' scoped>
</style>