<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">login</router-link> |
      <router-link to="/register">register</router-link>
    </nav> -->
    <router-view /> <!-- 这个地方渲染路由组件 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
