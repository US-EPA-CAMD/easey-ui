export function getMonitoringPlansMethodsTableRecords(totalData) {

    const data = totalData;
    const records = [];
    console.log('this is total data', totalData)
    data.forEach((el) => {
      records.push({
        
        col1: el.parameter,
        col2: el.methodology,
        col3: el.subsitituteDataApproach,
        col4: el.byPassApproach,
        col5: el.beginDate,
        col6: el.endTime,
      });
    });
    
    return records;
  }
  