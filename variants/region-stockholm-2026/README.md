# Brújula electoral – Region Stockholm 2026

Detta är en fristående variant av Prisma Suecias befintliga valkompass. Den har egna beroenden, data, typer, state, lagringsnyckel och bygginställningar. Den importerar ingenting från appen i repots rot.

## Lokal kontroll

Kör kommandona i denna katalog:

```sh
npm ci
npm run validate:data
npm test
npm run typecheck
npm run build
```

`npm run dev` startar en lokal förhandsvisning.

## Separat sökväg

Vid framtida statisk export kan en isolerad basväg anges:

```sh
NEXT_PUBLIC_REGION_BASE_PATH=/valkompass-region-stockholm-2026 npm run build
```

Det finns medvetet inget deployment-workflow i variantkatalogen. Publicering ska inte aktiveras förrän ett mål som inte kan skriva över befintliga `/valkompass` har beslutats och redaktionell källkontroll är godkänd.

## Dataprincip

Saknad partiposition lagras som `null` i `data/questions.json`. Dataadaptern tar bort dessa poster innan scoring. Resultatet normaliseras därför endast över dokumenterade positioner och visar hur många frågor som jämförts för varje parti.
