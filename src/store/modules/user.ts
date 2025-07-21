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
      window.sessionStorage.removeItem('user'); // 根据 persist.key 自定义键名，此处为默认值 'user'
      // window.localStorage.removeItem('user'); // 若persist.storage 使用 localStorage，则使用此行代码
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
    // 持久化存储
    // pesist: true // 默认存储到 localStorage，这里建为 'user'
    persist: {
      storage: sessionStorage // 使用 sessionStorage（默认: localStorage）
      // key: 'custom-user-key' // 自定义存储的 key（默认: store 的 id）
    }
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
