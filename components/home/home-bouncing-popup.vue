<template>
  <div
    v-if="visible && x !== null && y !== null"
    class="bouncing-popup"
    :style="popupStyle"
  >
    <div>
      <i class="closeButton el-icon-circle-close bg-white rounded-full text-xl" @click="closePopup"></i>
    </div>
    <div class="content">
      <div>{{ $t('home.browserCloseTip') }}</div>
      <div class="content-net mt-1">mainnet: http://8.218.132.229</div>
      <div class="content-net">calibration: http://47.109.105.51</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BouncingPopup',
  data() {
    return {
      x: null,
      y: null,
      dx: 0,
      dy: 0,
      width: 280,
      height: 120,
      intervalId: null,
      visible: true
    }
  },
  computed: {
    popupStyle() {
      return {
        position: 'fixed',
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.width}px`,
        height: `auto`,
        backgroundColor: '#FFF',
        border: '1px solid #ddd',
        padding: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        zIndex: 988
      }
    }
  },
  mounted() {
    // 设置随机初始位置
    this.setRandomPosition()
    // 设置随机初始速度
    this.setRandomSpeed()
    // 开始动画
    this.startAnimation()
    // 监听窗口大小变化，以更新最大位置
    window.addEventListener('resize', this.updateMaxPosition)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
    window.removeEventListener('resize', this.updateMaxPosition)
  },
  methods: {
    setRandomPosition() {
      const maxWidth = window.innerWidth - this.width
      const maxHeight = window.innerHeight - this.height
      this.x = Math.random() * maxWidth
      this.y = Math.random() * maxHeight
    },
    setRandomSpeed() {
      this.dx = (Math.random() - 0.5) * 2 // 速度在 -1 到 1 之间
      this.dy = (Math.random() - 0.5) * 2
    },
    startAnimation() {
      this.intervalId = setInterval(this.move, 40)
    },
    move() {
      this.x += this.dx
      this.y += this.dy

      const maxWidth = window.innerWidth - this.width
      const maxHeight = window.innerHeight - this.height

      // 碰到边缘时反弹
      if (this.x <= 0 || this.x >= maxWidth) {
        this.dx *= -1
        this.x = Math.max(0, Math.min(this.x, maxWidth))
      }
      if (this.y <= 0 || this.y >= maxHeight) {
        this.dy *= -1
        this.y = Math.max(0, Math.min(this.y, maxHeight))
      }
    },
    closePopup() {
      this.visible = false
      clearInterval(this.intervalId)
    },
    updateMaxPosition() {
      // 窗口大小变化时，更新弹窗的位置，防止超出边界
      const maxWidth = window.innerWidth - this.width
      const maxHeight = window.innerHeight - this.height
      this.x = Math.max(0, Math.min(this.x, maxWidth))
      this.y = Math.max(0, Math.min(this.y, maxHeight))
    }
  }
}
</script>

<style scoped>
.bouncing-popup {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;
}

.closeButton {
  position: absolute;
  top: -8px;
  right: -8px;
  cursor: pointer;
  z-index: 99999;
}

.closeButton:hover {
  color: #ff5b5b;
}

.content {
  margin-top: 0;
  color: #333;
  font-size: 13px;
  line-height: 1.5;
}
.content-net{
  margin-left: auto;
  margin-right: auto;
}
</style>
