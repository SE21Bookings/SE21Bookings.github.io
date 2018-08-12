var Day;
var Period;
var PrevSelect;
var clickedBookedEmail;
var currentStatus;
var welcomeMsgEmail;
var API_URL_Tech1 = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/tech1";
var API_URL_Admin = "https://7l7do5pc6f.execute-api.ap-southeast-1.amazonaws.com/ReadWriteFromTableSE21/adminusers";
var newValue;
var Description;
var trimNum;
var trueWeek;
var Recurrence;
var WhichRoom;
var oppositeWeek;
var doneLoading;
var masterWeek;
var overWriteTrueWeek;

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
						"Day":manipulateDay(Day, 1),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					ReloadRoom(WhichRoom,trueWeek)
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
						"Day":manipulateDay(Day, 2),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					ReloadRoom(WhichRoom,trueWeek)
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
						"Day":manipulateDay(Day, 1),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					ReloadRoom(WhichRoom,trueWeek)
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
						"Day":manipulateDay(Day, 2),
						"Room":whichRoom,
						"updateAttr":Period,
						"updateValue": newValue
					}
				),

				contentType:"application/json",

				success: function(data){
					ReloadRoom(WhichRoom,trueWeek)
					exitpreLimLoader()
				},

				error: function(data)
				{
					$("#errorModule").show();
				}
		});
	}
}

function DocFunctions()
{	
	removeEventListeners()
	Recurrence = false
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
			$("#quickLockBtn").hide();
			
			if(PrevSelect!=null)
			{
				PrevSelect.removeClass("selected");
			}
			
			var row_div = $(this)
			row_div.addClass("selected");
			PrevSelect = row_div;
			//Populating Details Start
			if(overWriteTrueWeek =="1")
			{
				$("#bookingDetails").html("<strong>Week Beginning: </strong>" + weekBeginNow());
			}
			else if(overWriteTrueWeek =="2")
			{
				$("#bookingDetails").html("<strong>Week Beginning: </strong>" + weekBeginNext());
			}
			var row_id = $(this).closest('tr').attr('row_id');	
			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var rowDay = Cells[0].textContent;
			$("#bookingDetails").append("<br><strong>Time: </strong>"+rowDay);
			var col_name = row_div.attr('col_name');
			$("#bookingDetails").append(" "+manipulatePeriod(col_name));
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
				if($(this).hasClass("disable"))
				{
					$("#bookBtn").attr("disabled", "disabled");
				}
				else
				{
					$("#bookBtn").removeAttr("disabled");
				}
				
				$("#bookingStatus").html("<strong>Status: </strong>unbooked<br>")
				if(adminPriv==true)
				{
					$("#lessonLockBtn").show();
					$("#quickLockBtn").show();
				}
			}	
			
			else if(currentStatus.split(' ')[0] == "booked")
			{
				 
				clickedBookedEmail = extractContent(currentStatus.substr(currentStatus.indexOf(' ')+1))
				
				if(clickedBookedEmail.indexOf(' ')!=-1) // If Reccuring Booking
				{
					Recurrence = true;
					Description = clickedBookedEmail.substr(clickedBookedEmail.indexOf(' ')+1)
					
					var newString = Description.substr(Description.indexOf(' ')+1)
					var lastIndex = newString.lastIndexOf(" ");
					newString = newString.substring(0, lastIndex);
					
					var ECA = newString.split(' ')[0].split('_').join(' ')
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
					if($(this).hasClass("disable"))
					{
						$("#deleteBtn").attr("disabled", "disabled");
						if(Recurrence=true)
						{
							$("#deleteBtn").removeAttr("disabled");
						}
					}
					else
					{
						$("#deleteBtn").removeAttr("disabled");
					}
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> booked<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#contactBtn").show();
					if($(this).hasClass("disable"))
					{
						$("#contactBtn").attr("disabled", "disabled");
						if(Recurrence=true)
						{
							$("#contactBtn").removeAttr("disabled");
						}
					}
					else
					{
						$("#contactBtn").removeAttr("disabled");
					}
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
					$("#deleteBtn").removeAttr("disabled");				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> lesson<br><strong>Email: </strong>"+clickedBookedEmail)
					$("#contactBtn").show();
					$("#contactBtn").removeAttr("disabled");	
				}
			}
			
			else if(currentStatus.split(' ')[0] == "locked")
			{	
				if(adminPriv == true)
				{
					$("#bookingStatus").html("<strong>Status: </strong> locked")
					$("#deleteBtn").show();
					$("#deleteBtn").removeAttr("disabled");
				}
				else
				{
					$("#bookingStatus").html("<strong>Status: </strong> locked")
				}
			}
	});	
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
			$.ajax({
				type:'PATCH',
				url: API_URL_Tech1,
				data:JSON.stringify(
					{
						"Key":"Room",
						"Key2":"Day",
						"searchAttr":WhichRoom,
						"searchAttr2":manipulateDay(Day, trueWeek)
					}
					),
				contentType:"application/json",
				success: function(data)
					{
						if(data.Items[0][Period] == "unbooked")
						{
							validatedBook()
						}
						else
						{
							preLimLoader("Error: Slot in Week 1 is already booked")
							exitpreLimLoaderErr()
							ReloadRoom(WhichRoom,trueWeek)
						}
					},
					error: function(data)
					{
						$("#errorModule").show();
					}
				});
			
			function validatedBook()
			{
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
									"Day":manipulateDay(Day, trueWeek),
									"Room":WhichRoom,
									"updateAttr":Period,
									"updateValue":"booked " + email
								}
							  ),

						contentType:"application/json",

						success: function(data){
							ReloadRoom(WhichRoom,trueWeek)
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
			}
			
		});
	//--->button > book > end

	//--->button > Delete > start	
	$(document).on('click', '#deleteBtn', function(event) 
	{
			console.log(trueWeek)
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
								"Day":manipulateDay(Day, trueWeek),
								"Room":WhichRoom,
								"updateAttr":Period,
								"updateValue":"unbooked"
							}
						),

						contentType:"application/json",

						success: function(data){
							
						},
						error: function(data)
						{
							$("#errorModule").show();
						}
					});
					
					if(trueWeek == 1)
					{
						oppositeWeek = 2
					}
					else if(trueWeek == 2)
					{
						oppositeWeek = 1
					}
				}
				else
				{
					oppositeWeek = trueWeek
				}
			}
			else
			{
				oppositeWeek = trueWeek
			}
			console.log(manipulateDay(Day, oppositeWeek) + " " + WhichRoom)
			$.ajax
			({
				type:'POST',
				url:API_URL_Tech1,
				data: JSON.stringify(
					{
						"Day":manipulateDay(Day, oppositeWeek),
						"Room":WhichRoom,
						"updateAttr":Period,
						"updateValue":"unbooked"
					}
				),

				contentType:"application/json",

				success: function(data){
					ReloadRoom(WhichRoom,trueWeek)
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
			var ECA = $("#eca").val().split(' ').join('_');
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
					var w;
					if(trueWeek == 1)
					{
						w=2
					}
					else if(trueWeek == 2)
					{
						w=1
					}
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
										"searchAttr":WhichRoom,
										"searchAttr2":manipulateDay(Day, w)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData(WhichRoom,11)
								}
								else
								{
									preLimLoader("Error: Slot in Week 1 is already booked")
									exitpreLimLoaderErr()
									ReloadRoom(WhichRoom,trueWeek)
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
						var w;
						if(trueWeek == 1)
						{
							w=2
						}
						else if(trueWeek == 2)
						{
							w=1
						}
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":WhichRoom,
										"searchAttr2":manipulateDay(Day, w)
									}
								),
							contentType:"application/json",
							success: function(data)
							{
								if(data.Items[0][Period] == "unbooked")
								{
									PostData(WhichRoom,21)
								}
								else
								{
									preLimLoader("Error: Slot in Week 2 is already booked")
									exitpreLimLoaderErr()
									ReloadRoom(WhichRoom,trueWeek)
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
						var w;
						if(trueWeek == 1)
						{
							w=2
						}
						else if(trueWeek == 2)
						{
							w=1
						}
						$.ajax({
							type:'PATCH',
							url: API_URL_Tech1,
							data:JSON.stringify(
									{
										"Key":"Room",
										"Key2":"Day",
										"searchAttr":WhichRoom,
										"searchAttr2":manipulateDay(Day, w)
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
													"searchAttr":WhichRoom,
													"searchAttr2":manipulateDay(Day, trueWeek)
												}
											),
										contentType:"application/json",
										success: function(data)
										{
											if(data.Items[0][Period] == "unbooked")
											{
												PostData(WhichRoom,11)
												PostData(WhichRoom,21)
											}
											else
											{
												preLimLoader("Error: Slot in Week 2 is already booked")
												exitpreLimLoaderErr()
												ReloadRoom(WhichRoom,trueWeek)
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
									ReloadRoom(WhichRoom,trueWeek)
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
									"Day":manipulateDay(Day, trueWeek),
									"Room":WhichRoom,
									"updateAttr":Period,
									"updateValue":"lesson " + email + " lock1"
								}
							  ),

						contentType:"application/json",

						success: function(data){
							ReloadRoom(WhichRoom,trueWeek)
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
		
	//Lock >Start
	$(document).on('click', '#quickLockBtn', function(event) 
	{
			preLimLoader("Locking...")
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
									"Day":manipulateDay(Day, trueWeek),
									"Room":WhichRoom,
									"updateAttr":Period,
									"updateValue":"locked lock1"
								}
							),

						contentType:"application/json",

						success: function(data){
							ReloadRoom(WhichRoom,trueWeek)
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
	//Lock >End
		
	//Send > Start
	$(document).on('click', '#sendBtn', function(event) 
	{
			$("#emailErrMsg").css("color","black");
			$("#emailErrMsg").html("Sending......");
			var nicE = new nicEditors.findEditor('emailText');
			emailVal = nicE.getContent();
			
			if(emailVal.length >= 10 && $("#subject").val().length!=0)
			{
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
			}
			else
			{
				$("#emailErrMsg").css("color","red")
				$("#emailErrMsg").html('ERROR: Fields Cannot be empty');
			}
			
		});
	//Send > End
}

function generateAdminTable()
{
	removeEventListeners()
	$("#AdminUserTable").html("")
	$("#LoaderUser").show()
	$.ajax({
		type: 'GET',
		url: API_URL_Admin,
		success: function (data) 
		{
			$("#LoaderUser").hide()
			console.log(data.Items);
			tbl = ''
				//--->create data table > start

			tbl += '<table class="table table-hover">'

				//--->create table header > start
				tbl += '<thead>';
					tbl += '<tr>';
						tbl += '<th></th>';
						tbl += '<th>Email</th>';
						tbl += '<th>Options</th>';
					tbl += '</tr>';
				tbl += '</thead>';
				//--->create table header > end


				//--->create table body > start
				tbl += '<tbody>';

					//--->create table body rows > start
					$.each(data.Items, function (index, val)
					{
						//you can replace with your database row id
						row_id = random_id();

						//loop through ajax row data
						tbl += '<tr id="' + row_id + '" row_id="' + row_id + '">';
							tbl += '<td ><div edit_type="click" col_name="Email"> <span class="hidden">' + val['Email'] + '</span></div></td>';
							tbl += '<td ><div edit_type="click" class="row_data" col_name="UserEmail">' + val['UserEmail'] + '</div></td>';
						//--->edit options > start
						tbl += '<td>';

						tbl += '<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="' + row_id + '" > Edit</a> | </span>';
						tbl += '<span class="btn_delete"> <a href="#" class="btn btn-link"  row_id="' + row_id + '"> Delete</a> </span>';

						//only show this button if edit button is clicked
						tbl += '<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="' + row_id + '"> Save</a> | </span>';
						tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="' + row_id + '"> Cancel</a></span>';

						tbl += '</td>';
						//--->edit options > end

						tbl += '</tr>';
					});

					//--->create table body rows > end

				tbl += '</tbody>';
				//--->create table body > end

			tbl += '</table>'
				//--->create data table > end

			//out put table data
			$(document).find('#AdminUserTable').html(tbl);

			$(document).find('.btn_save').hide();
			$(document).find('.btn_cancel').hide();
		},
		error: function (data) {
			$("#errorModule").show();
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
		$(this).addClass('editColor').css('padding','6px');
		$(this).focus();
		//--->add the original entry > start
		//--->add the original entry > end
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

		.removeClass('editColor') //add bg css
		.css('padding','')

		var col_name = row_div.attr('col_name');
		var col_val = row_div.html();
		var Row = document.getElementById(row_id);
		var Cells = Row.getElementsByTagName("td");
		var colEmail = Cells[0].textContent;
		$.ajax({
			type:'PUT',
			url:API_URL_Admin,
			data: JSON.stringify(
					{
						"Email":extractContent(colEmail).trim(),
						"updateAttr":col_name,
						"updateValue":col_val
					}
				  ),

			contentType:"application/json",

			success: function(data){
				generateAdminTable()
			},

			error: function(data)
			{
				$("#errorModule").show();
			}
		});

		var arr = {};
		arr[col_name] = col_val;
		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});
		//out put to show
		console.log(JSON.stringify(arr, null, 2));
	})
	//--->save single field data > end
	
	//--->button > AddUser > start
	$(document).on('click', '#addUserBtn', function(event)
	{
		$.ajax({
			type:'POST',
			url:API_URL_Admin,
			data: JSON.stringify(
					{
						"Email":$("#emailInput").val(),
						"UserEmail":$("#emailInput").val()
					}
				  ),

			contentType:"application/json",

			success: function(data){
				generateAdminTable()
			},

			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	});
	//--->button > edit > end
	
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
		tbl_row.find('.btn_delete').hide();

		//--->add the original entry > start
		tbl_row.find('.row_data').each(function(index, val)
		{
			//this will help in case user decided to click on cancel button
			$(this).attr('original_entry', $(this).html());
		});
		//--->add the original entry > end

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('contenteditable', 'true')
		.attr('edit_type', 'button')
		.addClass('editColor')
		.css('padding','3px')

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
		tbl_row.find('.btn_delete').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('editColor')
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
		tbl_row.find('.btn_delete').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('editColor')
		.css('padding','')


		editingMultiple = false;
		editingSelect = false;

		//--->get row data > start
		var arr = {};
		tbl_row.find('.row_data').each(function(index, val) // normal Text Data Save
		{
			var col_name = $(this).attr('col_name');
			var col_val  =  $(this).html();

			var Row = document.getElementById(row_id);
			var Cells = Row.getElementsByTagName("td");
			var colEmail = Cells[0].textContent;

			$.ajax({
				type:'PUT',
				url:API_URL_Admin,
				data: JSON.stringify(
						{
							"Email":extractContent(colEmail).trim(),
							"updateAttr":col_name,
							"updateValue":col_val
						}),
				contentType:"application/json",
				success: function(data){
					generateAdminTable()
				},
				error: function(data)
				{
					$("#errorModule").show();
				}
			});
			arr[col_name] = col_val;
		});
		//--->get row data > end
		
		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});
		//out put to show
		console.log(JSON.stringify(arr, null, 2))
	});
	//--->save whole row entery > end
	
	//--->Delete whole row entry > start
	$(document).on('click', '.btn_delete', function(event)
	{
		var row_id = $(this).closest('tr').attr('row_id');
		var row_div = $(this)

		var col_name = row_div.attr('col_name');
		var col_val = row_div.html();

		var Row = document.getElementById(row_id);
		var Cells = Row.getElementsByTagName("td");

		var colEmail = Cells[0].textContent;

		$.ajax({
			type:'DELETE',
			url:API_URL_Admin,
			data: JSON.stringify(
				{
					"Email":extractContent(colEmail).trim()
				}),
			contentType:"application/json",
			success: function(data){
				generateAdminTable()
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	});
}

function loadinRoom(trueRoom, roomLoadWeek)
{
	EditStatus = null;
	checkIfEditing()
	checkVariable()
	function checkVariable() 
	{
		if (EditStatus != null) 
		{
			if(EditStatus=="Edited")
			{
				editValidated()
			}
			else if(EditStatus=="Editing")
			{
				location.reload()
			}
		}
		else
		{
			setTimeout(checkVariable, 1000);
		}
	}
	
	function editValidated()
	{
		removeEventListeners()
		DocFunctions()
		WhichRoom = trueRoom
		overWriteTrueWeek = roomLoadWeek;

		$("#Loader").show()
		$("#timeTable").html("");
		$("#viewPort").show();
		$("#viewPort_Content").hide();
		$('#timeTableTitle').html('Timetable:');
		$("#whichWeekBtn").html("");
		$("#whichWeekBtn").attr("onClick","")
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
							"Key2":"WeekCount",
							"searchAttr":WhichRoom,
							"searchAttr2":roomLoadWeek
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
					if(whichTrueWeek(data.Items[0]['Day']) == 1)
					{
							temp = data.Items[1]
							data.Items[1] = data.Items[3];
							data.Items[3] = temp;
							trimNum = 1;
							trueWeek = 1
						}
					else if(whichTrueWeek(data.Items[0]['Day']) == 2)
					{
							temp = data.Items[3]
							data.Items[3]=data.Items[0]
							data.Items[0] = temp

							temp = data.Items[4]
							data.Items[4]=data.Items[3]
							data.Items[3] = temp

							temp = data.Items[2]
							data.Items[2]=data.Items[1]
							data.Items[1] = temp

							trimNum = 2
							trueWeek =2
						}
					console.log(data.Items);
					console.log(" || TrueWeek: " + trueWeek)



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
									if(new Date().getDay()-1 > index && roomLoadWeek=="1")// graying out days we've passed
									{
										tbl +='<tr row_id="'+row_id+'" id="'+row_id+'" class="Disabled">';
										tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(trimNum)+'</div></td>';
										//will hide their email so that it wont show on the table but can be retrieved later to decide who booked the room. 

										newString = val['Period1'];
										bookState = val['Period1'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
											newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
											newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
											newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
										}


										newString = val['Period2'];
										bookState = val['Period2'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
											newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period2">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period2">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
											newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period2">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
											newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period2">'+newString+'</div></td>';
										}

										newString = val['Break'];
										bookState = val['Break'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
											newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Break">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Break">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
											newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Break">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
											newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Break">'+newString+'</div></td>';
										}


										newString = val['Period3'];
										bookState = val['Period3'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
											newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period3">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period3">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
											newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period3">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
											newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period3">'+newString+'</div></td>';
										}

										newString = val['Period4'];
										bookState = val['Period4'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
											newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period4">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period4">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
											newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period4">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
											newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period4">'+newString+'</div></td>';
										}

										newString = val['Lunch'];
										bookState = val['Lunch'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
											newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
											newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
											newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
										}

										newString = val['Period5'];
										bookState = val['Period5'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
											newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period5">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period5">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
											newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period5">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
											newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period5">'+newString+'</div></td>';
										}

										newString = val['Period6'];
										bookState = val['Period6'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
											newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period6">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period6">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
											newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period6">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
											newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period6">'+newString+'</div></td>';
										}

										newString = val['AfterschoolH1'];
										bookState = val['AfterschoolH1'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
											newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
											newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
											newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
										}

										newString = val['AfterschoolH2'];
										bookState = val['AfterschoolH2'].split(' ')[0]
										if(bookState=="booked")
										{
											hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
											newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
										}
										else if(bookState=="unbooked")
										{
											tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
										}
										else if(bookState=="lesson")
										{
											hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
											newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
										}
										else if(bookState=="locked")
										{
											hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
											newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
										}
									}
									else
									{
										tbl +='<tr row_id="'+row_id+'" id="'+row_id+'">';

										tbl +='<td ><div class="bold" col_name="Day">'+(val['Day']).substr(trimNum)+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period1'].substr(val['Period1'].indexOf(' ')+1)	
											newString = val['Period1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period1">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period2'].substr(val['Period2'].indexOf(' ')+1)	
											newString = val['Period2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period2">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Break'].substr(val['Break'].indexOf(' ')+1)	
											newString = val['Break'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Break">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period3'].substr(val['Period3'].indexOf(' ')+1)	
											newString = val['Period3'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period3">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period4'].substr(val['Period4'].indexOf(' ')+1)	
											newString = val['Period4'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period4">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Lunch'].substr(val['Lunch'].indexOf(' ')+1)	
											newString = val['Lunch'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Lunch">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period5'].substr(val['Period5'].indexOf(' ')+1)	
											newString = val['Period5'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period5">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['Period6'].substr(val['Period6'].indexOf(' ')+1)	
											newString = val['Period6'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="Period6">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['AfterschoolH1'].substr(val['AfterschoolH1'].indexOf(' ')+1)	
											newString = val['AfterschoolH1'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="AfterschoolH1">'+newString+'</div></td>';
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
										else if(bookState=="locked")
										{
											hiddenTxt = val['AfterschoolH2'].substr(val['AfterschoolH2'].indexOf(' ')+1)	
											newString = val['AfterschoolH2'].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
											tbl +='<td ><div class="row_data pointerCursor locked" edit_type="click" col_name="AfterschoolH2">'+newString+'</div></td>';
										}
									}
								tbl +='</tr>';
							});

							//--->create table body rows > end

						tbl +='</tbody>';
						//--->create table body > end

					tbl +='</table>'
					//--->create data table > end

					//out put table data


					if(trueRoom == "Tech1" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Tech 1 Timetable ["+weekBeginNow()+"]:")
						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech1','2'); $('#timeTableTitle').html('Tech 1 Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "Tech1" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Tech 1 Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech1','1'); $('#timeTableTitle').html('Tech 1 Timetable ["+weekBeginNow()+"]:');")
					}

					if(trueRoom == "Tech2" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Tech 2 Timetable ["+weekBeginNow()+"]:")



						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech2','2'); $('#timeTableTitle').html('Tech 2 Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "Tech2" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Tech 2 Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech2','1'); $('#timeTableTitle').html('Tech 2 Timetable ["+weekBeginNow()+"]:');")
					}

					if(trueRoom == "Tech3" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Tech 3 Timetable ["+weekBeginNow()+"]:")



						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech3','2'); $('#timeTableTitle').html('Tech 3 Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "Tech3" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Tech 3 Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech3','1'); $('#timeTableTitle').html('Tech 3 Timetable ["+weekBeginNow()+"]:');")
					}

					if(trueRoom == "Tech4" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Tech 4 Timetable ["+weekBeginNow()+"]:")



						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech4','2'); $('#timeTableTitle').html('Tech 4 Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "Tech4" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Tech 4 Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech4','1'); $('#timeTableTitle').html('Tech 4 Timetable ["+weekBeginNow()+"]:');")
					}

					if(trueRoom == "Tech5" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Tech 5 Timetable ["+weekBeginNow()+"]:")



						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech5','2'); $('#timeTableTitle').html('Tech 5 Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "Tech5" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Tech 5 Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('Tech5','1'); $('#timeTableTitle').html('Tech 5 Timetable ["+weekBeginNow()+"]:');")
					}

					if(trueRoom == "VR" && roomLoadWeek =="1")
					{
						$("#timeTableTitle").html("Reception & VR Timetable ["+weekBeginNow()+"]:")



						$("#whichWeekBtn").html("Next Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('VR','2'); $('#timeTableTitle').html('<strong>Tech 1</strong> Timetable ["+weekBeginNext()+"]:');")
					}
					else if(trueRoom == "VR" && roomLoadWeek =="2")
					{
						$("#timeTableTitle").html("Reception & VR Timetable ["+weekBeginNext()+"]:")



						$("#whichWeekBtn").html("Previous Week");
						$("#whichWeekBtn").attr("onClick","loadinRoom('VR','1'); $('#timeTableTitle').html('Reception & VR Timetable ["+weekBeginNow()+"]:');")
					}
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
		}); 
	}
}
