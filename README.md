# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

<!-- 
home页面主要组件在“homeCompents”文件夹下
siderBar：左侧
myWork： 我的空间
AItryon: AI试衣
featruedContent: 精选内容
workbench: 工作台首页


需要写的接口：
1.
src\components\workbenchCompents\featuredGallery.vue 
函数：fetchImages
获取精选的图片，有分类标签。
2.
src\components\AITryonCompents\ClothingModelComposer.vue
函数：generate
上传虚拟试衣的照片，目前设计的是上传“上衣+裤子+模特”或者“连衣裙 + 模特”

3.src\components\AITryonCompents\ClothingModelComposer.vue
函数：fetchModels
获取模特照片，限制是六张
函数：loadMoreModels
获取更多模特照片，也是六张，递增

4.
src\components\homeCompents\myWork.vue
函数：fetchWorks
获取历史记录

目前这五个接口，设置的参数可能与你想的不一致，按照你后端设计改就好，你写好之后，我再改。
界面还会美化的
 -->



