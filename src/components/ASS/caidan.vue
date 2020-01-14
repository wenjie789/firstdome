<template>
    <div>
         <div class="tree-box" v-show="x1==true"><span @click="xs1()">×</span>
                    <div class="zTreeDemoBackground left">
                        <ul id="treeDemo" class="ztree"></ul>
                    </div>
                   
            </div>
        <el-container>
            <el-header>
                <el-input v-model="cai" style="width:10%;"  @keyup.enter.native="sousuo()" :inline="true" placeholder="菜单名称/编码"></el-input>
                <el-input v-model="cen" style="width:10%;" @keyup.enter.native="sousuo()" :inline="true" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="层级"></el-input>
                <el-button style="width:5%;" type="success" :inline="true" @click="sousuo()" v-show="quan2==true">搜索</el-button>
                <el-button @click="handleAdd()" style="width:5%;" type="success" :inline="true" v-show="quan1==true">添加</el-button>
            </el-header>
            <el-main>
                <el-table
                :data="list"
                        stripe
                style="width: 100%">
                <el-table-column
                prop="name"
                label="菜单名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="code"
                label="菜单编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="pcode"
                label="菜单父编号">
                </el-table-column>
                <el-table-column
                prop="url"
                label="请求地址">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="排序">
                </el-table-column>
                <el-table-column
                prop="levels"
                label="层级">
                </el-table-column>
                <el-table-column
                prop="isMenuName"
                label="是否为菜单">
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                </el-table-column>
                <el-table-column 
                label="操作">
                <template   slot-scope="list">
                    <i v-show="quan3==true" @click="handleDetail(list.row.menuId)" class="el-icon-edit"></i><i v-show="quan4==true" @click="san(list.row.menuId)" class="el-icon-delete"></i>
                </template>
                </el-table-column>
                </el-table>
            </el-main>
            <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="900px" height="400px">
            <el-form   :disabled="formEditDisabled"  ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="名称">
                    <el-input v-model="formEdit.name" placeholder="请输入名称" ></el-input>
                </el-form-item>
                <el-form-item label="菜单编号">
                    <el-input v-model="formEdit.sex" placeholder="请输入菜单编号"></el-input>
                </el-form-item>
                
                 <el-form-item label="父级编号">
                   <el-input @focus="ddd()" id="pcode" v-model="formEdit.lou" placeholder="请输入父级编号"></el-input>
                  <el-input v-model="formEdit.pid" id="pid" v-show="false"></el-input>
                </el-form-item>
                <el-form-item label="是否为菜单">
                            <el-radio-group v-model="formEdit.resource">
                            <el-radio  label="Y"></el-radio>
                            <el-radio label="N"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                <el-form-item label="请求地址">
                   <el-input v-model="formEdit.sr" placeholder="请输入请求地址"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                   <el-input v-model="formEdit.sf" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="请输入排序"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="quxiao()">取 消</el-button>
                <el-button type="success"  v-show="xian==1"  @click="cleat()">确 定</el-button>
                <el-button type="success"  v-show="xian==2" @click="xiugai()">确 定</el-button>
             
            </div>
        </el-dialog>
        
        </el-container>
    </div>
</template>

<script>
    var menueId = "";//菜单id
    var menueName = "";//菜单名
    var id;
	//获得被点击的菜单名称和菜单id
	function onClick(e, treeId, treeNode) {
		//每次点击之前先要清除之前的menueName，不然会一直添加数据
		menueName = "";
		//获取 zTree 当前被选中的节点数据集合
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"), nodes = zTree
				.getSelectedNodes();
		//获得菜单id
		menueId = treeNode.id;
		//根据id排序
		nodes.sort(function compare(a, b) {
			return a.id - b.id;
		});
		//遍历所有被选中的菜单项（可以多选），将这些菜单项的名称都敷给menueName这个变量拼接
		for (var i = 0, l = nodes.length; i < l; i++) {
			menueName += nodes[i].name + ",";
		}
		//提取menueName中介于0，menueName长度之间的字符，把最后一个逗号去除
		if (menueName.length > 0)
			menueName = menueName.substring(0, menueName.length - 1);
		//给文本框赋值，将所有选中的菜单名称显示出来
		$("#pcode").val(menueName);
        $("#pid").val(menueId);
        
	}
export default {
    data(){
        return{
         quan1:false,
         quan2:false,
         quan3:false,
         quan4:false,
            xian:'',
            cai:'',
            cen:'',
            setting:{
                    data:{
                        simpleData:{
                            enable: true,
                            // idKey: "id",
                            // pIdKey: "pId",
                            // rootPId: 0
                        }
                    },
                   
                   callback : {
                    onClick : onClick
                //用于捕获节点被点击的事件回调函数
                } 
                },
            zNodes:[],
            x1:false,
            list:[],
       
            formEdit: { //表单编辑
                name: '',
                sex:'',
                lou:'',
                pid:'',
                resource: '',
                sr:'',
                sf:''
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型
        }
    },
   // updated(){this.list, this.zNodes},
      mounted(){
          var url='menu/selectMenuTreeList';
          this.axios.get(url).then(res=>{
          for ( var i in res.data) {//遍历后台的ZTreeNode集合
            var node = new Object();
            node.id = res.data[i].id;
            node.pId = res.data[i].pId;
            node.name = res.data[i].name;
            node.open = res.data[i].open;
            this.zNodes.push(node);//zNodes数组添加对象
            //this.zNodes=res.data;
            }
           
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
          })
          var url='menu/listTree';
          this.axios.get(url).then(res=>{     
                this.list=res.data.data    
          })
          var crl='role/getUserMenu/';
            this.axios.get(crl+window.localStorage['token']).then(res=>{  
            this.arr=res.data;
            for(var i=0;i<this.arr.length;i++){
         if(this.arr[i].name=='添加菜单'){
           this.quan1=true;
         }if(this.arr[i].name=='搜索菜单'){
           this.quan2=true;
         }if(this.arr[i].name=='修改菜单'){
           this.quan3=true;
         }if(this.arr[i].name=='删除菜单'){
           this.quan4=true;
         }
      }
      })
          
        },
        methods:{
            quxiao(){
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
            },
            //删除功能
        san(obj){
            
           var url="menu/remove";
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(()=>this.axios.delete(url+'?'+'menuId='+obj)
                
            )
                .catch((err)=>{
                     this.$message({message: '执行失败，请重试',type: "error"});
                 });
        },
              handleDetail(obj){
                id=obj;
           this.xian=2;
            var url='menu/getMenuInfo';
            this.axios.get(url+'?menuId='+obj).then(res=>{
                 this.formEdit.name=res.data.data.name;
                 this.formEdit.sex=res.data.data.code;
                  this.formEdit.lou=res.data.data.pcodeName;
                   this.formEdit.pid=res.data.data.pid;
                   this.formEdit.resource=res.data.data.menuFlag;
                   this.formEdit.sr=res.data.data.url;
                   this.formEdit.sf=res.data.data.sort;
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
        var pas=this.formEdit.sex;
        var pho=$("#pcode").val();
        var pid=$("#pid").val();
      
        var qd=this.formEdit.resource;
        
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
        if(acc,pas==''){
             this.$message(`内容不能为空`);
                 return                       
        }
     
        var url='menu/edit';
       this.axios.post(url+'?'+'name='+acc+'&'+'code='+pas+'&'+'pcode='+pho+'&'+'menuFlag='+qd
        +'&'+'url='+qp+'&'+'sort='+qo+'&pid='+pid+'&'+'updateUser='+window.localStorage['token']+'&menuId='+id).then(result=>{
            
                 if(result.data.code==200){
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
                 }else{
                   this.$message('修改失败')
                 }
        })
      },
          
            sousuo(){
                  
                var url='menu/listTree';
          this.axios.get(url+'?menuName='+this.cai+'&'+'level='+this.cen).then(res=>{
                this.list=res.data.data 
                })
            },
            xs1(){
               this.x1=false; 
            },
            ddd(){
                this.x1=true;
                
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
        var pas=this.formEdit.sex;
        // var pho=this.formEdit.lou;
        // var pid=this.formEdit.pid;
        var pho=$("#pcode").val();
        var pid=$("#pid").val();
        var qq=this.formEdit.resource;
        var qp=this.formEdit.sr;
        var qo=this.formEdit.sf;
       if(acc,pid,qp,qo,pho,pid,qq==''){
            this.$message('不能为空')
        }
        
        var url='menu/add';
        this.axios.post(url+'?'+'name='+acc+'&'+'code='+pas+'&'+'pcode='+pho+'&'+'menuFlag='+qq
        +'&'+'url='+qp+'&'+'sort='+qo+'&pid='+pid+'&'+'createUser='+window.localStorage['token']).then(result=>{
            
                 if(result.data.status==200){
                    this.$message('创建成功')
                  this.formEdit='';
                   this.dialogEdittVisible =false;
                 }else{
                   this.$message('创建失败')
                 }
        })
        }
        }
}
</script>
<style scoped>
    .el-icon-edit,.el-icon-delete{
        font-size: 25px;
        margin-right: 3px
    }
    .tree-box{
        position: fixed;
        width:500px;
        z-index: 999999;
        left:50%;top:50%;
        margin-left:-250px; 
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