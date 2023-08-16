<template>
  <el-popover
    placement="top"
    width="200"
    trigger="hover"
    :content="content"
  >
    <div slot="reference">
      <img src="~/assets/img/shared/tip.svg" alt="tip" class="h-3">
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
