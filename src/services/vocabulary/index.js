import { stopWords } from '../utils/stopwords'

export const processString = (vocabulary) => {
  return new Promise((resolve) => {
    // Ignore case
    // Regular expression to remove a punctuation range
    // Regular expression to remove stopWords

    vocabulary = vocabulary
      .toLocaleLowerCase()
      .replace(new RegExp('[.,;:-]', 'g'), ' ')
      .replace(new RegExp('\\b(' + stopWords.join('|') + ')\\b', 'ig'), '')
      .trim()

    resolve(vocabulary)
  })
}

export const processVocabulary = (vocabulary) => {
  return new Promise((resolve) => {
    let vocabularyIsolated = []

    // Regular expression used to separate using multiple spaces
    vocabulary.split(/\s+/g).forEach((word) => {
      if (!vocabularyIsolated.find((value) => value === word)) {
        vocabularyIsolated.push(word)
      }
    })

    resolve(vocabularyIsolated)
  })
}

export const processIsolatedVocabulary = (vocabulary) => {
  return new Promise((resolve, reject) => {
    processString(vocabulary.text)
      .then((processedString) => {
        processVocabulary(processedString)
          .then((processedVocabulary) => {
            resolve(processedVocabulary)
          })
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}

export const processVocabularyVector = (stringProcess) => {
  return new Promise((resolve) => {
    processVocabulary(stringProcess)
      .then((vocabularyProcess) => {
        const originalVector = stringProcess.split(/\s+/g)

        const vocabularyVector = Array
          .from({length: vocabularyProcess.length}, e => null)
          .map((word, index) => originalVector.filter((value) => value === vocabularyProcess[index]).length)

        resolve(vocabularyVector)
      })
  })
}
