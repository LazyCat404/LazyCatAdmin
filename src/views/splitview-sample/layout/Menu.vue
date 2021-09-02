<template>
  <div id="menu-wrapper"></div>
</template>

<style lang="scss" scoped>
#menu-wrapper{
  width: 260px;
  height: calc(100% - 90px);
  float: left;
}
@media screen and (max-width: 1200px) {
  #menu-wrapper {
    width: calc(100% - 940px);
  }
}
</style>