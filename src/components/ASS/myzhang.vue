<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
          <div id="parent">
            <el-form-item label="名称:" style="width:35%; font-weight:bold">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Rtsp流地址:" style="width:35%; font-weight:bold">
                <el-input v-model="form.rts"></el-input>
            </el-form-item>
            <el-form-item label="像素:" style="width:35%; font-weight:bold">
                <el-input v-model="form.bei"></el-input>
            </el-form-item>
            <el-form-item label="位置:" style="width:35%; font-weight:bold">
                <el-input v-model="form.as"></el-input>
            </el-form-item>
            <el-form-item label="供电方式:" style="width:35%; font-weight:bold">
                <el-input v-model="form.dian"></el-input>
            </el-form-item>  
            <el-form-item label="品牌:" style="width:35%; font-weight:bold">
                <el-input v-model="form.pai"></el-input>
            </el-form-item> 
             <el-button style="margin-top:50px;margin-left:-380px;"  type="success" @click="cleat()">确定创建</el-button>
          </div>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        form: {
          name: '',
          rts:'',
         bei:'',
         as:'',
         dian:'',
         pai:'',
        },
      }
    },
    methods: {
      cleat(){
      
        var acc=this.form.name;
        var pas=this.form.rts;
        var nam=this.form.bei;
        var pho=this.form.as;
        var av=this.form.dian;
        var qv=this.form.pai;
        var url='equipment/add';
    
        axios.post(url+'?'+'equipment_name='+acc+'&'+'equipment_rtsp='+pas+'&'+'equipment_pixel='+nam+
        '&'+'equipment_site='+pho+'&'+'equipment_mode='+av+'&'+'equipment_brand='+qv).then(result=>{
                 console.log(result)
                 if(result.status==200){
                   alert('创建成功')
                 }else{
                   alert('创建失败')
                 }
        })
      },
    }
  }
</script>
<style scoped>
  #parent{
    width:60%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .el-checkbox-group{
    width:100%;  
  }
  .el-checkbox{
    width:100%;
    text-align:center;
    border:1px solid #ccc;
  }
  .parent{
    width:100%;
    display: flex;
    justify-content: space-between;
  }
  .el-form-item:nth-child(1){
    width:20.7%;
  }
  .el-checkbox-group{
    margin-top:20px;
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
</style>