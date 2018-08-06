var Day;
var Period;
var PrevSelect;
var clickedBookedEmail;
var welcomeMsgEmail;

function loadinTech1Week1()
{
	$("#Loader").show()
	$("#timeTable").html("");
	$("#viewPort").hide();
	$("#viewPort_Content").hide();
	$("#whichWeekBtn").html("See Week 2");
	$("#whichWeekBtn").attr("onClick","loadinTech1Week2()")
	
	var API_URL = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/tech1"
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
						"Key2":"Week",
						"searchAttr":"Tech1",
						"searchAttr2":"1"
					}
				),
			contentType:"application/json",
			success: function(data)
			{
				$("#Loader").hide();
				$("#viewPort").show();
				$("#viewPort_Content").hide();
				$("#preLimLoader").show();
				
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
							var newString;
							var hiddenTxt; 
							//you can replace with your database row id
							row_id = random_id();
							//loop through ajax row data
							tbl +='<tr row_id="'+row_id+'" id="'+row_id+'">';
								tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(1)+'</div></td>';
								//will hide their email so that it wont show on the table but can be retrieved later to decide who booked the room. 
								
								newString = val['Period1'];
								if(val['Period1']!="unbooked")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								 
								
								newString = val['Period2'];
								if(val['Period2']!="unbooked")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								
							
								newString = val['Break'];
								if(val['Break']!="unbooked")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								
							
								
								newString = val['Period3'];
								if(val['Period3']!="unbooked")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								
							
								newString = val['Period4'];
								if(val['Period4']!="unbooked")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								
							
								newString = val['Lunch'];
								if(val['Lunch']!="unbooked")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								

								newString = val['Period5'];
								if(val['Period5']!="unbooked")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								
							
								newString = val['Period6'];
								if(val['Period6']!="unbooked")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH1'];
								if(val['AfterschoolH1']!="unbooked")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH2'];
								if(val['AfterschoolH2']!="unbooked")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								
							

							tbl +='</tr>';
						});

						//--->create table body rows > end

					tbl +='</tbody>';
					//--->create table body > end

				tbl +='</table>'
				//--->create data table > end

				//out put table data
				$(document).find('#timeTable').html(tbl);

			}
		});

		var random_id = function  () 
		{
			var id_num = Math.random().toString(9).substr(2,3);
			var id_str = Math.random().toString(36).substr(2);

			return id_num + id_str;
		}
		
		//--->Editing Viewport > start
		$(document).on('click', '.row_data', function(event) 
		{
			event.preventDefault(); 
			$("#preLimLoader").hide();
			$("#viewPort_Content").show();
			
			if($(this).attr('edit_type') == 'button')
			{
				return false; 
			}

			$("#viewPort").show();
			
			$("#deleteBtn").hide();
			$("#contactBtn").hide();
			$("#bookBtn").hide();
			
			if(PrevSelect!=null)
			{
				PrevSelect.removeClass("selected");
			}
			
			var row_div = $(this)
			row_div.addClass("selected");
			PrevSelect = row_div;
			//Populating Details Start
			$("#bookingDetails").html("Week Beginning: " + getMonday(new Date()));
			var row_id = $(this).closest('tr').attr('row_id');	
			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var rowDay = Cells[0].textContent;
			$("#bookingDetails").append("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+rowDay);
			var col_name = row_div.attr('col_name');
			$("#bookingDetails").append(" "+col_name);
			//Populating Details End
			
			//storing data incase they want to book the room
			Day = rowDay;
			Period = col_name;
			
			//Seeing if the room is already Booked
			var currentStatus = row_div.html();
			console.log(currentStatus)
			if(currentStatus == "unbooked")
			{
				$("#bookBtn").show();
				$("#bookingStatus").html("unbooked<br><br>")
			}	
			else if(currentStatus.split(' ')[0] == "booked")
			{
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				
				if(clickedBookedEmail == welcomeMsgEmail)
				{
					$("#bookingStatus").html("booked<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("booked<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+clickedBookedEmail)
					$("#contactBtn").show();
				}
			}
		})	
		//--->Editing Viewport > end
		
		//--->MakingviewPort Dissapear > start
		$(document).mouseup(function(e) 
		{
			var container = $("#viewPort");
			var table = $("#timeTable");

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0 && !table.is(e.target) && table.has(e.target).length === 0) 
			{
				$("#viewPort_Content").hide()
				$("#preLimLoader").show();
				if(PrevSelect!=null)
				{
					PrevSelect.removeClass("selected")
				}
			}
		});
		//--->MakingviewPort Dissapear > end
		
		//--->button > book > start	
		$(document).on('click', '#bookBtn', function(event) 
		{
			preLimLoader("Booking...")
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var row_id = tbl_row.attr('row_id');
			getEmail()
			checkVariable()
			function checkVariable() 
			{
				if (email != null) 
				{
				   $.ajax
				   ({
						type:'POST',
						url:API_URL,
						data: JSON.stringify(
								{
									"Day":manipulateDayWeek1(Day),
									"Room":"Tech1",
									"updateAttr":Period,
									"updateValue":"booked " + email
								}
							  ),

						contentType:"application/json",

						success: function(data){
							loadinTech1Week1()
							exitpreLimLoader()
						},

						error: function(data)
						{
							//$("#errorModule").show();
						}
				   });
				}
				else
				{
					setTimeout(checkVariable, 1000);
				}
		    }
		});
		//--->button > book > end

		//--->button > Delete > start	
		$(document).on('click', '#deleteBtn', function(event) 
		{
			preLimLoader("Deleting Booking...")
			event.preventDefault();
			$.ajax
			({
				type:'POST',
				url:API_URL,
				data: JSON.stringify(
					{
						"Day":manipulateDayWeek1(Day),
						"Room":"Tech1",
						"updateAttr":Period,
						"updateValue":"unbooked"
					}
				),

				contentType:"application/json",
				
				success: function(data){
					loadinTech1Week1()
					exitpreLimLoader()
				},
				error: function(data)
				{
					//$("#errorModule").show();
				}
			});
		
		});
		//--->button > Delete > end
		
		//ContactBtn > Start
		$(document).on('click', '#contactBtn', function(event) 
		{
			$("#toEmail").val("To: "+clickedBookedEmail);
		});
		//ContactBtn > End
		
		//Send > Start
		$(document).on('click', '#sendBtn', function(event) 
		{
			 $("#emailErrMsg").html("Sending......");
			var nicE = new nicEditors.findEditor('emailText');
			emailVal = nicE.getContent();
			
			var template_params = 
			{
			   "ToEmail": clickedBookedEmail,
			   "FromEmail": welcomeMsgEmail,
			   "subject": $("#subject").val(),
			   "text": emailVal
			}

			var service_id = "default_service";
			var template_id = "se21bookingerror";
			emailjs.send(service_id,template_id,template_params)
			.then(function(response) {
			   $("#emailErrMsg").css("color","green")
			   $("#emailErrMsg").html('SUCCESS!', response.status, response.text);
			}, function(error) {
			   $("#emailErrMsg").css("color","red")
			   $("#emailErrMsg").html('FAILED...', error);
			});
		});
		//Send > End
		
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
		function editField()
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
		}

	}); 
}

function loadinTech1Week2()
{
	$("#Loader").show()
	$("#timeTable").html("");
	$("#viewPort").hide();
	$("#viewPort_Content").hide();
	$("#whichWeekBtn").html("See Week 1");
	$("#whichWeekBtn").attr("onClick","loadinTech1Week1()")
	var API_URL = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/tech1"
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
						"Key2":"Week",
						"searchAttr":"Tech1",
						"searchAttr2":"2"
					}
				),
			contentType:"application/json",
			success: function(data)
			{
				$("#Loader").hide();
				$("#viewPort").show();
				$("#viewPort_Content").hide();
				$("#preLimLoader").show();
				
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
							var newString;
							var hiddenTxt; 
							//you can replace with your database row id
							row_id = random_id();
							//loop through ajax row data
							tbl +='<tr row_id="'+row_id+'" id="'+row_id+'">';
								tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(1)+'</div></td>';
								//will hide their email so that it wont show on the table but can be retrieved later to decide who booked the room. 
								
								newString = val['Period1'];
								if(val['Period1']!="unbooked")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								 
								
								newString = val['Period2'];
								if(val['Period2']!="unbooked")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								
							
								newString = val['Break'];
								if(val['Break']!="unbooked")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								
							
								
								newString = val['Period3'];
								if(val['Period3']!="unbooked")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								
							
								newString = val['Period4'];
								if(val['Period4']!="unbooked")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								
							
								newString = val['Lunch'];
								if(val['Lunch']!="unbooked")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								

								newString = val['Period5'];
								if(val['Period5']!="unbooked")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								
							
								newString = val['Period6'];
								if(val['Period6']!="unbooked")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH1'];
								if(val['AfterschoolH1']!="unbooked")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH2'];
								if(val['AfterschoolH2']!="unbooked")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								
							

							tbl +='</tr>';
						});

						//--->create table body rows > end

					tbl +='</tbody>';
					//--->create table body > end

				tbl +='</table>'
				//--->create data table > end

				//out put table data
				$(document).find('#timeTable').html(tbl);

			}
		});

		var random_id = function  () 
		{
			var id_num = Math.random().toString(9).substr(2,3);
			var id_str = Math.random().toString(36).substr(2);

			return id_num + id_str;
		}
		
		//--->Editing Viewport > start
		$(document).on('click', '.row_data', function(event) 
		{
			event.preventDefault(); 
			$("#preLimLoader").hide();
			$("#viewPort_Content").show();
			
			if($(this).attr('edit_type') == 'button')
			{
				return false; 
			}

			$("#viewPort").show();
			
			$("#deleteBtn").hide();
			$("#contactBtn").hide();
			$("#bookBtn").hide();
			
			if(PrevSelect!=null)
			{
				PrevSelect.removeClass("selected");
			}
			
			var row_div = $(this)
			row_div.addClass("selected");
			PrevSelect = row_div;
			//Populating Details Start
			$("#bookingDetails").html("Week Beginning: " + getMonday(new Date()));
			var row_id = $(this).closest('tr').attr('row_id');	
			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var rowDay = Cells[0].textContent;
			$("#bookingDetails").append("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+rowDay);
			var col_name = row_div.attr('col_name');
			$("#bookingDetails").append(" "+col_name);
			//Populating Details End
			
			//storing data incase they want to book the room
			Day = rowDay;
			Period = col_name;
			
			//Seeing if the room is already Booked
			var currentStatus = row_div.html();
			console.log(currentStatus)
			if(currentStatus == "unbooked")
			{
				$("#bookBtn").show();
				$("#bookingStatus").html("unbooked<br><br>")
			}	
			else if(currentStatus.split(' ')[0] == "booked")
			{
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				
				if(clickedBookedEmail == welcomeMsgEmail)
				{
					$("#bookingStatus").html("booked<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("booked<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+clickedBookedEmail)
					$("#contactBtn").show();
				}
			}
		})	
		//--->Editing Viewport > end
		
		//--->MakingviewPort Dissapear > start
		$(document).mouseup(function(e) 
		{
			var container = $("#viewPort");
			var table = $("#timeTable");

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0 && !table.is(e.target) && table.has(e.target).length === 0) 
			{
				$("#viewPort_Content").hide()
				$("#preLimLoader").show();
				if(PrevSelect!=null)
				{
					PrevSelect.removeClass("selected")
				}
			}
		});
		//--->MakingviewPort Dissapear > end
		
		//--->button > book > start	
		$(document).on('click', '#bookBtn', function(event) 
		{
			preLimLoader("Booking...")
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var row_id = tbl_row.attr('row_id');
			getEmail()
			checkVariable()
			function checkVariable() 
			{
				if (email != null) 
				{
				   $.ajax
				   ({
						type:'POST',
						url:API_URL,
						data: JSON.stringify(
								{
									"Day":manipulateDayWeek2(Day),
									"Room":"Tech1",
									"updateAttr":Period,
									"updateValue":"booked " + email
								}
							  ),

						contentType:"application/json",

						success: function(data){
							loadinTech1Week2()
							exitpreLimLoader()
						},

						error: function(data)
						{
							//$("#errorModule").show();
						}
				   });
				}
				else
				{
					setTimeout(checkVariable, 1000);
				}
		    }
		});
		//--->button > book > end

		//--->button > Delete > start	
		$(document).on('click', '#deleteBtn', function(event) 
		{
			preLimLoader("Deleting Booking...")
			event.preventDefault();
			$.ajax
			({
				type:'POST',
				url:API_URL,
				data: JSON.stringify(
					{
						"Day":manipulateDayWeek2(Day),
						"Room":"Tech1",
						"updateAttr":Period,
						"updateValue":"unbooked"
					}
				),

				contentType:"application/json",
				
				success: function(data){
					loadinTech1Week2()
					exitpreLimLoader()
				},
				error: function(data)
				{
					//$("#errorModule").show();
				}
			});
		
		});
		//--->button > Delete > end
		
		//ContactBtn > Start
		$(document).on('click', '#contactBtn', function(event) 
		{
			$("#toEmail").val("To: "+clickedBookedEmail);
		});
		//ContactBtn > End
		
		//Send > Start
		$(document).on('click', '#sendBtn', function(event) 
		{
			 $("#emailErrMsg").html("Sending......");
			var nicE = new nicEditors.findEditor('emailText');
			emailVal = nicE.getContent();
			
			var template_params = 
			{
			   "ToEmail": clickedBookedEmail,
			   "FromEmail": welcomeMsgEmail,
			   "subject": $("#subject").val(),
			   "text": emailVal
			}

			var service_id = "default_service";
			var template_id = "se21bookingerror";
			emailjs.send(service_id,template_id,template_params)
			.then(function(response) {
			   $("#emailErrMsg").css("color","green")
			   $("#emailErrMsg").html('SUCCESS!', response.status, response.text);
			}, function(error) {
			   $("#emailErrMsg").css("color","red")
			   $("#emailErrMsg").html('FAILED...', error);
			});
		});
		//Send > End
		
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
		function editField()
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
		}

	}); 
}