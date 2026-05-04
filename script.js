// Smooth scrolling for navigation links

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    const translateButton = document.getElementById('translate-toggle');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const translations = {
        th: {
            home: 'หน้าแรก',
            experience: 'ประสบการณ์ & กิจกรรม',
            skills: 'ทักษะ',
            blog: 'บล็อก',
            education: 'การศึกษา',
            contact: 'ติดต่อ',
            name: 'ทัพพ์ ทบประดิษฐ์',
            nickname: 'ชื่อเล่น: ทัพพ์',
            details: '18 ตุลาคม 2551 • 17',
            experienceTitle: 'ประสบการณ์ & กิจกรรม',
            experienceYearLabel: 'ปี:',
            experienceYear: '2020',
            experienceActivityLabel: 'กิจกรรม:',
            experienceActivity: 'ชื่อโปรเจค',
            experienceDescriptionLabel: 'รายละเอียด:',
            experienceDescription: 'คำอธิบายสั้น ๆ ของกิจกรรมหรือโปรเจค',
            experienceLinkNote: 'คลิกเพื่อดูรายละเอียดกิจกรรมเพิ่มเติม',
            activitiesPageTitle: 'กิจกรรมพิเศษ',
            activitiesIntro: 'นี่คือกิจกรรมและโปรเจคสำคัญที่ฉันเคยทำ',
            activity1Title: 'งานนิทรรศการวิทยาศาสตร์ 2022',
            activity1Description: 'ออกแบบรถพลังงานแสงอาทิตย์และนำเสนอผลงานในงานโรงเรียน',
            activity2Title: 'ชมรมดนตรี',
            activity2Description: 'เล่นกีตาร์และคีย์บอร์ดในการแสดงของชมรมโรงเรียน',
            activityPhoto1Title: 'กิจกรรมภาพถ่าย 1',
            activityPhoto2Title: 'กิจกรรมภาพถ่าย 2',
            activityPhoto3Title: 'กิจกรรมภาพถ่าย 3',
            activityPhoto4Title: 'กิจกรรมภาพถ่าย 4',
            activitySummaryText: 'นี่คือรายละเอียดกิจกรรมที่ยาวขึ้น ซึ่งอธิบายเพิ่มเติมเกี่ยวกับงานที่ฉันทำในแต่ละโปรเจค พร้อมจุดเด่น ความรับผิดชอบ และสิ่งที่เรียนรู้จากการเข้าร่วมกิจกรรมนั้น ๆ',
            backHome: 'กลับสู่หน้าแรก',
            skillsTitle: 'ความสามารถ และ ภาษา',
            abilitiesTitle: 'ความสามารถ',
            abilitiesDescription: 'ความสามารถที่ใช้งานได้จริงและมีประสบการณ์จริง',
            skillPhotography: 'การถ่ายภาพ',
            skillPhotographyDesc: 'ชอบถ่ายรูปวิว ภูเขา ทะเล เมือง',
            skillPlayingMusic: 'การเล่นดนตรี',
            skillPlayingMusicDesc: 'เล่น กีต้าร์ คีย์บอร์ด ได้',
            skillProgramming: 'การเขียนโปรแกรม',
            skillProgrammingDesc: 'สามารถใช้พื้นฐานของ C# Python HTML CSS JAVASCRIPT JAVA .',
            skillThai: 'ภาษาไทย',
            skillThaiDesc: 'เป็นภาษาแม่ ภาษาหลักในการสื่อสาร อ่านเขียนกับผู้อื่น',
            skillEnglish: 'ภาษาอังกฤษ',
            skillEnglishDesc: 'สามารถอ่านเขียนได้ แต่การสื่อสารสามารถสื่อสารได้ระดับนึง',
            skillCreativeWriting: 'ภาษาเขียน',
            skillCreativeWritingDesc: 'สามารถเขียนบรรยายเรียบเรียงภาษาได้ดี',
            eduSchool1Name: 'อนุบาลดวงตะวัน',
            eduSchool2Name: 'สารสาสน์วิเทศคลองหลวง',
            eduSchool3Name: 'ธรรมศาสตร์คลองหลวงวิทยาคม',
            eduDetail1: 'โรงเรียนอนุบาลดวงตะวัน เปิดการเรียนการสอนตั้งแต่ระดับชั้น เตรียมอนุบาล ถึงระดับชั้นอนุบาล 3 ที่มุ่งเน้นเตรียมความพร้อมเด็กก่อนวัยเรียนให้พัฒนาทุก ๆ ด้านอย่างสมดุล',
            eduDetail2: 'เปิดสอนแผนกสองภาษา (Bilingual Programme) และแผนกสามัญ( Mini – Bilingual Programme) ภายใต้ การบริหารงานในเครือสารสาสน์',
            eduDetail3: 'โรงเรียนในสวัสดิการแห่งมหาวิทยาลัยธรรมศาสตร์ เป็นโรงเรียนรัฐบาลในสังกัดสำนักงานเขตพื้นที่การศึกษามัธยมศึกษาปทุมธานี ประเภทโรงเรียนมัธยมศึกษาขนาดใหญ่พิเศษ',
            languagesTitle: 'ภาษา',
            languagesDescription: 'ภาษาที่ใช้ในการสื่อสาร เรียนรู้',
            blogTitle: 'บล็อก',
            article1Title: 'บทความ 1',
            article1Summary: 'สรุปสั้น ๆ ของบทความ...',
            article1Link: 'อ่านเพิ่มเติม',
            article2Title: 'บทความ 2',
            article2Summary: 'สรุปสั้น ๆ ของบทความ...',
            article2Link: 'อ่านเพิ่มเติม',
            contactTitle: 'ข้อมูลติดต่อ',
            phoneLabel: 'โทรศัพท์:',
            addressLabel: 'ที่อยู่:',
            address: '99/56 หมู่ 6, หมู่บ้านพรทวีวัฒน์โครงการ 3,<br>ตำบลคลองสอง, อำเภอคลองหลวง,<br>จังหวัดปทุมธานี',
            facebook: 'Facebook',
            instagram: 'Instagram',
            github: 'GitHub',
            spotify: 'Spotify',
            copyright: '© 2026 ทัพพ์ ทบประดิษฐ์. สงวนลิขสิทธิ์.'
        },
        en: {
            home: 'Home',
            experience: 'Experience & Activities',
            skills: 'Skills',
            blog: 'Blog',
            education: 'Education',
            contact: 'Contact',
            name: 'Tap Thobpradit',
            nickname: 'Nickname: Tap',
            details: '18 October 2008 • 17',
            experienceTitle: 'Experience & Activities',
            experienceYearLabel: 'Year:',
            experienceYear: '2020',
            experienceActivityLabel: 'Activity:',
            experienceActivity: 'Project Name',
            experienceDescriptionLabel: 'Description:',
            experienceDescription: 'A short description of the activity or project.',
            experienceLinkNote: 'Click to view more activity details',
            activitiesPageTitle: 'Special Activities',
            activitiesIntro: 'These are my major activities and projects.',
            activity1Title: 'Science Fair 2022',
            activity1Description: 'Designed a solar-powered model car and presented it at the school event.',
            activity2Title: 'Music Club',
            activity2Description: 'Played guitar and keyboard during school club performances.',
            activityPhoto1Title: 'Activity Photo 1',
            activityPhoto2Title: 'Activity Photo 2',
            activityPhoto3Title: 'Activity Photo 3',
            activityPhoto4Title: 'Activity Photo 4',
            activitySummaryText: 'This is a longer activity summary text that explains what I did in each project in more detail, including highlights, responsibilities, and what I learned from participating.',
            backHome: 'Back to home',
            skillsTitle: 'Skills & Languages',
            abilitiesTitle: 'Abilities',
            abilitiesDescription: 'Practical skills with real experience',
            skillPhotography: 'Photography',
            skillPhotographyDesc: 'Enjoy photographing landscapes, mountains, beaches, and city scenes.',
            skillPlayingMusic: 'Playing Music',
            skillPlayingMusicDesc: 'Can play guitar and keyboard.',
            skillProgramming: 'Programming',
            skillProgrammingDesc: 'Familiar with C#, Python, HTML, CSS, JavaScript, and Java.',
            skillThai: 'Thai',
            skillThaiDesc: 'Native language used for everyday communication in reading and writing.',
            skillEnglish: 'English',
            skillEnglishDesc: 'Able to read and write, with intermediate speaking ability.',
            skillCreativeWriting: 'Creative Writing',
            skillCreativeWritingDesc: 'Can write descriptive and organized text well.',
            education: 'Education',
            eduSchool1Name: 'Duangtawan Kindergarten',
            eduSchool2Name: 'Sarasas Klongluang International School',
            eduSchool3Name: 'Thammasat Klongluang Wittayakom',
            eduDetail1: 'Duangtawan Kindergarten offers early childhood education from preschool to kindergarten 3, focusing on balanced development across every area before formal schooling.',
            eduDetail2: 'The school offers a bilingual programme and a regular programme (Mini-Bilingual) under the Sarasas School network.',
            eduDetail3: 'A welfare school of Thammasat University providing government secondary education in Pathum Thani province with a large, specialized campus.',
            languagesTitle: 'Languages',
            languagesDescription: 'Languages used for communication and learning',
            blogTitle: 'Blog',
            article1Title: 'Article 1',
            article1Summary: 'Short summary of the article...',
            article1Link: 'Read more',
            article2Title: 'Article 2',
            article2Summary: 'Short summary of the article...',
            article2Link: 'Read more',
            contactTitle: 'Contact Info',
            phoneLabel: 'Phone:',
            addressLabel: 'Address:',
            address: '99/56 Moo 6, Phothiwatthana Village Project 3,<br>Khlong Song Subdistrict, Khlong Luang District,<br>Pathum Thani Province',
            facebook: 'Facebook',
            instagram: 'Instagram',
            github: 'GitHub',
            spotify: 'Spotify',
            copyright: '© 2026 Tap Thobpradit. All rights reserved.'
        }
    };

    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                if (key === 'address') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        if (translateButton) {
            translateButton.textContent = lang === 'en' ? 'EN' : 'TH';
            translateButton.setAttribute('aria-label', lang === 'en' ? 'English' : 'Thai');
        }

        // Burger menu toggle
        const burgerMenu = document.getElementById('burger-menu');
        const navUl = document.querySelector('nav ul');
        if (burgerMenu && navUl) {
            burgerMenu.addEventListener('click', function() {
                navUl.classList.toggle('open');
                burgerMenu.classList.toggle('open');
                burgerMenu.textContent = navUl.classList.contains('open') ? '✕' : '☰';
            });
        }

        // Close menu on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navUl && navUl.classList.contains('open')) {
                    navUl.classList.remove('open');
                    burgerMenu.classList.remove('open');
                    if (burgerMenu) burgerMenu.textContent = '☰';
                }
            });
        });

        document.documentElement.lang = lang === 'en' ? 'en' : 'th';
        localStorage.setItem('preferredLanguage', lang);
    }

    function getPreferredLanguage() {
        return localStorage.getItem('preferredLanguage') || 'th';
    }

    if (translateButton) {
        translateButton.addEventListener('click', () => {
            const nextLang = document.documentElement.lang === 'en' ? 'th' : 'en';
            translatePage(nextLang);
        });
    }

    translatePage(getPreferredLanguage());

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function updateHeaderVisibility() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
