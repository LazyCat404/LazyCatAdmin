import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfor = ref<object | undefined>(undefined);
    const token = ref<string | undefined>(undefined);
    // 设置用户信息
    function setUserInfor(val: object) {
      userInfor.value = val;
    }
    function clearUserInfor() {
      userInfor.value = undefined;
      window.sessionStorage.removeItem('user');
    }
    // 设置token
    function setToken(val: string) {
      token.value = val;
    }
    function clearToken() {
      token.value = undefined;
      window.sessionStorage.removeItem('token');
    }
    return { userInfor, token, setUserInfor, clearUserInfor, setToken, clearToken };
  },
  {
    persist: {
      enabled: true // 数据持久化
    }
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
