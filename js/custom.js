/* ==================== 温馨暖色动效特效 ==================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 鼠标跟随光效
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(232, 160, 101, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', function(e) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursorGlow.style.opacity = '0';
    });
    
    // 2. 卡片入场动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.index-card, .post-card, .category-item, .link-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });
    
    // 3. 标题打字机效果增强
    const subtitle = document.querySelector('.index-banner-text');
    if (subtitle) {
        subtitle.style.opacity = '1';
    }
    
    // 4. 滚动显示动画
    const scrollElements = document.querySelectorAll('h1, h2, h3, p, .meta');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // 为文章内容元素添加滚动动画样式
    document.querySelectorAll('.post-content h2, .post-content h3').forEach(heading => {
        heading.classList.add('scroll-reveal');
    });
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 5. 链接涟漪效果
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            // 添加点击波纹效果
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        });
    });
    
    // 6. 图片懒加载动画
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                img.style.opacity = '0';
                img.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // 7. 平滑滚动优化
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 8. 阅读进度指示器
    const readingProgress = document.createElement('div');
    readingProgress.className = 'reading-progress';
    readingProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c17b4a, #e8a065);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(readingProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        readingProgress.style.width = progress + '%';
    });
    
    // 9. 返回顶部按钮动画
    const scrollTopBtn = document.querySelector('.scroll-top-btn, .back-to-top, [class*="scroll-top"]');
    if (scrollTopBtn) {
        scrollTopBtn.style.transition = 'all 0.3s ease';
    }
    
    // 10. 标签云悬浮效果增强
    document.querySelectorAll('.tag-cloud a, .tags a').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
});

// 11. 页面切换淡入效果
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
