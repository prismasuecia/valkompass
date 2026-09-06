# Genomförd ti frågeintegration – 2026-09-03

**Historisk delstatus:** Senare samma dag ersattes tre frågor. Aktuell status och källa till urvalsbeslut finns i release-candidate-ten.md: tio gemensamma frågor, v6 och fortsatt resultatspärr. Uppgifterna om sju frågor nedan beskriver den tidigare versionen.

Status: lokal förhandsversion på region-stockholm-2026. Inget commit/push/merge eller publiceringsgodkännande. Endast variants/region-stockholm-2026 och research/region-stockholm-2026 ändrade.

## Redaktionellt beslut

De tio kandidaterna i editorial-ten.md finns nu i appens separata dataset. Reserverna Q02, breda Q03 och Q04 är borttagna ur detta dataset, inte ur historisk research. Nya frågor har stabila egna ID:n. Äldre sparade svar läses inte som svar på ändrade förslag: versionsnyckel v5, v4 raderas inte.

Det finns INTE tio godkända poängfrågor. Q03b och K01 ligger kvar som tydligt markerade utredningsfrågor men scoringApproved=false tills semantiken är löst. En transparent förklaring är inte bevis för att partierna svarat på en gemensam entydig proposition. K02 har godtagbar riktning men KD=null och utesluts från hela den gemensamma åttapartijämförelsen. Övriga sju har gemensamma positioner. Viktighetsval visas inte på de tre uteslutna frågorna.

Detta är ett säkerhetsbeslut för förhandsversionen, inte att användarens mål om tio verifierade frågor har uppnåtts. Kvar innan färdig produkt: hantera de två tvetydiga frågorna slutligt (belägga gemensam tolkning eller välja andra sakfrågor), bedöma ämnesbalansen och genomföra full publiceringsgranskning. Ingen ny användaråtgärd behövs för det arbetet.

## Implementerad modell

- Samma besvarade, uttryckligen godkända frågor för samtliga åtta partier.
- Minst sex gemensamma frågor krävs. Detta är ett konservativt redaktionellt val, inte statistiskt validerat. En sjufrågejämförelse ska inte beskrivas som en fullständig politisk profil.
- Femgradig skala normaliseras med maxavstånd 4; kategorisk riktning med maxavstånd 2. Frågornas maximala vikt är lika.
- Aktivt stöd och stöd i Funktionsrätts enkät får samma riktning. Andra lösningar gäller motstånd mot just mekanismen, inte mot tillgänglighet.
- Skip, saknat svar, null och politisk mittposition hålls åtskilda. Okända värden och dubbla poster avvisas.
- Viktighetsmarkering dubblerar båda termerna, inte antal frågor. Dubbla vikt-ID:n räknas bara en gång.
- Samma visade procentsats får samma placering och ingen ensam vinnarmarkering. Toppgruppen klipper inte av delade placeringar vid tre kort.
- Procentgränser för klassificering är visningsval, inte evidens om hur någon bör rösta. Inget test kräver ett höger-/vänsterutfall.
- Den överordnade publiceringsspärren är fortfarande stängd. Ingen verklig användare får en resultatrangordning i denna version.

## Kontroller

Datavalidering av tio frågor och obligatoriska källor. Fjorton apptester, inklusive verkliga datasetets sju gemensamma frågor, null/skip, flagga, vikter, ordningsoberoende och lika placeringar. Separata fjorton researchtester finns kvar som historisk prototyp.

Produktionsbygge genomfört. Webbläsarkontroll på localhost:3001 omfattade tiofrågenavigation, skattenivåskala, kategori-svar, privatandelsnivåskala och undantagsmeddelanden. Publiceringsspärr ska kvarstå även efter sista frågan. Avslutande småändringar av tidsgrammatik och dolt viktighetsval typkontrolleras/byggs separat.

## Käll- och datalinje

Aktuella appdata finns i variants/region-stockholm-2026/data/questions.json. research/questions.json är ett äldre arbetsdataset och får inte återimporteras som slutdata. editorial-ten.md är den samlade text- och källgranskningen; detta dokument beskriver vilka delar som faktiskt implementerats. Äldre result-readiness.md-sektioner om enbart sex frågor är historik.
