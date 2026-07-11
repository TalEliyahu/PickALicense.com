import { useMemo, useState } from "react";
import { questions, type QuestionId } from "@pickalicense/catalog";
import { recommendLicenses, type AnswerMap } from "@pickalicense/engine";

export function App() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const currentQuestion = questions.find((question) => answers[question.id] === undefined);
  const result = useMemo(() => recommendLicenses(answers), [answers]);
  const answeredCount = Object.keys(answers).length;

  function answerQuestion(questionId: QuestionId, optionId: string) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function restart() {
    setAnswers({});
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 lg:px-12">
        <aside className="md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
          <div className="flex h-full flex-col justify-between border-y border-line py-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cobalt">PickALicense v2</p>
              <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Explainable license selection for software maintainers.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-neutral-700">
                This preview uses safety checks, hard constraints, and preference ranking instead of a brittle binary tree.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 border border-line text-sm">
              <div className="border-r border-line p-4">
                <dt className="font-mono text-xs uppercase text-neutral-500">Answers</dt>
                <dd className="mt-2 text-2xl font-semibold">{answeredCount}</dd>
              </div>
              <div className="border-r border-line p-4">
                <dt className="font-mono text-xs uppercase text-neutral-500">Catalog</dt>
                <dd className="mt-2 text-2xl font-semibold">6</dd>
              </div>
              <div className="p-4">
                <dt className="font-mono text-xs uppercase text-neutral-500">Status</dt>
                <dd className="mt-2 text-sm font-semibold">{result.status === "needs-review" ? "Review" : "Ready"}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className="space-y-6">
          {currentQuestion ? (
            <QuestionPanel answers={answers} onAnswer={answerQuestion} question={currentQuestion} />
          ) : (
            <ResultPanel onRestart={restart} result={result} />
          )}

          <section aria-label="Answered questions" className="border border-line bg-white/60 p-5">
            <h2 className="text-lg font-semibold">Path so far</h2>
            {answeredCount === 0 ? (
              <p className="mt-3 text-sm text-neutral-600">No answers yet.</p>
            ) : (
              <ol className="mt-4 space-y-3">
                {questions
                  .filter((question) => answers[question.id] !== undefined)
                  .map((question) => {
                    const option = question.options.find((item) => item.id === answers[question.id]);
                    return (
                      <li className="grid gap-1 border-l-2 border-cobalt pl-4" key={question.id}>
                        <span className="text-sm font-medium">{question.title}</span>
                        <span className="text-sm text-neutral-600">{option?.label}</span>
                      </li>
                    );
                  })}
              </ol>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function QuestionPanel({
  answers,
  onAnswer,
  question
}: {
  answers: AnswerMap;
  onAnswer: (questionId: QuestionId, optionId: string) => void;
  question: (typeof questions)[number];
}) {
  return (
    <section className="border border-line bg-white p-5 shadow-sm md:p-7" aria-labelledby={`${question.id}-title`}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cobalt">
        Question {Object.keys(answers).length + 1} of {questions.length}
      </p>
      <h2 id={`${question.id}-title`} className="mt-4 text-2xl font-semibold md:text-3xl">
        {question.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">{question.whyItMatters}</p>

      <div className="mt-6 grid gap-3" role="group" aria-labelledby={`${question.id}-title`}>
        {question.options.map((option) => (
          <button
            className="group border border-line bg-paper/60 p-4 text-left transition hover:border-cobalt hover:bg-white focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2"
            key={option.id}
            type="button"
            onClick={() => onAnswer(question.id, option.id)}
          >
            <span className="block text-base font-semibold">{option.label}</span>
            <span className="mt-1 block text-sm leading-6 text-neutral-600">{option.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ResultPanel({
  onRestart,
  result
}: {
  onRestart: () => void;
  result: ReturnType<typeof recommendLicenses>;
}) {
  return (
    <section className="space-y-5" aria-labelledby="result-title">
      <div className="border border-line bg-white p-5 md:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cobalt">Result</p>
        <h2 id="result-title" className="mt-4 text-3xl font-semibold">
          {result.status === "needs-review" ? "Professional review recommended" : "Recommended shortlist"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
          The output is educational decision support, not legal advice. Initial profiles are marked unreviewed.
        </p>
      </div>

      {result.safetyStops.length > 0 && (
        <div className="space-y-3" aria-label="Safety stops">
          {result.safetyStops.map((stop) => (
            <article className="border border-caution bg-orange-50 p-5" key={stop.code}>
              <h3 className="text-lg font-semibold">{stop.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{stop.detail}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                {stop.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        {result.recommended.map((candidate) => (
          <article className="border border-line bg-white p-5" key={candidate.license.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{candidate.license.name}</h3>
                <p className="mt-1 font-mono text-xs text-neutral-500">{candidate.license.id}</p>
              </div>
              <span className="border border-signal px-3 py-1 text-sm font-medium text-signal">
                Score {candidate.score}
              </span>
            </div>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-700">
              {candidate.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {result.unresolved.length > 0 && (
        <div className="border border-line bg-white p-5">
          <h3 className="text-lg font-semibold">Unresolved concerns</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {result.unresolved.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2"
        type="button"
        onClick={onRestart}
      >
        Start over
      </button>
    </section>
  );
}
