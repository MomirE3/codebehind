Aplikacija krece tako sto se prvo poziva funkcija calculateTeamForm() koja je napisana u calculateForm.js.

1. Kod određivanja verovatnoće pobednika uzeti u obzir i formu ekipe. Početna tačka za ovu kalkulaciju mogu biti podaci iz fajla exibitions.json u kome su dati rezultati 2 prijateljske utakmice za svaku ekipu.
    - Gledajuci exibitions.json primetio sam da su neke ekipe odiglrale i vise od 2 prijateljske utakmice i onda sam i to uzeo u obzir. Tako sto sam prvobitno izvukao sve jednistvene meceve i tek onda racunao formu.

Dalje se poziva groupStageResults() funkcija koja je definisana u groupStage.js. Da ne bih morao da pisem jos jednu petlju, unapred sam u konstanti permutations odredio koji tim sa kojim treba da se sastane da bi svako odigrao sa svakim i da bi to bilo po rundama. Posto su propozicije takmicenja takve da ce uvek biti 4 ekipe u grupi, mislio sam da definisanje permutations nece predstavljati problem.

Rezultati meceva se odredjuju funkcijom simulateMatch() napisanom u simulateMatch.js. Tu mi je ideja bila da koliko god je neki tim u dobroj formi, ako je neki tim mnogo jaci po rankingu, da forma nema toliki impakt kao sto ima fiba rank.

Tabela se azurira posle svakog odigranog meca i forma se azurira.

Kada se zavrsi jedna runda, poziva se buubleSort() funkcija definisana u sort.js koja na osnovu poena i medjusobne razlike odredjuje koji tim ce biti ispred kog.

2. U slučaju da 3 tima iz iste grupe imaju isti broj bodova, kriterijum za rangiranje biće razlika u poenima u međusobnim utakmicama između ta 3 tima (takozvano formiranje kruga).
    - U ovom slucaju gde u grupi ima 4 tima, jedan tim igra samo 3 meca i sa ovim nacinom bodovanja nije moguce da 3 tima imaju isti broj bodova. Zbog toga taj deo nisam implementirao.

Svi prikazi u terminal-u napisani su u printResult.js

Kada se grupa zavrsi, poziva se funkcija rankTeamByPosition() koja odredjuje kojih 8 timova ide dalje.

3. Prvoplasirani timovi iz grupa A, B i C se medjusobno rangiraju po primarno po broju bodova, zatim koš razlici (u slučaju jednakog broja bodova) i zatim broja postignutih koševa (u slučaju jednakog broja bodova i koš razlike) kako bi im se dodelili rangovi 1, 2 i 3.
    - Posto je napisano da se menjusobno rangiraju, razumeo sam da treba prvoplasirane, drugoplasirane i treceplasirane da odvojim u posebne nizove i da ih posebno uporedjujem i odredjujem im rank. Ako to nije bilo potrebno, drugacije bih to implementirao, gde ne bih morao da sve radim 3 puta, vec bih sve to odradio u jednom nizu.

Zatim se poziva funkcija drawQuarterFinals() napisana u drawQuarterFinals.js. Koja odreduje koji tim u koji sesir ide i odredjuje parove cetvrtine.

Zatim se poziva funkcija eliminationPhase() definisana u eliminationPhase.js.

4. U istom trenutku se formiraju i parovi polufinala, nasumičnim ukrštanjem novonastalih parova četvrtfinala, uz pravilo da se parovi nastali ukrštanjem šešira D i E ukrštaju sa parovima nastalim ukrštanjem šešira F i G.
   -Da bih izbegao ukrstanje D sa E i F sa G unapred sam odredio raspored u semiFinalDraw.

Dalje se poziva funkcija semiFinal(), a kasnije finalAndThirdPlace() i dobijaju se sampion, vicesampion i treceplasirani.
