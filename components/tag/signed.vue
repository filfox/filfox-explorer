<template>
  <el-popover
    placement="bottom-start"
    width="280"
    trigger="hover"
    :content="$t('tag.signed')"
  >
    <div slot="reference">
      <img src="~/assets/img/shared/signed.svg" alt="tip" class="h-3 ml-1 cursor-pointer">
    </div>
  </el-popover>
</template>
