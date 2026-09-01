# Region Stockholm 2026 – masterunderlag

Status: **redaktionellt arbetsunderlag, inte publiceringsklart**. Researchfrysning: 31 augusti 2026. En sista aktualitetskontroll krävs före publicering.

## Omfattning

Kompassen gäller endast val till Region Stockholm. Den ska handla om regionalt beslutbar politik, främst hälso- och sjukvård, kollektivtrafik, regionskatt och regionala investeringar. Den får inte beskrivas som en kompass för riksdagen eller Stockholms stad.

De åtta nuvarande partierna i arbetsdatasetet är S, M, SD, V, C, KD, L och MP. Deltagande partier ska kontrolleras mot Valmyndighetens slutliga register före publicering.

## Kärnfrågor

### RS26-Q01 – regionskatten

**Proposition:** Region Stockholm bör sänka regionskatten.

Färska 2026-svar ger tydlig spridning: M och SD vill ha mycket lägre skatt; C, KD och L lite lägre; S och MP samma nivå; V lite högre. Koderna i `questions.json` är vända mot propositionen, så högre skatt blir negativt värde.

### RS26-Q02 – specialistpsykiatrisk upphandling

**Proposition:** När Region Stockholm upphandlar specialistpsykiatri bör pris inte vara det enda kriteriet som skiljer mellan anbud som uppfyller kvalitetskraven.

Frågan måste förklaras exakt: obligatoriska kvalitetskrav fanns redan. Konflikten gäller hur godkända anbud rangordnas. Endast fyra partikoder är tillräckligt belagda i det överförda underlaget; övriga är `null` tills direkta källor finns.

### RS26-Q03 – specialiserad ätstörningsvård

**Proposition:** Region Stockholm bör driva den specialiserade ätstörningsvården i egen regi.

SVT:s 2026-svar ger en tydlig 4–4-spridning. V och MP är starkt för; S och C för; M, L och KD emot; SD starkt emot.

### RS26-Q04 – SL:s ordinarie priser

**Proposition:** Region Stockholm bör sänka den ordinarie prisnivån i SL-trafiken.

Riktade rabatter, pristak, längre giltighetstid och tillfälligt statligt prisstöd är inte samma sak som en generell ordinarie prissänkning. V är belagt för sänkning, M emot och S för oförändrad nivå i överfört underlag. Övriga står som `null` i väntan på direkt verifiering.

### RS26-Q05 – avgiftsfri språktolk

**Proposition:** Region Stockholm bör fortsätta erbjuda avgiftsfri språktolk i vården för patienter som behöver det.

V, MP, L och C är starkt för; S är för; M och KD är emot; SD är starkt emot. Formuleringen gäller språktolk och får inte blandas ihop med teckenspråkstolkning eller andra lagreglerade tolktjänster.

### RS26-Q06 – enprocentsregeln för konst

**Proposition:** Region Stockholm bör avsätta en procent av byggkostnaderna till konst vid ny- och ombyggnationer.

V, MP och L är starkt för; S och C är för; M, KD och SD är starkt emot. Frågan ger ämnesbredd utanför vård och trafik.

## Reservmaterial

Gratis kollektivtrafik för barn och unga, tågvärdar och privata BUP-mottagningar sparas som reservfrågor. De får inte läggas i produktionsdatasetet utan en separat propositions- och källkontroll.

## Redaktionella spärrar

- `null` betyder otillräckligt underlag och får aldrig konverteras till `0`.
- En koalitions gemensamma beslut är inte automatiskt varje partis självständiga framtida vallöfte.
- Senare, uttryckliga regionala valpositioner väger normalt tyngre än äldre budgetmaterial.
- Varje publicerad kod ska kunna spåras till minst en direkt URL och en kort motivering.
- Matchningsresultatet ska visa hur många av användarens svar som faktiskt kunde jämföras för respektive parti.
