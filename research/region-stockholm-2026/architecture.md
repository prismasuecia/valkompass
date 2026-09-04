# Arkitekturkarta och minsta säkra diff

Kartläggningen gäller commit `9479612` på `main` och gjordes skrivskyddat innan denna branch skapades.

## Nuvarande produkt

Repot är en statiskt exporterad Next.js 15-app. GitHub Actions bygger `main` med basvägen `/valkompass` och publicerar hela katalogen `out` till branchen `gh-pages`. En push till `main` ersätter därför den publicerade valkompassen i sin helhet.

| Ansvar | Nuvarande filer |
|---|---|
| Sidor och flöde | `app/page.tsx`, `app/quiz/page.tsx`, `app/result/page.tsx`, `app/sources/page.tsx` |
| Återanvändbart UI | `components/` och `app/globals.css` |
| Frågor och förklaringar | `questions.json`, inläst och omformat av `lib/valkompasData.ts` |
| Partipositioner | `partyPositions.json`, inläst av `lib/valkompasData.ts` |
| Partier | `data/parties.json`; logotyper och kort i `public/party-logos/` och `partyCards.json` |
| Scoring | `lib/calculateResults.ts` |
| Session | `store/quizStore.ts`, lagringsnyckel `brujula-electoral-quiz-session` |
| Text och kategorier | `uiText.json` och unionen `QuestionCategory` i `types/index.ts` |
| Publicering | `next.config.mjs` och `.github/workflows/deploy.yml` |

Scoringen jämför användarens och partiets värde på skalan −2…+2. Avstånd 0 ger 4 poäng och avstånd 4 ger 0 poäng. En viktig fråga får dubbel vikt. Resultatet normaliseras redan mot maximal möjlig poäng för de positioner som faktiskt finns i den inlästa listan.

## Risker om Region-versionen byggs direkt i befintlig app

- Samma importvägar skulle göra det lätt att råka ersätta riksdagsdatasetet.
- Nuvarande kategoriunion är nationellt anpassad och passar inte regionfrågorna.
- Nuvarande lagringsnyckel skulle blanda sessioner mellan varianterna.
- Nuvarande workflow publicerar hela `out` från `main`; ett misstag kan skriva över den befintliga sajten.
- Resultatsidan visar totalt antal frågor, inte `matchedQuestions`. Det måste ändras innan ett dataset med `null`-positioner publiceras.

## Rekommenderad isolering

Bygg en fristående app i `variants/region-stockholm-2026/` genom att kopiera minsta fungerande uppsättning från nuvarande app. Återanvänd koden genom en kontrollerad engångskopia, inte genom runtime-importer över variantgränsen. Varianten ska ha:

- eget `package.json`, låsfil, `app/`, `components/`, `lib/`, `store/`, `types/`, `public/` och data;
- egen basväg, förslagsvis `/valkompass-region-stockholm-2026`;
- egen unik localStorage-nyckel;
- eget workflow med manuell start tills redaktionell QA är godkänd;
- separat publiceringsmål som inte rensar eller ersätter nuvarande `/valkompass`;
- tester som bekräftar att `null` utelämnas ur både täljare och nämnare.

Ett separat repo ger ännu starkare behörighetsisolering, men kräver mer administration och gör den första kodkopian mindre enkel. För den första implementationen är en fristående katalog i denna branch den minsta säkra diffen. Publiceringsmålet måste lösas innan merge.

## Avgränsning i denna branch

Denna första diff lägger endast till dokumentation och researchdata. Den ändrar inga appfiler, dataset, beroenden eller workflows och kan därför inte påverka den publicerade kompassen.
