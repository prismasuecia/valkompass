# Valkompas

## Google Analytics Setup

1. Create a Google Analytics 4 web data stream and copy its measurement ID, for example `G-XXXXXXXXXX`.
2. For local development, add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to `.env.local`.
3. For GitHub Pages, create a repository variable named `NEXT_PUBLIC_GA_MEASUREMENT_ID` under **Settings > Secrets and variables > Actions > Variables**.
4. Build or deploy the app. When the variable is missing, Valkompas does not load Google Analytics or send analytics events.

GA4 automatically provides visitor totals, device category, country and traffic-source reports. Valkompas also sends these events:

- `quiz_started`: The user clicks “Comenzar ahora”.
- `quiz_completed`: The user completes the final quiz question and continues to the result.
- `explanation_opened`: The user opens a question explanation.
- `important_question_used`: The user activates “Pregunta importante”.
