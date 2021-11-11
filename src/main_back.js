'use strict';

// global customized function
function log(message) {
	console.log(message);
}

// toggleBtn
const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

toggleBtn.addEventListener('click', () => {
	menu.classList.toggle('active');
	icons.classList.toggle('active');
});

// Fetch the items from the JSON file
function loadStudents() {
	return fetch('data/data.json')
		.then((response) => response.json())
		.then((json) => json.students);
}

// Update the list with the given items
function displayStudents(students) {
	const container = document.querySelector('.students__list');
	container.innerHTML = students
		.map((student) => createHTMLString_st_list(student))
		.join('');
}

// Create HTML list item from the given data item
function createHTMLString_st_list(student) {
	return `
  <li class="student">
     <span class="item_description">${student.num}, ${student.grade1}, ${student.grade2}, ${student.name}</span><br>
     <span class="item_description">
     ${student.num}, 
     <form>
     <input type="text" id="grade1" value="${student.grade1}">,
     <input type="text" id="grade2" value="${student.grade2}">,
     <input type="text" id="name" value="${student.name}"></span>
     </form>
  </li>
  `;
}
// Fetch the items from the JSON file
function load_st_info() {
	return fetch('data/이수현.json')
		.then((response) => response.json())
		.then((json) => json.course_test_history);
}

// Update the dashboard with the given items
function display_st_info(st_infos) {
	const container = document.querySelector('#st__dashboard');
	container.innerHTML = st_infos
		.map((st_info) => createHTMLString_st_info(st_info))
		.join('');
}

// Create HTML list item from the given data item
function createHTMLString_st_info(st_info) {
	return `
  <li class="student">
     	<span class="item_description"> ${st_info.num}, 
     	<input type="text" id="grade1" value="${st_info.test_name}">,
     	<input type="text" id="grade2" value="${st_info.test_date}">,
     	<input type="text" id="name" value="${st_info.test_result}"></span>
  </li>
  `;
}

// ----------------------------------------

function onButtonClick(event, items) {
	const dataset = event.target.dataset;
	const key = dataset.key;
	const value = dataset.value;

	if (key == null || value == null) {
		return;
	}

	if (key == 'grade1' && value == 'A') {
		displayStudents(items);
		return;
	}

	console.log(key);
	console.log(value);

	displayStudents(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
	const buttons = document.querySelector('.students__option');

	buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

/* loadStudents()
	.then((students) => {
		displayStudents(students);
		setEventListeners(students);
	})
	.catch(console.log);
*/

load_st_info()
	.then((st_info) => {
		display_st_info(st_info);
	})
	.catch(console.log);
