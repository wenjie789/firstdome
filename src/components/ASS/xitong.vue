<template>
    <div>
      
         <el-container>
            <el-header>
               <div class="a1">
                <span class="font">系统账号</span>
                <div class="a1">
                  <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增账号</el-button>
                  <el-input class="imp"    v-model="input"  @keyup.enter.native="sousuo(1)" v-show="quan2==true">
              
            </el-input>
            <i @click="sousuo(1)" style="font-size:35px;" class="el-icon-search"></i>
          </div>
          </div>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="1100px" height="400px">
            <el-form  style="position: relative;"  :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="养老院名称:" style="width:70%">
                    <el-input v-model="formEdit.name" placeholder="请输入养老院名称" ></el-input>
                </el-form-item>
                 <el-form-item label="养老院logo:" style="width:20%;">
                  
                </el-form-item>
               
               
                <el-form-item label="账户名:" style="width:350px;margin-left:30px;">
                    <el-input v-model="formEdit.uname" placeholder="请输入账户名"></el-input>
                </el-form-item>
                <el-form-item label="角色名称:" style="width:350px;">
                   <el-select class="item-choose" v-model="value" @change="gaibian()">
                        <el-option 
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.name"
                            :value="item.roleId"
                    >{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item style="width:150px;margin-top:-10px;margin-left:40px;">
                   <div>
                      <img v-if="avatar"  :src="avatar"  style="width:150px;height:150px;border:none;">
                      <img v-else :src="img1" style="width:100px;height:100px;border:none;">
                    <input class="btn11" type="file"   accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)"  >
                </div>
                </el-form-item>
                <el-form-item label="密码:" style="position: absolute;left:40px;top:130px;">
                   <el-input v-model="formEdit.pwd" placeholder="请输入密码"></el-input>
                    
                </el-form-item>
                <!--   <el-upload
                      class="avatar-uploader"
                      action="123"
                      :http-request="upLoad"
                      :show-file-list="false"
                      :on-change="imgPreview"
                      :before-upload="beforeAvatarUpload">
                      <img  v-if="formMovie.posterURL" :src="formMovie.posterURL" class="avatar">
                       <template v-else>
                        <img style="width:100px;height:100px;border:none;"  id='photoid'>
                      </template>
                      
                    </el-upload>

               <el-upload 
                  class="avatar-uploader"
                  action=" 'http://192.168.0.107:8090/file/picupload?'+ 'paramValue=1'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <template v-else>
                    <img style="width:100px;height:100px;border:none;"  id='photoid'>
                  </template>
               </el-upload> -->
            
                 
                 <el-form-item label="报警手机号:" style="position: absolute;left:380px;top:130px;">
                    <el-input  v-model="formEdit.phone" placeholder="请输入手机号"></el-input>
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
                prop="name"
                label="养老院名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="account"
                label="账户"
                width="180">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="role_name"
                label="角色">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间">
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="userinfo">
                   <span   v-show="quan5==true" @click="cha(userinfo.row.userId)"><i class="el-icon-view"></i></span><i class="el-icon-edit" v-show="quan3==true" @click="handleDetail(userinfo.row.userId)" ></i>
                  <i class="el-icon-delete" v-show="quan4==true" @click="san(userinfo.row.userId)"></i>
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
     
    <!--<div class="a1">
        <span class="font">系统账号-查询</span>
        <div class="a1">
          <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增账户</el-button>
          <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo" v-show="quan2==true"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
       >
  </el-input>
    </div>
    </div>
     
   
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
        <el-col :span="4"><div class="grid-content bg-purple">{{t.name}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.account}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.phone}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.role_name}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.createTime}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><i v-show="quan3==true" @click="handleDetail(t.userId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(t.userId)" class="el-icon-delete"></i></div></el-col>
    </el-row>
    </div> -->
    
        


    
    </div>
</template>
<script>
import {mapState} from 'vuex'
var qwe;
var img;
var id;
var roleid
export default {

   data(){
       return{
         sousuoY:'',
         img1:'',
         avatar:'',
         quan1:false,
         quan2:false,
         quan3:false,
         quan4:false,
         quan5:false,
         value:'',
         file:[],
         img:'',
          options:[],
            pageSize:8,
            currentPage:1,
            total:0,
            userinfo:[],
           xian:1,
         
           input:'',
           formEdit: { //表单编辑
                name: '',
                uname:'',
                phone:'',
                pwd:'',
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
 created(){
      this.initUser();
      var url='role/getUserMenu/';
       this.axios.get(url+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='添加用户'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索用户'){
           this.quan2=true;
         }if(this.arr[i].name=='修改用户'){
           this.quan3=true;
         }if(this.arr[i].name=='删除用户'){
           this.quan4=true;
         }
         if(this.arr[i].name=='查看用户'){
           this.quan5=true;
         }
      }
      })
      
    },
   
     mounted(){
          
                var url='role/listall';
                  this.axios.get(url).then(res=>{
                    this.options=res.data.object;
                  })
        },
         
       
    methods:{
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
      //取消
      quxiao(){this.dialogEdittVisible = false;   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                      this.value='';
                  this.img1='';
                    this.avatar='';},
      
  

      //查看
       cha(obj){
          var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+obj).then(res=>{
                this.formEdit.name=res.data.data.name;
                 this.formEdit.uname=res.data.data.account;
                   this.formEdit.phone=res.data.data.phone;
                   this.value=res.data.data.roleName;
                   this.formEdit.pwd='******';
                  this.img1=this.http+"webdownload/picdownload?fileId=" +res.data.data.avatar+"&temp=1";
            })
            this.dialogEdittVisible=true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='查看系统账号';
                 this.formEditDisabled=false;
                this.formEditDisabled=true;
            }); 
        },
        gaibian(){
          roleid=this.value;
        },
        handleDetail(obj){
          var url='role/listall';
                  this.axios.get(url).then(res=>{
                    this.options=res.data.object;
                  })
            this.xian=2;
            id=obj;
            var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+id).then(res=>{
          this.formEdit.pwd=res.data.data.pwd;
                this.formEdit.name=res.data.data.name;
                 this.formEdit.uname=res.data.data.account;
                   this.formEdit.phone=res.data.data.phone;
                   this.value=res.data.data.roleName
                   roleid=res.data.data.roleId;
                   img=res.data.data.avatar;
            this.img1=this.http+"webdownload/picdownload?fileId=" +res.data.data.avatar+"&temp=1"
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改系统账号';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
        },
        //搜索功能
        sousuo(obj){
       
          //this.currentPage=1;
          this.sousuoY=2;
            var url="mgr/pagelist";
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
           var url="mgr/delete";
           	  this.$confirm('删除系统账号，是否继续?', '提示',{ type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'userId='+obj).then((response) => {
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
            var url="mgr/pagelist";
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
           var url="role/listall";
            this.axios.get(url).then(resp=>{
                
                
            })
            this.xian=1;
            this.dialogEdittVisible = true;

            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增系统账号';
                this.formEditDisabled=false;
            });
        },
        
        cleat(){
           //  图片表单上传
   /* upLoad (file) {
      var nikename = sessionStorage.getItem('nikename')
      const formData = new FormData()
      formData.append('file',file.file)
      formData.append('nikeName',nikename)
      formData.append('paramValue',1)
      this.axios.post(`/file/picupload`,formData).then(res => res.data)
      .then(data => {
  
        console.log(data)
        if(data.status == 200){
          this.img= data.msg
          
        }
      })
    },*/
        
      const formData = new FormData()
      formData.append('file',this.file)
  
      formData.append('paramValue',1)
      this.axios.post(`/file/picupload`,formData)
      .then(res => {
        if(res.status == 200){
        
         var acc=this.formEdit.uname;
        var pas=this.formEdit.pwd;
        var nam=this.formEdit.name;
        var pho=this.formEdit.phone;
         var ureg=/^[a-z0-9]{3,12}$/i;
             var preg=/^[0-9]{3,16}$/;
           
             if(ureg.test(acc)==false){
                    this.$message("账号格式错误");
                    return
             }
             if(preg.test(pas)==false){
                 this.$message("密码格式错误");
                 return
             }
        if(acc,pas,nam,pho===''){
             this.$message(`内容不能为空`);
                 return
        }
         var peg=/^1[3456789]\d{9}$/;
           if(peg.test(pho)==false){
                    this.$message("手机号格式错误");
                    return
             }
        var url='mgr/add';
        this.axios.post(url+'?'+'account='+acc+'&'+'password='+pas+'&'+'name='+nam+'&'+'phone='+pho+'&'+'avatar='+res.data.msg+"&"+'createUser='+window.localStorage['token']+'&'+'roleId='+this.value).then(result=>{
                
                 if(result.data.status==200){
                   
                   this.$message('创建成功')
                   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                  
                    this.value='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else if(result.data.status==200){
                   this.$message('账户名重复')
                 }else{
                   this.$message('创建失败')
                 }
        })
        }
      })

        
      },
      xiugai(){
      if(qwe==1){
        const formData = new FormData()
      formData.append('file',this.file)
  
      formData.append('paramValue',1)
      this.axios.post(`/file/picupload`,formData)
      .then(res => {
          if(res.status == 200){img=res.data.msg}
           var acc=this.formEdit.uname;
        var pas=this.formEdit.pwd;
        var nam=this.formEdit.name;
        var pho=this.formEdit.phone;
         var ureg=/^[a-z0-9]{3,12}$/i;
             var preg=/^[0-9]{3,16}$/;
           
             if(ureg.test(acc)==false){
                    this.$message("账号格式错误");
                    return
             }
             if(preg.test(pas)==false){
                 this.$message("密码格式错误");
                 return
             }
        if(acc,pas,nam,pho===''){
             this.$message(`内容不能为空`);
                 return
        }
         var peg=/^1[3456789]\d{9}$/;
           if(peg.test(pho)==false){
                    this.$message("手机号格式错误");
                    return
             }
       var url='mgr/updateUser';
        
        this.axios.post(url+'?'+'account='+acc+'&'+'password='+pas+'&'+'name='+nam+'&'+'phone='+pho+'&'+'avatar='+img+'&'+'userId='+id+"&"+'updateUser='
        +window.localStorage['token']+'&'+'roleId='+roleid).then(result=>{
          
                 if(result.data.status==200){
                
                  
                  this.$message('修改成功')
                   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                  this.value='';
                   this.dialogEdittVisible =false;
                     this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
       
      })
      })
       
      }else{
        var acc=this.formEdit.uname;
        var pas=this.formEdit.pwd;
        var nam=this.formEdit.name;
        var pho=this.formEdit.phone;
         var ureg=/^[a-z0-9]{3,12}$/i;
             var preg=/^[0-9]{3,16}$/;
           
             if(ureg.test(acc)==false){
                    this.$message("账号格式错误");
                    return
             }
             if(preg.test(pas)==false){
                 this.$message("密码格式错误");
                 return
             }
        if(acc,pas,nam,pho===''){
             this.$message(`内容不能为空`);
                 return
        }
         var peg=/^1[3456789]\d{9}$/;
           if(peg.test(pho)==false){
                    this.$message("手机号格式错误");
                    return
             }
       var url='mgr/updateUser';
        
        this.axios.post(url+'?'+'account='+acc+'&'+'password='+pas+'&'+'name='+nam+'&'+'phone='+pho+'&'+'avatar='+img+'&'+'userId='+id+"&"+'updateUser='
        +window.localStorage['token']+'&'+'roleId='+roleid).then(result=>{
           
                 if(result.data.status==200){
                  this.$message('修改成功')
              
                    
                   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                  this.value='';
                   this.dialogEdittVisible =false;
                  this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
       
      })
      }

      }
      },
}
</script>
<style  scoped>
@import '../../pul/css/ele.css';
.el-pagination{
    text-align: center;
    margin-top: 35px;
    font-size: 27px;
}

.el-icon-delete,.el-icon-edit,.el-icon-view{
   padding-left:15px; 
    font-size: 28px;
     line-height: 25px;
    color: black;
    
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
    left: 24%;
    top: 38%;
    opacity: 0;
    }
 .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }
</style>


