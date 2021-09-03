/*
  ********* CITATIONS ***********
  * createNewElement() function
    // I got this function template from Ed dicussion #102 where TA
    // Sean Caruthers wrote out this function as a way to avoid repitition.
    // Used this concept in creating my createNewButton() function as well.
  * https://www.w3schools.com/jsref/met_element_setattribute.asp
    // setAttribute()
    // Sets an attribute for an element
  * https://www.w3schools.com/jsref/met_element_removeattribute.asp
    // removeAttribute()
    // Removes class attribute with value 'selected' from current row OR col
    // Depends on direction (right, left, top, down)
  * https://www.w3schools.com/jsref/met_element_getelementsbyclassname.asp
    // getElementsByClassName()
    // Returns a list of child elements of table that have class "selected"
    // **In my case, this will always be a list of one**
  * https://www.w3schools.com/jsref/jsref_parseInt.asp#:~:text=JavaScript%20parseInt%20%28%29%20Function%201%20Definition%20and%20Usage.,3%20Syntax%204%20Parameter%20Values%205%20Technical%20Details
    // parseInt()
    // Used to get row and col (ints) from current table cell Id attribute (str)
  * https://www.w3schools.com/js/js_string_methods.asp
    // charAt()
    // Gets the 'row' in current table cell Id attribute (str) and 'col'
*/

var body = document.body;
var table = createNewElement(body, "table");
table.style.borderStyle = 'solid';
table.style.width = '55%';
//header
var thead = createNewElement(table, "thead");
//row in header
var tr_head = createNewElement(thead, "tr");
for(var i = 1; i <= 4; i++){
  //data in row
  var th_head = createNewElement(tr_head, "th");
  th_head.textContent = "Header " + i;
  th_head.style.borderStyle = 'solid';
  th_head.style.borderWidth = 'thin';
  th_head.setAttribute("id", th_head.textContent);
}
//body
var tbody = createNewElement(table, "tbody")
for (var i = 1; i <= 4; i++) {
  //row in body
  var tr_body = createNewElement(tbody, "tr");
  for (var j = 1; j <= 4; j++) {
    //data in row
    var td_body = createNewElement(tr_body, "td");
    td_body.textContent = i + ", " + j;
    td_body.style.textAlign = 'center';
    td_body.style.borderStyle = 'solid';
    td_body.style.borderWidth = 'thin';
    if (i==1 && j==1) {
      td_body.style.borderWidth = 'thick';
      td_body.setAttribute("class", "selected");
    }
    td_body.setAttribute("id", td_body.textContent);
  }
}

// buttons
var up = createNewButton("Up", "button");
var down = createNewButton("Down", "button");
var left = createNewButton("Left", "button");
var right = createNewButton("Right", "button");
var mark_cell = createNewButton("Mark Cell", "button");

document.getElementById("Up").addEventListener("click", moveUp);
document.getElementById("Down").addEventListener("click", moveDown);
document.getElementById("Left").addEventListener("click", moveLeft);
document.getElementById("Right").addEventListener("click", moveRight);
document.getElementById("Mark Cell").addEventListener("click", changeBg);

// create element
function createNewElement(parent, element) {
  var new_element = document.createElement(element);
  parent.appendChild(new_element);
  return new_element;
}

// create button element with specific style
function createNewButton(button_name, button) {
  var new_button = document.createElement(button);
  body.appendChild(new_button);
  new_button.textContent = button_name;
  new_button.style.width = '10%';
  new_button.style.padding = "5px";
  new_button.style.margin = "10px";
  new_button.setAttribute("id", button_name);
  return new_button;
}

// only affect new row value
function moveUp() {
  var cell = document.getElementsByClassName("selected");
  var curr_id = cell[0].getAttribute("id");
  var row = parseInt(curr_id.charAt(0));
  var col = parseInt(curr_id.charAt(3));
  var newRow;
  if(row == 1) {
    newRow = row;
  }
  else {
    cell[0].style.borderWidth = 'thin';
    cell[0].removeAttribute("class");
    newRow = row - 1;
    var newId = newRow + ", " + col;
    var newCell = document.getElementById(newId);
    newCell.setAttribute("class", "selected");
    newCell.style.borderWidth = 'thick';
  }
}

// only affect new row value
function moveDown() {
  var cell = document.getElementsByClassName("selected");
  var curr_id = cell[0].getAttribute("id");
  var row = parseInt(curr_id.charAt(0));
  var col = parseInt(curr_id.charAt(3));
  var newRow;
  if(row == 4) {
    newRow = row;
  }
  else {
    cell[0].style.borderWidth = 'thin';
    cell[0].removeAttribute("class");
    newRow = row + 1;
    var newId = newRow + ", " + col;
    var newCell = document.getElementById(newId);
    newCell.setAttribute("class", "selected");
    newCell.style.borderWidth = 'thick';
  }
}

// only affect new col value
function moveLeft() {
  var cell = document.getElementsByClassName("selected");
  var curr_id = cell[0].getAttribute("id");
  var row = parseInt(curr_id.charAt(0));
  var col = parseInt(curr_id.charAt(3));
  var newCol;
  if(col == 1) {
    newCol = col;
  }
  else {
    cell[0].style.borderWidth = 'thin';
    cell[0].removeAttribute("class");
    newCol = col - 1;
    var newId = row + ", " + newCol;
    var newCell = document.getElementById(newId);
    newCell.setAttribute("class", "selected");
    newCell.style.borderWidth = 'thick';
  }
}

// only affect new col value
function moveRight() {
  var cell = document.getElementsByClassName("selected");
  var curr_id = cell[0].getAttribute("id");
  var row = parseInt(curr_id.charAt(0));
  var col = parseInt(curr_id.charAt(3));
  var newCol;
  if(col == 4) {
    newCol = col;
  }
  else {
    cell[0].style.borderWidth = 'thin';
    cell[0].removeAttribute("class");
    newCol = col + 1;
    var newId = row + ", " + newCol;
    var newCell = document.getElementById(newId);
    newCell.setAttribute("class", "selected");
    newCell.style.borderWidth = 'thick';
  }
}

function changeBg() {
  var cell = table.getElementsByClassName("selected");
  cell[0].style.backgroundColor = 'yellow';
}
