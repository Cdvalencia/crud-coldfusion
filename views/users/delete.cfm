<cfset isAjax = (isDefined('cgi.http_x_requested_with') AND lcase(cgi.http_x_requested_with) EQ 'xmlhttprequest')>
<cfif isAjax>
  <cfcontent reset="true">{ "result":true, "id": <cfoutput>{id:#user.id#}</cfoutput> ,"message": "Success" }<cfabort>
</cfif>