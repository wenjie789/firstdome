<template>
    <div>
        <el-row>
        <el-col :span="12"><span style="line-height:100px;"><span>{{value2}}</span>智慧健康养老平台</span></el-col>
        <el-col :span="12"><span style=" font-size: 22px;line-height:100px;float:right">
          <i @click="tohome()" class="el-icon-user-solid"></i>
          {{value}}&nbsp;&nbsp;&nbsp;&nbsp;
          <i  @click="tologin()" class="el-icon-switch-button"></i>
        </span></el-col>
      </el-row>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="600px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="养老院名称:">
                    <el-input v-model="formEdit.name"></el-input>
                </el-form-item>
         
                <el-form-item label="账户名:">
                    <el-input v-model="formEdit.uname"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                   <el-input v-model="formEdit.pwd"></el-input>
                    
                </el-form-item>
                 <el-form-item label="报警手机号">
                    <el-input  v-model="formEdit.phone" ></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="dialogEdittVisible = false">取 消</el-button>
                <el-button type="success"  @click="xiugai()">修改</el-button>
                <el-button type="success"  @click="cleat()">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
var img;
export default {
  data(){
    return{
        value:'',
         
           formEdit: { //表单编辑
                name: '',
                uname:'',
                phone:'',
                pwd:'',
            },
            value2:'',
            formEditTitle:'查看',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
    }
  },
  
     
             
  mounted(){
     var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+window.localStorage['token']).then(res=>{
          
  this.value=res.data.data.account;

  this.value2=res.data.data.name;
  })
  },
    methods:{
        xiugai(){
          var a,b,c,d,e;
          a=this.formEdit.name,
          b=this.formEdit.pwd,
          c=this.formEdit.uname,
         
          e=this.formEdit.phone
             if(a,b,c,d,e==''){
            this.$message(`内容不能为空`);
            return;
              }; 
              var url='mgr/updateUser';
             this.axios.post(url+'?'+'account='+a+'&'+'password='+b+'&'+'name='+c+'&'+'phone='+e+'&'+'userId='+window.localStorage['token']+"&"+'updateUser='+window.localStorage['token']).then(result=>{
                 if(result.data.status==200){
                  this.$message('修改成功')
                   
                 }else{
                   this.$message('修改失败')
                 }
        })
        },
        tohome(){
          this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='个人信息';
                this.formEditDisabled=false;
            });
            var url='mgr/getUserInfo';
            this.axios.get(url+'?userId='+window.localStorage['token']).then(res=>{
               
                this.formEdit.name=res.data.data.name;
                this.formEdit.pwd=res.data.data.pwd;
              
                this.formEdit.uname=res.data.data.account;
                this.formEdit.phone=res.data.data.phone;
             
            })
        },
        cleat(){
        
          this.dialogEdittVisible = false;
         
        },
         tologin(){
           $.cookie('userId', null);
            this.$router.push('login')
        },
        
    }
}
</script>
<style scoped>

 div{
      font-size: 30px;
    color: #333;
    
   
  }
  .el-icon-user-solid,.el-icon-switch-button{
       font-size: 30px;
        color: #333;
  }
   .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }
</style>


