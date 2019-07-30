const phrase = 'good boy'
let sentence = 'All the good neighbors have brought their boy to teach them to ride a bike at the park today. They keep tumbling around but they are okay. But The good boy that picked good boy roger the litter is the one named Roger! Roger may not be good at riding the bike, but he has good manners.'
sentence = sentence.toLowerCase()

function searchForPhrase (inputPhrase, inputSentence) {
  const arrayOfPhrase = inputPhrase.split(' ')
  let arrayOfSentence = inputSentence.split(' ')
  const toBeHighlighted = []
  // Where:
  // arrayOfPhrase[0] is wordA
  // arrayOfPhrase[1] is wordB
  // arrayOfPhrase[2] is wordC

  let wordA
  let backupA
  let wordB

  // Optional variables depending on whether or not the phrase contains two or three words
  let backupB
  let wordC

  if (arrayOfPhrase.length === 3) {
    for (const wordInSentenceIndex in arrayOfSentence) {

      if (arrayOfSentence[wordInSentenceIndex].replace(/[^\w\s]|_/g, '') === arrayOfPhrase[0]) {
        // check whether or not wordA exists and act accordingly
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
          if (typeof (wordB) === 'undefined' || (backupB - backupA > 0 && wordB - wordA > backupB - backupA)) {
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

        // For 3-word
        // if (Math.abs(wordB - wordA) < Math.abs(wordB - backupA)) {
        //   backupA = wordA
        // }
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
  for (const index in toBeHighlighted) {
    console.log(toBeHighlighted[index])
    arrayOfSentence[toBeHighlighted[index]] = '<p>' + arrayOfSentence[toBeHighlighted[index]] + '<p>'
  }

  arrayOfSentence = arrayOfSentence.join(' ')
  return arrayOfSentence
}

console.log(searchForPhrase(phrase, sentence))
