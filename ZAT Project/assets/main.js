$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '120px' });
 
  var tv_model,requestData;
 
  client.get('ticket.customField:custom_field_114099896612').then(
	function(data) {
		tv_model = data['ticket.customField:custom_field_114099896612'];
		console.log(tv_model);//B01GA3Z1M2
        showInfo(tv_model,client);
	}
  );
});

function showInfo(tv_model,client) {
	var tv_price;
	console.log('show info called '+tv_model)
		//http://docs.aws.amazon.com/AWSECommerceService/latest/DG/EX_RetrievingPriceInformation.html
	requestData  = "AWSAccessKeyId=AKIAI6O2LIZY5Y7PAXOAIdType&IdType=ASIN&Operation=ItemLookup&Service=AWSECommerceService&Timestamp=2017-10-31T18%3A45%3A00Z&Signature=c05c64251e034da80e41c945f3c3c40716dc96440cd40cfb78848bfccc44f795&ItemId="+tv_model;	
		console.log("requestData= " + requestData);
	var settings = {		
		url: 'http://webservices.amazon.co.uk/onca/xml',		
		type:'GET',
		dataType: 'json',
		data:requestData,
		cache:false,
	};	 
	client.request(settings).then(
    function(data) {
      console.log("data= " + data);
	  tv_price = data.FormattedPrice;
    },
    function(response) {
      console.log("response= " + response);
    }
  );
  
  var requester_data = {
    'tv_model' : tv_model,
	'tv_price ': tv_price	    
  };
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}