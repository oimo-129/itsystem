//轮播图模块功能
const slides = document.querySelectorAll('.slides li');  
    let currentIndex = 0;  

function showSlide(index) {  
    slides.forEach((slide, i) => {  
        slide.style.display = i === index ? 'block' : 'none';  
    });  
}  

function nextSlide() {  
    currentIndex = (currentIndex + 1) % slides.length;  
    showSlide(currentIndex);  
}  
function preSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}
//鼠标放在轮播图上，停止轮播
function stopSlide() {
    
    interVal=setInterval(nextSlide, 3000);
    clearInterval(interVal);

}

// 初始化显示第一张图片  
showSlide(currentIndex);  
//开始轮播图
function startSlide()
{
   interVal = setInterval(nextSlide, 3000);
}
//停止轮播图
function stopSlide()
{
    clearInterval(interVal)
}
document.querySelector('.flexslider').addEventListener('mouseenter',stopSlide);
document.querySelector('.flexslider').addEventListener('mouseleave',startSlide);
 
startSlide();


//????
$(document).ready(function() {
    $(".flexslider").flexslider({
        animation: "fade", //有滑动的效果
        controlNav: true, //是否显示小点点，false就不显示底部的导航了，也可以自己使用js隐藏。
        directionNav: true, //是否显示左右箭头,还是可以使用js来隐藏
        autoPlay: true,
    });

});


//原版左侧新闻分页效果
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有分页链接
    const pageLinks = document.querySelectorAll('.more a');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标页面URL
            const url = this.getAttribute('href');
            
            // 使用fetch获取新页面内容
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    // 更新列表内容
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // 更新文件列表内容
                    const newContent = doc.querySelector('.listed-companies-content');
                    document.querySelector('.listed-companies-content').innerHTML = newContent.innerHTML;
                    
                    // 更新分页链接
                    const newMoreLink = doc.querySelector('.more a');
                    document.querySelector('.more a').setAttribute('href', newMoreLink.getAttribute('href'));
                    
                    // 更新URL，但不刷新页面
                    history.pushState(null, '', url);
                });
        });
    });
});