<template>
  <div class="my-works">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h1>我的作品</h1>
      <p>创意与灵感的集合</p>
    </div>

    <!-- 分类筛选 -->
    <div class="filters">
      <button 
        :class="{ active: currentFilter === 'all' }" 
        @click="handleFilterChange('all')"
        :disabled="isLoading"
      >
        全部
      </button>
      <button 
        :class="{ active: currentFilter === 'design' }" 
        @click="handleFilterChange('design')"
        :disabled="isLoading"
      >
        设计
      </button>
      <button 
        :class="{ active: currentFilter === 'illustration' }" 
        @click="handleFilterChange('illustration')"
        :disabled="isLoading"
      >
        插画
      </button>
      <button 
        :class="{ active: currentFilter === 'photography' }" 
        @click="handleFilterChange('photography')"
        :disabled="isLoading"
      >
        摄影
      </button>
    </div>

    <!-- 加载状态 -->
    <div class="loading-state" v-if="isLoading && works.length === 0">
      <div class="spinner"></div>
      <p>加载作品中...</p>
    </div>

    <!-- 错误状态 -->
    <div class="error-state" v-if="errorMessage && works.length === 0">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ errorMessage }}</p>
      <button class="retry-btn" @click="fetchWorks()">重试</button>
    </div>

    <!-- 作品网格 -->
    <div class="works-grid" v-if="!isLoading || works.length > 0">
      <div 
        class="work-card" 
        v-for="(work, index) in filteredWorks" 
        :key="work.id || index"
      >
        <div class="work-image">
          <img 
            :src="work.url" 
            :alt="work.title" 
            loading="lazy"
          >
        </div>
        <div class="work-info">
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </div>

    <!-- 空状态（无数据且无错误） -->
    <div class="empty-state" v-if="!isLoading && !errorMessage && filteredWorks.length === 0">
      <i class="fas fa-image"></i>
      <p>暂无作品，快去创作吧！</p>
    </div>

    <!-- 加载更多 -->
    <div class="load-more" v-if="!isLoading && !errorMessage && hasMore">
      <button 
        @click="loadMoreWorks()"
        :disabled="isLoadingMore"
      >
        <span v-if="!isLoadingMore">加载更多</span>
        <span v-if="isLoadingMore">加载中...</span>
      </button>
    </div>
  </div>
</template>

<script>
// 请替换为你的后端API基础地址

export default {
  name: 'MyWorks',
  data() {
    return {
      currentFilter: 'all', // 当前筛选类别
      works: [], // 作品数据（从接口获取）
      
      // 加载状态管理
      isLoading: false, // 初始加载状态
      isLoadingMore: false, // 加载更多状态
      errorMessage: '', // 错误信息
      
      // 分页参数
      currentPage: 1,
      pageSize: 8,
      hasMore: true // 是否有更多数据
    };
  },
  computed: {
    // 根据筛选条件过滤作品
    filteredWorks() {
      if (this.currentFilter === 'all') {
        return this.works;
      }
      return this.works.filter(work => work.category === this.currentFilter);
    }
  },
  mounted() {
    // 组件挂载时加载第一页作品
    this.fetchWorks();
  },
  methods: {
    // 从后端获取作品数据
    async fetchWorks(reset = true) {
      // 控制加载状态
      if (reset) {
        this.isLoading = true;
        this.currentPage = 1;
        this.hasMore = true;
      } else {
        this.isLoadingMore = true;
      }
      this.errorMessage = '';

      try {
        // 构建请求参数
        const params = new URLSearchParams();
        params.append('page', reset ? 1 : this.currentPage);
        params.append('pageSize', this.pageSize);
        // 仅在筛选不是"全部"时传递类别参数
        if (this.currentFilter !== 'all') {
          params.append('category', this.currentFilter);
        }

        // 调用后端接口
        const response = await fetch(`${BASE_URL}api/works`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`请求失败 (${response.status})`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data.works)) {
          // 重置模式：替换数据；加载更多模式：追加数据
          this.works = reset 
            ? result.data.works 
            : [...this.works, ...result.data.works];
          
          // 更新分页信息
          this.currentPage = result.data.currentPage || this.currentPage + 1;
          this.hasMore = result.data.hasMore || false;
        } else {
          throw new Error(result.message || '获取作品失败');
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error('获取作品失败:', error);
      } finally {
        // 重置加载状态
        this.isLoading = false;
        this.isLoadingMore = false;
      }
    },

    // 加载更多作品
    loadMoreWorks() {
      if (this.isLoading || this.isLoadingMore || !this.hasMore) return;
      this.fetchWorks(false);
    },

    // 切换筛选类别
    handleFilterChange(category) {
      if (this.currentFilter === category) return;
      
      this.currentFilter = category;
      // 切换筛选时重新加载第一页数据
      this.fetchWorks();
    }
  }
};
</script>

<style scoped>
.my-works {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
}

.page-header p {
  color: #666;
  margin: 0;
}

/* 筛选按钮 */
.filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.filters button.active {
  background: #42b983;
  color: white;
}

.filters button:hover:not(.active):not(:disabled) {
  background: #e0e0e0;
  color: #333;
}

.filters button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 作品网格 */
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.work-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.work-info {
  padding: 15px;
}

.work-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.work-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 15px;
  color: #ddd;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #ff4d4d;
}

.error-state i {
  font-size: 48px;
  margin-bottom: 15px;
}

.retry-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #359e6d;
}

/* 加载更多 */
.load-more {
  text-align: center;
  margin-bottom: 40px;
}

.load-more button {
  padding: 10px 20px;
  border: 1px solid #42b983;
  background: white;
  color: #42b983;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more button:hover:not(:disabled) {
  background: #42b983;
  color: white;
}

.load-more button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
  }

  .work-image img {
    height: 160px;
  }

  .page-header h1 {
    font-size: 24px;
  }
}
</style>



<!-- <template>
  <div class="my-works">
    
    <div class="page-header">
      <h1>我的作品</h1>
      <p>创意与灵感的集合</p>
    </div>

    
    <div class="filters">
      <button 
        :class="{ active: currentFilter === 'all' }" 
        @click="currentFilter = 'all'"
      >
        全部
      </button>
      <button 
        :class="{ active: currentFilter === 'design' }" 
        @click="currentFilter = 'design'"
      >
        设计
      </button>
      <button 
        :class="{ active: currentFilter === 'illustration' }" 
        @click="currentFilter = 'illustration'"
      >
        插画
      </button>
      <button 
        :class="{ active: currentFilter === 'photography' }" 
        @click="currentFilter = 'photography'"
      >
        摄影
      </button>
    </div>

   
    <div class="works-grid">
      <div 
        class="work-card" 
        v-for="(work, index) in filteredWorks" 
        :key="index"
      >
        <div class="work-image">
          <img 
            :src="work.url" 
            :alt="work.title" 
            loading="lazy"
          >
        </div>
        <div class="work-info">
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </div>

    
    <div class="empty-state" v-if="filteredWorks.length === 0">
      <i class="fas fa-image"></i>
      <p>暂无作品，快去创作吧！</p>
    </div>
  </div>
</template> -->

<!-- <script>
export default {
  name: 'MyWorks',
  data() {
    return {
      currentFilter: 'all',
      // 作品数据 - 实际项目中可从API获取
      works: [
        {
          url: 'https://picsum.photos/seed/work1/600/400',
          title: '城市天际线设计',
          description: '现代都市建筑概念',
          category: 'design'
        },
        {
          url: 'https://picsum.photos/seed/work2/500/600',
          title: '森林幻想',
          description: '奇幻风格插画',
          category: 'illustration'
        },
        {
          url: 'https://picsum.photos/seed/work3/600/400',
          title: '山间云海',
          description: '自然风景摄影',
          category: 'photography'
        },
        {
          url: 'https://picsum.photos/seed/work4/400/500',
          title: '产品包装设计',
          description: '环保材料包装',
          category: 'design'
        },
        {
          url: 'https://picsum.photos/seed/work5/600/400',
          title: '海洋生物',
          description: '科普插画系列',
          category: 'illustration'
        },
        {
          url: 'https://picsum.photos/seed/work6/500/500',
          title: '街头瞬间',
          description: '人文纪实摄影',
          category: 'photography'
        }
      ]
    };
  },
  computed: {
    // 根据筛选条件过滤作品
    filteredWorks() {
      if (this.currentFilter === 'all') {
        return this.works;
      }
      return this.works.filter(work => work.category === this.currentFilter);
    }
  }
};
</script>

<style scoped>
.my-works {
  padding: 2rem;
  background-color: #121212;
  min-height: 100vh;
  color: #fff;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #4cc9f0;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #94a3b8;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filters button {
  background-color: #2a2a40;
  border: none;
  color: #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filters button:hover {
  background-color: #383850;
}

.filters button.active {
  background-color: #4cc9f0;
  color: #121212;
  font-weight: 500;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.work-card {
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.work-info {
  padding: 1.2rem;
}

.work-info h3 {
  margin: 0 0 0.5rem 0;
  color: #e2e8f0;
}

.work-info p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: #94a3b8;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .my-works {
    padding: 1rem;
  }
  
  .works-grid {
    grid-template-columns: 1fr;
  }
}
</style> -->
