<template>
    <div class="member-page">
        <el-card class="card">
            <h4 class="title">
                会员信息
            </h4>
            <div class="userinfo">
                <img  class="avator" :src="userinfo.uimage?file+userinfo.uimage:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3998214912,2861494530&fm=26&gp=0.jpg'" alt="">
                <div class="user-item"><span>昵称：</span><span>{{userinfo.uname}}</span></div>
                <div class="user-item"><span>电话：</span><span>{{userinfo.phone}}</span></div>
                <div class="user-item"><span>性别：</span><span>{{userinfo.sex}}</span></div>
                <div class="user-item"><span>会员编号：</span><span>{{userinfo.idcard}}</span></div>
            </div>
            <div class="btn">
                <el-button type="success" icon="el-icon-edit" plain @click="handleChange">修改信息</el-button>
            </div>
        </el-card>
        <el-card class="card">
            <h4 class="title">
                我的钱包
            </h4>
            <p class="top-ye"><span class="yuan">¥</span> 账户余额 <span class="price">1000</span>.00 元</p>
            <el-row :offect="10">
                <el-col :span="7">
                    <el-card >
                        <p>充值优惠</p>
                        <p style="color:blue">50元</p>
                        <p>售价 49.90</p>
                    </el-card>
                </el-col>
                <el-col :span="7" style="margin:0 10px">
                    <el-card>
                        <p>充值优惠</p>
                        <p style="color:blue">100元</p>
                        <p>售价 96.90</p>
                    </el-card>
                </el-col>
                <el-col :span="7">
                    <el-card>
                        <p>充值优惠</p>
                        <p style="color:blue">1000元</p>
                        <p>售价 899.90</p>
                    </el-card>
                </el-col>
            </el-row>
            <div class="btn">
               <el-button type="text">立即充值</el-button>
            </div>
        </el-card>
        <Modal
            :ruleForm="userinfo"
            :isShowModal="isShowModal"
            @modalCancel="modalCancel"
            @modalSure="modalSure"
        />
    </div>
</template>

<script>
import Modal from './changeUserInfo.vue'
import {changeUserinfo} from '../../api'
export default {
    data(){
        return{
            userinfo:{},
            isShowModal:false,
            file:'127.0.0.1:8089/'
        }
    },
    components:{
        Modal
    },
    mounted(){
        this.userinfo=JSON.parse(localStorage.getItem('userinfo'))
    },
    methods:{
        handleChange(){
            this.isShowModal=true
        },
        modalCancel(){
            this.isShowModal=false
        },
        modalSure(row){
            this.userinfo=row
            this.userinfo.uimage=row.imgUrl
            delete this.userinfo.uaccount
            changeUserinfo(this.userinfo).then(res=>{
                if(res.code==1){
                    localStorage.setItem('userinfo',JSON.stringify(res.data))
                    this.$store.commit('setNickName')
                    this.isShowModal=false
                }
            })

        },
    }
}
</script>
<style lang="less" scoped>
    .member-page{
        display: flex;
        .card{
            width: 50%;
            margin-right: 20px;
            /deep/ .el-card__body{
                h4{
                    text-align: center;
                    border-bottom: 1px dashed darkgoldenrod;
                    line-height: 50px;
                }
                .userinfo{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    justify-content: center;
                    text-align: center;
                    .avator{
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin: 30px auto;
                    }
                    .user-item{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 10px;
                        box-sizing: border-box;
                        line-height: 40px;
                        border: 1px dashed rgb(188, 180, 241);
                        border-radius: 10px;
                        font-size: 14px;
                        margin: 5px 0;
                    }
                }
                .top-ye{
                    line-height: 80px;
                }
                .yuan{
                    font-size: 22px;
                    font-weight: 600;
                }
                .price{
                    font-size: 24px;
                    font-weight: 700;
                }
            }
        }
    }
    .btn{
        line-height: 60px;
    }
</style>