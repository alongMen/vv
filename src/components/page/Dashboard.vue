<template>
    <div>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,index) in list" :key="index">
                <img :src="item.path" alt="" class="img-item">
            </el-carousel-item>
        </el-carousel>

        <div class="shopping" >
            <h4 class="shop-title">美容项目</h4>
            <div class="content">
                <el-card v-if="listShop.length==0" style="width:100%;min-height:300px">
                    暂无商品
                </el-card>
                <el-card class="card-item" v-for="(item,index) in listShop" :key="index">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3998214912,2861494530&fm=26&gp=0.jpg" alt="">
                <p class="title-c">{{item.title}}</p>
                <p>{{item.content}}</p>
                <div class="b-btn"><span class="price">¥ 40</span> <span class="el-icon-phone-outline pre-btn" @click="handletoPre(item)"></span> <span class="el-icon-shopping-cart-2 icon-b" @click="handleCar(item)"></span></div>
            </el-card>
            </div>
        </div>

        <el-dialog
        title="预约日期"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="预约时间" >
                <el-date-picker
                v-model="form.atime"
                        type="date"
                        format="yyyy-MM-DD"
                        value-format="yyyy-MM-DD"
                        placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {getShopList,toCar,toPre} from '@/api'
export default {
    name: 'dashboard',
    data() {
        return {
           list:[
               {id:1,path:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3700418193,2142331164&fm=26&gp=0.jpg'},
               {id:2,path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3378311526,2072946968&fm=26&gp=0.jpg'},
               {id:3,path:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3998214912,2861494530&fm=26&gp=0.jpg'}
           ],
           listShop:[],
           dialogVisible:false,
           form:{}
        };
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            getShopList().then(res=>{
                if(res.code==1){
                    this.listShop = res.data
                }
            })
        },
        handletoPre(row){
            this.form=row
            this.dialogVisible=true
        },
        submitForm(formName) {
            const user = JSON.parse(localStorage.getItem('userinfo'))
            this.$refs[formName].validate((valid) => {
            if (valid) {
                toPre({
                    sid:this.form.id,
                    uid:user.id,
                    atime:this.form.atime
                }).then(res=>{
                    if(res.code==1){
                        this.dialogVisible=false
                        this.$message.success('预约成功!')
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
        handleCar(row){
            const user = JSON.parse(localStorage.getItem('userinfo'))
            this.$prompt('确认购买,请填写数量?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder:'购买数量'
            }).then(({ value }) => {
            toCar({
                sid:row.id,
                uid:user.id,
                buystock:parseInt(value),
                price:'36.56'
            }).then(res=>{
                if(res.code==1){
                    this.$message.success(res.msg)
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        }
    }
};
</script>


<style scoped lang="less">
.img-item{
    display: block;
    width:100%;
    height: 100%;
}
.shopping{
    margin-top: 20px;
    .content{
        width: 100%;
        display: flex;
    }
    .shop-title{
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
        color: #FE8724;
    }
    .card-item{
        width: 200px;
        height: 304px;
        box-sizing: border-box;
        margin-right: 15px;
        margin-bottom: 15px;
        /deep/ .el-card__body{
            padding: 10px;
            .title-c{
                font-weight: 700;
            }
        }
        img{
            width: 180px;
            height: 150px;

        }
        p{  
            display: inline-block;
            text-overflow: -o-ellipsis-lastline;
            line-height: 40px;
            height: 50px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .b-btn{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .price{
                color: #FE8724;
            }
            .icon-b{
                padding-right: 10px;
                color: red;
                cursor: pointer;
                &:hover{
                    color: salmon;
                }
            }
            .pre-btn{
                color: tan;
                cursor: pointer;
                &:hover{
                    color: red;
                }
            }
        }
    }
}
</style>
