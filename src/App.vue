<template>
  <div id="app">
    <router-view/>
<!--      <div style="z-index: 10">-->
<!--          {{mouse()}}-->
<!--      </div>-->
  </div>
</template>
<script>
  import silkMouse from "./style/silkMouse";
  export default {

    methods: {
      mouse(){
          silkMouse.silkMouse()
      },

      // moveSilt(){
      //   let can = document.getElementsByTagName("canvas")
      //   // canvas.parentElement.removeChild(canvas)
      //   let body = document.getElementsByTagName("body")
      //
      //   for(let i = 0; i < can.length; i++){
      //     body.removeChild(can[i])
      //   }
      // }
    },

    watch:{
      // "$store.state.backgroundEffect":function () {
      //     if(!this.$store.state.backgroundEffect){
      //       this.moveSilt();
      //     } else {
      //       this.mouse()
      //     }
      // }
    },
    mounted() {
      this.mouse()
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
