# Claude: oberoende granskning utan ändringar

Granska https://github.com/prismasuecia/valkompass/pull/1 på branchen `region-stockholm-2026`. Börja med att ange exakt commit du faktiskt kan läsa. Använd inte main som om den innehöll regionvariantens senaste data. Om du saknar åtkomst: säg det direkt, hitta inte på en granskning.

## Behörighet och avgränsning

Endast läsning och rapportering. Ändra inga projektfiler, skapa inga commits eller PR-kommentarer, pusha inte, gör ingen merge och publicera ingenting. Lyft inte resultatspärren. Originalkompassen utanför `variants/region-stockholm-2026` får endast läsas för isoleringskontroll.

Om du kan köra kod får befintliga tester och bygget köras i en separat tillfällig kopia; genererade test-/byggfiler där är tillåtna. Kör inga deploy-kommandon eller workflows. Annars gör en kodgranskning och redovisa tydligt vad du inte har kunnat köra. En localhost-länk hos användaren är inte bevis för att du når appen.

## Läs först

1. `research/region-stockholm-2026/release-candidate-ten.md` — senaste urvalsbeslut och kvarstående begränsningar.
2. `variants/region-stockholm-2026/data/questions.json` — aktuella tio frågor och partipositioner. Historiska research/questions.json är INTE slutdata.
3. Regionvariantens `lib/calculateResultsCore.mjs`, `lib/valkompasData.ts`, `lib/publicationGate.mjs`, `tests/`, `store/quizStore.ts`, `components/AnswerButtons.tsx`, `components/QuestionCard.tsx`, `app/quiz/page.tsx` och `app/result/page.tsx`.
4. Läs övrig dokumentation vid behov. Äldre dokument kan uttryckligen beskriva tidigare sex- eller sjufrågeversioner. Skilj historik från aktuell app.

## Kontrollera självständigt

- Sakunderlag: kontrollera de länkade originalfrågorna, samtliga åtta partiers svar, kodriktning och förbehåll mot primärkällorna där du har åtkomst. Befintliga tester visar inte att källtolkningen är korrekt. Ange exakt vilka källor du inte kunnat öppna.
- Semantik: särskilt MP:s stöd till privata BUP-mottagningar med invändning mot fri etablering; arbetsdelning kontra SD:s uppgiftsväxling; kvinnosjukvårdens nästan fulla samsyn; ungas fria resors ålder, period och finansieringsvillkor. Bekräfta inte dessa bara för att alla åtta har numeriska värden.
- Urval: vårddominans, överlapp mellan BUP och privat vårdandel samt samsynsfrågans effekt. Bedöm om tio frågor ger en försvarbar avgränsad sakjämförelse. Kräv inte ett visst parti eller höger-/vänsterresultat.
- Spanska: naturlig, vuxen och pedagogisk för spansktalande modersmålstalare från olika länder, även utan svensk samhällskunskap. Inte barnspråk. Förklara nuläge och vad förslaget ändrar, utan långa texter eller osäkra sakpåståenden. Rapportera konkreta ersättningstexter, men skriv inte in dem.
- Beräkning: identiska svar och vikter ska alltid ge identiskt resultat; samma frågor och nämnare för alla partier; rätt riktning på skatt och privatandel; kategoriska svar normaliseras; null, skip och neutralitet skiljs åt; vikt räknas en gång; delade placeringar visas rätt. Bedöm sexfrågespärrens begränsningar och alltför precisa procenttal.
- Gränssnitt om körbart: gå igenom alla tio frågor, ändra tidigare svar, markera viktigt, hoppa över, ladda om och testa mobil/desktop. Gamla sparade svar får inte bindas till nya frågor. Spärrad resultatsida är förväntat läge, inte ett fel att automatiskt rätta.
- Isolering: originalapp, main, gh-pages och publiceringsflöden får inte påverkas av regionvariantens kod eller tester.

I regionvariantens katalog: `npm run validate:data`, `npm test`, `npm run build`. Redovisa vilka som faktiskt kördes och deras utfall. Ändra inte kod för att få tester att passera.

## Leverans i ett samlat svar

1. Bedömning: redo för publiceringsbeslut / inte redo / kan inte avgöras, med skäl.
2. Faktiska blockerande fel först: fil/fråge-ID, belägg, konsekvens, exakt föreslagen rättning. Skilj bekräftade fel från risker och tyckande.
3. Kort lista över övriga språk- och användbarhetsförbättringar.
4. Tabell över genomförda respektive ej genomförda kontroller och obesvarade källfrågor.

Arbeta igenom hela avgränsningen utan att be om godkännande fråga för fråga. Uppfinn inte saknade partipositioner och föreslå inte mer research bara för att öka frågeantalet. Om underlaget inte räcker, precisera minsta konkreta komplettering. Rapportera endast; gör inga ändringar.
