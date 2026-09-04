# Ti frågors lokala releasekandidat — 2026-09-03

## Slutkontroll 2026-09-04

Hela den isolerade regionvarianten kontrollerades åter på branch `region-stockholm-2026` från commit 0514552. Alla tio frågor genomfördes i samma session med vanlig femgradig skala, skattenivå, privatandel, kategoriska svar, neutralitet och informationsskip. Framåt/bakåt bevarade valt svar. Omladdning mitt i frågeflödet återställde fråga 3, informationsskip och viktmarkering efter klientens hydrering. Den korta initiala serverrenderingen visar fråga 1 innan lagrad klientstatus har lästs in; ingen inmatning kan göras under den automatiserade omladdningen, men detta är en känd visuell hydreringsegenskap och inte dataförlust.

Både N03 och N01 visar överlappningsinformationen och saknar viktreglage. Tangentbordsfokus nådde svarsalternativ; mellanslag valde svar och aktiverade nästa knapp. Resultatsidan visade endast den avsedda publiceringsspärren. Startsidan kontrollerades vid 320, 390, 768 och 1366 CSS-pixlar utan horisontell överströmning. Quiz kontrollerades visuellt i smal mobil- och bred desktoplayout. Webbläsarens zoomkortkommando gav ingen mätbar zoomförändring i testmiljön; faktisk 200-procentszoom är därför inte verifierad som en separat webbläsarinställning. Reflow vid 320 pixlar är verifierat och är strängare i tillgänglig bredd än 200 procent på normal desktop, men är inte samma test.

Slutkontrollen hittade ett kvarvarande hårdkodat analysvärde: `quiz_started` rapporterade fem frågor. Det använder nu `questions.length`; regressionstest tillagt. Inga konsolfel eller varningar registrerades under slutflödet. Publiceringsspärren förblir stängd.

## Uppföljning av Claudes granskning

### Genomförd webbläsarkontroll efter rättningarna

Regionvarianten byggdes och testades lokalt i in-app-webbläsaren, inte mot produktion. Mobilflöde genom tio frågor vid 390×844; ytterligare kontroll av svarsknappar och layout vid 320×740; desktop-layout vid 1366×900. Ingen horisontell överströmning i de breddkontrollerade frågevyerna. Förklaringen öppnades/stängdes, svar ändrades med tillbaka-navigation, viktmarkering och ändrat svar återställdes efter ny sidladdning. Informationsskip kontrollerades via knappens aria-pressed och efter återgång från resultat. BUP/privatandel visar överlappningsnot utan viktreglage. Slutknappen leder till förväntad spärrad resultatsida.

Startsidan visade även inaktuella ämnesetiketter; ämneslistan härleds nu från aktuella frågor. Regional sysselsättning har centraliserad etikett. Obelagd nedräkning i minuter togs bort även ur quizvyn. Senaste byggets startsida och quiztext kontrollerades igen efter omladdning. Arton tester och produktionsbygge inklusive typkontroll passerar.

Detta är responsiv kontroll i en webbläsare, inte fysisk iPhone-/Android- eller Safari-verifiering. Den aktiverade resultatrankningens visuella flöde har inte testats här eftersom publiceringsspärren ligger kvar; beräkningen är testad separat. Slutligt beslut om aktivering och separat driftsättning återstår. Rättningarna förs till befintlig region-PR, aldrig direkt till main eller gh-pages.

Claude rapporterade granskning av commit 002e839, inklusive körda tester och bygge men utan fungerande webbläsartest. Rapporten är extern återkoppling, inte ersättning för egen verifiering. Två innehållsfel bekräftades lokalt och rättades: startsidans frågeantal hämtas nu från datasetet; N01 hänvisar till BUP-frågan i stället för borttagen ätstörningsfråga. Den obeprövade tidsuppskattningen på startsidan ersattes med en uppmaning att svara i egen takt.

N01 och N03 har nu synlig överlappningsnot. Båda ingår fortsatt med grundvikt, men kan inte dubbelviktas. Begränsningen verkställs även i beräkningskärnan för tidigare sparade viktmarkeringar. Detta eliminerar inte tematisk överlappning och är inte en statistiskt validerad korrigering av ämnesbalansen. Partipositioner och godkännandestatus ändrades inte. Arton tester passerar, inklusive nya regressionstester. Resultatspärren är kvar; mobilgranskning och slutligt publiceringsbeslut kvarstår.

Nedanstående beskrivning av ingen push avser den ursprungliga lokala arbetsomgången. Releasekandidaten lades därefter på separat regionbranch som commit 002e839 för granskning, utan merge eller publicering. Dessa uppföljande rättningar är ännu lokala.

Detta dokument ersätter urvalsstatusen i editorial-ten.md, implementation-ten.md och result-readiness.md. Historiska researchfiler är inte appens aktuella dataset och får inte återimporteras utan granskning.

## Aktuellt läge

Appens isolerade data finns i `variants/region-stockholm-2026/data/questions.json`. Tio frågor har nu åtta numeriska partipositioner och uttryckligt redaktionellt poänggodkännande. Det är inte ett publiceringsgodkännande: datasetets överordnade resultatspärr är fortsatt stängd. Inget har pushats eller publicerats i denna arbetsomgång.

Urval: regionskatt, privata BUP-mottagningar, språktolk, avgiftsfria resor för unga, specialistcentrum för kvinnosjukvård, arbetsdelning, fritidshjälpmedel, funkisdiplomering, privat vårdandel och trafikprioritering i glesbygd. Vård dominerar. Urvalet täcker inte hela regionpolitiken, exempelvis kultur och klimat. Det får inte marknadsföras som en fullständig ideologisk profil.

## Tre ersättare

Q03b (ätstörningsvård), K01 (konstregel) och K02 (tågvärdar) har tagits bort ur appens urval, inte ur researchhistoriken. De två första hade tolkningsproblem och den tredje saknade KD-position. Inga luckor har fyllts med antaganden. Sparade svar använder ny versionsnyckel v6; tidigare svar raderas inte eller återanvänds på ändrade frågor.

| Ny fråga | S | M | SD | V | C | KD | L | MP |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| N03 privata BUP-mottagningar | 1 | 2 | 1 | -2 | 2 | 2 | 2 | 1 |
| N04 arbetsdelning | 1 | 1 | -1 | 1 | 1 | 1 | -1 | 1 |
| N05 specialistcentrum för kvinnosjukvård | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 |

N03 och N05 använder SVT:s skalriktning: mycket bra +2, ganska bra +1, ganska dåligt -1, mycket dåligt -2. Originalfrågor och samtliga åtta svar kontrollerades på SVT:s regionala partisidor den 3 september 2026. Direkta länkar till alla partisidor finns på respektive fråga i appdata.

N03 behåller frågan om att privata vårdgivare ska få öppna BUP-mottagningar, inte kravlös fri etablering eller ett specificerat antal. MP:s ganska bra-svar står kvar trots invändningen mot fri etablering; deras acceptans av upphandlade tjänster förklaras. [1177:s PRIMA Handen-sida](https://www.1177.se/hitta-vard/kontaktkort/PRIMA-barn-och-ungdomspsykiatri-Handen/) belägger befintlig privat mottagning på regionens uppdrag. Frågan överlappar delvis den breda privatandelsfrågan; de mäter inte två oberoende politiska dimensioner.

N04 kommer från fråga 7 i [Funktionsrätt Stockholms läns valenkät](https://funktionsrattstockholmslan.se/intressepolitik/temaar/regionvalet-2026/valenkat-till-regionpolitikerna/), läst i original den 3 september. C, M, MP och V vill aktivt verka för förslaget; KD och S stöder det. Båda stödkategorierna kodas +1, inte olika styrka. L svarar nej/annat förslag, SD nej/annan lösning, båda -1. Detta betyder inte motstånd mot arbete för personer med funktionsnedsättning. SD:s uppgiftsväxling ligger begreppsligt nära arbetsdelning: alternativet måste visas, inte döljas bakom en ideologisk etikett. Nulägestextens pågående inkluderingsarbete är uttryckligen S:s och C:s redogörelse, inte ett oberoende verifierat genomföranderesultat. Enkätens formulering får inte omtolkas till allmän arbetstidsförkortning.

N05 är ett medvetet ämnesbreddsval med mycket liten åsiktsskillnad, inte en ny stor konflikt. Sju partier svarar mycket bra och SD ganska bra. Alla stöder förslaget. Det står uttryckligen i förklaringen. [Regionens beslut från december 2025](https://www.regionstockholm.se/nyheter/2025/12/beslut-om-en-mer-sammanhallen-kvinnosjukvard/) ger nulägesbakgrund men belägger inte att det föreslagna centrumet har öppnat. Med tio lika viktade svar kan denna frågas skillnad mellan SD och övriga bidra med högst 2,5 procentenheter före avrundning; med enbart denna fråga dubbelviktad högst cirka 4,55. Samsyn kan ändå påverka absoluta matchningsprocent och måste förklaras.

## Teknisk kontroll och kvarvarande publiceringskontroll

- Datavalidering: tio frågor, obligatoriska källor, giltiga skalor och positioner.
- Sexton apptester passerar: gemensam nämnare, ogiltiga data, skip, vikter, lika resultat, verkliga ti frågors dataset, ersättarnas matriser och resultatspärr.
- Produktionsbygge inklusive typkontroll passerar. Den nybyggda statiska versionen testades i webbläsaren på en separat lokal server: navigation genom alla tio frågor, rätt skalor för skatt/privatandel/kategoriska frågor och spärrad resultatsida efter sista svaret. Detta var inte ett fullständigt visuellt mobiltest.
- Samma besvarade frågor används för alla partier. Minst sex krävs; gränsen är ett redaktionellt val, inte statistiskt validerad.
- Endast regionvarianten och dess research ändras. Ingen ändring av originalappens kod eller gemensamma publiceringsflöden.

Kvar innan en ärlig klar-för-publicering-status: kontrollera den senast byggda versionens kompletta mobil-/desktopflöde, slutgranska språk och ämnesöverlapp samt dokumentera beslut om resultatspärren. Tio kompletta positionsrader är inte ensamt bevis för publiceringsberedskap. Ingen ny researchbeställning till Claude behövs bara för att fylla antalet tio.
