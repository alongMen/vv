<template>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="resetForm">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                <el-form-item label="用户名" prop="uname">
                    <el-input v-model="ruleForm.uname"></el-input>
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
                <el-form-item label="是否会员" prop="isvip">
                    <el-radio-group v-model="ruleForm.isvip">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="btns">
                    <el-button @click="resetForm"  size="small">取消</el-button>
                    <el-button type="primary" @click="handleSub('ruleForm')"  size="small">确定</el-button>
                </div>
            </el-form>
</el-dialog>
</template>
<script>

export default {
    props:{
        ruleForm:{
            type:Object,
            default:()=>{}
        },
        isShowModal:{
            type:Boolean,
            default:()=>false
        }
    },

    computed:{
            dialogVisible:{
                get: function () { return this.isShowModal } ,
                set: function (val) { }
            }
        },
    data() {
      return {
        imageUrl:'',
        rules: {
           phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        }
      };
    },
    watch:{
      userinfo(val){
        this.imageUrl=val.uimage
      }
    },
    methods: {
      handleSub(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('modalSure',this.ruleForm)
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.dialogVisible=false
        this.$emit('modalCancel')
      },
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
    }
  }
</script>
<style lang="less" scoped>
.register {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    .register-box{
        margin: 100px auto;
        width: 600px;
        position: relative;
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
            display: flex;
            justify-content: flex-end;
        }
        .tips{
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
}
</style>