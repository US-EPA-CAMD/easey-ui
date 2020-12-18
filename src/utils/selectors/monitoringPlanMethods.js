export function getMonitoringPlansMethodsTableRecords(totalData) {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    records.push({
      col1: el.parameterCode,
      col2: el.methodCode,
      col3: el.subDataCode,
      col4: el.byPassApproachCode,
      col5: el.addDate,
      col6: el.endDate,
    });
  });
  return records;
}
