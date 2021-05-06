<template>
    <div>
        <div class="card-title">
            <span class="img-item">商品</span>
            <span style="width:120px">商品名</span>
            <span>单价</span>
            <span style="width:120px">数量</span>
            <span>合计</span>
            <span style="width:100px">操作</span>
        </div>
        <el-card v-if="list.length==0" style="width:100%;min-height:300px">
            暂无数据
        </el-card>
        <el-card class="card-item" v-for="(item,index) in list" :key="index">
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3998214912,2861494530&fm=26&gp=0.jpg" class="img-item" alt="">
            <p>{{item.title}}</p>
            <p>¥ 3</p>
            <el-input-number v-model="item.buystock" :min="1" :max="1000" label="数量"></el-input-number>
            <p>¥ {{item.price}}</p>
            <div style="width:100px;display:flex;justify-content: space-around;">
                <i class="el-icon-delete btn-del" @click="handle"></i>
                <i class="el-icon-sell btn-buy" @click="handle"></i>
            </div>
        </el-card>
    </div>
</template>
<script>
import {orderCar} from '@/api'
export default {
    data(){
        return{
            num:2,
            list:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            const user = JSON.parse(localStorage.getItem('userinfo'))
            orderCar({uid:user.id}).then(res=>{
                if(res.code==1){
                    this.list=res.data
                    console.log(res.data)
                }
            })
        },
        handle(){
            this.$$message.error('该功能暂未开放!')
        }
    }
}
</script>
<style lang="less" scoped>
    .img-item{
        display: block;
        width: 90px;
        height: 75px;
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
            justify-content: space-between;
            align-items: center;
        }
        .btn-del{
            cursor: pointer;
            color: red;
            &:hover{
                color: salmon;
            }
        }
        .btn-buy{
            cursor: pointer;
            color: sandybrown;
            &:hover{
                color: slateblue;
            }
        }
    }
</style>