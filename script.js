// Center main window on load
window.onload = () => {
        const mainWin = document.getElementById("main-window");
        const centerX = (window.innerWidth - mainWin.offsetWidth) / 2;
        const centerY = (window.innerHeight - mainWin.offsetHeight) / 2;
        mainWin.style.left = `${centerX}px`;
        mainWin.style.top = `${centerY}px`;
};

let windowOffsetX = 150;
let windowOffsetY = 150;

let isMuted = false;
let isDarkMode = false;

function playSound() {
        if (isMuted) return;
        const audio = document.getElementById("click-sound");
        if (audio) {
                audio.currentTime = 0;
                audio.play();
        }
}

function toggleSound() {
        isMuted = !isMuted;
        const btn = document.querySelector('#toolbar button:nth-child(2)');
        btn.textContent = isMuted ? "🔇 Sound" : "🔊 Sound";
}

function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        const btn = document.querySelector('#toolbar button:nth-child(1)');
        btn.textContent = isDarkMode ? "🌞 Light" : "🌓 Theme";
}


function openWindow(type) {
        const existing = document.getElementById(`win-${type}`);
        if (existing) {
                existing.style.zIndex = Date.now(); // bring to front
                return;
        }

        const content = {
                about: `<p><i class="fa-solid fa-user-tie"></i> I'm a IT teacher with a passion for sharing knowledge and helping others grow.
        <br/>
            </br>
<i class="fa-solid fa-graduation-cap"></i> Graduated with a degree in BSIT (Bachelor of Science in Information Technology).
<br/>
</br>
<i class="fa-solid fa-code"></i> Currently exploring web development—learning, building, and improving every day.
<br/>
        </br>
<i class="fa-solid fa-user-plus"></i> Worked in technical support for several years, solving real-world tech problems and gaining hands-on experience.
<br/>
        </br>
<i class="fa-solid fa-magnifying-glass-chart"></i> Now pursuing a career that blends both teaching and tech, doing what I love.
<br/>
        </br>
<i class="fa-solid fa-lightbulb"></i> I enjoy turning ideas into functional, user-friendly websites and learning new things along the way.
<br/>
        </br>
<i class="fa-solid fa-robot"></i> Tech Stacks I’m working with:
<br/>
        </br>
<em>
* HTML, CSS, JavaScript
<br/>
        </br>
* Responsive design & animations
<br/>
        </br>
* React (beginner level)
<br/>
        </br>
* VS Code, GitHub
<br/>
        <br/>
                </br> </em>
<i class="fa-solid fa-lines-leaning"></i> Always learning, always tinkering—one line of code at a time! <i class="fa-solid fa-laptop-file"></i></p>`,
                work: `<p><em>Here are some of the websites I’ve worked on so far—each one helping me grow as a developer:</em>
<br/>
        </br>
<i class="fa-solid fa-blog"></i> <strong>Landing Page</strong>
Clean, responsive landing pages designed to grab attention and drive action. Built using HTML, CSS, and JavaScript.<br/> <i class="fa-solid fa-globe"></i> Take a Look → <a href="https://zirkreates.github.io/ramen/" target="_blank" style="display:inline-block; background:#007bff; color:white; padding:6px 12px; border-radius:4px; text-decoration:none;">Ramen House</a>
<br/>
        </br>
<i class="fa-solid fa-right-to-bracket"></i> <strong>Login Page</strong>
A simple and clean login UI built with HTML, CSS, and JavaScript. Focused on user-friendly design with form validation and responsive layout. A great starting point for future authentication systems.<br/> <i class="fa-solid fa-globe"></i> Take a Look → <a href="https://zirkreates.github.io/login-page/" target="_blank" style="display:inline-block; background:#007bff; color:white; padding:6px 12px; border-radius:4px; text-decoration:none;">Simple Login</a>
<br/>
        </br>
<i class="fa-solid fa-person-chalkboard"></i> <strong>Tutoring Services Page</strong>
A colorful, bold landing page designed for tutors or teachers to promote their services and connect with students online.<br/> <i class="fa-solid fa-globe"></i> Take a Look → <a href="https://zirkreates.github.io/service-landing-page/" target="_blank" style="display:inline-block; background:#007bff; color:white; padding:6px 12px; border-radius:4px; text-decoration:none;">Icela Mari</a>
<br/>
        </br>
<i class="fa-solid fa-chalkboard-user"></i> <strong>Portfolio Website</strong>
My personal online space where I showcase my work, skills, and journey into web development. Includes smooth animations and a contact form.<br/> <i class="fa-solid fa-globe"></i> Take a Look → <a href="https://zirkreates.github.io/my-portfolio/" target="_blank" style="display:inline-block; background:#007bff; color:white; padding:6px 12px; border-radius:4px; text-decoration:none;">Portfolio</a>
<br/>
<br/>
        </br>
        <i class="fa-solid fa-gears"></i> I'm still cooking up more projects — stay tuned! <i class="fa-solid fa-fire"></i>
<br/>
        </br>
</p>`,
                contact: `<p><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> zirk.dev@gmail.com
        <br/>
        </br>
<i class="fa-solid fa-mobile-retro"></i> <strong>Phone:</strong> 0991 335 4775
<br/>
        </br>
<i class="fa-solid fa-handshake-angle"></i> Feel free to reach out for collaborations, projects, or just to say hi! <i class="fa-solid fa-hands-clapping"></i></p>`
        };

        const win = document.createElement("div");
        win.className = "window";
        win.id = `win-${type}`;
        // Check if saved position exists
        const savedPos = JSON.parse(localStorage.getItem(`pos-win-${type}`));
        if (savedPos) {
                win.style.left = `${savedPos.x}px`;
                win.style.top = `${savedPos.y}px`;
        } else {
                win.style.top = `${windowOffsetY}px`;
                win.style.left = `${windowOffsetX}px`;
                windowOffsetX += 30;
                windowOffsetY += 30;
                if (windowOffsetX > window.innerWidth - 300) windowOffsetX = 150;
                if (windowOffsetY > window.innerHeight - 200) windowOffsetY = 150;
        }


        // Increment for next window
        windowOffsetX += 30;
        windowOffsetY += 30;

        // Reset if it goes too far off screen
        if (windowOffsetX > window.innerWidth - 300) windowOffsetX = 150;
        if (windowOffsetY > window.innerHeight - 200) windowOffsetY = 150;


        win.innerHTML = `
    <div class="window-header" id="header-${type}">
      <span>${type.toLowerCase()}</span>
      <button class="close-btn" onclick="closeWindow('win-${type}')">❌</button>
    </div>
    <div class="window-body">
      ${content[type] || "<p>No content yet</p>"}
    </div>
  `;

        document.body.appendChild(win);
        makeDraggable(`win-${type}`, `header-${type}`);
        playSound();
}

function closeWindow(id) {
        const win = document.getElementById(id);
        if (win) {
                win.remove();
                playSound();
        }
}

function makeDraggable(winId, headerId) {
        const win = document.getElementById(winId);
        const header = document.getElementById(headerId);
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        // Disable drag for mobile/touch
        if (window.innerWidth < 768) return;

        header.addEventListener("mousedown", (e) => {
                isDragging = true;
                offsetX = e.clientX - win.offsetLeft;
                offsetY = e.clientY - win.offsetTop;
                win.style.zIndex = Date.now();
        });

        document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                        const x = e.clientX - offsetX;
                        const y = e.clientY - offsetY;
                        win.style.left = `${x}px`;
                        win.style.top = `${y}px`;

                        // Save window position
                        localStorage.setItem(`pos-${winId}`, JSON.stringify({ x, y }));
                }
        });

        document.addEventListener("mouseup", () => {
                isDragging = false;
        });
}


