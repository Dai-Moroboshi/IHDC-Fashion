/* ========================================
   SUDES JEWELRY - HOMEPAGE CLONE
   JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // 1. TOPBAR - Promo Rotation
  // ========================================
  const promoItems = document.querySelectorAll('.promo-item');
  let promoIndex = 0;

  if (promoItems.length > 1) {
    setInterval(() => {
      promoItems[promoIndex].classList.remove('active');
      promoIndex = (promoIndex + 1) % promoItems.length;
      promoItems[promoIndex].classList.add('active');
    }, 4000);
  }

  // ========================================
  // 2. STICKY HEADER
  // ========================================
  const header = document.getElementById('header');
  const headerHeight = header ? header.offsetHeight : 0;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > headerHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // 3. MOBILE MENU
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // ========================================
  // 4. HERO SLIDER (Swiper)
  // ========================================
  new Swiper('#heroSlider', {
    speed: 900,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '#heroSlider .swiper-button-next',
      prevEl: '#heroSlider .swiper-button-prev',
    },
    pagination: {
      el: '#heroSlider .swiper-pagination',
      clickable: true,
    },
  });

  // ========================================
  // 5. COUPON SLIDER (Swiper)
  // ========================================
  new Swiper('#couponSlider', {
    slidesPerView: 2,
    spaceBetween: 12,
    navigation: {
      nextEl: '#couponSlider .swiper-button-next',
      prevEl: '#couponSlider .swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1.3, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 10 },
      992: { slidesPerView: 1.5, spaceBetween: 10 },
      1200: { slidesPerView: 2, spaceBetween: 12 },
    },
  });

  // ========================================
  // 6. CATEGORY SLIDER (Swiper)
  // ========================================
  new Swiper('#categorySlider', {
    slidesPerView: 6,
    spaceBetween: 30,
    navigation: {
      nextEl: '#categorySlider .swiper-button-next',
      prevEl: '#categorySlider .swiper-button-prev',
    },
    breakpoints: {
      280: { slidesPerView: 2, spaceBetween: 14 },
      330: { slidesPerView: 3, spaceBetween: 14 },
      500: { slidesPerView: 3, spaceBetween: 14 },
      640: { slidesPerView: 3, spaceBetween: 14 },
      768: { slidesPerView: 4, spaceBetween: 20 },
      991: { slidesPerView: 4, spaceBetween: 30 },
      1024: { slidesPerView: 5, spaceBetween: 30 },
      1200: { slidesPerView: 6, spaceBetween: 30 },
    },
  });

  // ========================================
  // 7. FLASH SALE SLIDER (Swiper)
  // ========================================
  new Swiper('#flashSaleSlider', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '#flashSaleSlider .swiper-button-next',
      prevEl: '#flashSaleSlider .swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 12 },
      640: { slidesPerView: 2, spaceBetween: 14 },
      768: { slidesPerView: 3, spaceBetween: 16 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });

  // ========================================
  // 8. COUNTDOWN TIMER
  // ========================================
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const targetDate = new Date(countdownEl.getAttribute('data-date')).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent = '00';
        document.getElementById('cd-secs').textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
      document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
      document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========================================
  // 9. PRODUCT TABS
  // ========================================
  document.querySelectorAll('.tabs-header').forEach(tabsHeader => {
    const tabBtns = tabsHeader.querySelectorAll('.tab-btn');
    const section = tabsHeader.closest('.section-product-tabs, .section-product-tabs-2');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all buttons in this group
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Hide all tab contents in this section
        const tabContents = section.querySelectorAll('.tab-content');
        tabContents.forEach(tc => tc.classList.remove('active'));

        // Show target tab
        const targetId = btn.getAttribute('data-target');
        const targetTab = document.getElementById(targetId);
        if (targetTab) {
          targetTab.classList.add('active');
          targetTab.classList.add('fade-in');
          setTimeout(() => targetTab.classList.remove('fade-in'), 500);
        }
      });
    });
  });

  // ========================================
  // 10. COUPON COPY (Toast)
  // ========================================
  const toast = document.getElementById('toast');

  document.querySelectorAll('.coupon-btn[data-code]').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');

      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Show toast
      toast.textContent = `✓ Đã sao chép mã: ${code}`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });

  // ========================================
  // 11. BACK TO TOP
  // ========================================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // 12. WISHLIST TOGGLE
  // ========================================
  document.querySelectorAll('.product-wishlist .action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = btn.classList.toggle('active');
      btn.textContent = isActive ? '♥' : '♡';
      btn.style.color = isActive ? '#e74c3c' : '';
    });
  });

  // ========================================
  // 13. PRODUCT CARD QUOTE ACTION
  // ========================================
  document.querySelectorAll('.product-card .btn-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const productName = productCard ? productCard.querySelector('.product-name a')?.textContent : '';
      openQuoteModal(productName);
    });
  });

  // ========================================
  // 14. QUOTE MODAL INTERACTIONS
  // ========================================
  const quoteModal = document.getElementById('quoteModal');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteForm = document.getElementById('quoteForm');
  const productSelect = document.getElementById('quoteProductType');

  function openQuoteModal(preferredProduct = '') {
    if (!quoteModal) return;
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (preferredProduct && productSelect) {
      // Find matching or pre-fill note
      const noteInput = document.getElementById('quoteNotes');
      if (noteInput && !noteInput.value) {
        noteInput.value = `Quan tâm: ${preferredProduct}`;
      }
    }
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open modal on quote buttons
  document.querySelectorAll('[data-trigger-quote], .nav-promo-btn a, .btn-service, .btn-cta, .btn-quote-float').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  });

  if (quoteModalClose) {
    quoteModalClose.addEventListener('click', closeQuoteModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
      closeQuoteModal();
    }
  });

  // Handle Quote Form Submit
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName')?.value;
      const phone = document.getElementById('quotePhone')?.value;

      if (!name || !phone) {
        alert('Vui lòng điền họ tên và số điện thoại!');
        return;
      }

      closeQuoteModal();
      toast.textContent = `✓ Cảm ơn ${name}! HDC Fashion đã nhận yêu cầu và sẽ liên hệ trong 15 phút.`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      quoteForm.reset();
    });
  }


  // ========================================
  // 15. DYNAMIC CURRENT YEAR
  // ========================================
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ========================================
  // 16. CHATBOT INTERACTIONS
  // ========================================
  const chatbotWindow = document.getElementById('chatbotWindow');
  const btnOpenChatbot = document.getElementById('btnOpenChatbot');
  const btnCloseChatbot = document.getElementById('btnCloseChatbot');
  const chatbotBody = document.getElementById('chatbotBody');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotBadge = document.querySelector('.cskh-chat .cskh-badge');

  function openChatbot() {
    if (!chatbotWindow) return;
    chatbotWindow.classList.add('active');
    if (chatbotBadge) chatbotBadge.style.display = 'none';
    if (chatbotInput) setTimeout(() => chatbotInput.focus(), 300);
  }

  function closeChatbot() {
    if (!chatbotWindow) return;
    chatbotWindow.classList.remove('active');
  }

  if (btnOpenChatbot) btnOpenChatbot.addEventListener('click', openChatbot);
  if (btnCloseChatbot) btnCloseChatbot.addEventListener('click', closeChatbot);

  function appendChatMsg(sender, text) {
    if (!chatbotBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;
    msgDiv.innerHTML = `
      <div class="chat-bubble">${text}</div>
      <span class="chat-time">Vừa xong</span>
    `;
    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function handleBotReply(userText) {
    const lower = userText.toLowerCase();
    let reply = '';

    if (lower.includes('size') || lower.includes('bảng màu')) {
      reply = '📏 Dạ HDC có đủ size từ S đến 4XL cho nam & nữ, cùng bảng hơn 50 màu vải cao cấp. Anh/chị cho em xin số đo chiều cao & cân nặng hoặc để lại SĐT để em gửi bảng size chuẩn nhé!';
    } else if (lower.includes('báo giá') || lower.includes('giá') || lower.includes('đồng phục')) {
      reply = '📋 Dạ HDC Fashion miễn phí thiết kế mẫu 3D và chiết khấu cực tốt cho đơn số lượng lớn. Anh/chị có thể để lại SĐT hoặc bấm <a href="/bao-gia" style="color:#0097B2;text-decoration:underline;font-weight:700;">Nhận báo giá</a> để chuyên viên liên hệ trong 15 phút ạ!';
    } else if (lower.includes('polo') || lower.includes('golf')) {
      reply = '🏌️ Dòng Polo & Golf của HDC sử dụng công nghệ Anti-UV chống nắng UPF 50+, sợi co giãn 4 chiều thấm hút mồ hôi cực đỉnh. Anh/chị cần xem mẫu màu nào ạ?';
    } else if (lower.includes('kids') || lower.includes('học sinh')) {
      reply = '🎒 Dòng IHDC Kids chuyên đồng phục học sinh cao cấp: Polo, sơ mi, vest bé với chất liệu an toàn, mềm mại, thoáng mát tuyệt đối cho làn da bé!';
    } else if (lower.includes('xanh') || lower.includes('chất liệu') || lower.includes('bamboo') || lower.includes('modal') || lower.includes('sen')) {
      reply = '🌿 HDC tự hào tiên phong thời trang xanh: 100% sợi tự nhiên từ Bamboo, sợi sen, Modal, bạc hà... Kháng khuẩn, thoáng khí và thân thiện môi trường!';
    } else {
      reply = 'Dạ em đã ghi nhận thông tin: "' + userText.replace(/</g, '&lt;') + '". Chuyên viên tư vấn HDC Fashion sẽ liên hệ lại ngay để hỗ trợ quý khách chi tiết nhất!';
    }

    setTimeout(() => {
      appendChatMsg('bot', reply);
    }, 600);
  }

  // Quick reply options click
  document.querySelectorAll('.quick-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg') || btn.textContent;
      appendChatMsg('user', msg);
      btn.style.display = 'none';
      handleBotReply(msg);
    });
  });

  // Chat submit form
  if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatbotInput.value.trim();
      if (!val) return;
      appendChatMsg('user', val);
      chatbotInput.value = '';
      handleBotReply(val);
    });
  }

});
