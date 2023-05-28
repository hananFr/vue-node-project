<template>
    <button @click="btnClick($event)" :style="{paddingBottom: screenWidth*24/1569 + 'px', paddingTop: screenWidth*24/1569 + 'px'}" class=" col-4 d-flex  align-items-center justify-content-center col-sm-3 col-md-2 col-lg-2 mx-auto  rounded rounded-pill col-4 col-lg-3 "><b :style="{fontSize: `${26*this.screenWidth/1569}px`}">{{ buttonText }}</b></button>
</template>

<script>
export default {
props: ['buttonText','screenWidth', 'buttonAction', ],
methods:{
    btnClick(event){
        this.$emit('on-click', event)
    }
}
}
</script>

<style scoped>
button{
    align-self: inherit;
    color: white;
    background: rgb(30, 123, 104);
    border: none;
    font-size: 26px;
}
</style>