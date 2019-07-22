
/*
"data" : {
  "009202717" : {
     1563783497433 : {
        "positive" : 1
      },
     1563983500237: {
        "neutral" : 2,
        "negative" : 5
      }
   }
 }
 */

var testObject = {
    "data" : {
      "009202717" : {
         1563783497433 : {
            "positive" : 1
          },
         1563983500237: {
            "neutral" : 2,
            "negative" : 5
          }
     }
   }
}

/*
"dataOutput" : {
  (UTC for the day July 20 for example) : {
    "positive" : {
      "009202717": 1
    },
   (UTC for the day July 21) : {
    "neutral" : {
      "009202717": 2
    }
*/
function processObject(object) {
  let dataArray = []
  var objectLength = Object.values(object.data)[0][0]
  //So far only prints one set of data, fix for-loop
  for(var i = 0; i < 1; i++){
    console.log("Iteration" + Object.keys(object).length)
    let pageID = Object.keys(object.data)[0]
    let pageIDContents = Object.values(object["data"])[i]
    let utcDate = Object.keys(pageIDContents)[1]
    let sentimentKey = Object.values(pageIDContents)
    let currentSentimentKey = JSON.stringify(Object.keys(sentimentKey[0]))
    let currentSentimentValue = JSON.stringify(Object.values(sentimentKey[0]))

    console.log("pageID value: " + pageID)
    console.log("pageIDContents value: " + pageIDContents)
    console.log("utcDate value: " + utcDate)

    let dataInstance = {}
    dataInstance[utcDate] = {
      [currentSentimentKey.substring(1, currentSentimentKey.length-1)]: {[pageID]: currentSentimentValue.substring(1, currentSentimentValue.length-1)}
    }
    dataArray.push(dataInstance)
  }
  return dataArray
}
