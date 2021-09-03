<template>
  <div id='login-wrapper'>
    <div id='login-top'>
      <span></span>
      <div>管理系统</div>
      <span></span>
    </div>
    <div id='login-main'>
      <div id='login-box'>
        <div id='login-title'>
          <div id='zh-title'>后台登录</div>
          <div id='vice-title'>Backstage Login</div>
        </div>
        <div id='login-body'> 
          <el-form ref='userForm' :model='state.userForm'>
            <el-form-item> 
              <i class='iconfont icon-yonghu'></i>    
              <el-input v-model='state.userForm.name'></el-input>
            </el-form-item>
            <el-form-item>
              <i class='iconfont icon-mima1'></i>    
              <el-input v-model='state.userForm.password' show-password></el-input>
            </el-form-item>
          </el-form>
          <el-checkbox class='remember-password' v-model='state.remember' label='记住密码'></el-checkbox>
          <el-button type='primary' round>登 &nbsp; 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>import { reactive } from 'vue';
  const state = reactive({
    userForm:{
      name:null,
      password:null
    },
    remember:true
  })
</script>

<style lang='scss' scoped>
  #login-wrapper{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(#3C7CF0, #5CADF7);
    #login-top{
      display: -webkit-flex; 
      display: flex;                     
      justify-content:center;          
      align-items:center; 
      padding-top: 30px;            
      span{
        width: 227px;
        height: 2px;
        background: #FFFFFF;
        opacity: 0.6;
      }
      div{
        display: inline-block;
        padding: 0 20px;
        font-size: 26px;
        font-weight: 400;
        color: #FFFFFF;
        opacity: 0.6;
      }
    }
    #login-main{
      height: calc(100% - 65px);
      display: -webkit-flex; 
      display: flex;                     
      justify-content:center;          
      align-items:center; 
      #login-box{
        width: 570px;
        height: 575px;
        background: #FFFFFF;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto;
        #login-title{
          text-align: center;
          background-image: linear-gradient(#0380F4, #02A8FC);
          font-weight: 400;
          color: #FFFFFF;
          padding: 52px 0;
          #zh-title{
            font-size: 55px;
            height: 55px;
            line-height: 49px;
            text-shadow: 0px 2px 2px rgba(13, 4, 9, 0.75);
          }
          #vice-title{
            font-size: 28px;
            line-height: 25px;
            height: 26px;
            margin-top: 15px;
          }
        }
      }
    }
  }
  #login-body{
    padding: 10px 109px 0 118px;
    .el-form-item{
      margin-top: 20px;
      .el-input{
        width: calc(100% - 34px);
        margin-left: 12px;
        ::v-deep .el-input__inner{
          border: 0;
          border-bottom:1px solid #666666;
          border-radius: 0;
        }
      }
      .iconfont{
        font-size: 22px;
        color: #079DF5;
        position: relative;
        top: 10px;
      }
    }
    .remember-password{
      display: block;
      height: 16px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      padding: 38px 0 54px;
    }
    .el-button{
      width: 197px;
      height: 45px;
      background: #049BF6;
      box-shadow: 0px 3px 8px 0px rgba(5, 155, 245, 0.75);
      border-radius: 20px 20px 20px 20px;
      margin: 0 auto;
      display: block;
      font-size: 24px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 0;
    }
  }
</style>