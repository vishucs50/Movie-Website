function loadPage(page) {
    location.hash = page.toLowerCase();
}

function handleHashChange() {
    let page = location.hash.substring(1).toLowerCase() || "home";
    let contentDiv = document.getElementById("moviecontainer");

    if (!contentDiv) {
        console.error("Error: #moviecontainer not found!");
        return;
    }

    const routes = {
        home: `
            <div class="popular">
                <h3>Popular Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="popularmov"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="horror">
                <h3>Horror Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="horrormov"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="action">
                <h3>Action Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="actionmov"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="comedy">
                <h3>Comedy Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="commov"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
        `,
        popular: `<h2>POPULAR</h2>`,
        contact: `
            <div style="max-width: 500px; margin: auto; padding: 20px;">
                <h2 style="color: #ffcc00;">📞 Get in Touch with Us! 🎬</h2>
                <p><strong style="color:white">Email Support:</strong> 📩 
                    <a href="mailto:support@screenscape.com" style="color: #ffcc00; text-decoration: none; font-weight: bold;">
                        support@screenscape.com
                    </a>
                </p>
                <p><strong style="color: white">Phone Number:</strong> 📱 
                    <a href="tel:+91" style="color: #ffcc00; text-decoration: none; font-weight: bold;">
                        +91 XXXXX XXXXX
                    </a>
                </p>
                <p style="color: white"><strong>Address:</strong> 🏢 123 Movie Street, Hollywood, CA</p>
            </div>`
    };

    contentDiv.innerHTML = routes[page] || "<h2>Page Not Found</h2>";

    // Helper function to load a script with Promises
    function loadScript(id, src) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) {
                resolve();
                return;
            }

            let script = document.createElement("script");
            script.src = src;
            script.id = id;
            script.onload = () => resolve();
            script.onerror = () => reject(`Error loading ${src}!`);
            document.body.appendChild(script);
        });
    }

    // Load `slider.js` for home page
    if (page === "home") {
        loadScript("dynamic-script", "slider.js")
            .then(() => {
                console.log("slider.js loaded successfully!");
                popular();
                byid(27, "horrormov", "hr");
                byid(28, "actionmov", "ac");
                byid(35, "commov", "cmd");
            })
            .catch(console.error);
    }

    // Load `popular.js` for popular page
    if (page === "popular") {
        loadScript("pop-script", "popular.js")
            .then(() => {
                console.log("popular.js loaded successfully!");
                popularjs();
            })
            .catch(console.error);
    }
}

// Run on hash change and initial load
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", handleHashChange);
