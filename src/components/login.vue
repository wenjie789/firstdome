<template>
    <div class="gloab">
        <el-row>
        <el-col :span="12">
            <div>
            <img src="../assets/login.png" alt="" class="img">
            </div>
        </el-col>

        <el-col  :span="12">
           <div class="gloab2">
             <div class="font">中侨智慧健康养老平台<span id='banben'> V1.0</span></div>
        <div class="input">
            <el-input class="input1" v-model="uname" type="text" placeholder="账号"></el-input>
            <br>
            <el-input class="input1" v-model="upwd" type="password" placeholder="密码"></el-input>
            <br>
            <el-button class="btn" type="success" @click="toindex()">登录</el-button>
        </div>
        <div class="footer">
            <img class="img2" src="../assets/banner.png" alt=""> <span class="span">上海中侨健康智能科技有限公司</span>      
        </div>
        </div>
        </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            uname:"",
             upwd:"",
        }
    },
    methods:{
        toindex(){
             var ureg=/^[a-z0-9]{3,12}$/i;
             var preg=/^[0-9]{3,16}$/;
             var u=this.uname;
             var p=this.upwd; 
             if(ureg.test(u)==false){
                    this.$message("账号格式错误");
                    return
             }
             if(preg.test(p)==false){
                 this.$message("密码格式错误");
                 return
             }
             var url="login";
             
             axios.post(url+'?'+'username='+u+'&'+'password='+p).then(result=>{
                  console.log(result)
                 if(result.data.status==200){

                   window.localStorage['token']=result.data.object.id;  
                   	
                    $.cookie('userId', result.data.object.id, { expires: 7 });
                    this.$router.push("/index")
                    console.log(result)
                 }else{
                      this.$message("账户密码错误")
                 }
                 
             })
        }
    }
}
</script>
<style scoped>
#banben{
     font-size:21px;
}
    .gloab2{
        max-width:100%;
        width:'expression(this.width>100%?"800px":this.width)';
        width:'expression(this.width<100%?"800px":this.width)';
        max-height:900px;
        height:'expression(this.height>365px?"365px":this.height)';
        overflow:hidden;
    }
    .img2{
        width:40px;
        height:30px;
        position: absolute;
        right:50%;
        bottom: 50%;
        margin-right: 143px;
        margin-bottom: -15px;
        overflow:auto
    }
    .footer{
        font-size:20px;
        color:greenyellow;
        position: relative;
        text-align: center;
        margin-left:200px; 
        margin-top:200px; 
    }
    .input{
       text-align: center;
       margin-top: 50px;
        margin-left:200px; 
    }
    .input1,.btn{
        width: 400px;
        margin-top: 15px;
        border-radius: 5px;
    }
    .font{
        font-size:40px;
        color: aliceblue;
        text-align: center;
        margin-top:200px; 
        margin-left:200px; 
    }
    .img{
    max-width:100%;
    width:'expression(this.width>100%?"800px":this.width)';
    width:'expression(this.width<100%?"800px":this.width)';
    max-height:900px;
    height:'expression(this.height>365px?"365px":this.height)';

    overflow:hidden;
    margin-top:150px; margin-left:70px;
    }

    
    .gloab{
        background-color:#0099ff;
        width:100%;
        height:900px; 
        
    }
</style>
