<template>
    <div>
        <div class="card-title">
            预约订单：
        </div>
        <el-card v-if="list.length==0" style="width:100%;min-height:300px">
            暂无订单
        </el-card>
        <el-card class="card-item" v-for="(item,index) in list" :key="index" > 
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3998214912,2861494530&fm=26&gp=0.jpg" class="img-item" alt="">
            <div class="right">
                <p>{{item.title}}</p>
                <p style="color:rgba(0,0,0,0.4)">编号：{{item.bid}}</p>
                <p style="color:rgba(0,0,0,0.4)">联系人：{{item.uname}}--联系方式 ({{item.phone}})</p>
                <p class="status">预约日期：{{item.atime}}</p>
            </div>
        </el-card>
    </div>
</template>
<script>
import {orderPre} from '@/api'
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            const user = JSON.parse(localStorage.getItem('userinfo'))
            orderPre({
                uid:user.id
            }).then(res=>{
                if(res.code==1){
                    this.list = res.data
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
    .img-item{
        display: block;
        width: 100px;
        height: 90px;
        margin-right: 20px;
    }
    .card-title{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        font-weight: 700;
        font-size: 14px;
        text-align: center;
        padding-right: 30px;
    }
    .card-item{
        margin-bottom: 20px;
        /deep/ .el-card__body{
            display: flex;
            // justify-content: space-between;
            align-items: center;
            .right{
                font-size: 12px;
                line-height: 28px;
                .status{
                    color: #FE8724;
                }
            }
        }
    }
</style>