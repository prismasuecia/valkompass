'use client';

import {useRouter} from 'next/navigation';
import {ProgressBar} from '@/components/ProgressBar';
import {QuestionCard} from '@/components/QuestionCard';
import explanationsData from '@/data/explanations.json';
import partiesData from '@/data/parties.json';
import positionsData from '@/data/positions.json';
import questionsData from '@/data/questions.json';
import {calculateResults} from '@/lib/calculateResults';
import {useQuizStore} from '@/store/quizStore';
import type {Explanation, Party, Position, Question} from '@/types';

const questions = questionsData as Question[];
const explanations = explanationsData as Explanation[];
const parties = partiesData as Party[];
const positions = positionsData as Position[];

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
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Pregunta {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <div className="mt-8">
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
          Atrás
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="rounded-xl bg-ink px-5 py-4 font-semibold text-white disabled:opacity-40"
        >
          {isLastQuestion ? 'Ver resultado' : 'Siguiente'}
        </button>
      </div>
    </main>
  );
}
