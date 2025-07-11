
import { getScoreInterpretation } from './testScoring';
import { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback } from './cognitiveAbilitiesCalculator';

export function formatTestResults(testResult: any) {
  const { score, test_types } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile'
    };
  }

  const testName = test_types?.name || '';
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  return {
    overall,
    dimensions,
    interpretation: getScoreInterpretation(overall, testName).description,
    testName
  };
}

// Re-export for backward compatibility
export { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback as calculateCognitiveAbilitiesScore } from './cognitiveAbilitiesCalculator';
