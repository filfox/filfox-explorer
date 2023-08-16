<template>
  <el-popover
    placement="top"
    width="200"
    trigger="hover"
    :content="content"
  >
    <div slot="reference">
      <img src="~/assets/img/deal/verified.svg" alt="verified" class="h-4 cursor-pointer">
    </div>
  </el-popover>
</template>

<script>
export default {
  props: {
    content: { type: String, required: true }
  }
}
</script>
