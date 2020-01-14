<template>
    <div class="gloab">
        <div class="header">
            <div class="text">
            <button @click="tonum1()" class="a1"><div>长者跌倒监测<br>预警系统</div></button>
            <button @click="tonum2()" class="a2"><div>出入安全<br>综合管理系统</div></button><br>
            <button @click="tonum3()" class="a3"><div>中医体质辨识<br>健康测评系统</div></button>
            <button @click="tonum4()" class="a4"><div>长者健康监测<br>与管理系统<br>(待开发)</div></button>
            </div>
        </div>
         <div class="footer">
              <img class="img" src="../assets/banner.png" alt=""><br>
              <h3>上海中侨健康智能科技有限公司</h3>
         </div>
    </div>
</template>
<script>
export default {
    created(){
        //设置cookie
        if($.cookie('userId')=='' || $.cookie('userId')==null|| $.cookie('userId')=='null'){
            this.$router.push('login')
        }
    },
    methods:{
       
  
     

         tonum1(){
            this.$router.push("togo")
        },
         tonum2(){
             this.$router.push("logo")
        },
         tonum3(){
            this.$router.push("/")
        },
         tonum4(){
             this.$router.push("/")
        },
    },
    
}
</script>
<style scoped>
.gloab{
      width: 100%;
    
}

.footer>h3{
        text-align: center;
        line-height: 75px;
        color: green !important;
        font-size: 20px;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,10px);
    }
    .img{
       width:130px;
        height:130px;
     position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,-75px);
    }
     .text{
    width:700px;
        height:300px;
        position: relative;
       
        transform: translate(50%,-350px);
    }


  
    .img{
       width:130px;
        height:130px;
     position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,-75px);
    }
   
    .footer{
        height: 150px;
         position: relative;
    }
    .header{
          background-color:white;
          height: 700px; 
    }
    .a1,.a2,.a3,.a4{
        width:300px;
        height:220px;
       color: white !important;
        font-weight: bold;
        
    }
    .a1{
        position: absolute;
        top: 450px;
        left: 280px;
         background-color:#00a1e3;
        font-size:33px;
       
    }
    .a2{
        position: absolute;
        top: 450px;
        left: 600px;
         background-color:#00b198;
        font-size:33px; 
    }
    .a3{
         position: absolute;
        top: 680px;
        left: 280px;
         background-color:#395973;
        font-size:33px; 
    }
    .a4{
        position: absolute;
        top: 680px;
        left: 600px;
         background-color:#a6cb40;
        font-size:33px; 
    }
</style>