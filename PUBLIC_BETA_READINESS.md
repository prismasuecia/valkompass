# Valkompas Public Beta Readiness

Last reviewed: 2026-06-03

## Strengths

- The app now uses the 20-question source file and the approved party position matrix.
- The result engine is deterministic: the same answers produce the same result.
- The UI is Spanish-only and written for Spanish-speaking residents in Sweden.
- The sources page explains the source basis and includes a public disclaimer that Valkompas is not affiliated with any political party.
- Every party has a source inventory with official program, policy page, and election-platform material or closest current official equivalent.
- Every question Q01-Q20 has at least one documented source justification in QUESTION_SOURCE_MAP.json.
- The methodology explains that closer answers produce higher results and that the result is not a voting recommendation.

## Weaknesses

- Several source mappings are thematic rather than exact per-party citations for each individual matrix value.
- Some parties have stronger official election-platform coverage than others.
- SD and C source coverage still needs a final human editorial check before public launch.
- The sources page does not yet display per-question source links to users.
- Full accessibility testing is not complete.
- Mobile visual QA across all pages is not complete.

## Remaining Risks

- Users may interpret percentages as exact compatibility unless result copy continues to keep percentages visually secondary.
- Party positions can change before the 2026 election, so source review must continue.
- If public scrutiny is high, thematic source coverage may not be enough; direct source links per question and party will be expected.
- Some model overlaps remain between M, KD, L and SD/KD, which should be explained transparently during beta evaluation.

## Transparency Score

96/100 for public beta.

The transparency baseline is strong for a beta because sources, methodology, update disclaimer, non-affiliation disclaimer, and question-source coverage now exist. It is not yet 100 because per-question source links are not exposed in the UI.

## Launch Recommendation

Recommendation: Public Beta.

Not yet recommended for a full public launch without beta label. Before full launch, add direct per-question/per-party source references and complete accessibility and mobile QA.
