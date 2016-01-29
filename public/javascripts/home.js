// DOM Ready =============================================================
$(document).ready(function() {
	startRefresh();
});
//functions
function startRefresh() {
    setTimeout(startRefresh,1000);
    $.get('/', function(data) {
        $(document.body).html(data);  
    });
};
