
function getActualDimensionKey(key: string): string {
  const keyMap: { [key: string]: string } = {
    '0': 'verbal',
    '1': 'numeric', 
    '2': 'logic',
    '3': 'spatial',
    '4': 'abstract'
  };
  
  return keyMap[key] || key;
}

export function getDimensionExplanation(testName: string, dimensionKey: string): {
  description: string;
  interpretations?: {
    high: string;
    low: string;
  };
  yourScore?: {
    high?: string;
    moderate?: string;
    low?: string;
  };
} {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    switch (dimensionKey) {
      case 'openness':
        return {
          description: 'Deschiderea la experiență reflectă curiozitatea intelectuală, creativitatea și deschiderea către idei noi. Persoanele cu scoruri ridicate sunt imaginative, artistice și aventuroase.',
          interpretations: {
            high: 'Ești o persoană creativă, curioasă și deschisă la experiențe noi.',
            low: 'Preferi stabilitatea și rutina, fiind mai conservator în abordări.'
          }
        };
      case 'conscientiousness':
        return {
          description: 'Conștiinciozitatea indică nivelul de organizare, disciplină și orientare către obiective. Persoanele conștiincioase sunt ordonate, punctuale și perseverente.',
          interpretations: {
            high: 'Ești o persoană organizată, disciplinată și orientată către obiective.',
            low: 'Ești mai spontan și flexibil, dar poți avea provocări cu organizarea.'
          }
        };
      case 'extraversion':
        return {
          description: 'Extraversia măsoară sociabilitatea, energia și tendința de a căuta stimulare din mediul extern. Extraveriții sunt vorbiți, asertivi și energici în interacțiunile sociale.',
          interpretations: {
            high: 'Ești o persoană sociabilă, energică și confortabilă în grupuri.',
            low: 'Preferi interacțiunile mai intime și timpul petrecut singur pentru reîncărcare.'
          }
        };
      case 'agreeableness':
        return {
          description: 'Agreabilitatea reflectă tendința de a fi cooperant, empatic și încrezător în relațiile cu ceilalți. Persoanele agreabile sunt altruiste, înțelegătoare și armonioase.',
          interpretations: {
            high: 'Ești o persoană empatică, cooperantă și orientată către armonie.',
            low: 'Ești mai direct și competitiv, prioritizând obiectivitatea.'
          }
        };
      case 'neuroticism':
        return {
          description: 'Neuroticismul indică instabilitatea emoțională și tendința de a experimenta emoții negative. Scoruri ridicate sugerează anxietate și mood variabil, scoruri scăzute indică stabilitate emoțională.',
          interpretations: {
            high: 'Poți experimenta emoții intense, fiind important să dezvolți strategii de gestionare.',
            low: 'Ai o stabilitate emoțională bună și reziști bine la stres.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la profilul general de personalitate Big Five.'
        };
    }
  }
  
  if (testKey === 'test aptitudini cognitive') {
    const actualKey = getActualDimensionKey(dimensionKey);
    
    switch (actualKey) {
      case 'verbal':
        return {
          description: 'Raționamentul verbal evaluează capacitatea de a înțelege și manipula informații prezentate în cuvinte. Include înțelegerea vocabularului, analogiilor și relațiilor semantice.',
          interpretations: {
            high: 'Ai abilități verbale excelente, fiind priceput la comunicare și înțelegerea textelor complexe.',
            low: 'Poți dezvolta aceste abilități prin lectură regulată și exerciții de vocabular.'
          }
        };
      case 'numeric':
        return {
          description: 'Raționamentul numeric măsoară capacitatea de a lucra cu numere, concepte matematice și relații cantitative. Include aritmetica, secvențele numerice și problemele matematice.',
          interpretations: {
            high: 'Ai abilități matematice puternice și poți rezolva probleme numerice complexe cu ușurință.',
            low: 'Poți îmbunătăți aceste abilități prin practică regulată și exerciții matematice.'
          }
        };
      case 'logic':
        return {
          description: 'Raționamentul logic evaluează capacitatea de a identifica modele, de a face deducții și de a rezolva probleme folosind reguli logice.',
          interpretations: {
            high: 'Ai abilități logice excelente și poți analiza situații complexe în mod sistematic.',
            low: 'Poți dezvolta gândirea logică prin exerciții de logică și rezolvarea de puzzle-uri.'
          }
        };
      case 'spatial':
        return {
          description: 'Raționamentul spațial măsoară capacitatea de a vizualiza și manipula obiecte în spațiu. Include rotația mentală și percepția formelor.',
          interpretations: {
            high: 'Ai abilități spațiale puternice, fiind priceput la vizualizarea și manipularea obiectelor.',
            low: 'Poți îmbunătăți aceste abilități prin exerciții de vizualizare și jocuri spațiale.'
          }
        };
      case 'abstract':
        return {
          description: 'Raționamentul abstract evaluează capacitatea de a identifica modele complexe și de a gândi conceptual dincolo de informațiile concrete.',
          interpretations: {
            high: 'Ai abilități abstracte excelente și poți identifica patterns și concepte complexe.',
            low: 'Poți dezvolta gândirea abstractă prin exerciții de recunoaștere a tiparelor.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la evaluarea generală a aptitudinilor cognitive.'
        };
    }
  }

  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    switch (dimensionKey.toUpperCase()) {
      case 'A':
        return {
          description: 'Căldura (Warmth) - măsoară sociabilitatea și atașamentul față de oameni.',
          interpretations: {
            high: 'Ești o persoană caldă, sociabilă, care se atașează ușor de oameni și preferă să lucreze în echipă.',
            low: 'Ești mai rezervat, formal și preferi să păstrezi distanța în relațiile cu ceilalți.'
          }
        };
      case 'B':
        return {
          description: 'Raționamentul (Reasoning) - evaluează inteligența și capacitatea de rezolvare a problemelor.',
          interpretations: {
            high: 'Ai capacități intelectuale superioare și rezolvi cu ușurință probleme complexe și abstracte.',
            low: 'Preferi abordări concrete și practice, fiind mai confortabil cu probleme simple și clare.'
          }
        };
      case 'C':
        return {
          description: 'Stabilitatea Emoțională - măsoară capacitatea de a face față stresului și emoțiilor.',
          interpretations: {
            high: 'Ești stabil emoțional, calm sub presiune și poți gestiona bine situațiile stresante.',
            low: 'Poți fi mai reactiv emoțional și afectat de situațiile stresante sau neașteptate.'
          }
        };
      case 'E':
        return {
          description: 'Dominanța - evaluează assertivitatea și tendința de a conduce.',
          interpretations: {
            high: 'Ești asertiv, dominant și îți place să conduci și să iei decizii importante.',
            low: 'Ești mai deferent, preferi să urmezi decât să conduci și eviți conflictele.'
          }
        };
      case 'F':
        return {
          description: 'Vivacitatea - măsoară entuziasmul și energia în interacțiunile sociale.',
          interpretations: {
            high: 'Ești plin de viață, entuziast, spontan și aduci energie pozitivă în grup.',
            low: 'Ești mai serios, prudent și preferi să reflectezi înainte de a acționa.'
          }
        };
      case 'G':
        return {
          description: 'Conștiința Regulilor - evaluează respectarea normelor și a regulilor sociale.',
          interpretations: {
            high: 'Ești conștiincios, respecti regulile și ai principii morale puternice.',
            low: 'Ești mai flexibil cu regulile și poți fi mai oportunist în anumite situații.'
          }
        };
      case 'H':
        return {
          description: 'Îndrăzneala Socială - măsoară curajul în situații sociale noi.',
          interpretations: {
            high: 'Ești îndrăzneț social, nu te temi să încerci lucruri noi și să cunoști oameni noi.',
            low: 'Ești mai timid, precaut în situații sociale și preferi medii familiare.'
          }
        };
      case 'I':
        return {
          description: 'Sensibilitatea - evaluează empatia și receptivitatea emoțională.',
          interpretations: {
            high: 'Ești sensibil, empatic, artistic și acorzi importanță sentimentelor și esteticii.',
            low: 'Ești mai pragmatic, orientat către fapte și poți fi mai puțin sensibil la nuanțe emoționale.'
          }
        };
      case 'L':
        return {
          description: 'Vigilența - măsoară suspiciunea și prudența în relațiile cu ceilalți.',
          interpretations: {
            high: 'Ești vigilent, prudent și poți fi suspicios față de motivele celorlalți.',
            low: 'Ești încrezător, accepti pe alții cu ușurință și crezi în bunele lor intenții.'
          }
        };
      case 'M':
        return {
          description: 'Abstractizarea - evaluează tendința către gândirea abstractă și imaginația.',
          interpretations: {
            high: 'Ești abstract, imaginativ, teoretician și te orientezi către idei și concepte.',
            low: 'Ești practic, orientat către realitate și preferi abordări concrete și măsurabile.'
          }
        };
      case 'N':
        return {
          description: 'Intimitatea - măsoară deschiderea și transparența în relații.',
          interpretations: {
            high: 'Ești privat, diplomatic, calculat și îți păstrezi gândurile pentru tine.',
            low: 'Ești deschis, direct, natural și transparent în comunicare și relații.'
          }
        };
      case 'O':
        return {
          description: 'Aprehensiunea - evaluează anxietatea și tendința către îngrijorare.',
          interpretations: {
            high: 'Ești aprehensiv, îngrijorat și poți avea tendința să te îndoiești de tine.',
            low: 'Ești încrezător în tine, calm și optimist față de viitor.'
          }
        };
      case 'Q1':
        return {
          description: 'Deschiderea la Schimbare - măsoară receptivitatea față de idei și schimbări noi.',
          interpretations: {
            high: 'Ești deschis la schimbare, inovator și experimentezi cu idei și abordări noi.',
            low: 'Ești tradițional, conservator și preferi metodele și valorile stabilite.'
          }
        };
      case 'Q2':
        return {
          description: 'Independența - evaluează preferința pentru lucrul individual versus în grup.',
          interpretations: {
            high: 'Ești independent, autonom și preferi să iei decizii și să lucrezi singur.',
            low: 'Ești orientat către grup, colaborativ și preferi să lucrezi cu alții.'
          }
        };
      case 'Q3':
        return {
          description: 'Perfecționismul - măsoară controlul de sine și organizarea.',
          interpretations: {
            high: 'Ești perfecționist, disciplinat, organizat și ai un control de sine excelent.',
            low: 'Ești mai relaxat cu regulile, spontan și poți tolera dezordinea.'
          }
        };
      case 'Q4':
        return {
          description: 'Tensiunea - evaluează nivelul de stress și nervozitate internă.',
          interpretations: {
            high: 'Ești tensionat, nerăbdător, sub presiune și poți fi frustrat de ritmul evenimentelor.',
            low: 'Ești relaxat, calm, pacient și adaptabil la schimbări.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la profilul general de personalitate 16PF.'
        };
    }
  }
  
  return {
    description: 'Această dimensiune contribuie la profilul general al testului.'
  };
}
