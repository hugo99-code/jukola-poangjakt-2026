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
    { id: "ett31", points: 1, text: "Basta med minst 2 klubbkamrater" },
    { id: "ett32", points: 1, text: "Kör \"en bro\" på bussresan hem" },
    { id: "ett33", points: 1, text: "Ta in placeringar på spurten" },
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
    { id: "två26", points: 2, text: "Skriv ett Jukola-rim och läs upp det för klubben" },
    { id: "två27", points: 2, text: "Bjud bastuvedkastaren på öl" },
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
    { id: "tre21", points: 3, text: "Bli väckt av städerskan på båten" },
    { id: "tre22", points: 3, text: "Logga 5 nya öl på untapped" },
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
let db_challenges = defaultChallenges; // Använd alltid din fasta guldlista direkt!
let currentUser = null; 

const positiveTiers = [1, 2, 3, 5, 10];

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

let initialLoadDone = false; // Håller koll på om det är första gången appen startar

// 3. Lyssna på databasen i REALTIID
database.ref('jukola_data').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data && data.users) {
        db_users = data.users; 
    } else {
        db_users = []; 
    }

    if (data && data.challenges) {
        db_challenges = data.challenges;
    } else {
        db_challenges = defaultChallenges;
    }
    
    // --- AUTOMATISK INLOGGNING VID START ---
    if (!initialLoadDone) {
        const savedSession = JSON.parse(localStorage.getItem("current_session"));
        if (savedSession) {
            const foundMe = db_users.find(u => u.username === savedSession.username);
            if (foundMe) {
                currentUser = foundMe; // Logga in automatiskt med färsk molndata!
                showGameView();
            }
        }
        initialLoadDone = true; // Sätt flaggan till sant så vi inte kastar ut folk från admin-vyn sen!
    } else if (currentUser) {
        // Vanlig synk under spelets gång
        const foundMe = db_users.find(u => u.username === currentUser.username);
        if (foundMe) {
            currentUser = foundMe; 
        }
    }

    renderLeaderboard();
    
    if (currentUser) {
        renderAllAccordions(true); 
    }
    
    if (document.getElementById("admin-view") && document.getElementById("admin-view").style.display === "block") {
        renderAdminUsers();
    }
});

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

    // --- SÄKERHETSSPÄRR: Freda admin-kontot från kapning ---
    if (usernameIn.toLowerCase() === 'admin') {
        messageText.style.color = "#e74c3c"; // Röd text för felmeddelande
        messageText.innerText = "Admin-lösenordet kan inte ändras härifrån!";
        return;
    }

    const userIndex = db_users.findIndex(u => u.username.toLowerCase() === usernameIn.toLowerCase());

    if (userIndex === -1) {
        messageText.style.color = "#e74c3c";
        messageText.innerText = `Hittade ingen löpare med namnet "${usernameIn}"`;
        return;
    }

    // Uppdatera lösenordet för vanliga löpare
    db_users[userIndex].password = newPasswordIn;
    saveDB();

    messageText.style.color = "#2ecc71"; // Grön text för succé
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
    if (!currentUser) return;

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

        tierChallenges.sort((a, b) => a.text.localeCompare(b.text, 'sv'));

        const details = document.createElement("details");
        details.setAttribute("data-tier", tier); // Sätt en etikett
        if (openTiers.includes(String(tier))) details.open = true; // Öppna om den var öppen innan!

        // Räkna totalt och hur många användaren har klarat i just denna kategori
        const totalInTier = tierChallenges.length;
        const doneInTier = tierChallenges.filter(ch => (currentUser.completed || []).includes(ch.id)).length;

        const summary = document.createElement("summary");
        summary.innerHTML = `<span>${tier} Poäng</span> <span class="badge-count">${doneInTier}/${totalInTier}</span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        tierChallenges.forEach(ch => {
            const isChecked = (currentUser.completed || []).includes(ch.id) ? "checked" : "";
            itemHtml(ch, isChecked, listDiv);
        });

        details.appendChild(listDiv);
        container.appendChild(details);
    });

    // --- 3. SPECIALMENY: FÖRST TILL KVARN!  ---
    const firstChallenges = db_challenges.filter(ch => ch.isFirst === true);
    if (firstChallenges.length > 0) {
        firstChallenges.sort((a, b) => {
            if (b.points !== a.points) {
                return a.points - b.points; // Sortera på poäng först (lägst poäng först)
            }
            return a.text.localeCompare(b.text, 'sv'); // A-Ö om poängen är lika
        });
        const details = document.createElement("details");
        details.className = "first-accordion";
        details.setAttribute("data-tier", "first"); // Sätt en etikett
        if (openTiers.includes("first")) details.open = true; // Öppna om den var öppen innan!
        
        const totalFirst = firstChallenges.length;
        const doneFirst = firstChallenges.filter(ch => (currentUser.completed || []).includes(ch.id)).length;

        const summary = document.createElement("summary");
        summary.innerHTML = `<span>Först till kvarn</span> <span class="badge-count">${doneFirst}/${totalFirst}</span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        firstChallenges.forEach(ch => {
            const takenByUser = db_users.find(u => (u.completed || []).includes(ch.id));
            
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
        minusChallenges.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points; // Minst minus överst (t.ex. -1p före -5p)
            }
            return a.text.localeCompare(b.text, 'sv'); // A-Ö om poängen är lika
        });
        const details = document.createElement("details");
        details.className = "minus-accordion";
        details.setAttribute("data-tier", "minus"); // Sätt en etikett
        if (openTiers.includes("minus")) details.open = true; // Öppna om den var öppen innan!

        const totalMinus = minusChallenges.length;
        const doneMinus = minusChallenges.filter(ch => (currentUser.completed || []).includes(ch.id)).length;

        const summary = document.createElement("summary");
        summary.innerHTML = `<span>Minuspoäng</span> <span class="badge-count">${doneMinus}/${totalMinus}</span>`;
        details.appendChild(summary);

        const listDiv = document.createElement("div");
        listDiv.className = "challenge-list";

        minusChallenges.forEach(ch => {
            const isChecked = (currentUser.completed || []).includes(ch.id) ? "checked" : "";
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
    if (!currentUser) return;

    // 1. SÄKRING: Se till att completed-listan existerar på den inloggade användaren
    if (!currentUser.completed) {
        currentUser.completed = [];
    }

    // 2. Lägg till eller ta bort utmaningens ID från din lokala användare
    const index = currentUser.completed.indexOf(id);
    if (index > -1) {
        currentUser.completed.splice(index, 1); // Ta bort om den redan var ikryssad
    } else {
        currentUser.completed.push(id); // Lägg till om den var tom
    }

    // 3. SYNKA TILL MOLNET: Hitta och uppdatera denna användare i den globala db_users-listan
    const userIdx = db_users.findIndex(u => u.username === currentUser.username);
    if (userIdx > -1) {
        db_users[userIdx].completed = currentUser.completed;
    }

    // 4. Skicka upp den uppdaterade listan till Firebase!
    saveDB();
}

function renderLeaderboard() {
    const board = document.getElementById("leaderboard-body");
    if (!board) return; // Säkerhetsspärr om elementet inte laddat än
    board.innerHTML = "";

    const scoreboard = db_users
        .filter(user => !user.isAdmin)
        .map(user => {
            let score = 0;
            
            // --- FIXEN: Skapa en säker referens till listan ---
            const completedList = user.completed || []; 

            db_challenges.forEach(ch => {
                if (completedList.includes(ch.id)) {
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
                <td onclick="openUserModal('${player.name}')" style="cursor: pointer; font-weight: bold; color: var(--primary-color);">
                    ${player.name}
                </td>
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

    // 1. Lägg till i den lokala listan
    db_challenges.push(newCh);
    
    // 2. FIXEN: Spara till Firebase (inte localStorage!) så alla löpare får den direkt
    saveDB(); 
    
    document.getElementById("new-ch-text").value = "";
    alert("Utmaning tillagd för alla löpare!");
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
    // FIXEN: Sparar BÅDE användare och utmaningar till Firebase
    database.ref('jukola_data').set({
        users: db_users,
        challenges: db_challenges // Skicka med denna rad!
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

// Initiera sökfunktionen (Kör denna t.ex. när appen startar / i din setup-kod)
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-results");

    if (!searchInput) return;

    // 1. När man klickar i sökfältet - Visa alla utmaningar direkt
    searchInput.addEventListener("focus", () => {
        renderSearch(searchInput.value);
    });

    // 2. När man skriver i sökfältet - Filtrera i realtid
    searchInput.addEventListener("input", () => {
        renderSearch(searchInput.value);
    });

    // 3. Stäng rutan om man klickar utanför sökfälts-området
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
            searchDropdown.classList.remove("active");
        }
    });
});

function renderSearch(query) {
    const searchDropdown = document.getElementById("search-results");
    searchDropdown.innerHTML = ""; // Töm rutan

    const term = query.trim().toLowerCase();

    // Filtrera: Visa alla om fältet är tomt, annars bara de som matchar texten
    let filtered = db_challenges.filter(ch => ch.text.toLowerCase().includes(term));

    if (filtered.length === 0) {
        searchDropdown.innerHTML = `<div class="search-item" style="color: #888;">Inga utmaningar matchar "${query}"</div>`;
        searchDropdown.classList.add("active");
        return;
    }

    // 🔥 STRUKTURERAD DUBBELSORTERING ENLIGT DINA ÖNSKEMÅL:
    filtered.sort((a, b) => {
        // Regel 1: Dela upp i kategorier (Vanliga = 1, Först till kvarn = 2, Minus = 3)
        const getGroupWeight = (ch) => {
            if (ch.points < 0 && !ch.isFirst) return 3; // Minus sist
            if (ch.isFirst) return 2;                   // Först till kvarn i mitten
            return 1;                                   // Vanliga först
        };

        const weightA = getGroupWeight(a);
        const weightB = getGroupWeight(b);

        if (weightA !== weightB) {
            return weightA - weightB; // Skickar grupp 1 först, sen 2, sen 3
        }

        // Regel 2: Sortera efter poäng inom samma kategori (Lägst poäng överst)
        if (a.points !== b.points) {
            if (weightA === 3) {
                return b.points - a.points; // För minus: ger -1p före -5p (snällast överst)
            } else {
                return a.points - b.points; // För plus: ger 1p före 5p (lägst poäng överst)
            }
        }

        // Regel 3: Sortera i bokstavsordning (A-Ö) om poängen är exakt lika
        return a.text.localeCompare(b.text, 'sv');
    });

    // Rita ut resultaten (Samma snygga HTML-utskrift som innan)
    filtered.forEach(ch => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "search-item challenge-item";

        const takenByUser = db_users.find(u => (u.completed || []).includes(ch.id));
        let isChecked = "";
        let isDisabled = "";
        let prefix = ch.points < 0 ? `[${ch.points}p]` : `[+${ch.points}p]`;

        if (takenByUser) {
            if (takenByUser.username === currentUser.username) {
                isChecked = "checked";
            } else if (ch.isFirst) {
                isDisabled = "disabled";
                prefix = `❌ [Tagen av ${takenByUser.username}]`;
                itemDiv.classList.add("taken");
            }
        }

        const badgeColor = ch.points < 0 ? "var(--highlight-color)" : "var(--primary-color)";

        itemDiv.innerHTML = `
            <label style="display: flex; align-items: center; width: 100%;">
                <input type="checkbox" ${isChecked} ${isDisabled} onchange="toggleChallenge('${ch.id}')">
                <span style="margin-left: 10px;">
                    <strong style="color: ${badgeColor};">${prefix}</strong> ${ch.text}
                </span>
            </label>
        `;
        searchDropdown.appendChild(itemDiv);
    });

    // Visa rutan
    searchDropdown.classList.add("active");
}

// ÖPPNA POPUP OCH VISA EN SPECIFIK LÖPARES UTMANINGAR
function openUserModal(username) {
    const targetUser = db_users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!targetUser) return;

    // Sätt rubriken till löparens namn
    document.getElementById("modal-user-title").innerText = `${targetUser.username}s utmaningar`;

    const listContainer = document.getElementById("modal-challenges-list");
    listContainer.innerHTML = ""; // Töm listan innan vi bygger den

    // Hämta alla utmaningar som denna användare har klarat
    const completedIDs = targetUser.completed || [];
    let userChallenges = db_challenges.filter(ch => completedIDs.includes(ch.id));

    if (userChallenges.length === 0) {
        listContainer.innerHTML = `<div style="color: #888; text-align: center; padding: 20px;">Inga utmaningar avklarade ännu! 🏃‍♂️</div>`;
        document.getElementById("user-modal").classList.add("active");
        return;
    }

    // 🔥 TRIPPELSORTERINGEN (Låg -> hög, vanliga -> först till kvarn -> minus, A-Ö)
    userChallenges.sort((a, b) => {
        const getGroupWeight = (ch) => {
            if (ch.points < 0 && !ch.isFirst) return 3; // Minus sist
            if (ch.isFirst) return 2;                   // Först till kvarn i mitten
            return 1;                                   // Vanliga först
        };

        const weightA = getGroupWeight(a);
        const weightB = getGroupWeight(b);

        if (weightA !== weightB) return weightA - weightB;

        if (a.points !== b.points) {
            if (weightA === 3) {
                return b.points - a.points; // Minus: -1p före -5p
            } else {
                return a.points - b.points; // Plus: 1p före 5p
            }
        }
        return a.text.localeCompare(b.text, 'sv');
    });

    // Skriv ut utmaningarna i popupen
    userChallenges.forEach(ch => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "modal-item";

        let prefix = `${ch.points}p`;
        const badgeColor = ch.points < 0 ? "var(--highlight-color)" : "var(--primary-color)";

        // Eftersom vi bara TITTAR på någon annans lista ritar vi bara ut text (inga checkboxar)
        itemDiv.innerHTML = `
            <span>
                <strong style="color: ${badgeColor}; margin-right: 8px;">${prefix}</strong> 
                ${ch.text}
            </span>
        `;
        listContainer.appendChild(itemDiv);
    });

    // Visa hela popupen genom att lägga till klassen .active
    document.getElementById("user-modal").classList.add("active");
}

// STÄNG POPUPEN
function closeUserModal() {
    document.getElementById("user-modal").classList.remove("active");
}

// Stäng om man klickar på den mörka bakgrunden utanför den vita rutan
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("user-modal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeUserModal();
            }
        });
    }
});