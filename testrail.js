function getDescription() {
    return document.getElementsByName("description")[0].value;
}

function jiraHeader2TestRail(row) {
    return "||" + row.replace(/\|\|/g, "|");
}

function jiraRow2TestRail(row) {
    return "|" + row;
}

function jiraTable2TestRail(rows) {
  let headerRow = jiraHeader2TestRail(rows[0]);
  let bodyRows = rows.slice(1).map(x => jiraRow2TestRail(x));
  return headerRow + '\n' + bodyRows.join('\n');
}

function getTestRailPreconditions() {
  let desc = getDescription();
  let lines = desc.split('\n');
  let tableStart = lines.indexOf("*Pre-conditions*")+1;
  let tableEnd = lines.indexOf("*Scenarios*");
  let rows = lines.slice(tableStart, tableEnd);

  return jiraTable2TestRail(rows);
}

function getTestRailScenarios() {
  let desc = getDescription();
  let lines = desc.split('\n');
  let tableStart = lines.indexOf("*Scenarios*");
  let rows = lines.slice(tableStart, lines.length - 1);

  return jiraTable2TestRail(rows);
}

getTestRailPreconditions();

getTestRailScenarios();
