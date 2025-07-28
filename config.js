import { reactive } from 'vue';
export const BASE_URL="https://www.adhn.asia:2222/"

export const userInfo = reactive({
  nickname: '',
  email: '',
  registDate:'',
  avatar:'',
  vipStatus: false,
  vip_start_time:'',
  vip_end_time:'',
});