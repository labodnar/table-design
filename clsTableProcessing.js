"use strict"

// CLASS: table_processor
export default class table_processor {

  baseArray = [] // base array upon which methods are applied



  // GETS ROW ARRAY FROM ARRAY OF ARRAY, MEETING SEARCH CRITERIA (SINGLE rowArr)
  getRowArray(searchValue, colIndex = 0) {
    for (let rowArr of this.baseArray) { // "of" -> elements, "in" -> indexes
      if (rowArr[colIndex] == searchValue)
        return rowArr;
    }
    return null;
  }



  //HTML TABLE TO ARRAY
  tableToArray(tableID) {
    var myTableArray = [];
    let tb = "table#" + tableID + " tr"
    $(tb).each(function () {
      var arrayOfThisRow = [];
      var tableData = $(this).find('td');
      if (tableData.length > 0) {
        tableData.each(function () { arrayOfThisRow.push($(this).text()); });
        myTableArray.push(arrayOfThisRow);
      }
    });
    console.log(myTableArray)
    // return myTableArray;
  }







  // ARRAY STD -> HTML CODE <TABLE> - STRING BUILDING APPROACH, <table> tags added later 
  tableHTML() {

    var isHeader = true;
    var html = '<thead>';

    this.baseArray.forEach(rowArray => { // processes columns (of row arrays)

      if (isHeader) {
        html += this.arr_row_to_html(rowArray, 'th') + '</thead>'
        isHeader = false;
      }
      else {
        html += this.arr_row_to_html(rowArray, 'td')
      }
    });
    return html;
  }


  // ARRAY OF OBJECTS (OR TRADITIONAL ARRAY) TO ARRAY
  setArray(arrLike) {
    if (Array.isArray(arrLike[0])) {
      this.baseArray = arrLike; // already a traditional array
    }
    else { // convert array of objects to 2D array of arrays
      this.baseArray = [];
      this.baseArray.push(Object.keys(arrLike[0])) // these are keys, final array size = Objects + 1 
      arrLike.forEach(objRow => {
        this.baseArray.push(Object.values(objRow))
      })
    }
  }



  // ARRAY OF OBJECTS (ASSOCIATIVE) 
  dummy_array_of_objects(maxNum = 5) {
    var arr = [];
    for (let i = 1; i <= maxNum; i++) {
      let o = {
        "num": i,
        "hex": i.toString(16),
        "base_2": i.toString(2)
      };
      arr.push(o);
    }
    return arr;
  }







  // ARRAY ROW TO HTML, incl <tr> tags, object or arr inputs
  arr_row_to_html(rowArr, tag) {
    var html = "<tr>";
    rowArr.forEach(element => {
      html += '<' + tag + '>' + element + '</' + tag + '>'
    })
    return html + '</tr>'
  }




} // end class


