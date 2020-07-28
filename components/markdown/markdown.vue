<template>
  <vue-simple-markdown class="md-body p-4" :source="detail" />
</template>

<script>
import Vue from 'vue'
import VueSimpleMarkdown from 'vue-simple-markdown'
import '~/assets/css/markdown.css'

Vue.use(VueSimpleMarkdown)

export default {
  props: {
    detail: { type: String, required: true }
  }
}
</script>
