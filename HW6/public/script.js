// Majority of the structure was built from my knowledge of what I learnt in the DOM modules and AJAX modules.
document.addEventListener("DOMContentLoaded", bindButtons);

function home(){
  var req = new XMLHttpRequest();
  req.open("GET", "/table-data", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      renderTable(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    };
  });
  req.send(null);
}

function bindButtons(){
  document.getElementById('workoutSubmit').addEventListener('click', function(event){
    console.log(document.getElementById("name").value);
    if (document.getElementById("name").value == "") {
      //alert("Error: Name was left blank.");
    }
    else {
      var req = new XMLHttpRequest();
      var name = document.getElementById("name").value;
      var reps = document.getElementById("reps").value;
      var weight = document.getElementById("weight").value;
      var date = document.getElementById("date").value;
      var unitInputs = document.getElementsByName("unit");
      var unit;
      if (unitInputs[0].checked)
        unit = 1;
      else
        unit = 0;

      var params = "?" + "name=" + name + "&" + "reps=" + reps + "&" + "weight=" + weight + "&" + "date=" + date + "&" + "lbs=" + unit;
      req.open("GET", "/insert" + params, true);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          home();  // used mainly to update table accordingly displaying workouts.
        } else {
          console.log("Error in network request: " + req.statusText);
        };
      });
      req.send(null);
      event.preventDefault();
    }
  })
}

// Creating workout table structure
var body = document.body
var h2 = createNewElement(body, "h2");
h2.innerHTML = "Completed Workouts";
var table = createNewElement(body, "table");
var thead = createNewElement(table, "thead");
var tr_header = createNewElement(thead, "tr");
var arr_header = ["Name", "Reps", "Weight", "Date", "Unit", "Edit", "Delete"];
for (var i = 0; i < 7; i++) {
  var th = createNewElement(tr_header, "th");
  th.innerHTML = arr_header[i];
}
var tbody = createNewElement(table, "tbody");

// Used to render workout information - gets the response object from server passed in as parameter.
function renderTable(obj) {
  var response = JSON.parse(obj.results);
  for (var j = 0; j < response.length; j++) {
    // if workout is already in table
    // https://www.w3schools.com/jsref/met_htmlcollection_nameditem.asp
    //  how to get row element that holds workout data for its specific ID.
    if (table.rows.namedItem(response[j].id)) {
      var row = document.getElementById(response[j].id);
      var child = row.firstElementChild
      child.innerHTML = response[j].name;
      child = child.nextElementSibling;
      child.innerHTML = response[j].reps;
      child = child.nextElementSibling;
      child.innerHTML = response[j].weight;
      child = child.nextElementSibling;
      child.innerHTML = response[j].date.substring(0,10);
      child = child.nextElementSibling;
      child.innerHTML = response[j].lbs;
    }
    // if workout is not in table already
    if (!table.rows.namedItem(response[j].id)){
      var tr = createNewElement(tbody, "tr");
      tr.setAttribute("id", response[j].id);
      var td_name = createNewElement(tr, "td");
      td_name.innerHTML = response[j].name;
      var td_reps = createNewElement(tr, "td");
      td_reps.innerHTML = response[j].reps;
      var td_weight = createNewElement(tr, "td");
      td_weight.innerHTML = response[j].weight;
      var td_date = createNewElement(tr, "td");
      td_date.innerHTML = response[j].date.substring(0,10);
      var td_lbs = createNewElement(tr, "td");
      td_lbs.innerHTML = response[j].lbs;
      // form holding edit button
      var td_edit = createNewElement(tr, "td");
      var form_edit = createNewElement(td_edit, "form");
      var input_e1 = createNewElement(form_edit, "input");
      input_e1.setAttribute("type", "button");
      input_e1.setAttribute("name", "edit");
      input_e1.setAttribute("value", "Edit");
      var input_e2 = createNewElement(form_edit, "input");
      input_e2.setAttribute("type", "hidden");
      input_e2.setAttribute("id", response[j].id);
      // adds workout object as a myobject attribute
      // https://stackoverflow.com/questions/57624439/can-we-assign-an-object-to-a-html-element-in-plain-javascript-without-jquery
      //  helped me figure out how to make an object an attribute of an element.
      input_e2.setAttribute("myobject", JSON.stringify(response[j]));
      input_e1.addEventListener("click", function () {
        editTableRow(this.nextElementSibling.getAttribute("myobject"));
      });
      // ---------------------
      // form holding delete button
      var td_delete = createNewElement(tr, "td");
      var form_delete = createNewElement(td_delete, "form");
      var input_d1 = createNewElement(form_delete, "input");
      input_d1.setAttribute("type", "button");
      input_d1.setAttribute("name", "delete");
      input_d1.setAttribute("value", "Delete");
      var input_d2 = createNewElement(form_delete, "input");
      input_d2.setAttribute("type", "hidden");
      input_d2.setAttribute("id", response[j].id);
      input_d1.addEventListener("click", function () {
        deleteTableRow(this.nextElementSibling.getAttribute("id"));
      });
      // ---------------------
    }
  }
}

// when edit button clicked, comes to this method -> creates form with workout data populated and allows user to edit.
// https://stackoverflow.com/questions/8147376/how-to-insert-a-javascript-textnode-element-on-a-newline/21782367
//  how to add line break in DOM.
// https://stackoverflow.com/questions/30516391/html-input-already-filled-in-text
//  how to prepopulate the form with the workout data - showed me that I had to assign the value.
function editTableRow(obj) {
  obj = JSON.parse(obj);
  var h2 = createNewElement(body, "h2");
  h2.setAttribute("id", "editH2");
  h2.innerHTML = "Editing " + obj.name + " workout:";

  var form = createNewElement(body, "form");
  form.setAttribute("id", "editForm");
  var fieldset = createNewElement(form, "fieldset");
  var name_label = createNewElement(fieldset, "label");
  name_label.innerHTML = "name of workout";
  var name_input = createNewElement(name_label, "input");
  name_input.setAttribute("type", "text");
  name_input.setAttribute("name", "edit_name");
  name_input.setAttribute("value", obj.name);
  var br = document.createElement("br");
  fieldset.appendChild(br);
  var reps_label = createNewElement(fieldset, "label");
  reps_label.innerHTML = "number of reps";
  var reps_input = createNewElement(reps_label, "input");
  reps_input.setAttribute("type", "number");
  reps_input.setAttribute("name", "edit_reps");
  reps_input.setAttribute("value", obj.reps);
  var br1 = document.createElement("br");
  fieldset.appendChild(br1);
  var weight_label = createNewElement(fieldset, "label");
  weight_label.innerHTML = "weight";
  var weight_input = createNewElement(weight_label, "input");
  weight_input.setAttribute("type", "number");
  weight_input.setAttribute("name", "edit_weight");
  weight_input.setAttribute("value", obj.weight);
  var br2 = document.createElement("br");
  fieldset.appendChild(br2);
  var date_label = createNewElement(fieldset, "label");
  date_label.innerHTML = "date";
  var date_input = createNewElement(date_label, "input");
  date_input.setAttribute("type", "date");
  date_input.setAttribute("name", "edit_date");
  var d = obj.date;
  date_input.setAttribute("value", d.substring(0,10));
  var br3 = document.createElement("br");
  fieldset.appendChild(br3);
  var unit_label = createNewElement(fieldset, "label");
  unit_label.innerHTML = "unit";
  var lbs_input = createNewElement(unit_label, "input");
  lbs_input.setAttribute("type", "radio");
  lbs_input.setAttribute("name", "edit_unit");
  lbs_input.setAttribute("value", "lbs");
  var lbs_label = createNewElement(unit_label, "label");
  lbs_label.innerHTML = "lbs";
  var kg_input = createNewElement(unit_label, "input");
  kg_input.setAttribute("type", "radio");
  kg_input.setAttribute("name", "edit_unit");
  kg_input.setAttribute("value", "kg");
  var kg_label = createNewElement(unit_label, "label");
  kg_label.innerHTML = "kg";
  if (obj.lbs == 1)
    lbs_input.setAttribute("checked", true);
  else
    kg_input.setAttribute("checked", true);

  var br4 = document.createElement("br");
  fieldset.appendChild(br4);
  var br5 = document.createElement("br");
  fieldset.appendChild(br5);

  var save = createNewElement(fieldset, "input");
  save.setAttribute("type", "submit");
  save.setAttribute("id", "save");
  save.setAttribute("value", "Save");

  save.addEventListener("click", function() {
    var unitInputs = document.getElementsByName("edit_unit");
    var unit;
    if(unitInputs[0].checked)
      unit = 1;
    else
      unit = 0;
    var params = "?name=" + name_input.value + "&reps=" + reps_input.value + "&weight=" + weight_input.value + "&date=" + date_input.value + "&lbs=" + unit + "&id=" + obj.id;
    var req = new XMLHttpRequest();
    req.open("GET", "/update" + params, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.addEventListener('load', function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        body.removeChild(document.getElementById("editH2"));
        body.removeChild(document.getElementById("editForm"));
        home();
      } else {
        console.log("Error in network request: " + req.statusText);
      };
    });
    req.send(null);
    event.preventDefault();
  });
}

// when delete button clicked, this method gets called
function deleteTableRow(id) {
  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id=" + id, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      tbody.removeChild(document.getElementById(id));  // removes workout from table
      home();
    } else {
      console.log("Error in network request: " + req.statusText);
    };
  });
  req.send(null);
  event.preventDefault();
}

// create element - took this from my previous assignment
function createNewElement(parent, element) {
  var new_element = document.createElement(element);
  parent.appendChild(new_element);
  return new_element;
}
