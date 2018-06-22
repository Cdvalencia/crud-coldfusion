$(document).ready(function(){
	var idDelete, nameDelete, itemDelete, userEdit, rowUpdate, amountUsers, navCurrent, currentOrder;

	navCurrent=1;
	amountUsers=Number($(".amountUsers").text());	

	$('#registrationDate').datepicker({
	    startView: 1,
	    format: "yyyy-mm-dd"
	});

	$('.registrationDateSearch').datepicker({
		format: "yyyy-mm-dd"
	});	

	$(".search").fadeOut(1);

	$("#addUser").click(function(){
		$(".modal > div").hide();		
		$(".modal .user").fadeIn();	
		$(".modal").fadeIn();		
		$(".user .form-user_title").text("New User");
		$(".text-danger").hide();
		$(".modal .user input").val("");				
	});

	// this function type support the "append" function
	$(document).on('click', '.deleteUser', function(e) {			
		idDelete=$(this).parent().parent().find(".idUser").text();
		nameDelete=$(this).parent().parent().find(".firtsName").text() +" "+$(this).parent().parent().find("td").eq(2).text();		
		itemDelete=$(this).parent().parent();
		msg("Deleting ...","sure, do you want delete to "+nameDelete+"?",true);		
	});

	$("#confirmDelete").click(function(){		
		$.ajax({			
			url: 'delete',			
			data:{
				id: idDelete
			},
			cache: false,
			dataType: "json", 
			// here be can make control using all callbacks
			complete: function(data) {								
				if(data.status==200){
					msg("Deleted",'The user "'+nameDelete+'" has been deleted', false);
					itemDelete.remove();
				}else{
					msg("Error","there have happened the next error: "+data.statusText, false);
				}
			}
		});		
	})

	function sortTable2(table, col, reverse) {
	    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
	        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
	        i;
	    reverse = -((+reverse) || -1);
	    tr = tr.sort(function (a, b) { // sort rows
	        return reverse // `-1 *` if want opposite order
	            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
	                .localeCompare(b.cells[col].textContent.trim())
	               );
	    });
	    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
	}

	function sortTable(col, reverse) {		
		var rows= $(".table tr").length;
		var colum=[];		
		for (var i = 1; i < rows; i++) {
			colum.push([$(".table tr").eq(i).find("td").eq(col).text(),i]);			
		}		
		var sortedTable;
		if(col==0 || col==4){
			var sortedTable=colum.sort(numeric);
		}
		if(col==1 || col==2 || col==3){
			var sortedTable=colum.sort(alphabetical);
		}
		if(col==5){
			var sortedTable=colum.sort(date);
		}	
		var newOrder=[];
		for (var i = 0; i < rows-1; i++) {
			var rec=[]
			for (var j = 0; j < 6; j++) {								
				rec.push($(".table tr").eq(sortedTable[i][1]).find("td").eq(j).text())
			}
			newOrder.push(rec)			
		}			
		if(!reverse){
			newOrder.reverse();
		}					
		for (var i = 1; i < rows; i++) {
			rec.push($(".table tr").eq(1).remove());
		}		
		pullUserList(newOrder,true);		
	}

	function date(a, b)
	{
	    var A = moment(a[0]);
	    var B = moment(b[0]); 
	    A = A;
	    B = B;	     
	    if (A < B) return -1;
	    if (A > B) return 1;
	    return 0;
	}

	function numeric(a, b){
      return a[0] - b[0];
    }
 
	function alphabetical(a, b)
	{
	    var A = a[0];
	    var B = b[0]; 
	    A = A;
	    B = B;	     
	    if (A < B) return -1;
	    if (A > B) return 1;
	    return 0;
	}
 
	$(document).on('click', '.table th', function(e) {
    	/*
    		<span>&#9650;</span>
            <span>&#9660;</span>
    	*/
    	var newSort=false;
    	var asc=true;
    	if($(this).index()!=currentOrder){
    		$('.table th span').remove();
    		newSort=true;
        	$(this).append("<span>&#9660;</span>");
        }else{		        	
        	if($(this).find("span").html()=="▼"){
        		$('.table th span').remove();
        		$(this).append("<span>&#9650;</span>");
        		asc=false;
        	}else{
        		$('.table th span').remove();
        		$(this).append("<span>&#9660;</span>");
        	}		        	
        }
        currentOrder= $(this).index();
		sortTable($(this).index(),asc)		
	})

	$(document).on('click', '.editUser', function(e) {	
		$(".modal > div").hide();		
		$(".modal .user").fadeIn();	
		$(".text-danger").hide();
		$(".user .form-user_title").text("Editing ...");			
		/*
		Automatic
		for (var i = 0; i < $(".modal .user input").length; i++) {
			$(".modal .user input").eq(i).val($(this).parent().parent().find("td").eq(i+1).text());	
		}
		*/		
		rowUpdate= $(this).parent().parent();
		userEdit=$(this).parent().parent().find("td").eq(0).text();
		$(".modal .user input").eq(0).val($(this).parent().parent().find("td").eq(1).text());	
		$(".modal .user input").eq(1).val($(this).parent().parent().find("td").eq(2).text());	
		$(".modal .user input").eq(2).val($(this).parent().parent().find("td").eq(3).text());	
		$(".modal .user input").eq(3).val($(this).parent().parent().find("td").eq(4).text());	
		$(".modal .user input").eq(4).val($(this).parent().parent().find("td").eq(5).text());	
		
		$(".modal").fadeIn();		

	});

	$("#confirmEdit").click(function(){
		$.ajax({			
			url: 'edit',			
			data:{
				id: idEdit
			},
			cache: false,
			dataType: "json", 
			// here be can make control using all callbacks
			complete: function(data) {				
				if(data.status==200){
					msg("Deleted",'The user "'+nameEdit+'" has been edited', false);					
				}else{
					msg("Error","there have happened the next error: "+data.statusText, false);
				}
			}
		});		
	})



	$("#registrationDate").focus(function(){
		$(".text-danger").hide();
	})
	$("#saveUser").click(function(e){						
		if(!moment($("#registrationDate").val(), "YYYY-MM-DD", true).isValid()){
			$(".text-danger").show();
		}else{			
			e.preventDefault(); 					
			if($(".modal .user .form-user_title").text()=="Editing ..."){			
				// Editing ...
				var userUpdate=objectifyForm($(".modal .user .form").serializeArray());						
				userUpdate.age=Number(userUpdate.age);
				userUpdate.id=Number(userEdit);			
				$.ajax({
					type: "POST",
					url: 'update',
					data: userUpdate,
					cache: false,
					dataType: "json", 
					complete: function(data) {									
						if(data.status==200){						
							rowUpdate.find("td").eq(1).html(userUpdate.firtsName);
							rowUpdate.find("td").eq(2).html(userUpdate.lastName);
							rowUpdate.find("td").eq(3).html(userUpdate.email);
							rowUpdate.find("td").eq(4).html(userUpdate.age);
							rowUpdate.find("td").eq(5).html(userUpdate.registrationDate);						
							msg("Updated",'The user "'+userUpdate.firtsName+' '+userUpdate.lastName+'" has been updated', false);												
						}else{
							msg("Error","there have happened the next error: "+data.statusText, false);
						}
					}			
				});	
			}else{			
				// Creating ...						
				var newUser=objectifyForm($(".modal .user .form").serializeArray());
				newUser.age=Number(newUser.age);								
				$.ajax({
					type: "POST",
					url: 'new',
					data: newUser,
					cache: false,
					dataType: "json", 
					complete: function(data) {						
						if($(".user_list").length==0){
							window.location.reload();
						}else{
							if(data.status==200){
								msg("Created",'The user "'+newUser.firtsName+' '+newUser.lastName+'" has been created', false);
								var idUser = data.responseJSON!=undefined?data.responseJSON.id:"/";
								$(".user_list > tbody").append('<TR class="success"><TD class="idUser">'+idUser+'</TD><TD class="firtsName">'+newUser.firtsName+'</TD><TD>'+newUser.lastName+'</TD><TD>'+newUser.email+'</TD><TD>'+newUser.age+'</TD><TD>'+newUser.registrationDate+'</TD><TD class="eventsUsers" width="165px"><div class="btn btn-success editUser">Edit</div> | <div class="btn btn-danger deleteUser">Delete</div></TD></TR>');
							}else{
								msg("Error","there have happened the next error: "+data.statusText, false);
							}						
						}		
					}			
				});	
			}
		}
	});

	function objectifyForm(formArray) {
		var returnArray = {};
		for (var i = 0; i < formArray.length; i++){
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
		//returnArray.id="5";		
		return returnArray;
	}

	// there have happened the next error:

	$(".modal-close").click(function(){
		$(".modal").fadeOut();		
	})

	function msg(title,msg, confirm){
		$(".modal .error-text").text(msg);
		$(".modal > .error .form-user_title").text(title);
		$(".modal > div").hide(1);
		$(".modal > .error").show(1);		
		confirm ? $(".modal > .error #confirmDelete").show(1):$(".modal > .error #confirmDelete").hide(1);		
		$(".modal").fadeIn();			
	}




	// Pagination	
	$(document).on('click', '.pagination li', function(e) {
		// Previous	pagination			
		var data;
		if($(this).index()==0 && navCurrent>1){			
			$(".user_list tbody").html('');
			$(this).parent().find("li a").removeClass("current")
			navCurrent--;
			$(this).parent().find("li").eq(navCurrent).find("a").addClass("current");				
			$.ajax({
				type: "POST",
				url: 'page',
				data: {
					amountUsers: navCurrent==1?Number(amountUsers)+1:amountUsers,
					number: navCurrent-1
				},
				cache: false,
				dataType: "json", 
				complete: function(data) {					
					if(data.status==200){							
						$(".main-list h2").html("Users "+amountUsers*(navCurrent-1)+" - "+((amountUsers*(navCurrent-1))+data.responseJSON.users.DATA.length));	
						pullUserList(data.responseJSON.users.DATA);			
					}else{	
						msg("Error","there have happened the next error: "+data.statusText+", please try again", false);					
					}
				}			
			});	
		}

		// Next	pagination					
		if($(this).index()+1==$(this).parent().find("li").length && navCurrent<$(this).parent().find("li").length-2){				
			$(".user_list tbody").html('');
			$(this).parent().find("li a").removeClass("current")
			navCurrent++;
			$(this).parent().find("li").eq(navCurrent).find("a").addClass("current")										
			$.ajax({
				type: "POST",
				url: 'page',
				data: {
					amountUsers: amountUsers,
					number: navCurrent-1
				},
				cache: false,
				dataType: "json", 
				complete: function(data) {					
					if(data.status==200){								
						$(".main-list h2").html("Users "+amountUsers*(navCurrent-1)+" - "+((amountUsers*(navCurrent-1))+data.responseJSON.users.DATA.length));	
						pullUserList(data.responseJSON.users.DATA);			
					}else{			
						msg("Error","there have happened the next error: "+data.statusText+", please try again", false);								
					}
				}			
			});	
		}

		// items pagination
		if($(this).index()>0 && $(this).index()+1<$(this).parent().find("li").length){				
			if(navCurrent!=$(this).index()){				
				$(".user_list tbody").html('');
				$(this).parent().find("li a").removeClass("current")
				$(this).find("a").addClass("current");
				navCurrent= $(this).index();					
				$.ajax({
					type: "POST",
					url: 'page',
					data: {
						amountUsers: navCurrent==1?Number(amountUsers)+1:amountUsers,
						number: $(this).index()-1
					},
					cache: false,
					dataType: "json", 
					complete: function(data) {					
						if(data.status==200){								
							$(".main-list h2").html("Users "+amountUsers*(navCurrent-1)+" - "+((amountUsers*(navCurrent-1))+data.responseJSON.users.DATA.length));	
							pullUserList(data.responseJSON.users.DATA);			
						}else{						
							msg("Error","there have happened the next error: "+data.statusText+", please try again", false);					
						}
					}			
				});	
			}
		}
	});



	// Advance Search
	$("#advanceSerach").click(function(){		
		$(".search").fadeIn(1);
		$(".close-search").fadeIn(1);	
		$(this).fadeOut(1);	
	});

	$(".close-search").click(function(){		
		$(".search").fadeOut(1);
		$("#advanceSerach").fadeIn(1);	
		$(this).fadeOut(1);	
	});

	$("#clear").click(function(){
		$(".search input").val("");
	})

	$("#search").click(function(){
		var searchUsers=objectifyForm($(".search form").serializeArray());
		searchUsers.age=Number(searchUsers.age);						
		$.ajax({
			type: "POST",
			url: 'search',
			data: searchUsers,
			cache: false,
			dataType: "json", 
			complete: function(data) {				
				if($(".user_list").length==0){
					window.location.reload();
				}else{
					if(data.status==200){		
						if(data.responseJSON.users.DATA.length > 0){
							$(".user_list tbody").html('');
							$("#allUser").fadeIn(1);
							$(".pagination").fadeOut(1);
							$(".amountList").fadeOut(1);
							$(".main-list h2").html("Filtered users "+data.responseJSON.users.DATA.length);	
							pullUserList(data.responseJSON.users.DATA);	
						}else{
							msg("No found","there is no users with this information, try again using another data", false);	
						}												
					}else{
						msg("Error","there have happened the next error: "+data.statusText, false);
					}						
				}		
			}			
		});
	})

	$("#allUser").click(function(){
		$(".user_list tbody").html('');		
		var prevNavCurrent=	navCurrent;						
		$.ajax({
			type: "POST",
			url: 'all',
			data: {
				amountUsers: navCurrent==1?Number(amountUsers)+1:amountUsers,
				number: 0
			},
			cache: false,
			dataType: "json", 
			complete: function(data) {				
				if(data.status==200){							
					navCurrent= 1
					$(".main-list h2").html("Users 0 - " + amountUsers);	
					$("#allUser").fadeOut(1);					
					if(data.responseJSON.amountUsers.DATA[0]>Number(amountUsers)){
						$(".pagination").fadeIn(1);
						$(".amountList").fadeIn(1);												
						$(".pagination li").eq(prevNavCurrent).find("a").removeClass("current")												
						$(".pagination li").eq(1).find("a").addClass("current");
					}
					pullUserList(data.responseJSON.users.DATA);			
				}else{						
					msg("Error","there have happened the next error: "+data.statusText+", please try again", false);					
				}
			}			
		});	
	})

	$("#setAmountList").click(function(){
		amountUsers=$("#amountList").val();
		$(".user_list tbody").html('');
		$(this).parent().find("li a").removeClass("current")
		$(this).find("a").addClass("current");
		navCurrent= $(this).index();					
		$.ajax({
			type: "POST",
			url: 'all',
			data: {
				amountUsers: Number(amountUsers)+1,
				number: 0
			},
			cache: false,
			dataType: "json", 
			complete: function(data) {											
				if(data.status==200){							
					navCurrent= 1
					$(".main-list h2").html("Users 0 - " + amountUsers);	
					$("#allUser").fadeOut(1);					
					if(data.responseJSON.amountUsers.DATA[0]>Number(amountUsers)){
						$(".pagination .page").remove();
						for (var i = 1; i < Math.round((data.responseJSON.amountUsers.DATA[0]/amountUsers)+0.4); i++) {							
							$(".pagination li").last().before('<li class="page-item page"><a class="page-link page'+(i+1)+'" href="#"><cfoutput>'+(i+1)+'</cfoutput></a></li>');
						}									
						$(".pagination li").eq(1).find("a").addClass("current");
						$(".pagination").fadeIn(1);
						$(".amountList").fadeIn(1);
					}else{
						$(".main-list h2").html("Users 0 - " + data.responseJSON.amountUsers.DATA[0]);	
						$(".pagination").fadeOut(1);
					}
					$("#amountList").val("");
					pullUserList(data.responseJSON.users.DATA);			
				}else{						
					msg("Error","there have happened the next error: "+data.statusText+", please try again", false);					
				}
			}			
		});	

	})

	/*
	Next and previous pagination, using function owner
	$(".Navnext").click(function(e){				
	});

	$(".navPrevious").click(function(e){
	});*/

	function pullUserList(data,head){	
		if(!head){			
			$(".user_list tbody").append('<TR>                <TH>Id</TH>                <TH>Firts Name</TH>                <TH>Last Name</TH>                <TH>Email</TH>                <TH>Age</TH>                <TH>Registration Date</TH>            </TR>');
		}
		for (var i = 0; i < data.length; i++) {							
			data[i][5]=moment(data[i][5]).format("YYYY-MM-DD");
			$(".user_list tbody").append('<TR><TD class="idUser">'+data[i][0]+'</TD><TD class="firtsName">'+data[i][1]+'</TD><TD>'+data[i][2]+'</TD><TD>'+data[i][3]+'</TD><TD>'+data[i][4]+'</TD><TD>'+data[i][5]+'</TD><TD class="eventsUsers" width="165px"><div class="btn btn-success editUser">Edit</div> | <div class="btn btn-danger deleteUser">Delete</div></TD></TR>');
		}
	}
})

