"use strict";
$(document).ready(function(){
    
    getAppts();
   

    var newbtn = $('a.icon-blue');
    var addfrom = $('#new-appt');
    var cancelbtn = $('.cancel');
    var date, time, desc;
    
    
    $(newbtn).click(function(e){
        $(addfrom).show();
    });
    
    $(cancelbtn).on('click', function() {
        $(addfrom).hide();
    });
    
    
    function getAppts(e){
     $.ajax({
       type: "GET" ,
       url:"/cgi-bin/perlDBI.pl",
       contentType: "application.json; charset=utf-8",
       dataType: "json",
       data: "date=" + date + "&time=" + time + "&desc=" + desc,
          // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
          $('div#search-message').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#search-message').addClass("error");
        }, //error
         // script call was successful 
        // data contains the JSON values returned by the Perl script 
        success: function(data){
          if (data.error) { // script returned error
            $('div#search-message').text("data.error: " + data.error);
            $('div#search-message').addClass("error");
          } // if
          else { // Appointments Found
    
        $('div#search-message').text("data.success: " + data.success 
          + ", data.date: " + data.desc);
        $('div#search-message').addClass("success");
              addAppts(data);
      } //else
     } // success
    }); // ajax
  
  }//end of getApps()
         
    //add appointments to table
    
    function addAppts(data){
        var jsondata = $.parseJSON(data);
        
        
        $.each(jsondata.data, function(i, d){
            var row='<tr>';
            $.each(d, function(j, e){
             row+='<td>'+e+'</td>';
           });  
            row+='</tr>';
            $('#apptTable tbody').append(row);
            
        });
    
    
    }// end of addAppts()
   
   
});


