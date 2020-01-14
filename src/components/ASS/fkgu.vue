<template>
    <div>
       <el-container>
            <el-header>
               <div class="a1">
        <span class="font">访客管理-列表</span>
        <div class="a1">
          <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增访客</el-button>
           
          <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo(1)" v-show="quan2==true"
   
       >

  </el-input>
  <i @click="sousuo(1)" style="font-size:35px;" class="el-icon-search"></i>
        </div>
    </div>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="头像">
                  <template>
                    <div>
                      <img v-if="avatar"  :src="avatar"  style="width:100px;height:100px;border:none;">
                      <img v-else :src='img1'  style="width:100px;height:100px;border:none;">
                    <input class="btn11" type="file"   accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)">
                </div>
                  </template>
                    <el-form-item label="身份">
                   <el-select class="item-choose" v-model="formEdit.Zsf" style="font-size:20px;height:27px;" @change="xiala()">
                            <el-option 
                                v-for="(item,index) in sexarr"
                                :key="index"
                                :label="item"
                                :value="item"
                            >{{item}}
                            </el-option>
                        </el-select>
                </el-form-item>
                  <el-form-item label="姓名">
                   <el-input v-model="formEdit.uname" placeholder="姓名"></el-input>
                </el-form-item>
                <div v-show="xians">
                 <el-form-item label="年龄">
                   <el-input v-model="formEdit.age" placeholder="年龄"></el-input>
                </el-form-item>
                  <el-form-item label="性别">
                   <el-input v-model="formEdit.sex" placeholder="性别"></el-input>
                </el-form-item>
                  
                 <el-form-item label="探访人员">
                   <el-input v-model="formEdit.tan" placeholder="探访人员"></el-input>    
                </el-form-item>
                 <el-form-item label="电话">
                   <el-input v-model="formEdit.tel" placeholder="探访人员"></el-input>    
                </el-form-item>
                </div>
                 <el-form-item label="访客单位" v-show="xians2">
                   <el-input v-model="formEdit.dw" placeholder="请输入访客单位"></el-input>    
                </el-form-item>
                  
             <!--<el-form-item label="进入时间">
                   <el-input v-model="formEdit.jin" placeholder="进入时间"></el-input>
                </el-form-item>
                 <el-form-item label="离开时间">
                   <el-input v-model="formEdit.lef" placeholder="离开时间"></el-input>
                </el-form-item> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button type="success" plain @click="quxiao()">取 消</el-button>
                
                 <el-button type="success"  v-show="xian==1" @click="cleat()">确 定</el-button>
                <el-button type="success"  v-show="xian==2" @click="xiugai()">确 定</el-button>
            </div>
        </el-dialog> 
            </el-header>
            <el-main>
                  <el-table
                :data="userinfo"
                        stripe
                style="width: 100%">
                <el-table-column
                prop="visitorName"
                label="姓名"
                width="180">
                </el-table-column>

                <!-- <el-table-column
                prop="visitorRoom"
                label="房间号"
                width="180">
                </el-table-column>
                  <el-table-column
                prop="visitorSex"
                label="性别"
                width="180">
                </el-table-column>
                <el-table-column
                prop="visitorAge"
                label="年龄"
                width="180">
                </el-table-column> -->
                <el-table-column
                prop="seniorName"
                label="探访人员">
                </el-table-column>
                <el-table-column
                prop="visitorTel"
                label="手机号">
                </el-table-column>
                
                <el-table-column 
                prop="visitorTel"
                label="单位">
                </el-table-column>

                 <el-table-column
                prop="createTime"
                label="时间">
                </el-table-column>
                <el-table-column 
                prop="visitorPhoto"
                label="采集照片">
                <template width="90" slot-scope="userinfo">
                <img style="width:80px;height:80px;border:none;"  :src="http+'webdownload/picdownload?fileId='+userinfo.row.visitorPhoto+'&temp=5'">
                </template>
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="userinfo">
                    <i v-show="quan5==true" @click="cha(userinfo.row.visitorId)" class="el-icon-view"></i><i v-show="quan3==true" @click="handleDetail(userinfo.row.visitorId)" class="el-icon-edit">
                        </i><i v-show="quan4==true" @click="san(userinfo.row.visitorId)" class="el-icon-delete"></i>
                </template>
                </el-table-column>
                </el-table>
                  
            </el-main>
            <div style="display: flex;justify-content: center;margin-top: 10px">
  <el-pagination
    background
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPage"
    :page-sizes="[8, 16, 24, 32]"
    :page-size="pageSize"
    layout="sizes, prev, pager, next, jumper, ->, total, slot"
    :total="total">
  </el-pagination>
</div>
            </el-container>

    
    </div>
</template>
<script>
import $ from 'jquery'
import {mapState} from 'vuex'
var img;
var id;
var qwe;
export default {
   data(){
       return{
         sexarr:['领导','家属',],
         xiansdw:false,
         xians:true,
         xians2:false,
         avatar:"",
         sousuoY:'',
         img1:'',
        quan1:false,
        quan2:false,
        quan3:false,
        quan4:false,
      quan5:false,
        xiugaiID:'',
            
            input:'',
            pageSize:8,
            currentPage:1,
            total:0,
            userinfo:[],
            xian:1,
            list:['姓名','性别','年龄','入职日期','采集照片','操作'], 
           formEdit:{
          uname:'',
          fang:'',
          tan:'',
          dw:'',
          Zsf:'家属',
          jin:'',
          lef:'',
          ka:'',
          age:'',
          tel:'',
          sex:''
        },
          
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
       }
   },
     computed:{
        ...mapState(['http'])
    },
 //updated(){this.initUser()},
 created(){
     
      this.initUser();
      var url='role/getUserMenu/'
        this.axios.get(url+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='新增访客'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索访客'){
           this.quan2=true;
         }if(this.arr[i].name=='修改访客'){
           this.quan3=true;
         }if(this.arr[i].name=='删除访客'){
           this.quan4=true;
         }if(this.arr[i].name=='查看访客'){
           this.quan5=true;
         }
      }
      })
    },
    mounted(){
      
    },
    methods:{
      xiala(){
        if(this.formEdit.Zsf=='家属'){
         this.xians2=false;
          this.xians=true;
        }else{
           this.xians2=true;
          this.xians=false;
         
        }
      },
       changeImage(e) {
         qwe=1;
        this.file=e.target.files[0]
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
       
				  that.avatar = this.result
				}
			  },
      quxiao(){
         this.dialogEdittVisible = false;
           this.img1='';
            this.avatar='';
               this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.tel='';
                    this.formEdit.age='';
                    this.formEdit.tan='';
      },
        cha(obj){
           var url='visitor/getVisitorInfo';
            this.axios.get(url+'?visitorId='+obj).then(res=>{  
              
                 this.formEdit.uname=res.data.object.visitorName;
                    this.formEdit.sex=res.data.object.visitorSex;
                    this.formEdit.tel=res.data.object.visitorTel;
                    this.formEdit.age=res.data.object.visitorAge;
                    this.formEdit.tan=res.data.object.seniorName;
                   this.img1=this.http+"webdownload/facedownload?fileId=" +res.data.object.visitorPhoto
                   
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改';
                 this.formEditDisabled=false;
                this.formEditDisabled=true;
            }); 
        },
        handleDetail(obj){
            this.xian=2;
            id=obj;
            var url='visitor/getVisitorInfo';
            this.axios.get(url+'?visitorId='+id).then(res=>{  
              this.formEdit.uname=res.data.object.visitorName;
                    this.formEdit.sex=res.data.object.visitorSex;
                    this.formEdit.tel=res.data.object.visitorTel;
                    this.formEdit.age=res.data.object.visitorAge;
                    this.formEdit.tan=res.data.object.seniorName;
                    this.xiugaiID=res.data.object.faceId;
                    img=res.data.object.visitorPhoto;
                  this.img1=this.http+"webdownload/facedownload?fileId=" +res.data.object.visitorPhoto
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
        },
        //搜索功能
           sousuo(obj){
    
          //this.currentPage=1;
          this.sousuoY=2;
            var url="visitor/list";
            var inp=this.input;
       
            this.axios.get(url+'?currentPage='+obj+'&'+'name='+inp).then(resp=>{
               if (resp){
            this.userinfo=resp.data.object;
            this.total=parseInt(resp.data.msg);
            this.currentPage=obj;
               }
            })
        },
       
        //删除功能
          san(obj){
           var url="visitor/delete";
           	  this.$confirm('删除该人员，是否继续?', '提示', { type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'visitorId='+obj).then((response) => {
                    this.$message.success('删除成功'); this.initUser();})
                    .catch((response) => {
                      this.$message.error('删除失败!');
                    });
                }) .catch(() => {
                this.$message.info('已取消操作!');
              });
       
        },
       initUser(){
          this.sousuoY=1
            var url="visitor/list";
            this.axios.get(url+'?currentPage='+this.currentPage).then(resp=>{
            if (resp){
           
            this.userinfo=resp.data.object;
            this.total=parseInt(resp.data.msg);
            }
            })
        },
        sizeChange(size) {
        if(sousuoY==1){ 
          this.pageSize=size;
        this.initUser();}else{
            this.sousuo(1);
        }
       

        },
        currentChange(page) {
            if(this.sousuoY==2){
              this.currentPage=page
          
            this.sousuo(page);

          }else{
            this.currentPage=page
                  this.initUser();
          }
        
  
        },
       
       
         handleAdd() {
            this.avatar=require('../../assets/add.png');
            this.xians2=false;
           this.xian=1;
            this.dialogEdittVisible = true;

            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });
        },
        
        cleat(){
         const formData = new FormData()
      formData.append('file',this.file)
      this.axios.post(`file/faceupload`,formData)
      .then(res => {
            if(res.status == 200){
        var sum='';
        var acc=this.formEdit.uname;
        var zsf=this.formEdit.Zsf;
        var nam=this.formEdit.tan;
        var pho=this.formEdit.age;
        var qq='';
        var qd=this.formEdit.sex;
        if(zsf=='领导'){
          qq=this.formEdit.dw;
          sum=3;
          
        }else{
          qq=this.formEdit.tel;
          if(acc,nam,pho,qq,qd,zsf==''){
             this.$message(`内容不能为空`);
                                    
        }
           sum=2;
            var peg=/^1[3456789]\d{9}$/;
           if(peg.test(qq)==false){
                    this.$message("手机号格式错误");
                   
             }
       
        }
        var url='visitor/add';
        this.axios.post(url+'?'+'visitorPhoto='+res.data.msg+'&visitorName='+acc+'&seniorName='+nam+'&visitorAge='+pho+'&visitorSex='+qd
        +'&visitorTel='+qq+'&createUser='+window.localStorage['token']+'&visitorIdentity='+sum).then(result=>{
                 if(result.data.status==200){
                    this.$message('创建成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.tel='';
                    this.formEdit.age='';
                    this.formEdit.tan='';
                   this.dialogEdittVisible =false;
                     this.initUser();
                 }else if(result.data.status==400){
                   this.$message('长者不存在')
                 }
                 else if(result.data.status==0){
                   this.$message('访客姓名重复')
                 }
                 else{
                   this.$message('创建失败')
                 }
        })}
               }, "JSON"
        ).catch(err=>{console.log(err)})
      
          
      },
      xiugai(){
        if(qwe==1){
           const formData = new FormData()
      formData.append('file',this.file)
      this.axios.post(`file/faceupload`,formData)
      .then(res => {
        console.log(res)
        if(res.status == 200){
          var suu='';
           var acc=this.formEdit.uname;
        var nam=this.formEdit.tan;
        var pho=this.formEdit.age;
        var qq='';
          var zsf=this.formEdit.Zsf;
        var qd=this.formEdit.sex;
           if(zsf=='领导'){
          qq=this.formEdit.dw;
          suu=3;
          
        }else{
          qq=this.formEdit.tel;
          if(acc,nam,pho,qq,qd==''){
             this.$message(`内容不能为空`);
            
        }
           suu=2;
        
        }
        var url='visitor/edit';
      
       this.axios.post(url+'?'+'visitorPhoto='+res.data.msg+'&visitorName='+acc+'&seniorName='+nam+'&visitorAge='+pho+'&visitorSex='+qd
        +'&visitorTel='+qq+'&visitorId='+id+'&faceId='+ this.xiugaiID+'&visitorIdentity='+suu).then(result=>{
                 if(result.data.status==200){
                    this.$message('修改成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.tel='';
                    this.formEdit.age='';
                    this.formEdit.tan='';
                   this.dialogEdittVisible =false;
                     this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
        }})
        }else{
        //    var acc=this.formEdit.uname;
        
        // var nam=this.formEdit.tan;
        // var pho=this.formEdit.age;
        // var qq=this.formEdit.tel;
        // var qd=this.formEdit.sex;
        // if(acc,nam,pho,qq,qd==''){
        //      this.$message(`内容不能为空`);
        //          return                       
        // }
         var suu='';
           var acc=this.formEdit.uname;
        var nam=this.formEdit.tan;
        var pho=this.formEdit.age;
        var qq='';
          var zsf=this.formEdit.Zsf;
        var qd=this.formEdit.sex;
           if(zsf=='领导'){
          qq=this.formEdit.dw;
          suu=3;
          
        }else{
          qq=this.formEdit.tel;
          if(acc,nam,pho,qq,qd==''){
             this.$message(`内容不能为空`);}
            suu=2;
        }
           
        var url='visitor/edit';
       this.axios.post(url+'?'+'visitorPhoto='+img+'&visitorName='+acc+'&seniorName='+nam+'&visitorAge='+pho+'&visitorSex='+qd
        +'&visitorTel='+qq+'&visitorId='+id+'&faceId='+ this.xiugaiID+'&visitorIdentity='+suu).then(result=>{
                 if(result.data.status==200){
                    this.$message('修改成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.tel='';
                    this.formEdit.age='';
                    this.formEdit.tan='';
                   this.dialogEdittVisible =false;
                     this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
        }
       
      },
    
    
    },
     

}
</script>
<style scoped>
 .camera_outer{
             text-align: center ;
            
            }
.img{
  width: 250px;
  height:36px;
}
.img:hover{
position: relative;;
  
  width: 250px;
  height:300px;}
.el-pagination{
    text-align: center;
    margin-top: 35px;
    font-size: 27px;
}
.el-icon-edit,.el-icon-delete,.el-icon-view{
    margin-left: 5px;
    font-size: 25px;
    text-align: center;
    color: black;
    line-height: 28px;
}
.bg-purple{
    text-align: center;
    color: black;
    line-height: 36px;
    font-size: 13px;
}
.tou{
    text-align: center;
    color: black;
    line-height: 36px;
    font-size: 17px;
}
.a2{
    margin-top:20px;
}
.font{
    font-size: 25px;
}
  .a1{
      font-size: 20px;
    color: #333;
    display:flex;
    justify-content: space-between;
  }
 .imp{
     display: inline;
 }
  .el-row {
    margin-bottom: 20px;
   
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .camera_outer{
      position: absolute;
      top:50%;left: 50%;
      margin-top:-250px;margin-left:-400px;
  }
   .btn11{
   position: absolute;
    left: 2%;
    top: 21%;
    opacity: 0;
    }
     .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }
</style>
