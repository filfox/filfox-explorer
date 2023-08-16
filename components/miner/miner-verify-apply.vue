<template>
  <el-dialog :title="$t('tag.sign')" :visible.sync="dialogVisible" width="50%" center>
    <div v-if="loading" v-loading="loading" class="h-20"></div>
    <div v-else v-loading="submitLoading">
      <div class="font-medium">
        {{ $t('tag.description', {power: message ? getAdjPower(message.minPower, 2) : '0 B' }) }}
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.owner') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <p v-if="message" class="form-input">
          {{ message.addressToSign || "" }}
        </p>
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.en_name') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <el-input v-model="en" size="small" :placeholder="$t('tag.snamePlaceholder')" class="form-input" />
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.zh_name') }}
        </div>
        <el-input v-model="zh" size="small" :placeholder="$t('tag.snamePlaceholder')" class="form-input" />
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.contact') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <el-input v-model="contact" size="small" :placeholder="$t('tag.contactPlaceHolder')" class="form-input" />
      </div>

      <template v-if="message">
        <div class="flex items-center mt-4">
          <div class="form-label">
            {{ $t('tag.message') }}
          </div>
          <div class="w-5/6 flex items-center justify-between pl-2">
            <code class="code">{{ message.message }}</code>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <div class="form-label">
            {{ $t('tag.command') }}
          </div>
          <div class="w-5/6 flex items-center justify-between pl-2">
            <code class="code">{{ message.command.lotus }}</code>
            <el-button icon="el-icon-document-copy" size="small" class="ml-2" @click="didCopyClicked" />
          </div>
        </div>
      </template>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.signature') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <el-input v-model="signature" size="small" :placeholder="$t('tag.signaturePlaceHolder')" class="form-input" />
      </div>

      <div class="mt-4 text-red-600 font-medium">
        {{ $t('tag.specialNotes') }}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm"> {{ $t('shared.submit') }} </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    addressInfo: { type: String, required: true },
    tag: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      message: null,
      en: '',
      zh: '',
      contact: '',
      signature: '',
      submitLoading: false
    }
  },
  methods: {
    async getSignatureInfo() {
      this.loading = true
      const params = { address: this.addressInfo }
      const { status, data, error } = await this.$axios.$post(`/address-tag/create/message`, params)
      this.loading = false
      if (status > 0) {
        if (error != null) {
          this.dialogVisible = false
          this.$message.error(error)
        }
      } else {
        this.message = data
      }
    },
    showDialog() {
      this.dialogVisible = true
      this.getSignatureInfo()
    },
    confirm() {
      if (this.en.length === 0) {
        this.$message.error(this.$t('tag.errorInput') + this.$t('tag.en_sname'))
        return
      }
      if (this.contact.length === 0) {
        this.$message.error(this.$t('tag.errorInput') + this.$t('tag.contact'))
        return
      }
      if (this.signature.length === 0) {
        this.$message.error(this.$t('tag.errorInput') + this.$t('tag.signature'))
        return
      }
      this.submitSignature()
    },
    async submitSignature() {
      this.submitLoading = true
      const params = { address: this.addressInfo, en: this.en, contact: this.contact, signature: this.signature }
      if (this.zh.length > 0) {
        params.zh = this.zh
      }
      const { status, error } = await this.$axios.$post(`/address-tag/create`, params)
      this.submitLoading = false
      if (status > 0) {
        if (error != null) {
          this.$message.error(error)
        }
      } else {
        this.dialogVisible = false
        this.$message.success(this.$t('tag.success'))
      }
    },
    didCopyClicked() {
      const clipBoardContent = this.message.command.lotus
      const textarea = document.createElement('textarea')
      textarea.textContent = clipBoardContent
      textarea.style.position = 'fixed'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } finally {
        document.body.removeChild(textarea)
      }
      this.$message.success(this.$t('shared.copySuccess'))
    },
    getAdjPower(number) {
      const metrics = 'kMGTPEZY'
      let metricIndex = -1
      number = Number(number)
      let flag = false
      if (number < 0) {
        number = -number
        flag = true
      }
      while (number >= 2 ** 10) {
        ++metricIndex
        number /= 2 ** 10
      }
      return flag
        ? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
        : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
    }
  }
}
</script>

<style lang="postcss" scoped>
  .form-label {
    @apply flex w-1/6;
  }
  .form-input {
    @apply flex w-5/6 pl-2;
  }
  .code {
    @apply block rounded-md p-2 whitespace-pre overflow-x-auto text-gray-800 bg-gray-100;
  }
</style>
