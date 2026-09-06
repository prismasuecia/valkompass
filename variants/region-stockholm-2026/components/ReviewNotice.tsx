import data from '@/data/questions.json';
import {canShowResults} from '@/lib/publicationGate.mjs';

export function ReviewNotice() {
  if (canShowResults(data.status)) return null;
  return <p role="note" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-slate-800">Versión de prueba: las preguntas y las posiciones de los partidos siguen en revisión. Los resultados están desactivados.</p>;
}
