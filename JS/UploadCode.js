var PrimaryKey = [];
var SortKey = "";
var Periods = [];
var rawData = [];
var tempRawData = [];
var a = 0;
var b = 0;
function upload() //starts the upload code by populating the primary key and sort key arrays 
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
function Preview() //Shows a preview table of the uploaded CSV file
{
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