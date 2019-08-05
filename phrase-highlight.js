const phrase = 'good boy roger'
let sentence = 'All the good roger good neighbors good have brought their roger good good boy to teach them to ride a bike at the park today. They keep tumbling around but they are okay. But The good boy that picked the litter is the one named Roger! Roger may not be good at riding the bike, but he has good manners.'
sentence = sentence.toLowerCase()

function searchForPhrase (inputPhrase, inputSentence) {
  const arrayOfPhrase = inputPhrase.split(' ')
  let arrayOfSentence = inputSentence.split(' ')
  const toBeHighlighted = []
  let wordA
  let backupA
  let wordB

  // Optional variables depending on whether or not the phrase contains two or three words
  let backupB
  let wordC

  if (arrayOfPhrase.length === 3) {
    if (arrayOfPhrase[0] === arrayOfPhrase[1] && arrayOfPhrase[0] === arrayOfPhrase[2]) {
      for (const wordInSentenceIndex in arrayOfSentence) {
        if (arrayOfSentence[wordInSentenceIndex].replace(/[^\w\s]|_/g, '') === arrayOfPhrase[0]) {
          if (typeof wordA === 'undefined') {
            wordA = wordInSentenceIndex
          } else if (typeof wordB === 'undefined') {
            wordB = wordInSentenceIndex
          } else if (typeof wordC === 'undefined') {
            wordC = wordInSentenceIndex
          }

          if (typeof wordA !== 'undefined') {
            backupA = wordInSentenceIndex
          }
        }
      }
    }

    for (const wordInSentenceIndex in arrayOfSentence) {
      // If the two or three word phrase is 'good good' or 'good good good', the program doesnt work properly
      if (arrayOfSentence[wordInSentenceIndex].replace(/[^\w\s]|_/g, '') === arrayOfPhrase[0]) {

        if (typeof (wordA) === 'undefined') {
          wordA = wordInSentenceIndex
        } else if (typeof (wordA) !== 'undefined') {
          if (typeof (wordB) === 'undefined') {
            backupA = wordInSentenceIndex
            wordA = backupA
          } else {
            backupA = wordInSentenceIndex
          }
        }

      } else if (arrayOfSentence[wordInSentenceIndex].replace(/[^\w\s]|_/g, '') === arrayOfPhrase[1]) {
        // Check whether or not wordB and wordA exists and act accordingly
        // Instances when backupB traverses but is not assigned to wordB
        // Instances when both backupB and wordB change (through calculating distances)
        if (typeof (wordA) !== 'undefined') {
          if (typeof (wordB) === 'undefined' || (backupB - backupA > 0 && wordB - wordA > backupB - backupA && backupB < wordC)) {
            // Problem somewhere here for test-case 'boy good roger'
            wordB = wordInSentenceIndex
            backupB = wordB
          } else if (typeof (wordB) !== 'undefined') {
            backupB = wordInSentenceIndex
          }
        }

      } else if (arrayOfSentence[wordInSentenceIndex].replace(/[^\w\s]|_/g, '') === arrayOfPhrase[2]) {

        if (typeof wordC === 'undefined' && typeof wordB !== 'undefined' && typeof wordA !== 'undefined') {
          wordC = wordInSentenceIndex
        }
        // Check if new wordC (wordInSentenceIndex) is nearer to backupB than wordC is to wordB
        if (wordInSentenceIndex - backupB > 0 && wordInSentenceIndex - backupB < wordC - wordB) {
          wordC = wordInSentenceIndex
          wordB = backupB
          wordA = backupA
        }
      }
    }
  } else if (arrayOfPhrase.length === 2) {
    if (arrayOfPhrase[0] === arrayOfPhrase[1]) {
      for (const wordInSentenceIndex in arrayOfSentence) {
        if (arrayOfSentence[wordInSentenceIndex] === arrayOfPhrase[0]) {
          if (typeof (wordA) === 'undefined') {
            wordA = wordInSentenceIndex
          } else if (typeof (wordA) !== 'undefined' && typeof (wordB) === 'undefined') {
            wordB = wordInSentenceIndex
          } else if (typeof (wordA) !== 'undefined' && typeof (wordB) !== 'undefined') {
            // Reverse backupA and condition check?
            if (wordInSentenceIndex - backupA < wordB - wordA) {
              wordA = backupA
              wordB = wordInSentenceIndex
              console.log(backupA)
              console.log(wordInSentenceIndex)
            }

            if (backupA - wordB < wordB - wordA) {
              wordA = wordB
              wordB = backupA
            }
            backupA = wordInSentenceIndex
          }
        }
      }
    } else {
      for (const wordInSentenceIndex in arrayOfSentence) {
        if (arrayOfSentence[wordInSentenceIndex] === arrayOfPhrase[0]) {

          if (typeof (wordA) === 'undefined') {
            wordA = wordInSentenceIndex
          } else if (typeof (wordA) !== 'undefined') {
            if (typeof (wordB) === 'undefined') {
              backupA = wordInSentenceIndex
              wordA = backupA
            } else if (typeof (wordB) !== 'undefined') {
              backupA = wordInSentenceIndex
            }
          }

        } else if (arrayOfSentence[wordInSentenceIndex] === arrayOfPhrase[1]) {

          if (typeof (wordA) !== 'undefined' && typeof (wordB) === 'undefined') {
            wordB = wordInSentenceIndex
          }

          if (wordInSentenceIndex - backupA > 0 && wordInSentenceIndex - backupA < wordB - wordA) {
            wordA = backupA
            wordB = wordInSentenceIndex
          }
        }
      }
    }
  } else {
    return 'invalid amount of words in the phrase'
  }

  toBeHighlighted.push(wordA)
  toBeHighlighted.push(wordB)
  if (typeof wordC !== 'undefined') {
    toBeHighlighted.push(wordC)
  }
  console.log(toBeHighlighted)
  if (toBeHighlighted.length === arrayOfPhrase.length) {
    for (const index in toBeHighlighted) {
      arrayOfSentence[toBeHighlighted[index]] = '<p>' + arrayOfSentence[toBeHighlighted[index]] + '<p>'
    }
  }

  arrayOfSentence = arrayOfSentence.join(' ')
  return arrayOfSentence
}

console.log(searchForPhrase(phrase, sentence))
