'use strict';

var rootUrl = "/java_s04/api/v1.1/expenses";

findAll();

$('#saveExpense').click(function() {
	var name = $('#name').val();
	if (name === '') {
		$('.error').text('経費名は必須入力です。');
		return false;
	} else {
		$('.error').text('');
	}

	var id = $('#requestId').val()
	if (id == '')
		addExpense();
	else
		updateExpense(id);
	return false;
})

$('#newExpense').click(function() {
	renderDetails({});
});

function findAll(){
	console.log('findAll start.')
	$.ajax({
		type: "GET",
		url: rootUrl,
		dataType: "json",
		success: renderTable
	});
}

function findByRequestid(requestid) {
	console.log('findByREQUESTID start - requestid:'+requestid);
	$.ajax({
		type: "GET",
		url: rootUrl+'/'+requestid,
		dataType: "json",
		success: function(data) {
			console.log('findByRequestid success: ' + data.name);
			renderDetails(data)
		}
	});
}

function addExpense() {
	console.log('addExpense start');
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: rootUrl,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR) {
			alert('経費データの追加に成功しました');
			$('#requestId').val(data.id);
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('経費データの追加に失敗しました');
		}
	})
}

function updateExpense(requestid) {
	console.log('updateExpense start');
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: rootUrl+'/'+requestid,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR) {
			alert('経費データの更新に成功しました');
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('経費データの更新に失敗しました');
		}
	})
}


function deleteByRequestid(requestid) {
	console.log('delete start - requestid:'+requestid);
	$.ajax({
		type: "DELETE",
		url: rootUrl+'/'+requestid,
		success: function() {
			findAll();
			$('#requestid').val('');
			$('#requestday').val('');
			$('#update').val('');
			$('#name').val('');
			$('#title').val('');
			$('#amount').val('');
			$('#status').val('');
		}
	});
}

function renderTable(data) {
	var headerRow = '<tr><th>申請ID</th><th>申請日</th><th>更新日</th><th>申請者</th><th>タイトル</th><th>金額</th></tr>';

	$('#expenses').children().remove();

	if (data.length === 0) {
		$('#expenses').append('<p>現在データが存在していません。</p>')
	} else {
		var table = $('<table>').attr('border', 1);
		table.append(headerRow);
		$.each(data, function(index, request) {
			var row = $('<tr>');
			row.append($('<td>').text(request.requestid));
			row.append($('<td>').text(request.requestday));
			row.append($('<td>').text(request.update));
			row.append($('<td>').text(request.name));
			row.append($('<td>').text(request.title));
			row.append($('<td>').text(request.amount));
			row.append($('<td>').text(request.status));
			row.append($('<td>').append(
					$('<button>').text("編集").attr("type","button").attr("onclick", "findById("+post.id+')')
				));
			row.append($('<td>').append(
					$('<button>').text("削除").attr("type","button").attr("onclick", "deleteById("+post.id+')')
				));
			table.append(row);
		});

		$('#expenses').append(table);
	}

}

function renderDetails(post) {
	$('.error').text('');
	$('#requetid').val(expense.requestid);
	$('#requestday').val(expense.requestday);
	$('#update').val(expense.update);
	$('#name').val(expense.name);
	$('#title').val(expense.title);
	$('#amount').val(expense.amount);
	$('#status').val(expense.status);

}

function formToJSON() {
	var postId = $('#postId').val();
	return JSON.stringify({
		"id": (postId == "" ? 0 : postId),
		"name": $('#name').val()
	});
}
