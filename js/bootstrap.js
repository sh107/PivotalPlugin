var projectId;
var tokenId = "468b288fdef109275f3501d4d9a95aed";

jQuery( document ).ajaxStart(function() {
    jQuery( "#loading" ).show();
});

jQuery( document ).ajaxStop(function() {
    jQuery( "#loading" ).hide();
});

// fetch user stories via tracker API
function executeTrackerApiFetch(statusNumber) {

    // compose request URL
    var url = 'https://www.pivotaltracker.com/services/v5';
    url += '/projects/' + "1138318";
    url += '/stories?with_state=';
    url += getStatus(statusNumber);

    console.log(url);

    // do API request to get story names
    jQuery.ajax({
        url: url,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-TrackerToken', tokenId);
        }
    }).done(function (result) {
            displayTrackerApiResponse(result, statusNumber);
        }
    );

}

function fetchTrackerIteration() {
    // get parameters
    // projectId = jQuery('#project_id').val();
    var label = jQuery('#label_id').val();

    //get sprint id from radio button selection
    var sprint = jQuery('input[name=panel_choice]:checked', '#user_selection').val();

    // get project id from radio button selection
    var projectId = jQuery('input[name=project_choice]:checked', '#user_selection').val();


    // compose request URL
    var url = 'https://www.pivotaltracker.com/services/v5';
    url += '/projects/' + projectId;

    if (sprint==='') {
        url += '/iterations'
    } else {
        url += '/iterations?scope='+sprint;
    };


    console.log(url);


    //do API request to iteration stories
    jQuery.ajax({
        url: url,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-TrackerToken', tokenId);
        }
    }).done(getStoriesFromIteration);

}

function getStoriesFromIteration(iteration) {
    stories = iteration[0].stories;
    clean_stories =[];

    // check if features wanted from featrue checkbox
    var want_features = jQuery('input[name=feature]:checked', '#user_selection').val()

    // remove stories that are not features
    if (want_features==="feature") {

        for (var i = 0; i < stories.length; i++) {

            if (stories[i].story_type==="feature") {
                clean_stories.push(stories[i])};
        };

        displayTrackerApiResponse(clean_stories);

    } else {

        displayTrackerApiResponse(stories);
    }

}


function displayTrackerApiResponse(stories, statusNumber) {
    //console.log(statusNumber);

    //var search_results = "Here go your " + stories.length + " stories, dawg!";
    //jQuery('#result_title').html(search_results);

    var content = '';
    jQuery('#result_area_' + statusNumber).empty();

    jQuery('#result_area_' + statusNumber).append('<ul>');

    for (var i = 0; i < stories.length; i++) {
        //console.log(stories[i]);
        var name = stories[i].name;
        // console.log(name);

        var description = stories[i].description;
        if (description == undefined || description == null) {
            description = "";//htmlForTextWithEmbeddedNewlines(description);
        };

        var estimate = stories[i].estimate;
        if (estimate===undefined) {estimate='0'};
        // console.log(estimate);

        var story_type = stories[i].story_type;

        var url = stories[i].url;

        // console.log(description);

        content = '<li class="' + story_type + '" title="' + story_type + '">';
//            content += '['+ getEstimate(estimate) + '] ';
//         content += '<a href="'+ urlrl + '" title="' +  description + '">' + name + '</a>';
        content += '<a title="' +  description + '">' + name + '</a>';

        content += '<br><b><i style="color: #C1BDDB">tag: </i><b>';

        for(var j = 0; j < stories[i].labels.length ; j++){
            content += '  <b>' + stories[i].labels[j].name + '</b>';
        }

        content += '</li>';

        jQuery('#result_area_' + statusNumber).append(content);

    }

    jQuery('#result_area_' + statusNumber).append('</ul>');

}

function getEstimate(estimate) {
    switch(estimate){
        case 3:
            return "Critical";
        case 2:
            return "High";
        case 1:
            return "Normal";
        case 0:
            return "Low";
        default:
            return "Low";
    }
}

function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    // The temporary <div/> is to perform HTML entity encoding reliably.
    //
    // document.createElement() is *much* faster than jQuery('<div/>')
    // http://stackoverflow.com/questions/268490/
    //
    // You don't need jQuery but then you need to struggle with browser
    // differences in innerText/textContent yourself
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}

function printLikeABoss () {
    jQuery('#user_selection').hide();
    window.print();
}

function getStatus(statusNumber){
    switch(statusNumber){
        case 1:
            return "started";
        case 2:
            return "finished";
        case 3:
            return "delivered";
        case 4:
            return "accepted";
        case 5:
            return "planned";
        case 6:
            return "unstarted";
        case 7:
            return "unscheduled";
        case 8:
            return "rejected";
        default:
            return "accepted";
    }
}

jQuery(function() {

    // hide messages on loading page
    jQuery('.loading').hide();
    executeTrackerApiFetch(1);

    jQuery("#sky-tab1").on("click", function() {
        executeTrackerApiFetch(1);
    });

    jQuery("#sky-tab2").on("click", function() {
        executeTrackerApiFetch(2);
    });
    jQuery("#sky-tab3").on("click", function() {
        executeTrackerApiFetch(3);
    });

    jQuery("#sky-tab4").on("click", function() {
        executeTrackerApiFetch(4);
    });

    jQuery("#sky-tab5").on("click", function() {
        executeTrackerApiFetch(5);
    });

    jQuery("#sky-tab6").on("click", function() {
        executeTrackerApiFetch(6);
    });

    jQuery("#sky-tab7").on("click", function() {
        executeTrackerApiFetch(7);
    });

    jQuery("#sky-tab8").on("click", function() {
        executeTrackerApiFetch(8);
    });

});