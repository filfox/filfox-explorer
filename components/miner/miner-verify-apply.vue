<template>
  <el-dialog :title="$t('tag.sign')" :visible.sync="dialogVisible" width="50%" center>
    <div v-if="loading" v-loading="loading" class="h-20"></div>
    <div v-else v-loading="submitLoading">
      <div class="font-medium">
        {{ $t('tag.description', {power: message.data ? getAdjPower(message.data.minPower, 2) : '0 B' }) }}
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.owner') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <p v-if="message.data" class="form-input">
          {{ message.data.addressToSign ? message.data.addressToSign : "" }}
        </p>
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.en_sname') }}
          <p class="ml-1 text-red-600">
            *
          </p>
        </div>
        <el-input v-model="en" size="small" :placeholder="$t('tag.snamePlaceholder')" class="form-input" />
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.en_name') }}
        </div>
        <el-input v-model="enFull" size="small" :placeholder="$t('tag.namePlaceholder')" class="form-input" />
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.zh_sname') }}
        </div>
        <el-input v-model="zh" size="small" :placeholder="$t('tag.snamePlaceholder')" class="form-input" />
      </div>

      <div class="flex items-center mt-4">
        <div class="form-label">
          {{ $t('tag.zh_name') }}
        </div>
        <el-input v-model="zhFull" size="small" :placeholder="$t('tag.namePlaceholder')" class="form-input" />
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

      <template v-if="message.data">
        <div class="flex items-center mt-4">
          <div class="form-label">
            {{ $t('tag.message') }}
          </div>
          <div class="w-5/6 flex items-center justify-between pl-2">
            <!-- eslint-disable-next-line -->
            <highlight class="flex overflow-hidden">{{ message.data.message }}</highlight>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <div class="form-label">
            {{ $t('tag.command') }}
          </div>
          <div class="w-5/6 flex items-center justify-between pl-2">
            <!-- eslint-disable-next-line -->
            <highlight class="flex overflow-hidden">{{ message.data.command.lotus }}</highlight>
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

      <div class="mt-4 text-red-600">
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
      message: '',
      en: '',
      enFull: '',
      zh: '',
      zhFull: '',
      contact: '',
      signature: '',
      submitLoading: false
    }
  },
  methods: {
    getSignatureInfo() {
      this.loading = true
      const params = { address: this.addressInfo }
      this.$axios
        .post(`/address-tag/create/message`, params
        )
        .then(res => {
          this.loading = false
          const status = res.data.status
          if (status > 0) {
            if (res.data.error[this.$i18n.locale] != null) {
              this.dialogVisible = false
              this.$message.error(res.data.error[this.$i18n.locale])
            }
          } else {
            this.message = res.data
          }
        })
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
    submitSignature() {
      this.submitLoading = true
      const params = { address: this.addressInfo, en: this.en, contact: this.contact, signature: this.signature }
      if (this.enFull.length > 0) {
        params.enFull = this.enFull
      }
      if (this.zh.length > 0) {
        params.zh = this.zh
      }
      if (this.zhFull.length > 0) {
        params.zhFull = this.zhFull
      }
      this.$axios
        .post(`/address-tag/create`, params
        )
        .then(res => {
          this.submitLoading = false
          const status = res.data.status
          if (status > 0) {
            if (res.data.error[this.$i18n.locale] != null) {
              this.$message.error(res.data.error[this.$i18n.locale])
            }
          } else {
            this.dialogVisible = false
            this.$message.success(this.$t('tag.success'))
          }
        })
    },
    didCopyClicked() {
      const clipBoardContent = this.message.data.command.lotus
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
    getAdjPower(number, precision = null) {
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
      if (precision == null) {
        return flag
          ? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
          : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
      } else {
        return flag
          ? `-${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
          : `${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
      }
    }
  }
}
</script>

<style>
  .hljs {
    border-radius: 0.375rem;
  }
</style>

<style lang="postcss" scoped>
  .form-label {
    @apply flex w-1/6;
  }
  .form-input {
    @apply flex w-5/6 pl-2;
  }
</style>
