var PrimaryKey = [];
var SortKey = "";
var Periods = [];
var rawData = [];
var tempRawData = [];
var a = 0;
var b = 0;
var numOfRooms = 0; 
var deletingIndex = [];
var RoomArray = [];
var timetable_data;
var tbl = "";
var uploadedRoomOrder = [];
var nonManipulatedRoomOrder = [];
var PrimaryKeyW1 = ["1Monday","2Tuesday","3Wednesday","4Thursday","5Friday"];
var PrimaryKeyW2 = ["11Monday","22Tuesday","33Wednesday","44Thursday","55Friday"];
var PeriodArray = ["Period1","Period2","Break","Period3","Period4","Lunch","Period5","Period6","AfterschoolH1","AfterschoolH2"];
var fullRoomsData = [];
var nonManipulatedRoomData = [];
var oneRoomData = [];
var oneRowData = [];
var firstOccurenceRow=false;
var dayCounter = 0;

var prevCustomRoom = "";
var prevCustomWeek = 0;
var prevCustomEmail = "";
var prevCustomTimetableArray = [];
var prevCustomPrimaryKey = [];

function uploadCustom() //uploads custom CSV file to the server
{	
	widthChange=2;
	$("#uploadButton").hide()
	$("#myProgressUpload").show();
	
	var updated = false;
	var updating = false;	
	
	$("#myProgressUpload").show();
	uploadLoop();
	function uploadLoop()
	{
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":prevCustomRoom,
				"searchAttr2":prevCustomPrimaryKey[a]
			}
			),
		contentType:"application/json",
		success: function(data)
		{
			console.log(prevCustomPrimaryKey[a])
			console.log(data)
			$.each(data.Items, function(index, val) 
			{
				loop3()
				function loop3()
				{
					updated = false;
					updating = false;
					moveProgressBarMasterDelete()
					console.log(val[PeriodArray[b]] + " " +prevCustomTimetableArray[a][b])
					checkVar()
					function checkVar()
					{
						if($("#uploadMethods").val()=="override")//will only activate if it is the override action, this will override everything in the current booking. 
						{
							if((val[PeriodArray[b]] != prevCustomTimetableArray[a][b]) && val[PeriodArray[b]] != undefined)
							{
								console.log("Attempting to update "+updated)
								if(updated == true)
								{
									window.clearTimeout(checkVarInterval);
									nextLoop3()
									return;
								}
								else
								{
									if(updating == false)
									{
										updateValue(prevCustomPrimaryKey[a],PeriodArray[b],prevCustomTimetableArray[a][b],prevCustomRoom)
										updating = true;
									}
									checkVarInterval = window.setTimeout(checkVar,500);
								}
							}
							else
							{
								nextLoop3()
							}
						}
						else
						{
							if(prevCustomTimetableArray[a][b] != "unbooked")
							{
								if((val[PeriodArray[b]] != prevCustomTimetableArray[a][b]) && val[PeriodArray[b]] != undefined)
								{
									console.log("Attempting to update "+updated)
									if(updated == true)
									{
										window.clearTimeout(checkVarInterval);
										nextLoop3()
										return;
									}
									else
									{
										if(updating == false)
										{
											updateValue(prevCustomPrimaryKey[a],PeriodArray[b],prevCustomTimetableArray[a][b],prevCustomRoom)
											updating = true;
										}
										checkVarInterval = window.setTimeout(checkVar,500);
									}
								}
								else
								{
									nextLoop3()
								}
							}
							else
							{
								nextLoop3()
							}
							
						}
					}

				}

				function next()
				{
					a+=1;
					if (a < prevCustomPrimaryKey.length) 
					{            
						uploadLoop()
					}
					else
					{
						a = 0;
						b = 0;
						console.log("Function Finish Excecution")
					}
				}

				function nextLoop3()
				{
					b+=1
					if(b<10)
					{
						loop3();
					}
					else
					{
						b = 0;
						next();
					}
				}

			});
		},
		error: function(data)
		{
			$("#errorModule").show();
		}
		});
	}
		
	function updateValue(givenDay,givenPeriod,newUpdateValue,roomNum)
	{
		console.log("In Update Function")
		console.log(givenDay + roomNum + givenPeriod + newUpdateValue);
		$.ajax
		({
			type:'POST',
			url:API_URL_Tech1,
			data: JSON.stringify(
			{
				"Day":givenDay,
				"Room":roomNum,
				"updateAttr":givenPeriod,
				"updateValue":newUpdateValue
			}
			),

			contentType:"application/json",

			success: function(data)
			{
				updated = true; 
				console.log("Updated "+ updated)
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
}
function PreviewCustom() //Shows a preview table of the uploaded CSV file from the custom file following its format.
{
	var prevCustomDeletingIndex = [0,1,8,9,10,11,12,13,14,15,16]//the rows that need to be deleted cuz they r useless
	
	removeEventListeners()
	disableOptions()
	localStorage.setItem("uploadFirst","false")
	localStorage.setItem("openUploadModal","true")
	var newString;
	var bookState;
	var hiddenTxt;
	var dayArray = [];
	var tbl ="";
	tbl +='<table class="table table-hover">'
	
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var timetable_data = textFromFileLoaded.split(/\r?\n|\r/);//splitting the data by commas
		//logging important variables provided by the user for the upload later
		prevCustomRoom = timetable_data[0].split(",")[5];
		prevCustomWeek = timetable_data[0].split(",")[1];
		prevCustomEmail = timetable_data[0].split(",")[3];
		tbl += "<p><strong>Room:</strong> "+prevCustomRoom+" || <strong>Week:</strong> "+ prevCustomWeek+ " || <strong>Email:</strong> " +prevCustomEmail;
		
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
		
		//excuting the deletion of useless rows of data. 
		for(var i = 0; i<prevCustomDeletingIndex.length;i++)
		{
			timetable_data.splice(prevCustomDeletingIndex[i]-i, 1);//will delete backwards to prevent deletion structure collasp when it starts to jenga itself to death cuz ure retard. 
		}
		
		console.log(timetable_data);
		
		for(var count = 1; count<timetable_data.length; count++)
		{
			dayArray = []
			var cell_data = timetable_data[count].split(",");
			tbl += '<tr>';
			for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
				if (count === 0) {
					//nothing
				} else {
					newString = cell_data[cell_count];
					bookState = cell_data[cell_count].split(' ')[0]
					if(bookState=="booked")
					{
						hiddenTxt = prevCustomEmail
						dayArray.push(bookState+" "+hiddenTxt)
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="unbooked")
					{
						dayArray.push(bookState)
						tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="lesson")
					{
						hiddenTxt = prevCustomEmail + " lock"+prevCustomWeek.toString();
						dayArray.push(bookState+" "+hiddenTxt)
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="locked")
					{
						hiddenTxt = "lock"+prevCustomWeek.toString();
						dayArray.push(bookState+" "+hiddenTxt)
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else
					{
						prevCustomPrimaryKey.push(previewCustomPrimaryKeyGenerator(cell_data[cell_count],prevCustomWeek))
						tbl +='<td >'+newString+'</td>';
					}
				}
			}
			prevCustomTimetableArray.push(dayArray);
			tbl += '</tr>';
		}
		
		tbl += '</table>';
		$('#PreviewTable').html("");
		$('#PreviewTable').html(tbl);
		console.log(prevCustomTimetableArray)
		console.log(prevCustomPrimaryKey)
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
function uploadSims()//uploadcode from generated from a SIM File
{	
	widthChange=100/(100*numOfRooms);
	$("#uploadButton").hide()
	$("#myProgressUpload").show();
	
	var i = 0;
	var a = 0;
	var b = 0;
	var firstIteration = true; //this variable sees whether it is the first time the loop has run, if it is then it will run it again but this time switching out the primary key to week 2's primary key. 
	var week2Weight = 0; //this variable will add a weight to week 2 days that allows the loop to access the 3D array's week 2 days when it goes to second w2 Primary Keys
	var RoomArray = nonManipulatedRoomOrder;
	var DayArray = PrimaryKeyW1;
	uploadSimsLoop1()
	function uploadSimsLoop1() 
	{
		uploadSimsLoop2()	
	}			
	function uploadSimsLoop2() // i is Room, a is Day, b is pEriod
	{
		var updating = false; 
		var updated = false; 
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":RoomArray[i],
				"searchAttr2":DayArray[a]
			}
			),
		contentType:"application/json",
		success: function(data)
			{
				console.log(data)
				console.log(nonManipulatedRoomData)
				
				$.each(data.Items, function(index, val) 
				{
					loop3()
					function loop3()
					{
						moveProgressBarMasterDelete()
						updated=false;
						updating=false;
						checkVar()	
						function checkVar()
						{
							if($("#uploadMethods").val()=="merge")//if we are merging the timetable it'll not overide rooms unless it's absolutely nessaraly
							{
								console.log(RoomArray[i]+" "+DayArray[a]+" "+PeriodArray[b]+": "+nonManipulatedRoomData[i][a+week2Weight][b])
								if(nonManipulatedRoomData[i][a+week2Weight][b]!="unbooked")//only activate if the the uploaded slot is not an empty space. 
								{
									if(nonManipulatedRoomData[i][a+week2Weight][b] != val[PeriodArray[b]])//only activate if the current slot is different from the uploaded slot
									{						
										if(updating==false)
										{
											console.log("Updating: " + DayArray[a] + " " + RoomArray[i] + " "+ PeriodArray[b] +" To: "+nonManipulatedRoomData[i][a+week2Weight][b])
											uploadData(DayArray[a],RoomArray[i],PeriodArray[b],nonManipulatedRoomData[i][a+week2Weight][b])

											updating=true
											checkVar();
										}
										else
										{
											if(updated!=true)
											{	
												window.setTimeout(checkVar,1000);
											}
											else
											{
												nextLoop3();
												return;
											}
										}
									}
									else
									{
										nextLoop3();
										return;
									}
									
								}
								else
								{
									nextLoop3();
									return;
								}
							}
							else if($("#uploadMethods").val()=="override")//if we are overridng the timetable it'll  overide all rooms, deleting all bookings except for lessons
							{
								console.log(RoomArray[i]+" "+DayArray[a]+" "+PeriodArray[b]+": "+nonManipulatedRoomData[i][a+week2Weight][b])
								if(nonManipulatedRoomData[i][a+week2Weight][b] != val[PeriodArray[b]])//only activate if the current slot is different from the uploaded slot
								{						
									if(updating==false)
									{
										console.log("Updating: " + DayArray[a] + " " + RoomArray[i] + " "+ PeriodArray[b] +" To: "+nonManipulatedRoomData[i][a+week2Weight][b])
										uploadData(DayArray[a],RoomArray[i],PeriodArray[b],nonManipulatedRoomData[i][a+week2Weight][b])

										updating=true
										checkVar();
									}
									else
									{
										if(updated!=true)
										{	
											window.setTimeout(checkVar,1000);
										}
										else
										{
											nextLoop3();
											return;
										}
									}
								}
								else
								{
									nextLoop3();
									return;
								}
							}
						}
					}
					
					function next()
					{
						a+=1;
						if (a < DayArray.length) 
						{ 
							uploadSimsLoop2()
						}
						else
						{
							a = 0
							i += 1;
							if(i < RoomArray.length)
							{
								uploadSimsLoop1()
							}
							else
							{
								i =0;
								a =0;
								b = 0;	
								if(firstIteration==true)
								{
									firstIteration=false;
									week2Weight=5;
									DayArray=PrimaryKeyW2;
									uploadSimsLoop1();//Restarting from the begining with Week 2 Primary Keys
									console.log("Excecuting Week 2 Primary Keys.")
								}
								else
								{
									console.log("Function Excecution Finish")
								}
							}

						}
					}
					
					function nextLoop3()
					{
						b+=1
						if(b<PeriodArray.length)
						{
							loop3();
						}
						else
						{
							b = 0;
							next();
						}
					}
					
					function uploadData(Day, Room, UpdateAttr, UpdateValue) // uploads data to AWS Dynamodb using AJAX jQuery request
					{
						console.log("Uploading......") 
						updated = false; // not yet updated
						$.ajax({ //Request to write to AWS
						type:'POST', //AWS write function "callname"
						url: API_URL_Tech1,
						data:JSON.stringify( //the update values in a JSON format 
							{
								"Room":Room,
								"Day":Day,
								"updateAttr":UpdateAttr,
								"updateValue":UpdateValue							
							}
							),
						contentType:"application/json",
						success: function(data)
							{
								console.log("Upload Sucessful")
								updated = true; //if upload sucessful move on to the next upload
							},
						error: function(data)
							{
								$("#errorModule").show(); //else show an error module
							}
						});
					}
				});
				
			},
			error: function(data)
			{
				$("#errorModule").show();
			}
		});
	}
}
function PreviewSims()
{	
	removeEventListeners()
	disableOptions()
	localStorage.setItem("uploadFirst","false")
	localStorage.setItem("openUploadModal","true")
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent)//formatting timetableData for Sims Upload
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
	  	timetable_data = textFromFileLoaded.split(/\r?\n|\r/);
		var index = timetable_data.indexOf("")
		if (index > -1) {
			timetable_data.splice(index, 1);
		}
		for(var count = 0; count<timetable_data.length; count++)
		{
			var cell_data = timetable_data[count].split(",");
			for (var cell_count = 0; cell_count < cell_data.length; cell_count++) 
			{	
				
				if(cell_data[cell_count].trim()=="Bus")
				{
					deletingIndex.push(count)
				}
				else if(cell_data[cell_count].trim()=="Reg")
				{
					deletingIndex.push(count)
					deletingIndex.push(count+1)
				}
				else if(cell_data[cell_count].trim()=="1"||cell_data[cell_count].trim()=="2"||cell_data[cell_count].trim()=="3"||cell_data[cell_count].trim()=="4"||cell_data[cell_count].trim()=="5"||cell_data[cell_count].trim()=="6")//will delete all empty lines containing random ass numbers 
				{
					deletingIndex.push(count+1)//telling them which lines to delete and storing the lines they needa delete in an array
				}
			}
		}
		for(var i = 0; i<deletingIndex.length;i++)
		{
			timetable_data.splice(deletingIndex[i]-i, 1);//will delete backwards to prevent deletion structure collasp when it starts to jenga itself to death cuz ure retard. 
		}
		for(var count=0; count<timetable_data.length;count++)
		{
			index = timetable_data.indexOf(",,,,,,,,,,");
			if (index > -1) {
				timetable_data.splice(index, 1);
			}
		}
		numOfRooms = timetable_data.length/11;
		console.log(timetable_data.length);
		$("#PreviewTable").html(generateTechPreviewTable(timetable_data,1));//Pasting Preview into html
		//consolidating all bookings in all rooms into 3D array
		fullRoomsData = [];
		uploadedRoomOrder = [];
		for(var room_count = 1; room_count < numOfRooms+1;room_count++)
		{
			generateTechPreviewTable(timetable_data,room_count)
		}
		nonManipulatedRoomOrder = uploadedRoomOrder;// contains all the different rooms uploaded
		nonManipulatedRoomData = fullRoomsData;
		populateSelect()
		
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
	
	
}
function populateSelect() //creates a new select element and then appends all the rooms into it
{
	$("#previewRoomDiv").html("")
	var newSelect=document.createElement('select');
	var opt;
	for(var i = 0; i < nonManipulatedRoomOrder.length; i++)
	{
	   opt = document.createElement("option");//creating option
	   opt.value = i+1;
	   opt.innerHTML = nonManipulatedRoomOrder[i]; // whatever property it has, this array stores all the rooms inside it
	   // then append it to the select element
	   newSelect.appendChild(opt);
	}
	newSelect.id="previewWhichRoom"
	newSelect.setAttribute("onchange", "generatePrevTable()");
	document.getElementById("previewRoomDiv").innerHTML="";
	document.getElementById("previewRoomDiv").appendChild(newSelect);
	console.log(newSelect);
}
function generatePrevTable()//will generate a new preview room depdning on the selection choice in the newly generated select option. 
{
	$("#PreviewTable").html(generateTechPreviewTable(timetable_data,parseInt($("#previewWhichRoom").val())))
}
function generateTechPreviewTable(data, roomInteration) // Will generate a table code from the given data and will selectively make a table code depeneing on what you input for the room interation
{
	dayCounter = 0;
	oneRoomData = [];//stores the data for one day, all periods then uploads them into the main linked list.
	tbl = "";
	for(var i = (roomInteration-1)*11; i < (roomInteration-1)*11+11; i++) //Detected what room it is building
	{//*11+11 because every room will have 11 lines dedicated to it, it'll need to iterate through all 11 lines
		if(data[i].indexOf("Technology 1")>-1) //detecting the CSV file's timetables and pusing them into the timetable array. 
		{
			uploadedRoomOrder.push("Tech1");
		}
		else if(data[i].indexOf("Technology 2")>-1)
		{
			uploadedRoomOrder.push("Tech2");
		}
		else if(data[i].indexOf("Technology 3")>-1)
		{
			uploadedRoomOrder.push("Tech3");
		}
		else if(data[i].indexOf("Technology 4")>-1)
		{
			uploadedRoomOrder.push("Tech4");
		}
		else if(data[i].indexOf("Technology 5")>-1)
		{
			uploadedRoomOrder.push("Tech5");
		}
	}
	//generating Week 1 Data
	tbl+="<em><p>Room: "+uploadedRoomOrder[uploadedRoomOrder.length-1]+" || Week 1</p></em>"
	tbl +='<table class="table table-hover">'
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
	for(var cell_count = 1; cell_count<6;cell_count++)
	{
		firstOccurenceRow = true; 
		tbl += '<tr>';
		for(i = (roomInteration-1)*11+3; i < (roomInteration-1)*11+11; i++)
		{	
			var cell_data = data[i].split(",");
			if(firstOccurenceRow==true)
			{
				tbl +='<td>'+PrimaryKeyW1[dayCounter].substr(1)+'</td>';
				firstOccurenceRow=false; 
				dayCounter+=1;
			}
			if(cell_data[cell_count]=="")
			{
				tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
				oneRowData.push("unbooked")
			}
			else
			{
				tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period1">lesson <span class="hidden">designcentre@dulwich-beijing.cn lock1</span></div></td>';
				oneRowData.push("lesson <span class='hidden'>designcentre@dulwich-beijing.cn lock1</span>")
			}

		}
		//add 2 Empty ECAs
		tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
		tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
		oneRowData.push("unbooked")
		oneRowData.push("unbooked")
		tbl += '</tr>';
		oneRoomData.push(oneRowData);
		oneRowData = [];
	}

	tbl+="</table>"
	//generating Week 2 Data
	dayCounter = 0;
	tbl+="<em><p>Room: "+uploadedRoomOrder[uploadedRoomOrder.length-1]+" || Week 2</p></em>"
	tbl +='<table class="table table-hover">'
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
	for(var cell_count = 6; cell_count<11;cell_count++)
	{
		firstOccurenceRow = true; 
		tbl += '<tr>';
		for(i = (roomInteration-1)*11+3; i < (roomInteration-1)*11+11; i++)
		{	
			var cell_data = data[i].split(",");
			if(firstOccurenceRow==true)
			{
				tbl +='<td>'+PrimaryKeyW2[dayCounter].substr(2)+'</td>';
				firstOccurenceRow=false; 
				dayCounter+=1;
			}
			if(cell_data[cell_count]=="")
			{
				tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
				oneRowData.push("unbooked")
			}
			else
			{
				tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period1">lesson <span class="hidden">designcentre@dulwich-beijing.cn lock1</span></div></td>';
				oneRowData.push("lesson <span class='hidden'>designcentre@dulwich-beijing.cn lock1</span>")
			}

		}//add 2 Empty ECAs
		tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
		tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">unbooked</div></td>';
		tbl += '</tr>';
		oneRowData.push("unbooked")
		oneRowData.push("unbooked")
		oneRoomData.push(oneRowData)
		oneRowData = [];
	}
	tbl+="</table>"
	fullRoomsData.push(oneRoomData);
	return tbl;
}
function checkAvailableUpload()//this method will check what option has been chosen for the upload code and then populate the modal accordingly by hiding and showing the different modals. 
{	
	$("#uploadButton").show()
	$("#SimUploadDocs").hide();
	if($("#uploadSource").val()!="invalid" && $("#uploadMethods").val()!="invalid")
	{
		$("#uploadBlock").hide();
		if($("#uploadSource").val()=="custom")//if user chose custom upload docs
		{
			$("#customUploadDocs").show();
			$("#previewWhichRoom").hide();
			$("#SimUploadDocs").hide();			
			$("#fileToLoad").attr("onChange","PreviewCustom()");
			$("#uploadButton").attr("onClick","uploadCustom()");
		}
		else // if user chose sims upload docs
		{
			$("#customUploadDocs").hide();
			$("#previewWhichRoom").show();
			$("#SimUploadDocs").show();
			$("#fileToLoad").attr("onChange","PreviewSims()");
			$("#uploadButton").attr("onClick","uploadSims()");
		}
	}
	else
	{
		$("#uploadBlock").show();
		$("#customUploadDocs").hide();
	}
}
function disableOptions()
{
	$("#uploadSource").attr("disabled","disabled")
	$("#uploadMethods").attr("disabled","disabled")
}
function enableOptions()//This will take away the diabled attrs from the uploadmethod and upload source methodology allowing the user to make decisions and uploads again. Useful when reopinging the mddal from a reload. 
{
	$("#uploadMethods").removeAttr("disabled")
	$("#uploadSource").removeAttr("disabled")
	$("#previewRoomDiv").html("")
}

function previewCustomPrimaryKeyGenerator(Day,Week)//used in the preview custom function to quickly generate the primary key by inputting the day and the week it is
{
	if(Week==1)
	{
		switch(Day)
		{
			case "Monday":
				return "1Monday"
				break;
			case "Tuesday":
				return "2Tuesday"
				break;
			case "Wednesday":
				return "3Wednesday"
				break;
			case "Thursday":
				return "4Thursday"
				break;
			case "Friday":
				return "5Friday"
				break;
		}
	}
	else
	{
		switch(Day)
		{
			case "Monday":
				return "11Monday"
				break;
			case "Tuesday":
				return "22Tuesday"
				break;
			case "Wednesday":
				return "33Wednesday"
				break;
			case "Thursday":
				return "44Thursday"
				break;
			case "Friday":
				return "55Friday"
				break;
		}
	}
}
