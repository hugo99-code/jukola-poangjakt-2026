// --- INITIALISERA SIMULERAD DATABAS ---
const defaultChallenges = [
    { id: "ch1", points: 1, text: "Basta efter din sträcka" },
    { id: "ch2", points: 1, text: "Bjuda coach/ledare på en öl" },
    { id: "ch3", points: 2, text: "Beställa mat eller dryck på finska" },
    { id: "ch4", points: 2, text: "Taktik-spy för att kunna dricka mer" },
    { id: "ch5", points: 3, text: "Svepa en öl direkt efter målgång" },
    { id: "ch6", points: 5, text: "Köpa en Lakka och lyckas få i sig hela själv" },
    { id: "ch7", points: 10, text: "Hållit dig vaken genom HELA herrkavlen" },
    { id: "f1", points: 3, text: "Fråga busschauffören om en pissi-pausi", isFirst: true },
    { id: "f2", points: 5, text: "Genomför en godkänd shotgun (filmbevis krävs)", isFirst: true },
    { id: "m1", points: -1, text: "Ha med sig stövlar, paraply eller stol" },
    { id: "m2", points: -5, text: "Bommat en kontroll med mer än 10 minuter" },
    { id: "m3", points: -10, text: "Missa båten hem" },
];

let db_users = JSON.parse(localStorage.getItem("db_users")) || [];
let db_challenges = JSON.parse(localStorage.getItem("db_challenges_v3")) || defaultChallenges;
if (!localStorage.getItem("db_challenges_v3")) {
    localStorage.setItem("db_challenges_v3", JSON.stringify(db_challenges));
}

let currentUser = JSON.parse(localStorage.getItem("current_session")) || null;
const positiveTiers = [1, 2, 3, 5, 10];

// --- VID START ---
window.addEventListener("DOMContentLoaded", () => {
    if (currentUser) {
        currentUser = db_users.find(u => u.username === currentUser.username) || currentUser;
        showGameView();
    } else {
        switchView("login-view");
    }
});

// --- NAVIGATION ---
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    
    if (viewId === "game-view") {
        renderAllAccordions(false); // FALSE = Starta alltid med STÄNGDA menyer vid sidbyte/inloggning
        renderLeaderboard();
    } else if (viewId === "admin-view") {
        renderAdminUsers();
    }
}

// --- INLOGGNING & REGISTRERING ---
function handleAuth(type) {
    const userIn = document.getElementById("username-input").value.trim();
    const passIn = document.getElementById("password-input").value.trim();
    const errorText = document.getElementById("login-error");

    if (!userIn || !passIn) {
        errorText.innerText = "Fyll i både namn och lösenord!";
        return;
    }

    const existingUser = db_users.find(u => u.username.toLowerCase() === userIn.toLowerCase());

    if (type === 'register') {
        if (existingUser) {
            errorText.innerText = "Namnet är redan taget!";
            return;
        }
        const newUser = {
            username: userIn,
            password: passIn,
            isAdmin: userIn.toLowerCase() === 'admin',
            completed: []
        };
        db_users.push(newUser);
        saveDB();
        currentUser = newUser;
        showGameView();
    } 
    
    if (type === 'login') {
        if (!existingUser || existingUser.password !== passIn) {
            errorText.innerText = "Fel användarnamn eller lösenord!";
            return;
        }
        currentUser = existingUser;
        showGameView();
    }
}

function handleSelfReset() {
    const usernameIn = document.getElementById("reset-username-input").value.trim();
    const newPasswordIn = document.getElementById("reset-password-input").value.trim();
    const messageText = document.getElementById("reset-message");

    if (!usernameIn || !newPasswordIn) {
        messageText.innerText = "Fyll i både användarnamn och nytt lösenord!";
        return;
    }

    const userIndex = db_users.findIndex(u => u.username.toLowerCase() === usernameIn.toLowerCase());

    if (userIndex === -1) {
        messageText.innerText = `Hittade ingen löpare med namnet "${usernameIn}"`;
        return;
    }

    db_users[userIndex].password = newPasswordIn;
    saveDB();

    messageText.style.color = "#2ecc71";
    messageText.innerText = "Lösenordet har uppdaterats framgångsrikt!";

    setTimeout(() => {
        document.getElementById("reset-username-input").value = "";
        document.getElementById("reset-password-input").value = "";
        messageText.innerText = "";
        switchView("login-view");
    }, 1500);
}

function showGameView() {
    localStorage.setItem("current_session", JSON.stringify(currentUser));
    document.getElementById("welcome-text").innerText = `Löpare: ${currentUser.username}`;
    
    if (currentUser.isAdmin) {
        document.getElementById("admin-nav-btn").classList.remove("hidden");
    } else {
        document.getElementById("admin-nav-btn").classList.add("hidden");
    }
    
    document.getElementById("username-input").value = "";
    document.getElementById("password-input").value = "";
    document.getElementById("login-error").innerText = "";
    switchView("game-view");
}

function logout() {
    localStorage.removeItem("current_session");
    currentUser = null;
    switchView("login-view");
}

// Lägg till (keepOpen = false) på raden nedanför:
function renderAllAccordions(keepOpen = false) {
    const container = document.getElementById("accordion-container");

    // Spara bara öppna menyer om keepOpen är sant (vilket det är när man klickar på en checkbox)
    const openTiers = [];
    if (keepOpen) {
        container.querySelectorAll("details[open]").forEach(details => {
            openTiers.push(details.getAttribute("data-tier"));
        });
    }

    container.innerHTML = "";

    // ... (Hela resten av renderAllAccordions-funktionen förblir exakt likadan som innan)

    // --- 2. POSITIVA MENYER ---
    positiveTiers.forEach(tier => {
        const tierChallenges = db_challenges.filter(ch => ch.points === tier && !ch.isFirst);
        if (tierChallenges.length === 0) return;

        const details = document.createElement("details");
        details.setAttribute("data-tier", tier); // Sätt en etikett
        if (openTiers.includes(String(tier))) details.open = true; // Öppna om den var öppen innan!

        const summary = document.createElement("summary");
        summary.innerHTML = `<span>${tier} Poäng</span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        tierChallenges.forEach(ch => {
            const isChecked = currentUser.completed.includes(ch.id) ? "checked" : "";
            itemHtml(ch, isChecked, listDiv);
        });

        details.appendChild(listDiv);
        container.appendChild(details);
    });

    // --- 3. SPECIALMENY: FÖRST TILL KVARN!  ---
    const firstChallenges = db_challenges.filter(ch => ch.isFirst === true);
    if (firstChallenges.length > 0) {
        const details = document.createElement("details");
        details.className = "first-accordion";
        details.setAttribute("data-tier", "first"); // Sätt en etikett
        if (openTiers.includes("first")) details.open = true; // Öppna om den var öppen innan!
        
        const summary = document.createElement("summary");
        summary.innerHTML = `<span>Först till kvarn! </span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        firstChallenges.forEach(ch => {
            const takenByUser = db_users.find(u => u.completed.includes(ch.id));
            
            let isChecked = "";
            let isDisabled = "";
            let statusText = ` [${ch.points}p]`;
            let isTakenByOther = false;

            if (takenByUser) {
                if (takenByUser.username === currentUser.username) {
                    isChecked = "checked";
                } else {
                    isDisabled = "disabled";
                    statusText = ` ❌ [Tagen av ${takenByUser.username}]`;
                    isTakenByOther = true;
                }
            }

            const itemDiv = document.createElement("div");
            itemDiv.className = `challenge-item ${isTakenByOther ? 'taken' : ''}`;
            itemDiv.innerHTML = `
                <label>
                    <input type="checkbox" ${isChecked} ${isDisabled} onchange="toggleChallenge('${ch.id}')">
                    <span><strong class="points-label">${statusText}</strong> ${ch.text}</span>
                </label>
            `;
            listDiv.appendChild(itemDiv);
        });

        details.appendChild(listDiv);
        container.appendChild(details);
    }

    // --- 4. MINUS-MENY ---
    const minusChallenges = db_challenges.filter(ch => ch.points < 0 && !ch.isFirst);
    if (minusChallenges.length > 0) {
        minusChallenges.sort((a, b) => b.points - a.points);
        const details = document.createElement("details");
        details.className = "minus-accordion";
        details.setAttribute("data-tier", "minus"); // Sätt en etikett
        if (openTiers.includes("minus")) details.open = true; // Öppna om den var öppen innan!

        const summary = document.createElement("summary");
        summary.innerHTML = `<span>Minuspoäng ⚠️</span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        minusChallenges.forEach(ch => {
            const isChecked = currentUser.completed.includes(ch.id) ? "checked" : "";
            itemHtml(ch, isChecked, listDiv, true);
        });
        details.appendChild(listDiv);
        container.appendChild(details);
    }
}

function itemHtml(ch, isChecked, parentContainer, showPoints = false) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "challenge-item";
    const pointsBadge = showPoints ? `<span class="minus-badge">[${ch.points}p]</span> ` : "";
    itemDiv.innerHTML = `
        <label>
            <input type="checkbox" ${isChecked} onchange="toggleChallenge('${ch.id}')">
            <span>${pointsBadge}${ch.text}</span>
        </label>
    `;
    parentContainer.appendChild(itemDiv);
}

function toggleChallenge(id) {
    if (currentUser.completed.includes(id)) {
        currentUser.completed = currentUser.completed.filter(chId => chId !== id);
    } else {
        currentUser.completed.push(id);
    }
    
    const userIndex = db_users.findIndex(u => u.username === currentUser.username);
    db_users[userIndex].completed = currentUser.completed;
    
    saveDB();
    
    renderAllAccordions(true); // TRUE = Behåll menyn öppen när man klickar i en ruta!
    renderLeaderboard();
}

function renderLeaderboard() {
    const board = document.getElementById("leaderboard-body");
    board.innerHTML = "";

    const scoreboard = db_users
        .filter(user => !user.isAdmin)
        .map(user => {
            let score = 0;
            db_challenges.forEach(ch => {
                if (user.completed.includes(ch.id)) {
                    score += ch.points;
                }
            });
            return { name: user.username, points: score };
        });

    scoreboard.sort((a, b) => b.points - a.points);

    scoreboard.forEach((player, index) => {
        board.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td><strong>${player.points} p</strong></td>
            </tr>
        `;
    });
}

// --- ADMIN-FUNKTIONER ---
function addChallengeFromAdmin() {
    const textIn = document.getElementById("new-ch-text").value.trim();
    const pointsIn = parseInt(document.getElementById("new-ch-points").value);

    if (!textIn) return;

    const newCh = {
        id: "ch_" + Date.now(),
        points: pointsIn,
        text: textIn
    };

    db_challenges.push(newCh);
    localStorage.setItem("db_challenges_v3", JSON.stringify(db_challenges));
    
    document.getElementById("new-ch-text").value = "";
    alert("Utmaning tillagd!");
}

function renderAdminUsers() {
    const board = document.getElementById("admin-users-body");
    board.innerHTML = "";

    db_users.forEach(user => {
        board.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td><span style="color: ${user.isAdmin ? '#e67e22' : '#2ecc71'}; font-weight: bold;">${user.isAdmin ? 'Admin' : 'Tävlande'}</span></td>
            </tr>
        `;
    });
}

function saveDB() {
    localStorage.setItem("db_users", JSON.stringify(db_users));
}

function resetWholeApp() {
    const safeCheck = confirm("ÄR DU HELT SÄKER?\n\nDetta kommer att radera ALLA registrerade löpare, nollställa alla poäng och återställa appen till källkoden i VS Code. Detta går inte att ångra!");
    if (safeCheck) {
        localStorage.clear();
        location.reload();
    }
}