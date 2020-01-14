<template>
    <div class="logo">
        <el-container>
        <el-header class="header">
           <div  class="shijian">
                <span style="font-size:20px;color:white;">{{riqi}}</span><br>
                <span style="font-size:35px;color:white;">{{sj}}</span>
            </div>
            <div style="text-align:center;color:white;margin-top:50px;font-size:40px"><span>{{title}}</span>出入安全综合管理系统</div>
            <div ><el-button class="top-btn" style="font-size:20px;margin-top:-30px;" type="primary"  @click="toass()">后台管理</el-button></div>
        </el-header>
        <el-main>
            <el-row>
            <el-col :span="5">
               <!-- <div v-show="xians1" style="text-align:center;color:green;font-size:30px;margin-top:200px;">{{title}}<br>欢迎您！</div> -->
               <div v-show="xians1" style="text-align:center;color:green;font-size:40px;padding-top:200px;padding-left:10px;">
                 <div :v-model="hyc1">{{hyc1}}</div>
                  <div :v-model="hyc2">{{hyc2}}</div>
               </div>
              <div v-show="xians2">
                    <div  :v-model="Qname" style="text-align:center;color:green;font-size:40px;margin-top:100px;">{{Qname}}</div>
                    <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">{{title}}欢迎您回家</div>
                </div>
                <div v-show="fangke">
                    <div  :v-model="Qname" style="text-align:center;color:green;font-size:40px;margin-top:100px;">{{Qname}}</div>
                    <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">{{title}}感谢您</div>
                     <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">拜访{{tump}}{{tsex}}</div>
                </div>
                  <div v-show="lindao">
                    <div  :v-model="Lname" style="text-align:center;color:green;font-size:40px;margin-top:100px;">{{Lname}}</div>
                    <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">欢迎{{Ldw}}领导</div>
                     <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">莅临指导！</div>
                </div>
                <!-- <div v-show="xians4">
                    <div  :v-model="Fname" style="text-align:center;color:green;font-size:30px;margin-top:100px;">{{Fname}}</div>
                    <div  style="text-align:center;color:green;font-size:30px;margin-top:10px;">欢迎您！</div>
                </div> -->
                <div v-show="xians3">
                    <div :v-model="pname"  style="text-align:center;color:red;font-size:40px;margin-top:100px;">{{pname}}</div>
                    <div style="text-align:center;color:red;font-size:40px;margin-top:40px;">请配合人员登记!</div>
                </div>
            </el-col>
            <el-col :span="14" id='el2'>
              <div class="camera_outer" >
            <video  id="videoCamera"  width="100%" height="500px" autoplay>
            </video>
          <canvas style="border:2px solid green;display:none;" id="fice" :width="ficeWidth" :height="ficeHeight" ></canvas>
              <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" >
            </canvas>
           <!--<el-button class="btn" type="primary" @click="stopNavigator()">关闭摄像头</el-button>
            <button @click="stopNavigator()">关闭摄像头</button>
        　　<button @click="setImage()">拍照</button>
            <button @click="tijiao()">提交</button>-->
            </div>
            <div class="marquee_box">
            <ul class="marquee_list" :class="{marquee_top:animate}">
                <li style="color:red" v-for="(t,i) of marqueeList" :key="i">
                    {{t}}
                </li>
            </ul>
        </div>
         <div class="marquee_box" style="margin-top:-20px;">
            <ul class="marquee_list" :class="{marquee_top:animate}">
                <li style="color:yellow" v-for="(t,i) of marqueeList11" :key="i">
                    {{t}}
                </li>
            </ul>
        </div>
           <!--  <div>        
               <ul class="line">
                <li v-for="(t,i) of zhangzesl" :key="i" style="margin-top:0px;color:red;display:block ">{{t}}</li>
               <li :v-model="zhangzesl"  style="margin-top:0px;color:red;display:block ">{{zhangzesl}}</li>
              </ul>     
            </div>-->   

            </el-col>
           <el-col :span="5"  id='el3'>
                     
              <div> 

                    <div v-show="lindao">
                    <div  :v-model="Lname" style="text-align:center;color:green;font-size:40px;margin-top:100px;">{{Lname}}</div>
                    <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">欢迎{{Ldw}}领导</div>
                     <div  style="text-align:center;color:green;font-size:40px;margin-top:10px;">莅临指导！</div>
                </div>
                 <div v-show="xians1"  style="text-align:center;color:green;font-size:40px;margin-top:200px;">
                    <div :v-model="hyc1">{{hyc1}}</div>
                  <div :v-model="hyc2">{{hyc2}}</div>
                 </div>
                
               <div v-show="xians5">
             <div v-show="xians3">
               
                 <div style="text-align:center;color:white;font-size:33px">{{title1}}信息</div>
                   
                     <div>
                      <el-radio-group v-model="radio3" >
                      <el-radio-button style="width:100px;height:27px;"  label="长者"></el-radio-button>
                      <el-radio-button style="width:100px;height:27px;"  label="访客"></el-radio-button>
                    </el-radio-group>
                    </div>
                    
                    <div v-if="radio3=='长者'">
                      
                     <div style="text-align:left;color:white;font-size:25px;padding-top:20px;">
                          长者姓名:<input v-model="Zname" type="text" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者性别:<el-select class="item-choose" v-model="Zsex" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:15px;">
                       长者年龄:<el-select class="item-choose" v-model="Zage" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr11"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者房间:<input v-model="Zfj" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                      陪同家属:<input v-model="Zjs" style="font-size:20px;height:27px;width:200px" >
                    </div>
                   
                  
                    </div>
                    <div v-else style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         家属姓名:<input v-model="Fname" style="font-size:20px;height:27px;width:200px">
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                            家属手机:<input v-model="Fphone" style="font-size:20px;height:27px;width:200px">
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Fzname" style="font-size:20px;height:27px;width:200px">
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者房间:<input v-model="Froom" style="font-size:20px;height:27px;width:200px" >
                        </div>
                    </div>
                </div>


                <div v-show="xians2">
                 <div style="text-align:center;color:white;font-size:33px">{{title1}}信息</div>
                     <div style="text-align:left;color:white;font-size:20px;padding-top:10px;margin-left:20px;">
                      <el-radio-group v-model="radio3" >
                      <el-radio-button style="width:200px;height:27px;"  label="长者"></el-radio-button>
                      <el-radio-button style="width:150px;height:27px;"  label="访客"></el-radio-button>
                    </el-radio-group>
                    </div>
                    
                    <div v-if="radio3=='长者'">
                     <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Zname" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者性别:<el-select class="item-choose" v-model="Zsex" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者年龄:<el-select class="item-choose" v-model="Zage" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr11"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者房间:<input v-model="Zfj" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                      陪同家属:<input v-model="Zjs" style="font-size:20px;height:27px;width:200px" >
                    </div>
                     
                  
                    </div>
                    <div v-else style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         <div style="text-align:left;color:white;font-size:25px;padding-top:20px;">
                         家属姓名:<input v-model="Fname" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                            家属手机:<input v-model="Fphone" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Fzname" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者房间:<input v-model="Froom" style="font-size:20px;height:27px;width:200px" >
                        </div>
                    </div>
                </div>
                
                 <div v-show="xians4">
                 <div style="text-align:center;color:white;font-size:33px">{{title1}}信息</div>
                     <div style="text-align:left;color:white;font-size:20px;padding-top:10px;margin-left:20px;">
                      <el-radio-group v-model="radio3" >
                      <el-radio-button style="width:200px;height:27px;"  label="长者"></el-radio-button>
                      <el-radio-button style="width:150px;height:27px;"  label="访客"></el-radio-button>
                    </el-radio-group>
                    </div>
                    
                    <div v-if="radio3=='长者'">
                     <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Zname" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者性别:<el-select class="item-choose" v-model="Zsex" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者年龄:<el-select class="item-choose" v-model="Zage" style="font-size:20px;height:27px;width:205px">
                            <el-option 
                                v-for="(item,index) in sexarr11"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者房间:<input v-model="Zfj" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                      陪同家属:<input v-model="Zjs" style="font-size:20px;height:27px;width:200px" >
                    </div>
                  
                  
                    </div>
                    <div v-else style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         家属姓名:<input v-model="Fname" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                            家属手机:<input v-model="Fphone" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Fzname" style="font-size:20px;height:27px;width:200px" >
                        </div>
                        <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者房间:<input v-model="Froom" style="font-size:20px;height:27px;width:200px" >
                        </div>
                    </div>
                </div>
                </div>
                <!--     -->
                
                 
               <div v-show="xians6">
                  <div style="text-align:center;color:white;font-size:33px">{{title2}}信息</div>
                <div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Zname" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者房间:<input v-model="Zfj" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       陪同家属:<input v-model="Zjs" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:20px;padding-top:10px;margin-left:20px;">
                      <el-radio-group v-model="radio1" >
                      <el-radio-button style="width:200px;height:27px;"  label="出院"></el-radio-button>
                      <el-radio-button style="width:150px;height:27px;"  label="入院"></el-radio-button>
                    </el-radio-group>
                    
                    </div>
                    <div v-if="radio1=='出院'">
                     <div style="text-align:left;color:white;font-size:25px;padding-top:15px;">
                       计划返回:<el-date-picker style="width:201px"
                                v-model="Zjsj"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       手机号码:<input v-model="Zphone" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    </div>
                    <div v-else style="text-align:left;color:white;font-size:25px;padding-top:15px;">
                         电梯卡号:<input v-model="Zdt" style="font-size:20px;height:27px;width:200px" >
                    </div>
              
                </div>
                </div>
                
               <div v-show="xians7">
                  <div style="text-align:center;color:white;font-size:33px">{{title3}}信息</div>
                <div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                        访客姓名:<input v-model="Fname" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                          长者姓名:<input v-model="Fzname" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       长者房间:<input v-model="Froom" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    <div style="text-align:left;color:white;font-size:20px;padding-top:20px;margin-left:10px;">
                      <el-radio-group v-model="radio2" >
                      <el-radio-button style="width:100px;height:27px;"  label="出院"></el-radio-button>
                      <el-radio-button style="width:150px;height:27px;"  label="入院"></el-radio-button>
                    </el-radio-group>
                    
                    </div>
                    <div v-if="radio2=='入院'">
                     <div style="text-align:left;color:white;font-size:25px;padding-top:15px;">
                       计划离开:<el-date-picker style="width:205px"
                                v-model="Fjh"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                       电梯卡号:<input v-model="Fdt" style="font-size:20px;height:27px;width:200px" >
                    </div>
                     <div  style="text-align:left;color:white;font-size:25px;padding-top:10px;">
                         手机号码:<input v-model="Fphone" style="font-size:20px;height:27px;width:200px" >
                    </div>
                    </div>
                   
                  <div v-else style="text-align:left;color:white;font-size:25px;padding-top:15px;">
                       电梯卡号:<input v-model="Fdt" style="font-size:20px;height:27px;width:200px" >
                    </div>
                </div>
                </div>
                <div id='div' v-show='paiz'  style="text-align:left;color:white;font-size:25px;padding-top:20px;">
                      
                      <img :src="Zphoto" alt="" style="width:200px;height:120px;border:none;">
                       <!-- <img   src="https://192.168.0.105:7443/webdownload/picdownload?fileId=8e4ed955ad8f440ea4151f907f1d5d1e.png&temp=2"> -->
                    </div>
              <!--  <el-button style="margin-left:150px;margin-top:25px;" type="primary" v-if='uname'  @click="handleAdd()">确定</el-button> -->
                <div v-show="xians3"><el-button style="margin-top:25px;font-size:20px;width:200px" type="success"   v-if="radio3=='长者'"  @click="cleat1()">录入登记</el-button>
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"   v-if="radio3=='访客'"  @click="cleat2()">录入登记</el-button></div>
                 <div v-show="xians9">
                  <el-button class="btnP" style="font-size:20px;margin-top:10px;width:200px" type="success"   v-if="radio3=='长者'"    @click="quxiao1()">拍照</el-button>
                <el-button class="btnP" style="font-size:20px;margin-top:10px;width:200px" type="success"   v-if="radio3=='访客'"   @click="quxiao2()">拍照</el-button></div>
             <!-- 长者-->    
                <div v-show="xians4">
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"   v-if="radio1=='出院'"  @click="cleat3()">确定</el-button>
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"   v-if="radio1=='入院'"  @click="cleat4()">确定</el-button>
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"    v-if="radio1=='出院'"   @click="quxiao3()">拍照</el-button>
                </div>
            <!-- 访客-->
                <div v-show="xians8">
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"   v-if="radio2=='入院'" @click="cleat5()">确定</el-button>
                <el-button style="margin-top:10px;font-size:20px;width:200px" type="success"   v-if="radio2=='出院'"  @click="cleat6()">确定</el-button>
                </div>
                  <div v-show="xians10">
                <el-button class="btnP" style="font-size:20px;margin-top:10px;width:200px;margin-left:0px !important;" type="success"    v-if="radio2=='入院'"   @click="quxiao3()">拍照</el-button>
                </div>

                 </div>

                </el-col>
            </el-row>
       
       
           
        </el-main>
        </el-container>
        
       
    </div>

</template>
<script>

 

import axios from 'axios'
import {mapState} from 'vuex'
// base64转文件
import $ from 'jquery'


import { Message } from 'element-ui'
var newData;
var yanglaoyuan;
var a;
var b;
var c;
var d;
           
  export default {
    data () {
      return { 
        hyc1:'',
        hyc2:'',
        //领导
        lindao:false,
        Lname:'',
        Ldw:'',
        tsex:'',
        tump:'',
        Zphoto:'',
        zmos:'',
        fmos:'',
        qmos:'',
        qu:false,
          animate: false,
        marqueeList:[],
        marqueeList11:[],
        Qname:'',
        sexarr:['男','女'],
        sexarr11:[50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,
        72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
        //show
        paiz:false,
        xians1:false,
        xians2:false,
        xians3:false,
        xians4:false,
        xians5:false,
         xians6:false,
         xians7:false,
         xians8:false,
          xians9:false,
          xians10:false,
        rxians:'',
        ZZname:'',
        Pname:'',

        radio1: '出院',
        radio2: '出院',

        radio3: '长者',

        Zjsj:'',
        Zname:'',
         Zage:'',
          Zsex:'',
           Zfj:'',
            Zjs:'',
            Zfsj:'',
             Zphone:'',
              Zdt:'',
               
      //访客
        Fname:"",
        Fphone:"",
        Froom:"",
        Fzname:"",
        Fdt:'',
        Fjh:'',


        photoid:'',
        remarks:'',
       
        pname:'',
        title1:'人员',
        title2:'长者',
        title3:'访客',
       fangke:false,
        zhangzesl:'',
        fangkesl:'',
        arr:[],
        title:'',
        imageUrl: '',
        timer:null,
        time:false,
        time1:false,
      riqi:'',
      sj:'',
       sj1:'',
       sj2:'',
        videoWidth: 800,
        videoHeight: 500,
        ficeHeight: '',
        ficeWidth: '',
        ficetop: '',
        ficeleft: '',
        imgSrc: '',
        thisfice: null,
        thistite: null,
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        loadingSub:'',
        list:[],
        
      }
    },
    updated(){
     
    },
    computed:{
        ...mapState(['http'])
    },
    created(){
      this.lunbo();
      setInterval(this.showMarquee, 2000);
       setInterval(this.showMarquee11, 2000);
      this.time= setInterval(()=>{
                this.gettime();
                
        },1000)},
   mounted(){
    //  this.timeq= setInterval(()=>{
    //             this.lunbo();
    //     },1000)

      //this.xunhuan();
      var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+window.localStorage['token']).then(res=>{
  this.title=res.data.data.name;
  yanglaoyuan=res.data.data.name;
  })
    this.getCompetence()
    // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      // 修改数据date
      this.setImage();
      this.tijiao();
    }, 500)
    },
    methods:{
      quxiao3(){
        this.paiz=true;
         clearInterval(this.timer);
           var http=this.http;
         let vm = this;
         $.post(http+"file/finalUpload", {base64Data:vm.imgSrc,temp:3,top:c,left:d,width:b,height:a,}, function(data){
             console.log(data)
             if(data.status==200){
               vm.qmos=data.msg;
                 vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=6";
      //          vm.nextTick(function(){
      //          vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=2";
      // });
               /* console.log(data.msg)
                console.log(http)*/
             }
            }, "JSON"
        ).catch(err=>{console.log(err)})
          
        //长者拍照
      },
    quxiao1(){
      this.paiz=true;
         clearInterval(this.timer);
           var http=this.http;
         let vm = this;
         $.post(http+"file/finalUpload", {base64Data:vm.imgSrc,temp:1,top:c,left:d,width:b,height:a,}, function(data){
             console.log(data)
             if(data.status==200){
               vm.zmos=data.msg;
                 vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=2";
      //          vm.nextTick(function(){
      //          vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=2";
      // });
               /* console.log(data.msg)
                console.log(http)*/
             }
            }, "JSON"
        ).catch(err=>{console.log(err)})
          
        //长者拍照
      },
      //访客拍照
      quxiao2(){
        this.paiz=true;
     //  clearInterval(this.timer);
       clearInterval(this.timer);
           var http=this.http;
         let vm = this;
         $.post(http+"file/finalUpload", {base64Data:vm.imgSrc,temp:2,top:c,left:d,width:b,height:a,}, function(data){
             console.log(data)
             if(data.status==200){
               vm.fmos=data.msg;
                 vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=5";
      //          vm.nextTick(function(){
      //          vm.Zphoto=http+"webdownload/picdownload?fileId="+data.msg+"&temp=2";
      // });
               /* console.log(data.msg)
                console.log(http)*/
             }
            }, "JSON"
        ).catch(err=>{console.log(err)})
      },
       showMarquee: function () {
                this.animate = true;
                setTimeout(()=>{
                this.marqueeList.push(this.marqueeList[0]);
                this.marqueeList.shift();
                this.animate = false;
            },500)},
            showMarquee11: function () {
                this.animate = true;
                setTimeout(()=>{
                this.marqueeList11.push(this.marqueeList11[0]);
                this.marqueeList11.shift();
                this.animate = false;
            },500)},
      lunbo(){
        var url='visitorrecord/selectByTime';
         this.axios.get(url).then(res=>{
           this.marqueeList=res.data.list;
           this.marqueeList11=res.data.object;
          // console.log(this.marqueeList)
          /*  var arr=[];
            arr=res.data.list;
            var b=0;
            for(var i=0;i<=arr.length-1;){
              if(b<=i){
                this.zhangzesl=arr[b];
                  b++;
                  console.log(b)
                 
                 i++
                 }
            }*/
            
          // this.zhangzesl=res.data.list;
          // console.log( this.zhangzesl)
          //   this.zhangzesl=[''];
          //   var arr=res.data.list;
          //   var b=0;
          // for(var i=0;i<arr.length;i++){
          //   if(b!=arr.length-1){
          //     b++;
          //    return  this.zhangzesl.push(arr[i])
          //   }else{
          //     b=0;
          //  return  this.zhangzesl.push(arr[i]);
          //   }
            
          // }
          // console.log(this.zhangzesl)

           }) 

    },
     
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
    cleat6(){
        var Fname=this.Fname;
       
        var Fdt=this.Fdt;
 
           var Froom=this.Froom;
            var Fzname=this.Fzname;
         var http=this.http;
         
        $.post(http+"visitorrecord/addExit", 
             {  
            recordName:Fname,
           
  
            version:1,
            createUser:window.localStorage['token']
}, function(data){
              console.log(data)
                if(data.status==200){
                  alert('录入成功')
                      window.location.reload();
                }else{
                   alert('录入失败')
                }
            }, "JSON")
             
      },
    cleat5(){
       var Fname=this.Fname;
         var Fphone=this.Fphone;
        var Fdt=this.Fdt;
        var Fjh=this.Fjh;
        var qmos=this.qmos;
           var Froom=this.Froom;
            var Fzname=this.Fzname;
         var http=this.http;
         console.log(Fname,Fphone,Froom,Fzname,Fdt,Fjh,qmos)
        //    if(Fname,Fphone,Froom,Fzname==''){
        //      this.$message(`内容不能为空`);
        //          return
        // }
      //  var peg=/^1[3456789]\d{9}$/;
      //      if(peg.test(Fphone)==false){
      //               this.$message("手机号格式错误");
      //               return
      //        }
       
                $.post(http+"visitorrecord/addJoin", 
             {  
               recordName:Fname,
            recordPhoto:qmos,
            recordRoom:Froom,
            recordCard:Fdt,
            recordSenior:Fzname,
            recordTel:Fphone,
              expectTime:Fjh,
              remarks:2,
              version:2,
                createUser:window.localStorage['token'],
              }, function(data){
                if(data.status==200){
                  alert('录入成功')
                   window.location.reload();
                     //window.location.reload();
                }else{
                   alert('录入失败')
                }
         
            
            }, "JSON"
        ).catch(err=>{console.log(err)})
      },

     cleat4(){
        var zname=this.Zname;
           var zfj=this.Zfj;
         
            var zjs=this.Zjs;
            var zdt=this.Zdt;
         var http=this.http;
           if(zname,zdt,zfj,zjs==''){
             this.$message(`内容不能为空`);
                 return
        }
        $.post(http+"visitorrecord/addExit", 
             {  
            recordName:zname,
            recordRoom:zfj,
            recordSenior:zjs,
            recordCard:zdt,
            remarks:1,
            version:1,
            createUser:window.localStorage['token']
}, function(data){
              console.log(data)
                if(data.status==200){
               

                  alert('录入成功')
                     window.location.reload();
                   
                }else{
                   alert('录入失败')
                }
            }, "JSON")
             
      },

    cleat3(){
      //长者出院
        var zname=this.Zname;
           var zfj=this.Zfj;
           var Zphone=this.Zphone
            var zjs=this.Zjs;
            var Zjsj=this.Zjsj;
            var qmos=this.qmos;
         var http=this.http;
           if(zname,Zphone,zfj,Zjsj==''){
             this.$message(`内容不能为空`);
                 return
        }
     //   console.log(zname,Zphone,zfj,Zjsj)
        var peg=/^1[3456789]\d{9}$/;
           if(peg.test(Zphone)==false){
                    this.$message("手机号格式错误");
                    return
             }

                $.post(http+"visitorrecord/addJoin", 
             {  
            recordName:zname,
            recordPhoto:qmos,
            recordRoom:zfj,
            recordSenior:zjs,
            recordTel:Zphone,
              expectTime:Zjsj,
              remarks:1,
              version:2,
                createUser:window.localStorage['token']
}, function(data){
              
                if(data.status==200){
                //  window.location.reload();
                  alert('录入成功')
                     window.location.reload();
                }else{
                   alert('录入失败')
                }

            
            }, "JSON"
        ).catch(err=>{console.log(err)})
      },
     
     cleat2(){
        //var img=this.imgSrc;
       var Fname=this.Fname;
         var Fphone=this.Fphone;
        var fmos=this.fmos;
           var Froom=this.Froom;
            var Fzname=this.Fzname;
         var http=this.http;
           if(Fname,Fphone,Froom,Fzname==''){
             this.$message(`内容不能为空`);
                 return
        }
       var peg=/^1[3456789]\d{9}$/;
           if(peg.test(Fphone)==false){
                    this.$message("手机号格式错误");
                    return
             }
        
            // console.log(data)
           
                $.post(http+"visitor/add", 
             {  
               visitorIdentity:2,
               visitorPhoto:fmos,
               visitorName:Fname,
               visitorTel:Fphone,
               visitorRoom:Froom,
               seniorName:Fzname,
                createUser:window.localStorage['token']
              }, function(data){
                if(data.status==200){
                  alert('录入成功')
                    window.location.reload();
                }else if(data.status==400){
                    alert(yanglaoyuan+'无该长者')
                }else{
                   alert('录入失败')
                }
         
            
            
            }, "JSON"
        ).catch(err=>{console.log(err)})
      },
      cleat1(){
        //var img=this.imgSrc;
       var zname=this.Zname;
         var zage=this.Zage;
          var zsex=this.Zsex;
           var zfj=this.Zfj;
           var zmos=this.zmos;
            var zjs=this.Zjs;
         var http=this.http;
           if(zname,zage,zsex,zfj==''){
             this.$message(`内容不能为空`);
                 return
        }
         
            // console.log(data)
             
                $.post(http+"senior/add", 
             {  
               seniorName:zname,
              seniorSex:zsex,
              seniorAge:zage,
            seniorPhoto:zmos,
            seniorRoom:zfj,
            seniorFamily:zjs,
                createUser:window.localStorage['token']
}, function(data){
             // console.log(data)
                if(data.status==200){
                  alert('录入成功')
               window.location.reload();
                }else{
                   alert('录入失败')
                }
            }, "JSON")
        .catch(err=>{console.log(err)})
      },
     
      
        toass(){
            this.$router.push('home')
        },
        
    //提交
        tijiao(){
             let _this = this;
           
            var fice=document.getElementById('fice');
           $.post(this.http+"file/base64Upload", {base64Data:this.imgSrc,async : false}, function(data) {
            //console.log(data.object.name)

            //  this.list=data.object;
            //   data.object.name;
                 newData=eval(data);
                console.log(newData)
                 if(newData.status==500){
                    _this.xians5=true;
                 _this.xians3=true;
                 _this.xians6=false;
                  _this.xians2=false;
                  _this.fangke=false;
                    _this.xians1=false;
                    _this.xians4=false;
                    _this.xians7=false;
                     _this.xians8=false;
                      _this.xians9=true;
                         _this.lindao=false;
                  _this.xians10=false;
                   _this.qu=true;
                     _this.Zname='';
                       _this.Fname='';
                  _this.Fphone='';
                    _this.Froom='';
                    _this.Fzname='';
                  _this.Zage='';
                    _this.Zsex='';
                    _this.Zfj='';
                      _this.Zjs='';
                    _this.pname='陌生人';
                    a=parseInt(newData.object.height) 
                    b=parseInt(newData.object.width) 
                     c=parseInt(newData.object.top) 
                      d=parseInt(newData.object.left) 

                    _this.ficeHeight=newData.object.height;
                    _this.ficeWidth=newData.object.width;
                   // clearInterval(_this.timer);
                  /*  fice.style.display='block';
                    fice.style.top=newData.object.top+40+'px';
                    fice.style.left=newData.object.left+'px';*/

                 }else if(newData.status==200){
                    _this.xians10=true;
                      _this.xians9=false;
                       _this.fangke=false;
                    _this.qu=true;
                    _this.Qname=newData.object.name;
                    _this.radio3='长者';
                    _this.xians5=false;
                     _this.xians6=true;
                      _this.xians8=false;
                _this.xians2=true;
                _this.xians1=false;
                _this.xians3=false;
                _this.xians7=false;
                   _this.lindao=false;
                   _this.xians4=true;
                        _this.ficeHeight=newData.object.height;
                        _this.ficeWidth=newData.object.width;
                          a=parseInt(newData.object.height) 
                    b=parseInt(newData.object.width) 
                     c=parseInt(newData.object.top) 
                      d=parseInt(newData.object.left) 
                   /*     fice.style.display='block';
                        fice.style.top=newData.object.top+40+'px';
                        fice.style.left=newData.object.left+'px';*/

                       _this.Zname=newData.object.name;
                       _this.Zage=newData.object.age;
                      _this.Zsex=newData.object.sex;
                      _this.Zfj=newData.object.room;
                       _this.Zjs=newData.object.accompany;
                   // clearInterval(_this.timer);
                 }else if(newData.status==201){
                      _this.xians9=false;
                    _this.qu=true;
                     a=parseInt(newData.object.height) 
                    b=parseInt(newData.object.width)
                     c=parseInt(newData.object.top) 
                      d=parseInt(newData.object.left) 
                     _this.xians10=true;
                      _this.fangke=true;
                   _this.Qname=newData.object.name;
                   _this.radio3='访客';
                   _this.xians5=false;
                _this.xians2=false;
                _this.xians1=false;
                 _this.xians6=false;
                    _this.lindao=false;
                _this.xians4=false;
                _this.xians7=true;
                _this.xians8=true;
                _this.xians3=false;
                          _this.ficeHeight=newData.object.height;
                        _this.ficeWidth=newData.object.width;
                    /*    fice.style.display='block';
                        fice.style.top=newData.object.top+40+'px';
                        fice.style.left=newData.object.left+'px';*/

                  _this.Fname=newData.object.name;
                  _this.Fphone=newData.object.tel;
                    _this.Froom=newData.object.room;
                    _this.Fzname=newData.object.accompany;
                    _this.tump=newData.object.accompany;
                     _this.tsex=newData.object.sex;
                   //clearInterval(_this.timer);
                 } else if(newData.status==202){
                    _this.xians10=false;
                    _this.qu=false;
                       _this.xians9=false;
                        _this.fangke=false;
                    _this.xians1=false;
                    _this.xians2=false;
                     _this.xians6=false;
                    _this.xians3=false;
                     _this.xians8=false;
                    _this.xians5=false;
                     _this.xians4=false;
                     _this.xians7=false;
                      _this.lindao=true;
                      _this.Lname=newData.object.name;
                      _this.Ldw=newData.object.tel;
                    fice.style.display='none';
                 }
                 else if(newData.status==0){
                   _this.hyc1=newData.object.title;
                   _this.hyc2=newData.object.content;

                    _this.xians10=false;
                    _this.qu=false;
                       _this.xians9=false;
                        _this.fangke=false;
                    _this.xians1=true;
                    _this.xians2=false;
                     _this.xians6=false;
                    _this.xians3=false;
                    _this.lindao=false;
                     _this.xians8=false;
                    _this.xians5=false;
                     _this.xians4=false;
                     _this.xians7=false;
                    fice.style.display='none';
                 }else{
                    _this.xians10=false;
                      _this.xians9=false;
                    _this.qu=false;
                       _this.lindao=false;
                   _this.xians1=true;
                   _this.xians2=false;
                     _this.xians6=false;
                       _this.fangke=false;
                      _this.xians8=false;
                     _this.xians7=false;
                    _this.xians3=false;
                    _this.xians5=false;
                     _this.xians4=false;
                   fice.style.display='none';
                 }
               // console.log(newData)
           /*    if(newData){
                  if(newData.status==200){
                  
                 
                _this.ficeHeight=newData.object.height;
                 _this.ficeWidth=newData.object.width;
                 fice.style.display='block';
                fice.style.top=newData.object.top+50+'px';
                fice.style.left=newData.object.left+40+'px';
         }}
                 _this.ficeHeight=newData.object.height;
                 _this.ficeWidth=newData.object.width;*/
                /* fice.style.display='block';
                fice.style.top=newData.object.top+50+'px';
                fice.style.left=newData.object.left+'px';
              //draw(100, 100, 100,100)
                 return;
              /*  }/*else if(newData.object.status=="DELETED"){
          _this.photoid=newData.object.fileName;
                   _this.uname=''
                   _this.age=''
                   _this.sex=''
                  _this.remarks=2;
                   return
                }*/
              /*  }else if(newData.status==500){
             /*     _this.photoid=newData.msg;
                   _this.pname='陌生人';
                   _this.age='';
                   _this.sex='';
                   _this.remarks=0;
                  /*   _this.ficeHeight=newData.object.height;
                 _this.ficeWidth=newData.object.width;*/
           /*      fice.style.display='block';
                fice.style.top=newData.object.top+40+'px';
                fice.style.left=newData.object.left+'px';
                   return;
                }else{
                 /*   _this.pname='陌生人';
                   _this.uname='';
                   _this.age='';
                   _this.sex='';*/
         /*          fice.style.display='none';
                   return;
                }
                }*/
            }, "JSON");
        },
/* dataURLtoFile (dataurl, filename) {
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
      },*/
      // 调用权限（打开摄像头功能）
      getCompetence () {
        var _this = this
      
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisfice = document.getElementById('fice')
        this.thistite = this.thisfice.getContext('2d')
        
        this.thisVideo = document.getElementById('videoCamera')
       
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play()
          }
        }).catch(err => {
          console.log(err)
        })
      },
//  绘制图片（拍照功能）
      setImage () {
        var _this = this
        // 点击，canvas画图
        _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
        // 获取图片base64链接
        var image = this.thisCancas.toDataURL('image/png')
        _this.imgSrc = image
        //this.$emit('refreshDataList', this.imgSrc)
      },
      //绘框
       
      /*  setfice () {
        var _this = this
        // 点击，canvas画图
        _this.thistite.drawImage(_this.thisVideo, _this.ficeleft, _this.ficetop, _this.ficeWidth, _this.ficeHeight)
      },
      */
              
// 关闭摄像头
      stopNavigator () {
        this.thisVideo.srcObject.getTracks()[0].stop()
      },

       //上传图片
      handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
      }
    },
   
     beforeDestroy() {
    this.stopNavigator();
    //  clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
     
    
  }
    }   
</script>
<style scoped>

.el-button+.el-button {
    margin-left: 0px !important;
}

#el2{
 text-align: center;
}

ul{
  list-style: none !important;
}
.marquee_box {
	display: block;
	position: relative;
  left: 20px;
	width: 100%;
	height: 90px;
	overflow: hidden;
  font-size: 25px;
}

.marquee_list {
	display: block;
	position: absolute;
	top: 0;
	left: 0px;
  
}
.marquee_top {
	transition: all 0.5s;
	margin-top: -10px;
}
.line{
  overflow: hidden;
}
           .el-picker-panel__body{
             position: absolute;
           }
            #fice{
              position: absolute;
              left: 0px;top:0px;
            }
            .btn{
                position: absolute;
                top:520px;left:850px;
            }
            .camera_outer{
              position: relative;
             width: 800px;
             left:100px;
            
            }
            .header{
                margin-bottom: 100px ;
            }
            .logo{
                /* background-image:url(../../assets/12.jpg);
                background-repeat:'no-repeat';
                background-size:'100% 100%'; */
                background-color: #5fb6be;
                position:relative;
                width: 100%;
                height: 1300px;
            }
            .el-row {
            margin-bottom: 20px;
            height: 800px;
            }
            .el-col {
                border-radius: 4px;
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
           .shijian{
            position: absolute;
            top:5%;left:4%;
            color: white;
            z-index: 999999999999999;
        }
        .top-btn{
           position: absolute;
            top:10%;left:85%;
        }
        .li{
          padding-top:20px; 
          list-style: none;
          text-align: center;
          font-size:30px;
        }
</style>