var result1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
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
/*不玩了 我需要一个写字板*/
#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: #DDD;
    display: fiex;
    justify-content: center;
    align-items: center;
}
#paper > .content{
    background: white;
    height: 100%;
    width: 100%;
}`

var result2 = `
#paper{
  width: 100px;
  height: 100px;
  background: red;
} `

var md = `
# 自我介绍
我叫 xxx
1997 年 9 月出生
华南理工大学 毕业
自学前端四个月
希望应聘前端开发岗位

#技能介绍

熟悉JavaScript HTML CSS

#项目介绍

1. 无缝轮播
2. 个人简历
3. 画板

#联系方式

QQ 877205619
Email 877205619@qq.com
手机 15813372678`

//writeCode是异步函数，createPaper是同步函数
writeCode('', result1, () => {
    console.log('你执行完了')
    createPaper(() => {
        console.log('paper有了')
        writeMarkdown(md,()=>{
            console.log('结束了')
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