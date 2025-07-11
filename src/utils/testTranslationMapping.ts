
// Mapping functions to convert database content to translation keys

export const getCategoryTranslationKey = (categoryName: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Sănătate Mentală': 'testCategories.mentalHealth',
    'Mental Health': 'testCategories.mentalHealth',
    'Aptitudini Cognitive': 'testCategories.cognitiveAbilities',
    'Cognitive Abilities': 'testCategories.cognitiveAbilities',
    'Roluri în Echipă': 'testCategories.teamRoles',
    'Team Roles': 'testCategories.teamRoles',
    'Personalitate': 'testCategories.personality',
    'Personality': 'testCategories.personality',
    'Teste de Personalitate': 'testCategories.personality',
    'Personality Tests': 'testCategories.personality',
    'Leadership': 'testCategories.leadership',
    'Inteligență Emoțională': 'testCategories.emotionalIntelligence',
    'Emotional Intelligence': 'testCategories.emotionalIntelligence',
    'Dezvoltare Personală': 'testCategories.emotionalIntelligence', // This maps to emotional intelligence category
    'Personal Development': 'testCategories.emotionalIntelligence',
    'Bunăstare': 'testCategories.wellness',
    'Wellness': 'testCategories.wellness',
    'Wellness Psihologic': 'testCategories.psychologicalWellness',
    'Psychological Wellness': 'testCategories.psychologicalWellness',
    'Cognitiv': 'testCategories.cognitive',
    'Cognitive': 'testCategories.cognitive',
    'Abilități Tehnice': 'testCategories.technicalSkills',
    'Technical Skills': 'testCategories.technicalSkills',
    'Digital': 'testCategories.digital',
    'Senzorial': 'testCategories.sensory',
    'Sensory': 'testCategories.sensory'
  };

  return categoryMap[categoryName] || categoryName;
};

export const getTestNameTranslationKey = (testName: string): string => {
  const testNameMap: { [key: string]: string } = {
    'Beck Depression Inventory': 'testNames.beckDepressionInventory',
    'Beck Depression Inventory (BDI-II)': 'testNames.beckDepressionInventory',
    'Test de Aptitudini Cognitive': 'testNames.cognitiveAbilitiesTest',
    'Cognitive Abilities Test': 'testNames.cognitiveAbilitiesTest',
    'Test Aptitudini Cognitive': 'testNames.cognitiveAbilitiesTest',
    'Rolurile de Echipă Belbin': 'testNames.belbinTeamRoles',
    'Belbin Team Roles': 'testNames.belbinTeamRoles',
    'Roluri în Echipă Belbin': 'testNames.belbinTeamRoles',
    'Test de Personalitate Big Five': 'testNames.bigFivePersonality',
    'Big Five Personality Test': 'testNames.bigFivePersonality',
    'Test de Inteligență Emoțională': 'testNames.emotionalIntelligenceTest',
    'Emotional Intelligence Test': 'testNames.emotionalIntelligenceTest',
    'Inteligență Emoțională': 'testNames.emotionalIntelligenceTest',
    'Test de Leadership': 'testNames.leadershipTest',
    'Leadership Test': 'testNames.leadershipTest',
    'Test de Burnout Maslach': 'testNames.maslachBurnoutTest',
    'Maslach Burnout Test': 'testNames.maslachBurnoutTest',
    'Test de Stres Perceput': 'testNames.perceivedStressTest',
    'Perceived Stress Test': 'testNames.perceivedStressTest',
    'Test de Reziliență': 'testNames.resilienceTest',
    'Resilience Test': 'testNames.resilienceTest',
    'Evaluare Anxietate GAD-7': 'testNames.gad7AnxietyAssessment',
    'GAD-7 Anxiety Assessment': 'testNames.gad7AnxietyAssessment',
    'Test DISC - Stiluri de Comportament': 'testNames.discBehavioralStyles',
    'DISC Behavioral Styles Test': 'testNames.discBehavioralStyles',
    'DISC - Stiluri de Comportament': 'testNames.discBehavioralStyles',
    'Cattell 16PF': 'testNames.cattell16PF',
    '16PF Personality Test': 'testNames.cattell16PF',
    'Cattell 16PF Personality Test': 'testNames.cattell16PF'
  };

  return testNameMap[testName] || testName;
};

export const getTestDescriptionTranslationKey = (testName: string): string => {
  const descriptionMap: { [key: string]: string } = {
    'Beck Depression Inventory': 'testDescriptions.beckDepressionInventory',
    'Beck Depression Inventory (BDI-II)': 'testDescriptions.beckDepressionInventory',
    'Test de Aptitudini Cognitive': 'testDescriptions.cognitiveAbilitiesTest',
    'Cognitive Abilities Test': 'testDescriptions.cognitiveAbilitiesTest',
    'Test Aptitudini Cognitive': 'testDescriptions.cognitiveAbilitiesTest',
    'Rolurile de Echipă Belbin': 'testDescriptions.belbinTeamRoles',
    'Belbin Team Roles': 'testDescriptions.belbinTeamRoles',
    'Roluri în Echipă Belbin': 'testDescriptions.belbinTeamRoles',
    'Test de Personalitate Big Five': 'testDescriptions.bigFivePersonality',
    'Big Five Personality Test': 'testDescriptions.bigFivePersonality',
    'Test de Inteligență Emoțională': 'testDescriptions.emotionalIntelligenceTest',
    'Emotional Intelligence Test': 'testDescriptions.emotionalIntelligenceTest',
    'Inteligență Emoțională': 'testDescriptions.emotionalIntelligenceTest',
    'Test de Leadership': 'testDescriptions.leadershipTest',
    'Leadership Test': 'testDescriptions.leadershipTest',
    'Test de Burnout Maslach': 'testDescriptions.maslachBurnoutTest',
    'Maslach Burnout Test': 'testDescriptions.maslachBurnoutTest',
    'Test de Stres Perceput': 'testDescriptions.perceivedStressTest',
    'Perceived Stress Test': 'testDescriptions.perceivedStressTest',
    'Test de Reziliență': 'testDescriptions.resilienceTest',
    'Resilience Test': 'testDescriptions.resilienceTest',
    'Evaluare Anxietate GAD-7': 'testDescriptions.gad7AnxietyAssessment',
    'GAD-7 Anxiety Assessment': 'testDescriptions.gad7AnxietyAssessment',
    'Test DISC - Stiluri de Comportament': 'testDescriptions.discBehavioralStyles',
    'DISC Behavioral Styles Test': 'testDescriptions.discBehavioralStyles',
    'DISC - Stiluri de Comportament': 'testDescriptions.discBehavioralStyles',
    'Cattell 16PF': 'testDescriptions.cattell16PF',
    '16PF Personality Test': 'testDescriptions.cattell16PF',
    'Cattell 16PF Personality Test': 'testDescriptions.cattell16PF'
  };

  return descriptionMap[testName] || testName;
};

