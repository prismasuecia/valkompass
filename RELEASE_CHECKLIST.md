# Valkompas Release Checklist

Last reviewed: 2026-06-03

## Functionality

- [x] App uses 20-question source file.
- [x] App uses partyPositions.json for party positions.
- [x] Start page displays 20 questions.
- [x] Quiz progress displays 20 questions.
- [x] Result page displays 20 compared questions.
- [x] Same answers produce deterministic results.
- [x] TypeScript typecheck passes.
- [ ] Full browser click-through on mobile viewport.
- [ ] Full browser click-through on desktop viewport.

## Transparency

- [x] Sources page exists.
- [x] Footer links to Fuentes y metodología.
- [x] Every party has source inventory placeholders replaced with source links.
- [x] Last reviewed date appears per party.
- [x] Update disclaimer appears on the sources page.
- [ ] Replace weaker election-platform sources with current national 2026 election material where available.
- [ ] Add direct per-question source links for public launch.

## Methodology

- [x] Methodology explains that results compare answers with public party positions.
- [x] Methodology explains that closer answers produce higher results.
- [x] Methodology states limitations.
- [x] Result page states same answers generate same result.
- [x] Result page avoids always showing high-match classification.
- [ ] Add optional source notes for each displayed party answer.

## Accessibility

- [x] HTML language is Spanish.
- [x] Buttons use clear text labels.
- [x] Progress bar has accessible label.
- [ ] Keyboard-only quiz flow test.
- [ ] Screen-reader smoke test.
- [ ] Color contrast check for party colors and text.

## Mobile Testing

- [x] Mobile-first layout exists.
- [ ] Test start page at 390px width.
- [ ] Test quiz page at 390px width.
- [ ] Test result page at 390px width.
- [ ] Test sources page at 390px width.
- [ ] Confirm no button text wraps awkwardly.

## Release Recommendation

Current recommendation: RC1 candidate for closed beta, not public launch.
