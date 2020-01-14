<template>
  <el-container style=" border: 1px solid #eee">
    <el-aside  width="17%" >
     <img class="img1" :src="img1" alt="">
      <el-menu>
        <el-submenu id='title' index="1" v-show="quan1==true">
          <template slot="title">
            <div  @click="xuanzhong(1)">
              <!-- <img src="../../assets/q1.png"  style="width:30px;height:30px;border:none;" alt=""> -->
               <i style="border:none;font-size:22px;" class="el-icon-s-custom"></i>
           
              系统账号
            </div>
          </template> 
        </el-submenu>
        <el-submenu id='title' index="2" v-show="quan2==true">
          <template slot="title">
            <div @click="xuanzhong(2)">
                 <i style="border:none;font-size:22px;" class="el-icon-video-camera-solid"></i>
              设备管理
            </div>
          </template>
        </el-submenu>
        <el-submenu id='title' index="3" v-show="quan3==true">
          <template slot="title">
            <div @click="xuanzhong(3)">
               <i style="border:none;font-size:22px;" class="el-icon-s-check"></i>
              长者管理
            </div>
          </template>
        </el-submenu>
        <el-submenu id='title' index="8" v-show="quan10==true">
          <template slot="title">
            <div @click="xuanzhong(10)">
               <i style="border:none;font-size:22px;" class="el-icon-s-finance"></i>
              访客管理
            </div>
          </template>
        </el-submenu>
       
        <el-submenu id='title' index="9" v-show="quan5==true">
          <template slot="title">
            <div @click="xuanzhong(5)">
                 <i style="border:none;font-size:22px;" class="el-icon-s-order"></i>
              菜单管理
            </div>
          </template>
        </el-submenu>
         <el-submenu id='title' index="10" v-show="quan6==true">
          <template slot="title">
            <div @click="xuanzhong(6)">
                  <i style="border:none;font-size:22px;" class="el-icon-s-unfold"></i>
              角色管理
            </div>
          </template>
        </el-submenu>
         <el-submenu id='title' index="4" v-show="quan4==true">
          <template slot="title">
            <div @click="xuanzhong(4)">
            <i style="border:none;font-size:22px;" class="el-icon-user-solid"></i>
              护理员管理
            </div>
          </template>
        </el-submenu>
        <el-submenu id='title' index="5" v-show="quan7==true">
          <template slot="title">
            <div @click="xuanzhong(7)">
                  <i style="border:none;font-size:22px;" class="el-icon-s-shop"></i>
              访客记录
            </div>
          </template>
        </el-submenu>
         
         

        <el-submenu id='title' index="6" v-show="quan8==true">
          <template slot="title">
            <div  @click="xuanzhong(8)">
                <i style="border:none;font-size:22px;" class="el-icon-s-data"></i>
              数据记录
            </div>
          </template>
        </el-submenu>

        <el-submenu id='title' index="7" v-show="quan9==true">
          <template slot="title">
            <div  @click="xuanzhong(9)">
             <i style="border:none;font-size:22px;" class="el-icon-s-marketing"></i>
              数据分析
            </div>
          </template>
        </el-submenu>

        <el-submenu id='title' index="11" v-show="quan11==true">
          <template slot="title">
            <div  @click="xuanzhong(11)">
              <i style="border:none;font-size:22px;" class="el-icon-s-tools"></i>
              系统设置
            </div>
          </template>
        </el-submenu>
      </el-menu>
     <div style="text-align:left;;margin-left:36px;margin-top:10px;font-size:17px;" >系统版本:V1.0</div>
      <div style="text-align:left;margin-left:36px;margin-top:5px;font-size:17px;color:#548C00;" >更新说明</div> 
    </el-aside>
    <el-container>
      <el-header style="font-size:25px;height:100px">
           <Body  style="width:100%;" ></Body>
      </el-header>
      <el-main>
       <xitong v-show="xuan===1"></xitong>
        <shebei v-show="xuan===2"></shebei>
        <zhangz v-show="xuan===3"></zhangz>
        <huli v-show="xuan===4"></huli>
        <caidan v-show="xuan===5"></caidan>
        <juese v-show="xuan===6"></juese>
        <fangke v-show="xuan===7"></fangke>
        <fkgu v-show="xuan===10"></fkgu>
         <sjjl v-show="xuan===8"></sjjl>
        <sjfx v-show="xuan===9"></sjfx>
        <shez v-show="xuan===11"></shez>
       
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {mapState} from 'vuex'
import xitong from './xitong'
import Body from './myheader'
import shebei from './shebei'
import zhangz from './zhangz'
import huli from './huli'
import caidan from './caidan'
import juese from './juese'
import fangke from './fangke'
import fkgu from './fkgu'
import shez from './shez'
import sjjl from './sjjl'
import sjfx from './sjfx'
  export default {
    components:{
      sjfx,
      sjjl,
      huli,
       shebei,
        xitong,
        Body,
        zhangz,
        caidan,
        juese,
        fangke,
        fkgu,
        shez
    },
    computed:{
        ...mapState(['http'])
    },
      provide() {
    return {
      reload: this.reload
    };
  },
    created(){
        if($.cookie('userId')=='' || $.cookie('userId')==null){
            this.$router.push('login')
        }
    },
    mounted(){
      var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+window.localStorage['token']).then(res=>{
            this.img1=this.http+"webdownload/picdownload?fileId=" +res.data.data.avatar+"&temp=1";

      });
      
      var url='role/getUserMenus/';
      this.axios.get(url+window.localStorage['token']).then(res=>{  
       
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='用户管理'){
           this.quan1=true;
         }if(this.arr[i].name=='设备管理'){
           this.quan2=true;
         }if(this.arr[i].name=='长者管理'){
           this.quan3=true;
         }if(this.arr[i].name=='护理员管理'){
           this.quan4=true;
         }if(this.arr[i].name=='菜单管理'){
           this.quan5=true;
         }if(this.arr[i].name=='角色管理'){
           this.quan6=true;
         }if(this.arr[i].name=='访客记录'){
           this.quan7=true;
         }if(this.arr[i].name=='数据记录'){
           this.quan8=true;
         }if(this.arr[i].name=='数据分析'){
           this.quan9=true;
         }if(this.arr[i].name=='访客管理'){
           this.quan10=true;
         }if(this.arr[i].name=='系统设置'){
           this.quan11=true;
         }
      }
      })
    },
    data() {
     return{
        isRouterAlive: true,
         xuan:1,
         arr:[],
         img1:'',
         quan1:false,
         quan2:false,
         quan3:false,
         quan4:false,
         quan5:false,
         quan6:false,
         quan7:false,
         quan8:false,
         quan9:false,
         quan10:false,
         quan11:false,
     }
    },
   
    methods:{
     
  reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
      xuanzhong(i){
        this.xuan=i
      },
     
    }
  };
</script>
<style scoped>

.img1{
  width: 200px;height: 200px;
  margin-left:50px;
}
  .el-menu{
    font-family: 'Typography';
    font-size: 19px;
  }
  
  li#title.el-submenu:hover{
    background-color: #73BF00 !important;
    z-index: 99999;
  }


  .el-header {
    color: #333;
    line-height: 60px;
    display:flex;
    border-bottom: 1px solid black;
    justify-content: space-between;
  }
  .el-aside {
    position: relative;
    color: #333;
  } 
</style>


