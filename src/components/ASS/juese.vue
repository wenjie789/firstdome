
<template>
        <div>
         <div class="tree-box" v-show="x1==true"><span @click="xs1()">×</span>
                    <div class="zTreeDemoBackground left">
                        <ul id="treeDemo1" class="ztree"></ul>
                    </div>
                    <button class="btn11" @click="quanx()">确定</button>
        </div>
        <el-container>
            <el-header>
                <el-input v-model="cai" @keyup.enter.native="sousuo(1)" style="width:10%;" :inline="true" placeholder="角色名称"></el-input>
                <el-button style="width:5%;" type="success" :inline="true" @click="sousuo(1)" v-show="quan2==true">搜索</el-button>
                <el-button @click="handleAdd()" style="width:5%;" type="success" :inline="true" v-show="quan1==true">添加</el-button>
            </el-header>
            <el-main>
                <el-table
                 :data="userinfo"
                        stripe   
                style="width: 100%">
                <el-table-column
                prop="name"
                label="角色名称"
               >
                </el-table-column>
              
                <el-table-column
                prop="description"
                label="备注">
                </el-table-column>
               
                <el-table-column 
                label="操作">
                <template   slot-scope="userinfo">
                    <i v-show="quan3==true" @click="handleDetail(userinfo.row.roleId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(userinfo.row.roleId)" class="el-icon-delete"></i>
                    <el-button @click="ddd(userinfo.row.roleId)" v-show="quan5==true">权限管理</el-button>
                </template>
                </el-table-column>
                </el-table>
            </el-main>
            <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled"  ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="角色名称:">
                    <el-input v-model="formEdit.name" placeholder="请输入角色名称" ></el-input>
                </el-form-item>
                
                <el-form-item label="备注:">
                   <el-input v-model="formEdit.sr" placeholder="请输入别名"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="quxiao()">取 消</el-button>
                <el-button type="success"  v-show="xian==1"  @click="cleat()">确 定</el-button>
                <el-button type="success"  v-show="xian==2" @click="xiugai()">确 定</el-button>
             
            </div>
        </el-dialog>
        
        </el-container>
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
    </div>
</template>

<script>
var updatepid;
var id;
export default {
    data(){
        return{
            sousuoY:'',
           quan1:false,
         quan2:false,
         quan3:false,
         quan4:false,
          quan5:false,
            options:[],
            value:'',
            pageSize:8,
            currentPage:1,
            total:0,
            xian:'',
            cai:'',
            cen:'',
            setting1:{
                    data:{
                        simpleData:{
                            enable: true,
                            // idKey: "id",
                            // pIdKey: "pId",
                            // rootPId: 0
                        }
                    },
                    check:{
                    enable: true,
                   
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "ps", "N": "ps" }
                  },
                   /*callback : {
                    onClick : onClick1
                //用于捕获节点被点击的事件回调函数
                } */
                },
            zNodes1:[],
            x1:false,
            userinfo:[],
       
            formEdit: { //表单编辑
                name: '',
              
                sr:'',
                sf:''
            },
            
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型
        }
    },
    //updated(){this.initUser(),this.options,this.zNodes1},
        mounted(){
             
                var url='role/listall';
                  this.axios.get(url).then(res=>{
                      
                    this.options=res.data.object;
                 
                  })
           
        },
      created(){
        
           this.initUser();
           var url='role/getUserMenu/';
             this.axios.get(url+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='添加角色'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索角色'){
           this.quan2=true;
         }if(this.arr[i].name=='修改角色'){
           this.quan3=true;
         }if(this.arr[i].name=='删除角色'){
           this.quan4=true;
         }
         if(this.arr[i].name=='配置权限'){
           this.quan5=true;
         }
      }
      })
           
        //   var url='role/listpage';
        //   this.axios.get(url).then(res=>{  
        //         this.list=res.data.data    
        //   })
        },
        methods:{
            quxiao(){
                  this.formEdit.name='';
                    this.formEdit.sf='';
                    this.formEdit.sr='';
                  this.value='';
                   this.dialogEdittVisible =false;
            },
            //权限配置
            quanx(){
                this.x1=false;
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
            var nodes = treeObj.getCheckedNodes(true);
            var ids='';
            for(var i=0;i<nodes.length;i++){
                ids+=nodes[i].id+',';
            }
           if (ids.length > 0){ids= ids.substring(0,ids.length - 1);}
			
          var url='role/setAuthority';
            this.axios.get(url+'?'+'roleId='+id+"&"+'ids='+ids).then(res=>{
                if(res.data.code==200){
                    this.$message('配置成功')
                }else{
                    this.$message('配置失败')
                }
            
            })
            },

            //下拉改变
          pgai(){
              updatepid=this.value;
          },
            //下拉菜单
        cleat(){
        var acc=this.formEdit.name;
    
        // var pho=this.formEdit.lou;
         
        
       
     
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
        if(acc,qp==''){
            this.$message('不能为空')
        }
        var url='role/add';
        this.axios.post(url+'?'+'name='+acc+'&'+'description='+qp+'&pid='+1+'&'+'createUser='+window.localStorage['token']).then(result=>{
              
                 if(result.data.status==200){
                    this.$message('创建成功')
                this.formEdit.name='';
                    this.formEdit.sf='';
                    this.formEdit.sr='';
                  this.value='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else{
                   this.$message('创建失败')
                 }
        })
        },
        initUser(){
          this.sousuoY=1
            var url="role/listpage";
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
       
            //删除功能
            
        san(obj){
           var url="role/remove";
           	  this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示',{ type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'roleId='+obj).then((response) => {
                    this.$message.success('删除成功'); this.initUser();})
                    .catch((response) => {
                      this.$message.error('删除失败!');
                    });
                }) .catch(() => {
                this.$message.info('已取消操作!');
              });
       
        },
        /*san(obj){
            
           var url="role/remove";
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(()=>{this.axios.delete(url+'?'+'roleId='+obj)
                this.$message('删除成功')}
                
            )
                .catch((err)=>{
                     this.$message({message: '执行失败，请重试',type: "error"});
                 });
        },*/
        handleDetail(obj){
                id=obj;
           this.xian=2;
            var url='role/view/';
            this.axios.get(url+obj).then(res=>{
         
                 this.formEdit.name=res.data.data.name;
                 this.formEdit.sr=res.data.data.description;
                  this.formEdit.sf=res.data.data.sort;
                   this.value=res.data.data.pName;
                  updatepid=res.data.data.pid;
                   
            })
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='修改';
                 this.formEditDisabled=true;
                this.formEditDisabled=false;
            }); 
        },
        xiugai(){
        var acc=this.formEdit.name;
    
        // var pho=this.formEdit.lou;
         var pid=this.value;
        
       
     
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
       
        var url='role/edit';
     this.axios.post(url+'?'+'name='+acc+'&'+'description='+qp+'&pid='+1+'&'+'updateUser='+window.localStorage['token']+'&roleId='+id).then(result=>{
         
                 if(result.data.code==200){
                    this.$message('修改成功')
                    this.formEdit.name='';
                    this.formEdit.sf='';
                    this.formEdit.sr='';
                   this.value='';
                   this.dialogEdittVisible =false;
                   this.initUser();
                 }else{
                   this.$message('修改失败')
                 }
        })
      },
            //搜索功能
         sousuo(obj){
              var zhi=this.cai;
          this.sousuoY=2;
            var url="role/listpage";
           
            this.axios.get(url+'?currentPage='+obj+'&'+'roleName='+zhi).then(resp=>{
               if (resp){
            this.userinfo=resp.data.object;
            this.total=parseInt(resp.data.msg);
            this.currentPage=obj;
               }
            })
        },
           /* sousuo(){
                var zhi=this.cai;
                var url="role/listpage";
            this.axios.get(url+'?currentPage='+this.currentPage+"&roleName="+zhi).then(resp=>{
                this.userinfo=resp.data.object;
            this.total=parseInt(resp.data.msg);
                })
            },*/
            xs1(){
               this.x1=false; 
            },
            ddd(obj){ 
                this.zNodes1=[];
                var url='role/getRoleMenu'
          this.axios.get(url+'/'+obj).then(res=>{
            
          for ( var i in res.data) {//遍历后台的ZTreeNode集合
            var node = new Object();
            node.id = res.data[i].id;
            node.pId = res.data[i].pId;
            node.name = res.data[i].name;
            node.open = res.data[i].open;
            node.checked =res.data[i].checked;
    
            this.zNodes1.push(node);//zNodes数组添加对象
            //this.zNodes=res.data;

            }
           
           $.fn.zTree.init($("#treeDemo1"), this.setting1, this.zNodes1);
          })
                this.x1=true;
                id=obj

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
       
        }
}
</script>
<style>
 @import '../../pul/css/zTreeStyle/zTreeStyle.css';
 .btn11{
     position: absolute;
     top:393px;left: 90px;
 }
    div.zTreeDemoBackground {
 width: 250px;
 height: 350px;
 text-align: left;
}

ul.ztree {
 margin-top: 10px;
 border: 1px solid #617775;
 background: #f0f6e4;
 width: 220px;
 height: 100%;
 overflow-y: scroll;
 overflow-x: auto;
}

ul.log {
 border: 1px solid #617775;
 background: #f0f6e4;
 width: 300px;
 height: 170px;
 overflow: hidden;
}

ul.log.small {
 height: 45px;
}

ul.log li {
 color: #666666;
 list-style: none;
 padding-left: 10px;
}

ul.log li.dark {
 background-color: #E3E3E3;
}
    .el-icon-edit,.el-icon-delete{
        font-size: 25px;
        margin-right: 3px
    }
    .tree-box{
        position: fixed;
        width:500px;
        
        z-index: 999999999;
        left:50%;top:50%;
        
        margin-top:-250px; 
       
    }
    #areaTree{
        border:1px solid #e5e5e5;margin-bottom: 2px;border-radius: 4px;overflow: hidden;
    }
    .box-title{
        border-radius: 3px 3px 0 0;background-color: #f5f5f5;
    }
    .box-title a{
        color: #2fa4e7;
        text-decoration: none;font-size:14px;display:block;
        padding: 8px 15px;cursor: pointer;
    }
    .box-title .fa{
        float:right;line-height: 20px;
    }
     .el-icon-search:hover{
   cursor:pointer;
   background-color: green;
 }
</style>