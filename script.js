// Fournitour Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Slider
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderArrow = document.querySelector('.slider-arrow');
    let currentSlide = 0;

    function showSlide(index) {
        showcaseItems.forEach((item, i) => {
            item.classList.remove('active');
            if (sliderDots[i]) {
                sliderDots[i].classList.remove('active');
            }
        });
        
        showcaseItems[index].classList.add('active');
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
    }

    if (sliderArrow) {
        sliderArrow.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % showcaseItems.length;
            showSlide(currentSlide);
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide
    setInterval(() => {
        if (showcaseItems.length > 0) {
            currentSlide = (currentSlide + 1) % showcaseItems.length;
            showSlide(currentSlide);
        }
    }, 5000);

    // Room Tabs
    const roomTabs = document.querySelectorAll('.room-tab');
    
    roomTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            roomTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Category Items Hover Effect
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth Scroll for Navigation Links
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

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', '').replace(/\./g, ''));
            let current = 0;
            const increment = target / 50;
            const hasPlus = stat.textContent.includes('+');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (hasPlus ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }
            }, 30);
        });
    }

    const statsSection = document.querySelector('.why-us');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Play Button Click Handler
    const playBtn = document.querySelector('.play-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // You can add video modal functionality here
            alert('Video sẽ được phát tại đây! Thêm URL video vào code để hoàn thiện tính năng này.');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricingToggle');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const pricingAmounts = document.querySelectorAll('.pricing-price .amount');
    
    const monthlyPrices = ['1.500.000', '3.500.000', '7.000.000'];
    const yearlyPrices = ['1.200.000', '2.800.000', '5.600.000'];
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            toggleLabels.forEach(label => label.classList.toggle('active'));
            
            pricingAmounts.forEach((amount, index) => {
                if (this.checked) {
                    amount.textContent = yearlyPrices[index];
                } else {
                    amount.textContent = monthlyPrices[index];
                }
            });
        });
    }

    // Featured Products - Quick View & Wishlist
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const wishlistBtns = document.querySelectorAll('.add-wishlist');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.featured-card');
            const productName = card.querySelector('h4').textContent;
            alert(`Xem nhanh: ${productName}`);
        });
    });
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (this.classList.contains('active')) {
                this.style.background = '#e74c3c';
                this.style.color = 'white';
            } else {
                this.style.background = 'white';
                this.style.color = 'inherit';
            }
        });
    });

    // Gallery Lightbox Effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4')?.textContent || 'Gallery Image';
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${img.src}" alt="${title}">
                    <p>${title}</p>
                </div>
            `;
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Cảm ơn bạn đã đăng ký! Email: ${email}`);
            this.reset();
        });
    }

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            this.reset();
        });
    }

    // Testimonial Slider (for mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialSlider) {
        testimonialSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                console.log('Swipe left');
            } else {
                console.log('Swipe right');
            }
        }
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Room Calculator Functionality
    const calcItems = document.querySelectorAll('.calc-item');
    const prices = [350000, 150000, 100000]; // Base prices
    
    calcItems.forEach((item, index) => {
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const qtySpan = item.querySelector('.qty');
        const priceSpan = item.querySelector('.item-price');
        
        if (minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtySpan.textContent);
                if (qty > 0) {
                    qty--;
                    qtySpan.textContent = qty;
                    priceSpan.textContent = (prices[index] * qty).toLocaleString('vi-VN') + 'đ';
                    updateTotal();
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtySpan.textContent);
                qty++;
                qtySpan.textContent = qty;
                priceSpan.textContent = (prices[index] * qty).toLocaleString('vi-VN') + 'đ';
                updateTotal();
            });
        }
    });
    
    function updateTotal() {
        let total = 0;
        calcItems.forEach((item, index) => {
            const qty = parseInt(item.querySelector('.qty').textContent);
            total += prices[index] * qty;
        });
        const totalElement = document.querySelector('.total-price');
        if (totalElement) {
            totalElement.innerHTML = total.toLocaleString('vi-VN') + 'đ<small>/tháng</small>';
        }
    }

    // Horizontal Scroll with Mouse Drag
    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
    
    if (horizontalWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        horizontalWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            horizontalWrapper.style.cursor = 'grabbing';
            startX = e.pageX - horizontalWrapper.offsetLeft;
            scrollLeft = horizontalWrapper.scrollLeft;
        });
        
        horizontalWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            horizontalWrapper.style.cursor = 'grab';
        });
        
        horizontalWrapper.addEventListener('mouseup', () => {
            isDown = false;
            horizontalWrapper.style.cursor = 'grab';
        });
        
        horizontalWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - horizontalWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            horizontalWrapper.scrollLeft = scrollLeft - walk;
        });
    }

    // Hotspot Interactions
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const item = this.dataset.item;
            // You can add more functionality here
            console.log('Clicked on:', item);
        });
    });

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // Floating Cards Animation
    const floatingCards = document.querySelectorAll('.f-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Parallax Effect for Floating Showcase
    window.addEventListener('scroll', function() {
        const floatingShowcase = document.querySelector('.floating-showcase');
        if (floatingShowcase) {
            const rect = floatingShowcase.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrolled = window.scrollY;
                const shapes = floatingShowcase.querySelectorAll('.floating-bg-shape');
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.05;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        }
    });

    // App Notification Form
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        const notifyBtn = notifyForm.querySelector('.btn');
        const notifyInput = notifyForm.querySelector('input');
        
        if (notifyBtn && notifyInput) {
            notifyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (notifyInput.value) {
                    alert(`Cảm ơn! Chúng tôi sẽ thông báo đến ${notifyInput.value} khi app ra mắt.`);
                    notifyInput.value = '';
                }
            });
        }
    }

    // ================================
    // COWBOY RUNNER GAME
    // ================================

    const gameCanvas = document.getElementById('gameCanvas');
    if (gameCanvas) {
        const ctx = gameCanvas.getContext('2d');
        const gameContainer = document.getElementById('gameContainer');
        const gameTitle = document.getElementById('gameTitle');
        const gameOver = document.getElementById('gameOver');
        const restartBtn = document.getElementById('restartBtn');
        const scoreDisplay = document.getElementById('score');
        const highScoreDisplay = document.getElementById('highScore');
        const finalScoreDisplay = document.getElementById('finalScore');
        const highScoreDisplayEnd = document.getElementById('highScoreDisplay');

        // Game settings
        let gameRunning = false;
        let gameStarted = false;
        let score = 0;
        let highScore = localStorage.getItem('cowboyHighScore') || 0;
        let gameSpeed = 2;  // Much slower speed
        let gravity = 0.4;  // Lighter gravity
        let animationId;
        let hasReached100 = false;

        // Update high score display
        highScoreDisplay.textContent = highScore;

        // Cowboy on Horse (Player) - Pixel art style
        const cowboy = {
            x: 60,
            y: 165,
            width: 40,
            height: 50,
            velocityY: 0,
            jumping: false,
            runFrame: 0,
            frameCount: 0
        };

        // Obstacles (Cacti)
        let obstacles = [];
        let obstacleTimer = 0;
        let obstacleInterval = 250;  // Very far apart

        // Ground
        let groundX = 0;

        // Clouds
        let clouds = [
            { x: 100, y: 40, width: 60 },
            { x: 350, y: 25, width: 80 },
            { x: 600, y: 50, width: 50 }
        ];

        // Fireworks system
        let fireworks = [];
        let particles = [];
        let showGiftBox = false;
        let giftBoxAnimation = 0;
        let voucherCode = '';

        function generateVoucherCode() {
            const date = new Date();
            const code = 'GIAMGIA' + date.getDate() + (date.getMonth() + 1) + date.getFullYear().toString().slice(-2) + '#';
            return code;
        }

        function createFirework(x, y) {
            const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ffa500', '#ff69b4', '#7b68ee', '#5a7a6b', '#98b4a6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < 60; i++) {
                const angle = (Math.PI * 2 / 60) * i;
                const velocity = 4 + Math.random() * 4;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    color: color,
                    life: 120,
                    size: 3 + Math.random() * 3
                });
            }
        }

        function launchFireworks() {
            // Launch many fireworks for celebration
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const x = 50 + Math.random() * 700;
                    const y = 30 + Math.random() * 120;
                    createFirework(x, y);
                }, i * 250);
            }
            
            // Show gift box after fireworks
            setTimeout(() => {
                showGiftBox = true;
                giftBoxAnimation = 0;
                voucherCode = generateVoucherCode();
            }, 3000);
        }

        // New function for 10 points celebration - stops game and shows glowing voucher
        function launchFireworksAndVoucher() {
            voucherCode = generateVoucherCode();
            showGiftBox = true;
            giftBoxAnimation = 0;
            
            // Continuous fireworks while voucher is shown
            let fireworkCount = 0;
            const fireworkInterval = setInterval(() => {
                const x = 50 + Math.random() * 700;
                const y = 30 + Math.random() * 100;
                createFirework(x, y);
                fireworkCount++;
                if (fireworkCount > 50 || !showGiftBox) {
                    clearInterval(fireworkInterval);
                }
            }, 200);
            
            // Keep animating even though game stopped
            function celebrationLoop() {
                updateParticles();
                draw();
                if (showGiftBox || particles.length > 0) {
                    requestAnimationFrame(celebrationLoop);
                }
            }
            celebrationLoop();
        }

        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.04;
                p.life -= 1.2;
                
                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }
        }

        function drawParticles() {
            particles.forEach(p => {
                ctx.save();
                ctx.globalAlpha = p.life / 120;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        function drawGiftBox() {
            if (!showGiftBox) return;
            
            giftBoxAnimation++;
            const centerX = 400;
            const centerY = 140;
            
            ctx.save();
            
            // Dark overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(0, 0, 800, 300);
            
            // Soft glowing background - pulsing gently
            const glowIntensity = 0.3 + Math.sin(giftBoxAnimation * 0.03) * 0.1;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
            gradient.addColorStop(0, `rgba(255, 200, 50, ${glowIntensity})`);
            gradient.addColorStop(0.5, `rgba(255, 150, 0, ${glowIntensity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 300);
            
            // Draw pixel art voucher (static, no movement)
            drawPixelVoucher(centerX, centerY);
            
            ctx.restore();
        }

        function drawPixelVoucher(x, y) {
            ctx.save();
            ctx.translate(x, y);
            
            // Pixel size for retro look
            const p = 3;
            
            // ===== OUTER GLOW (soft, not spinning) =====
            const glowAlpha = 0.4 + Math.sin(giftBoxAnimation * 0.04) * 0.2;
            ctx.shadowBlur = 25;
            ctx.shadowColor = `rgba(255, 200, 50, ${glowAlpha})`;
            
            // ===== MAIN VOUCHER BODY (golden/orange pixel style) =====
            const voucherWidth = 220;
            const voucherHeight = 70;
            const startX = -voucherWidth / 2;
            const startY = -voucherHeight / 2;
            
            // Base color - golden orange like the image
            const mainColor = '#E8A832';
            const darkColor = '#C48820';
            const lightColor = '#F4C050';
            const darkestColor = '#8B5A10';
            
            // Main body
            ctx.fillStyle = mainColor;
            ctx.fillRect(startX, startY, voucherWidth, voucherHeight);
            
            // Top highlight
            ctx.fillStyle = lightColor;
            ctx.fillRect(startX, startY, voucherWidth, p * 2);
            
            // Bottom shadow
            ctx.fillStyle = darkColor;
            ctx.fillRect(startX, startY + voucherHeight - p * 2, voucherWidth, p * 2);
            
            // Left notch (ticket style)
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.beginPath();
            ctx.arc(startX, startY + voucherHeight/2, 12, -Math.PI/2, Math.PI/2, false);
            ctx.fill();
            
            // Right notch
            ctx.beginPath();
            ctx.arc(startX + voucherWidth, startY + voucherHeight/2, 12, Math.PI/2, -Math.PI/2, false);
            ctx.fill();
            
            // Pixel border effect (top)
            ctx.fillStyle = darkestColor;
            for (let i = 0; i < voucherWidth / p; i++) {
                if (i % 3 === 0) {
                    ctx.fillRect(startX + i * p, startY - p, p, p);
                }
            }
            // Pixel border effect (bottom)
            for (let i = 0; i < voucherWidth / p; i++) {
                if (i % 3 === 0) {
                    ctx.fillRect(startX + i * p, startY + voucherHeight, p, p);
                }
            }
            
            // ===== BONUS SECTION (left side, vertical text) =====
            ctx.fillStyle = darkColor;
            ctx.fillRect(startX + 8, startY + 8, 35, voucherHeight - 16);
            
            // BONUS text (vertical)
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 11px "Press Start 2P", Courier New, monospace';
            ctx.textAlign = 'center';
            ctx.save();
            ctx.translate(startX + 26, startY + voucherHeight/2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('BONUS', 0, 0);
            ctx.restore();
            
            // ===== DISCOUNT TEXT (main area) =====
            ctx.fillStyle = darkestColor;
            ctx.font = 'bold 22px "Press Start 2P", Courier New, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('DISCOUNT', startX + voucherWidth/2 + 15, startY + 28);
            
            // Decorative dots around DISCOUNT
            ctx.fillStyle = darkestColor;
            ctx.fillRect(startX + 55, startY + 35, p, p);
            ctx.fillRect(startX + voucherWidth - 45, startY + 35, p, p);
            
            // ===== PROMO CODE TEXT =====
            ctx.fillStyle = darkColor;
            ctx.font = 'bold 10px "Press Start 2P", Courier New, monospace';
            ctx.fillText('• PROMO CODE •', startX + voucherWidth/2 + 15, startY + 45);
            
            // ===== VOUCHER CODE (pixel style) =====
            ctx.fillStyle = darkestColor;
            ctx.font = 'bold 14px "Press Start 2P", Courier New, monospace';
            ctx.shadowBlur = 0;
            ctx.fillText(voucherCode, startX + voucherWidth/2 + 15, startY + 62);
            
            // ===== SPARKLE EFFECTS (static positions, gentle pulse) =====
            const sparkleAlpha = 0.5 + Math.sin(giftBoxAnimation * 0.05) * 0.3;
            ctx.fillStyle = `rgba(255, 255, 200, ${sparkleAlpha})`;
            
            // Draw pixel sparkles at fixed positions
            drawPixelSparkle(-130, -50, p);
            drawPixelSparkle(130, -45, p);
            drawPixelSparkle(-125, 50, p);
            drawPixelSparkle(125, 55, p);
            drawPixelSparkle(0, -55, p);
            drawPixelSparkle(0, 60, p);
            
            // ===== CONGRATULATIONS TEXT =====
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 16px Montserrat, Arial';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFD700';
            ctx.fillText('🎉 CHÚC MỪNG BẠN! 🎉', 0, -55);
            ctx.shadowBlur = 0;
            
            // ===== INSTRUCTION TEXT =====
            const blinkAlpha = 0.6 + Math.sin(giftBoxAnimation * 0.08) * 0.4;
            ctx.fillStyle = `rgba(255, 255, 255, ${blinkAlpha})`;
            ctx.font = '13px Arial';
            ctx.fillText('Nhấn để tiếp tục chơi', 0, 75);
            
            ctx.restore();
        }
        
        function drawPixelSparkle(x, y, p) {
            // 4-point star sparkle in pixel style
            ctx.fillRect(x - p/2, y - p*2, p, p*4);
            ctx.fillRect(x - p*2, y - p/2, p*4, p);
            // Corner pixels
            ctx.fillRect(x - p, y - p, p, p);
            ctx.fillRect(x, y - p, p, p);
            ctx.fillRect(x - p, y, p, p);
            ctx.fillRect(x, y, p, p);
        }

        function drawGiftBoxGraphic(x, y, scale, ribbonUntied, lidOpen, ribbonProgress = 0, lidProgress = 0) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);
            
            // Box body
            ctx.fillStyle = '#5a7a6b';
            ctx.fillRect(-50, 0, 100, 70);
            
            // Box body highlight
            ctx.fillStyle = '#6b8b7b';
            ctx.fillRect(-50, 0, 100, 10);
            
            // Box lid
            ctx.save();
            if (lidOpen) {
                ctx.translate(-55, 0);
                ctx.rotate(-lidProgress * Math.PI * 0.6);
                ctx.translate(55, 0);
            }
            ctx.fillStyle = '#4a6a5b';
            ctx.fillRect(-55, -20, 110, 25);
            ctx.fillStyle = '#5a7a6b';
            ctx.fillRect(-55, -20, 110, 8);
            
            // Ribbon on lid (if not untied)
            if (!ribbonUntied) {
                ctx.fillStyle = '#c9a86c';
                ctx.fillRect(-8, -20, 16, 25);
            }
            ctx.restore();
            
            // Vertical ribbon on body
            if (!ribbonUntied || ribbonProgress < 1) {
                ctx.fillStyle = '#c9a86c';
                const ribbonWidth = 16 * (1 - ribbonProgress);
                ctx.fillRect(-ribbonWidth/2, 0, ribbonWidth, 70);
            }
            
            // Horizontal ribbon
            if (!ribbonUntied || ribbonProgress < 1) {
                ctx.fillStyle = '#c9a86c';
                const ribbonHeight = 16 * (1 - ribbonProgress);
                ctx.fillRect(-50, 30 - ribbonHeight/2, 100, ribbonHeight);
            }
            
            // Bow (if not untied)
            if (!ribbonUntied) {
                ctx.fillStyle = '#c9a86c';
                // Left loop
                ctx.beginPath();
                ctx.ellipse(-20, -30, 18, 12, -0.3, 0, Math.PI * 2);
                ctx.fill();
                // Right loop
                ctx.beginPath();
                ctx.ellipse(20, -30, 18, 12, 0.3, 0, Math.PI * 2);
                ctx.fill();
                // Center
                ctx.beginPath();
                ctx.arc(0, -25, 8, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }

        function drawVoucher(x, y) {
            ctx.save();
            ctx.translate(x, y);
            
            // Voucher card
            const gradient = ctx.createLinearGradient(-80, -30, 80, 30);
            gradient.addColorStop(0, '#f4d03f');
            gradient.addColorStop(1, '#f39c12');
            ctx.fillStyle = gradient;
            
            // Voucher shape with notches
            ctx.beginPath();
            ctx.moveTo(-80, -30);
            ctx.lineTo(80, -30);
            ctx.lineTo(80, -10);
            ctx.arc(80, -10, 8, -Math.PI/2, Math.PI/2, true);
            ctx.lineTo(80, 30);
            ctx.lineTo(-80, 30);
            ctx.lineTo(-80, 10);
            ctx.arc(-80, 10, 8, Math.PI/2, -Math.PI/2, true);
            ctx.closePath();
            ctx.fill();
            
            // Border
            ctx.strokeStyle = '#c9a86c';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Dashed line
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-60, -30);
            ctx.lineTo(-60, 30);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Star decoration
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('★', -70, 5);
            
            // Voucher text
            ctx.fillStyle = '#8b4513';
            ctx.font = 'bold 11px Montserrat, Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GIẢM 20%', 10, -12);
            
            // Voucher code
            ctx.fillStyle = '#c0392b';
            ctx.font = 'bold 14px Courier New';
            ctx.fillText(voucherCode, 10, 8);
            
            // Small text
            ctx.fillStyle = '#666';
            ctx.font = '9px Arial';
            ctx.fillText('Fournitour.vn', 10, 22);
            
            // Click hint
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.fillText('Click để tiếp tục chơi!', 0, 55);
            
            ctx.restore();
        }

        // Draw pixel-style character (bearded man with red beard, gray shirt, green shoes)
        function drawCowboy() {
            const x = cowboy.x;
            const y = cowboy.y;
            
            // Animation frame for running
            const frame = Math.floor(cowboy.runFrame / 8) % 2;
            
            ctx.save();
            
            // Color palette - Pixel art bearded character from image
            const skinColor = '#E8C8A8';      // Light skin
            const skinShadow = '#D4A878';     // Skin shadow
            const beardColor = '#C45C26';     // Orange/red beard
            const beardDark = '#A04820';      // Dark beard
            const hairColor = '#C45C26';      // Same as beard
            const shirtColor = '#808080';     // Gray shirt
            const shirtDark = '#606060';      // Dark gray
            const pantsColor = '#505050';     // Dark gray pants
            const shoesColor = '#4A8C4A';     // Green shoes
            const shoesDark = '#3A6C3A';      // Dark green
            const mouthColor = '#8B3A3A';     // Dark red mouth
            
            // Pixel size
            const p = 2;
            
            // ===== HAIR (orange/red on top) =====
            ctx.fillStyle = hairColor;
            ctx.fillRect(x + 4*p, y - 18*p, 12*p, 4*p);
            ctx.fillRect(x + 3*p, y - 16*p, 2*p, 3*p);
            ctx.fillRect(x + 15*p, y - 16*p, 2*p, 3*p);
            
            // ===== HEAD (skin) =====
            ctx.fillStyle = skinColor;
            // Forehead and face
            ctx.fillRect(x + 5*p, y - 15*p, 10*p, 6*p);
            
            // Face shadow
            ctx.fillStyle = skinShadow;
            ctx.fillRect(x + 5*p, y - 15*p, 2*p, 6*p);
            
            // ===== EYES =====
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x + 7*p, y - 13*p, 3*p, 2*p);
            ctx.fillRect(x + 11*p, y - 13*p, 3*p, 2*p);
            // Pupils
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 8*p, y - 13*p, 2*p, 2*p);
            ctx.fillRect(x + 12*p, y - 13*p, 2*p, 2*p);
            
            // ===== BEARD (big orange/red beard) =====
            ctx.fillStyle = beardColor;
            // Main beard
            ctx.fillRect(x + 4*p, y - 9*p, 12*p, 8*p);
            // Beard sides (bushy)
            ctx.fillRect(x + 2*p, y - 8*p, 3*p, 6*p);
            ctx.fillRect(x + 15*p, y - 8*p, 3*p, 6*p);
            // Beard bottom
            ctx.fillRect(x + 6*p, y - 1*p, 8*p, 2*p);
            
            // Beard shadow
            ctx.fillStyle = beardDark;
            ctx.fillRect(x + 2*p, y - 6*p, 2*p, 4*p);
            ctx.fillRect(x + 16*p, y - 6*p, 2*p, 4*p);
            ctx.fillRect(x + 7*p, y - 1*p, 6*p, 1*p);
            
            // ===== MOUTH (visible through beard) =====
            ctx.fillStyle = mouthColor;
            ctx.fillRect(x + 8*p, y - 6*p, 4*p, 2*p);
            
            // ===== BODY (gray shirt/apron) =====
            ctx.fillStyle = shirtColor;
            ctx.fillRect(x + 4*p, y + 1*p, 12*p, 12*p);
            
            // Shirt shading
            ctx.fillStyle = shirtDark;
            ctx.fillRect(x + 4*p, y + 1*p, 2*p, 12*p);
            ctx.fillRect(x + 14*p, y + 1*p, 2*p, 12*p);
            
            // Shirt collar/neckline
            ctx.fillStyle = '#707070';
            ctx.fillRect(x + 7*p, y + 1*p, 6*p, 2*p);
            
            // ===== ARMS (skin with beard color sleeves) =====
            // Left arm
            ctx.fillStyle = beardColor;
            ctx.fillRect(x + 1*p, y + 1*p, 3*p, 8*p);
            ctx.fillStyle = skinColor;
            ctx.fillRect(x + 1*p, y + 9*p, 3*p, 3*p);
            
            // Right arm
            ctx.fillStyle = beardColor;
            ctx.fillRect(x + 16*p, y + 1*p, 3*p, 8*p);
            ctx.fillStyle = skinColor;
            ctx.fillRect(x + 16*p, y + 9*p, 3*p, 3*p);
            
            // ===== LEGS (dark gray pants) =====
            ctx.fillStyle = pantsColor;
            // Left leg
            ctx.fillRect(x + 5*p, y + 13*p, 4*p, 6*p);
            // Right leg
            ctx.fillRect(x + 11*p, y + 13*p, 4*p, 6*p);
            
            // Running animation
            if (!cowboy.jumping && frame === 1) {
                ctx.fillStyle = pantsColor;
                ctx.fillRect(x + 4*p, y + 17*p, 4*p, 2*p);
                ctx.fillRect(x + 12*p, y + 17*p, 4*p, 2*p);
            }
            
            // ===== SHOES (green) =====
            ctx.fillStyle = shoesColor;
            if (cowboy.jumping) {
                ctx.fillRect(x + 5*p, y + 19*p, 4*p, 3*p);
                ctx.fillRect(x + 11*p, y + 19*p, 4*p, 3*p);
            } else if (frame === 0) {
                ctx.fillRect(x + 5*p, y + 19*p, 4*p, 3*p);
                ctx.fillRect(x + 11*p, y + 19*p, 4*p, 3*p);
            } else {
                ctx.fillRect(x + 4*p, y + 19*p, 4*p, 3*p);
                ctx.fillRect(x + 12*p, y + 19*p, 4*p, 3*p);
            }
            
            // Shoe highlights
            ctx.fillStyle = shoesDark;
            ctx.fillRect(x + 5*p, y + 21*p, 4*p, 1*p);
            ctx.fillRect(x + 11*p, y + 21*p, 4*p, 1*p);
            
            ctx.restore();
        }

        // Draw cactus obstacle (smaller size, matching page colors)
        function drawCactus(obstacle) {
            const x = obstacle.x;
            const y = obstacle.y;
            const type = obstacle.type;
            
            // Cactus green matching primary color
            ctx.fillStyle = '#5a7a6b';
            
            if (type === 0) {
                // Small cactus
                ctx.fillRect(x + 8, y + 8, 6, 20);
                ctx.fillRect(x + 4, y + 14, 5, 3);
                ctx.fillRect(x + 4, y + 11, 3, 6);
                ctx.fillRect(x + 13, y + 12, 5, 3);
                ctx.fillRect(x + 15, y + 9, 3, 6);
            } else if (type === 1) {
                // Medium cactus
                ctx.fillRect(x + 7, y + 3, 8, 30);
                ctx.fillRect(x + 2, y + 12, 6, 3);
                ctx.fillRect(x + 2, y + 8, 3, 8);
                ctx.fillRect(x + 14, y + 10, 6, 3);
                ctx.fillRect(x + 17, y + 6, 3, 8);
            } else {
                // Double small cactus
                ctx.fillRect(x + 4, y + 10, 5, 18);
                ctx.fillRect(x + 14, y + 14, 5, 14);
                ctx.fillRect(x, y + 16, 5, 3);
                ctx.fillRect(x + 18, y + 20, 5, 3);
            }
            
            // Darker shading
            ctx.fillStyle = '#4a6a5b';
            if (type === 0) {
                ctx.fillRect(x + 12, y + 8, 2, 20);
            } else if (type === 1) {
                ctx.fillRect(x + 13, y + 3, 2, 30);
            } else {
                ctx.fillRect(x + 7, y + 10, 2, 18);
                ctx.fillRect(x + 17, y + 14, 2, 14);
            }
        }

        // Draw background
        function drawBackground() {
            // Sky - matching page colors (light greenish-white)
            ctx.fillStyle = '#e8f0ec';
            ctx.fillRect(0, 0, 800, 180);
            
            // Gradient overlay
            const skyGradient = ctx.createLinearGradient(0, 0, 0, 180);
            skyGradient.addColorStop(0, 'rgba(152, 180, 166, 0.3)');
            skyGradient.addColorStop(1, 'rgba(232, 240, 236, 0.1)');
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, 800, 180);
            
            // Clouds (white fluffy)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            clouds.forEach(cloud => {
                ctx.beginPath();
                ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2);
                ctx.arc(cloud.x + 18, cloud.y - 5, 20, 0, Math.PI * 2);
                ctx.arc(cloud.x + 38, cloud.y, 15, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Distant hills (matching primary color)
            ctx.fillStyle = '#98b4a6';
            ctx.beginPath();
            ctx.moveTo(0, 180);
            ctx.quadraticCurveTo(100, 150, 200, 170);
            ctx.quadraticCurveTo(300, 185, 400, 165);
            ctx.quadraticCurveTo(500, 145, 600, 170);
            ctx.quadraticCurveTo(700, 190, 800, 175);
            ctx.lineTo(800, 200);
            ctx.lineTo(0, 200);
            ctx.closePath();
            ctx.fill();
            
            // Ground (light sand/grass color matching page)
            ctx.fillStyle = '#d4e0d8';
            ctx.fillRect(0, 200, 800, 100);
            
            // Ground top accent
            ctx.fillStyle = '#5a7a6b';
            ctx.fillRect(0, 200, 800, 4);
            
            // Ground texture
            ctx.fillStyle = '#c4d4cc';
            for (let i = 0; i < 25; i++) {
                const gx = (groundX + i * 35) % 850 - 50;
                ctx.fillRect(gx, 210, 15, 2);
                ctx.fillRect(gx + 18, 220, 10, 2);
            }
            
            // Small decorative plants
            ctx.fillStyle = '#5a7a6b';
            ctx.fillRect(50, 190, 4, 12);
            ctx.fillRect(48, 195, 3, 5);
            ctx.fillRect(53, 193, 3, 5);
            
            ctx.fillRect(750, 190, 4, 12);
            ctx.fillRect(748, 193, 3, 5);
            ctx.fillRect(753, 195, 3, 5);
            
            // Draw firework particles
            drawParticles();
            
            // Draw gift box if active
            drawGiftBox();
        }

        // Update game state
        function update() {
            if (!gameRunning) return;
            
            // If gift box is showing, pause the game
            if (showGiftBox) return;

            // Update particles (fireworks)
            updateParticles();

            // Update cowboy
            cowboy.velocityY += gravity;
            cowboy.y += cowboy.velocityY;

            // Ground collision (adjusted for standing character)
            if (cowboy.y >= 165) {
                cowboy.y = 165;
                cowboy.velocityY = 0;
                cowboy.jumping = false;
            }

            // Animation frame
            if (!cowboy.jumping) {
                cowboy.runFrame++;
            }

            // Update obstacles
            obstacles.forEach((obstacle, index) => {
                obstacle.x -= gameSpeed;

                // Collision detection (adjusted for small character)
                const hitboxX = cowboy.x + 8;
                const hitboxY = cowboy.y - 15;
                const hitboxW = 28;
                const hitboxH = 55;
                
                if (
                    hitboxX < obstacle.x + obstacle.width - 5 &&
                    hitboxX + hitboxW > obstacle.x + 5 &&
                    hitboxY + hitboxH > obstacle.y + 5
                ) {
                    endGame();
                }

                // Remove off-screen obstacles and add score
                if (obstacle.x + obstacle.width < 0) {
                    obstacles.splice(index, 1);
                    score++;
                    scoreDisplay.textContent = score;

                    // Check for 10 points milestone - STOP GAME and show voucher
                    if (score === 10 && !hasReached100) {
                        hasReached100 = true;
                        gameRunning = false; // Stop the game
                        launchFireworksAndVoucher();
                        return;
                    }

                    // Increase difficulty very gradually
                    if (score % 20 === 0 && gameSpeed < 4) {
                        gameSpeed += 0.2;
                    }
                }
            });

            // Spawn new obstacles (much more spread out, smaller)
            obstacleTimer++;
            if (obstacleTimer >= obstacleInterval) {
                const type = Math.floor(Math.random() * 3);
                const height = type === 1 ? 35 : 28;
                obstacles.push({
                    x: 850,
                    y: 210 - height,
                    width: 25,
                    height: height,
                    type: type
                });
                obstacleTimer = 0;
                obstacleInterval = 220 + Math.random() * 100;  // Very spread out
            }

            // Update clouds
            clouds.forEach(cloud => {
                cloud.x -= gameSpeed * 0.1;
                if (cloud.x + cloud.width < 0) {
                    cloud.x = 800 + Math.random() * 100;
                    cloud.y = 25 + Math.random() * 35;
                }
            });

            // Update ground
            groundX -= gameSpeed;
            if (groundX < -50) groundX = 0;
        }

        // Draw everything
        function draw() {
            // Clear canvas
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

            // Draw background
            drawBackground();

            // Draw obstacles
            obstacles.forEach(obstacle => {
                drawCactus(obstacle);
            });

            // Draw cowboy
            drawCowboy();
        }

        // Game loop
        function gameLoop() {
            update();
            draw();
            animationId = requestAnimationFrame(gameLoop);
        }

        // Jump function
        function jump() {
            // Close gift box on click and continue game
            if (showGiftBox) {
                showGiftBox = false;
                giftBoxAnimation = 0;
                gameRunning = true; // Resume game after voucher
                gameLoop(); // Restart game loop
                return;
            }
            
            if (!gameStarted) {
                startGame();
                return;
            }

            if (!cowboy.jumping && gameRunning) {
                cowboy.velocityY = -10;  // Gentle jump
                cowboy.jumping = true;
            }
        }

        // Start game
        function startGame() {
            gameStarted = true;
            gameRunning = true;
            score = 0;
            gameSpeed = 2;  // Very slow start
            obstacleInterval = 200;
            obstacles = [];
            particles = [];
            hasReached100 = false;
            showGiftBox = false;
            cowboy.y = 165;
            cowboy.velocityY = 0;
            cowboy.jumping = false;
            
            scoreDisplay.textContent = score;
            gameTitle.style.display = 'none';
            gameOver.classList.remove('show');
            
            gameLoop();
        }

        // End game
        function endGame() {
            gameRunning = false;
            cancelAnimationFrame(animationId);
            
            // Update high score
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('cowboyHighScore', highScore);
                highScoreDisplay.textContent = highScore;
            }
            
            finalScoreDisplay.textContent = score;
            highScoreDisplayEnd.textContent = highScore;
            gameOver.classList.add('show');
            
            // Special reward for high score
            if (score >= 10) {
                setTimeout(() => {
                    alert('🎉 Chúc mừng! Bạn đạt ' + score + ' điểm!\nNhận ngay voucher giảm 20% với mã: COWBOY' + score);
                }, 500);
            }
        }

        // Restart game
        function restartGame() {
            gameStarted = false;
            startGame();
        }

        // Event listeners
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
        });

        gameCanvas.addEventListener('click', jump);
        gameContainer.addEventListener('click', function(e) {
            if (e.target === gameTitle || gameTitle.contains(e.target)) {
                jump();
            }
        });

        restartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            restartGame();
        });

        // Initial draw
        draw();
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('Fournitour Landing Page Loaded Successfully!');
});

// Add scrolled header style and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        padding: 10px 0;
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(232, 235, 233, 0.98);
        padding: 20px;
        gap: 20px;
    }
    
    section.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
    }
    
    .lightbox-content p {
        color: white;
        margin-top: 15px;
        font-size: 18px;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.3s;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Scroll to Top Button */
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color, #5a7a6b);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        background: var(--primary-dark, #3d5a4c);
    }
`;
document.head.appendChild(style);
