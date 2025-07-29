<template>
  <div class="dashboard-container">
    <!-- 侧边栏组件 -->
    <siderbar 
      :active-item="currentComponent" 
      @select-item="handleSelectItem"
    />
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <component :is="currentComponent"></component>
    </main>
  </div>
</template>

<script>
import siderbar from '../components/homeCompents/siderBar.vue';    //导航栏
import workbench from '../components/homeCompents/workbench.vue';  // 工作台组件
import featuredContent from '../components/homeCompents/featuredContent.vue'; // 精选内容
import myWork from '../components/homeCompents/myWork.vue'; // 我的空间
import AITryon from '../components/homeCompents/AITryon.vue'; // AI试衣
export default {
  name: 'Dashboard',
  components: {
    siderbar,
    workbench,
    featuredContent,
    myWork,
    AITryon
  },
  data() {
    return {
      // 默认显示工作台首页
      currentComponent: 'workbench'
    }
  },
  methods: {
    // 处理侧边栏选择事件，根据选择切换对应组件
    handleSelectItem(item) {
      // 根据选中的项切换组件
      if (item === 'workbench') {
        console.log('切换到工作台首页');
        this.currentComponent = 'workbench';
        this.refreshWorkbenchData();
      } else if (item === 'featuredContent') {
        console.log('切换到精选内容');
        this.currentComponent = 'featuredContent';
        this.refreshFeaturedData();
      } else if (item === 'myWork') {
        console.log('切换到我的空间');
        this.currentComponent = 'myWork';
      }else if (item === 'AITryon') {
        console.log('切换到AI试衣');
        this.currentComponent = 'AITryon';
      }


    },
    
    // 刷新工作台数据
    refreshWorkbenchData() {
      console.log('刷新工作台数据');
      // 实际项目中可以在这里调用API获取工作台最新数据
    },
    
    // 刷新精选内容数据
    refreshFeaturedData() {
      console.log('刷新精选内容数据');
      // 实际项目中可以在这里调用API获取精选内容最新数据
    }
  },
  mounted() {
    // 初始加载时获取默认组件数据
    this.refreshWorkbenchData();
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #1e1e1e;
  overflow-y: auto;
  transition: all 0.3s ease;
}
</style>
