function myCustomErrorDisplayFunction(f, errorInfo)
{
    // disabled all errors by default
    for (var i=0; i<myRules.length; i++)
    {
        var parts = myRules[i].split(",");
        var fieldName = parts[1];
        document.getElementById(fieldName + "_label").className = document.getElementById(fieldName + "_label").className.replace( /(?:^|\s)error(?!\S)/g , ' ' ); 
        document.getElementById(fieldName + "_icon").className = document.getElementById(fieldName + "_icon").className.replace( /(?:^|\s)icon-remove-sign(?!\S)/g , ' ' );
        document.getElementById(fieldName + "_error").style.display = "none";
    }

    for (var i=0; i<errorInfo.length; i++)
    {
        var fieldName;

        // radio button
        if (errorInfo[i][0].type == undefined)
        	fieldName = errorInfo[i][0][0].name;
        else
        	fieldName = errorInfo[i][0].name;

        // display the error
        document.getElementById(fieldName + "_label").className += " error";
        document.getElementById(fieldName + "_icon").className += " icon-remove-sign";
        document.getElementById(fieldName + "_error").style.display = "";
        document.getElementById(fieldName + "_error").innerHTML = errorInfo[i][1];
    }

    // only return TRUE if there were no errors.
    return (errorInfo.length == 0) ? true : false;
}