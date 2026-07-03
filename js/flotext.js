// 浮空文字数组
const texts = [
    { text: "头像右下角图标可切换背景哦！", elementId: "floatingText1", position: { top: "9%", right: "23%" } },
    { text: "点击切换模式查看更多哦", elementId: "floatingText2", position: { top: "30%", right: "14%" } },
    { text: "好久没有见到你了！", elementId: "floatingText3", position: { top: "45%", right: "8%" } },
    { text: "主页更新了哦😯", elementId: "floatingText4", position: { top: "60%", right: "50%" } },
    { text: "想我了没！", elementId: "floatingText5", position: { top: "31%", right: "48%" } },
    { text: "知行合一", elementId: "floatingText6", position: { top: "68%", right: "20%" } },
    { text: "双击头像可进入模拟终端", elementId: "floatingText6", position: { top: "58%", right: "40%" } },
    { text: "努力才会有收获哦！", elementId: "floatingText7", position: { top: "16%", right: "42%" } },
    { text: "常来看看，私聊我哦！", elementId: "floatingText8", position: { top: "19%", right: "12%" } },
    { text: "发现新宝藏啦！", elementId: "floatingText9", position: { top: "71%", right: "40%" } },
    { text: "向下滑动更精彩哦！", elementId: "floatingText9", position: { top: "68%", right: "35%" } },
    // 添加更多文本和位置
  ];

// 当前显示的文本索引
let currentTextIndex = -1;

// 更新文本的函数
function updateText() {
    if (currentTextIndex >= 0) {
        const currentElement = document.getElementById(texts[currentTextIndex].elementId);
        hideText(currentElement);
    }

    // 随机选择一个文本对象
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * texts.length);
    } while (randomIndex === currentTextIndex);

    currentTextIndex = randomIndex;
    const { text, elementId, position, stay, interval } = texts[randomIndex];
    const floatingTextElement = document.getElementById(elementId);
    floatingTextElement.textContent = text;
    Object.assign(floatingTextElement.style, position); // 设置位置
    floatingTextElement.style.opacity = 1;
    floatingTextElement.style.animation = 'float 5s ease-in-out infinite';

    // 添加双击事件监听器
    floatingTextElement.addEventListener('dblclick', function() {
        hideText(this);
    });
}

function hideText(element) {
    element.style.opacity = 0;
    element.style.pointerEvents = 'none'; 
}

// 主定时器，用于控制文本的显示和隐藏
function startTextAnimation() {
    updateText();
    checkMobile();
    mainTimer = setInterval(() => {
        const { elementId, stay, interval } = texts[currentTextIndex];
        const currentElement = document.getElementById(elementId);
        hideText(currentElement);

        // 等待文本消失后再显示下一个文本
        setTimeout(updateText, interval);
    }, stay + interval);
}

// 初始化
setTimeout(startTextAnimation, 4000); 

// 窗口大小改变时检查移动设备
window.addEventListener('resize', checkMobile);
