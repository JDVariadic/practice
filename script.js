const phrase = 'roger good boy'
const sentence = 'the roger person that good good picked the litter is that boy named roger!'

function searchForPhrase (inputPhrase, inputSentence) {
  // Split inputs into arrays
  const arrayOfPhrase = inputPhrase.split(' ')
  let arrayOfSentence = inputSentence.split(' ')

  const distanceFromBeginningOfSentence = []
  const distanceBetweenWords = []
  const listOfWordsBeingEnclosed = []

  // Add a loop that iterates over arrayOfSentence
  for (const wordInSentence in arrayOfSentence) {
    for (const replacementWord in arrayOfPhrase) {
      const wordBeingCompared = arrayOfSentence[wordInSentence].replace(/[^\w\s]|_/g, '')
      if (wordBeingCompared === arrayOfPhrase[replacementWord]) {
        distanceFromBeginningOfSentence.push(parseInt(wordInSentence, 10))
      }
    }
  }

  // Find Relative Distances of each word in the phrase
  for (let i = 0; i < distanceFromBeginningOfSentence.length - 1; i++) {
    distanceBetweenWords.push(Math.abs(distanceFromBeginningOfSentence[i + 1] - distanceFromBeginningOfSentence[i]))
  }

  // Copy the relative distance array to use it as reference in the for loop
  const distanceBetweenWordsCopy = distanceBetweenWords.slice(0)

  // Iterating in reverse as elements would be removed from the copy
  // Checks for the shortest distance between two words
  // Also checks if these words are not the same, or else get the next shortest distance and check for the same conditions
  for (let i = distanceBetweenWordsCopy.length - 1; i > 0; i--) {
    const shortestDistance = Math.min.apply(null, distanceBetweenWordsCopy)

    let firstGlobalIndex = distanceBetweenWordsCopy.indexOf(shortestDistance)
    firstGlobalIndex = distanceFromBeginningOfSentence[firstGlobalIndex]
    let firstWord = arrayOfSentence[firstGlobalIndex].replace(/[^\w\s]|_/g, '')

    let secondGlobalIndex = distanceBetweenWordsCopy.indexOf(shortestDistance) + 1
    secondGlobalIndex = distanceFromBeginningOfSentence[secondGlobalIndex]
    let secondWord = arrayOfSentence[secondGlobalIndex].replace(/[^\w\s]|_/g, '')

    if (secondWord !== firstWord) {
      if (arrayOfPhrase.indexOf(secondWord) < arrayOfPhrase.indexOf(firstWord)) {
        // Interchange the values of both variables
        secondGlobalIndex = [firstGlobalIndex, firstGlobalIndex = secondGlobalIndex][0]
        secondWord = [firstWord, firstWord = secondWord][0]
      }
      listOfWordsBeingEnclosed.push(firstWord)
      listOfWordsBeingEnclosed.push(firstGlobalIndex)
      listOfWordsBeingEnclosed.push(secondWord)
      listOfWordsBeingEnclosed.push(secondGlobalIndex)
      break
    } else {
      distanceBetweenWordsCopy.splice(distanceBetweenWordsCopy.indexOf(shortestDistance), 1)
    }
  }

  // Given a three-letter phrase, search for the last word that is not firstWord and secondWord
  let lastWord = arrayOfPhrase.filter(function (el) {
    return listOfWordsBeingEnclosed.indexOf(el, '') < 0
  })

  lastWord = lastWord[0]
  const lastWordGlobalDistancesInSentence = []

  // Similar to what was done earlier, find the relative distances but this time for the lastWord only
  for (const word in arrayOfSentence) {
    if (arrayOfSentence[word].replace(/[^\w\s]|_/g, '') === lastWord.replace(/[^\w\s]|_/g, '')) {
      lastWordGlobalDistancesInSentence.push(parseInt(word))
    }
  }

  let lastWordIndexInPhrase = arrayOfPhrase.indexOf(lastWord)
  console.log('lastWordIndexInPhrase: ', lastWordIndexInPhrase)
  let lastWordRelativeDistance
  let leastDistance
  let leastRelativeDistance

  for (const lastWordItem in lastWordGlobalDistancesInSentence) {
    // To check which of the two words are closer to the last one.
    // The closer one would be used as a reference to find the shortest distance
    // FIX: Check if the last word follows the order of the phrase in the input
    // FIX: issue where program doesnt work if the lastWord is found out to be the first word in the sentence
    console.log(arrayOfPhrase.indexOf(listOfWordsBeingEnclosed[2]))
    if ((lastWordIndexInPhrase > arrayOfPhrase.indexOf(listOfWordsBeingEnclosed[2]) && lastWordGlobalDistancesInSentence[lastWordItem] > arrayOfPhrase.indexOf(listOfWordsBeingEnclosed[2]))) {
      if (Math.abs(lastWordItem - listOfWordsBeingEnclosed[1]) < Math.abs(lastWordItem - listOfWordsBeingEnclosed[3])) {
        let referenceToLastWord = listOfWordsBeingEnclosed[0]
        lastWordRelativeDistance = Math.abs(lastWordItem - listOfWordsBeingEnclosed[1])
      } else {
        let referenceToLastWord = listOfWordsBeingEnclosed[2]
        lastWordRelativeDistance = Math.abs(lastWordItem - listOfWordsBeingEnclosed[3])
      }
      // Iterate over lastWord candidates and initialize an array with their corresponding distances
      // let lastWordIndex = Math.min.apply(null, lastWordGlobalDistancesInSentence)
      if (lastWordRelativeDistance < leastRelativeDistance || leastRelativeDistance === undefined || leastRelativeDistance == null) {
        leastRelativeDistance = lastWordRelativeDistance
        leastDistance = lastWordGlobalDistancesInSentence[lastWordItem]
      }
    }
  }

  listOfWordsBeingEnclosed.push(lastWord)
  listOfWordsBeingEnclosed.push(leastDistance)

  // Getting the corresponding index of the words and enclosing those said words in the <p> tag

  for (let j = 1; j < listOfWordsBeingEnclosed.length; j = j + 2) {
    arrayOfSentence[listOfWordsBeingEnclosed[j]] = '<p>' + arrayOfSentence[listOfWordsBeingEnclosed[j]] + '</p>'
  }

  // Just for printing information
  arrayOfSentence = arrayOfSentence.join(' ')

  console.log(distanceFromBeginningOfSentence, ' distanceFromBeginningOfSentence')
  console.log(distanceBetweenWords, ' distanceBetweenWords')
  console.log('listOfWordsBeingEnclosed: ', listOfWordsBeingEnclosed)
  console.log('phrase: ', phrase)
  console.log('sentence: ', sentence)
  console.log('lastWordGlobalDistancesInSentence: ', lastWordGlobalDistancesInSentence)
  return arrayOfSentence
}

console.log(searchForPhrase(phrase, sentence))

// Stuff to do
// Keep track of the order of the arrayOfPhrase.
// As of now, the program does not check the order of the phrases.

// Fix the program for a two word phrase
// Fix issue where array doesnt compute for lastWord distance properly AND select the last word with the LEAST distance

// Fix issue where the function does not take into account the order of the phrase (it treats the phrase like three separate words)
