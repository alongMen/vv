<template>
    <div class="register">
        <el-card class="register-box">
            <div class="register-title">注册</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="uname">
                    <el-input v-model="ruleForm.uname"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="uaccount">
                    <el-input v-model="ruleForm.uaccount"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="uimage">
                    <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8089/upload/uploadFile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="`http://127.0.0.1:8089/${imageUrl}`" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="btns">
                    <el-button @click="resetForm('ruleForm')" type="info" round class="btn" size="small">重置</el-button>
                    <el-button type="warning" round @click="toSubmit('ruleForm')" class="btn" size="small">立即注册</el-button>
                </div>
                <div class="tips">
                    <el-link type="primary" href="/login">去登录？</el-link>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import {registerMember} from '@/api'
export default {
    data() {
      return {
        ruleForm: {},
        imageUrl: '',
        rules: {
          uname: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          uaccount: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.imageurl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      toSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.uimage=this.imageUrl
            registerMember(this.ruleForm).then(res=>{
                if(res.code==1&&res.data){
                  this.$message.success(res.msg+'去登录')
                  this.$router.push({path:'/login'})
                }else{
                  this.$message.error(res.msg)
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
.register {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgb(188,197,160);
    overflow: auto;
    .register-box{
        margin: 100px auto;
        width: 600px;
        position: relative;
        background: rgb(247,230,200);
        border-radius: 10px;
        .register-title{
            width: 100%;
            color: blueviolet;
            font-weight: 700;
            text-align: center;
            padding: 10px 0;
            font-size: 22px;
        }
        .btns{
            width: 100%;
            // height: 50px;
            display: flex;
            justify-content: space-around;
            .btn{
                width: 100px;
            }
        }
        .tips{
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
