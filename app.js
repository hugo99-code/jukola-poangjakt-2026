// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU3nCXEjnHGU-gl76NUEHyXeqG-gwRrgc",
    authDomain: "jukola-poangjakt-2026.firebaseapp.com",
    databaseURL: "https://jukola-poangjakt-2026-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "jukola-poangjakt-2026",
    storageBucket: "jukola-poangjakt-2026.firebasestorage.app",
    messagingSenderId: "106416764516",
    appId: "1:106416764516:web:45cc663051ba6431029171"
};

// --- KORREKT INITIERING FÖR COMPAT-SKRIPTEN ---
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 3. Lyssna på databasen i REALTIID
database.ref('jukola_data').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data && data.users) {
        db_users = data.users; // Hämta färska användare från Firebase
    } else {
        db_users = []; // Om databasen är helt tom
    }
    
    // SPREKOFS-SÄKRING: Om en löpare är inloggad, synka deras lokala kryssboxar med molnet
    if (currentUser) {
        const foundMe = db_users.find(u => u.username === currentUser.username);
        if (foundMe) {
            currentUser = foundMe; // Nu har vi exakt rätt 'completed'-lista från molnet
        }
    }

    // Rita om gränssnittet (Nu med keepOpen = true så att inte menyerna stängs när någon annan sparar!)
    renderLeaderboard();
    
    if (currentUser) {
        renderAllAccordions(true); 
    }
    
    if (document.getElementById("admin-view") && document.getElementById("admin-view").style.display === "block") {
        renderAdminUsers();
    }
});

// --- INITIALISERA SIMULERAD DATABAS ---
const defaultChallenges = [
    // --- 1 POÄNG ---
    { id: "ett1", points: 1, text: "Basta efter din sträcka" },
    { id: "ett2", points: 1, text: "Bjud coach/ledare på en öl" },
    { id: "ett3", points: 1, text: "Drick en finsk dryck (ej öl)" },
    { id: "ett4", points: 1, text: "Fråga vad en grilli makkara kostar trots att det står på skylten" },
    { id: "ett5", points: 1, text: "Gå till duschen med efterföljande sträckans löpare" },
    { id: "ett6", points: 1, text: "Ha med utskriven karta över terrängen" },
    { id: "ett7", points: 1, text: "Heja på din förstasträckslöpare / spring förstasträckan" },
    { id: "ett8", points: 1, text: "Hitta ett ledigt bord vid frukosten på båten" },
    { id: "ett9", points: 1, text: "Köp ett flak med öl" },
    { id: "ett10", points: 1, text: "Köp något från sporttältet" },
    { id: "ett11", points: 1, text: "Låna tvål / shampoo av en främling i duschen" },
    { id: "ett12", points: 1, text: "Läsa högt ur PM med en finsk brytning" },
    { id: "ett13", points: 1, text: "Måla klubbens färger på kinden innan din sträcka" },
    { id: "ett14", points: 1, text: "Packa något onödigt som du aldrig använder under helgen" },
    { id: "ett15", points: 1, text: "Prata med en finsk löpare om terrängen efter målgång" },
    { id: "ett16", points: 1, text: "Smuggla med ett par mackor från frukost-buffén" },
    { id: "ett17", points: 1, text: "Sno med dig en artikel från hytten" },
    { id: "ett18", points: 1, text: "Ta en selfie i en Baja-Maja" },
    { id: "ett19", points: 1, text: "Tre vändor under frukostbuffén" },
    { id: "ett20", points: 1, text: "Vinn två vänd-10 omgångar i rad" },
    { id: "ett21", points: 1, text: "Fira med ett glas bubbel i bussen" },
    { id: "ett22", points: 1, text: "Var aktiv på lagmötet på båten" },
    { id: "ett23", points: 1, text: "Sjung med i nationalsången innan matchen" },
    { id: "ett24", points: 1, text: "Håll dig från att klaga på domaren hela matchen" },
    { id: "ett25", points: 1, text: "Nervösskit innan din sträcka" },
    { id: "ett26", points: 1, text: "Konsumera en hel burk Toms pingvinlakrits" },
    { id: "ett27", points: 1, text: "Växla med en öl" },
    { id: "ett28", points: 1, text: "Ropa ut en kodsiffra på finska under din sträcka" },
    { id: "ett29", points: 1, text: "Ladda upp ditt lopp på både Strava och Livelox" },
    { id: "ett30", points: 1, text: "Ge 10 kudos till andras Jukolalopp" },
    // --- 2 POÄNG ---
    { id: "två1", points: 2, text: "Använd dina egna medhavda säkerhetsnålar" },
    { id: "två2", points: 2, text: "Bär någon annans väska från bussen till arenan" },
    { id: "två3", points: 2, text: "Bär Sverigetröja på hemresan" },
    { id: "två4", points: 2, text: "Besök alla däck på båten" },
    { id: "två5", points: 2, text: "Beställa mat eller dryck på finska" },
    { id: "två6", points: 2, text: "Bli godkänd på din sträcka" },
    { id: "två7", points: 2, text: "Ge dricks till buskern på båten" },
    { id: "två8", points: 2, text: "Klara skamgränsen (10 min/km)" },
    { id: "två9", points: 2, text: "Kolla på omstarten" },
    { id: "två10", points: 2, text: "Konsumera tre öl i bastun" },
    { id: "två11", points: 2, text: "Köp något från taxfreen som inte går att konsumera" },
    { id: "två12", points: 2, text: "Måla naglarna i klubbens färger" },
    { id: "två13", points: 2, text: "Påminn hela bastun att Finland aldrig spelat fotbolls-VM" },
    { id: "två14", points: 2, text: "Presentera dig själv på knagglig finska för en främling" },
    { id: "två15", points: 2, text: "Skriv en egen hejaramsa och få tre andra att sjunga med" },
    { id: "två16", points: 2, text: "Ta bild på soluppgången på söndag morgon" },
    { id: "två17", points: 2, text: "Ta en lagbild med hela laget" },
    { id: "två18", points: 2, text: "Ta en selfie med en finsk funktionär" },
    { id: "två19", points: 2, text: "Vänta in hela klubben innan du går till bussen från arenan" },
    { id: "två20", points: 2, text: "Värm upp minst 2 km innan din sträcka" },
    { id: "två21", points: 2, text: "Jogga ned minst 2 km efter din sträcka" },
    { id: "två22", points: 2, text: "Bär en Sverige accessoar till matchen" },
    { id: "två23", points: 2, text: "Snabbast spurt i laget" },
    { id: "två24", points: 2, text: "Lägg ut ett Instagraminlägg om Jukolaresan" },
    { id: "två25", points: 2, text: "Hjälp till att plocka och packa ned klubbens tält" },
    // --- 3 POÄNG ---
    { id: "tre1", points: 3, text: "Basta 2 gånger med minst 1 timmes mellanrum" },
    { id: "tre2", points: 3, text: "Drick ett glas av varje alkoholhaltig dryck på buffén" },
    { id: "tre3", points: 3, text: "Få en autograf från en landslagslöpare på valfri kroppsdel" },
    { id: "tre4", points: 3, text: "Få en finne att sjunga en sång på svenska" },
    { id: "tre5", points: 3, text: "Få med alla i bastun på en mexikansk våg" },
    { id: "tre6", points: 3, text: "Gå plus på blackjack" },
    { id: "tre7", points: 3, text: "Gissa rätt på vinnaren i Jukola-kaveln" },
    { id: "tre8", points: 3, text: "Gissa rätt på vinnaren i Venla-kaveln" },
    { id: "tre9", points: 3, text: "Håll dig hela bussresan hem" },
    { id: "tre10", points: 3, text: "Köp nya OL-skor under resan" },
    { id: "tre11", points: 3, text: "Res tor-mån istället för fre-mån" },
    { id: "tre12", points: 3, text: "Spring din sträcka med shorts" },
    { id: "tre13", points: 3, text: "Svepa en öl direkt efter målgång" },
    { id: "tre14", points: 3, text: "Taktik-spy för att kunna dricka mer" },
    { id: "tre15", points: 3, text: "Ät minst 5 stycken grilli makkara under resan" },
    { id: "tre16", points: 3, text: "Turkdusch istället för vanlig innan buffén" },
    { id: "tre17", points: 3, text: "Få speakern att ropa ut efter din \"borttappade\" vän" },
    { id: "tre18", points: 3, text: "Plocka >100 placeringar" },
    { id: "tre19", points: 3, text: "Samla ihop totalt antal kudos som matchar hälften av dina följare" },
    { id: "tre20", points: 3, text: "Ta en selfie med en Jukolavinnare" },
    // --- 5 POÄNG ---
    { id: "fem1", points: 5, text: "Besök Sapokka vattenpark" },
    { id: "fem2", points: 5, text: "Ditt lag slår förväntad slutposition" },
    { id: "fem3", points: 5, text: "Få med dig en finsk vägskylt hem" },
    { id: "fem4", points: 5, text: "Konsekvent ha kortbyxor och T-Shirt hela resan" },
    { id: "fem5", points: 5, text: "Köp en Lakka och lyckas få i dig hela själv" },
    { id: "fem6", points: 5, text: "Låna ut din medhavda kikare under damstarten" },
    { id: "fem7", points: 5, text: "Övertyga busschauffören om att få sjunga i mikrofonen" },
    { id: "fem8", points: 5, text: "Sov i en annan klubbs tält" },
    { id: "fem9", points: 5, text: "Spring 2 sträckor" },
    { id: "fem10", points: 5, text: "Spring dagsträcka med pannlampa" },
    { id: "fem11", points: 5, text: "Stanna uppe till Sverige-matchen" },
    { id: "fem12", points: 5, text: "Topp 100 på din sträcka" },
    { id: "fem13", points: 5, text: "Bli utslängd från buffén" },
    { id: "fem14", points: 5, text: "Byt tävlingströja med en finsk löpare" },
    { id: "fem15", points: 5, text: "Spring en ÖL-OL / Beermile" },
    // --- 10 POÄNG ---
    { id: "tio1", points: 10, text: "Bada i finska viken" },
    { id: "tio2", points: 10, text: "Bli intervjuad av lokalmedia" },
    { id: "tio3", points: 10, text: "Ha en halvtom plastkasse som enda packning" },
    { id: "tio4", points: 10, text: "Sov under bar himmel på TC utan sovsäck" },
    { id: "tio5", points: 10, text: "Spring din sträcka med 2 olika skor" },
    { id: "tio6", points: 10, text: "Streaka på TC (ögonvittne behövs)" },
    { id: "tio7", points: 10, text: "Var vaken hela herrstafetten" },
    { id: "tio8", points: 10, text: "Var vaken hela båtresan hem" },
    { id: "tio9", points: 10, text: "Ta in tid på täten" },
    { id: "tio10", points: 10, text: "Bli intervjuad av speakern" },
    // --- FÖRST TILL KVARN!  (Använder f-prefix och isFirst: true) ---
    { id: "f1", points: 1, text: "Ta en selfie med en föredetta lagkamrat", isFirst: true },
    { id: "f2", points: 1, text: "Nå 10 poäng", isFirst: true },
    { id: "f3", points: 1, text: "Samla på dig minst 3 minuspoäng", isFirst: true },
    { id: "f4", points: 2, text: "Övertyga busschauffören om en pissi-pausi", isFirst: true },
    { id: "f5", points: 2, text: "Först på plats vid terminalen", isFirst: true },
    { id: "f6", points: 2, text: "Genomför en 5 poängare", isFirst: true },
    { id: "f7", points: 3, text: "Först ut på dansgolvet", isFirst: true },
    { id: "f8", points: 3, text: "Nå 30 poäng", isFirst: true },
    { id: "f9", points: 3, text: "Starta en allsång i bussen", isFirst: true },
    { id: "f10", points: 5, text: "Första personen på finsk mark", isFirst: true },
    { id: "f11", points: 5, text: "Genomför en 10 poängare", isFirst: true },
    { id: "f12", points: 5, text: "Samla på dig minst 10 minuspoäng", isFirst: true },
    { id: "f13", points: 10, text: "Nudda marken på Åland (på egen risk)", isFirst: true },
    { id: "f14", points: 10, text: "Besök kaptenen på båten", isFirst: true },
    { id: "f15", points: 10, text: "Samla på dig minst 20 minuspoäng", isFirst: true },
    // --- MINUSPOÄNG  (Använder m-prefix) ---
    { id: "m1", points: -1, text: "Skosnöret går upp under din sträcka" },
    { id: "m2", points: -1, text: "Spring till fel gaffling" },
    { id: "m3", points: -1, text: "Missa ett lagmöte" },
    { id: "m4", points: -2, text: "Gå direkt till jobbet på måndag morgon" },
    { id: "m5", points: -2, text: "Missa målgång för ditt lag" },
    { id: "m6", points: -2, text: "Skippa bastun" },
    { id: "m7", points: -3, text: "Ha med dig stövlar, paraply eller stol" },
    { id: "m8", points: -3, text: "Ha med matlåda hemifrån" },
    { id: "m9", points: -3, text: "Råka kliva på en klubbmedlem i militärtältet" },
    { id: "m10", points: -5, text: "Bomtid på >5 min" },
    { id: "m11", points: -5, text: "Krossa en kompass under din sträcka" },
    { id: "m12", points: -5, text: "Var sen till växlingen" },
    { id: "m13", points: -10, text: "Missa båten hem" },
    { id: "m14", points: -10, text: "Stämpla fel" },
    { id: "m15", points: -10, text: "Spy i bussen, på båten eller annan plats inomhus" }
];

// --- GLOBALA VARIABLER (Anpassade för Firebase) ---
let db_users = []; 
const db_challenges = defaultChallenges; // Använd alltid din fasta guldlista direkt!
let currentUser = null; 

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
        // Vi vill inte att admin ska kunna radera sig själv av misstag
        const deleteButton = user.isAdmin 
            ? "" 
            : `<button class="btn-danger" onclick="deleteUser('${user.username}')" style="padding: 2px 8px; font-size: 0.8rem; margin: 0;">Radera</button>`;

        board.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td><span style="color: ${user.isAdmin ? '#e67e22' : '#2ecc71'}; font-weight: bold;">${user.isAdmin ? 'Admin' : 'Tävlande'}</span></td>
                <td style="text-align: center;">${deleteButton}</td>
            </tr>
        `;
    });
}

function saveDB() {
    // Sparar hela användarlistan till Firebase i mappen 'jukola_data'
    database.ref('jukola_data').set({
        users: db_users
    });
}

// --- ADMINVERKTYG: RADERA EN ENSTAKA ANVÄNDARE ---
function deleteUser(username) {
    const safeCheck = confirm(`Är du helt säker på att du vill radera löparen "${username}" och alla deras poäng?`);
    
    if (safeCheck) {
        // Filtrera bort användaren från listan
        db_users = db_users.filter(user => user.username !== username);
        
        // Spara den nya listan i minnet
        saveDB();
        
        // Rita om adminlistan och tabellen direkt så det syns
        renderAdminUsers();
        renderLeaderboard();
    }
}