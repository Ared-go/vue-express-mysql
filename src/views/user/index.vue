<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <h2>用户管理页面</h2> -->
    <el-card>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="请输入内容" size="small" v-model="queryInfo.query" clearable @clear="getUser" @change="getUser" >
              <el-button slot="append" icon="el-icon-search" @click="getUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
             <el-button type="primary" size="small" @click ="addDialog">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="userData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            label="#">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="150px"
            >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色">
          </el-table-column>
          <el-table-column
            label="状态">
            <template v-slot="scope">
              <!-- {{scope.row}} -->
              <el-switch
              v-model="scope.row.msg_state">
              </el-switch>
            </template>
          </el-table-column>
           <el-table-column
            prop="role_name"
            label="操作"
            width="160px">
            <template v-slot="scope">
                <el-button type="primary" icon="el-icon-edit" circle  size="small" @click="editDialogUser(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="small" @click="removeUser(scope.row.id)"></el-button>
                <el-tooltip content="权限分配" placement="top" :enterable="false">
                  <el-button type="warning"  icon="el-icon-s-tools" circle size="small"></el-button>
                </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" 
          :current-page.sync="queryInfo.page"
          :page-sizes="[1,3,4, 5, 6]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card>
    <!-- 增加用户对话框 -->
    <el-dialog
      title="增加用户"
      :visible.sync="addVisible"
      width="50%"
      @close="addClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editVisible"
      width="50%"
      @close="editResetClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"user",
  data(){
  var checkemail = (rule,value,cb) => {
    // 验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if(regEmail.test(value)) {
      // 合法的邮箱  
      return cb();
    }
    cb(new Error('请输入合法的验证规则'));
  }
  var checkmobile = (rule, value,cb) => {
    const regMobile = /^1[3|4|5|7|8]\d{9}$/;
    if(regMobile.test(value)) {
      // 合法的电话
      return cb();
    }
    cb(new Error('请输入合法的手机号'));
  };
    return {
      userData: [],
      // 总条数
      total: 0,
      queryInfo: {
        query:'',
        page: 1,
        pagesize: 5
      },
      // 控制添加用户对话框的显示与隐藏
      addVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editVisible:false,
      addForm: {
        username:'',
        password:'',
        mobile:'',
        email:''
      },
      // 查询到的用户信息对象
      editForm: {},
      // 添加用户的表单验证对象
      addFormRules: {
        username: [
            { required: true, message: '请输入用户名称', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur'},
            { validator: checkemail, trigger: 'blur' }
        ],
        mobile: [
            { required: true, message: '请输入用户电话', trigger: 'blur'},
            { validator: checkmobile, trigger: 'blur' }
        ]
      },
      // 修改用户表单验证的对象
      editFormRules: {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur'},
            { validator: checkemail, trigger: 'blur' }
        ],
        mobile: [
            { required: true, message: '请输入用户手机号码', trigger: 'blur'},
            { validator: checkmobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUser();
    console.log('重新渲染页面了吗');
  },
  methods: {
    // 获取用户列表数据
    async getUser() {
      const {data:res} = await this.$http.get('/user/get_user',{params:this.queryInfo});
      console.log(res);
      if(res.code !== 0) return this.$message.error('获取数据失败');
      this.userData = res.data.userList;
      this.total = res.data.totalNum;
      // this.queryInfo.page = parseInt(res.data.page);
      // this.handleCurrentChange(this.queryInfo.page);
      // console.log(this.userData);
      // console.log(parseInt(res.data.page));
      // console.log(this.queryInfo.page);
    },
    // 页面尺寸发生变化时触发 // 每页多少
    handleSizeChange(newSize) {
      console.log('每页'+newSize);
      this.queryInfo.pagesize = newSize;
      console.log(this.queryInfo.pagesize);
      this.getUser();
    },
    // 当前页面发生变化时触发
    handleCurrentChange(current) {
      console.log('当前页'+current);
      this.queryInfo.page = current;
      console.log(this.queryInfo.page);
      this.getUser();
    },
    // 显示用户添加对话框
    addDialog() {
      this.addVisible = true
    },
    addClose() {
      // 重置表单项
      // console.log(this.$refs);
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      // 表单提交的预验证
      this.$refs.addFormRef.validate( async valid => {
        if(!valid) {
          // 表单验证失败
          return ;
        }
        // 表单验证成功 向服务器端发起请求
        const {data: res} = await this.$http.post('/user/add',this.addForm); 
        console.log(res);
        if(res.code !==0) return this.$message.error('添加数据失败');
        this.$message.success('添加数据成功');
        // 隐藏添加用户对话框
        this.addVisible = false;
        // 重新获取用户的数据
        this.getUser();
      });
    },
     // 修改用户
    async editDialogUser(id) {
      console.log(id);
      const {data: res} = await this.$http.get('/user/query_user',{params:{id:id}}); // {params:{id:id}}
      console.log(res);
      if(res.code !== 0) return this.$message.error('查询用户信息失败');
      this.editForm = res.data;
      this.editVisible = true;
      console.log(this.editForm);

    },
    // 重置修改用户对话框
    editResetClose(){
      console.log(this)
      this.$refs.editFormRef.resetFields();
    },
     editUserInfo() {
      this.$refs.editFormRef.validate( async valid => {
        if(!valid) return;
        const {data:res} =  await this.$http.put('/user/editeUser?id='+this.editForm.id,{email:this.editForm.email,mobile: this.editForm.mobile});
        if(res.code !== 0) {
          return this.$message.error('修改用户信息失败');
        }
        // 关闭对话框
        this.editVisible = false;
        // 重新渲染用户信息列表
        this.getUser();
        // 提示数据修改成功
        this.$message.success('修改用户信息成功');
      });
    },
   async removeUser(id) {
      // 弹框询问用户是否删除数据
       const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch( err => err)
        if(res !== 'confirm') {
          // 取消删除
          return this.$message.info('已取消删除');
        }
        const {data: result} = await this.$http.delete('/user/deleteUser?id='+id);
         if(result.code !== 0) {
          return this.$message.error('删除用户信息失败');
        }
        // 提示用户
        this.$message.success('删除用户信息成功');
        // 刷新数据
        this.getUser();
        console.log(result);
    }
  }
}
</script>
<style lang='less' scoped>
/*
.user {
    .el-card {
      box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
    }
}
*/


</style>