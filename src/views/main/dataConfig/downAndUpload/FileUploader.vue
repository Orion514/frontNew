<template>
  <el-upload
      :action="getUploadAction(fileType)"
      :before-upload="beforeUpload"
      :auto-upload="true"
      :data="getUploadAction(userid,sceneid)"
      :on-success="onSuccess"
      :on-error="onError"
      class="upload-demo"
      :show-file-list="false">
    <el-button :icon="Plus" :type="buttonType" style="margin: 0 5px 0 5px"  >上传{{ fileType }}</el-button>
  </el-upload>
</template>

<script>
import { Plus } from '@element-plus/icons';
import {ElMessage} from "element-plus";

export default {
    computed: {
      Plus() {
        return Plus
      }
    },
    props: ['fileType','buttonType','userid','sceneid'],
    methods: {
      getUploadAction(fileType) {
        // 根据文件类型返回不同的上传URL
        switch (fileType) {
          case 'Excel':
            return '/upload/excel';
          case 'JSON':
            return '/upload/json';
          case 'SQL':
            return '/upload/sql';
          case 'XML':
            return '/upload/xml';
          default:
            return '/upload';
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
        // 检查文件类型是否符合要求
        switch (this.fileType) {
          case 'Excel':
            return file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          case 'JSON':
            return file.type === 'application/json';
          case 'SQL':
            return file.type === 'text/plain';
          case 'XML':
            return file.type === 'application/xml' || file.type === 'text/xml';
          default:
            return true;
        }
      },
      onSuccess(){
        ElMessage.success("上传成功")
      },
      onError(){
        ElMessage.error("上传失败")
      }
    }
  }
</script>


<style scoped>

</style>
