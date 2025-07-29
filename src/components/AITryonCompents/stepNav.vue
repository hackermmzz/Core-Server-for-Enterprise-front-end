<template>
  <div class="step-nav">
    <div 
      v-for="(step, index) in steps" 
      :key="index" 
      class="step-item"
      :class="{ 
        active: step.status === 'active', 
        completed: step.status === 'completed' 
      }"
    >
      <!-- 步骤数字 -->
      <div class="step-number">
        {{ index + 1 }}
      </div>

      <!-- 步骤标题 -->
      <div class="step-title">
        {{ step.title }}
      </div>

      <!-- 下划线（最后一步隐藏） -->
      <div class="divider" v-if="index !== steps.length - 1"></div>

      <!-- 完成标记（仅completed状态显示） -->
      <div class="check-mark" v-if="step.status === 'completed'">
        <i class="fas fa-check"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepNav',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => [
        { title: '服饰图添加', status: 'completed' },
        { title: '模特选择', status: 'active' }
      ]
    }
  }
}
</script>

<style scoped>
.step-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 步骤数字 */
.step-number {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #444;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  margin-right: 0.5rem;
}

/* 步骤标题 */
.step-title {
  color: #ccc;
  font-size: 1rem;
}

/* 下划线 */
.divider {
  flex: 1;
  height: 2px;
  background-color: #444;
  margin-left: 1rem;
}

/* 激活状态（当前步骤） */
.step-item.active {
  cursor: default;
}
.step-item.active .step-number {
  background-color: #4cc9f0;
  color: #121212;
}
.step-item.active .step-title {
  color: #fff;
}
.step-item.active .divider {
  background-color: #4cc9f0;
}

/* 完成状态 */
.step-item.completed .step-number {
  background-color: #28a745; /* 成功绿 */
  color: #fff;
}
.step-item.completed .step-title {
  color: #28a745;
}
.step-item.completed .divider {
  background-color: #28a745;
}

/* 完成标记 */
.check-mark {
  margin-left: 0.5rem;
  color: #28a745;
  font-size: 1.2rem;
}
</style>