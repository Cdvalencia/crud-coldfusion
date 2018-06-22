
<div class="row">  
  <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 main-list">
    <cfset conection= false>
    <cfset amounInit= 8>
    <div class="amountUsers hide"><cfoutput>#amounInit#</cfoutput></div>
    <CFTRY>
        <CFQUERY DATASOURCE="SQL" NAME="user_amount">
            SELECT COUNT(*) AS numItems
            FROM users
        </CFQUERY>

        <CFQUERY DATASOURCE="SQL" NAME="user_list">
            select * from (
                Select *, ROW_NUMBER() OVER (ORDER BY firtsName desc) as [RowNo]
                from users
            ) t
            where RowNo between 1 AND <cfoutput>#amounInit#</cfoutput>
        </CFQUERY>
        <cfset conection= true>
        <cfcatch>
            <cfset conection= false>            
        </cfcatch>
    </CFTRY>
    <CFIF conection IS true>            
        <CFIF user_list.RecordCount IS "0">    
           <p class="alert alert-warning">There are no users in the database. Click <STRONG>Add User</STRONG> to add a record to the
              database.</p>            
            <div class="col-xs-12 input-group">
                <div type="button"  class="btn btn-success pull-right" id="addUser" role="button">Add User</div>                                 
            </div>   
        <CFELSE>  
            <div class="col-xs-12 col-lg-12">
                <div class="col-xs-12 col-sm-9 search">
                    <form class="form col-xs-10">            
                        <div class="col-xs-12 input-group">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Firts Name</span>
                                <input type="text" class="form-control" name="firtsName" placeholder="Firts Name" aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Last Name</span>
                                <input type="text" class="form-control" name="lastName" placeholder="Last Name" aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Email</span>
                                <input type="text" class="form-control" name="email" placeholder="Email" aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Age</span>
                                <input type="number" class="form-control" name="age" onkeydown="javascript: return event.keyCode == 69 ? false : true" placeholder="Age" aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Registration Date</span>
                                <input type="text" name="registrationDate1" class="input-sm form-control registrationDateSearch" name="start" />
                                <span class="input-group-addon">to</span>
                                <input type="text" name="registrationDate2" class="input-sm form-control registrationDateSearch" name="end" />                            
                            </div> 
                            <div class="input-group col-xs-12">                    
                                <button type="button" id="clear" class="btn btn-danger pull-right">Clear</button>
                                <button type="button" id="search" class="btn btn-success pull-right">Search</button>                                  
                            </div>    
                        </div>          
                    </form>          
                    <div class="col-xs-2 close-search">
                        <button type="button" class="btn btn-danger pull-right">X</button>                                 
                    </div>      
                </div>      
                <div class="col-xs-12 input-group">
                    <div type="button"  class="btn btn-success pull-right" id="addUser" role="button">Add User</div>                 
                    <div type="button"  class="btn btn-warning pull-right" id="advanceSerach" role="button">Advance Search</div>                 
                </div>      
            </div> 
            <div class="col-xs-12">
                <div class="col-xs-6">
                    <h2>Users 0 - 
                        <CFIF user_amount.numItems gt #amounInit#>
                            <cfoutput>#amounInit#</cfoutput>
                        <cfelse> 
                            <cfoutput>#user_amount.numItems#</cfoutput>
                        </cfif>
                    </h2>
                </div>
                <div class="col-xs-6">
                    <div type="button"  class="btn btn-primary pull-right" id="allUser" role="button">All users</div>
                </div>
            </div>
            <TABLE class="table user_list" cellpadding=3 cellspacing=0 border=0>
                <!-- also be can using <thead> -->
                <TR>
                    <TH>Id</TH>
                    <TH>Firts Name</TH>
                    <TH>Last Name</TH>
                    <TH>Email</TH>
                    <TH>Age</TH>
                    <TH>Registration Date</TH>
                </TR>

                <CFOUTPUT query="user_list">
                    <TR>
                        <TD class="idUser">#id#</TD>
                        <TD class="firtsName">#firtsName#</TD>
                        <TD>#lastName#</TD>
                        <TD>#email#</TD>
                        <TD>#age#</TD>
                        <TD>#RegistrationDate#</TD>
                        <TD class="eventsUsers" width="165px">
                            <div class="btn btn-success editUser">Edit</div> |                        
                            <div class="btn btn-danger deleteUser">Delete</div>
                        </TD>
                    </TR>
                </CFOUTPUT>
            </TABLE>       
            <CFIF user_amount.numItems gt #amounInit#> 
                <cfset pagination= Round((user_amount.numItems/amounInit)+0.4)>            
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link current page1" href="#"><cfoutput>1</cfoutput></a></li>               
                    <cfloop index = "LoopCount"
                    from = "2"
                    to = #pagination#
                    step = "1">                  
                    <li class="page-item page"><a class="page-link" href="#"><cfoutput>#LoopCount#</cfoutput></a></li>               
                    </cfloop>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                  </ul>                          
                </nav>
                <div class="col-xs-12 amountList">
                    <div class="col-xs-6">
                        <div class="col-xs-9 pull-left">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Amount</span>
                                <input type="text" class="form-control" id="amountList" placeholder="#" type="number" onkeydown="javascript: return event.keyCode == 69 ? false : true" aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <div class="col-xs-3 pull-left">
                            <div type="button"  class="btn btn-primary pull-right" id="setAmountList" role="button">set</div>
                        </div>
                    </div>
                </div>                
            </CFIF>    
        </CFIF>
    <CFELSE> 
        <p class="alert alert-danger">there no is connection with <STRONG>database</STRONG></p>  
    </CFIF>        
  </div>  
</div>

<div class="modal">
    <div class="col-sm-12 user">
        <form class="form col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 list-group-item">            
            <div class="list-group-item">
                <h3 class="form-user_title"></h3>
            </div>
            <div class="list-group-item">                
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">Firts Name</span>
                    <input type="text" class="form-control" name="firtsName" placeholder="Firts Name" aria-describedby="basic-addon1">
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">Last Name</span>
                    <input type="text" class="form-control" name="lastName" placeholder="Last Name" aria-describedby="basic-addon1">
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">Email</span>
                    <input type="text" class="form-control" name="email" placeholder="Email" aria-describedby="basic-addon1">
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">Age</span>
                    <input type="number" class="form-control" name="age" onkeydown="javascript: return event.keyCode == 69 ? false : true" placeholder="Age" aria-describedby="basic-addon1">
                </div>
                <div class="input-group date">
                    <span class="input-group-addon" id="basic-addon1">Registration Date</span>
                    <input type="text" class="form-control" name="registrationDate" id="registrationDate"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                    <strong class="text-danger ">the date format is invalid</strong>
                </div>                
            </div>
            <div class="list-group-item">
                <div class="input-group col-xs-12">
                    <button type="button" class="btn btn-danger pull-right modal-close">Cancel</button>
                    <button type="button" id="saveUser" class="btn btn-success pull-right">Save User</button>              
                </div>
            </div>
        </form>
    </div>
    <div class="col-sm-12 error"> 
        <div class="form col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 list-group-item">         
            <div class="list-group-item">
                <h3 class="form-user_title">Error</h3>
            </div>
            <div class="list-group-item">                  
                <p class="error-text"></p>
            </div>            
            <div class="list-group-item">
                <div class="input-group col-xs-12">
                    <button type="button" class="btn btn-danger pull-right modal-close">Close</button>    
                    <button type="button" id="confirmDelete" class="btn btn-success pull-right">Delete</button>                                      
                </div>
            </div>
        </div>    
    </div>
</div>

