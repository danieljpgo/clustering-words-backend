import { stopWords } from '../utils/stopwords'

export const processGenericString = (vocabulary) => {
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

export const processIsolated = (vocabulary) => {
  return new Promise((resolve) => {
    let vocabularyIsolated = []

    // Regular expression used to separate using multiple spaces
    vocabulary.split(/\s+/g).forEach((word) => {
      // Condition for array to have unique options
      if (!vocabularyIsolated.find((value) => value === word)) {
        vocabularyIsolated.push(word)
      }
    })

    resolve(vocabularyIsolated)
  })
}

export const processIsolatedVocabulary = (vocabulary) => {
  return new Promise((resolve, reject) => {
    processGenericString(vocabulary.text)
      .then((processedString) => {
        processIsolated(processedString)
          .then((processedVocabulary) => {
            resolve(processedVocabulary)
          })
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}

export const processIsolatedVector = (processedString) => {
  return new Promise((resolve, reject) => {
    processIsolated(processedString)
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

export const processGroup = (processedString) => {
  return new Promise((resolve) => {
    // Regular expression used to separate using multiple spaces
    const originalVector = processedString.split(/\s+/g)

    let vocabularyGroup = []
    originalVector.forEach((word, index) => {
      if (index !== (originalVector.length - 1)) {
        // Condition for array to have unique options
        if (!vocabularyGroup.find((value) => value === `${word} ${originalVector[index + 1]}`)) {
          vocabularyGroup.push(`${word} ${originalVector[index + 1]}`)
        }
      } else if (index !== 0) {
        // Condition to prevent it from duplicating the last position
        if (index !== (originalVector.length - 1)) {
          // Condition for array to have unique options
          if (!vocabularyGroup.find((value) => value === `${originalVector[index - 1]} ${word}`)) {
            vocabularyGroup.push(`${originalVector[index - 1]} ${word}`)
          }
        }
      }
    })

    resolve(vocabularyGroup)
  })
}

export const processGroupVocabulary = (vocabulary) => {
  return new Promise((resolve, reject) => {
    processGenericString(vocabulary.text)
      .then((processedString) => {
        processGroup(processedString)
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
    processGroup(processedString)
      .then((vocabularyProcess) => {
        const originalVector = processedString.split(/\s+/g)

        let vocabularyGroup = []
        originalVector.forEach((word, index) => {
          if (index !== (originalVector.length - 1)) {
            vocabularyGroup.push(`${word} ${originalVector[index + 1]}`)
          } else if (index !== 0) {
            // Condition to prevent it from duplicating the last position
            if (index !== (originalVector.length - 1)) {
              vocabularyGroup.push(`${originalVector[index - 1]} ${word}`)
            }
          }
        })

        const vocabularyVector = Array
          .from({length: vocabularyProcess.length}, e => null)
          .map((word, index) => vocabularyGroup.filter((value) => value === vocabularyProcess[index]).length)

        resolve(vocabularyVector)
      })
      .catch((err) => reject(err))
  })
}
