<template>
  <div class="fashion-generator">
    <!-- 步骤导航 -->
    <div class="steps">
      <div :class="['step', { active: activeStep === 1 }]">
        <span class="step-number">1</span>
        <span class="step-label">服饰图添加</span>
      </div>
      <div :class="['step', { active: activeStep === 2 }]">
        <span class="step-number">2</span>
        <span class="step-label">模特选择</span>
      </div>
      <div class="step-done" v-if="activeStep === 2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </div>
    </div>

    <!-- 服饰图添加区 -->
    <div class="section">
      <div class="tab-header">
        <div 
          :class="['tab', { active: activeTab === 'combo' }]" 
          @click="activeTab = 'combo'"
        >组合套装</div>
        <div 
          :class="['tab', { active: activeTab === 'one-piece' }]" 
          @click="activeTab = 'one-piece'"
        >连体装</div>
      </div>

      <!-- 组合套装：上装 + 下装上传区 -->
      <div v-if="activeTab === 'combo'" class="combo-layout">
        <!-- 上装上传模块 -->
        <div class="upload-block">
          <div class="block-title">上传上装</div>
          <!-- 隐藏的文件选择框 -->
          <input 
            type="file" 
            ref="upperFileInput" 
            class="file-input" 
            accept="image/*" 
            @change="handleFileChange($event, 'upper')"
          >
          <!-- 上传区域 -->
          <div 
            class="drop-area" 
            @click="$refs.upperFileInput.click()"
            @dragover.prevent
            @drop.prevent="handleDrop($event, 'upper')"
          >
            <!-- 已上传图片预览 -->
            <div v-if="upperImage" class="uploaded-preview">
              <img :src="upperImage" class="preview-img" :alt="upperImageName">
              <button class="remove-img" @click.stop="removeImage('upper')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <!-- 上传提示文本 -->
            <div v-else class="upload-prompt">
              <p>点击添加 或 拖拽到此处</p>
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 下装上传模块 -->
        <div class="upload-block">
          <div class="block-title">上传下装</div>
          <!-- 隐藏的文件选择框 -->
          <input 
            type="file" 
            ref="lowerFileInput" 
            class="file-input" 
            accept="image/*" 
            @change="handleFileChange($event, 'lower')"
          >
          <!-- 上传区域 -->
          <div 
            class="drop-area" 
            @click="$refs.lowerFileInput.click()"
            @dragover.prevent
            @drop.prevent="handleDrop($event, 'lower')"
          >
            <!-- 已上传图片预览 -->
            <div v-if="lowerImage" class="uploaded-preview">
              <img :src="lowerImage" class="preview-img" :alt="lowerImageName">
              <button class="remove-img" @click.stop="removeImage('lower')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <!-- 上传提示文本 -->
            <div v-else class="upload-prompt">
              <p>点击添加 或 拖拽到此处</p>
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 连体装：上传区 -->
      <div v-else>
        <!-- 隐藏的文件选择框 -->
        <input 
          type="file" 
          ref="onePieceFileInput" 
          class="file-input" 
          accept="image/*" 
          @change="handleFileChange($event, 'onePiece')"
        >
        <!-- 上传区域 -->
        <div 
          class="drop-area one-piece-area" 
          @click="$refs.onePieceFileInput.click()"
          @dragover.prevent
          @drop.prevent="handleDrop($event, 'onePiece')"
        >
          <!-- 已上传图片预览 -->
          <div v-if="onePieceImage" class="uploaded-preview one-piece-preview">
            <img :src="onePieceImage" class="preview-img" :alt="onePieceImageName">
            <button class="remove-img" @click.stop="removeImage('onePiece')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <!-- 上传提示文本 -->
          <div v-else class="upload-prompt">
            <p>点击添加 或 拖拽到此处</p>
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模特选择区 -->
    <div class="section">
      <div class="tab-header">
        <div :class="['tab', { active: activeModelTab === 'template' }]" @click="activeModelTab = 'template'">模特模板</div>
        <div :class="['tab', { active: activeModelTab === 'custom' }]" @click="activeModelTab = 'custom'">自定义模特</div>
      </div>

      <!-- 模特模板（从接口获取） -->
      <div class="model-list-section" v-if="activeModelTab === 'template'">
        <div class="section-title">
          热门推荐
          <span v-if="isLoadingModels" class="loading-indicator">加载中...</span>
        </div>
        
        <!-- 加载失败提示 -->
        <div class="error-message" v-if="modelError">
          ⚠️ 加载失败：{{ modelError }} <button @click="fetchModels">重试</button>
        </div>
        
        <!-- 模特网格 -->
        <div class="model-grid" v-if="!modelError">
          <!-- 加载状态显示 -->
          <div v-if="isLoadingModels" class="loading-placeholder" v-for="n in 6" :key="n">
            <div class="skeleton"></div>
          </div>
          
          <!-- 实际模特列表 -->
          <div 
            v-else 
            v-for="model in modelList" 
            :key="model.id" 
            :class="['model-item', { selected: model.selected }]" 
            @click="selectModel(model.id)"
          >
            <img :src="model.imgUrl" class="model-img" :alt="model.name" />
            <div class="model-name">{{ model.name }}</div>
          </div>
          
          <!-- 加载更多按钮 -->
          <div 
            v-else 
            class="model-item more" 
            @click="loadMoreModels"
            :disabled="isLoadingMore || !hasMore"
          >
            <span v-if="!isLoadingMore && hasMore">99+</span>
            <span v-if="isLoadingMore">加载中...</span>
            <span v-if="!hasMore">没有更多</span>
          </div>
        </div>
      </div>

      <!-- 自定义模特 -->
      <div class="custom-model" v-else>
        <p>自定义模特功能可扩展上传/裁剪等交互...</p>
      </div>

      <!-- 出图数量选择 -->
      <div class="output-count-section">
        <span class="label">出图数量</span>
        <div class="count-buttons">
          <button 
            v-for="count in [1,2,4]" 
            :key="count" 
            :class="['count-btn', { active: outputCount === count }]" 
            @click="outputCount = count"
          >
            {{ count }}
          </button>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="footer">
      <button class="reset-btn" @click="resetParams">参数重置</button>
      <button class="generate-btn" @click="generate" :disabled="isGenerating">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-magic">
          <path d="M10 14c3.04 0 5.44 1.79 6 5H4c.56-3.21 2.96-5 6-5"></path>
          <path d="M2 12h20"></path>
          <path d="M12 2v20"></path>
        </svg>
        <span v-if="!isGenerating">生成</span>
        <span v-if="isGenerating">生成中...</span>
        <span class="coin">8</span>
      </button>
    </div>
  </div>
</template>

<script>
// 假设BASE_URL已在全局环境中定义
// 例如: const BASE_URL = 'http://api.yourdomain.com/';

export default {
  name: 'FashionGenerator',
  data() {
    return {
      activeStep: 2,
      activeTab: 'one-piece',
      activeModelTab: 'template',
      
      // 模特相关（从接口获取）
      modelList: [],
      isLoadingModels: false,
      isLoadingMore: false,
      modelError: '',
      currentPage: 1,
      hasMore: true,
      
      outputCount: 2,
      
      // 图片存储
      upperImage: null,
      upperImageName: '',
      lowerImage: null,
      lowerImageName: '',
      onePieceImage: null,
      onePieceImageName: '',
      
      // 生成相关
      isGenerating: false,
      generatedImages: []
    }
  },
  mounted() {
    // 组件挂载时加载第一页模特
    this.fetchModels();
  },
  methods: {
    // 从接口获取模特列表
    async fetchModels() {
      this.isLoadingModels = true;
      this.modelError = '';
      
      try {
        const response = await fetch(`${BASE_URL}api/models?page=1&limit=6`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP错误：${response.status}`);
        }
        
        const data = await response.json();
        if (data.success && data.data?.list) {
          this.modelList = data.data.list.map(model => ({
            ...model,
            selected: false
          }));
          // 默认选中第一个
          if (this.modelList.length > 0) {
            this.modelList[0].selected = true;
          }
          this.currentPage = 1;
          this.hasMore = data.data.hasMore;
        } else {
          throw new Error(data.message || '获取模特列表失败');
        }
      } catch (error) {
        this.modelError = error.message;
        console.error('加载模特失败:', error);
      } finally {
        this.isLoadingModels = false;
      }
    },
    
    // 加载更多模特（分页）
    async loadMoreModels() {
      if (this.isLoadingMore || !this.hasMore) return;
      
      this.isLoadingMore = true;
      this.modelError = '';
      
      try {
        const nextPage = this.currentPage + 1;
        const response = await fetch(`${BASE_URL}api/models?page=${nextPage}&limit=6`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP错误：${response.status}`);
        }
        
        const data = await response.json();
        if (data.success && data.data?.list) {
          this.modelList = [
            ...this.modelList,
            ...data.data.list.map(model => ({...model, selected: false}))
          ];
          this.currentPage = nextPage;
          this.hasMore = data.data.hasMore;
        } else {
          throw new Error(data.message || '加载更多失败');
        }
      } catch (error) {
        this.modelError = error.message;
        console.error('加载更多模特失败:', error);
      } finally {
        this.isLoadingMore = false;
      }
    },
    
    // 选择模特（通过ID）
    selectModel(modelId) {
      this.modelList.forEach(model => {
        model.selected = model.id === modelId;
      });
    },
    
    // 重置参数
    resetParams() {
      this.activeTab = 'one-piece';
      // 重置模特选中状态
      if (this.modelList.length > 0) {
        this.modelList.forEach((model, idx) => {
          model.selected = idx === 0;
        });
      }
      this.outputCount = 2;
      this.activeModelTab = 'template';
      
      // 重置上传的图片
      this.upperImage = null;
      this.upperImageName = '';
      this.lowerImage = null;
      this.lowerImageName = '';
      this.onePieceImage = null;
      this.onePieceImageName = '';
      
      alert('参数已重置');
    },
    
    // 生成图片
    async generate() {
      // 1. 基础校验
      if (this.activeTab === 'combo' && (!this.upperImage || !this.lowerImage)) {
        alert('请上传上装和下装图片');
        return;
      }
      if (this.activeTab === 'one-piece' && !this.onePieceImage) {
        alert('请上传连体装图片');
        return;
      }

      // 2. 检查是否选择模特
      const selectedModel = this.modelList.find(model => model.selected);
      if (!selectedModel) {
        alert('请选择一个模特');
        return;
      }

      try {
        this.isGenerating = true;

        const requestData = {
          clothes: this.activeTab === 'combo' 
            ? { upper: this.upperImage, lower: this.lowerImage }
            : { onePiece: this.onePieceImage },
          model: {
            id: selectedModel.id,
            imgUrl: selectedModel.imgUrl
          },
          outputCount: this.outputCount,
          timestamp: new Date().getTime()
        };

        const response = await fetch(BASE_URL+"api/fashion/generate", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const error = await response.json().catch(() => null);
          throw new Error(error?.message || `生成失败（${response.status}）`);
        }

        const result = await response.json();
        if (result.success && result.data?.generatedImages) {
          this.generatedImages = result.data.generatedImages;
          this.$emit('generation-success', result.data.generatedImages);
          alert(`成功生成${this.outputCount}张图片`);
        } else {
          throw new Error(result.message || '生成图片为空');
        }

      } catch (error) {
        console.error('生成失败:', error);
        alert(`生成失败：${error.message}`);
      } finally {
        this.isGenerating = false;
      }
    },
    
    // 处理文件选择
    handleFileChange(e, type) {
      const file = e.target.files[0];
      if (!file) return;
      
      // 校验文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件（JPG/PNG/WEBP）');
        return;
      }
      
      // 校验文件大小（不超过5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }
      
      // 读取文件并生成预览URL
      const reader = new FileReader();
      reader.onload = (event) => {
        switch(type) {
          case 'upper':
            this.upperImage = event.target.result;
            this.upperImageName = file.name;
            break;
          case 'lower':
            this.lowerImage = event.target.result;
            this.lowerImageName = file.name;
            break;
          case 'onePiece':
            this.onePieceImage = event.target.result;
            this.onePieceImageName = file.name;
            break;
        }
      };
      reader.readAsDataURL(file);
      
      // 重置input值
      e.target.value = '';
    },

    // 移除图片
    removeImage(type) {
      switch(type) {
        case 'upper':
          this.upperImage = null;
          this.upperImageName = '';
          break;
        case 'lower':
          this.lowerImage = null;
          this.lowerImageName = '';
          break;
        case 'onePiece':
          this.onePieceImage = null;
          this.onePieceImageName = '';
          break;
      }
    },

    // 处理拖拽上传
    handleDrop(event, type) {
      const files = event.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        // 读取拖拽的文件并预览
        const reader = new FileReader();
        reader.onload = (e) => {
          switch(type) {
            case 'upper':
              this.upperImage = e.target.result;
              this.upperImageName = files[0].name;
              break;
            case 'lower':
              this.lowerImage = e.target.result;
              this.lowerImageName = files[0].name;
              break;
            case 'onePiece':
              this.onePieceImage = e.target.result;
              this.onePieceImageName = files[0].name;
              break;
          }
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }
}
</script>

<style scoped>
/* 全局样式 */
.fashion-generator {
  width: 375px;
  margin: 30px auto;
  background: #121212;
  color: #f0f0f0;
  font-family: 'Inter', Arial, sans-serif;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.6);
  position: relative;
  margin-right:80%;
}

/* 隐藏的文件选择框 */
.file-input {
  display: none;
}

/* 步骤导航 */
.steps {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
}
.step-number {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
  background: linear-gradient(90deg, #646cff, #00ffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: all 0.3s;
}
.step-label {
  font-size: 12px;
  color: #666;
  transition: color 0.3s;
}
.step.active .step-number {
  background: linear-gradient(90deg, #8992ff, #00f7ff);
}
.step.active .step-label {
  color: #fff;
}
.step-done {
  margin-left: auto;
  color: #00ffff;
  font-size: 24px;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 组合套装双列布局 */
.combo-layout {
  display: flex;
  gap: 16px;
}
.upload-block {
  flex: 1;
}
.block-title {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Tab切换 */
.tab-header {
  display: flex;
  margin-bottom: 12px;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 8px;
  background: #1a1a1a;
  cursor: pointer;
  margin-right: 6px;
  border-radius: 8px;
  transition: all 0.3s;
}
.tab:last-child {
  margin-right: 0;
}
.tab.active {
  background: linear-gradient(135deg, #4a4eff, #00d0ff);
  box-shadow: 0 0 8px rgba(0,255,255,0.3);
  color: #121212;
}
.tab:hover {
  transform: translateY(-1px);
}

/* 上传区域样式 */
.drop-area {
  border: 2px dashed #00ffff33;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  animation: dash-pulse 2s infinite;
  cursor: pointer;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.one-piece-area {
  min-height: 220px;
}
@keyframes dash-pulse {
  0%, 100% { border-color: #00ffff33; }
  50% { border-color: #00ffff88; }
}

/* 上传提示 */
.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-prompt p {
  margin: 0 0 16px 0;
  color: #ccc;
}
.upload-icon {
  color: #00ffff;
}
.upload-icon .feather {
  width: 32px;
  height: 32px;
  stroke-width: 1.5;
}

/* 已上传图片预览 */
.uploaded-preview {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 180px;
}
.one-piece-preview {
  max-height: 220px;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}
.remove-img {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff3b3b;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}
.remove-img:hover {
  transform: scale(1.1);
}
.remove-img .feather {
  width: 14px;
  height: 14px;
}

/* 模特列表 */
.model-list-section {
  margin-top: 12px;
}
.section-title {
  font-size: 14px;
  margin-bottom: 10px;
  color: #ccc;
  display: flex;
  align-items: center;
}
.model-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.model-item {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
}
.model-item.selected {
  border-color: #00ffff;
  box-shadow: 0 0 12px #00ffff44;
}
.model-img {
  width: 100%;
  display: block;
  border-radius: 6px;
}
.model-item:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(255,255,255,0.2);
}
.more {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #646cff, #00d0ff);
  color: #121212;
  font-weight: bold;
  transition: all 0.3s;
  height: 100%;
}
.more:hover:not(:disabled) {
  transform: rotate(5deg) scale(1.05);
  box-shadow: 0 0 12px rgba(0,255,255,0.4);
}
.more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 出图数量 */
.output-count-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.label {
  margin-right: 10px;
  color: #ccc;
}
.count-buttons {
  display: flex;
  gap: 6px;
}
.count-btn {
  background: #1a1a1a;
  border: none;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.count-btn.active {
  background: linear-gradient(90deg, #646cff, #00ffff);
  box-shadow: 0 0 8px rgba(0,255,255,0.3);
  color: #121212;
}
.count-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 6px rgba(255,255,255,0.2);
}

/* 底部操作 */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}
.reset-btn {
  background: #1a1a1a;
  border: none;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.reset-btn:hover {
  background: linear-gradient(90deg, #333, #444);
  box-shadow: 0 0 6px rgba(255,255,255,0.1);
  transform: translateY(-1px);
}
.generate-btn {
  background: linear-gradient(135deg, #646cff, #00d0ff);
  border: none;
  color: #121212;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 0 16px rgba(0,255,255,0.4);
}
.generate-btn:hover:not(:disabled) {
  box-shadow: 0 0 24px rgba(0,255,255,0.6);
  transform: translateY(-2px);
}
.generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
.coin {
  background: linear-gradient(90deg, #ffd700, #ffeb3b);
  color: #121212;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  text-shadow: 0 0 4px #ffd700;
}

/* 图标样式 */
.feather {
  width: 18px;
  height: 18px;
  stroke: #fff;
  stroke-width: 1.8;
}
.generate-btn .feather {
  stroke: #121212;
}

/* 模特加载状态样式 */
.loading-indicator {
  font-size: 12px;
  color: #00ffff;
  margin-left: 8px;
}

/* 错误提示 */
.error-message {
  color: #ff4d4d;
  font-size: 13px;
  padding: 10px;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 6px;
  margin-bottom: 10px;
  text-align: center;
}
.error-message button {
  color: #00ffff;
  background: transparent;
  border: 1px solid #00ffff;
  border-radius: 4px;
  padding: 2px 8px;
  margin-left: 6px;
  cursor: pointer;
}

/* 加载占位符 */
.loading-placeholder {
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
}
.skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 模特名称 */
.model-name {
  font-size: 12px;
  color: #ccc;
  text-align: center;
  padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 自定义模特区域 */
.custom-model {
  padding: 20px;
  text-align: center;
  color: #666;
  background: #1a1a1a;
  border-radius: 8px;
  margin-top: 10px;
}

/* 响应式调整 */
@media (max-width: 400px) {
  .fashion-generator {
    width: 100%;
    margin: 10px;
    padding: 16px;
  }
}
</style>
