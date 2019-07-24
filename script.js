
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
  const {data: inputData} = object
  let pagesToTimestamp = {}
  let dateToSentiments= {}

  
  // pagesToTimestamp {
  //   timestamp: {
  //     pageID: true,
  //     pageID2: true
  //   },
  //   timestamp2: {

  //   }
  // }
  
  for (const i in inputData){
    let pageID = i
    let pageIdContents = inputData[i]
    for(const time in pageIdContents) {
      console.log(time, pageIdContents)
      if(!pagesToTimestamp[`${time}`]){
        pagesToTimestamp[`${time}`] = {}
      } 
        pagesToTimestamp[`${time}`][`${pageID}`] = true

      
    }
  }

  console.log(pagesToTimestamp)
    /*
    let utcDate = inputData[i]
    let sentimentKeyObject = Object.values(pageIDContents)


    console.log("pageID value: " + pageID)
    console.log("pageIDContents value array " + JSON.stringify(pageIDContents))
    console.log("utcDate value: " + utcDate)
    console.log("sentimentKeyObject value: " + JSON.stringify(sentimentKeyObject))
    console.log("sentimentKeyObject specific data: " + JSON.stringify(Object.keys(Object.values(sentimentKeyObject)[1])))

    let dataInstance = {}


    dataInstance[utcDate] = {
      //[formattedsentimentKeyObject]: {[pageID]: formattedSentimentValue}
    }

    for(let j = 0; j < sentimentKeyObject.length; j++) {
      let currentsentimentKeyObject = JSON.stringify(Object.keys(Object.values(sentimentKeyObject)[j]))
      let currentSentimentValue = JSON.stringify(Object.values(sentimentKeyObject[j]))
      console.log("currentSentimentValue: " + currentSentimentValue)
      let formattedsentimentKeyObject = currentsentimentKeyObject.substring(1, currentsentimentKeyObject.length-1)
      let formattedSentimentValue = currentSentimentValue.substring(1, currentSentimentValue.length-1)
      //New sentimentkeys overriding old ones
      dataInstance[utcDate] = {[formattedsentimentKeyObject]: [formattedSentimentValue]}
    }

    dataArray.push(dataInstance)
    */
  
  return dataArray
}

processObject(testObject)