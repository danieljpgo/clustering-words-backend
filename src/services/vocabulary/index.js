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

export const processVocabularyVector = (processedString) => {
  return new Promise((resolve, reject) => {
    processVocabulary(processedString)
      .then((vocabularyProcess) => {
        const originalVector = processedString.split(/\s+/g)

        const vocabularyVector = Array
          .from({length: vocabularyProcess.length}, e => null)
          .map((word, index) => originalVector.filter((value) => value === vocabularyProcess[index]).length)

        resolve(vocabularyVector)
      })
      .catch((err) => reject(err))
  })
}

export const processVocabularyGroup = (processedString) => {
  return new Promise((resolve) => {
    // Regular expression used to separate using multiple spaces
    const originalVector = processedString.split(/\s+/g)

    let vocabularyGroup = []
    originalVector.forEach((word, index) => {
      if (index !== (originalVector.length - 1)) {
        vocabularyGroup.push(`${word} ${originalVector[index + 1]}`)
      } else if (index !== 0) {
        if (index !== (originalVector.length - 1)) {
          vocabularyGroup.push(`${originalVector[index - 1]} ${word}`)
        }
      }
    })

    resolve(vocabularyGroup)
  })
}

export const processGroupVocabulary = (vocabulary) => {
  return new Promise((resolve, reject) => {
    processString(vocabulary.text)
      .then((processedString) => {
        processVocabularyGroup(processedString)
          .then((vocabularyGroup) => {
            resolve(vocabularyGroup)
          })
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}

export const processGroupVector = (processedString) => {
  return new Promise((resolve, reject) => {
    processVocabularyGroup(processedString)
      .then((vocabularyProcess) => {
        const originalVector = processedString.split(/\s+/g)

        console.log(vocabularyProcess)
        console.log(originalVector)

        const vocabularyVector = Array
          .from({length: vocabularyProcess.length}, e => null)
          .map((word, index) => originalVector.filter((value) => value === vocabularyProcess[index]).length)

        resolve(vocabularyVector)
      })
      .catch((err) => reject(err))
  })
}
