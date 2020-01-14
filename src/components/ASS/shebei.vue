<template>
    <div>
        <el-container>
            <el-header>
               <div class="a1">
                <span class="font">设备管理</span>
                <div class="a1">
                  <el-button @click="handleAdd()" type="success" v-show="quan1==true">新增摄像头</el-button>
                  <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo(1)" v-show="quan2==true"
                  placeholder="请输入摄像头序号、位置等"
              >
              
            </el-input>
            <i  @click="sousuo(1)" style="font-size:35px;" class="el-icon-search"></i>
          </div>
          </div>
          <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="800px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
            <el-form-item label="名称:" style="width:45%;margin-left:40px; font-weight:bold">
                <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
             <el-form-item label="位置:" style="width:45%;margin-left:10px; font-weight:bold">
                <el-input v-model="formEdit.as"></el-input>
            </el-form-item>
            <el-form-item label="供电方式:" style="width:45%; margin-left:17px;font-weight:bold">
                
                <el-select class="item-choose" v-model="formEdit.dian" >
                        <el-option 
                            v-for="(item,index) in gongdian"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="品牌:" style="width:45%;margin-left:30px; font-weight:bold">
              
                <el-select class="item-choose" v-model="formEdit.pai" >
                        <el-option 
                            v-for="(item,index) in pingpai"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
            </el-form-item>
            
            <el-form-item label="Rtsp流地址:"  style="width:100%; font-weight:bold">
                <el-input v-model="formEdit.rts"></el-input>
            </el-form-item>
          
            <el-form-item label="IP:" style="width:35%;margin-left:60px; font-weight:bold">
                <el-input v-model="formEdit.ip"></el-input>
            </el-form-item>
            <el-form-item label="账户:" style="width:35%;margin-left:60px; font-weight:bold">
                <el-input v-model="formEdit.una"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="width:35%;margin-left:50px; font-weight:bold">
                <el-input v-model="formEdit.pwd"></el-input>
            </el-form-item>
            <el-form-item label="像素:" style="width:35%;margin-left:70px; font-weight:bold">
               <el-select class="item-choose" v-model="formEdit.bei" >
                        <el-option 
                            v-for="(item,index) in xiangsuzu"
                            :key="index"
                            :label="item"
                            :value="item"
                         >{{item}}
                        </el-option>
                    </el-select>
            </el-form-item>
           
            
            
    </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="quxiao()">取 消</el-button>
                <el-button type="success"  v-show="xian==1" @click="cleat()">确 定</el-button>
                <el-button type="success"  v-show="xian==2" @click="xiugai()">确 定</el-button>
                <el-button type="success"  v-show="xian==3" @click="chakan()">确 定</el-button>
            </div>
        </el-dialog>
            </el-header>
            <el-main>
                <el-table
               
                :data="userinfo"
                        stripe
                style="width: 100%;">
                <el-table-column
                label="设备序号"
                width="100"
                
                >
                <template slot-scope="userinfo" >
                    <span>{{(currentPage - 1) * pageSize + userinfo.$index + 1}}</span>
                </template>
                </el-table-column>

                <el-table-column
                
                prop="equipmentRtsp"
                label="Rtsp流地址"
                width="480">
                </el-table-column>

                <el-table-column
                prop="equipmentSite"
                label="位置"
                width="180">
                </el-table-column>
                <el-table-column
                prop="equipmentPixel"
                label="像素"
                 width="180">
                </el-table-column>
                <el-table-column
                prop="equipmentMode"
                label="供电方式"
                 width="180">
                </el-table-column>
                <el-table-column
                prop="equipmentBrand"
                label="品牌"
                 width="180">
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="userinfo">
                     <i v-show="quan5==true" @click="cha(userinfo.row.equipmentId)" class="el-icon-view"></i><i v-show="quan3==true" @click="handleDetail(userinfo.row.equipmentId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(userinfo.row.equipmentId)" class="el-icon-delete"></i>
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
        <span class="font">设备管理-列表</span>
        <div class="a1">
          <el-button v-show="quan1==true" @click="handleAdd()" type="success">新增摄像头</el-button>
          <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo" v-show="quan2==true"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
       >
  </el-input>
        </div>
    </div>
     <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
            <el-form-item label="名称:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
            <el-form-item label="Rtsp流地址:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.rts"></el-input>
            </el-form-item>
            <el-form-item label="IP:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.ip"></el-input>
            </el-form-item>
            <el-form-item label="账户:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.una"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.pwd"></el-input>
            </el-form-item>
            <el-form-item label="像素:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.bei"></el-input>
            </el-form-item>
            <el-form-item label="位置:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.as"></el-input>
            </el-form-item>
            <el-form-item label="供电方式:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.dian"></el-input>
            </el-form-item>  
            <el-form-item label="品牌:" style="width:35%; font-weight:bold">
                <el-input v-model="formEdit.pai"></el-input>
            </el-form-item>
    </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-show="xian==1" @click="cleat()">确 定</el-button>
                <el-button v-show="xian==2" @click="xiugai()">确 定</el-button>
                <el-button v-show="xian==3" @click="chakan()">确 定</el-button>
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
        <el-col :span="4"><div @click="cha(t.equipmentId)" class="grid-content bg-purple">{{++i}}</div></el-col>
        <el-col :span="4"><div @click="cha(t.equipmentId)" class="grid-content bg-purple">{{t.equipmentSite}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.equipmentPixel}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.equipmentMode}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{t.equipmentBrand}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><i v-show="quan3==true" @click="handleDetail(t.equipmentId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(t.equipmentId)" class="el-icon-delete"></i></div></el-col>
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
</div>-->

    
    </div>
</template>
<script>


var id;
export default {
 
   data(){
       return{
        i:0,
        n:'',
      sousuoY:'',
      xiangsuzu:['100万','200万','300万','400万','500万','600万','800万'],
      gongdian:['POE','电源','混合'],
      pingpai:['海康','大华','萤石','小米','天地伟业','亚安','安讯士'],
          quan1:false,
         quan2:false,
         quan3:false,
         quan4:false,
         quan5:false,
          input:'',
            pageSize:8,
            currentPage:1,
            total:0,
            userinfo:[],
           xian:'1',
       
           formEdit: { //表单编辑
                name: '',
                rts:'',
               bei:'',//像素
                as:'',
                dian:'',//电源
                pai:'',//品牌
                una:'',
                pwd:'',
                ip:'',
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
       }
   },

 mounted(){
      this.initUser();
      var url='role/getUserMenu/';
        this.axios.get(url+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
          for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='添加设备'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索设备'){
           this.quan2=true;
         }if(this.arr[i].name=='修改设备'){
           this.quan3=true;
         }if(this.arr[i].name=='删除设备'){
           this.quan4=true;
         }if(this.arr[i].name=='查看设备'){
           this.quan5=true;
         }

      }
      })
    },
    methods:{
    
        quxiao(){this.dialogEdittVisible = false;  
         this.formEdit.name='';
            this.formEdit.rts='';
            this.formEdit.bei='';
            this.formEdit.as='';
                    this.formEdit.dian='';
                    this.formEdit.pai='';
                    this.formEdit.una='';
                    this.formEdit.pwd='';
                    this.formEdit.ip='';
         },
        chakan(){
            this.formEdit.name='';
            this.formEdit.rts='';
            this.formEdit.bei='';
            this.formEdit.as='';
                    this.formEdit.dian='';
                    this.formEdit.pai='';
                    this.formEdit.una='';
                    this.formEdit.pwd='';
                    this.formEdit.ip='';
                    this.dialogEdittVisible =false;
        },
        cha(obj){
          this.xian=3;
          var url='equipment/getEquipmentInfo';
            this.axios.get(url+'?equipmentId='+obj).then(res=>{
                this.formEdit.name=res.data.object.equipmentName;
                 this.formEdit.rts=res.data.object.equipmentRtsp;
                  this.formEdit.bei=res.data.object.equipmentPixel;
                   this.formEdit.as=res.data.object.equipmentSite;
                   this.formEdit.dian=res.data.object.equipmentMode;
                   this.formEdit.pai=res.data.object.equipmentBrand;
                   this.formEdit.una=res.data.object.equipmentRtspname;
                   this.formEdit.pwd=res.data.object.equipmentRtsppwd;
                   this.formEdit.ip=res.data.object.equipmentRtspip;
            })
            this.dialogEdittVisible=true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='设备管理-查看';
                 this.formEditDisabled=true;
                this.formEditDisabled=true;
            }); 
        },
        handleDetail(obj){
            id=obj;
            this.xian=2;
            var url='equipment/getEquipmentInfo';
            this.axios.get(url+'?equipmentId='+obj).then(res=>{
                this.formEdit.name=res.data.object.equipmentName;
                 this.formEdit.rts=res.data.object.equipmentRtsp;
                  this.formEdit.bei=res.data.object.equipmentPixel;
                   this.formEdit.as=res.data.object.equipmentSite;
                   this.formEdit.dian=res.data.object.equipmentMode;
                   this.formEdit.pai=res.data.object.equipmentBrand;
                   this.formEdit.una=res.data.object.equipmentRtspname;
                   this.formEdit.pwd=res.data.object.equipmentRtsppwd;
                   this.formEdit.ip=res.data.object.equipmentRtspip;
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='设备管理-修改';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
        },
        //搜索功能
      
        sousuo(obj){
       
          //this.currentPage=1;
          this.sousuoY=2;
            var url="equipment/list";
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
       /* san(obj){
           var url="equipment/delete";
            this.$confirm('删除该设备，是否继续??', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>this.axios.delete(url+'?'+'equipmentId='+obj)
                
            )
                .catch((err)=>{
                     this.$message({message: '执行失败，请重试',type: "error"});
                 });
            
           
        },*/
        san(obj){
           var url="equipment/delete";
           	  this.$confirm('删除该设备，是否继续??', '提示',{ type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'equipmentId='+obj).then((response) => {
                    this.$message.success('删除成功');this.initUser();})
                    .catch((response) => {
                      this.$message.error('删除失败!');
                    });
                }) .catch(() => {
                this.$message.info('已取消操作!');
              });
       
        },
          initUser(){
          this.sousuoY=1
            var url="equipment/list";
            this.axios.get(url+'?currentPage='+this.currentPage).then(resp=>{
            if (resp){
             // console.log(resp)
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
            this.xian=1;
            this.dialogEdittVisible = true;

            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });
        },
        
        cleat(){
        var acc=this.formEdit.name;
        var pas=this.formEdit.rts;
        var nam=this.formEdit.bei;
        var pho=this.formEdit.as;
        var av=this.formEdit.dian;
        var qv=this.formEdit.pai;
        var una=this.formEdit.una;
        var pwd=this.formEdit.pwd;
        var ip=this.formEdit.ip;
        if(acc,pas,nam,pho,av,una,pwd,ip==''){
             this.$message(`内容不能为空`);
                 return
        }
        var url='equipment/add';
        this.axios.post(url+'?'+'equipmentName='+acc+'&'+'equipmentRtsp='+pas+'&'+'equipmentPixel='+nam+
        '&'+'equipmentSite='+pho+'&'+'equipmentMode='+av+'&'+'equipmentBrand='+qv+'&'+'equipmentRtspname='+una+'&'+'equipmentRtsppwd='+pwd+'&'+'equipmentRtspip='+ip+'&'+'createUser='+window.localStorage['token']).then(result=>{
                 
                 if(result.data.status==200){
                   this.$message('创建成功');
                    this.formEdit.name='';
                    this.formEdit.rts='';
                    this.formEdit.bei='';
                    this.formEdit.as='';
                    this.formEdit.dian='';
                    this.formEdit.pai='';
                    this.formEdit.una='';
                    this.formEdit.pwd='';
                    this.formEdit.ip='';
                    this.dialogEdittVisible =false;
                    this.initUser();
                 }else{
                   this.$message('创建失败')
                 }
        })},
      xiugai(){
        var acc=this.formEdit.name;
        var pas=this.formEdit.rts;
        var nam=this.formEdit.bei;
        var pho=this.formEdit.as;
        var av=this.formEdit.dian;
        var qv=this.formEdit.pai;
        var una=this.formEdit.una;
        var pwd=this.formEdit.pwd;
        var ip=this.formEdit.ip;
         if(acc,pas,nam,pho,av,una,pwd,ip==''){
             this.$message(`内容不能为空`);
                 return
        }
        var url='equipment/edit';
      
        this.axios.post(url+'?'+'equipmentName='+acc+'&'+'equipmentRtsp='+pas+'&'+'equipmentPixel='+nam+
        '&'+'equipmentSite='+pho+'&'+'equipmentMode='+av+'&'+'equipmentBrand='+qv+'&'+'equipmentRtspname='+una+'&'+'equipmentRtsppwd='+pwd+'&'+'equipmentRtspip='+ip+'&'+'equipmentId='+id).then(result=>{
                 
                 if(result.data.status==200){
                  this.$message('修改成功')
                   this.formEdit.uname='';
                   this.formEdit.pwd='';
                   this.formEdit.name='';
                   this.formEdit.phone='';
                   this.dialogEdittVisible =false;
                this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
      }, 
    }
}
</script>
<style  scoped>

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
 .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }

</style>


