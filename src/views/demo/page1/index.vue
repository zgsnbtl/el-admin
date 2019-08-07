<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
  </d2-container>
</template>

<script>
export default {
  name: 'page1',
  data () {
    return {
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      this.$axios.post(`http://t.waiqin.co/api/department/all`,
        {
          headers: {
            ' Authorization': 'xph2edDC8G3dKleo'
          },
          query: { withSubDepartments: true, withUsers: true }
        }
      ).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
