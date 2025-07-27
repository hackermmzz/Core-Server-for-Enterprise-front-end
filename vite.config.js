import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 绑定到所有网络接口，允许局域网访问
    port: 3000, // 可自定义端口号
    proxy: {
      '/api': {
        target: 'https://www.adhn.asia:2222', // 后端服务器目标地址
        changeOrigin: true,  // 是否修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 部分
        secure: false, // 如果后端是 https 且证书无效，可以设置为 false
      },
    },
  },
})
