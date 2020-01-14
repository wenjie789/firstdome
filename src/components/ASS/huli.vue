<template>
    <div>
       <el-container>
            <el-header>
               <div class="a1">
        <span class="font">护理员管理-列表</span>
        <div class="a1">
          <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增护理员</el-button>
          <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo(1)" v-show="quan2==true"
      
       >
       
  </el-input>
  <i @click="sousuo(1)" style="font-size:35px;" class="el-icon-search"></i>
        </div>
    </div>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="姓名">
                    <el-input v-model="formEdit.uname" placeholder="请输入姓名" ></el-input>
                </el-form-item>
                <el-form-item label="头像" style="width:35%; font-weight:bold">
             <div>
                      <img v-if="avatar"  :src="avatar"  style="width:100px;height:100px;border:none;">
                      <img v-else :src='img1'  style="width:100px;height:100px;border:none;">
                    <input class="btn11" type="file"   accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)"  >
                </div>
            </el-form-item>
                <el-form-item label="性别">
                    
                     <el-select class="item-choose" v-model="formEdit.sex" >
                        <el-option 
                            v-for="(item,index) in tesuren"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="生日">
                    <el-col>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formEdit.bir" style="width: 100%;"></el-date-picker>
                  </el-col>
                   </el-form-item>
                   <el-form-item label="入职时间">
                    <el-col>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formEdit.ru" style="width: 100%;"></el-date-picker>
                  </el-col>
                   </el-form-item>
                 <el-form-item label="楼层">
                     <el-select class="item-choose" v-model="formEdit.lou" >
                        <el-option 
                            v-for="(item,index) in louceng"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
                   
                </el-form-item>
                 <el-form-item label="护理员等级">
                    <el-select class="item-choose" v-model="formEdit.ts" >
                        <el-option 
                            v-for="(item,index) in hulidengji"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="房间号">
                   <el-input v-model="formEdit.hulih" placeholder="房间号"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                   <el-input v-model="formEdit.sr" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                   <el-input v-model="formEdit.sf" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
                 <el-form-item label="备注">
                    <el-input  v-model="formEdit.bz" placeholder="备注"></el-input>
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
                prop="nurseName"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="nurseSex"
                label="性别"
                width="180">
                </el-table-column>
                <el-table-column
                prop="nurseAge"
                label="年龄">
                </el-table-column>
                <el-table-column
                prop="nurseJointime"
                label="入职时间">
                </el-table-column>
                 <el-table-column
                prop="nurseRoom"
                label="房间号">
                </el-table-column>
                <el-table-column 
                prop="nursePhoto"
                label="采集照片">
                <template width="90" slot-scope="userinfo">
                <img style="width:80px;height:80px;border:none;"  :src="http+'webdownload/picdownload?fileId='+userinfo.row.nursePhoto+'&temp=3'">
                </template>
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="userinfo">
                    <i v-show="quan5==true" @click="cha(userinfo.row.nurseId)" class="el-icon-view"></i><i v-show="quan3==true" @click="handleDetail(userinfo.row.nurseId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(userinfo.row.nurseId)" class="el-icon-delete"></i>
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
            <!--
    <div class="a1">
        <span class="font">护理员管理-列表</span>
        <div class="a1">
          <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增护理员</el-button>
          <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo" v-show="quan2==true"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
       >
  </el-input>
        </div>
    </div>
     <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="姓名">
                    <el-input v-model="formEdit.uname" placeholder="请输入姓名" ></el-input>
                </el-form-item>
                <el-form-item label="头像" style="width:35%; font-weight:bold">
               <el-upload 
                  class="avatar-uploader"
                  action="http://192.168.1.175:8090/file/faceupload"
                  :show-file-list="true"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
            </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="formEdit.sex" placeholder="请输入性别"></el-input>
                </el-form-item>
                 <el-form-item label="生日">
                    <el-col>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formEdit.bir" style="width: 100%;"></el-date-picker>
                  </el-col>
                   </el-form-item>
                   <el-form-item label="入职时间">
                    <el-col>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formEdit.ru" style="width: 100%;"></el-date-picker>
                  </el-col>
                   </el-form-item>
                 <el-form-item label="楼层">
                   <el-input v-model="formEdit.lou" placeholder="楼层"></el-input>
                </el-form-item>
                 <el-form-item label="护理员等级">
                   <el-input v-model="formEdit.ts" placeholder="护理员等级"></el-input>    
                </el-form-item>
                <el-form-item label="年龄">
                   <el-input v-model="formEdit.sr" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                   <el-input v-model="formEdit.sf" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
                 <el-form-item label="备注">
                    <el-input  v-model="formEdit.bz" placeholder="备注"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-show="xian==1" @click="cleat()">确 定</el-button>
                <el-button v-show="xian==2" @click="xiugai()">确 定</el-button>
            </div>
        </el-dialog>
   
    <div class="a2">
    <el-row :gutter="10">
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[0]}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[1]}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[2]}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[3]}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[4]}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple tou">{{list[5]}}</div></el-col>
    </el-row>
    </div>
     <div class="a2" v-for="(t,i) of userinfo" :key="i">
    <el-row :gutter="10">
        <el-col :span="4"><div class="grid-content bg-purple">{{t.nurseName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.nurseSex}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.nurseAge}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.nurseJointime}}</div></el-col>
        <el-col :span="4"><img class="img" :src="'http://192.168.1.175:8090/file/getPicture?fileName='+t.nursePhoto" alt=""></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><i v-show="quan3==true" @click="handleDetail(t.nurseId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(t.nurseId)" class="el-icon-delete"></i></div></el-col>
    </el-row>
    </div>
    
        
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
-->
    
    </div>
</template>
<script>
import {mapState} from 'vuex'
var huliimg;
var id;
var qwe;
export default {
   data(){
       return{
          sousuoY:'',
         img1:'',
        quan1:false,
        quan2:false,
        quan3:false,
        quan4:false,
        quan5:false,
         avatar:'',
            hulidengji:['五级/初级工','四级/中级工','三级/高级工','二级/技师','一级/高级技师'],
             louceng:['1层','2层','3层','4层','5层','6层','7层','8层','9层','10层','11层'],
       
         tesuren:['男','女'],
            input:'',
            pageSize:8,
            currentPage:1,
            total:0,
            userinfo:[],
            xian:1,
            list:['姓名','性别','年龄','入职日期','采集照片','操作'], 
            formEdit: { //表单编辑
                uname: '',
                sex:'',
                bir:'',
                lou:'',
                 ru: '',
                ts:'',
                bz:'',
                sr:'',
                sf:'',
                hulih:''
            },
         
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
       }
   },
 //updated(){this.initUser()},
  computed:{
        ...mapState(['http'])
    },
 mounted(){
      this.initUser();
      var url='role/getUserMenu/'
        this.axios.get(url+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='添加护理'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索护理'){
           this.quan2=true;
         }if(this.arr[i].name=='修改护理'){
           this.quan3=true;
         }if(this.arr[i].name=='删除护理'){
           this.quan4=true;
         }
         if(this.arr[i].name=='查看护理'){
           this.quan5=true;
         }
      }
      })
    },
    methods:{
        quxiao(){this.dialogEdittVisible = false;  
                  this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.bir='';
                    this.formEdit.lou='';
                    this.formEdit.ru='';
                    this.formEdit.hulih='';
                    this.formEdit.ts='';
                    this.formEdit.jin='';
                    this.formEdit.tel='';
                    this.formEdit.wz='';
                    this.formEdit.ts='';
                    this.formEdit.bz='';
                    this.formEdit.sr='';
                    this.formEdit.sf='';
                   this.img1='';
                    this.avatar='';
                  },
        cha(obj){
           var url='nurse/getNurseInfo';
            this.axios.get(url+'?nurseId='+obj).then(res=>{  
                this.formEdit.uname=res.data.object.nurseName;
                 this.formEdit.sr=res.data.object.nurseAge;
                  this.formEdit.lou=res.data.object.nurseFloor;
                   this.formEdit.ru=res.data.object.nurseJointime;
                   this.formEdit.sex=res.data.object.nurseSex;
                 this.formEdit.hulih=res.data.object.nurseRoom;
                  this.formEdit.ts=res.data.object.nurseLevel;
                
                   this.formEdit.bz=res.data.object.nurseRemarks;
               this.formEdit.bir=res.data.object.nurseBirthday;
                   this.formEdit.sf=res.data.object.nurseCard;
                   //console.log(res.data.object.nursePhoto)
                     this.img1=this.http+"webdownload/picdownload?fileId=" +res.data.object.nursePhoto+"&temp=3"
                   
                  
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='查看护理员';
                 this.formEditDisabled=false;
                this.formEditDisabled=true;
            }); 
        },
        handleDetail(obj){
            this.xian=2;
            id=obj;
            var url='nurse/getNurseInfo';
            this.axios.get(url+'?nurseId='+id).then(res=>{  
                this.formEdit.uname=res.data.object.nurseName;
                //console.log(res)
                 this.formEdit.sr=res.data.object.nurseAge;
                  this.formEdit.lou=res.data.object.nurseFloor;
                   this.formEdit.ru=res.data.object.nurseJointime;
                   this.formEdit.sex=res.data.object.nurseSex;
                 this.formEdit.hulih=res.data.object.nurseRoom;
                  this.formEdit.ts=res.data.object.nurseLevel;
                  huliimg=res.data.object.nursePhoto;
               this.img1=this.http+"webdownload/picdownload?fileId=" +res.data.object.nursePhoto+"&temp=3"
                   this.formEdit.bz=res.data.object.nurseRemarks;
               this.formEdit.bir=res.data.object.nurseBirthday;
                   this.formEdit.sf=res.data.object.nurseCard;
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改护理员';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
        },
        //搜索功能
         sousuo(obj){
        
          //this.currentPage=1;
          this.sousuoY=2;
            var url="nurse/list";
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
           var url="nurse/delete";
           	  this.$confirm('删除该护理，是否继续?', '提示',{ type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'nurseId='+obj).then((response) => {
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
            var url="nurse/list";
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
            this.avatar=require('../../assets/add.png')
            this.xian=1;
            this.dialogEdittVisible = true;

            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增护理员';
                this.formEditDisabled=false;
            });
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
        cleat(){
             const formData = new FormData()
      formData.append('file',this.file)
  
      formData.append('paramValue',3)
      this.axios.post(`/file/picupload`,formData)
      .then(res => {

       //console.log(res)
        if(res.status == 200){
        var acc=this.formEdit.uname;
        var pas=this.formEdit.sex;
        var nam=this.formEdit.bir;
        var pho=this.formEdit.lou;
        var huli=this.formEdit.hulih;
        var qq=this.formEdit.ru;
        var qd=this.formEdit.ts;
        var qg=this.formEdit.bz;
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
        if(acc,pas,nam,pho==''){
             this.$message(`内容不能为空`);
                 return                       
        }
        
        var url='nurse/add';
        this.axios.post(url+'?'+'nurseName='+acc+'&'+'nurseSex='+pas+'&'+'nurseAge='+qp+'&'+'nurseRoom='+huli+'&'+'nursePhoto='+res.data.msg+'&'+'nurseBirthday='+nam+"&"+'nurseCard='+qo
        +'&'+'nurseFloor='+pho+'&'+'nurseJointime='+qq+'&'+'nurseRemarks='+qg+'&'+'nurseLevel='+qd+'&createUser='+window.localStorage['token']).then(result=>{
                 
                 if(result.data.status==200){
                    this.$message('创建成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.bir='';
                    this.formEdit.lou='';
                    this.formEdit.ru='';
                    this.formEdit.hulih='';
                    this.formEdit.ts='';
                    this.formEdit.jin='';
                    this.formEdit.tel='';
                    this.formEdit.wz='';
                    this.formEdit.ts='';
                    this.formEdit.bz='';
                    this.formEdit.sr='';
                    this.formEdit.sf='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else{
                   this.$message('创建失败')
                 }
        })
        }})
      
      },
     
      xiugai(){
          if(qwe==1){
        const formData = new FormData()
      formData.append('file',this.file)
  
      formData.append('paramValue',3)
      this.axios.post(`/file/picupload`,formData)
      .then(res => {
          if(res.status == 200){huliimg=res.data.msg}
         var acc=this.formEdit.uname;
        var pas=this.formEdit.sex;
        var nam=this.formEdit.bir;
        var pho=this.formEdit.lou;
        var huli=this.formEdit.hulih;
        var qq=this.formEdit.ru;
        var qd=this.formEdit.ts;
        var qg=this.formEdit.bz;
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
        if(acc,pas,nam,pho==''){
             this.$message(`内容不能为空`);
                 return                       
        }
        var url='nurse/edit';
      
        this.axios.post(url+'?'+'nurseName='+acc+'&'+'nurseSex='+pas+'&'+'nurseAge='+qp+'&'+'nurseRoom='+huli+'&'+'nursePhoto='+huliimg+'&'+'nurseBirthday='+nam+"&"+'nurseCard='+qo
        +'&'+'nurseFloor='+pho+'&'+'nurseJointime='+qq+'&'+'nurseRemarks='+qg+'&'+'nurseLevel='+qd+'&'+'nurseId='+id).then(result=>{
                 
                 if(result.data.status==200){
                    this.$message('修改成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.bir='';
                    this.formEdit.lou='';
                    this.formEdit.ru='';
                  var huli=this.formEdit.hulih;
                    this.formEdit.ts='';
                    this.formEdit.bz='';
                    this.formEdit.sr='';
                    this.formEdit.sf='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
         })
        }else{
          var acc=this.formEdit.uname;
        var pas=this.formEdit.sex;
        var nam=this.formEdit.bir;
        var pho=this.formEdit.lou;
        var qq=this.formEdit.ru;
        var qd=this.formEdit.ts;
        var huli=this.formEdit.hulih;
        var qg=this.formEdit.bz;
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
        if(acc,pas,nam,pho==''){
             this.$message(`内容不能为空`);
                 return                       
        }
        var url='nurse/edit';
      
        this.axios.post(url+'?'+'nurseName='+acc+'&'+'nurseSex='+pas+'&'+'nurseAge='+qp+'&'+'nursePhoto='+huliimg+'&'+'nurseBirthday='+nam+"&"+'nurseCard='+qo
        +'&'+'nurseFloor='+pho+'&'+'nurseJointime='+qq+'&'+'nurseRemarks='+qg+'&'+'nurseLevel='+qd+'&'+'nurseId='+id).then(result=>{
                 
                 if(result.data.status==200){
                    this.$message('修改成功')
                    this.formEdit.uname='';
                    this.formEdit.sex='';
                    this.formEdit.bir='';
                    this.formEdit.lou='';
                    this.formEdit.ru='';
                  
                    this.formEdit.ts='';
                    this.formEdit.bz='';
                    this.formEdit.sr='';
                    this.formEdit.sf='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
        }
        
      },
    
     
    }
}
</script>
<style scoped>
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
    margin-left: 19px;
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
   .btn11{
   position: absolute;
    left: 20%;
    top: 30%;
    opacity: 0;
    }
     .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }
</style>
