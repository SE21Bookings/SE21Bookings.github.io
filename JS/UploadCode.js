function upload()
{
	$.ajax({
		url:"file:///Users/shenyi/Desktop/SE21Tech1.csv",
		dataType:"text",
		success:function(data)
		{
			var timetable_data = data.split(/\r?\n|\r/);
			for(var count = 0; count<timetable_data.length; count++)
			{
				var cell_data = timetable_data[count].split(",");
				for(var cell_count=0; cell_count<cell_data.length; cell_count++)
				{
					console.log(cell_data[cell_count]);
				}
			}
		}
	});
}