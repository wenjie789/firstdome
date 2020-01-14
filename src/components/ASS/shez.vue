<template>
    <div>
      
         <el-container>
            <el-header>
               <div class="a1">
                <span class="font">系统设置</span>
                <div class="a1">
                 
          </div>
          </div>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="1100px" height="400px">
            <el-form  style="position: relative;"  :disabled="formEditDisabled"  ref="formEdit" :model="formEdit" class="demo-form-inline">
                 
                 
                 <el-form-item label="欢迎词第一行:">
                    <el-input  v-model="formEdit.first" placeholder="请输入欢迎词"></el-input>
                </el-form-item>
                <el-form-item label="欢迎词第二行:">
                    <el-input  v-model="formEdit.last" placeholder="请输入欢迎词"></el-input>
                </el-form-item>
               
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="quxiao()">取 消</el-button>
         
                <el-button type="success"  @click="xiugai()">确 定</el-button>
            </div>
        </el-dialog>
            </el-header>
            <el-main>
                <el-table
                :data="options1"
                        stripe
                style="width: 100%">
                <el-table-column
                prop="title"
                label="欢迎词第一行">
                </el-table-column>
                    <el-table-column
                prop="content"
                label="欢迎词第二行">
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="options">
                   <!-- <span   v-show="quan5==true" @click="cha(userinfo.row.userId)"><i class="el-icon-view"></i></span> -->
                   <i class="el-icon-edit"  @click="handleDetail(options.row.userId)" ></i>
                  <!-- <i class="el-icon-delete" v-show="quan4==true" @click="san(userinfo.row.userId)"></i> -->
                </template>
                </el-table-column>
                </el-table>
            </el-main>
            
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
var roleid;
export default {

   data(){
       return{
        options1:[],
        formEdit:{ //表单编辑
          first:'',
          last:'',
            },
            formEditTitle:'修改欢迎词',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
       }
   },
computed:{
        ...mapState(['http'])
    },
 created(){
    
    },
     mounted(){
            this.tem();   
        },

    methods:{
      tem(){
         var url='notice/selectAll';
                  this.axios.get(url).then(res=>{
                    console.log(res)
                    this.options1=res.data;
                  })
      },
      //取消
      quxiao(){this.dialogEdittVisible = false;   
      },
        handleDetail(obj){
        this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改欢迎词';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
            var url='notice/selectAll';
            this.axios.get(url).then(res=>{
          this.formEdit.first=res.data[0].title;
                this.formEdit.last=res.data[0].content;
                roleid=res.data[0].noticeId;
               
            })
           
        },
        

     
       
        
        
    
      xiugai(){
     
        var acc=this.formEdit.first;
        var pas=this.formEdit.last;
       
        if(acc,pas===''){
             this.$message(`内容不能为空`);
                 return
        }
     
       var url='notice/update';
        
        this.axios.post(url+'?'+'title='+acc+'&'+'content='+pas+"&"+'updateUser='
        +window.localStorage['token']+'&'+'noticeId='+roleid).then(result=>{
          
                 if(result.data.status==200){
                
                  this.tem();   
                  this.$message('修改成功')
                   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                  this.value='';
                   this.dialogEdittVisible =false;
                   
                 }else{
                   this.$message('修改失败')
                 }
       
      })
      }}
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


