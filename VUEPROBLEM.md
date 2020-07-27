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

el-menu以及el-dropdown在item上直接添加@click以及内部标签添加无响应

    对item下的内容包裹一层div添加@click即可
引入外部js插件不显示原因

    组件显示canvas根据内容动态获取高度所以要直接设置高度或者先将内部进行填充
CSS 使用calc()获取当前可视屏幕高度

    em    它是描述相对于应用在当前元素的字体尺寸，所以它也是相对长度单位。一般浏览器字体大小默认为16px，则2em == 32px；
    ex    依赖于英文字母小 x 的高度
    ch    数字 0 的宽度
    rem    根元素（html）的 font-size
    vw    viewpoint width，视窗宽度，1vw=视窗宽度的1%
    vh    viewpoint height，视窗高度，1vh=视窗高度的1%
    vmin    vw和vh中较小的那个。
    vmax    vw和vh中较大的那个。
    由此可见，通过vh / vw 我们可以获得当前屏幕的视窗宽度，所以在css中，通过计算这个高度即可使得div的高度自动撑开到屏幕高度。而计算这个高度可以使用css3的calc()函数
    calc() 函数用于动态计算长度值。
    
    需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
    任何长度值都可以使用calc()函数进行计算；
    calc()函数支持 "+", "-", "*", "/" 运算；
    calc()函数使用标准的数学运算优先级规则；
    所以，只需设置div的高度height为calc(100vh)即可,100vh = 视窗高度的100%，例子：
    
    div {
      width: 100%;
      height: calc(100vh);
    }
    这部分转自 https://blog.csdn.net/qq_32063079/article/details/89766442
