var result1 = `/* 
 * 面试官你好，我是梁广铭
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍
 * 那么我们开始了
 * 首先准备一些基础样式
 */
/* 先给所有变化加个过渡动画 */
*{
  transition: all 1s;
}
/* 添加一个背景色 */
html{
  background: #eee;
}
/* 给代码来个边框加个边距 */
#code{
    margin:16px;
    border: 1px solid #aaa;
    padding: 16px;
}
/* 我需要代码高亮 */
.token.selector{ 
    color: #690; 
}
.token.property{ 
    color: #905; 
}
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 准备好了 现在我需要一个写字板 */
#code-wrapper{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
`

var result2 = `
/* 先给写字板一片区域 */
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: #DDD;
}
/* 给写字板个背景色 */
#paper > .content{
    background: white;
    height: 100%;
    width: 100%;
}
/* 接下来我要开始写我的简历了 */
`

var result3 = `
/* 代码占地范围太大 */
#code {
    height: 79vh;
    width: 100%;
    background: white;
}
/* 来加点3D特效吧 */
#code-wrapper {
    perspective: 1000px;
    top: 10%;
    left: 10%;
    width: 40%;
}

#code {
    transform: rotateY(30deg);
}
/* 来给我的纸加点边界 */
#paper{
    height: 95%;
    margin: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2)
}
/*这是Markdown语法，
* 不太好看
* 来变得正常点 */`

var result4 = `


/* 前缀太丑，先删掉 */
#paper>.content li{
    list-style: none;
}
/* 字太小看不清？大一点 */
#paper>.content p,
#paper>.content li{
    font-size: 22px;
}

/*这就是我做的会动的简历啦
* 你喜欢吗？*/`

var md1 = `
# 自我介绍
我叫 梁广铭
1997 年 9 月出生
华南理工大学 毕业
自学前端四个月
希望应聘前端开发岗位

# 技能介绍

熟悉JavaScript HTML CSS

# 项目介绍

 1. 无缝轮播
 2. 个人简历
 3. 画板

# 联系方式

- QQ 877205619
- Email 877205619@qq.com
- 手机 15813372678`

var md2 = `
# 自我介绍
我叫 梁广铭
1997 年 9 月出生
华南理工大学 毕业
自学前端四个月
希望应聘前端开发岗位

# 技能介绍

熟悉JavaScript HTML CSS

# 项目介绍

 1. 无缝轮播
 2. [个人简历][1]
 3. 画板

# 联系方式

- QQ 877205619
- Email 877205619@qq.com
- 手机 15813372678

[1]: https://mrlgm.github.io/resume/index.html`

//writeCode是异步函数，createPaper是同步函数
writeCode('', result1, () => {
    console.log('你执行完了')
    createPaper(() => {
        writeCode(result1, result2, () => {
            console.log('paper有了')
            writeMarkdown(md1, () => {
                console.log('继续了')
                writeCode(result1 + result2, result3, () => {
                    console.log('结束了')
                    writeMarkHTML(md2, () => {
                        console.log('hhhh')
                        writeCode(result1 + result2 + result3, result4, () => {
                            console.log('hhh')
                        })
                    })
                })
            })
        })

    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

//把code写到#code和style标签中
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    domCode.innerHTML = prefix || ''
    let id = setInterval(() => { //异步
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => { //异步
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function writeMarkHTML(markdown, fn) {
    setTimeout(()=>{
        let domPaper = document.querySelector('#paper > .content')
        domPaper.innerHTML = marked(markdown)
        domPaper.scrollTop = domPaper.scrollHeight
        fn.call()
    },50)
}