const dotenv = require('dotenv').config();



function cleanData(entries) {
    const cleanEntries = entries.filter((entry) => {
        return (entry.context === "reftime_time_lat_lon" || entry.context === "reftime_time1_lat_lon");
    });
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
            acc.push(returnPackage);
        }
        return acc;
    }, []);

    return importantOnlyArray;
}


module.exports = {

    cleanData


}
