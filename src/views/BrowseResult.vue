<template>
    <div>{{res}}</div>
</template>

<script>
    export default {
        name: "BrowseResult",

        data: function () {
            return {
               res:'',
            }
        },

        created() {
            this.res = this.$route.query.prefix;
        }
    }
</script>

<style scoped>

</style>
