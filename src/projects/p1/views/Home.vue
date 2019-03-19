<template>
  <div>
    <h1>p1</h1>
    <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>

<style lang="less" scoped>
@size:100px;
div{
  font-size:@size
}
</style>

