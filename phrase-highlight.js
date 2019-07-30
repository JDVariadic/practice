const phrase = 'boy roger'
const sentence = 'boy boy roger roger all the good neighbors have brought their boy to teach good them to ride a good bike at the park today. they keep tumbling around but they are okay. but The good boy that picked the litter is the one named roger! roger may not be good at riding the bike, but he has good manners.'

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
  // let wordBackupB
  // let wordC

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

      // For 3-word
      // if (Math.abs(wordB - wordA) < Math.abs(wordB - backupA)) {
      //   backupA = wordA
      // }
    }
  }

  toBeHighlighted.push(wordA)
  toBeHighlighted.push(wordB)
  for (const index in toBeHighlighted) {
    arrayOfSentence[toBeHighlighted[index]] = '<p>' + arrayOfSentence[toBeHighlighted[index]] + '<p>'
  }
  console.log('wordA', wordA)
  console.log('backupA', backupA)
  console.log('wordB', wordB)
  arrayOfSentence = arrayOfSentence.join(' ')
  return arrayOfSentence
}

console.log(searchForPhrase(phrase, sentence))
