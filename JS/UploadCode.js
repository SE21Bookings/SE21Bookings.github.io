function upload()
{
	loadFileAsText()
	function loadFileAsText()
	{
      var fileToLoad = document.getElementById("fileToLoad").files[0];

	  var fileReader = new FileReader();
	  fileReader.onload = function(fileLoadedEvent){
		  var textFromFileLoaded = fileLoadedEvent.target.result;
		  var timetable_data = textFromFileLoaded.split(/\r?\n|\r/);
			for(var count = 0; count<timetable_data.length; count++)
			{
				var cell_data = timetable_data[count].split(",");
				for(var cell_count=0; cell_count<cell_data.length; cell_count++)
				{
					if(count != 0)
					{
						console.log(cell_data[cell_count]);
					}
					
				}
			}
	  };

	  fileReader.readAsText(fileToLoad, "UTF-8");
	}
	
	
}