<template>
  <div>
    <div ref="point" :class="affix?'affix':''" :style="styles">
      <slot></slot>
    </div>
    <div v-show="slot" :style="slotStyle"></div>
  </div>
</template>
<script>
import Vue from 'vue'
const isServer = Vue.prototype.$isServer

const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler, useCapture = false) {
      if (element && event && handler) {
        element.addEventListener(event, handler, useCapture)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent(`on${event}`, handler)
      }
    }
  }
})()

const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler, useCapture = false) {
      if (element && event) {
        element.removeEventListener(event, handler, useCapture)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent(`on${event}`, handler)
      }
    }
  }
})()

function getScroll(target, top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}

function getOffset(element) {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export default {
  name: 'Affix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number,
      default: 0
    },
    useCapture: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      affix: false,
      styles: {},
      slot: false,
      slotStyle: {}
    }
  },
  computed: {
    offsetType() {
      let type = 'top'
      if (this.offsetBottom >= 0) {
        type = 'bottom'
      }
      return type
    }
  },
  mounted() {
    on(window, 'scroll', this.handleScroll, this.useCapture)
    on(window, 'resize', () => {
      this.affix = false
      this.handleScroll()
    }, this.useCapture)
    this.$nextTick(() => {
      this.handleScroll()
    })
  },
  beforeDestroy() {
    off(window, 'scroll', this.handleScroll, this.useCapture)
    off(window, 'resize', this.handleScroll, this.useCapture)
  },
  methods: {
    handleScroll() {
      const affix = this.affix
      const scrollTop = getScroll(window, true)
      const elOffset = getOffset(this.$el)
      const windowHeight = window.innerHeight
      const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight
      if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !affix) {
        this.affix = true
        this.slotStyle = {
          width: `${this.$refs.point.clientWidth}px`,
          height: `${this.$refs.point.clientHeight}px`
        }
        this.slot = true
        this.styles = {
          top: `${this.offsetTop}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        }
        this.$emit('on-change', true)
      } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && affix) {
        this.slot = false
        this.slotStyle = {}
        this.affix = false
        this.styles = null
        this.$emit('on-change', false)
      }
      if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType === 'bottom' && !affix) {
        this.affix = true
        this.styles = {
          bottom: `${this.offsetBottom}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        }
        this.$emit('on-change', true)
      } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && affix) {
        this.affix = false
        this.styles = null
        this.$emit('on-change', false)
      }
    }
  }
}
</script>
<style>
.affix {
  position: fixed;
  right: 0;
  z-index: 50;
}
</style>
