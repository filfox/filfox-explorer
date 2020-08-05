<template>
  <el-popover
    placement="bottom-start"
    width="280"
    trigger="hover"
    :content="content"
  >
    <div slot="reference">
      <img src="~/assets/img/shared/signed.svg" alt="tip" class="h-3 ml-1 cursor-pointer">
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
