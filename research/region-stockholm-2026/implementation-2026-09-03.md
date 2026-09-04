# Implementerat 2026-09-03 – isolerad förhandsversion

- Skattefrågan i appen har rättats till öppen nivåfråga med kontrollerad partimatris och fem skatteanpassade svarsalternativ. Research-snapshoten är synkad för denna fråga.
- Resultatsidan returnerar en revisionsförklaring före beräkning för dataset som inte uttryckligen är publiceringsgodkända. Därmed visas varken procent, topplista eller tveksamma partijämförelser från det nuvarande arbetsdatasetet.
- Start, quiz och källsida beskriver nu versionen som under granskning, inte sex verifierade frågor. Förklarings- och viktigmarkeringstexter har stramats upp.
- Lokal svarslagring använder ny versionsnyckel: gamla skattesvar får inte tolkas om. De gamla uppgifterna raderas inte men återanvänds inte automatiskt. Detta berör endast Region-varianten.
- Det ideologiskt formulerade regressionstestet är ersatt av exakt kontroll av skatteunderlaget. Resultatspärren har egna tester.

## Verifiering

Appens tester, datavalidering och produktionsbygge kontrolleras i denna ändring. Webbläsarfärdigheten används för lokal DOM-kontroll: skattesvar syns med rätt nivåetiketter, valet får markerat tillstånd, navigering går vidare och resultatvägen visar revisionsspärr utan partipoäng. Separata metodprototyper är fortfarande inte inkopplade i appen.

## Nytt källfynd, avgränsat

[Locums patientinformation för Norrtälje sjukhus](https://www.locum.se/husen/norrtalje-sjukhus/service/), direkt läst 2026-09-03, anger kostnadsfri tolkhjälp i ett avsnitt som omfattar svårigheter med svenska, inte enbart hörseltolkning. Det är ett uttryckligt officiellt lokalt belägg, men inte en här verifierad övergripande avgiftsregel för alla vårdformer i regionen. [Logopedmottagningen Alvik på 1177](https://www.1177.se/hitta-vard/kontaktkort/Logopedmottagningen-Alvik/) är ytterligare ett identifierat regionalt vårdgivarspår. Generalisera inte mottagningsinformation till ett obegränsat löfte. Q05:s fullständiga avgiftsomfattning är fortsatt öppen.

## Inte färdigt

Övriga historiska appfrågor är inte godkända genom denna ändring. Nya kandidater, kategorisk poängmetod, gemensamt jämförelseunderlag och publicering kräver fortsatta ändringar. Ingen default-branch eller befintlig publicerad kompass ändras.
