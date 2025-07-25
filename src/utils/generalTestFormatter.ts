
export interface FormattedTestResult {
  overall: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  testName: string;
}

export function formatGeneralTestResult(testResult: any): FormattedTestResult {
  if (!testResult || !testResult.test_types) {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile',
      testName: 'Test necunoscut'
    };
  }

  const testName = testResult.test_types.name || 'Test necunoscut';
  const score = testResult.score || {};
  
  // Extract overall score
  const overall = typeof score.overall === 'number' ? score.overall : 0;
  
  // Extract and sanitize dimensions
  const dimensions = score.dimensions || {};
  const sanitizedDimensions: Record<string, number> = {};
  
  Object.entries(dimensions).forEach(([key, value]) => {
    sanitizedDimensions[key] = typeof value === 'number' ? value : 0;
  });
  
  // Generate interpretation based on score
  let interpretation = 'Scor calculat';
  if (overall >= 80) {
    interpretation = 'Scor foarte ridicat - Rezultat excelent';
  } else if (overall >= 60) {
    interpretation = 'Scor ridicat - Rezultat bun';
  } else if (overall >= 40) {
    interpretation = 'Scor mediu - Rezultat satisfăcător';
  } else {
    interpretation = 'Scor scăzut - Poate fi îmbunătățit';
  }
  
  return {
    overall,
    dimensions: sanitizedDimensions,
    interpretation,
    testName
  };
}
