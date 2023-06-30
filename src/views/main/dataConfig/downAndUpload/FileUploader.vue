<template>
  <el-upload
      class="upload-demo"
      :action="getUploadAction(fileType)"
      :before-upload="beforeUpload"
      :auto-upload="true"
      :data="getUploadData(userid,sceneid)"
      :on-success="onSuccess"
      :on-error="onError"
      :show-file-list="false"
      :http-request="uploadFile"
      :accept="getFileAccept(fileType)"
      :headers="getCustomHeaders()"
  >
    <el-button :icon="Plus" :type="buttonType" style="margin: 0 5px 0 5px"  >上传{{ fileType }}</el-button>
  </el-upload>
</template>

<script>
import { Plus } from '@element-plus/icons';
import {ElMessage} from "element-plus";
import {upload} from '@/api/upload'


export default {
    computed: {
      Plus() {
        return Plus
      }
    },
    props: ['fileType','buttonType','userid','sceneid'],
    emits: ['upload-success'],
    methods: {

      getUploadData(userid, sceneid) {
        return {
          userid: userid,
          sceneid: sceneid
        };
      },

      getFileAccept(fileType){
        switch (fileType){
          case 'Excel':
            return '.xls,.xlsx';
          case 'JSON':
            return '.json';
          case 'SQL':
            return '.sql';
          case 'XML':
            return '.xml';
        }
      },

      getUploadAction(fileType) {
        // 根据文件类型返回不同的上传URL
        switch (fileType) {
          case 'Excel':
            return '/excel';
          case 'JSON':
            return '/json';
          case 'SQL':
            return '/sql';
          case 'XML':
            return '/xml';
          default:
            return '/#';
        }
      },
      beforeUpload(file) {
        // 在上传前检查文件类型
        if (this.validateFileType(file)) {
          return true;
        } else {
          // 文件类型不符合要求，给出提示或拒绝上传
          this.$message.error('文件类型不正确');
          return false;
        }


      },
      validateFileType(file) {
        // 获取文件扩展名
        const extension = file.name.split('.').pop().toLowerCase();

        // 检查文件类型是否符合要求
        switch (this.fileType) {
          case 'Excel':
            return file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                || extension === 'xls'
                || extension === 'xlsx';
          case 'JSON':
            return file.type === 'application/json'|| extension === 'json';
          case 'SQL':
            return extension === 'sql';
          case 'XML':
            return file.type === 'application/xml' || file.type === 'text/xml';
          default:
            return true;
        }
      },
      getCustomHeaders() {
        return { 'X-Mock-Intercept': 'true' }; // Add custom header to bypass mock interception
      },
      onSuccess(){
        ElMessage.success("上传成功")
      },
      uploadFile(file){
        ElMessage.info("开始上传")
        const url = this.getUploadAction(this.fileType)
        const formData = new FormData();
        formData.append('file',file.file);
        formData.append('userid',this.userid)
        formData.append('sceneid',this.sceneid)

        upload(formData,url).then(response => {
          const code = response.code;
          if(code === 200){
            ElMessage.success("上传成功");
            // 刷新表格
            this.$emit('upload-success');
          }else{
            // ElMessage.error(response.data.msg);
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>


<style scoped>

</style>
