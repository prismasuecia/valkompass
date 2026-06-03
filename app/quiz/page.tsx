'use client';

import {useRouter} from 'next/navigation';
import {ProgressBar} from '@/components/ProgressBar';
import {QuestionCard} from '@/components/QuestionCard';
import partiesData from '@/data/parties.json';
import {calculateResults} from '@/lib/calculateResults';
import {explanations, positions, questions} from '@/lib/valkompasData';
import {useQuizStore} from '@/store/quizStore';
import type {Party} from '@/types';
import uiText from '@/uiText.json';

const parties = partiesData as Party[];
const averageSecondsPerQuestion = 12;

export default function QuizPage() {
  const router = useRouter();
  const {
    currentQuestionIndex,
    answers,
    importantQuestions,
    language,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    setResults,
    toggleImportantQuestion
  } = useQuizStore();

  const question = questions[currentQuestionIndex];
  const selectedAnswer = answers.find((answer) => answer.questionId === question.id);
  const explanation = explanations.find((item) => item.id === question.explanationId);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const remainingSeconds = (questions.length - currentQuestionIndex - 1) * averageSecondsPerQuestion;
  const timeUnit = uiText.quizInfo.timeValue.split(' ').at(-1);
  const remainingTimeText = `${Math.ceil(remainingSeconds / 60)} ${timeUnit}`;

  function handleNext() {
    if (!selectedAnswer) return;

    if (isLastQuestion) {
      setResults(calculateResults({answers, importantQuestions, parties, positions, questions}));
      router.push('/result');
      return;
    }

    nextQuestion();
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-700">
          {uiText.progress.question} {currentQuestionIndex + 1} {uiText.progress.of} {questions.length}
        </p>
        <p className="text-sm font-medium text-slate-500">{progressPercent}%</p>
      </div>
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <p className="mt-3 text-sm text-slate-600">
        {uiText.progress.estimatedTime}: {remainingTimeText}
      </p>
      <div className="mt-10">
        <QuestionCard
          question={question}
          explanation={explanation}
          language={language}
          selectedValue={selectedAnswer?.value}
          important={importantQuestions.includes(question.id)}
          onAnswer={(value) => answerQuestion({questionId: question.id, value})}
          onToggleImportant={() => toggleImportantQuestion(question.id)}
        />
      </div>
      <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3">
        <button
          type="button"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="rounded-xl border border-line bg-white px-5 py-4 font-medium text-ink disabled:opacity-40"
        >
          {uiText.buttons.back}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="rounded-xl bg-ink px-5 py-4 font-semibold text-white disabled:opacity-40"
        >
          {isLastQuestion ? uiText.buttons.finish : uiText.buttons.next}
        </button>
      </div>
    </main>
  );
}
