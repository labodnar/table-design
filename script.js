"use strict"
import table_processor from "./clsTableProcessing.js"



// ARRAY OF OBJECTS (ASSOCIATIVE) 
function buildObject(maxNum) {

  var arr = [];
  var btn1 = '<button btn-tbl class="btn btn-outline-dark" value="';
  var btn2 = '" onclick="removeTableRow(this)">del</button>';

  for (let i = 1; i <= maxNum; i++) {
    let obj = {
      "num": i,
      "hex": '0x' + i.toString(16),
      "base_2": i.toString(2),
      "Random": Math.random().toFixed(5),
      "button": btn1 + i + btn2
    };
    arr.push(obj);
  }
  return arr;
}




// ERROR CHECKING ON USER-SUPPLIED # ROWS
function getRowCount() {
  var defaultCount = 30;
  var rowCount = $("#rowCount").val();
  if (!$.isNumeric(rowCount) || rowCount < 1 || rowCount > 500) {
    $("#rowCount").val(defaultCount)
    return defaultCount;
  }
  return rowCount;
}



// REFRESHES TABLE
function updateTable() {
  let rowCount = getRowCount();
  let arrayOfObj = buildObject(rowCount);
  let arr = tp.setArray(arrayOfObj);
  let html = tp.tableHTML();
  console.log(html)
  console.log(tp.baseArray)
  $("#table-1").html(html)
  $("#feedback").html(""); // clear user del comments
}







// ON LOAD.......................................
const tp = new table_processor; // this is active in all listeners
console.clear();
updateTable();

let a = tp.getRowArray(2)
a = JSON.stringify(a);
console.log(a)




// LISTENER - TABLE BUILDER 
document.getElementById("tester").onclick = function () {
  console.log('user clicked on update -or- initial load');
  updateTable();
}






