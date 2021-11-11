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

// Fetch the student master as JSON file from DB
function load_st_master() {
	return fetch('model/st_master/ajax_st_master.php')
		.then((response) => response.json())
		.then((json) => json.data);
}

// Update the list with the given items
function dis_st_master(students) {
	const container = document.querySelector('.students__list');
	container.innerHTML = students.map((student) => createHTMLString_st_master(student)).join('');
}

// Create HTML list item from the given data item
function createHTMLString_st_master(student) {
	return `
  <li class="student">
		<form>
		 <input type="text" size="3" id="id_${student.id}" value="${student.id}">,
     <input type="text" id="grade1_${student.id}" value="${student.grade1}">,
     <input type="text" id="grade2_${student.id}" value="${student.grade2}">,
     <input type="text" id="name_${student.id}" value="${student.name}"></span>
     </form>
  </li>
  `;
}
// Fetch the items from the JSON file
function load_st_info() {
	return fetch('data/이수현.json')
		.then((response) => response.json())
		.then((json) => json.data);
}

// Update the dashboard with the given items
function display_st_info(st_infos) {
	const container = document.querySelector('#st__dashboard');
	container.innerHTML = st_infos.map((st_info) => createHTMLString_st_info(st_info)).join('');
}

// Create HTML list item from the given data item
function createHTMLString_st_info(st_info) {
	return `
  <li class="student">
     	<span class="item_description"> ${st_info.id}, 
     	<input type="text" id="grade1" value="${st_info.grade1}">,
     	<input type="text" id="grade2" value="${st_info.grade2}">,
     	<input type="text" id="name" value="${st_info.name}"></span>
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
		dis_st_master(items);
		return;
	}

	console.log(key);
	console.log(value);

	dis_st_master(items.filter((item) => item[key] === value));
}

function onMenuClick(event, items) {
	const dataset = event.target.dataset;
	const key = dataset.key;
	const value = dataset.value;

	if (key == null || value == null) {
		return;
	}

	if (key == 'menu' && value == '1') {
		dis_menu(1);
		return;
	}
	if (key == 'menu' && value == '2') {
		dis_menu(2);
		return;
	}
	if (key == 'menu' && value == '3') {
		dis_menu(3);
		return;
	}

	console.log(key);
	console.log(value);

	dis_menu(0);
}

// show menus
function dis_menu(num) {
	const main_board = document.querySelector('#main_board');
	main_board.innerHTML = '';
	main_board.innerHTML = `test menu ${num}`;
}

function setEventListeners(items) {
	const buttons = document.querySelector('.students__option');
	buttons.addEventListener('click', (event) => onButtonClick(event, items));

	const menus = document.querySelector('.navbar__menu');
	menus.addEventListener('click', (event) => onMenuClick(event, items));
}

load_st_master()
	.then((items) => {
		dis_st_master(items);
		setEventListeners(items);
	})
	.catch(console.log);
