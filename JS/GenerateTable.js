
function loadinTech1()
{
	var API_URL = "https://2rm3cl9k1j.execute-api.eu-central-1.amazonaws.com/ReadWriteFromTableSE21/tech1"
	var row_id = ""
	var tbl = '';
	$(document).ready(function($)
	{

		$.ajax({
			type:'PATCH',
			url: API_URL,
			data:JSON.stringify(
					{
						"Key":"Room",
						"searchAttr":"Tech1"
					}
				),
			contentType:"application/json",
			success: function(data)
			{
				//sorting array
				var temp;
				temp = data.Items[1]
				data.Items[1] = data.Items[3];
				data.Items[3] = temp;
				console.log(data.Items)
				
				//--->create data table > start

				tbl +='<table class="table table-hover">'

					//--->create table header > start
					tbl +='<thead>';
						tbl +='<tr>';
						tbl +='<th>Day</th>';
						tbl +='<th>Period 1</th>';
						tbl +='<th>Period 2</th>';
						tbl +='<th>Break</th>';
						tbl +='<th>Period 3</th>';
						tbl +="<th>Period 4</th>";
						tbl +='<th>Lunch</th>';
						tbl +='<th>Period 5</th>';
						tbl +='<th>Period 6</th>';
						tbl +='<th>ECA 1</th>';
						tbl +='<th>ECA 2</th>';
						tbl +='</tr>';
					tbl +='</thead>';
					//--->create table header > end


					//--->create table body > start
					tbl +='<tbody>';

						//--->create table body rows > start
						$.each(data.Items, function(index, val) 
						{
							//you can replace with your database row id
							row_id = random_id();
							//loop through ajax row data
							tbl +='<tr row_id="'+row_id+'">';
								tbl +='<td ><div col_name="Day">'+(val['Day']).substr(1)+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period1">'+val['Period1']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period2">'+val['Period2']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Break">'+val['Break']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period3">'+val['Period3']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period4">'+val['Period4']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Lunch">'+val['Lunch']+'</div></td>';

								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period5">'+val['Period5']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="Period6">'+val['Period6']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="AfterschoolH1">'+val['AfterschoolH1']+'</div></td>';
							
								tbl +='<td ><div class="row_data" edit_type="click" col_name="AfterschoolH2">'+val['AfterschoolH2']+'</div></td>';
							
								//--->edit options > start
								tbl +='<td>';

									tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';

									//only show this button if edit button is clicked
									tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
									tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';

								tbl +='</td>';
								//--->edit options > end

							tbl +='</tr>';
						});

						//--->create table body rows > end

					tbl +='</tbody>';
					//--->create table body > end

				tbl +='</table>'
				//--->create data table > end

				//out put table data
				$(document).find('#timeTable').html(tbl);

				$(document).find('.btn_save').hide();
				$(document).find('.btn_cancel').hide(); 
			}
		});

		var random_id = function  () 
		{
			var id_num = Math.random().toString(9).substr(2,3);
			var id_str = Math.random().toString(36).substr(2);

			return id_num + id_str;
		}
		//--->make div editable > start
		$(document).on('click', '.row_data', function(event) 
		{
			event.preventDefault(); 

			if($(this).attr('edit_type') == 'button')
			{
				return false; 
			}

			//make div editable
			$(this).closest('div').attr('contenteditable', 'true');
			//add bg css
			$(this).addClass('bg-warning').css('padding','5px');

			$(this).focus();
		})	
		//--->make div editable > end

		//--->save single field data > start
		$(document).on('focusout', '.row_data', function(event) 
		{
			event.preventDefault();

			if($(this).attr('edit_type') == 'button')
			{
				return false; 
			}

			var row_id = $(this).closest('tr').attr('row_id'); 

			var row_div = $(this)				
			.removeClass('bg-warning') //add bg css
			.css('padding','')

			var col_name = row_div.attr('col_name'); 
			var col_val = row_div.html(); 

			var arr = {};
			arr[col_name] = col_val;

			//use the "arr"	object for your ajax call
			$.extend(arr, {row_id:row_id});

			//out put to show
			$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');

		})	
		//--->save single field data > end
		//--->button > edit > start	
		$(document).on('click', '.btn_edit', function(event) 
		{
			event.preventDefault();
			var tbl_row = $(this).closest('tr');

			var row_id = tbl_row.attr('row_id');

			tbl_row.find('.btn_save').show();
			tbl_row.find('.btn_cancel').show();

			//hide edit button
			tbl_row.find('.btn_edit').hide(); 

			//make the whole row editable
			tbl_row.find('.row_data')
			.attr('contenteditable', 'true')
			.attr('edit_type', 'button')
			.addClass('bg-warning')
			.css('padding','3px')

			//--->add the original entry > start
			tbl_row.find('.row_data').each(function(index, val) 
			{  
				//this will help in case user decided to click on cancel button
				$(this).attr('original_entry', $(this).html());
			}); 		
			//--->add the original entry > end

		});
		//--->button > edit > end

		//--->button > cancel > start	
		$(document).on('click', '.btn_cancel', function(event) 
		{
			event.preventDefault();

			var tbl_row = $(this).closest('tr');

			var row_id = tbl_row.attr('row_id');

			//hide save and cacel buttons
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();

			//show edit button
			tbl_row.find('.btn_edit').show();

			//make the whole row editable
			tbl_row.find('.row_data')
			.attr('edit_type', 'click')
			.removeClass('bg-warning')
			.css('padding','') 

			tbl_row.find('.row_data').each(function(index, val) 
			{   
				$(this).html( $(this).attr('original_entry') ); 
			});  
		});
		//--->button > cancel > end

		//--->save whole row entery > start	
		$(document).on('click', '.btn_save', function(event) 
		{
			event.preventDefault();
			var tbl_row = $(this).closest('tr');

			var row_id = tbl_row.attr('row_id');


			//hide save and cacel buttons
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();

			//show edit button
			tbl_row.find('.btn_edit').show();


			//make the whole row editable
			tbl_row.find('.row_data')
			.attr('edit_type', 'click')
			.removeClass('bg-warning')
			.css('padding','') 

			//--->get row data > start
			var arr = {}; 
			tbl_row.find('.row_data').each(function(index, val) 
			{   
				var col_name = $(this).attr('col_name');  
				var col_val  =  $(this).html();
				arr[col_name] = col_val;
			});
			//--->get row data > end

			//use the "arr"	object for your ajax call
			$.extend(arr, {row_id:row_id});

			//out put to show
			$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')


		});
		//--->save whole row entery > end


	}); 
}
