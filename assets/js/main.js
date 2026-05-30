    gsap.registerPlugin(ScrollTrigger);

    /* ── CLOCK ── */
    (function tick() {
      const n = new Date(),
        p = v => String(v).padStart(2, '0');
      document.getElementById('clock').textContent = p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds()) + ' CET';
      setTimeout(tick, 1000);
    })();

    /* ── WAVE PAGE 1 ── */
    const cv = document.getElementById('wave-canvas'),
      ctx = cv.getContext('2d');

    function resize() {
      cv.width = innerWidth;
      cv.height = innerHeight
    }
    resize();
    window.addEventListener('resize', resize);
    let t = 0;

    function drawEntry() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const W = cv.width,
        H = cv.height,
        wY = H * .72,
        S = 400;
      const y = p => wY + Math.sin(p * Math.PI * 2.2 + t * .016) * 38 + Math.sin(p * Math.PI * 5.1 + t * .011) * 16 + Math.sin(p * Math.PI * 1.1 + t * .021) * 24 + Math.sin(p * Math.PI * 8.3 + t * .008) * 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(W, wY);
      for (let i = S; i >= 0; i--) ctx.lineTo(i / S * W, y(i / S));
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.beginPath();
      for (let i = 0; i <= S; i++) {
        const x = i / S * W;
        i ? ctx.lineTo(x, y(i / S)) : ctx.moveTo(x, y(0))
      }
      ctx.strokeStyle = 'rgba(255,255,255,.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      t++;
      requestAnimationFrame(drawEntry);
    }
    drawEntry();

    /* ── GSAP PAGE 1 ── */
    const isMobile = window.innerWidth <= 600;
    const tl = gsap.timeline({
      delay: .3
    });
    tl.to('.eyebrow', {
      opacity: 1,
      duration: .8,
      ease: 'power2.out'
    });
    tl.to('.hl-word', {
      translateY: '0%',
      duration: 1.6,
      ease: 'expo.out',
      stagger: .1
    }, '-=.5');
    tl.to(isMobile ? ['#topright', '#cta-wrap'] : ['.meta', '#topright', '#cta-wrap'], {
      opacity: 1,
      duration: .7,
      stagger: .05
    }, '-=.9');
    if (!isMobile) tl.to('.meta', {
      opacity: 1,
      duration: .5
    }, '-=.7');
    tl.to('#blue-content', {
      opacity: 1,
      duration: .9,
      ease: 'power2.out'
    }, '-=.4');

    /* ── AMPOULE ── */
    document.getElementById('bulb-wrap').addEventListener('click', function() {
      this.classList.add('pulling');
      setTimeout(() => {
        this.classList.add('on');
        gsap.to('#page-entry', {
          opacity: 0,
          duration: .6,
          ease: 'power2.inOut',
          onComplete: () => {
            document.getElementById('page-entry').style.display = 'none';
            const p2 = document.getElementById('page-parcours');
            p2.style.transform = 'translateY(0)';
            p2.style.opacity = '1';
            p2.style.zIndex = '20';
            initPage2();
          }
        });
      }, 300);
      setTimeout(() => this.classList.remove('pulling'), 500);
    });

    /* ── BACK BUTTON ── */
    document.getElementById('back-btn').addEventListener('click', function(e) {
      e.preventDefault();
      const p2 = document.getElementById('page-parcours');
      gsap.to(p2, {
        opacity: 0,
        duration: .5,
        ease: 'power2.inOut',
        onComplete: () => {
          p2.style.transform = 'translateY(100%)';
          p2.style.zIndex = '9';
          const p1 = document.getElementById('page-entry');
          p1.style.display = '';
          gsap.to(p1, {
            opacity: 1,
            duration: .5,
            ease: 'power2.out'
          });
        }
      });
    });

    /* ── VAGUES PAGE 2 ── */
    const waves = [{
      id: 'w1',
      inv: false,
      t: 0
    }, {
      id: 'w2',
      inv: true,
      t: 100
    }, {
      id: 'w3',
      inv: false,
      t: 200
    }];

    function drawWave(c) {
      const W = 1440,
        H = 100,
        wY = H * .5,
        S = 350;
      const y = p => wY + (c.inv ? -1 : 1) * (Math.sin(p * Math.PI * 2.2 + c.t * .016) * 22 + Math.sin(p * Math.PI * 5.1 + c.t * .011) * 10 + Math.sin(p * Math.PI * 1.1 + c.t * .021) * 14 + Math.sin(p * Math.PI * 8.3 + c.t * .008) * 5);
      let d = `M0,${c.inv?0:H}`;
      for (let i = 0; i <= S; i++) d += ` L${i/S*W},${y(i/S)}`;
      d += c.inv ? ` L${W},0 Z` : ` L${W},${H} Z`;
      const el = document.getElementById(c.id);
      if (el) el.setAttribute('d', d);
      c.t++;
    }
    (function loop() {
      waves.forEach(drawWave);
      requestAnimationFrame(loop)
    })();

    /* ── INIT PAGE 2 ANIMATIONS ── */
    function initPage2() {
      const scroller = '#page-parcours';

      /* Blocs entiers (cards, sections) */
      gsap.utils.toArray('.project-card,.skill-cat,.proj-ps-col,.proj-algo,.proj-arch,.proj-defis,.proj-code,.proj-score-preview,.importance-card,.metric-item,.proj-importance').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: .85,
          ease: 'power3.out',
          delay: i * .03,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            scroller
          }
        });
      });

      /* Textes — titres, paragraphes, labels */
      gsap.utils.toArray([
        '.hero-eyebrow', '.hero-name', '.hero-role', '.hero-divider', '.hero-bio',
        '.hero-actions', '.hero-socials', '.vision-title', '.vision-sub', '.vision-intro',
        '.pillar', '.vision-goal', '.scroll-hint',
        '.sec-label', '.sec-title',
        '.proj-main-title', '.proj-main-sub', '.proj-main-desc', '.proj-stack-line', '.proj-wip',
        '.proj-block-title', '.proj-formula', '.proj-formula-result',
        '.proj-ps-title', '.proj-ps-text',
        '.defis-list li',
        '.score-card', '.score-details',
        '.contact-email', '.contact-sub', '.contact-socials'
      ].join(',')).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: .7,
          ease: 'power2.out',
          delay: i * .018,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            scroller
          }
        });
      });

      /* Timeline — slide depuis la gauche */
      gsap.utils.toArray('.tl-item').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -32,
          duration: .75,
          ease: 'power2.out',
          delay: i * .05,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            scroller
          }
        });
      });

      ScrollTrigger.refresh();
    }

    /* ── NAV SCROLL ── */
    document.querySelectorAll('.nav-links a, .scroll-nav').forEach(a => {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          document.getElementById('page-parcours').scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    /* Animer les barres skills au scroll */
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.getAttribute('data-w');
          skillObs.unobserve(e.target);
        }
      });
    }, {
      threshold: .3
    });
    skillBars.forEach(b => {
      b.style.width = '0';
      skillObs.observe(b);
    });

    /* Animer les barres score au scroll */
    const bars = document.querySelectorAll('.bar div');
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.style.width = e.target.getAttribute('data-w');
      });
    }, {
      threshold: .3
    });
    bars.forEach(b => {
      const w = b.style.width;
      b.setAttribute('data-w', w);
      b.style.width = '0';
      barObs.observe(b);
    });

    /* Barres niveaux skills */
    setTimeout(() => {
      const lvlBars = document.querySelectorAll('.lvl-bar');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w;
            obs.unobserve(e.target);
          }
        });
      }, {
        threshold: .2,
        rootMargin: '0px 0px -50px 0px'
      });
      lvlBars.forEach(b => obs.observe(b));
    }, 500);

    /* ── PARALLAX PAGE 1 ── */
    document.addEventListener('mousemove', e => {
      gsap.to('#e-hero', {
        x: (e.clientX / innerWidth - .5) * 10,
        y: (e.clientY / innerHeight - .5) * 5,
        duration: 2,
        ease: 'power1.out'
      });
    });

    /* ── EFFET LUMIÈRE SOURIS SUR SKILL CARDS ── */
    document.querySelectorAll('.skill-cat').forEach(card => {
      const spot = document.createElement('div');
      spot.className = 'spotlight';
      card.prepend(spot);
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left,
          y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        spot.style.left = x + 'px';
        spot.style.top = y + 'px';
        spot.style.opacity = '1';
      });
      card.addEventListener('mouseleave', () => {
        spot.style.opacity = '0';
      });
    });

    /* ── AUTO-SLIDE CARTES PROJETS ── */
    ['slider-ia', 'slider-nike'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const slides = el.querySelectorAll('.slide');
      let i = 0;
      setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 3000);
    });
    /* ── LANGUE FR / TR ── */
    (function() {
      /* ── Dictionnaire de traduction ── */
      const translations = {
        fr: {
          /* Page 1 — Entry */
          'entry-eyebrow': 'Portfolio — 2025 / 2026',
          'entry-welcome': 'Bienvenue <span style="font-size:clamp(.9rem,2vw,1.8rem);font-weight:400;font-style:italic;color:rgba(0,0,0,.35);letter-spacing:.06em;vertical-align:middle">dans mon</span>',
          'entry-univers': 'Univers.',
          'bc-num-label': 'Marchés ciblés',
          /* Nav */
          'nav-projects': 'Projets',
          'nav-skills': 'Skills',
          'nav-parcours': 'Parcours',
          'nav-contact': 'Contact',
          /* Hero */
          'hero-eyebrow': 'Portfolio — 2025 / 2026',
          'hero-greeting': 'Bonjour, je suis',
          'hero-role': 'Ingénieur en formation — Passionné d\'IA et de cybersécurité.',
          'hero-bio': 'Étudiant en <strong>3ème année de Génie Informatique</strong>, je suis avant tout quelqu\'un de <strong>profondément passionné</strong> — par le code, les systèmes, et tout ce qui se construit. Ce qui me distingue ? Une <strong>capacité à apprendre vite</strong> : je m\'approprie de nouveaux outils, langages et concepts en un temps record, et je les applique immédiatement sur des projets concrets. Actuellement, je développe <strong>InvestWorld</strong> — une plateforme startup × investisseur avec scoring intelligent et workflow NDA automatisé. Ma spécialisation se construit autour de la <strong>détection d\'anomalies par machine learning</strong> et de la <strong>sécurité applicative</strong>. Je ne me contente pas d\'apprendre — <strong>je construis.</strong>',
          'btn-projects': 'Voir mes projets →',
          'btn-cv': 'Télécharger CV',
          /* Vision */
          'vision-sub': '01 — Vision',
          'vision-title': 'Ce qui me guide',
          'vision-intro': 'Je ne me positionne pas simplement comme un étudiant en informatique. Je me construis, délibérément, comme un <strong>ingénieur-entrepreneur</strong> : quelqu\'un capable de concevoir des systèmes robustes <em>et</em> de les transformer en produits qui ont un impact réel.',
          'pillar1-title': 'Ingénierie d\'abord',
          'pillar1-desc': 'Concevoir des systèmes qui tiennent à l\'échelle, pas juste des scripts qui marchent en local.',
          'pillar2-title': 'IA & Sécurité, en tandem',
          'pillar2-desc': 'La détection d\'anomalies et la sécurité applicative sont les deux faces d\'un même problème.',
          'pillar3-title': 'Construire en publiant',
          'pillar3-desc': 'Chaque projet est un artefact réel — déployé, documenté, montrable.',
          'vision-goal': 'L\'objectif à terme : rejoindre une équipe d\'élite ou fonder une structure qui résout de vrais problèmes avec de vraies contraintes. <strong>Pas de simulation. Du concret.</strong>',
          /* Sections */
          'sec-label-projets': '02 — Projets',
          'sec-title-projets': 'Ce que<br><em>je construis.</em>',
          'sec-label-skills': '03 — Compétences',
          'sec-title-skills': 'Le <em style="color:rgba(0,0,0,.25)">skill stack.</em>',
          'sec-label-certif': '04 — Certifications',
          'sec-title-certif': 'Ce que<br><em>j\'ai validé.</em>',
          'sec-label-parcours': '04 — Parcours',
          'sec-title-parcours': 'Mon<br><em>chemin.</em>',
          'sec-label-contact': '05 — Contact',
          'sec-title-contact': 'Travaillons<br><em>ensemble.</em>',
          'contact-sub': 'Une idée, un projet, une opportunité ? Je suis disponible pour des collaborations, stages ou échanges techniques.',
          'cf-label-name': 'Nom',
          'cf-ph-name': 'Votre nom',
          'cf-label-email': 'Email',
          'cf-ph-email': 'votre@email.com',
          'cf-label-subject': 'Sujet',
          'cf-ph-subject': 'Collaboration, stage, échange…',
          'cf-label-message': 'Message',
          'cf-ph-message': 'Décrivez votre projet ou votre idée…',
          'cf-btn': 'Envoyer le message',
          'cf-success': 'Message envoyé — je reviens vers vous rapidement !',
          /* Skills cats */
          'skill-cat-1': 'IA & Data Science',
          'skill-cat-2': 'Développement Web',
          'skill-cat-3': 'Outils & Frameworks',
          'skill-cat-4': 'Certifications',
          /* Levels */
          'lvl-ex': 'Expert',
          'lvl-av': 'Avancé',
          'lvl-in': 'Intermédiaire',
          /* Scroll hint */
          'scroll-hint': 'DÉFILER',
          /* Badge disponible */
          'badge-available': 'Disponible',
          /* Project cards */
          'proj1-badge': 'En cours',
          'proj1-desc': 'Mise en relation startups africaines × investisseurs internationaux — matching pondéré sur 6 critères, NDA automatisé et Data Room sécurisée.',
          'proj2-badge': 'En conception',
          'proj2-desc': 'Plateforme e-learning dédiée aux métiers de l\'IA — parcours adaptatif 4 niveaux, tuteur IA intégré et certifications partageables sur LinkedIn.',
          'proj3-badge': 'Terminé',
          'proj3-desc': 'Landing page animée, catalogue interactif et modal produit en HTML / CSS / JS pur — zéro framework, démonstration de maîtrise front-end.',
          /* Vision pillars (extended) */
          'vpillar1-title': 'InvestWorld — en cours de développement',
          'vpillar1-desc': 'Plateforme de mise en relation startups × investisseurs avec algorithme de matching pondéré (6 critères), intégration Stripe et messagerie chiffrée. Stack : Node.js, Supabase.',
          'vpillar2-title': 'IA Academy — en conception',
          'vpillar2-desc': 'Plateforme e-learning dédiée aux métiers de l\'IA : prompt engineer, data analyst, ML engineer. Parcours adaptatif, tuteur IA intégré, certifications progressives. Stack : React, Node.js, OpenAI API.',
          'vpillar3-title': 'Spécialisation visée : détection d\'anomalies ML',
          'vpillar3-desc': 'J\'oriente activement ma montée en compétences vers l\'application du machine learning à la détection de menaces — modèles d\'isolation, comportements réseau anormaux, systèmes de scoring en temps réel.',
          'vpillar4-title': 'Focus : sécurité applicative & systèmes intelligents',
          'vpillar4-desc': 'Architecturer des solutions où chaque couche — du backend à l\'API — est pensée avec une logique de résilience et de moindre privilège.',
          'vpillar5-title': 'Automatisation des tâches & workflows intelligents',
          'vpillar5-desc': 'Concevoir des pipelines automatisés qui éliminent les tâches répétitives — scripts, bots, workflows n8n — pour que l\'humain se concentre sur l\'essentiel.',
          'vision-goal2': '<strong>Là où je vais :</strong> concevoir des infrastructures où l\'IA ne se contente pas d\'optimiser — elle détecte, protège, anticipe et automatise.',
          /* Certifications */
          'cert1-name': 'Le déploiement de l\'IA générative dans les organisations',
          'cert1-tag1': 'IA générative',
          'cert1-tag2': 'IA pour les entreprises',
          'cert2-name': 'Les prompts engineering avancés',
          'cert2-tag1': 'ChatGPT',
          'cert2-tag2': 'Ingénierie de Prompt',
          'cert3-name': 'L\'essentiel de n8n',
          'cert3-tag1': 'Agents IA',
          'cert3-tag2': 'Automatisation',
          'cert4-name': '24 Certifications en Développement Web : 100% Pratique +100h',
          'cert4-tag1': 'Développement Web',
          'cert5-name': 'Google AI Essentials',
          'cert5-tag1': 'IA générative',
          'cert5-tag2': 'Google Career Certificates',
          'cert6-name': 'AI Fluency: Framework & Foundations',
          'cert6-tag1': 'Intelligence Artificielle',
          'cert6-tag2': 'Fondations IA',
          'cert7-name': 'Claude 101',
          'cert7-tag1': 'Claude',
          'cert7-tag2': 'IA Appliquée',
          'cert8-name': 'Claude with the Anthropic API',
          'cert8-tag1': 'API',
          'cert8-tag2': 'Développement IA',
          'cert9-name': 'Comprendre la cybersécurité : Des menaces à la responsabilité personnelle',
          'cert9-tag1': 'Cybersécurité',
          'cert9-tag2': 'Gestion des menaces',
          'cert10-name': 'CCNA — Réseaux & Cybersécurité',
          'cert10-tag1': 'Réseaux',
          'cert10-tag2': 'Cybersécurité',
          'cert-btn-see': 'Voir',
          'cert-btn-verify': 'Vérifier',
          'cert-btn-wip': 'En cours…',
          'cert-wip-label': 'En cours',
          /* Contact location */
          'contact-location': 'Cameroun · Tokat, Turquie',
          /* Timeline */
          'tl-date-1': '2020',
          'tl-title-1': 'Baccalauréat série D',
          'tl-sub-1': 'Obtention du Baccalauréat scientifique série D avec spécialisation en <strong>Sciences de la Vie et de la Terre</strong>. Premier socle académique posé au Cameroun.',
          'tl-date-2': '2021',
          'tl-title-2': 'Université de Yaoundé I',
          'tl-sub-2': 'Formation initiale en sciences à l\'<strong>Université de Yaoundé I</strong>, l\'une des institutions académiques les plus prestigieuses du Cameroun. Fondations en mathématiques, physique et informatique fondamentale.',
          'tl-date-3': '2022',
          'tl-title-3': 'Institut Supérieur des Sciences, Arts et Métiers',
          'tl-sub-3': 'Intégration de l\'<strong>ISSAM</strong> en cycle Ingénieur — spécialisation <strong>Génie Informatique</strong>. Formation intensive couvrant algorithmes, réseaux, systèmes d\'exploitation, cryptographie et développement logiciel.',
          'tl-date-4': '2023',
          'tl-title-4': 'Université de Tokat Gaziosmanpaşa (TOGÜ)',
          'tl-sub-4': 'Poursuite du cycle Ingénieur en <strong>Génie Informatique</strong> à l\'<strong>Université de Tokat</strong>, Turquie. Approfondissement en IA, cybersécurité et développement logiciel dans un environnement académique international.',
          'tl-date-5': '2024',
          'tl-title-5': 'InvestWorld — Fondateur & CTO',
          'tl-sub-5': 'Conception et développement d\'une plateforme full-stack startup-investisseur en parallèle de la formation. Architecture backend, algorithme de matching, Stripe, JWT + Supabase. <strong>3+ marchés ciblés.</strong>',
          'tl-date-6': '2026',
          'tl-title-6': 'Fin de Cycle Ingénieur',
          'tl-sub-6': 'En fin de formation pour l\'obtention du <strong>diplôme d\'Ingénieur en Génie Informatique</strong>. Spécialisation IA & Cybersécurité. Préparation du mémoire de fin d\'études.',
          /* Parcours section title */
          'sec-title-parcours': 'L\'<em>évolution.</em>',
        },
        tr: {
          /* Page 1 — Entry */
          'entry-eyebrow': 'Portfolyo — 2025 / 2026',
          'entry-welcome': 'Dünyama <span style="font-size:clamp(.9rem,2vw,1.8rem);font-weight:400;font-style:italic;color:rgba(0,0,0,.35);letter-spacing:.06em;vertical-align:middle">hoş geldiniz</span>',
          'entry-univers': 'Evren.',
          'bc-num-label': 'Hedef Pazar',
          /* Nav */
          'nav-projects': 'Projeler',
          'nav-skills': 'Beceriler',
          'nav-parcours': 'Kariyer',
          'nav-contact': 'İletişim',
          /* Hero */
          'hero-eyebrow': 'Portfolyo — 2025 / 2026',
          'hero-greeting': 'Merhaba, ben',
          'hero-role': 'Eğitimde Mühendis — YZ ve Siber Güvenlik Tutkunu.',
          'hero-bio': '<strong>Bilgisayar Mühendisliği 3. sınıf</strong> öğrencisiyim; kod, sistemler ve inşa etme konularında <strong>derin bir tutkuya</strong> sahibim. Beni ayıran şey? <strong>Hızlı öğrenme kapasitesi</strong>: yeni araçları, dilleri ve kavramları kısa sürede benimsiyor, hemen somut projelerde uyguluyorum. Şu anda <strong>InvestWorld</strong>\'u geliştiriyorum — akıllı puanlama ve otomatik NDA iş akışına sahip bir startup × yatırımcı platformu. Uzmanlığım <strong>makine öğrenimi ile anomali tespiti</strong> ve <strong>uygulama güvenliği</strong> üzerine şekilleniyor. Sadece öğrenmekle kalmıyorum — <strong>inşa ediyorum.</strong>',
          'btn-projects': 'Projelerimi gör →',
          'btn-cv': 'CV İndir',
          /* Vision */
          'vision-sub': '01 — Vizyon',
          'vision-title': 'Beni yönlendiren şey',
          'vision-intro': 'Kendimi sadece bir bilgisayar öğrencisi olarak konumlandırmıyorum. Bilinçli olarak bir <strong>mühendis-girişimci</strong> olarak inşa ediyorum: sağlam sistemler tasarlayabilen <em>ve</em> bunları gerçek etkiye dönüştürebilen biri.',
          'pillar1-title': 'Önce Mühendislik',
          'pillar1-desc': 'Sadece lokalde çalışan scriptler değil, ölçeğe dayanıklı sistemler tasarlamak.',
          'pillar2-title': 'YZ & Güvenlik, Birlikte',
          'pillar2-desc': 'Anomali tespiti ve uygulama güvenliği aynı sorunun iki yüzüdür.',
          'pillar3-title': 'Yayınlayarak İnşa Et',
          'pillar3-desc': 'Her proje gerçek bir eser — deploy edilmiş, belgelenmiş, gösterilebilir.',
          'vision-goal': 'Nihai hedef: bir seçkin ekibe katılmak ya da gerçek kısıtlamalar altında gerçek sorunları çözen bir yapı kurmak. <strong>Simülasyon değil. Gerçek.</strong>',
          /* Sections */
          'sec-label-projets': '02 — Projeler',
          'sec-title-projets': 'İnşa<br><em>ettiklerim.</em>',
          'sec-label-skills': '03 — Beceriler',
          'sec-title-skills': 'Benim<br><em>cephaneliğim.</em>',
          'sec-label-certif': '04 — Sertifikalar',
          'sec-title-certif': 'Kanıtladıklarım.',
          'sec-label-parcours': '04 — Kariyer',
          'sec-title-parcours': 'Benim<br><em>yolculuğum.</em>',
          'sec-label-contact': '05 — İletişim',
          'sec-title-contact': 'Birlikte<br><em>çalışalım.</em>',
          'contact-sub': 'Bir fikir, proje ya da fırsat mı var? İş birlikleri, stajlar veya teknik değişimler için müsaitim.',
          'cf-label-name': 'Ad Soyad',
          'cf-ph-name': 'Adınız',
          'cf-label-email': 'E-posta',
          'cf-ph-email': 'siz@email.com',
          'cf-label-subject': 'Konu',
          'cf-ph-subject': 'İş birliği, staj, değişim…',
          'cf-label-message': 'Mesaj',
          'cf-ph-message': 'Projenizi veya fikrinizi anlatın…',
          'cf-btn': 'Mesaj Gönder',
          'cf-success': 'Mesaj gönderildi — en kısa sürede geri döneceğim!',
          /* Skills cats */
          'skill-cat-1': 'YZ & Veri Bilimi',
          'skill-cat-2': 'Web Geliştirme',
          'skill-cat-3': 'Araçlar & Framework\'ler',
          'skill-cat-4': 'Sertifikalar',
          /* Levels */
          'lvl-ex': 'Uzman',
          'lvl-av': 'İleri',
          'lvl-in': 'Orta',
          /* Scroll hint */
          'scroll-hint': 'KAYDIRIN',
          /* Badge disponible */
          'badge-available': 'Müsait',
          /* Project cards */
          'proj1-badge': 'Devam Ediyor',
          'proj1-desc': 'Afrikalı startuplar × uluslararası yatırımcılar eşleştirme platformu — 6 kriterli ağırlıklı eşleştirme, otomatik NDA ve güvenli Veri Odası.',
          'proj2-badge': 'Tasarım Aşamasında',
          'proj2-desc': 'YZ mesleklerine yönelik e-öğrenme platformu — 4 seviyeli uyarlanabilir öğrenme yolu, entegre YZ öğretmen asistanı ve LinkedIn\'de paylaşılabilir sertifikalar.',
          'proj3-badge': 'Tamamlandı',
          'proj3-desc': 'Saf HTML / CSS / JS ile animasyonlu landing page, interaktif katalog ve ürün modalı — sıfır framework, front-end ustalığının kanıtı.',
          /* Vision pillars (extended) */
          'vpillar1-title': 'InvestWorld — geliştirme aşamasında',
          'vpillar1-desc': 'Ağırlıklı eşleştirme algoritması (6 kriter), Stripe entegrasyonu ve şifreli mesajlaşma ile startup × yatırımcı buluşturma platformu. Stack: Node.js, Supabase.',
          'vpillar2-title': 'IA Academy — tasarım aşamasında',
          'vpillar2-desc': 'YZ mesleklerine yönelik e-öğrenme platformu: prompt mühendisi, veri analisti, ML mühendisi. Uyarlanabilir öğrenme yolu, entegre YZ öğretmen, aşamalı sertifikalar. Stack: React, Node.js, OpenAI API.',
          'vpillar3-title': 'Hedeflenen uzmanlık: ML ile anomali tespiti',
          'vpillar3-desc': 'Yetkinliklerimi aktif olarak tehdit tespitinde makine öğreniminin uygulanmasına yönlendiriyorum — izolasyon modelleri, anormal ağ davranışları, gerçek zamanlı puanlama sistemleri.',
          'vpillar4-title': 'Odak: uygulama güvenliği & akıllı sistemler',
          'vpillar4-desc': 'Backend\'den API\'ye her katmanın esneklik ve en az ayrıcalık mantığıyla tasarlandığı çözümler mimarisi.',
          'vpillar5-title': 'Görev otomasyonu & akıllı iş akışları',
          'vpillar5-desc': 'Tekrarlayan görevleri ortadan kaldıran otomatik pipeline\'lar tasarlamak — scriptler, botlar, n8n iş akışları — insanın özüne odaklanması için.',
          'vision-goal2': '<strong>Hedeflediğim yer:</strong> YZ\'nin sadece optimize etmekle kalmadığı — tespit ettiği, koruduğu, öngördüğü ve otomatikleştirdiği altyapılar tasarlamak.',
          /* Certifications */
          'cert1-name': 'Kurumlarda Üretken YZ\'nin Uygulanması',
          'cert1-tag1': 'Üretken YZ',
          'cert1-tag2': 'İşletmeler için YZ',
          'cert2-name': 'İleri Düzey Prompt Mühendisliği',
          'cert2-tag1': 'ChatGPT',
          'cert2-tag2': 'Prompt Mühendisliği',
          'cert3-name': 'n8n\'in Temelleri',
          'cert3-tag1': 'YZ Ajanları',
          'cert3-tag2': 'Otomasyon',
          'cert4-name': '24 Web Geliştirme Sertifikası: %100 Pratik +100 Saat',
          'cert4-tag1': 'Web Geliştirme',
          'cert5-name': 'Google AI Essentials',
          'cert5-tag1': 'Üretken YZ',
          'cert5-tag2': 'Google Career Certificates',
          'cert6-name': 'AI Fluency: Framework & Foundations',
          'cert6-tag1': 'Yapay Zeka',
          'cert6-tag2': 'YZ Temelleri',
          'cert7-name': 'Claude 101',
          'cert7-tag1': 'Claude',
          'cert7-tag2': 'Uygulamalı YZ',
          'cert8-name': 'Claude with the Anthropic API',
          'cert8-tag1': 'API',
          'cert8-tag2': 'YZ Geliştirme',
          'cert9-name': 'Siber Güvenliği Anlamak: Tehditlerden Kişisel Sorumluluğa',
          'cert9-tag1': 'Siber Güvenlik',
          'cert9-tag2': 'Tehdit Yönetimi',
          'cert10-name': 'CCNA — Ağlar & Siber Güvenlik',
          'cert10-tag1': 'Ağlar',
          'cert10-tag2': 'Siber Güvenlik',
          'cert-btn-see': 'Gör',
          'cert-btn-verify': 'Doğrula',
          'cert-btn-wip': 'Devam ediyor…',
          'cert-wip-label': 'Devam Ediyor',
          /* Contact location */
          'contact-location': 'Kamerun · Tokat, Türkiye',
          /* Timeline */
          'tl-date-1': '2020',
          'tl-title-1': 'Lise Diploması — Seri D',
          'tl-sub-1': '<strong>Fen Bilimleri ve Yerbilimi</strong> alanında uzmanlaşma ile bilimsel lise diploması. Kamerun\'da atılan ilk akademik temel.',
          'tl-date-2': '2021',
          'tl-title-2': 'Yaoundé I Üniversitesi',
          'tl-sub-2': 'Kamerun\'un en prestijli akademik kurumlarından biri olan <strong>Yaoundé I Üniversitesi</strong>\'nde temel fen bilimleri eğitimi. Matematik, fizik ve temel bilişimde sağlam altyapı.',
          'tl-date-3': '2022',
          'tl-title-3': 'Yüksek Fen, Sanat ve Meslek Bilimleri Enstitüsü',
          'tl-sub-3': '<strong>ISSAM</strong>\'a Mühendislik döngüsü ile entegrasyon — <strong>Bilgisayar Mühendisliği</strong> uzmanlığı. Algoritmalar, ağlar, işletim sistemleri, kriptografi ve yazılım geliştirmeyi kapsayan yoğun eğitim.',
          'tl-date-4': '2023',
          'tl-title-4': 'Tokat Gaziosmanpaşa Üniversitesi (TOGÜ)',
          'tl-sub-4': 'Türkiye, <strong>Tokat Üniversitesi</strong>\'nde <strong>Bilgisayar Mühendisliği</strong> döngüsünün devamı. Uluslararası akademik ortamda YZ, siber güvenlik ve yazılım geliştirmede derinleşme.',
          'tl-date-5': '2024',
          'tl-title-5': 'InvestWorld — Kurucu & CTO',
          'tl-sub-5': 'Eğitimle paralel olarak startup-yatırımcı full-stack platformu tasarımı ve geliştirmesi. Backend mimarisi, eşleştirme algoritması, Stripe, JWT + Supabase. <strong>3+ hedef pazar.</strong>',
          'tl-date-6': '2026',
          'tl-title-6': 'Mühendislik Döngüsü Sonu',
          'tl-sub-6': '<strong>Bilgisayar Mühendisliği Diploması</strong> için eğitim son aşamasında. YZ & Siber Güvenlik uzmanlığı. Bitirme tezi hazırlığı.',
          /* Parcours section title */
          'sec-title-parcours': 'Benim<br><em>yolculuğum.</em>',
        }
      };

      let currentLang = localStorage.getItem('lang') || 'fr';

      function applyTranslation(lang) {
        const t = translations[lang];
        if (!t) return;

        /* Page 1 — entry */
        const eyebrowEl = document.querySelector('#e-hero .eyebrow strong:first-child');
        if (eyebrowEl) eyebrowEl.closest('.eyebrow').innerHTML =
          `<strong style="color:#050505">${t['hero-eyebrow'].split('—')[0].trim()}</strong> <span style="color:rgba(0,0,0,.72)">—</span> <strong style="color:#050505">${t['hero-eyebrow'].split('—')[1]?.trim()}</strong>`;

        const welcomeRow = document.querySelector('#e-hero .hl-row:first-child .hl-word');
        if (welcomeRow) welcomeRow.innerHTML = t['entry-welcome'];
        const univers = document.querySelector('#e-hero .hl-word.out');
        if (univers) univers.textContent = t['entry-univers'];
        const bcLabel = document.querySelector('.bc-num-label');
        if (bcLabel) bcLabel.textContent = t['bc-num-label'];

        /* Nav links */
        const navLinks = document.querySelectorAll('.nav-links a');
        const navKeys = ['nav-projects', 'nav-skills', 'nav-parcours', 'nav-contact'];
        navLinks.forEach((a, i) => {
          if (t[navKeys[i]]) a.textContent = t[navKeys[i]];
        });

        /* Hero eyebrow */
        const heroEyebrow = document.querySelector('#p-hero .hero-eyebrow');
        if (heroEyebrow) heroEyebrow.innerHTML = `<strong>Portfolio</strong> — <strong>2025 / 2026</strong>`;

        /* Greeting */
        const allSmallP = document.querySelectorAll('.hero-text-col > p');
        allSmallP.forEach(p => {
          if (p.textContent.includes('Bonjour') || p.textContent.includes('Merhaba') || p.style.fontSize === '13px')
            p.textContent = t['hero-greeting'];
        });

        /* Badge disponible */
        const badge = document.querySelector('.hero-photo-badge');
        if (badge) badge.innerHTML = `<span class="dot" style="background:#22d65e;margin-right:.35rem"></span>${t['badge-available']}`;

        /* Role */
        const role = document.querySelector('.hero-role');
        if (role) role.textContent = t['hero-role'];

        /* Bio */
        const bio = document.querySelector('.hero-bio');
        if (bio) bio.innerHTML = t['hero-bio'];

        /* Buttons */
        const btnProjects = document.querySelector('.btn-hero.primary.scroll-nav');
        if (btnProjects) btnProjects.textContent = t['btn-projects'];
        const btnCv = document.querySelector('.btn-hero.outline');
        if (btnCv) btnCv.textContent = t['btn-cv'];

        /* Vision sub + title + intro + goal */
        const vSub = document.querySelector('.vision-sub');
        if (vSub) vSub.textContent = t['vision-sub'];
        const vTitle = document.querySelector('.vision-title');
        if (vTitle) vTitle.textContent = t['vision-title'];
        const vIntro = document.querySelector('.vision-intro');
        if (vIntro) vIntro.innerHTML = t['vision-intro'];
        const vGoal = document.querySelector('.vision-goal');
        if (vGoal) vGoal.innerHTML = t['vision-goal'] || t['vision-goal2'] || '';

        /* Vision pillars (hero-text-col) */
        const vPillars = document.querySelectorAll('#p-hero .pillar');
        const vpKeys = [
          ['vpillar1-title', 'vpillar1-desc'],
          ['vpillar2-title', 'vpillar2-desc'],
          ['vpillar3-title', 'vpillar3-desc'],
          ['vpillar4-title', 'vpillar4-desc'],
          ['vpillar5-title', 'vpillar5-desc'],
        ];
        vPillars.forEach((p, i) => {
          if (!vpKeys[i]) return;
          const [tk, dk] = vpKeys[i];
          const pt = p.querySelector('.pillar-title');
          const pd = p.querySelector('.pillar-desc');
          if (pt && t[tk]) pt.textContent = t[tk];
          if (pd && t[dk]) pd.textContent = t[dk];
        });

        /* Vision goal (the one below the pillars) */
        const vGoal2 = document.querySelector('#p-hero .vision-goal');
        if (vGoal2) vGoal2.innerHTML = t['vision-goal2'] || '';

        /* Scroll hint */
        const sh = document.querySelector('.st');
        if (sh) sh.textContent = t['scroll-hint'];

        /* Section labels & titles */
        const secMappings = [
          ['sec-label-projets', 'sec-title-projets', '#projets'],
          ['sec-label-skills', 'sec-title-skills', '#competences'],
          ['sec-label-certif', 'sec-title-certif', '#certifications'],
          ['sec-label-parcours', 'sec-title-parcours', '#parcours-sec'],
          ['sec-label-contact', 'sec-title-contact', '#contact'],
        ];
        secMappings.forEach(([lk, tk, sec]) => {
          const section = document.querySelector(sec);
          if (!section) return;
          const lbl = section.querySelector('.sec-label');
          const ttl = section.querySelector('.sec-title');
          if (lbl && t[lk]) lbl.textContent = t[lk];
          if (ttl && t[tk]) ttl.innerHTML = t[tk];
        });

        /* Project cards — badges */
        const projBadges = document.querySelectorAll('.proj-card-badge');
        ['proj1-badge', 'proj2-badge', 'proj3-badge'].forEach((k, i) => {
          if (projBadges[i] && t[k]) projBadges[i].textContent = t[k];
        });

        /* Project cards — descriptions */
        const projDescs = document.querySelectorAll('.proj-card-desc');
        ['proj1-desc', 'proj2-desc', 'proj3-desc'].forEach((k, i) => {
          if (projDescs[i] && t[k]) projDescs[i].textContent = t[k];
        });

        /* Contact sub */
        const cSub = document.querySelector('.contact-sub');
        if (cSub) cSub.textContent = t['contact-sub'];

        /* Contact location */
        /* Formulaire contact */
        const cfLabels = document.querySelectorAll('.cf-label');
        const cfLabelKeys = ['cf-label-name', 'cf-label-email', 'cf-label-subject', 'cf-label-message'];
        cfLabels.forEach((el, i) => {
          if (t[cfLabelKeys[i]]) el.textContent = t[cfLabelKeys[i]];
        });
        const cfName = document.getElementById('cf-name');
        const cfEmail = document.getElementById('cf-email');
        const cfSubject = document.getElementById('cf-subject');
        const cfMessage = document.getElementById('cf-message');
        const cfBtn = document.querySelector('.cf-btn-text');
        const cfSucc = document.getElementById('cf-success');
        if (cfName) cfName.placeholder = t['cf-ph-name'] || '';
        if (cfEmail) cfEmail.placeholder = t['cf-ph-email'] || '';
        if (cfSubject) cfSubject.placeholder = t['cf-ph-subject'] || '';
        if (cfMessage) cfMessage.placeholder = t['cf-ph-message'] || '';
        if (cfBtn && !document.querySelector('.cf-btn.sending')) cfBtn.textContent = t['cf-btn'] || '';
        if (cfSucc && cfSucc.classList.contains('visible')) {
          const svgEl = cfSucc.querySelector('svg');
          cfSucc.textContent = t['cf-success'] || '';
          if (svgEl) cfSucc.prepend(svgEl);
        }

        const cLoc = document.querySelector('.contact-location');
        if (cLoc && t['contact-location']) {
          cLoc.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:.4rem"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${t['contact-location']}`;
        }

        /* Skill cat titles */
        const skillCats = document.querySelectorAll('.skill-cat-title');
        const catKeys = ['skill-cat-1', 'skill-cat-2', 'skill-cat-3', 'skill-cat-4'];
        skillCats.forEach((el, i) => {
          if (t[catKeys[i]]) el.textContent = t[catKeys[i]];
        });

        /* Level badges */
        document.querySelectorAll('.lvl-badge.ex').forEach(el => el.textContent = t['lvl-ex']);
        document.querySelectorAll('.lvl-badge.av').forEach(el => el.textContent = t['lvl-av']);
        document.querySelectorAll('.lvl-badge.in').forEach(el => el.textContent = t['lvl-in']);

        /* Certifications */
        const certCards = document.querySelectorAll('.cert-card');
        const certData = [
          ['cert1-name', 'cert1-tag1', 'cert1-tag2'],
          ['cert2-name', 'cert2-tag1', 'cert2-tag2'],
          ['cert3-name', 'cert3-tag1', 'cert3-tag2'],
          ['cert4-name', 'cert4-tag1', null],
          ['cert5-name', 'cert5-tag1', 'cert5-tag2'],
          ['cert6-name', 'cert6-tag1', 'cert6-tag2'],
          ['cert7-name', 'cert7-tag1', 'cert7-tag2'],
          ['cert8-name', 'cert8-tag1', 'cert8-tag2'],
          ['cert9-name', 'cert9-tag1', 'cert9-tag2'],
          ['cert10-name', 'cert10-tag1', 'cert10-tag2'],
        ];
        certCards.forEach((card, i) => {
          if (!certData[i]) return;
          const [nk, t1k, t2k] = certData[i];
          const nameEl = card.querySelector('.cert-name');
          const tags = card.querySelectorAll('.cert-tag');
          const btn = card.querySelector('.cert-btn');
          const wipLabel = card.querySelector('.cert-date.wip-label');
          if (nameEl && t[nk]) nameEl.textContent = t[nk];
          if (tags[0] && t[t1k]) tags[0].textContent = t[t1k];
          if (tags[1] && t2k && t[t2k]) tags[1].textContent = t[t2k];
          if (btn) {
            if (btn.classList.contains('cert-btn-disabled')) {
              btn.textContent = t['cert-btn-wip'];
            } else {
              const svgEl = btn.querySelector('svg');
              const svgClone = svgEl ? svgEl.cloneNode(true) : null;
              const isVerify = btn.textContent.trim().startsWith('Vérif') || btn.textContent.trim().startsWith('Doğr');
              btn.textContent = isVerify ? t['cert-btn-verify'] : t['cert-btn-see'];
              if (svgClone) btn.appendChild(svgClone);
            }
          }
          if (wipLabel) {
            const dot = wipLabel.querySelector('.wip-dot');
            wipLabel.textContent = t['cert-wip-label'];
            if (dot) wipLabel.prepend(dot);
          }
        });

        /* Timeline */
        const tlItems = document.querySelectorAll('.tl-item');
        const tlKeys = [
          ['tl-date-1', 'tl-title-1', 'tl-sub-1'],
          ['tl-date-2', 'tl-title-2', 'tl-sub-2'],
          ['tl-date-3', 'tl-title-3', 'tl-sub-3'],
          ['tl-date-4', 'tl-title-4', 'tl-sub-4'],
          ['tl-date-5', 'tl-title-5', 'tl-sub-5'],
          ['tl-date-6', 'tl-title-6', 'tl-sub-6'],
        ];
        tlItems.forEach((item, i) => {
          if (!tlKeys[i]) return;
          const [dk, tk, sk] = tlKeys[i];
          const d = item.querySelector('.tl-date');
          const h = item.querySelector('.tl-title');
          const s = item.querySelector('.tl-sub');
          if (d && t[dk]) d.textContent = t[dk];
          if (h && t[tk]) h.textContent = t[tk];
          if (s && t[sk]) s.innerHTML = t[sk];
        });

        /* html lang attr */
        document.documentElement.lang = lang === 'fr' ? 'fr' : 'tr';

        /* Mettre à jour le visuel du toggle */
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.classList.toggle('is-tr', lang === 'tr');
      }

      /* Appliquer au chargement */
      applyTranslation(currentLang);
      if (currentLang === 'tr') {
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.classList.add('is-tr');
      }

      /* Écouter le clic */
      document.getElementById('lang-toggle').addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'tr' : 'fr';
        localStorage.setItem('lang', currentLang);
        applyTranslation(currentLang);
      });
    })();

    /* ── DARK / LIGHT MODE ── */
    (function() {
      const btn = document.getElementById('theme-toggle');
      const body = document.body;
      // Récupérer la préférence sauvegardée
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') body.classList.add('dark');

      btn.addEventListener('click', function() {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
      });
    })();
    /* ── FORMULAIRE FORMSPREE AJAX ── */
    (function() {
      const form = document.getElementById('contact-form');
      if (!form) return;
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = form.querySelector('.cf-btn');
        const success = document.getElementById('cf-success');
        btn.classList.add('sending');
        btn.querySelector('.cf-btn-text').textContent = 'Envoi…';
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
              'Accept': 'application/json'
            }
          });
          if (res.ok) {
            form.reset();
            btn.style.display = 'none';
            success.classList.add('visible');
          } else {
            btn.querySelector('.cf-btn-text').textContent = 'Erreur — réessayez';
            btn.classList.remove('sending');
          }
        } catch (err) {
          btn.querySelector('.cf-btn-text').textContent = 'Erreur — réessayez';
          btn.classList.remove('sending');
        }
      });
    })();
