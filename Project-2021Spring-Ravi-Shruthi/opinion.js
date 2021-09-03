document.getElementById("firstlink").addEventListener("click", openFirst);
document.getElementById("secondlink").addEventListener("click", openSecond);
document.getElementById("thirdlink").addEventListener("click", openThird);

// Makes sure to hide the content of the other buttons when one is clicked.
// Will only display the content of the button that is clicked.
function openFirst() {
  document.getElementById('first').style.display = 'block';
  document.getElementById('second').style.display = 'none';
  document.getElementById('third').style.display = 'none';
}

function openSecond() {
  document.getElementById('first').style.display = 'none';
  document.getElementById('second').style.display = 'block';
  document.getElementById('third').style.display = 'none';
}

function openThird() {
  document.getElementById('first').style.display = 'none';
  document.getElementById('second').style.display = 'none';
  document.getElementById('third').style.display = 'block';
}
