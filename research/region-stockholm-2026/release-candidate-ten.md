# Ti frågors lokala releasekandidat — 2026-09-03

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
