<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
          <div id="parent">
            <el-form-item label="养老院名称:" style="width:35%; font-weight:bold">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="养老院logo:" style="width:35%; font-weight:bold">
               <el-upload 
                  class="avatar-uploader"
                  action="http://192.168.1.100:8090/file/upload"
                  :show-file-list="true"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
               
            </el-form-item>
            <el-form-item label="账户名:" style="width:35%; font-weight:bold">
                <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="width:35%; font-weight:bold">
                <el-input v-model="form.pwd"></el-input>
            </el-form-item>  
            <el-form-item label="报警手机号:" style="width:35%; font-weight:bold">
                <el-input v-model="form.phone"></el-input>
            </el-form-item> 
             <el-button type="success" @click="cleat()">确定创建</el-button>
          </div>
          <!--<div class="parent">
            <el-form-item label="活动性质:" prop="type" style="font-weight:bold;">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="后台模块选择:" prop="type" style="font-weight:bold">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>-->
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
  var img;
  export default {
    data() {
      return {
        form: {
          name: '',
          uname:'',
          phone:'',
          pwd:'',
        },
        imageUrl: '',
        ruleForm: {
          type: []
        },
        
      }
    },
    methods: {
      cleat(){

        var acc=this.form.uname;
        var pas=this.form.pwd;
        var nam=this.form.name;
        var pho=this.form.phone;
        var av=this.imageUrl;
  
        var url='mgr/add';
        /*var obj={
          account:this.form.uname,
          password:this.form.pwd,
              name:this.form.name,
              phone:this.form.phone,
              avatar:this.imageUrl
        }*/
        axios.post(url+'?'+'account='+acc+'&'+'password='+pas+'&'+'name='+nam+'&'+'phone='+pho+'&'+'avatar='+img).then(result=>{
                 console.log(result)
                 if(result.status==200){
                   alert('创建成功')
                 }else{
                   alert('创建失败')
                 }
        })
      },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        
        img=res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
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
