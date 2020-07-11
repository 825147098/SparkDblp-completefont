##依赖库：
统计图依赖：https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
	
##Vue 错误发现及解决方案
无法输出连续26个字母

    解决方法 String.fromCharCode(64 + n); //65为A，97为a
图片无法加载

    解决方法 将imageUrls引入响应的vue文件中，解析引用
vuex如何用watch监听this.$store数据的变化

    ```
    watch: {
        '$store.state.app.language': function () {
          //你需要执行的代码
        }
      },
    ```
prop传值
     
    动态传值需要v-bind:attribute="" 静态直接attribute=""
