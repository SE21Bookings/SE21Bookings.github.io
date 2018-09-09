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
var fullRoomsData = [];
var nonManipulatedRoomData = [];
var oneRoomData = [];
var oneRowData = [];
var firstOccurenceRow=false;
var dayCounter = 0;

function uploadCustom() //starts the upload code by populating the primary key and sort key arrays 
{	
	widthChange=2;
	$("#myProgressUpload").show();
	
	var updated = false;
	var updating = false;	
	
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var timetable_data = textFromFileLoaded.split(/\r?\n|\r/);
		for(var count = 0; count<timetable_data.length; count++)
		{
			var cell_data = timetable_data[count].split(",");
			for(var cell_count=0; cell_count<cell_data.length; cell_count++)
			{
				if(count==0)
				{
					if(cell_count > 1)
					{
						Periods.push(cell_data[cell_count].trim());
					}
				}
				else
				{
					if(cell_count==0)
					{
						PrimaryKey.push(cell_data[cell_count].trim());
					}
					else if(cell_count == 1)
					{
						SortKey = cell_data[cell_count].trim();
					}
					else
					{
						tempRawData.push(cell_data[cell_count].trim());
					}
					
				}
			}
			if(count!=0)
			{
				rawData.push(tempRawData)
				tempRawData = [];
			}
		}
		console.log(PrimaryKey)
		console.log(SortKey)
		console.log(Periods)
		console.log(rawData)
		uploadLoop()
	};
	fileReader.readAsText(fileToLoad, "UTF-8");	
	$("#myProgressUpload").show();
	function uploadLoop()
	{
		$.ajax({
		type:'PATCH',
		url: API_URL_Tech1,
		data:JSON.stringify(
			{
				"Key":"Room",
				"Key2":"Day",
				"searchAttr":SortKey,
				"searchAttr2":PrimaryKey[a]
			}
			),
		contentType:"application/json",
		success: function(data)
		{
			console.log(PrimaryKey[a])
			console.log(data)
			$.each(data.Items, function(index, val) 
			{
				loop3()
				function loop3()
				{
					updated = false;
					updating = false;
					moveProgressBarMasterDelete()
					console.log(val[Periods[b]] + " " +rawData[a][b])
					checkVar()
					function checkVar()
					{
						if((val[Periods[b]] != rawData[a][b]) && val[Periods[b]] != undefined)
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
									updateValue(PrimaryKey[a],Periods[b],rawData[a][b],SortKey)
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

				}

				function next()
				{
					a+=1;
					if (a < PrimaryKey.length) 
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
function PreviewCustom() //Shows a preview table of the uploaded CSV file
{
	removeEventListeners()
	disableOptions()
	localStorage.setItem("uploadFirst","false")
	localStorage.setItem("openUploadModal","true")
	var newString;
	var bookState;
	var hiddenTxt;
	var tbl ="";
	tbl +='<table class="table table-hover">'
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	//--->create table header > start
	tbl +='<thead>';
		tbl +='<tr>';
		tbl +='<th>Day</th>';
		tbl +='<th>Room</th>';
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
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
	  var textFromFileLoaded = fileLoadedEvent.target.result;
	  var timetable_data = textFromFileLoaded.split(/\r?\n|\r/);
		for(var count = 0; count<timetable_data.length; count++)
		{
			var cell_data = timetable_data[count].split(",");
			tbl += '<tr>';
			for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
				if (count === 0) {
					//tbl += '<th>' + cell_data[cell_count] + '</th>';
				} else {
					newString = cell_data[cell_count];
					bookState = cell_data[cell_count].split(' ')[0]
					if(bookState=="booked")
					{
						hiddenTxt = cell_data[cell_count].substr(cell_data[cell_count].indexOf(' ')+1)	
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="booked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="unbooked")
					{
						tbl +='<td ><div class="unbooked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="lesson")
					{
						hiddenTxt = cell_data[cell_count].substr(cell_data[cell_count].indexOf(' ')+1)	
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="lesson row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else if(bookState=="locked")
					{
						hiddenTxt = cell_data[cell_count].substr(cell_data[cell_count].indexOf(' ')+1)	
						newString = cell_data[cell_count].replace(hiddenTxt, '<span 	class="hidden">'+hiddenTxt+'</span>');
						tbl +='<td ><div class="locked row_data pointerCursor disable" edit_type="click" col_name="Period1">'+newString+'</div></td>';
					}
					else
					{
						tbl +='<td >'+newString+'</td>';
					}
				}
			}
			tbl += '</tr>';
		}
		tbl += '</table>';
		$('#PreviewTable').html("");
		$('#PreviewTable').html(tbl);
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}
function uploadSims()
{	

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
				else if(cell_data[cell_count].trim()=="1"||cell_data[cell_count].trim()=="2"||cell_data[cell_count].trim()=="3"||cell_data[cell_count].trim()=="4"||cell_data[cell_count].trim()=="5"||cell_data[cell_count].trim()=="6")
				{
					deletingIndex.push(count+1)
				}
			}
		}
		for(var i = 0; i<deletingIndex.length;i++)
		{
			timetable_data.splice(deletingIndex[i]-i, 1);
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
		nonManipulatedRoomOrder = uploadedRoomOrder;
		nonManipulatedRoomData = fullRoomsData;
		populateSelect()
		
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
	
	
}
function populateSelect()
{
	$("#previewRoomDiv").html("")
	var newSelect=document.createElement('select');
	var opt;
	for(var i = 0; i < nonManipulatedRoomOrder.length; i++)
	{
	   opt = document.createElement("option");
	   opt.value = i+1;
	   opt.innerHTML = nonManipulatedRoomOrder[i]; // whatever property it has
	   // then append it to the select element
	   newSelect.appendChild(opt);
	}
	newSelect.id="previewWhichRoom"
	newSelect.setAttribute("onchange", "generatePrevTable()");
	document.getElementById("previewRoomDiv").innerHTML="";
	document.getElementById("previewRoomDiv").appendChild(newSelect);
	console.log(newSelect);
}
function generatePrevTable()
{
	$("#PreviewTable").html(generateTechPreviewTable(timetable_data,parseInt($("#previewWhichRoom").val())))
}
function generateTechPreviewTable(data, roomInteration)
{
	dayCounter = 0;
	oneRoomData = [];
	tbl = "";
	for(var i = (roomInteration-1)*11; i < (roomInteration-1)*11+11; i++) //Detected what room it is building
	{
		if(data[i].indexOf("Technology 1")>-1)
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

		}//add 2 Empty ECAs
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
function checkAvailableUpload()
{	

	if($("#uploadSource").val()!="invalid" && $("#uploadMethods").val()!="invalid")
	{
		$("#uploadBlock").hide();
		if($("#uploadSource").val()=="custom")
		{
			$("#customUploadDocs").show();
			$("#previewWhichRoom").hide();
		}
		else
		{
			$("#customUploadDocs").hide();
			$("#previewWhichRoom").show();
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
function enableOptions()
{
	$("#uploadMethods").removeAttr("disabled")
	$("#uploadSource").removeAttr("disabled")
	$("#previewRoomDiv").html("")
}

