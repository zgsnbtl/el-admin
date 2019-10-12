<template>
  <div @mousemove="gettimeout()" id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { setInterval } from 'timers';
import store from './store/index'
export default {
  name: 'app',
  data() {
    return {
      currentTime: new Date().getTime(), // 开始时间
      lasttime: new Date().getTime(),  // 当前时间
      timeout: 60*60*10000,  // 退出时间
      tiemd: null,
      menuAsides: [
              ]
    }
  },
  mounted() {
    this.setit()
    this.randomStr()
    // let se = 
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    gettimeout () {
      this.currentTime = new Date().getTime()
      // let obj = Math.random().toString(36).slice(-8)
      // console.log(obj)
      // let ac =  this.randomStr(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      // console.log(ac)
    },
    OperatingWebsite () {
      this.lasttime = new Date().getTime()
      // let currentTime = this.currentTime
      // console.log('cur',this.currentTime)
      // console.log('last',this.lasttime)
      if (this.lasttime - this.currentTime >this.timeout) {
        // 退出登录
        // console.log('******')
        clearInterval(this.tiemd)
        this.tiemd = null
        this.logout()
      }
    },
    setit () {
      this.tiemd = setInterval(this.OperatingWebsite,100000)
      // window.setInterval(this.OperatingWebsite, 1000)
    },
    randomStr (length,chars) { // 生成随机字符串
      let result = ''
      for (let i = 0; i<length;i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result
    }
  },
  destroyed () {
    this.logout()
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
