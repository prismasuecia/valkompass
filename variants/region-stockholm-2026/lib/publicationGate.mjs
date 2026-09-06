// Fail closed. Dataset approval is separate from mathematical correctness.
export function canShowResults(status) {
  return status === 'publication-approved';
}
