const dotenv = require('dotenv').config();



function cleanData(entries) {
    const cleanEntries = entries.filter((entry) => {
        return (entry.context === "reftime_time_lat_lon" || entry.context === "reftime_time1_lat_lon");
    });

    let returnObject = {};
    const importantOnlyArray = cleanEntries.reduce((acc, entry, index) => {
        let returnPackage = null;
        if ((entry.context === "reftime_time1_lat_lon") && (index < cleanEntries.length - 2)) {
            returnPackage = {};
            const refTimeNext = cleanEntries[index + 1];
            returnPackage.time = entry.axes.time;
            returnPackage.cloudTopTemp = (entry.data.Temperature_high_cloud_top_6_Hour_Average || entry.data.Temperature_high_cloud_top_3_Hour_Average);
            returnPackage.groundTemp = refTimeNext.data.Temperature_surface;
            returnPackage.evapRate = refTimeNext.data.Potential_Evaporation_Rate_surface;
        }
        if (returnPackage) {
            acc.entries.push(returnPackage);

            if(returnPackage.cloudTopTemp){
              if (acc.cloudTempMax) {
                  if (acc.cloudTempMax < returnPackage.cloudTopTemp) {
                      acc.cloudTempMax = returnPackage.cloudTopTemp;
                  }
              } else {
                  acc.cloudTempMax = returnPackage.cloudTopTemp;
              }

              if (acc.cloudTempMin) {
                  if (acc.cloudTempMin > returnPackage.cloudTopTemp) {
                      acc.cloudTempMin = returnPackage.cloudTopTemp;
                  }
              } else {
                  acc.cloudTempMin = returnPackage.cloudTopTemp;
              }
            }

            if(returnPackage.groundTemp){
              if (acc.groundTempMax) {
                  if (acc.groundTempMax < returnPackage.groundTemp) {
                      acc.groundTempMax = returnPackage.groundTemp;
                  }
              } else {
                  acc.groundTempMax = returnPackage.groundTemp;
              }

              if (acc.groundTempMin) {
                  if (acc.groundTempMin > returnPackage.groundTemp) {
                      acc.groundTempMin = returnPackage.groundTemp;
                  }
              } else {
                  acc.groundTempMin = returnPackage.groundTemp;
              }
            }

            if(returnPackage.evapRate){
              if (acc.evapRateMax) {
                  if (acc.evapRateMax < returnPackage.evapRate) {
                      acc.evapRateMax = returnPackage.evapRate;
                  }
              } else {
                  acc.evapRateMax = returnPackage.evapRate;
              }

              if (acc.evapRateMin) {
                  if (acc.evapRateMin > returnPackage.evapRate) {
                      acc.evapRateMin = returnPackage.evapRate;
                  }
              } else {
                  acc.evapRateMin = returnPackage.evapRate;
              }
            }

        }
        return acc;
    }, {
        entries: []
    });
    console.log("Length: ", importantOnlyArray.length)
    return importantOnlyArray;
}


module.exports = {

    cleanData


}
