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
JS 对象转换字符串

    1. 对象转为字符串
    JSON.stringify(obj)
    
    2. json字符串转为对象
    JSON.parse(str)
当Element UI里面el_dialog嵌套echart组件，打开el_dialog时报echarts.init Error: Initialize failed: invalid dom
    使用setTimeout定时间器
    
    handleEdit(){
        this.dialogCreate = true;
        setTimeout(() => {
            this.setEchartsOption();
        },300)
     },
JS正则匹配添加标签模板
    
```
getMatch(val) {
                let str = this.$store.state.serchObj.title;

                let copyVal = val.toLowerCase();
                let copyStr = str.toLowerCase();

                let num = copyVal.indexOf(copyStr);

                if (num === -1) {
                    return val
                } else {
                    let or = val.substring(num, num + str.length)
                    // console.log(or + num)
                    let re = new RegExp(str, "gim")
                    return val.replace(re, "<mark style='background-color: #fff8c6'>" + or + "</mark>")
                }


            },
```

echarts graph links取消箭头
        
    首先series里面设置edgeSymbol: ['circle', 'arrow']，edgeSymbolSize: [0,0]
    然后到需要要剪头的link下设置symbolSize: [0, 10] link下的symbolSize 跟 serie下的edgeSymbolSize 设置以后效果一样
el-collapse的title由于内部内容太多无法换行

    在templete下添加一个div设置div样式
```
    line-height: 20px;
    text-align: left;
    align-self: flex-end;
    
```
