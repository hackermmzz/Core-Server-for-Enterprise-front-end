<template>
  <div class="featured-gallery">
    <!-- 主分类按钮 -->
    <div class="main-tabs">
      <button 
        class="main-tab" 
        :class="{ active: activeMainTab === 'cases' }"
        @click="switchMainTab('cases')"
        :disabled="isLoading"
      >
        精选案例
      </button>
      <button 
        class="main-tab" 
        :class="{ active: activeMainTab === 'content' }"
        @click="switchMainTab('content')"
        :disabled="isLoading"
      >
        精选内容
      </button>
    </div>

    <!-- 子分类按钮 -->
    <div class="sub-tabs">
      <template v-if="activeMainTab === 'cases'">
        <button 
          class="sub-tab" 
          v-for="(category, index) in caseCategories" 
          :key="index"
          :class="{ active: activeSubTab === category.value }"
          @click="switchSubTab(category.value)"
          :disabled="isLoading"
        >
          {{ category.label }}
        </button>
      </template>
      
      <template v-if="activeMainTab === 'content'">
        <button 
          class="sub-tab" 
          :class="{ active: activeSubTab === 'all' }"
          @click="switchSubTab('all')"
          :disabled="isLoading"
        >
          全部
        </button>
      </template>
    </div>

    <!-- 加载状态 -->
    <div class="loading-state" v-if="isLoading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div class="error-state" v-if="errorMessage && !isLoading">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ errorMessage }}</p>
      <button class="retry-btn" @click="fetchImages()">重试</button>
    </div>

    <!-- 图片展示区域 -->
    <div class="image-grid" v-if="!isLoading && !errorMessage">
      <div 
        class="image-item" 
        v-for="(item, index) in filteredImages" 
        :key="item.id || index"
      >
        <img 
          :src="item.url" 
          :alt="item.alt" 
          class="gallery-image"
          loading="lazy"
        >
        <div class="image-caption">{{ item.title }}</div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div class="empty-state" v-if="!isLoading && !errorMessage && filteredImages.length === 0">
      <i class="fas fa-image"></i>
      <p>暂无相关图片</p>
    </div>

    <!-- 加载更多按钮 -->
    <div class="load-more-container" v-if="!isLoading && !errorMessage && hasMore">
      <button 
        class="load-more-btn" 
        @click="loadMoreImages()"
        :disabled="isLoadingMore"
      >
        <span v-if="!isLoadingMore">加载更多</span>
        <span v-if="isLoadingMore">加载中...</span>
      </button>
    </div>
  </div>
</template>

<script>
// 假设BASE_URL已在全局定义
// const BASE_URL = 'http://your-api-domain.com/';

export default {
  name: 'FeaturedGallery',
  data() {
    return {
      // 主分类状态
      activeMainTab: 'cases',
      // 子分类状态
      activeSubTab: 'infinite',
      
      // 案例分类
      caseCategories: [
        { label: '无限创意', value: 'infinite' },
        { label: '绘本', value: 'pictureBook' },
        { label: '游戏', value: 'game' },
        { label: '动画', value: 'animation' },
        { label: '设计', value: 'design' }
      ],
      
      // 图片数据相关
      images: [],           // 所有图片数据
      isLoading: false,     // 初始加载状态
      isLoadingMore: false, // 加载更多状态
      errorMessage: '',     // 错误信息
      currentPage: 1,       // 当前页码
      pageSize: 12,         // 每页数量
      hasMore: true         // 是否有更多数据
    };
  },
  computed: {
    // 根据当前选中的分类过滤图片
    filteredImages() {
      if (this.activeMainTab === 'content' && this.activeSubTab === 'all') {
        // 精选内容 - 全部：返回所有图片
        return this.images;
      } else if (this.activeMainTab === 'cases') {
        // 精选案例：返回对应子分类的图片
        return this.images.filter(img => img.category === this.activeSubTab);
      }
      return [];
    }
  },
  mounted() {
    // 组件挂载时获取第一页图片数据
    this.fetchImages();
  },
  methods: {
    // 从后端API获取图片数据
    async fetchImages(reset = true) {
      // 如果是重置，清空现有数据并重置页码
      if (reset) {
        this.isLoading = true;
        this.currentPage = 1;
        this.hasMore = true;
      } else {
        // 如果是加载更多，只显示加载更多状态
        this.isLoadingMore = true;
      }
      
      this.errorMessage = '';
      
      try {
        // 构建请求参数
        const params = new URLSearchParams();
        params.append('page', reset ? 1 : this.currentPage);
        params.append('pageSize', this.pageSize);
        params.append('type', this.activeMainTab);
        if (this.activeMainTab === 'cases') {
          params.append('category', this.activeSubTab);
        }
        
        // 调用后端API
        const response = await fetch(`${BASE_URL}api/gallery?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 如需身份验证
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`请求失败: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data.images)) {
          // 根据是否重置决定是替换还是追加数据
          if (reset) {
            this.images = result.data.images;
          } else {
            this.images = [...this.images, ...result.data.images];
          }
          
          // 更新分页信息
          this.currentPage = result.data.currentPage || this.currentPage + 1;
          this.hasMore = result.data.hasMore || false;
        } else {
          throw new Error(result.message || '获取图片数据失败');
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error('获取图片失败:', error);
      } finally {
        // 重置加载状态
        this.isLoading = false;
        this.isLoadingMore = false;
      }
    },
    
    // 加载更多图片
    loadMoreImages() {
      if (this.isLoading || this.isLoadingMore || !this.hasMore) return;
      this.fetchImages(false);
    },
    
    // 切换主分类
    switchMainTab(tab) {
      if (this.activeMainTab === tab) return;
      
      this.activeMainTab = tab;
      // 重置子分类
      if (tab === 'cases') {
        this.activeSubTab = 'infinite'; // 默认选中第一个案例分类
      } else {
        this.activeSubTab = 'all'; // 内容分类默认选中全部
      }
      
      // 切换分类后重新获取数据
      this.fetchImages();
    },
    
    // 切换子分类
    switchSubTab(tab) {
      if (this.activeSubTab === tab) return;
      
      this.activeSubTab = tab;
      // 切换子分类后重新获取数据
      this.fetchImages();
    }
  },
  watch: {
    // 监听分类变化，在需要时重新加载数据
    activeMainTab(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchImages();
      }
    },
    activeSubTab(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchImages();
      }
    }
  }
}
</script>

<style scoped>
.featured-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

/* 主分类标签 */
.main-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.main-tab {
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  margin-right: 10px;
}

.main-tab.active {
  color: #333;
}

.main-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b983;
}

.main-tab:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 子分类标签 */
.sub-tabs {
  display: flex;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 8px;
}

.sub-tab {
  padding: 6px 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.sub-tab.active {
  background: #42b983;
  color: white;
}

.sub-tab:hover:not(.active):not(:disabled) {
  background: #e0e0e0;
}

.sub-tab:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 图片网格 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.image-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.gallery-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.image-caption {
  padding: 12px;
  font-size: 14px;
  color: #333;
  background: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 状态样式 */
.empty-state, .loading-state, .error-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-state i, .error-state i {
  font-size: 48px;
  margin-bottom: 16px;
  color: #ccc;
}

.error-state i {
  color: #ff4d4d;
}

/* 加载动画 */
.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 加载更多按钮 */
.load-more-container {
  text-align: center;
  margin: 20px 0 40px;
}

.load-more-btn {
  padding: 10px 24px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover:not(:disabled) {
  background: #e0e0e0;
  color: #333;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 重试按钮 */
.retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #359e6d;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
  
  .gallery-image {
    height: 140px;
  }
  
  .main-tab, .sub-tab {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>




























<!-- <template>
  <div class="featured-gallery">
    
    <div class="main-tabs">
      <button 
        class="main-tab" 
        :class="{ active: activeMainTab === 'cases' }"
        @click="switchMainTab('cases')"
      >
        精选案例
      </button>
      <button 
        class="main-tab" 
        :class="{ active: activeMainTab === 'content' }"
        @click="switchMainTab('content')"
      >
        精选内容
      </button>
    </div>

    
    <div class="sub-tabs">
      <template v-if="activeMainTab === 'cases'">
        <button 
          class="sub-tab" 
          v-for="(category, index) in caseCategories" 
          :key="index"
          :class="{ active: activeSubTab === category.value }"
          @click="switchSubTab(category.value)"
        >
          {{ category.label }}
        </button>
      </template>
      
      <template v-if="activeMainTab === 'content'">
        <button 
          class="sub-tab" 
          :class="{ active: activeSubTab === 'all' }"
          @click="switchSubTab('all')"
        >
          全部
        </button>
      </template>
    </div>

    
    <div class="image-grid">
      <div 
        class="image-item" 
        v-for="(item, index) in filteredImages" 
        :key="index"
      >
        <img 
          :src="item.url" 
          :alt="item.alt" 
          class="gallery-image"
          loading="lazy"
        >
        <div class="image-caption">{{ item.title }}</div>
      </div>
    </div>

  
    <div class="empty-state" v-if="filteredImages.length === 0">
      <i class="fas fa-image"></i>
      <p>暂无相关图片</p>
    </div>
  </div>
</template> -->

<!-- <script>
export default {
  name: 'FeaturedGallery',
  data() {
    return {
      // 主分类状态
      activeMainTab: 'cases',
      // 子分类状态
      activeSubTab: 'infinite',
      
      // 案例分类
      caseCategories: [
        { label: '无限创意', value: 'infinite' },
        { label: '绘本', value: 'pictureBook' },
        { label: '游戏', value: 'game' },
        { label: '动画', value: 'animation' },
        { label: '设计', value: 'design' }
      ],
      
      // 所有图片数据
      images: [
        // 无限创意类
        {
          url: 'https://picsum.photos/seed/creative1/400/300',
          alt: '无限创意作品1',
          title: '未来城市概念',
          category: 'infinite'
        },
        {
          url: 'https://picsum.photos/seed/creative2/400/300',
          alt: '无限创意作品2',
          title: '抽象艺术表达',
          category: 'infinite'
        },
        {
          url: 'https://picsum.photos/seed/creative3/400/300',
          alt: '无限创意作品3',
          title: '跨界融合设计',
          category: 'infinite'
        },
        
        // 绘本类
        {
          url: 'https://picsum.photos/seed/book1/400/300',
          alt: '绘本作品1',
          title: '儿童故事绘本',
          category: 'pictureBook'
        },
        {
          url: 'https://picsum.photos/seed/book2/400/300',
          alt: '绘本作品2',
          title: '插画集精选',
          category: 'pictureBook'
        },
        
        // 游戏类
        {
          url: 'https://picsum.photos/seed/game1/400/300',
          alt: '游戏作品1',
          title: '游戏场景设计',
          category: 'game'
        },
        {
          url: 'https://picsum.photos/seed/game2/400/300',
          alt: '游戏作品2',
          title: '角色概念设计',
          category: 'game'
        },
        
        // 动画类
        {
          url: 'https://picsum.photos/seed/animation1/400/300',
          alt: '动画作品1',
          title: '动画短片截图',
          category: 'animation'
        },
        
        // 设计类
        {
          url: 'https://picsum.photos/seed/design1/400/300',
          alt: '设计作品1',
          title: '产品设计方案',
          category: 'design'
        }
      ]
    };
  },
  computed: {
    // 根据当前选中的分类过滤图片
    filteredImages() {
      if (this.activeMainTab === 'content' && this.activeSubTab === 'all') {
        // 精选内容 - 全部：返回所有图片
        return this.images;
      } else if (this.activeMainTab === 'cases') {
        // 精选案例：返回对应子分类的图片
        return this.images.filter(img => img.category === this.activeSubTab);
      }
      return [];
    }
  },
  methods: {
    // 切换主分类
    switchMainTab(tab) {
      this.activeMainTab = tab;
      // 重置子分类
      if (tab === 'cases') {
        this.activeSubTab = 'infinite'; // 默认选中第一个案例分类
      } else {
        this.activeSubTab = 'all'; // 内容分类默认选中全部
      }
    },
    // 切换子分类
    switchSubTab(tab) {
      this.activeSubTab = tab;
    }
  }
}
</script> -->

<!-- <style scoped>
.featured-gallery {
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin-top: 1rem;
}

/* 主分类按钮样式 */
.main-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.main-tab {
  background-color: #2a2a40;
  border: none;
  color: #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.main-tab:hover {
  background-color: #383850;
}

.main-tab.active {
  background-color: #4cc9f0;
  color: #121212;
  font-weight: 500;
}

/* 子分类按钮样式 */
.sub-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.sub-tab {
  background-color: #2d3748;
  border: none;
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.sub-tab:hover {
  background-color: #4a5568;
}

.sub-tab.active {
  background-color: #4cc9f0;
  color: #121212;
}

/* 图片网格样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.image-item {
  border-radius: 8px;
  overflow: hidden;
  background-color: #2a2a40;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-caption {
  padding: 1rem;
  color: #e2e8f0;
  font-size: 0.95rem;
  text-align: center;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #94a3b8;
  text-align: center;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
</style> -->
