<cfscript>
	/*
		If you leave these settings commented out, CFWheels will set the data source name to the same name as the folder the application resides in.
	*/

	set(dataSourceName="SQL");
	set(dataSourceUserName="");
	set(dataSourcePassword=""); 	
	/*<cfset set(dataSourceName="MySQL")>
	<cfset set(dataSourceUserName="")>
	<cfset set(dataSourcePassword="")>*/


	/*
		If you leave this setting commented out, CFWheels will try to determine the URL rewrite capabilities automatically.
		The "URLRewriting" setting can bet set to "on", "partial" or "off".
		To run with "partial" rewriting, the "cgi.path_info" variable needs to be supported by the web server.
		To run with rewriting set to "on", you need to apply the necessary rewrite rules on the web server first.
	*/

	// set(URLRewriting="partial");
</cfscript>