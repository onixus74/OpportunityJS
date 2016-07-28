var lastOpportunities = [];
var lastUpdateDates = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
			if(!response.data){
				alert("failed to get opportunities.");
				return;
			}
            var newOpportunities = [];

            var allOpportunities = [];
			var allUpdateDates = [];
            response.data.forEach(function(opportunity) {
                allOpportunities.push(opportunity.id);
                allUpdateDates.push(opportunity.updated_at);
                if (lastOpportunities.indexOf(opportunity.id) == -1 || lastUpdateDates[lastOpportunities.indexOf(opportunity.id)] != opportunity.updated_at) {
                    newOpportunities.push(opportunity.id);
                }
            });
            if (newOpportunities.length == 0) {
                alert("there are no new opportunities.");
            } else {
                console.log("var lastOpportunities = " + JSON.stringify(allOpportunities) + ";" + "\n" +
							"var lastUpdateDates = " + JSON.stringify(allUpdateDates) + ";");
                var msg = "total last opportunities : " + lastOpportunities.length + "\n" +
				"total current opportunities : " + allOpportunities.length + "\n\n" +
				"there is " + newOpportunities.length + " new/updated opportunities. open in new tabs?" +
                    "\n\npreview:\n\n";
                newOpportunities.forEach(function(id) {
                    response.data.forEach(function(opportunity) {
                        if (id == opportunity.id) {
                            msg += opportunity.title + " | " + opportunity.location + "\n";
                        }
                    });
                });
                if (confirm(msg)) {
                    newOpportunities.forEach(function(id) {
                        window.open("https://opportunities.aiesec.org/opportunity/" + id, '_blank');
                    });
                }
            }

        } else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        } else {
            alert(xmlhttp.status + ' was returned');
        }
    }
};

xmlhttp.onprogress = function(evt)
{
   if (evt.lengthComputable)
   {  //evt.loaded the bytes browser receive
      //evt.total the total bytes seted by the header
      //
     var percentComplete = (evt.loaded / evt.total)*100;
     console.log('Loading...' + percentComplete.toFixed(2) + '%');
   }
}

xmlhttp.open("GET", "INSERT QUERY HERE", true);
xmlhttp.send();
