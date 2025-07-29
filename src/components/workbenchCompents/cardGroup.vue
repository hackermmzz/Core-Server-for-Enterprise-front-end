<template>
  <div class="card-group">
    <div 
      class="card" 
      v-for="(card, index) in cards" 
      :key="index" 
      :style="{ background: card.bgColor }"
    >
      <h2 class="card-title">
        {{ card.title }}
        <span class="more-tag">More</span>
      </h2>
      <p class="card-desc">{{ card.desc }}</p>
      <div class="button-group">
        <button 
          class="btn" 
          v-for="(btnText, btnIndex) in card.buttons" 
          :key="btnIndex"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGroup',
  data() {
    return {
      cards: [
{
          title: '场景裂变',
          desc: '快速生成多场景创意内容，一键拓展应用场景',
          bgColor: 'linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%)',
          buttons: ['场景拓展', '多版本生成', '智能适配', '批量修改', '场景模板', '风格统一']
        },
        {
          title: '智能抠图',
          desc: '精准识别主体，快速去除背景，支持多种抠图模式',
          bgColor: 'linear-gradient(135deg, #f5ce62 0%, #e4a958 100%)',
          buttons: ['主体抠图', '发丝级抠图', '批量处理', '边缘优化', '背景虚化', '透明背景']
        },
        {
          title: '虚拟穿衣',
          desc: 'AI驱动的虚拟试衣体验，快速展示服装上身效果',
          bgColor: 'linear-gradient(135deg, #59c173 0%, #a17fe0 100%)',
          buttons: ['虚拟试衣', '多尺码预览', '色彩替换', '款式变换', '场景搭配', '细节放大']
        }
      ]
    };
  }
};
</script>

<style scoped>
.card-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.card {
  width: 300px;
  min-height: 300px;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.more-tag {
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
}

.card-desc {
  margin-bottom: 15px;
  line-height: 1.4;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>