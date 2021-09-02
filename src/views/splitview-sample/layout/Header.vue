<template>
  <div id="header-wrapper">
    <div id="header-logo">LOGO</div>
    <div id="header-main"></div>
  </div>

</template>

<style lang="scss" scoped>
#header-wrapper{
  height: 90px;
  width: 100%;
  #header-logo{
    width: 260px;
    height: 100%;
    float: left;
    font-size: 40px;
    font-weight: bold;
    color: #40CDBB;
    display: -webkit-flex; 
    display: flex;                     
    justify-content:center;           
    align-items:center;            
  }
  #header-main{  
    background: #53D2C2;
    float: right;
    width: calc(100% - 260px);
    height: 100%;
  }
}
</style>