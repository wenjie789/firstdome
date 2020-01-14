<template>
    <div>
       <el-container>
            <el-header>
               <div class="a1">
                <span class="font">数据记录-长者</span>
                <span class="font1">摄像头来源:</span>
                <el-button>全部</el-button>
                <el-button>大门出入口</el-button>
                <el-button>活动室</el-button>
                <el-button>电梯口</el-button>
                <el-button>走廊</el-button>
                <el-button>其他公共区域</el-button>
                <div class="a1">
                <el-input class="imp"    v-model="input" @keyup.enter.native="sousuo(1)" v-show="quan1==true"
                        placeholder="输入长者姓名或手机号"
                    >
                </el-input>
                <i @click="sousuo(1)" style="font-size:35px;" class="el-icon-search"></i>
                </div>
            </div>
            </el-header>
            <el-main>
                <el-table
                :data="userinfo"
                        stripe
                style="width: 100%">
                <el-table-column
                prop="recordName"
                label="时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="recordRoom"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="recordSenior"
                label="性别">
                </el-table-column>
                <el-table-column
                prop="recordCard"
                label="特殊照护">
                </el-table-column>
                <el-table-column
                prop="recordTel"
                label="照护等级">
                </el-table-column>
                 <el-table-column
                prop="joinTime"
                label="位置">
                </el-table-column>
                  <el-table-column
                prop="joinTime"
                label="滞留时长">
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
import {mapState} from 'vuex'
var img;
var id;
export default {
   data(){
       return{
         sousuoY:'',
        quan1:false,
        quan2:false,
        quan3:false,
            imageUrl:'',
            input:'',
            pageSize:8,
            currentPage:1,
            total:0,
            userinfo:[],
            formEdit: { //表单编辑
                uname: '',
                fang:'',
                tan:'',
                tel:'',
                ka:''
            },
            imageUrl:'',
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
       if(this.arr[i].name=='搜索记录'){
           this.quan1=true;
         }if(this.arr[i].name=='查看访客记录'){
           this.quan2=true;
         }if(this.arr[i].name=='删除记录'){
           this.quan3=true;
         }
      }
      })
    },
    methods:{
       
       
        //搜索功能
          sousuo(obj){
      
          //this.currentPage=1;
          this.sousuoY=2;
            var url="visitorrecord/list";
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
           var url="visitorrecord/delete";
           	  this.$confirm('删除该访客记录，是否继续?', '提示', { type: 'warning' })
                .then(() => { // 向服务端请求删除
                 this.axios.delete(url+'?'+'recordId='+obj).then((response) => {
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
            var url="visitorrecord/list";
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
.el-icon-delete,.el-icon-view{
    margin-left: 5px;
    font-size: 25px;

    color: black;
    
}
.el-icon-delete{
    padding-right: 10px
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
.font1{
    font-size: 20px;
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
