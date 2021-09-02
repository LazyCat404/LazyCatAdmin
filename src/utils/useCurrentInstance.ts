// 当前实例
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export default function useCurrentInstance():Record<string,  { [x: string]: unknown; }> {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  return {
    globalProperties
  };
}

/**
 * 使用方式
 * import useCurrentInstance  from '@/utils/useCurrentInstance';
 * const { globalProperties } = useCurrentInstance();
 * globalProperties.$axios
 */ 