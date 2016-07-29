var lastOpportunities = [768902,768878,768729,768716,768713,768612,768317,767962,767959,767893,767770,767761,767608,767446,767445,767419,767359,767330,767307,766576,766151,765445,765279,764816,763829,763826,763825,763206,757688,756134,754110,752252,750961,748983,746162,732082,723576,722253,720268,697881,304980];
var lastUpdateDates = ["2016-07-27T00:00:10Z","2016-07-26T20:33:05Z","2016-07-25T19:09:25Z","2016-07-29T09:59:41Z","2016-07-29T09:59:09Z","2016-07-27T18:26:53Z","2016-07-21T12:12:41Z","2016-07-19T13:12:21Z","2016-07-20T07:34:42Z","2016-07-18T20:42:35Z","2016-07-26T16:00:36Z","2016-07-19T06:37:29Z","2016-07-27T20:50:50Z","2016-07-14T15:53:03Z","2016-07-14T13:31:08Z","2016-07-13T18:36:09Z","2016-07-26T22:25:23Z","2016-07-14T13:29:25Z","2016-07-25T21:08:42Z","2016-07-26T20:23:38Z","2016-07-07T21:44:48Z","2016-07-19T10:38:45Z","2016-07-28T07:41:44Z","2016-07-08T16:25:59Z","2016-07-25T08:49:24Z","2016-07-25T08:40:53Z","2016-07-24T19:02:14Z","2016-06-23T14:40:21Z","2016-06-03T10:48:06Z","2016-05-24T17:10:13Z","2016-05-19T15:30:07Z","2016-07-25T08:49:42Z","2016-05-07T15:52:16Z","2016-07-04T19:08:42Z","2016-07-07T09:20:43Z","2016-07-25T03:14:10Z","2016-07-18T06:22:42Z","2016-06-15T01:27:26Z","2016-06-21T09:34:37Z","2016-07-13T11:11:55Z","2015-04-02T20:36:25Z"];
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

xmlhttp.open("GET", "https://gis-api.aiesec.org/v2/opportunities?access_token=752bf66c9706935ea1083a3ab232b7239c6a28de6ac0ab8ad2c364160c028401&per_page=120&page=1&filters[earliest_start_date]=%222016-5-25%22&filters[languages][][id]=18&filters[languages][][id]=22&filters[languages][][id]=6&filters[home_mcs][]=1558&filters[home_mcs][]=1573&filters[home_mcs][]=1621&filters[home_mcs][]=1577&filters[home_mcs][]=1591&filters[home_mcs][]=1596&filters[home_mcs][]=1601&filters[home_mcs][]=1616&filters[home_mcs][]=1554&filters[home_mcs][]=1597&filters[home_mcs][]=1620&filters[home_mcs][]=1563&filters[skills][][id]=60&filters[skills][][id]=61&filters[skills][][id]=62&filters[skills][][id]=64&filters[skills][][id]=65&filters[skills][][id]=66&filters[skills][][id]=69&filters[skills][][id]=70&filters[skills][][id]=68&filters[skills][][id]=71&filters[skills][][id]=72&filters[skills][][id]=75&filters[skills][][id]=76&filters[skills][][id]=78&filters[skills][][id]=79&filters[skills][][id]=87&filters[skills][][id]=88&filters[skills][][id]=94&filters[skills][][id]=112&filters[skills][][id]=113&filters[skills][][id]=132&filters[skills][][id]=143&filters[skills][][id]=144&filters[skills][][id]=145&filters[skills][][id]=146&filters[skills][][id]=151&filters[skills][][id]=159&filters[skills][][id]=204&filters[skills][][id]=213&filters[skills][][id]=216&filters[skills][][id]=218&filters[backgrounds][][id]=238&filters[backgrounds][][id]=239&filters[backgrounds][][id]=268&filters[regions][]=1629&filters[regions][]=1631&filters[regions][]=1630&filters[programmes][]=2", true);
xmlhttp.send();
