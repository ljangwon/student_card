'use strict';

function display_count_st_master() {
	$.ajax({
		url: 'model/st_master/count_st_master.php',
		cache: false,
	}).done(function (html) {
		$('#count').html(html);
	});
}

function saveTdData(db_table, id, header, value) {
	$.ajax({
		url: `model/${db_table}/update.php`,
		method: 'POST',
		data: { id: id, header: header, value: value },
		success: function (result) {
			$(`#${db_table}_result`).html(` <br> ${db_table}_result success: <br> ${id} ${result} <br> `);
		},
	}).fail(function (result) {
		$(`#${db_table}_result`).html(`<br> ${db_table}_result fail: <br> ${id} ${result} <br> `);
	});
}

function returnTdToOriginal(db_table, table, preClickedTD, rowIdx, colIdx) {
	let cellInputId = 'td_' + rowIdx + '_' + colIdx;
	let id = table.cell(rowIdx, 0).data();

	let columnHeader = table.column(colIdx).header();
	let columnHeaderText = $(columnHeader).html();

	// originData가 바꼈을 때에만 서버업데이트...
	if ($('#' + cellInputId).attr('originalData') != $('#' + cellInputId).val()) {
		saveTdData(db_table, id, columnHeaderText, $('#' + cellInputId).val());
	}

	preClickedTD.data($('#' + preClickedTD.inputID).val());
}

function display_st_master(db_table) {
	$(`#${db_table}_title`).html(`<h1> Student Master Table</h1>`);
	$(`#${db_table}`).DataTable({
		paging: false,
		keys: true,
		ajax: `model/${db_table}/select.php`,
		columns: [
			{
				data: 'id',
			},
			{
				data: 'grade1',
			},
			{
				data: 'grade2',
			},
			{
				data: 'name',
			},
			{
				data: 'status',
			},
			{
				data: 'house',
			},
		],

		columnDefs: [
			/*{
				targets: [0],
				render: function (data, type, row, meta) {
					return `#${data}`;
				},
			},*/
			{
				targets: '_all',
				className: 'dt-body-center',
			},
		],
	});

	let table = $(`#${db_table}`).DataTable();
	let preClickedTD = null;
	table
		.on('key-focus', function (e, datatable, cell) {
			if (cell.index().column == 0) {
				display_st_info(cell.data());
				return;
			}
			let clickCellData = cell.data();
			let clickCellInputId = 'td_' + cell.index().row + '_' + cell.index().column;
			let inputData = "<input type='text' id ='" + clickCellInputId + "'>";
			cell.data(inputData).draw();
			cell.inputID = clickCellInputId;
			$('#' + clickCellInputId).attr('originalData', clickCellData);
			//original data 저장함...
			$('#' + clickCellInputId).val(clickCellData);
			$('#' + clickCellInputId).focus();
			preClickedTD = cell;
		})
		.on('key-blur', function (e, datatable, cell) {
			if (preClickedTD) {
				// 선택 상태에서 원복
				returnTdToOriginal(
					`${db_table}`,
					datatable,
					preClickedTD,
					cell.index().row,
					cell.index().column
				);
			}
		});
}

function name_st_master(st_id) {
	$.ajax({
		url: `model/st_master/name_st_master.php?st_id=${st_id}`,
		cache: false,
	}).done(function (text) {
		return text;
	});
}

function display_st_info(st_id) {
	display_study_history('study_history', st_id);
	display_test_history('test_history', st_id);
}

function display_study_history(db_table, st_id) {
	let st_name = null;

	if (st_id) {
		$.ajax({
			url: `model/st_master/name_st_master.php?st_id=${st_id}`,
			cache: false,
			async: false,
		}).done(function (text) {
			st_name = text;
		});
	}

	if (st_name) {
		$(`#${db_table}_title`).html(`<h1>${st_name}'s Study History Table</h1>`);
	} else {
		$(`#${db_table}_title`).html(`<h1>All Study History Table</h1>`);
	}

	$('#btn_new_study_history').show();

	$('#btn_new_study_history').click(function (event) {
		$.ajax({
			url: `model/study_history/new_row.php`,
			method: 'POST',
			data: { st_id: st_id },
			cache: false,
			async: false,
		})
			.done(function (result) {
				if (result == 'ok') {
					$('#btn_new_study_history_result').text(`new row is inserted `);
				}
			})
			.fail(function (result) {
				alert(result);
			});
	});

	$(`#${db_table}`).show();

	$(`#${db_table}`).DataTable({
		destroy: true,
		paging: false,
		keys: true,
		ajax: `model/${db_table}/select.php?st_id=${st_id}`,
		columns: [
			{
				data: 'id',
			},
			{
				data: 'st_id',
			},
			{
				data: 'course',
			},
			{
				data: 'memo',
			},
		],

		columnDefs: [
			{
				targets: '_all',
				className: 'dt-body-center',
			},
		],
	});
	let table = $(`#${db_table}`).DataTable();
	let preClickedTD = null;
	table
		.on('key-focus', function (e, datatable, cell) {
			if (cell.index().column == 0) {
				exit;
			}
			let clickCellData = cell.data();
			let clickCellInputId = 'td_' + cell.index().row + '_' + cell.index().column;
			let inputData = "<input type='text' id ='" + clickCellInputId + "'>";
			cell.data(inputData).draw();
			cell.inputID = clickCellInputId;
			$('#' + clickCellInputId).attr('originalData', clickCellData);
			//original data 저장함...
			$('#' + clickCellInputId).val(clickCellData);
			$('#' + clickCellInputId).focus();
			preClickedTD = cell;
		})
		.on('key-blur', function (e, datatable, cell) {
			if (preClickedTD) {
				// 선택 상태에서 원복
				returnTdToOriginal(
					`${db_table}`,
					datatable,
					preClickedTD,
					cell.index().row,
					cell.index().column
				);
			}
		});
}

function display_test_history(db_table, st_id) {
	let st_name = null;

	if (st_id) {
		$.ajax({
			url: `model/st_master/name_st_master.php?st_id=${st_id}`,
			cache: false,
			async: false,
		}).done(function (text) {
			st_name = text;
		});
	}

	if (st_name) {
		$(`#${db_table}_title`).html(`<h1>${st_name}'s Test History Table</h1>`);
	} else {
		$(`#${db_table}_title`).html(`<h1>All Test History Table</h1>`);
	}

	$('#btn_new_test_history').show();

	$('#btn_new_test_history').click(function (event) {
		$.ajax({
			url: `model/test_history/new_row.php`,
			method: 'POST',
			data: { st_id: st_id },
			cache: false,
			async: false,
		})
			.done(function (result) {
				if (result == 'ok') {
					$('#btn_new_test_history_result').text(`new row is inserted `);
				}
			})
			.fail(function (result) {
				alert(result);
			});
	});

	$(`#${db_table}`).show();
	$(`#${db_table}`).DataTable({
		destroy: true,
		paging: false,
		keys: true,
		ajax: `model/${db_table}/select.php?st_id=${st_id}`,
		columns: [
			{
				data: 'id',
			},
			{
				data: 'st_id',
			},
			{
				data: 'course',
			},
			{
				data: 'memo',
			},
		],

		columnDefs: [
			{
				targets: '_all',
				className: 'dt-body-center',
			},
		],
	});

	let table = $(`#${db_table}`).DataTable();
	let preClickedTD = null;
	table
		.on('key-focus', function (e, datatable, cell) {
			if (cell.index().column == 0) {
				exit;
			}
			let clickCellData = cell.data();
			let clickCellInputId = 'td_' + cell.index().row + '_' + cell.index().column;
			let inputData = "<input type='text' id ='" + clickCellInputId + "'>";
			cell.data(inputData).draw();
			cell.inputID = clickCellInputId;
			$('#' + clickCellInputId).attr('originalData', clickCellData);
			//original data 저장함...
			$('#' + clickCellInputId).val(clickCellData);
			$('#' + clickCellInputId).focus();
			preClickedTD = cell;
		})
		.on('key-blur', function (e, datatable, cell) {
			if (preClickedTD) {
				// 선택 상태에서 원복
				returnTdToOriginal(
					`${db_table}`,
					datatable,
					preClickedTD,
					cell.index().row,
					cell.index().column
				);
			}
		});
}
