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
    <main className="mx-auto min-h-screen max-w-2xl px-4 pb-28 pt-4 sm:px-5 sm:py-8 min-[1200px]:max-w-[1200px] min-[1200px]:px-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-700">
          {uiText.progress.question} {currentQuestionIndex + 1} {uiText.progress.of} {questions.length}
        </p>
        <p className="text-sm font-semibold text-slate-700">{progressPercent}%</p>
      </div>
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <p className="mt-2 text-sm text-slate-600">
        {uiText.progress.estimatedTime}: {remainingTimeText}
      </p>
      <div className="mt-4 sm:mt-8">
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
      <div className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-2 gap-3 border-t border-line bg-white/95 px-4 py-3 sm:static sm:mx-auto sm:mt-6 sm:max-w-xl sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 min-[1200px]:ml-0 min-[1200px]:mr-auto min-[1200px]:w-[66%] min-[1200px]:max-w-none">
        <button
          type="button"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="min-h-[52px] rounded-2xl border border-line bg-white px-5 py-4 font-medium text-ink transition-colors hover:border-slate-300 hover:bg-paper disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:opacity-70"
        >
          {uiText.buttons.back}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="min-h-[52px] rounded-2xl bg-ink px-5 py-4 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {isLastQuestion ? uiText.buttons.finish : uiText.buttons.next}
        </button>
      </div>
    </main>
  );
}
