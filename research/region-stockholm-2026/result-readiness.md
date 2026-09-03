# Resultatspärr och nästa genomförbara steg

Arbetsbeslut/prototyp 2026-09-03. Inte inkopplat i någon app. Kompletterar editorial-six.md och methodology.md.

## Problemet

Separat normalisering per parti kan ge 100 procent på en fråga och 80 procent på tio frågor. Procentsiffrorna mäter då olika underlag. En täckningsetikett informerar om skillnaden men undanröjer den inte. Det är en metodrisk, inte bevis för att ett specifikt partis resultat är fel. Ingen testprofil ska tvingas ge ett förväntat höger–vänsterutfall.

## Föreslagen jämförelse

1. Utgå från ett i förväg fastställt partiurval. Ta inte bort ett parti för att förbättra täckningen.
2. Huvudjämförelsen använder bara frågor som användaren besvarat och där samtliga jämförda partier har godkända positioner på samma proposition.
3. Använd samma frågor och användarvikter för alla. Övriga svar och partiförbehåll kan visas fråga för fråga men påverkar inte den gemensamma procentsiffran.
4. Föreslagen nedre spärr: minst sex gemensamma besvarade frågor. Sex är ett redaktionellt försiktighetsval, inte statistiskt validerad tillräcklighet. Ämnesbalans, källkvalitet och sluturval krävs därutöver. En viktigmarkering räknas inte som två frågor för spärren.
5. Vid mindre underlag visas ingen rangordning eller matchningsprocent. Informera varför och visa sakjämförelser. Ingen åsikt hos parti och användarens informationsskip utesluts; uttrycklig användarneutralitet räknas som ett svar.
6. Lika poäng ska visas som lika resultat. Använd inte alfabetisk intern sortering som politisk utslagsregel och framhäv inte ett ensamt ”bästa parti” vid delad poäng.

Detta minskar problemet med olika nämnare men kan minska ämnesbredden: ett partis uteblivna svar kan utesluta en fråga för alla. Därför är det inte en genväg förbi mer research. Före införande ska vi kontrollera vilka frågor som faller bort, att viktiga sakområden inte försvinner och att användaren ser vilka svar som inte ingår.

## Föreslagen spansk resultattext

**Tillräckligt underlag:** «Comparamos tus respuestas con las de los partidos en las mismas {n} preguntas.»

**Otillräckligt:** «No hay suficientes preguntas con respuestas verificadas de todos los partidos para ofrecer una comparación fiable. Puedes consultar sus posiciones pregunta por pregunta.»

**Gemensamt underlag, inte röstningsråd:** «El porcentaje refleja coincidencias en estas propuestas. No resume toda la política de un partido ni te dice a quién votar.»

**Utesluten fråga:** «Esta pregunta no entra en el porcentaje: falta una posición verificada de al menos uno de los partidos.»

## Vad detta innebär för våra sex kandidater

| Kandidat | Aktuell begränsning |
|---|---|
| Q01 skatt | Kontrollerad arbetsmatris; slutredigering och slutlig skalintegration kvarstår. |
| Q05 språktolk | Kontrollerad arbetsmatris; uttryckligt officiellt avgiftsbelägg saknas fortfarande. |
| K01 konst | Råsvar finns; propositionens relation till vårdlokalernas 2 procent är olöst. |
| K02 tågvärdar | KD saknar position och frågan skulle falla bort ur gemensamt åttapartiresulat. |
| K03 fritidshjälpmedel | Åtta råsvar; kategorisk metod och slutlig innebörd ska låsas. |
| K04 funkisdiplomering | Åtta råsvar; kategorisk metod, språk och saklig avgränsning ska låsas. |

Även om övriga luckor löses blir det högst fem gemensamma frågor i detta sexfrågeurval. Med den föreslagna spärren är alltså ingen full resultatrangordning möjlig ännu. Utöka med välbelagda, ämnesmässigt kompletterande frågor eller visa endast en sakjämförelse; sänk inte spärren bara för att få fram en topplista. Tolv är fortfarande ett mål, inte verifierat antal.

## Avgränsad källkontroll för språktolk, 2026-09-03

Ny sökning gav vårdområdesspecifika kostnadsuppgifter men inte ett tillräckligt explicit belägg för hela regionens vård. [BUP:s patientinformation](https://www.bup.regionstockholm.se/kontakta-oss/nar-ska-du-kontakta-bup/vad-hander-nar-du-kontaktar-bup/) beskriver kostnadsfri vård och hjälp med språktolk. Den kontrollerades via sökresultat och generaliseras inte till all vuxenvård. Partiers avgiftsförslag, andra regioners regler och en beställares kostnadsansvar är inte ersättningar för det efterfrågade belägget.

Denna lucka är dokumentär, inte skäl att samla in samma åtta partisvar på nytt. Nästa relevanta källa är ett gällande regionalt avgifts-/kostnadsunderlag med uttrycklig omfattning. Inga externa förfrågningar har skickats och ingen avgiftsregel har antagits som verifierad.

## Verifiering och införande

scoring-prototype.test.mjs testar gemensam nämnare, spärr, dubbla vikter, lika resultat, informationsskip och ogiltiga indata utöver tidigare skaltester. Det är syntetiska tester, inte en full validering mot politiska positionsdata. Appen ändras först när slutdata och metoden är låsta tillsammans. Därefter krävs test av faktisk UI, lagrade svar, rangordning och isolerade byggflöden.
