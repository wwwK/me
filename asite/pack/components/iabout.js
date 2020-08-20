function initIabout() {
    let animateContent = document.getElementsByClassName('animate-content')[0]
    document.getElementsByTagName('body')[0].style.backgroundColor = '#222';
    animateContent.style.opacity = 0;
    let timer
    let hearder = document.getElementById("infoT")
    if(hearder)return
    timer=setTimeout(() => {
            hearder = document.createElement('header')
            hearder.setAttribute('id', 'infoT')
            // h1
            let h1Node = document.createElement('h1')
            h1Node.setAttribute('class', 'title slide-bar')
            h1Node.innerHTML = '我是掘金安东尼'
            hearder.appendChild(h1Node)
            // p
            let p1Node = document.createElement('p')
            p1Node.setAttribute('class', 'subtitle slide-bar')
            p1Node.innerHTML = '一位持续输出的个人站长'
            hearder.appendChild(p1Node)
            // append
            let body = document.getElementsByTagName('body')[0]
            body.appendChild(hearder)
    },2000)
}

export {initIabout} 