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
            experience1Year: '2568',
            experience1Activity: 'INNOVATION IDEA 2025',
            experience1Description: 'การแข่งขัน INNOVATION IDEA 2025 ภายใต้แนวคิด PLANET GUARD AI เพื่อหาแนวคิดและนวัตกรรมในการแก้ปัญหาด้านสิ่งแวดล้อม',
            experienceLinkNote: 'คลิกเพื่อดูรายละเอียดกิจกรรมเพิ่มเติม',
            experience1_5Year: '2568',
            experience1_5Activity: 'มูลนิธิกระจกเงา',
            experience1_5Description: 'การช่วยเหลืองานในการบริจาค',
            experience2Year: '2568',
            experience2Activity: 'EnviTech Camp 2025',
            experience2Description: 'MICROPLASTIC EXPLORERS อบรมไมโครพลาสติกกับการปนเปื้อนในสิ่งแวดล้อม',
            experience3Year: '2568',
            experience3Activity: 'EnviTech Camp 2025',
            experience3Description: 'Carbon Coin อบรมโลกร้อนและเปลี่ยนแปลงสภาพภูมิอากาศ',
            experience4Year: '2569',
            experience4Activity: 'Dek70Camp',
            experience4Description: 'อบรมเรื่อง GameDesign และการทำงานเป็นทีม',
            experience5Year: '2569',
            experience5Activity: 'GameJamX',
            experience5Description: 'การแข่งขันทำเกมภายใน 3 วัน',
            experience6Year: '2569',
            experience6Activity: 'Thailand Robot & Coding Challenge 2026',
            experience6Description: 'โครงการแข่งขันทักษะเชิงวิศวกรรม Website Competition',
            experience7Year: '2569',
            experience7Activity: 'ลองทำงานเป็น Software Engineer',
            experience7Description: 'การจำลองและเรียนรู้การเป็น Software Engineer',
            experience8Year: '2569',
            experience8Activity: 'Zero to App',
            experience8Description: 'การเรียนรู้เกี่ยวกับการออกแบบซอฟต์แวร์และการคิดเป็นขั้นตอนสำหรับการพัฒนาแอปพลิเคชัน รวมถึงการ prompt AI อย่างมีประสิทธิภาพ',
            activitiesPageTitle: 'กิจกรรมพิเศษ',
            activitiesIntro: 'นี่คือกิจกรรมและโปรเจคสำคัญที่ผมเคยทำ',
            activity1Title: 'งานนิทรรศการวิทยาศาสตร์ 2022',
            activity1Description: 'ออกแบบรถพลังงานแสงอาทิตย์และนำเสนอผลงานในงานโรงเรียน',
            activity2Title: 'ชมรมดนตรี',
            activity2Description: 'เล่นกีตาร์และคีย์บอร์ดในการแสดงของชมรมโรงเรียน',
            activityPhoto1Title: 'ภาพถ่ายกิจกรรม 1',
            activityPhoto2Title: 'ภาพถ่ายกิจกรรม 2',
            activityPhoto3Title: 'ภาพถ่ายกิจกรรม 3',
            activityPhoto4Title: 'ภาพถ่ายกิจกรรม 4',
            activityPhoto5Title: 'ภาพถ่ายกิจกรรม 5',
            activityPhoto6Title: 'ภาพถ่ายกิจกรรม 6',
            activityPhoto7Title: 'ภาพถ่ายกิจกรรม 7',
            activityPhoto8Title: 'ภาพถ่ายกิจกรรม 8',
            activityVideoTitle: 'วิดีโอกิจกรรม',
            activityLinkTitle: 'ลิงค์ผลงาน',
            activityPhoto3PopupLinkText: 'ดูรายละเอียดเพิ่มเติม',
            activitiesExtraText: 'ด้านล่างนี้เป็นตัวอย่างภาพและวิดีโอจากกิจกรรม พร้อมคำอธิบายเพิ่มเติมสำหรับแต่ละโครงการ',

            activitySummaryText1: 'เป็นงานคิดนวัตกรรมที่ช่วยเรื่องฝุ่น PM2.5 ซึ่งทางกลุ่มของเราได้เสนอแนวกสนใช้เทคโนโลยีโดรนปล่อยเมฆเทียม ซึ่งสามารถดูดซับมลพิษในอากาศได้ ผลงานของเราได้ราลวัลรองชนะเลิศอันดับที่ 1 ซึ่งที่ผมได้จากการมาแข่งขันรายการนี้ทำให้ผลได้เสนอไอเดีย ความคิดสร้างสรรค์ ทักษะการแก้ไขปัญหาและการได้ทำงานเป็นทีม',
            activitySummaryText1_5: 'เป็นงานจิตอาสาที่ช่วยเหลืองานต่างๆ อย่างงานที่ผมทำจะเป็นการขนของจากคนที่มาบริจาคมาคัดแยก จัดหมวดหมู่ และแจกจ่ายให้กับผู้ที่ต้องการ ซึ่งสอนให้ผมมีความรับผิดชอบและเป็นมืออาชีพในด้านการทำงาน การทำงานเป็นทีม ทำงานร่วมกับผู้อื่น',
            activitySummaryText2: 'ได้รับการอบรมเกี่ยวกับขยะไมโครพลาสติกที่อยู่รอบๆตัวเรา การป้องกันและแก้ไขพร้อมทั้งผลกระทบที่เกิดขึ้น ผมได้เรียนรู้เกี่ยวกับขยะไมโครพลาสติกและเห็นถึงปัญหา การเสนอไอเดียในการแก้ไขปัญหาต่างๆ',
            activitySummaryText3: 'ได้รับการอบรมเกี่ยวกับปัญหาโลกร้อน การป้องกันและแก้ไขพร้อมทั้งผลกระทบที่เกิดขึ้น ผมได้เรียนรู้เกี่ยวกับการเกิดขึ้นและผลที่ตามมา การเสนอไอเดียในการแก้ไขปัญหาต่างๆ ซึ่งที่ผมได้จากกิจกรรมนี้คือการเรียนรู้เรื่องผลกระทบที่เกิดจากการกระทำของมนุษย์ แนวคิดและการแก้ไขปัญหา',
            activitySummaryText4: 'เป็นกิจกรรมที่เรียนรู้เกี่ยวกับการทำเกม สอนคิด สอนสร้าง และการทำงานเป็นทีมร่วมกันกับผู้อื่นที่ไม่ได้รู้จักกันมาก่อน ได้แนวทางการเรียนต่อ ซึ่งที่ผมได้รับจากกิจกรรมนี้คือการทำงานเป็นทีม การคิดไอเดียที่เป็นระบบ และแนวทางการเรียนต่อ',
            activitySummaryText5: 'งานแข่ง GameJamX ของทาง HamsterHub เป็นงานแข่งทำเกมภายใน 3 วันโดยทางทีมเราได้รับโจทย์เป็น ร้อน ทีมของเราจึงคิดเรื่องของภาวะโลกร้อนและความหัวร้อน ไอเดียเหล่าจึงรวมเป็นเกม Penguin Five Days เป็นเกมเนื้อเรื่อง หลบหลีก โดยผมทำแมพ ระบบ UI และ AI ของนก แม้จะไม่ได้รางวัล แต่ผมได้รับประสบการณ์การวางแผน การทำงานเป็นทีม การสื่อสาร และการแก้ไขปัญหา',
            activitySummaryText6: 'งานแข่ง Website Competition ของทาง Codekit เป็นงานแข่งทำเว็บไซต์ โดยการแข่งจะให้โจทย์เว็บไซต์มาให้เขียนเว็บตามภายในเวลาที่กำหนด โดยผมทำคนเดียว ทำให้ได้รับประสบการณ์จากการแก้ไขความผิดพลาดและพัฒนาฝีมือเพื่อใช้งานในอนาคต',
            activitySummaryText7: 'งานนี้เป็นการได้รู้จักกับอาชีพ Software Engineer กับผู้มีประสบการณ์จริง ได้เรียนรู้พื้นฐานการทำเว็บไซต์และเทคนิคต่างๆ เช่น HTML CSS JavaScript GitHub และ AI พร้อมลงมือทำจริง ซึ่งทำให้ผมได้พัฒนาความรู้และเทคนิคเพื่อใช้ต่อไป',
            activitySummaryText8: 'ค่ายนี้ได้ให้ความรู้เกี่ยวกับการออกแบบซอฟต์แวร์และการคิดเป็นขั้นตอน ซึ่งเป็นทักษะที่สำคัญสำหรับการพัฒนาแอปพลิเคชัน การเรียนรู้เหล่านี้จะช่วยให้ฉันสามารถสร้างแอปพลิเคชันที่มีประสิทธิภาพและตอบสนองความต้องการของผู้ใช้ได้ดีขึ้นในอนาคตและยังมีการ prompt Ai ให้มีประสิทธิภาพมากขึ้นอีกด้วย ซึ่งเป็นทักษะที่สำคัญในการทำงานกับเทคโนโลยี AI ในปัจจุบันและอนาคต',
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
            tcasTitle: 'ตารางชีวิต',
            clickmoreTitle: 'กดเพื่อดูเพิ่มเติม',
            blogTitle: 'บล็อก',
            universityTitle: 'มหาวิทยาลัย',
            university1Title: 'อันดับ 1',
            university1Summary: 'มหาลัยเกษตรศาสตร์ บางเขน',
            university1Summaryer: 'วิศวกรรมศาสตร์ สาขาวิศวะคอมพิวเตอร์',
            university2Title: 'อันดับ 2',
            university2Summary: 'มหาลัยสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
            university2Summaryer: 'วิศวกรรมศาสตร์ สาขาวิศวะคอมพิวเตอร์',
            university3Title: 'อันดับ 3',
            university3Summary: 'มหาลัยเกษตรศาสตร์ บางเขน',
            university3Summaryer: 'วิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์',
            university4Title: 'อันดับ 4',
            university4Summary: 'มหาลัยสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
            university4Summaryer: 'วิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์',
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
            experience1Year: '2025',
            experience1Activity: 'INNOVATION IDEA 2025',
            experience1Description: 'A competition for INNOVATION IDEA 2025 under the concept of PLANET GUARD AI to find innovative ideas and solutions for environmental problems.',
            experience1_5Year: '2025',
            experience1_5Activity: 'foundation Mirror',
            experience1_5Description: 'Volunteering work for donation',
            experienceLinkNote: 'Click to view more activity details',
            experience2Year: '2025',
            experience2Activity: 'EnviTech Camp 2025',
            experience2Description: 'MICROPLASTIC EXPLORERS training on microplastic pollution and environmental contamination.',
            experience3Year: '2025',
            experience3Activity: 'EnviTech Camp 2025',
            experience3Description: 'Carbon Coin training on global warming and climate change.',
            experience4Year: '2026',
            experience4Activity: 'Dek70Camp',
            experience4Description: 'Training on Game Design and teamwork.',
            experience5Year: '2026',
            experience5Activity: 'GameJamX',
            experience5Description: 'A 3-day game development competition.',
            experience6Year: '2026',
            experience6Activity: 'Thailand Robot & Coding Challenge 2026',
            experience6Description: 'An engineering challenge for a website competition.',
            experience7Year: '2026',
            experience7Activity: 'Software Engineer Workshop',
            experience7Description: 'A simulation and learning experience for becoming a Software Engineer.',
            experience8Year: '2026',
            experience8Activity: 'Zero to App',
            experience8Description: 'Training on software design and step-by-step thinking for application development, along with effective AI prompting skills.',
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
            activityPhoto5Title: 'Activity Photo 5',
            activityPhoto6Title: 'Activity Photo 6',
            activityPhoto7Title: 'Activity Photo 7',
            activityPhoto8Title: 'Activity Photo 8',
            activityVideoTitle: 'Activity Video',
            activityLinkTitle: 'Activity Work Link',
            activityPhoto3PopupLinkText: 'See more details',
            activitiesExtraText: 'Below are sample photos and videos from the activities, along with extra details about each project.',

            activitySummaryText1: 'This innovation project addressed PM2.5 pollution. Our team proposed using drones to release artificial clouds to absorb airborne pollutants. We won second place, and I gained experience generating ideas, creative thinking, problem solving, and teamwork.',
            activitySummaryText1_5: 'This was a volunteer activity assisting with various tasks such as sorting and distributing donated items to those in need. It taught me responsibility, professionalism in work, teamwork, and collaboration with others.',
            activitySummaryText2: 'I attended training on microplastic pollution around us, how to prevent and solve it, and its impacts. I learned about microplastics and how to propose solutions to reduce contamination.',
            activitySummaryText3: 'I learned about global warming, prevention, and consequences. I gained insight into how environmental damage happens and how to propose ideas for solving these problems.',
            activitySummaryText4: 'This event taught game creation, structured thinking, and teamwork with new people. I gained direction for further study and learned how to work in a team and develop game ideas.',
            activitySummaryText5: 'The HamsterHub GameJamX competition challenged us to create a game in three days with the theme of heat. We developed Penguin Five Days, a survival game where the player collects fish, avoids flying enemies, and survives until help arrives. I worked on maps, UI, and bird AI, and I learned planning, teamwork, communication, and problem solving.',
            activitySummaryText6: 'The Codekit Website Competition required building a website from a given brief within a time limit. I worked alone, which taught me how to correct mistakes and improve my skills for future projects.',
            activitySummaryText7: 'This workshop introduced the Software Engineer career with real professionals and taught website basics and techniques using HTML, CSS, JavaScript, GitHub, and AI. I gained hands-on experience and knowledge to continue developing my skills.',
            activitySummaryText8: 'This camp provided knowledge about software design and step-by-step thinking, which are important skills for application development. These learnings will help me create efficient applications that meet user needs in the future. It also included training on effective AI prompting, which is crucial for working with AI technology today and in the future.',
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
            tcasTitle: 'Life Schedule',
            clickmoreTitle: 'Click To See More Information',
            blogTitle: 'Blog',
            universityTitle: 'University',
            university1Title: 'First Place',
            university1Summary: 'Kasetsaer University',
            university1Summaryer: 'Faculty of Enginerring ,Computer Engineering',
            university2Title: 'Second Place',
            university2Summary: 'KMITL',
            university2Summaryer: 'Faculty of Enginerring ,Computer Engineering',
            university3Title: 'Third Place',
            university3Summary: 'Kasetsaer University',
            university3Summaryer: 'Faculty of Science ,Computer Science',
            university4Title: 'Forth Place',
            university4Summary: 'KMITL',
            university4Summaryer: 'Faculty of Science ,Computer Science',
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

    function createLightbox(type, src, altText, popupLink, popupLinkText) {
        const existingOverlay = document.querySelector('.lightbox-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.tabIndex = -1;

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => overlay.remove());

        let media;
        if (type === 'video') {
            media = document.createElement('video');
            media.src = src;
            media.controls = true;
            media.autoplay = true;
            media.playsInline = true;
            media.muted = false;
            media.className = 'lightbox-media';
        } else {
            media = document.createElement('img');
            media.src = src;
            media.alt = altText || '';
            media.className = 'lightbox-media';
        }

        content.appendChild(closeButton);
        content.appendChild(media);

        if (popupLink) {
            const linkButton = document.createElement('a');
            linkButton.href = popupLink;
            linkButton.target = '_blank';
            linkButton.rel = 'noopener noreferrer';
            linkButton.className = 'lightbox-link-button';
            linkButton.textContent = popupLinkText || 'Learn more';
            content.appendChild(linkButton);
        }

        overlay.appendChild(content);

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                overlay.remove();
            }
        });

        document.body.appendChild(overlay);
    }

    function initMediaLightbox() {
        const mediaItems = document.querySelectorAll('.activity-photo-card img, .activity-photo-card video');
        mediaItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const isVideo = item.tagName.toLowerCase() === 'video';
                const src = item.getAttribute('src') || item.currentSrc;
                const altText = item.getAttribute('alt') || '';
                const popupLink = item.dataset.popupLink || '';
                const popupLinkTextKey = item.dataset.popupLinkTextKey || '';
                const popupLinkText = popupLinkTextKey && translations[document.documentElement.lang] ? translations[document.documentElement.lang][popupLinkTextKey] : '';
                if (src) {
                    createLightbox(isVideo ? 'video' : 'image', src, altText, popupLink, popupLinkText);
                }
            });
        });
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
    initMediaLightbox();

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
