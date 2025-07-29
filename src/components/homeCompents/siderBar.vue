<template>
  <div class="sidebar">
    <div class="logo">
      <h2>Tech Logo</h2>
    </div>
    <ul class="nav-list">

      <li 
        @click="handleClick('workbench')"
        :class="{ active: activeItem === 'workbench' }"
      >
        <i class="fas fa-home"></i>
        <span>工作台首页</span>
      </li>


      <li 
        @click="handleClick('featuredContent')"
        :class="{ active: activeItem === 'featuredContent' }"
      >
        <i class="fas fa-star"></i>
        <span>精选内容</span>
      </li>

        <li 
        @click="handleClick('AITryon')"
        :class="{ active: activeItem === 'AITryon' }"
      >
        <i class="fas fa-star"></i>
        <span>AI试衣</span>
      </li>


        <li 
        @click="handleClick('myWork')"
        :class="{ active: activeItem === 'myWork' }"
      >
        <i class="fas fa-star"></i>
        <span>我的空间</span>
      </li>

      
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Siderbar',
  props: {
    activeItem: {
      type: String,
      default: 'workbench'
    }
  },
  setup(props, { emit }) {
    // 完善的点击事件处理
    const handleClick = (item) => {
      // 触发父组件事件并传递选中项
      emit('select-item', item);
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped>
/* 保持原有样式不变 */
.sidebar {
  width: 240px;
  background-color: #1a1a2e;
  color: #e2e8f0;
  min-height: 100vh;
  transition: all 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.logo {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid #2a2a40;
}

.logo h2 {
  margin: 0;
  color: #4cc9f0;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-list li i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
  color: #94a3b8;
}

.nav-list li:hover {
  background-color: #252541;
  color: #4cc9f0;
}

.nav-list li:hover i {
  color: #4cc9f0;
}

.nav-list li.active {
  background-color: #252541;
  color: #4cc9f0;
  border-left-color: #4cc9f0;
}

.nav-list li.active i {
  color: #4cc9f0;
}
</style>
