<template>
  <div class="box">
      <div class="login">
            <el-form ref="form" label-width="80px" status-icon :model="LoginForm" :rules="rules">
            <el-form-item label="用户名" prop="name">
                <el-input
                    ref="username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-s-custom"
                    v-model="LoginForm.name"
                    >
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    ref="password"
                    type="password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-key"
                    v-model="LoginForm.password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()" icon="el-icon-s-promotion">登录</el-button>
                <el-button type="info" @click="onReset()" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
            </el-form>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
    data(){
       return {
        LoginForm: {
          name: 'ared',
          password: '123456'
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
        if(this.LoginForm.name === '') {
            this.$refs.username.focus();
        }else if(this.LoginForm.password === '') {
            this.$refs.password.focus();
        } 
    },
    created() {
        // 创建一个axios实例对象
        // axios.create
    },
    methods: {
        onSubmit() {
            console.log(this.$refs);
            // 登录前的预验证 
            this.$refs.form.validate(async val => {
                // console.log(val);
                // console.log(obj);
                if(!val) return;
                // console.log('验证成功');
                const {data:res} = await this.$http.post('/user/login',this.LoginForm);
                if(res.code !== 0) {
                    return  this.$message.error('登录失败');
                }
                this.$message({
                    message: '登录成功',
                    type: 'success'
                });
                // console.log(res);
                window.sessionStorage.setItem('token',res.data.token);
                this.$router.push('/home');
            });
        },
        onReset() {
            console.log(this);
            this.$refs.form.resetFields();
        }

    }
}

</script>
<style lang='less' scoped>
.box {
        // background-color: rgba(238, 97, 97, 0.6);
        background-color: lightblue;
        position: relative;
        height: 100%;
        .login {
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        background-color: lightgreen;
        border: 3px solid #fff;
        border-radius: 70px;
        .el-form {
            margin: 30px;
        }
    }
}

</style>