<cfcomponent extends="Controller">
	<cffunction name="all" >
		<cfquery datasource="SQL" name="amountUsers">
			SELECT COUNT(*) AS numItems
            FROM users
	    </cfquery>  
		<cfquery datasource="SQL" name="user_list">
	       select * from (
	            Select *, ROW_NUMBER() OVER (ORDER BY id asc) as [RowNo]
	            from users
	        ) t
	        where RowNo between <cfoutput>#params.number*params.amountUsers#</cfoutput> AND <cfoutput>#((params.number+1)*params.amountUsers)-1#</cfoutput>
	    </cfquery>  
	    <cfset amountUsers = serializeJSON(amountUsers)>  
	    <cfset users = serializeJSON(user_list)>  
	</cffunction>

	<cffunction name="new" access="remote">  
		<cfset user = model("user").new(params)>	
		<cfscript>        	
        	if(user.save()){
        		WriteOutput(user.id);
        	}else{
        		WriteOutput(2);
        	}
        </cfscript>
    </cffunction>

    <cffunction name="update" access="remote">  
		<cfset id = #params.id#>
		<cfquery name="put" datasource="SQL">
		   SET NOCOUNT ON
		      IF NOT EXISTS 
		            (SELECT * FROM Users
		             WHERE   id = '#params.id#')
		         BEGIN
		            INSERT INTO Users
		               (firtsName, lastName, email, age, registrationDate)
		            VALUES
		               ('#params.firtsName#', 
		               	'#params.lastName#', 
		               	'#params.email#', 
		                '#params.age#',
		                '#params.registrationDate#'
		                )
		            SELECT SCOPE_IDENTITY() AS newId
		         END
		      ELSE
		         BEGIN
		            UPDATE   Users
		            SET      firtsName = '#params.firtsName#',
		                  lastName = '#params.lastName#',
		                  email = '#params.email#',
		                  age = '#params.age#',
		                  registrationDate = '#params.registrationDate#'
		            WHERE   id = '#params.id#'
		         END   
		   SET NOCOUNT OFF
	   </cfquery>
	   <!--- set a variable to the id returned --->
    </cffunction>	

    <cffunction name="delete" access="remote" returnformat="json">        	
		<cfset user = model("user").findByKey(params.id)>	
		<cfset (user.delete())>
	</cffunction>	

    <cffunction name="page">    
    	<cfquery datasource="SQL" name="user_list">
	       select * from (
	            Select *, ROW_NUMBER() OVER (ORDER BY id asc) as [RowNo]
	            from users
	        ) t
	        where RowNo between <cfoutput>#params.number*params.amountUsers#</cfoutput> AND <cfoutput>#((params.number+1)*params.amountUsers)-1#</cfoutput>
	    </cfquery>  
	    <cfset users = serializeJSON(user_list)>     
    </cffunction>  

    <cffunction name="search"> 
    	<cfset sqlquery = "select * from users WHERE">
    	<cfset queryinit = true>
    	<cfif params.firtsName neq ''>
    		<cfset queryinit = false>
    		<cfset sqlquery = sqlquery & " firtsName LIKE '%#params.firtsName#%'">
    	</cfif>
    	<cfif params.lastName neq ''>
    		<cfif queryinit eq true>
    			<cfset queryinit= false>
    		<cfelse>
    			<cfset sqlquery = sqlquery & " AND">
    		</cfif>    		
    		<cfset sqlquery = sqlquery & " lastName LIKE '%#params.lastName#%'">
    	</cfif>
    	<cfif params.email neq ''>
    		<cfif queryinit eq true>
    			<cfset queryinit= false>
    		<cfelse>
    			<cfset sqlquery = sqlquery & " AND">
    		</cfif>
    		<cfset sqlquery = sqlquery & " email LIKE '%#params.email#%'">
    	</cfif>
    	<cfif params.age neq '' and params.age neq 0>
    		<cfif queryinit eq true>
    			<cfset queryinit= false>
    		<cfelse>
    			<cfset sqlquery = sqlquery & " AND">
    		</cfif>
    		<cfset sqlquery = sqlquery & " age = #params.age#">
    	</cfif>
    	<cfif params.registrationDate1 neq ''>
    		<cfif queryinit eq true>
    			<cfset queryinit= false>
    		<cfelse>
    			<cfset sqlquery = sqlquery & " AND">
    		</cfif>
    		<cfset sqlquery = sqlquery & " registrationDate >= '#params.registrationDate1#'">	    
	    </cfif>
	    <cfif params.registrationDate2 neq ''>
    		<cfif queryinit eq true>
    			<cfset queryinit= false>
    		<cfelse>
    			<cfset sqlquery = sqlquery & " AND">
    		</cfif>
    		<cfset sqlquery = sqlquery & " registrationDate <= '#params.registrationDate2#'">	    
	    </cfif>
    	<cfquery datasource="SQL" name="user_list">
    		#preserveSingleQuotes(sqlquery)#    		
    	</cfquery>  
    	<cfset users = serializeJSON(user_list)>    
    </cffunction>  

    
</cfcomponent>