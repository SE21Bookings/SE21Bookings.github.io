var Day;
var Period;
var PrevSelect;
var clickedBookedEmail;
var currentStatus;
var welcomeMsgEmail;
var API_URL_Tech1 = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/tech1";
var newValue;
var Description;

function PostData(whichRoom,WhichWeek)
{
	if(WhichWeek == 11)
	{
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
					{
						"Day":manipulateDayWeek1(Day),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					loadinTech1Week1()
					exitpreLimLoader()
				},

				error: function(data)
				{
					$("#errorModule").show();
				}
		});
	}
	else if(WhichWeek == 21)
	{
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
					{
						"Day":manipulateDayWeek2(Day),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					loadinTech1Week1()
					exitpreLimLoader()
				},

				error: function(data)
				{
					$("#errorModule").show();
				}
		});
	}
	else if(WhichWeek == 12)
	{
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
					{
						"Day":manipulateDayWeek1(Day),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					loadinTech1Week2()
					exitpreLimLoader()
				},

				error: function(data)
				{
					$("#errorModule").show();
				}
		});
	}
	else if(WhichWeek == 22)
	{
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
					{
						"Day":manipulateDayWeek2(Day),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					loadinTech1Week2()
					exitpreLimLoader()
				},

				error: function(data)
				{
					$("#errorModule").show();
				}
		});
	}
}

function loadinTech1Week1()
{
	removeEventListeners()
	$("#timeTableTitle").html("Tech 1 Timetable [Week 1]:")
	$("#Loader").show()
	$("#timeTable").html("");
	$("#viewPort").hide();
	$("#viewPort_Content").hide();
	$("#whichWeekBtn").html("See Week 2");
	$("#whichWeekBtn").attr("onClick","loadinTech1Week2(); $('#timeTableTitle').html('Tech 1 Timetable [Week 2]:');")
	
	var row_id = ""
	var tbl = '';
	$(document).ready(function($)
	{

		$.ajax({
			type:'PATCH',
			url: API_URL_Tech1,
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
							var bookState;
							//you can replace with your database row id
							row_id = random_id();
							//loop through ajax row data
							tbl +='<tr row_id="'+row_id+'" id="'+row_id+'">';
								tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(1)+'</div></td>';
								//will hide their email so that it wont show on the table but can be retrieved later to decide who booked the room. 
								
								newString = val['Period1'];
								bookState = val['Period1'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								 
								
								newString = val['Period2'];
								bookState = val['Period2'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								
							
								newString = val['Break'];
								bookState = val['Break'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								
							
								
								newString = val['Period3'];
								bookState = val['Period3'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								
							
								newString = val['Period4'];
								bookState = val['Period4'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								
							
								newString = val['Lunch'];
								bookState = val['Lunch'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								

								newString = val['Period5'];
								bookState = val['Period5'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								
							
								newString = val['Period6'];
								bookState = val['Period6'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH1'];
								bookState = val['AfterschoolH1'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH2'];
								bookState = val['AfterschoolH2'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
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

			},

			error: function(data)
			{
				$("#errorModule").show();
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
			$("#Description").html('')
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
			$("#rbookBtn").hide();
			$("#lessonLockBtn").hide();
			
			if(PrevSelect!=null)
			{
				PrevSelect.removeClass("selected");
			}
			
			var row_div = $(this)
			row_div.addClass("selected");
			PrevSelect = row_div;
			//Populating Details Start
			$("#bookingDetails").html("<strong>Week Beginning: </strong>" + getMonday(new Date()));
			var row_id = $(this).closest('tr').attr('row_id');	
			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var rowDay = Cells[0].textContent;
			$("#bookingDetails").append("<br><strong>Time: </strong>"+rowDay);
			var col_name = row_div.attr('col_name');
			$("#bookingDetails").append(" "+col_name);
			//Populating Details End
			
			//storing data incase they want to book the room
			Day = rowDay;
			Period = col_name;
			
			//Seeing if the room is already Booked
			
			currentStatus = row_div.html();
			if(currentStatus == "unbooked")
			{
				$("#bookBtn").show();
				$("#rbookBtn").show();
				$("#bookingStatus").html("<strong>Status: </strong>unbooked<br>")
				if(localStorage.getItem("adminPriv")=="true")
				{
					$("#lessonLockBtn").show();
				}
			}	
			else if(currentStatus.split(' ')[0] == "booked")
			{
				 
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				
				if(clickedBookedEmail.indexOf(' ')!=-1) // If Reccuring Booking
				{
					Description = clickedBookedEmail.substr(clickedBookedEmail.indexOf(' ')+1)
					
					var newString = Description.substr(Description.indexOf(' ')+1)
					var lastIndex = newString.lastIndexOf(" ");
					newString = newString.substring(0, lastIndex);
					
					var ECA = newString.split(' ')[0]
					var ECADes = newString.substr(newString.indexOf(' ')+1)
					
					$("#Description").append("<strong>ECA: </strong>"+ECA + "<br>")
					$("#Description").append("<strong>Description: </strong>"+ECADes+"<br>")
					if(Description.split(' ')[0] == "lock1lock2")
					{
						$("#Description").append("<strong>On Weeks: </strong>Week 1 and Week 2<br>")
					}
					else if(Description.split(' ')[0] == "lock1")
					{
						$("#Description").append("<strong>On Week: </strong>Week 1<br>")
					}
					else if(Description.split(' ')[0] == "lock2")
					{
						$("#Description").append("<strong>On Week: </strong>Week 2<br>")
					}
					
					var n = Description.split(" ");
					n = n[n.length - 1];
					if(n == "-1")
					{
						$("#Description").append("<strong>Booked Weeks Left: </strong>Perpetual<br>")
					}
					else
					{
						$("#Description").append("<strong>Booked Weeks Left: </strong>"+n+"<br>")
					}
					
				}
				else
				{
					$("#Description").append("<em>[ECA Information N.A for Quickbooks]</em>")
				}

				clickedBookedEmail = clickedBookedEmail.split(' ')[0]
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				
				if(welcomeMsgEmail == clickedBookedEmail)
				{
					$("#bookingStatus").html("<strong>Status: </strong> booked<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> booked<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#contactBtn").show();
				}
			}
			
			else if(currentStatus.split(' ')[0] == "lesson")
			{
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				clickedBookedEmail = clickedBookedEmail.split(' ')[0]
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				if(welcomeMsgEmail == clickedBookedEmail)
				{
					$("#bookingStatus").html("<strong>Status: </strong> lesson<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> lesson<br><strong>Email: </strong>"+clickedBookedEmail)
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
			var bookRModal = $("#BookRecuring")
			var EModal = $("#emailModal")

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0 && !table.is(e.target) && table.has(e.target).length === 0 && !bookRModal.is(e.target) && bookRModal.has(e.target).length === 0 && !EModal.is(e.target) && EModal.has(e.target).length === 0 ) 
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
						url:API_URL_Tech1,
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
							$("#errorModule").show();
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
			if(Description!=null)
			{
				if(Description.split(' ')[0] =="lock1lock2")
				{
					$.ajax
					({
						type:'POST',
						url:API_URL_Tech1,
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
							loadinTech1Week1()
							exitpreLimLoader()
						},
						error: function(data)
						{
							$("#errorModule").show();
						}
					});
				}
			}
			$.ajax
			({
				type:'POST',
				url:API_URL_Tech1,
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
					$("#errorModule").show();
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
		
		//BookRBtn > Start
		$(document).on('click', '#BookRecrBtn', function(event) 
		{
			
			preLimLoader("Booking Room...")
			Rbook.style.display = "none";
			var ECA = $("#eca").val();
			var ECADes = $("#ecaDes").val();
			var week12Lock = $("#AlternatingWeeks").val(); 
			var howmanyWeeks = $("#howManyWeeks").val();
			
			if (howmanyWeeks.toString().length == 0 )
			{
				howmanyWeeks = -1; 
			}
			
			
			getEmail()
			checkVariable()
			function checkVariable() 
			{
				if (email != null) 
				{
					newValue = "booked " + email +" "+week12Lock+" "+ ECA +" "+ECADes +" "+ howmanyWeeks
					if(week12Lock =="lock1")
					{
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek1(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData("Tech1",11)
								}
								else
								{
									preLimLoader("Error: Slot in Week 1 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});
					}
					else if(week12Lock =="lock2")
					{
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek2(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData("Tech1",21)
								}
								else
								{
									preLimLoader("Error: Slot in Week 2 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});
						
					}
					else if(week12Lock =="lock1lock2")
					{		
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek1(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									$.ajax({
										type:'PATCH',
										url: API_URL_Tech1,
										data:JSON.stringify(
												{
													"Key":"Room",
													"Key2":"Day",
													"searchAttr":"Tech1",
													"searchAttr2":manipulateDayWeek2(Day)
												}
											),
										contentType:"application/json",
										success: function(data)
										{
											if(data.Items[0][Period] == "unbooked")
											{
												PostData("Tech1",11)
												PostData("Tech1",21)
											}
											else
											{
												preLimLoader("Error: Slot in Week 2 is already booked")
												exitpreLimLoaderErr()
											}
										},
										error: function(data)
										{
											$("#errorModule").show();
										}
									});
									
								}
								else
								{
									preLimLoader("Error: Slot in Week 1 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});				
					}
				}

		    }
		});
		//BookRBtn > End
		
		//lesson Lock >Start
		$(document).on('click', '#lessonLockBtn', function(event) 
		{
			preLimLoader("Booking Lesson...")
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
						url:API_URL_Tech1,
						data: JSON.stringify(
								{
									"Day":manipulateDayWeek1(Day),
									"Room":"Tech1",
									"updateAttr":Period,
									"updateValue":"lesson " + email + " lock1"
								}
							  ),

						contentType:"application/json",

						success: function(data){
							loadinTech1Week1()
							exitpreLimLoader()
						},

						error: function(data)
						{
							$("#errorModule").show();
						}
				   });
				}
				else
				{
					window.setTimeout(checkVariable,1000)
				}
			}
		});
		//lesson Lock >End
		
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
		}); 
}

function loadinTech1Week2()
{
	removeEventListeners()
	$("#timeTableTitle").html("Tech 1 Timetable [Week 2]:")
	$("#Loader").show()
	$("#timeTable").html("");
	$("#viewPort").hide();
	$("#viewPort_Content").hide();
	$("#whichWeekBtn").html("See Week 1");
	$("#whichWeekBtn").attr("onClick","loadinTech1Week1(); $('#timeTableTitle').html('Tech 1 Timetable [Week 1]:');")
	
	var row_id = ""
	var tbl = '';
	$(document).ready(function($)
	{

		$.ajax({
			type:'PATCH',
			url: API_URL_Tech1,
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
							var bookState;
							//you can replace with your database row id
							row_id = random_id();
							//loop through ajax row data
							tbl +='<tr row_id="'+row_id+'" id="'+row_id+'">';
								tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(2)+'</div></td>';
								//will hide their email so that it wont show on the table but can be retrieved later to decide who booked the room. 
								
								newString = val['Period1'];
								bookState = val['Period1'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
									newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period1">'+newString+'</div></td>';
								}
								 
								
								newString = val['Period2'];
								bookState = val['Period2'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
									newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period2">'+newString+'</div></td>';
								}
								
							
								newString = val['Break'];
								bookState = val['Break'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
									newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Break">'+newString+'</div></td>';
								}
								
							
								
								newString = val['Period3'];
								bookState = val['Period3'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
									newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period3">'+newString+'</div></td>';
								}
								
							
								newString = val['Period4'];
								bookState = val['Period4'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
									newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period4">'+newString+'</div></td>';
								}
								
							
								newString = val['Lunch'];
								bookState = val['Lunch'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
									newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
								}
								

								newString = val['Period5'];
								bookState = val['Period5'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
									newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period5">'+newString+'</div></td>';
								}
								
							
								newString = val['Period6'];
								bookState = val['Period6'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
									newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="Period6">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH1'];
								bookState = val['AfterschoolH1'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
									newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
								}
								
							
								newString = val['AfterschoolH2'];
								bookState = val['AfterschoolH2'].split(' ')[0]
								if(bookState=="booked")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor booked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else if(bookState=="unbooked")
								{
									tbl +='<td ><div class="row_data pointerCursor unbooked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
								}
								else if(bookState=="lesson")
								{
									hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
									newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
									tbl +='<td ><div class="row_data pointerCursor lesson" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
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

			},

			error: function(data)
			{
				$("#errorModule").show();
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
			$("#Description").html('')
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
			$("#rbookBtn").hide();
			$("#lessonLockBtn").hide();
			
			if(PrevSelect!=null)
			{
				PrevSelect.removeClass("selected");
			}
			
			var row_div = $(this)
			row_div.addClass("selected");
			PrevSelect = row_div;
			//Populating Details Start
			var CurDate = new Date();
			var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
			CurDate.setTime(CurDate.getTime() + weekInMilliseconds);
			$("#bookingDetails").html("<strong>Week Beginning: </strong>" + getMonday(CurDate));
			var row_id = $(this).closest('tr').attr('row_id');	
			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var rowDay = Cells[0].textContent;
			$("#bookingDetails").append("<br><strong>Time: </strong>"+rowDay);
			var col_name = row_div.attr('col_name');
			$("#bookingDetails").append(" "+col_name);
			//Populating Details End
			
			//storing data incase they want to book the room
			Day = rowDay;
			Period = col_name;
			
			//Seeing if the room is already Booked
			var Description;
			var currentStatus = row_div.html();
			if(currentStatus == "unbooked")
			{
				$("#bookBtn").show();
				$("#rbookBtn").show();
				$("#bookingStatus").html("<strong>Status: </strong>unbooked<br>")
				if(localStorage.getItem("adminPriv")=="true")
				{
					$("#lessonLockBtn").show();
				}
			}	
			else if(currentStatus.split(' ')[0] == "booked")
			{
				 
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				
				if(clickedBookedEmail.indexOf(' ')!=-1) // If Reccuring Booking
				{
					Description = clickedBookedEmail.substr(clickedBookedEmail.indexOf(' ')+1)
					
					var newString = Description.substr(Description.indexOf(' ')+1)
					var lastIndex = newString.lastIndexOf(" ");
					newString = newString.substring(0, lastIndex);
					
					var ECA = newString.split(' ')[0]
					var ECADes = newString.substr(newString.indexOf(' ')+1)
					
					$("#Description").append("<strong>ECA: </strong>"+ECA + "<br>")
					$("#Description").append("<strong>Description: </strong>"+ECADes+"<br>")
					if(Description.split(' ')[0] == "lock1lock2")
					{
						$("#Description").append("<strong>On Weeks: </strong>Week 1 and Week 2<br>")
					}
					else if(Description.split(' ')[0] == "lock1")
					{
						$("#Description").append("<strong>On Week: </strong>Week 1<br>")
					}
					else if(Description.split(' ')[0] == "lock2")
					{
						$("#Description").append("<strong>On Week: </strong>Week 2<br>")
					}
					
					var n = Description.split(" ");
					n = n[n.length - 1];
					if(n == "-1")
					{
						$("#Description").append("<strong>Booked Weeks Left: </strong>Perpetual<br>")
					}
					else
					{
						$("#Description").append("<strong>Booked Weeks Left: </strong>"+n+"<br>")
					}
					
				}
				else
				{
					$("#Description").append("<em>[ECA Information N.A for Quickbooks]</em>")
				}
				clickedBookedEmail = clickedBookedEmail.split(' ')[0]
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				
				if(welcomeMsgEmail == clickedBookedEmail)
				{
					$("#bookingStatus").html("<strong>Status: </strong> booked<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> booked<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#contactBtn").show();
				}
			}
			
			else if(currentStatus.split(' ')[0] == "lesson")
			{
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				clickedBookedEmail = clickedBookedEmail.split(' ')[0]
				welcomeMsgEmail = $("#welcomeMsg").html().substr($("#welcomeMsg").html().indexOf(' ')+1)
				if(welcomeMsgEmail == clickedBookedEmail)
				{
					$("#bookingStatus").html("<strong>Status: </strong> lesson<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#deleteBtn").show();
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> lesson<br><strong>Email: </strong>"+clickedBookedEmail)
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
			var bookRModal = $("#BookRecuring")
			var EModal = $("#emailModal")

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0 && !table.is(e.target) && table.has(e.target).length === 0 && !bookRModal.is(e.target) && bookRModal.has(e.target).length === 0 && !EModal.is(e.target) && EModal.has(e.target).length === 0 ) 
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
						url:API_URL_Tech1,
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
							$("#errorModule").show();
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
			if(Description!=null)
			{
				if(Description.split(' ')[0] =="lock1lock2")
				{
					$.ajax
					({
						type:'POST',
						url:API_URL_Tech1,
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
							loadinTech1Week2()
							exitpreLimLoader()
						},
						error: function(data)
						{
							$("#errorModule").show();
						}
					});
				}
			}
			$.ajax
			({
				type:'POST',
				url:API_URL_Tech1,
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
					$("#errorModule").show();
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
		
		//BookRBtn > Start
		$(document).on('click', '#BookRecrBtn', function(event) 
		{
			
			preLimLoader("Booking Room...")
			Rbook.style.display = "none";
			var ECA = $("#eca").val();
			var ECADes = $("#ecaDes").val();
			var week12Lock = $("#AlternatingWeeks").val(); 
			var howmanyWeeks = $("#howManyWeeks").val();
			
			if (howmanyWeeks.toString().length == 0 )
			{
				howmanyWeeks = -1; 
			}
			getEmail()
			checkVariable()
			function checkVariable() 
			{
				if (email != null) 
				{
				    newValue = "booked " + email +" "+week12Lock+" "+ ECA +" "+ECADes +" "+ howmanyWeeks
					if(week12Lock =="lock1")
					{
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek1(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData("Tech1",12)
								}
								else
								{
									preLimLoader("Error: Slot in Week 1 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});
					}
					else if(week12Lock =="lock2")
					{
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek2(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData("Tech1",22)
								}
								else
								{
									preLimLoader("Error: Slot in Week 2 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});
						
					}
					else if(week12Lock =="lock1lock2")
					{		
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":"Tech1",
										"searchAttr2":manipulateDayWeek1(Day)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									$.ajax({
										type:'PATCH',
										url: API_URL_Tech1,
										data:JSON.stringify(
												{
													"Key":"Room",
													"Key2":"Day",
													"searchAttr":"Tech1",
													"searchAttr2":manipulateDayWeek2(Day)
												}
											),
										contentType:"application/json",
										success: function(data)
										{
											if(data.Items[0][Period] == "unbooked")
											{
												PostData("Tech1",12)
												PostData("Tech1",22)
											}
											else
											{
												preLimLoader("Error: Slot in Week 2 is already booked")
												exitpreLimLoaderErr()
											}
										},
										error: function(data)
										{
											$("#errorModule").show();
										}
									});
									
								}
								else
								{
									preLimLoader("Error: Slot in Week 1 is already booked")
									exitpreLimLoaderErr()
								}
							},
							error: function(data)
							{
								$("#errorModule").show();
							}
						});				
					}
				}
				else
				{
					setTimeout(checkVariable, 1000);
				}
		    }
		});
		//BookRBtn > End
		
		//lesson Lock >Start
		$(document).on('click', '#lessonLockBtn', function(event) 
		{
			preLimLoader("Booking Lesson...")
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
						url:API_URL_Tech1,
						data: JSON.stringify(
								{
									"Day":manipulateDayWeek2(Day),
									"Room":"Tech1",
									"updateAttr":Period,
									"updateValue":"lesson " + email + " lock2"
								}
							  ),

						contentType:"application/json",

						success: function(data){
							loadinTech1Week2()
							exitpreLimLoader()
						},

						error: function(data)
						{
							$("#errorModule").show();
						}
				   });
				}
				else
				{
					window.setTimeout(checkVariable,1000)
				}
			}
		});
		//lesson Lock >End
		
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

	}); 
}

