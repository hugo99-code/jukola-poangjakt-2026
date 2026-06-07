// --- INITIALISERA SIMULERAD DATABAS ---
const defaultChallenges = [
    // --- 1 POÄNG ---
    { id: "ch1", points: 1, text: "Basta efter din sträcka" },
    { id: "ch2", points: 1, text: "Bjud coach/ledare på en öl" },
    { id: "ch3", points: 1, text: "Drick en finsk dryck (ej öl)" },
    { id: "ch4", points: 1, text: "Fråga vad en grilli makkara kostar trots att det står på skylten" },
    { id: "ch5", points: 1, text: "Gå till duschen med efterföljande sträckans löpare" },
    { id: "ch6", points: 1, text: "Ha med utskriven karta över terrängen" },
    { id: "ch7", points: 1, text: "Heja på din förstasträckslöpare / spring förstasträckan" },
    { id: "ch8", points: 1, text: "Hitta ett ledigt bord vid frukosten på båten" },
    { id: "ch9", points: 1, text: "Köp ett flak med öl" },
    { id: "ch10", points: 1, text: "Köp något från sporttältet" },
    { id: "ch11", points: 1, text: "Låna tvål / shampoo av en främling i duschen" },
    { id: "ch12", points: 1, text: "Läsa högt ur PM med en finsk brytning" },
    { id: "ch13", points: 1, text: "Måla klubbens färger på kinden innan din sträcka" },
    { id: "ch14", points: 1, text: "Packa något onödigt som du aldrig använder under helgen" },
    { id: "ch15", points: 1, text: "Prata med en finsk löpare om terrängen efter målgång" },
    { id: "ch16", points: 1, text: "Smuggla med ett par mackor från frukost-buffén" },
    { id: "ch17", points: 1, text: "Sno med dig en artikel från hytten" },
    { id: "ch18", points: 1, text: "Ta en selfie i en Baja-Maja" },
    { id: "ch19", points: 1, text: "Tre vändor under frukostbuffén" },
    { id: "ch20", points: 1, text: "Vinn två vänd-10 omgångar i rad" },
    // --- 2 POÄNG ---
    { id: "ch21", points: 2, text: "Använd dina egna medhavda säkerhetsnålar" },
    { id: "ch22", points: 2, text: "Bär någon annans väska från bussen till arenan" },
    { id: "ch23", points: 2, text: "Bär Sverigetröja på hemresan" },
    { id: "ch24", points: 2, text: "Besök alla däck på båten" },
    { id: "ch25", points: 2, text: "Beställa mat eller dryck på finska" },
    { id: "ch26", points: 2, text: "Bli godkänd på din sträcka" },
    { id: "ch27", points: 2, text: "Ge dricks till buskern på båten" },
    { id: "ch28", points: 2, text: "Klara skamgränsen (10 min/km)" },
    { id: "ch29", points: 2, text: "Kolla på omstarten" },
    { id: "ch30", points: 2, text: "Konsumera tre öl i bastun" },
    { id: "ch31", points: 2, text: "Köp något från taxfreen som inte går att konsumera" },
    { id: "ch32", points: 2, text: "Måla naglarna i klubbens färger" },
    { id: "ch33", points: 2, text: "Påminn hela bastun att Finland aldrig spelat fotbolls-VM" },
    { id: "ch34", points: 2, text: "Presentera dig själv på knagglig finska för en främling" },
    { id: "ch35", points: 2, text: "Skriv en egen hejaramsa och få tre andra att sjunga med" },
    { id: "ch36", points: 2, text: "Ta bild på soluppgången på söndag morgon" },
    { id: "ch37", points: 2, text: "Ta en lagbild med hela laget" },
    { id: "ch38", points: 2, text: "Ta en selfie med en finsk funktionär" },
    { id: "ch39", points: 2, text: "Vänta in hela klubben innan du går till bussen från arenan" },
    { id: "ch40", points: 2, text: "Värm upp minst 2 km innan din sträcka" },
    // --- 3 POÄNG ---
    { id: "ch41", points: 3, text: "Basta 2 gånger med minst 1 timmes mellanrum" },
    { id: "ch42", points: 3, text: "Drick ett glas av varje alkoholhaltig dryck på buffén" },
    { id: "ch43", points: 3, text: "Få en autograf från en landslagslöpare på valfri kroppsdel" },
    { id: "ch44", points: 3, text: "Få en finne att sjunga en sång på svenska" },
    { id: "ch45", points: 3, text: "Få med alla i bastun på en mexikansk våg" },
    { id: "ch46", points: 3, text: "Gå plus på blackjack" },
    { id: "ch47", points: 3, text: "Gissa rätt på vinnaren i Jukola-kaveln" },
    { id: "ch48", points: 3, text: "Gissa rätt på vinnaren i Venla-kaveln" },
    { id: "ch49", points: 3, text: "Håll dig hela bussresan hem" },
    { id: "ch50", points: 3, text: "Köp nya OL-skor under resan" },
    { id: "ch51", points: 3, text: "Res tor-mån istället för fre-mån" },
    { id: "ch52", points: 3, text: "Spring din sträcka med shorts" },
    { id: "ch53", points: 3, text: "Svepa en öl direkt efter målgång" },
    { id: "ch54", points: 3, text: "Taktik-spy för att kunna dricka mer" },
    { id: "ch55", points: 3, text: "Ät minst 5 stycken grilli makkara under resan" },
    // --- 5 POÄNG ---
    { id: "ch56", points: 5, text: "Besök Sapokka vattenpark" },
    { id: "ch57", points: 5, text: "Ditt lag slår förväntad slutposition" },
    { id: "ch58", points: 5, text: "Få med sig en finsk vägskylt hem" },
    { id: "ch59", points: 5, text: "Konsekvent ha kortbyxor och T-Shirt hela resan" },
    { id: "ch60", points: 5, text: "Köpa en Lakka och lyckas få i sig hela själv" },
    { id: "ch61", points: 5, text: "Låna ut sin medhavda kikare under damstarten" },
    { id: "ch62", points: 5, text: "Övertyga busschauffören om att få sjunga i mikrofonen" },
    { id: "ch63", points: 5, text: "Sov i en annan klubbs tält" },
    { id: "ch64", points: 5, text: "Spring 2 sträckor" },
    { id: "ch65", points: 5, text: "Spring dagssträcka med pannlampa" },
    { id: "ch66", points: 5, text: "Stanna uppe hela Sverige-matchen" },
    { id: "ch67", points: 5, text: "Topp 100 på din sträcka" },
    { id: "ch68", points: 5, text: "Turkdusch istället för vanlig innan buffén" },
    // --- 10 POÄNG ---
    { id: "ch69", points: 10, text: "Bada i finska viken" },
    { id: "ch70", points: 10, text: "Bli intervjuad av lokalmedia" },
    { id: "ch71", points: 10, text: "Ha en halvtom plastkasse som enda packning" },
    { id: "ch72", points: 10, text: "Sov under bar himmel på TC utan sovsäck" },
    { id: "ch73", points: 10, text: "Spring din sträcka med 2 olika skor" },
    { id: "ch74", points: 10, text: "Streaka på TC (ögonvittne behövs)" },
    { id: "ch75", points: 10, text: "Var vaken hela herrstafetten" },
    // --- FÖRST TILL KVARN!  (Använder f-prefix och isFirst: true) ---
    { id: "f1", points: 2, text: "Övertyga busschauffören om en pissi-pausi", isFirst: true },
    { id: "f2", points: 3, text: "Först på plats vid terminalen", isFirst: true },
    { id: "f3", points: 3, text: "Först ut på dansgolvet", isFirst: true },
    { id: "f4", points: 5, text: "Första personen på finsk mark", isFirst: true },
    { id: "f5", points: 5, text: "Leda allsången i bussen", isFirst: true },
    { id: "f6", points: 10, text: "Nudda marken på Åland (på egen risk)", isFirst: true },
    // --- MINUSPOÄNG  (Använder m-prefix) ---
    { id: "m1", points: -2, text: "Gå direkt till jobbet på måndag morgon" },
    { id: "m2", points: -2, text: "Missa målgång för ditt lag" },
    { id: "m3", points: -2, text: "Skippa bastun" },
    { id: "m4", points: -3, text: "Ha med dig stövlar, paraply eller stol" },
    { id: "m5", points: -3, text: "Ha med matlåda hemifrån" },
    { id: "m6", points: -5, text: "Bomtid på >5 min" },
    { id: "m7", points: -5, text: "Spy i bussen, på båten eller annan plats inomhus" },
    { id: "m8", points: -5, text: "Var sen till växlingen" },
    { id: "m9", points: -10, text: "Missa båten hem" },
    { id: "m10", points: -10, text: "Stämpla fel" },
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
        summary.innerHTML = `<span>Först till kvarn </span>`;
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
        summary.innerHTML = `<span>Minuspoäng </span>`;
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