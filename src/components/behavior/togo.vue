<template>
    <div class="logo">
        <el-container>
        <el-header>
            <div  class="shijian">
                <span style="font-size:20px;color:white;width:150px;">{{riqi}}</span><br>
                <span style="font-size:35px;color:white;">{{sj}}</span>
            </div>
            <div style="text-align:center;color:white;margin-top:30px;font-size:40px;">{{title}}长者跌倒监测预警系统</div>
            <div  @click="toass()"><el-button style="margin-left:1500px;font-size:20px" type="primary" >后台管理</el-button></div>
        </el-header>
        <el-main style="margin-top:130px;">
            <el-row>
            <el-col :span="5">
                <div>
                    <div style="text-align:left;color:white;margin-top:50px;font-size:30px;display:inline;margin-left:20px;">人脸智能识别</div>
                  <ul>
                      <li v-for="(t,i) of list" :key='i' style="text-align:center;color:white;font-size:20px;padding-top:20px;list-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{t.value}}<br><span style="margin-left:48px;;">{{t.sex}}</span></li>
                  </ul>
                </div>
            </el-col>
            <el-col :span="14" style="text-align:center;">
                <div style="text-align:center;color:white;font-size:30px;margin-top:-20px;">行为监测</div>
                <div style="margin-top:20px;">
            <div style="width:30%;height:206px;float:left;font-size:20px"><img style="width:100%;height:85%"  @load="imageLoaded1()" :src="img1"  alt="">5楼活动室1</div>
                   <div style="width:30%;height:206px;float:left;font-size:20px;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded2()" :src="img2"  alt="">5楼活动室2</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded3()" :src="img3"  alt="">5楼活动室3</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;"><img style="width:100%;height:85%" @load="imageLoaded4()" :src="img4"  alt="">5楼走廊东</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded5()" :src="img5"  alt="">5楼走廊中</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded6()" :src="img6"  alt="">5楼走廊西</div> 

                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;"><img style="width:100%;height:85%" @load="imageLoaded7()" :src="img7"  alt="">5楼电梯入口</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded8()" :src="img8"  alt="">5楼电梯出口</div>
                <div style="width:30%;height:206px;float:left;font-size:20px;margin-top:20px;;margin-left:10px;"><img style="width:100%;height:85%" @load="imageLoaded9()" :src="img9"  alt="">1楼电梯出口</div> 
              <!--<img style="width:33%;height:206px;float:left;border:none;" :src="img8"  alt="">
               <img style="width:33%;height:206px;float:left;border:none;" :src="img7"  alt="">
                <img style="width:33%;height:206px;float:left;border:none;" :src="img9 "  alt=""> -->
                </div>
            </el-col>
            <el-col :span="5">
                <div style="text-align:center;color:white;font-size:30px">风险信息提示</div>
               <ul>
                   <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n1}}</li>
                    <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n2}}</li>
                     <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n3}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n4}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n5}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n6}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n7}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n8}}</li>
                      <li  style="text-align:left;color:white;font-size:20px;padding-top:20px;padding-left:60px;list-style:none;">{{n9}}</li>
               </ul>
                </el-col>
            </el-row>
        </el-main>
        </el-container> 
    </div>
</template>
<script>
import axios from 'axios'

import $ from 'jquery'
import { Message } from 'element-ui'

import {mapState} from 'vuex'
  export default {
    data () {
      return { 
        img8:'',
         img7:'',
         img9:'',
        
         img6:'',
         img5:'',
          n1:1,
          n2:1,
          n3:1,
          n4:1,
          n5:1,
          n6:1,
           n7:1,
          n8:1,
          n9:1,
         img4:'',
         img3:'',
         img2:'',
         img1:'',
         timer:null,
      title:'',
      sj:'',
          riqi:'',
          list:[{value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},
          {value:'张少芬',sex:'女'},{value:'张少芬',sex:'女'},],
      }
    },
    updated(){
     
    },
     computed:{
        ...mapState(['http'])
    },
    created(){
               this.timer= setInterval(()=>{
                this.gettime();
                this.imggeng1();
                this.imggeng2();
                this.imggeng3();
                this.imggeng4();
                this.imggeng5();
                this.imggeng6();
                this.imggeng7();
                this.imggeng8();
                this.imggeng9();
        },1000)
        
    },
   mounted(){    
    var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+window.localStorage['token']).then(res=>{
            this.title=res.data.data.name
    })
   },
    methods:{
        //图片加载完成之后
        imageLoaded1(){
            this.imggeng1();
            this.n1++
        },
         imageLoaded2(){
            this.imggeng2();
            this.n2++
        },
         imageLoaded3(){
            this.imggeng3();
            this.n3++
        },
         imageLoaded4(){
            this.imggeng4();
            this.n4++
        },
         imageLoaded5(){
            this.imggeng5();
            this.n5++
        },
         imageLoaded6(){
            this.imggeng6();
            this.n6++
        },
         imageLoaded7(){
            this.imggeng4();
            this.n7++
        },
         imageLoaded8(){
            this.imggeng5();
            this.n8++
        },
         imageLoaded9(){
            this.imggeng6();
            this.n9++
        },
        //定时器加载
     /*   timer1(){
            //console.log(22)
        this.timer= setInterval(() => {
            this.imggeng();
          
        },5000)
      
        },*/
        imggeng1(){
            var url="webdownload/getName";
            var http=this.http;
            this.axios.get(url).then(res=>{
               
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                     imggeng1()
                 }else{ this.img1=this.http+'webdownload/testdownload?'+'path='+res.data[0];}
                
                 //console.log(this.img1);
                
             }
            })
             },
             imggeng2(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                     imggeng2()
                 }else{this.img2=this.http+'webdownload/testdownload?'+'path='+res.data[1];}
                 //console.log(this.img1);
                 
               
             }
            })
             },
              imggeng3(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                     imggeng3()
                 }else{  this.img3=this.http+'webdownload/testdownload?'+'path='+res.data[2];}
               
                 
             }
            })
             },
              imggeng4(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                    imggeng4()// this.imageLoaded4()
                   
                 }else{this.img4=this.http+'webdownload/testdownload?'+'path='+res.data[3];}
                 
             }
            })
             },
               imggeng5(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                     imggeng5()// this.imageLoaded4()
                     
                 }else{this.img5=this.http+'webdownload/testdownload?'+'path='+res.data[4];}
                 
             }
            })
             },
               imggeng6(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                      imggeng6()// this.imageLoaded4()
                   
                 }else{this.img6=this.http+'webdownload/testdownload?'+'path='+res.data[5];}
                 
             }
            })
             },
              imggeng7(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                      imggeng7()// this.imageLoaded4()
                   
                 }else{this.img7=this.http+'webdownload/testdownload?'+'path='+res.data[1];}
                 
             }
            })
             },
              imggeng8(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                      imggeng8()// this.imageLoaded4()
                   
                 }else{this.img8=this.http+'webdownload/testdownload?'+'path='+res.data[1];}
                 
             }
            })
             },
              imggeng9(){
            var url="webdownload/getName"
            this.axios.get(url).then(res=>{
                
             for(var i=0;i<res.data.length;i++){
                 if(res.data[i]=="D:/GunsPic/camera/admin.jpg"){
                      imggeng9()// this.imageLoaded4()
                   
                 }else{this.img9=this.http+'webdownload/testdownload?'+'path='+res.data[1];}
                 
             }
            })
             },
            //var acc=Math.ceil(Math.random()*999);//1000000000%9
          //  this.img9='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=9'+'&arr='+acc;
            //this.img1='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=1'+'&arr='+acc;
            //this.img2='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=2'+'&arr='+acc;
           // this.img3='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=3'+'&arr='+acc;
           // this.img4='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=4'+'&arr='+acc;
           // this.img5='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=5'+'&arr='+acc;
            //this.img6='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=6'+'&arr='+acc;
           // this.img7='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=7'+'&arr='+acc;
          //  this.img8='http://192.168.0.106:8090/webdownload/tbdownload?'+'temp=8'+'&arr='+acc;
            //console.log(acc)
       
        //获取时间
      gettime:function(){
      this.time=true
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      let str = "周" + "日一二三四五六".charAt(new Date().getDay());
      _this.riqi= yy+'-'+mm+'-'+dd+' '+str;
    _this.sj=hh+':'+mf+':'+ss;
    },
        toass(){
            this.$router.push('home')
           
        },
    },
     beforeDestroy() {
           
    //clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
  }
    }   
</script>
<style scoped>
        .shijian{
            position: absolute;
            top:4%;left:3%;
            color: white;
            z-index: 999999999999999;
        }
      .logo{
                background-image:url(../../assets/qwe2.png);
               
                background-size:'100% 100%';
                position:relative;
                width: 100%;
                height: 100%;
                
            }
            .el-row {
            margin-bottom: 20px;
            height: 800px;
            }
            .el-col {
                border-radius: 4px;
            }     
</style>