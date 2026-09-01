# Metod

## 1. Nivå

Varje proposition ska vara konkret beslutbar eller tydligt påverkbar av Region Stockholm. Nationella, kommunala och rent administrativa frågor utesluts eller formuleras om utan att deras politiska innebörd ändras.

## 2. Evidens

Prioritetsordning:

1. partiets eget aktuella regionala valprogram, budget, motion eller pressmeddelande;
2. officiella regionala beslut och protokoll för nuläge och faktiskt agerande;
3. partiets egna inskickade svar på en transparent publiceringsplattform;
4. journalistisk sekundärkälla, helst med direkt namngivet citat.

En koalitions gemensamma dokument får beskriva koalitionens beslut men är inte automatiskt belägg för varje partis självständiga framtida position.

## 3. Aktualitet

Senaste tydliga regionala position inför valet styr normalt över äldre material. Äldre källor behålls för historik och motsägelsekontroll. Researchen fryses 31 augusti 2026 och kontrolleras igen nära publicering.

## 4. Kodning

Skalan är `-2`, `-1`, `0`, `1`, `2` mot den exakta propositionen:

- `2`: starkt stöd;
- `1`: måttligt stöd;
- `0`: uttryckligen neutral, oförändrad eller balanserad position;
- `-1`: måttligt motstånd;
- `-2`: starkt motstånd;
- `null`: otillräckligt underlag.

`null` får aldrig ersättas med `0`. En kod ska ha en kort motivering och en återöppningsbar källa. Inferens från allmän ideologi är förbjuden.

## 5. Scoring

Den befintliga motorn kan återanvändas: likhet per jämförbar fråga är `4 - abs(användarsvar - partiposition)`. En markerad viktig fråga får dubbel vikt. För varje parti divideras intjänade poäng med maximal möjlig poäng endast för de frågor där partiet har en dokumenterad position.

Resultatsidan måste visa både procent och täckning, exempelvis ”baserat på 4 av 6 frågor”. Partier med mycket låg täckning ska märkas tydligt; en miniminivå beslutas redaktionellt före publicering.

Användarens uttryckligt neutrala svar (`0`) är en politisk position och räknas. Svaret ”jag har inte tillräcklig information” är inte en politisk mittenposition och ska utelämnas helt ur både täljare och nämnare.

## 6. Frågekvalitet

Varje fråga ska vara neutral, begriplig utan specialistkunskap, endimensionell och tillräckligt särskiljande. Användaren ska inte behöva följa svenska nyheter eller känna till svenska institutioner. Varje förklaring ska kort skilja mellan nuläge, möjlig förändring, huvudargumenten och vad frågan inte omfattar. Språket ska vara naturlig vuxen spanska, inte förenklad spanska eller ordagrann översättning från svenska.

## 7. QA

Före publicering ska en person kontrollera:

- propositionens jurisdiktion och neutralitet;
- varje kod mot källan och kodens tecken;
- att senare källor inte ändrat positionen;
- att `null` verkligen utelämnas ur scoring;
- att svensk och spansk text har samma sakliga innebörd;
- att täckning visas per parti;
- att Region-dataset, lagring, byggning och URL är isolerade från riksdagskompassen.
