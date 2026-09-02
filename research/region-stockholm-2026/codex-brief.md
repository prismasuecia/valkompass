# Codex-brief: separat Region Stockholm 2026-kompass

## Mål

Bygg en separat Region Stockholm 2026-variant med samma visuella språk, flöde och scoringprincip som den befintliga valkompassen. Den befintliga publicerade `/valkompass` får inte påverkas.

## Läsordning

**Revisionsspärr 2026-09-02:** Läs `research/region-stockholm-2026/review-12-questions.md` före implementation. Inlagda koder är inte slutgodkända och nya kandidater får inte automatiskt bli appfrågor. Slutpaketet ska väljas och sakgranskas samlat.

Läs endast följande först:

1. `research/region-stockholm-2026/architecture.md`
2. `research/region-stockholm-2026/methodology.md`
3. `research/region-stockholm-2026/questions.json`
4. `research/region-stockholm-2026/master.md`
5. `research/region-stockholm-2026/sources.md`

Inspektera därefter endast de befintliga filer som pekas ut i `architecture.md`. Gör inte en bred ombyggnad.

## Säkerhetskrav

- Arbeta endast på en separat branch och via PR.
- Ändra inte befintliga appfiler, nationella dataset, `next.config.mjs` eller nuvarande deploy-workflow.
- Skapa Region-appen under `variants/region-stockholm-2026/` med eget paket och egna kopior av nödvändiga komponenter.
- Använd inga runtime-importer från root-appens data eller state.
- Använd en unik localStorage-nyckel.
- Lägg inte till automatisk publicering från `main`.
- Skapa inte ett publiceringsworkflow förrän ett separat, icke-destruktivt Pages-mål är beslutat.

## Maximal återanvändning med låg kostnad

Kopiera bara den minsta fungerande filuppsättningen: sidflöde, komponenter, CSS, scoringfunktion, typer, partifärger och logotyper. Behåll DOM-struktur och styling där sakkraven inte kräver ändring. Byt endast regionala kategorier, texter, dataadapter, lagringsnyckel och täckningspresentation.

## Datakrav

`questions.json` är ett researchschema, inte direkt produktionsschema. Gör en liten validerad adapter eller generera produktionsdata inom variantens katalog. `null`-positioner ska helt saknas ur listan som skickas till scoringmotorn; de får aldrig bli `0`.

De spanska frågorna och de pedagogiska förklaringarna finns i variantens produktionsdata. Bevara skillnaden mellan korrekt vuxen spanska och pedagogisk svensk samhällskontext; förenkla inte språket till barnnivå och återinför inte svenska myndighetskonstruktioner genom ordagrann översättning.

## Definition of done för första kod-PR

- root-appens filer är byte-identiska med `main`;
- Region-varianten bygger självständigt;
- befintliga scoringtester passerar även med olika antal dokumenterade positioner per parti;
- test visar att `null` varken ger poäng eller möjlig poäng;
- resultatsidan visar `matchedQuestions` av totalt antal frågor per parti;
- sessioner mellan varianterna kan inte blandas;
- ingen deploy sker automatiskt;
- README beskriver lokal körning och framtida separat publiceringsväg.
