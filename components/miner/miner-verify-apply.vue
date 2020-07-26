<template>
    <el-dialog :title="$t('tag.sign')" :visible.sync="dialogVisible" width="50%" center >
        <div v-loading="loading" v-if="loading" class="h-20"> </div>
        <div class="flex flex-col" v-else v-loading="submitLoading">
            <div class=" font-medium"> {{ $t('tag.description',{power: message.data ? getAdjPower(message.data.minPower,2) : '0 B' }) }} </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">
                    {{ $t('tag.owner')}}
                    <p class="ml-1 text-red-600">*</p>
                </div>
                <p class="flex w-5/6 pl-2" v-if="message.data"> {{ message.data.addressToSign ?  message.data.addressToSign : ""}} </p>
            </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">
                    {{ $t('tag.en_sname') }}
                    <p class="ml-1 text-red-600">*</p>
                </div>
                <el-input size="small" :placeholder="$t('tag.snamePlaceholder')" v-model="en" class="flex w-5/6 pl-2">
                </el-input>
            </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">{{ $t('tag.en_name') }}</div>
                <el-input size="small" :placeholder="$t('tag.namePlaceholder')" v-model="en_full" class="flex w-5/6 pl-2">
                </el-input>
            </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">{{ $t('tag.zh_sname') }}</div>
                <el-input size="small" :placeholder="$t('tag.snamePlaceholder')" v-model="zh" class="flex w-5/6 pl-2">
                </el-input>
            </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">{{ $t('tag.zh_name') }}</div>
                <el-input size="small" :placeholder="$t('tag.namePlaceholder')" v-model="zh_full" class="flex w-5/6 pl-2">
                </el-input>
            </div>

            <div class="flex flex-row items-center mt-4">
                <div class="w-1/6 flex">
                    {{ $t('tag.contact') }}
                    <p class="ml-1 text-red-600">*</p>
                </div>
                <el-input size="small" :placeholder="$t('tag.contactPlaceHolder')" v-model="contact" class="flex w-5/6 pl-2">
                </el-input>
            </div>

            <template v-if="message.data">
                <div class="flex flex-row items-center mt-4">
                    <div class="w-1/6 flex"></div>
                    <div class="w-5/6 flex items-center justify-between pl-2">
                        <highlight class="flex overflow-hidden">{{ message.data.message }}</highlight>
                    </div>
                </div>
                <div class="flex flex-row items-center mt-4">
                    <div class="w-1/6 flex">{{ $t('tag.message') }}</div>
                    <div class="w-5/6 flex items-center justify-between pl-2">
                        <highlight class="flex overflow-hidden">{{ message.data.command.lotus }}</highlight>
                        <el-button icon="el-icon-document-copy" size="small" @click="didCopyClicked"></el-button>
                    </div>
                </div>
            </template>

            <div class="flex flex-row items-center mt-4 ">
                <div class="w-1/6 flex">
                    {{ $t('tag.signature') }}
                    <p class="ml-1 text-red-600">*</p>
                </div>
                <el-input size="small" :placeholder="$t('tag.signaturePlaceHolder')" class="flex w-5/6 pl-2" v-model="signature">
                </el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm"> {{ $t('shared.submit') }} </el-button>
        </span>
    </el-dialog>
</template>

<style>
.hljs {
    border-radius: 0.375rem;
}
</style>

<script>
export default {
    props: {
        addressInfo: {
            type: String,
            default: ''
        },
        tag: {
            type: Object,
            default:{}
        }
    },
    data() {
        return {
            dialogVisible: false,
            loading: false,
            message: '',
            en:'',
            en_full: '',
            zh:'',
            zh_full: '',
            contact: '',
            signature: '',
            submitLoading: false
        }
    },
    methods: {
         getSignatureInfo() {
            this.loading = true;
            var params = { address:this.addressInfo};
            this.$axios
                .post(`/address-tag/create/message`, params
                )
                .then(res => {
                    this.loading = false
                    let status = res.data.status
                    if (status > 0) {
                        if(res.data.error[this.$i18n.locale] != null) {
                            this.dialogVisible = false
                            this.$message.error(res.data.error[this.$i18n.locale]);
                        }
                    }
                    else {
                        this.message = res.data
                    }
            });
        },
        showDialog() {
            this.dialogVisible = true
            this.getSignatureInfo();
        },
        confirm() {
            if (this.en.length == 0) {
                this.$message.error(this.$t('tag.errorInput') + this.$t('tag.en_sname'))
                return
            }
            if (this.contact.length == 0) {
                this.$message.error(this.$t('tag.errorInput') + this.$t('tag.contact'))
                return
            }
            if (this.signature.length == 0) {
                this.$message.error(this.$t('tag.errorInput') + this.$t('tag.signature'))
                return
            }
            this.submitSignature()
        },
        submitSignature() {
            this.submitLoading = true
            var params = { address:this.addressInfo, zh:this.zh, en:this.en, contact:this.contact, signature:this.signature};
            if (this.en_full.length > 0) {
                params['en_full'] = this.en_full
            }
            if (this.zh.length > 0) {
                params['zh'] = this.zh
            }
            if (this.zh_full.length > 0) {
                params['zh_full'] = this.zh_full
            }
            this.$axios
                .post(`/address-tag/create`, params
                )
                .then(res => {
                    this.submitLoading = false
                    let status = res.data.status
                    if (status > 0) {
                        if(res.data.error[this.$i18n.locale] != null) {
                            this.$message.error(res.data.error[this.$i18n.locale]);
                        }
                    }
                    else {
                        this.dialogVisible = false
                        this.$message.success(this.$t('tag.success'))
                    }
            });
        },
        didCopyClicked() {
            let clipBoardContent = this.message.data.command.lotus
            let textarea = document.createElement('textarea')
            textarea.textContent = clipBoardContent
            textarea.style.position = 'fixed'
            document.body.appendChild(textarea)
            textarea.select()
            try {
              document.execCommand('copy')
            } finally {
               document.body.removeChild(textarea)
            }
            this.$message.success(this.$t('shared.copySuccess'));
        },
        getAdjPower(number, precision = null) {
            const metrics = 'kMGTPEZY'
            let metricIndex = -1
            number = Number(number)
            var flag = false
            if (number < 0) {
                number = -number
                flag = true
            }
            while (number >= 2 ** 10) {
                ++metricIndex
                number /= 2 ** 10
            }
            if (precision == null) {
                return flag? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
            } else {
                return flag? `-${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
            }
        }
    }
}
</script>
