
<template>
  <div class = "home-container" >

    <nav class = "navbar">
      <!-- 商标和应用名称 -->
      <div class="logo">
        <img src="../assets/HYLogo.png" alt="Logo" class="logo-img" />
        <span class="app-name">幻衣应用</span>
      </div>
      <ul>
        <li><router-link to="/">幻衣首页</router-link></li>
        <li><router-link to="/">AI工具箱</router-link></li>
        <li><router-link to="/">案例场景</router-link></li>
        <li><router-link to="/">合作中心</router-link></li>
        <li><router-link to="/">关于我们</router-link></li>
      </ul>
    </nav>

    <div class="content">
      <h1 class="text-size">
        用幻衣AI，
        <span class="color-change" :style="{ color: currentColor }">{{ currentText }}</span>
      </h1>
      <p class = "text2-size">Less Design, More Creation.</p>
          <button class="start-btn" @click="goToLogin">开始创作</button>
      <div class="image-layer">
        <img src="../assets/image1.png" alt="Layer 1" class="layer-image1" />
        <img src="../assets/image2.png" alt="Layer 2" class="layer-image2" />
        <img src="../assets/image3.png" alt="Layer 3" class="layer-image3" />
        <img src="../assets/image4.png" alt="Layer 4" class="layer-image4" />
      </div>
    </div>


    <!-- 渐变背景文字部分 -->
    <div class="gradient-section">
      <div class="gradient-text">
        <h1>幻衣AI，更懂创意的AI</h1>
        <p>少做重复设计，多给创作时间</p>
      </div>
    </div>

    <!-- 向下的指向标 -->
    <div class="arrow-down"></div>

    <div class="colored-text">
      <span style="color: white;">多元设计场景,</span>
      <span style="color: darkolivegreen;">高效</span>
      <span style="color: orangered;">创意工作流</span>
    </div>
      <!-- 图片显示 -->
      <div class="image-slider">
        <img :src="images[currentIndexImage]" alt="Image Slider" />
      </div>




  </div>

</template>

<script >
import SliderImage1 from '../assets/SliderImage1.png';
import SliderImage2 from '../assets/SliderImage2.png';
import SliderImage3 from '../assets/SliderImage3.png';
import SliderImage4 from '../assets/SliderImage4.png';

export default {
  name : 'NewHome',
  data() {
    return {
      texts: ["获取无限灵感", "释放创意能量", "与AI一起创造", "灵感如此自由"],
      currentText: "获取无限灵感",
      currentColor: "#28a745", // 初始颜色为绿色
      currentIndex: 0,
      images: [
        SliderImage1,
        SliderImage2,
        SliderImage3,
        SliderImage4,
        SliderImage1,
        SliderImage2
      ],
      currentIndexImage: 0,
      // 按钮对应的文字
      buttonLabels: [
        "电商设计", "平面海报", "品牌设计",
        "无限创意", "绘本设计", "插画设计"
      ],

    };

  },
  methods: {
    changeText() {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.currentText = this.texts[this.currentIndex];
      this.currentColor = this.getRandomColor();
    },
    getRandomColor() {
      const colors = ['#28a745', '#ff5722', '#ff9800', '#03a9f4', '#8e24aa'];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    changeImageIndex(){
      this.currentIndexImage=(this.currentIndexImage+1)% this.images.length;
    },
    goToLogin() {
      // 使用 Vue Router 进行页面跳转
      this.$router.push('/login_register');
       //this.$router.push('/home');
    }


  },
  mounted() {
    this.interval1 = setInterval(this.changeText, 2000); // 每2秒切换文字和颜色
    this.interval2 = setInterval(this.changeImageIndex, 2000); // 每2秒切换文字和颜色


  },
  beforeUnmount() {
    // 清除定时器
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  },

}
</script>

<style scoped>
/*主页设置*/
.home-container {
  background-color: black;
  min-height: 100vh; /* 确保容器至少填满视口高度 */
  position: relative; /* 用于相对定位子元素 */
  display: flex;
  flex-direction: column; /* 垂直排列所有内容 */
  justify-content: center;
  align-items: center;
  color: white;
}
.content{
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  justify-content: center; /* 垂直方向上居中对齐 */
  align-items: center; /* 水平方向上居中对齐 */
  height: 100vh; /* 设置容器高度为视口高度 */
  text-align: center; /* 使文字水平居中 */
  background-color: black;
  color: white;
  z-index: 1; /* 保证文字和按钮层级高于图片 */
  position: relative;
}

/*导航栏设置*/
.navbar{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 50px;
  background-color: black;
  color:white;
  z-index: 100;
  display: flex;
  justify-content: flex-start;; /* 确保左侧的商标和应用名称在左，右侧的导航链接居中 */
  align-items: center; /* 垂直居中对齐所有内容 */
  padding-left: 20px; /* 给左侧添加一些内边距 */
  padding-right: 20px; /* 给右侧添加一些内边距 */
}
.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

.navbar ul li {
  margin: 0 20px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}
/* 当链接被点击时（active状态） */
.navbar ul li a:active {
  color: orange; /* 设置被选中时字体颜色为橙色 */
}

/* 当链接获取焦点时（例如使用键盘导航时） */
.navbar ul li a:focus {
  color: orange; /* 设置焦点时字体颜色为橙色 */
}
/* 商标和应用名称的样式 */
.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 40px; /* 设置商标的宽度 */
  height: auto; /* 保持商标的纵横比 */
  margin-right: 10px; /* 商标与应用名称之间的间距 */
}

.app-name {
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-right: 240px;
}
/*动态文字播放设置*/
.content {
  text-align: center;
  background-color: transparent;
  padding: 40px;
  color: white;
}

.color-change {
  font-weight: bold;
  font-size: 80px;
}

.start-btn {
  background: linear-gradient(45deg, #ff9800, #ff5722); /* 橙黄渐变背景 */
  color: white;
  padding: 10px 20px;
  border: 2px solid transparent; /* 初始透明边框 */
  border-radius: 5px; /* 圆角 */
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease; /* 给所有样式添加平滑过渡 */
  position: relative;
  margin-top: 50px;
  margin-left: -700px;
  width: 200px;
  outline: none; /* 去除焦点时的边框 */
}

/* 创建闪烁的金色边框 */
.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ffb300, #ff9800); /* 金色渐变边框 */
  z-index: -1;
  border-radius: 5px; /* 圆角 */
  padding: 4px; /* 控制边框的厚度 */
  animation: blinkBorder 1.5s infinite alternate; /* 设置闪烁动画 */
}
/* 闪烁效果的动画 */
@keyframes blinkBorder {
  0% {
    box-shadow: 0 0 5px #ffb300, 0 0 10px #ff9800, 0 0 15px #ffb300; /* 起始闪烁状态 */
  }
  50% {
    box-shadow: 0 0 10px #ffb300, 0 0 15px #ff9800, 0 0 20px #ffb300; /* 中间的闪烁状态 */
  }
  100% {
    box-shadow: 0 0 15px #ffb300, 0 0 20px #ff9800, 0 0 25px #ffb300; /* 闪烁效果的最大状态 */
  }
}

.start-btn:hover {
  background-color: #ff5722; /* 悬浮时背景变为橙色 */
  box-shadow: 0 0 15px rgba(255, 87, 34, 0.6); /* 按钮在悬浮时出现阴影 */
  transform: scale(1.05); /* 轻微放大按钮 */
}

.start-btn:active {
  background-color: #f44336; /* 按钮被点击时的背景颜色 */
  transform: scale(0.98); /* 按钮点击时缩小 */
}



.text-size{
  font-size: 80px;  /* 设置字体大小为36px */
  font-weight: bold; /* 设置为加粗 */
}
.text2-size{
  font-size: 40px;  /* 设置字体大小为36px */
}

/* 图层部分样式 */
.image-layer {
  position: absolute; /* 使图层位于文字和按钮的下方 */
  z-index: -1; /* 确保图片的层级低于文字和按钮 */
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center; /* 图片在水平方向上居中排列 */
  align-items: center; /* 垂直居中图片 */
}

/* 图层图片样式 */
.layer-image1 {
  position: absolute; /* 使用绝对定位来精确控制图片位置 */
  width: 270px; /* 控制每张图片的大小 */
  height: 360px;
  object-fit: cover; /* 确保图片按比例裁剪且不失真 */
  margin-top: 100px; /* 控制图片的位置，让其交错 */
  margin-right: -1000px; /* 使图片部分重叠 */
  z-index: 5; /* 设置一个较低的 z-index */
}

.layer-image2 {
  position: absolute; /* 使用绝对定位来精确控制图片位置 */
  width: 150px; /* 控制每张图片的大小 */
  height: auto;
  object-fit: cover; /* 确保图片按比例裁剪且不失真 */
  margin-top: -50px; /* 控制图片的位置，让其交错 */
  margin-right: -800px; /* 使图片部分重叠 */
  z-index: 2; /* 设置较高的 z-index，确保它在图片1的上面 */
}

.layer-image3 {
  position: absolute; /* 使用绝对定位来精确控制图片位置 */
  width: 240px; /* 控制每张图片的大小 */
  height: 320px;
  object-fit: cover; /* 确保图片按比例裁剪且不失真 */
  margin-top: -150px; /* 控制图片的位置，让其交错 */
  margin-right: -750px; /* 使图片部分重叠 */
  z-index: 3; /* 设置较高的 z-index，确保它在图片2的上面 */
}

.layer-image4 {
  position: absolute; /* 使用绝对定位来精确控制图片位置 */
  width: 240px; /* 控制每张图片的大小 */
  height: 320px;
  object-fit: cover; /* 确保图片按比例裁剪且不失真 */
  margin-right: -1200px; /* 使图片部分重叠 */
  margin-top: -350px; /* 控制图片的位置，让其交错 */
  z-index: 4; /* 设置最高的 z-index，确保它在其他图片之上 */
}
/* 渐变背景文字部分 */
.gradient-section {
  width: 100%;
  height: 50vh; /* 高度设置为视口高度的一半，可以根据需求调整 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #003e2f, black),  /* 绿色到黑色的渐变（从右到左） */
  linear-gradient(to right, #003e2f, black); /* 绿色到黑色的渐变（从左到右） */
}


.gradient-text {
  text-align: center;
  color: white;
}

.gradient-text h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.gradient-text p {
  font-size: 24px;
}

/* 向下的箭头 */
.arrow-down {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid white;
  margin-top: 20px;
  animation: bounce 1s infinite; /* 添加动画效果 */
}

/* 动画效果：向下跳动的箭头 */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px); /* 向下跳 */
  }
  100% {
    transform: translateY(0);
  }
}
.section-title {
  text-align: center;
  margin: 30px 0;
}

.section-title h1 {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

.section-title p {
  font-size: 18px;
  color: #ccc;
}

/* 图片播放栏容器 */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 图片区域 */
.carousel {
  display: flex;
  overflow: hidden;
  max-width: 80%;
  position: relative;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.image-container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: 0.6;
}

.image-container img.active {
  opacity: 1;
}

/* 按钮样式 */
.image-btn {
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.image-btn.active {
  background-color: rgba(255, 165, 0, 0.5);
}

.image-btn:hover {
  background-color: rgba(255, 165, 0, 0.3);
}

/* 箭头按钮样式 */
.arrow-btn {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 10px;
}

.arrow-btn.left {
  left: 10px;
}

.arrow-btn.right {
  right: 10px;
}

.image-slider-container {
  text-align: center;
}

.button-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.button-bar button {
  padding: 12px 25px;
  margin: 0 15px;
  font-size: 16px;
  border: 2px solid transparent;
  background-color: black; /* 默认背景色 */
  color: #aaa; /* 默认灰色文本 */
  cursor: pointer;
  border-radius: 5px; /* 圆角 */
  transition: all 0.3s ease;
}

.button-bar button.selected {
  color: white; /* 选中文本颜色 */
}

.button-bar button:hover {
  background-color: #333; /* hover 状态下按钮背景色 */
  color: white;
}

.image-slider {
  width: 80%;
  height: 100%;
  overflow: hidden;
  margin-top: 100px;
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.colored-text {
  font-size: 80px;
  font-weight: bold;
}
</style>