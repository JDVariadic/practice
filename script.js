const phrase = 'good boy roger'
const sentence = 'the good person that picked the litter is that boy named roger! roger is really cool'

function searchForPhrase (inputPhrase, inputSentence) {
  // Split inputs into arrays
  const arrayOfPhrase = inputPhrase.split(' ')
  let arrayOfSentence = inputSentence.split(' ')

  const distanceFromBeginningOfSentence = []
  const distanceBetweenWords = []
  const listOfWordsBeingEnclosed = []

  for (const replacementWord in arrayOfPhrase) {
    // Add a loop that iterates over arrayOfSentence
    for (const wordInSentence in arrayOfSentence) {
      const wordBeingCompared = arrayOfSentence[wordInSentence].replace(/[^\w\s]|_/g, '')
      if (wordBeingCompared === arrayOfPhrase[replacementWord]) {
        distanceFromBeginningOfSentence.push(parseInt(wordInSentence, 10))
      }
    }
  }

  for (let i = 0; i < distanceFromBeginningOfSentence.length - 1; i++) {
    distanceBetweenWords.push(Math.abs(distanceFromBeginningOfSentence[i + 1] - distanceFromBeginningOfSentence[i]))
  }

  const distanceBetweenWordsCopy = distanceBetweenWords.slice(0)
  console.log('distanceBetweenWordsCopy ', distanceBetweenWordsCopy)

  for (let i = distanceBetweenWordsCopy.length - 1; i > 0; i--) {
    const shortestDistance = Math.min.apply(null, distanceBetweenWordsCopy)

    let firstGlobalIndex = distanceBetweenWordsCopy.indexOf(shortestDistance)
    firstGlobalIndex = distanceFromBeginningOfSentence[firstGlobalIndex]
    const firstWord = arrayOfSentence[firstGlobalIndex].replace(/[^\w\s]|_/g, '')

    let secondGlobalIndex = distanceBetweenWordsCopy.indexOf(shortestDistance) + 1
    secondGlobalIndex = distanceFromBeginningOfSentence[secondGlobalIndex]
    const secondWord = arrayOfSentence[secondGlobalIndex].replace(/[^\w\s]|_/g, '')
    // .replace(/[^\w\s]|_/g, '')
    if (secondWord.replace(/[^\w\s]|_/g, '') !== firstWord.replace(/[^\w\s]|_/g, '')) {
      listOfWordsBeingEnclosed.push(firstWord)
      listOfWordsBeingEnclosed.push(firstGlobalIndex)
      listOfWordsBeingEnclosed.push(secondWord)
      listOfWordsBeingEnclosed.push(secondGlobalIndex)
      break
    } else {
      distanceBetweenWordsCopy.splice(distanceBetweenWordsCopy.indexOf(shortestDistance), 1)
    }
  }

  let lastWord = arrayOfPhrase.filter(function (el) {
    return listOfWordsBeingEnclosed.indexOf(el, '') < 0
  })

  lastWord = lastWord[0]
  const lastWordGlobalDistancesInSentence = []

  for (const word in arrayOfSentence) {
    if (arrayOfSentence[word] === lastWord) {
      lastWordGlobalDistancesInSentence.push(arrayOfSentence.indexOf(arrayOfSentence[word]))
    }
  }

  // Checking for direction at which the last word would be selected
  // let referenceToLastWord
  // if (listOfWordsBeingEnclosed[1] < listOfWordsBeingEnclosed[3]) {
  //   referenceToLastWord = listOfWordsBeingEnclosed[0]
  // } else {
  //   referenceToLastWord = listOfWordsBeingEnclosed[2]
  // }

  // Iterate over lastWord candidates and initialize an array with their corresponding distances
  const lastWordRelativeDistances = []
  // for (const value in lastWordGlobalDistancesInSentence) {
  //   lastWordGlobalDistancesInSentence[value] = Math.abs(lastWordGlobalDistancesInSentence[value] - listOfWordsBeingEnclosed[listOfWordsBeingEnclosed.indexOf(referenceToLastWord) + 1])
  // }

  let lastWordIndex = Math.min.apply(null, lastWordGlobalDistancesInSentence)
  listOfWordsBeingEnclosed.push(lastWord)
  listOfWordsBeingEnclosed.push(lastWordIndex)

  for (let j = 1; j < listOfWordsBeingEnclosed.length; j = j + 2) {
    arrayOfSentence[listOfWordsBeingEnclosed[j]] = '<p>' + arrayOfSentence[listOfWordsBeingEnclosed[j]] + '</p>'
  }

  arrayOfSentence = arrayOfSentence.join(' ')
  console.log('actual array: ', arrayOfSentence)
  console.log(distanceFromBeginningOfSentence, ' distanceFromBeginningOfSentence')
  console.log(distanceBetweenWords, ' distanceBetweenWords')
  console.log(distanceBetweenWordsCopy, 'distanceBetweenWordsCopy')
  console.log('words to be used: ', listOfWordsBeingEnclosed)
  // console.log('last word: ', lastWord)
  // console.log('lastWordGlobalDistancesInSentence: ', lastWordGlobalDistancesInSentence)
  // console.log('lastWordIndex: ', lastWordIndex)
}

searchForPhrase(phrase, sentence)

// Stuff to do
// Keep track of the order of the arrayOfPhrase.
// As of now, the program does not check the order of the phrases.

// Fix the program for a two word phrase
// Fix issue where array doesnt compute for lastWord distance properly AND select the last word with the LEAST distance

// Fix issue where the function does not take into account the order of the phrase (it treats the phrase like three separate words)
