var PS = {
    popups: {
        single_showing: {
            title: "Schedule a showing",
            urlPath: "schedule",
            type: "single"
        },
        seller_setup: {
            title: "Seller Setup",
            urlPath: "showing/setup",
            type: "single"
        },
        multiple_showings: {
            title: "Schedule Showing(s)",
            urlPath: "bulkSchedule",
            type: "multiple"
        }

    }
}
PS.buttons = {
    single_showing: [PS.popups.single_showing],
    seller_setup: [PS.popups.seller_setup],
    //listing_details : [PS.popups.single_showing, PS.popups.seller_setup],
    listing_list: [PS.popups.multiple_showings],
    multiple_showings: [PS.popups.multiple_showings]
};

PS.configure = function (settings) {

       if (window.jQuery) {
            PS._configure(settings);
           
        } else {
           
            PS.configureChain.push(function () {
                PS._configure(settings)
            });
            
            if (!PS.jqloading) {
                PS.jqloading = true;
                importScript('https://cdn.jsdelivr.net/jquery/3.2.1/jquery.min.js', function () {
                    for (var f of PS.configureChain) {
                        f();
                    }
                });
            }
        }

};

PS.configureChain = []

PS._configure = function (settings) {
   
    if (!settings.containerId || settings.containerId != "") {
        if(PS.inited) PS.inited = false;
        //models
        if (!PS.model) PS.model = {};
        var ids = settings.containerId.split(',');
        // var _path = getPath(settings.client, "mls-app.js");
        var host = settings.host;
        // host = _path.slice(0, _path.indexOf("/", 8));
        // host = settings.host;

        

        for (var i = 0; i < ids.length; i++) {
           

            var id = ids[i].trim();
            PS.model[id] = {
                buttonType: settings.buttonType.split(',')[i].trim(),
                mls: settings.mls,
                listing: (settings.listing.trim().length > 0) ? settings.listing.split(',') : [],
                agent: settings.agent,
                //
                client: settings.client,
                // set host
                remoteHost: "http://stagingmls.primeshowing.com",
                remotePath: host + '/' + settings.client
            }
           
            $("#" + ids[i])
                .append('<div class="modal-demo" style="display: none;" link-title="' + PS.popups[PS.model[id].buttonType].title +
                    '" link-id="' + ids[i] + '_' + PS.model[id].buttonType + // ID for 
                    '" link-type="' + PS.model[id].buttonType + // popup type
                    '"></div>');

        }

        if (PS.inited) return;
        PS.loadCounter = 0;
        PS.inited = true;

        importScript('https://cdn.jsdelivr.net/jquery.migrate/1.4.1/jquery-migrate.min.js', jsCssCallback);
        // importCSS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', jsCssCallback);
        importCSS(PS.model[Object.keys(PS.model)[0]].remotePath + '/style.css', jsCssCallback);

    }
};



function jsCssCallback() {
    PS.loadCounter += 1;
    if (PS.loadCounter == 2) {
        initStyles();
        $(".modal-demo").show();
    }
}

function closeIFrame() {
    $('#PSiFrame').remove();
}


//***** main functions *****
function importScript(src, onloadF, onErrF) {
    var script = document.createElement("SCRIPT");
    script.src = src;
    script.type = 'text/javascript';
    script.onload = function () {
        if (onloadF) onloadF()
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}

function importCSS(src, onloadF) {
    var cssLink = document.createElement("LINK");
    cssLink.href = src;
    cssLink.rel = 'stylesheet'
    cssLink.type = 'text/css';
    cssLink.onload = function () {
        if (onloadF) onloadF()
    };
    document.getElementsByTagName("head")[0].appendChild(cssLink);
}

function getPath(client, name) {
    console.log($('#listing_details_container'))
    return $("script[src$='/" + client + "/" + name + "']").attr('src');
}

function initStyles() {
    $('.modal-demo').each(function (index, el) {
        let containerId = $(el).parent().attr('id');
        let linktitle = ($(el).attr('link-title') != undefined) ? $(el).attr('link-title') : "";
        let id = ($(el).attr('link-id') != undefined) ? $(el).attr('link-id') : Math.floor(Math.random() * (10000000 - 10)) + 10,

            type = ($(el).attr('link-type') != undefined) ? PS.popups[$(el).attr('link-type')].type : PS.popups.single_showing.type;

        $(el).append('<a href="javascript:void(0);" id="primeshowinglink' + id + '" class="mls-btn mls-' + type + '-btn" data-popup="' + id + '">' + linktitle + '</a>');
        $('.mls-btn').css('background-image', 'url("' + PS.model[containerId].remotePath + '/mls-btn-bg.jpg")');

        var $button = $(".modal-demo .mls-multiple-btn");
        if (PS.model[containerId].listing.length == 0) $button.addClass("disabled");


        $('#primeshowinglink' + id).click(function (event) {
            var id = $(this).attr('data-popup');
            var urlPath = ($(el).attr('link-type') != undefined) ? PS.popups[$(el).attr('link-type')].urlPath : PS.popups.single_showing.urlPath;

            if ($('body').find('#primeshowingmodal' + id).length > 0) {
                $('#primeshowingmodalshadow' + id).remove();
            }

            var Outhtml = '<div id="primeshowingmodalshadow' + id + '" class="psmodalshadow psmodalshadow' + id + '">' +
                '<div id="primeshowingmodalshadowcontainer' + id + '" class="psmodalshadowContainer psmodalshadowContainer' + id + '">' +
                '<span class="glyphicon glyphicon-cog glyphicon-spin" aria-hidden="true"></span>' +
                '<iframe src="' + PS.model[containerId].remoteHost + '/' + urlPath +
                '?clientAdditionalId=' + PS.model[containerId].client + '&mlsId=' + PS.model[containerId].mls + '&mlsListingId=' + PS.model[containerId].listing +
                '&mlsAgentId=' + PS.model[containerId].agent + '&nocache=' + (Math.floor(Math.random() * (10000000 - 10)) + 10) + '" ' +
                'frameborder="0" width="100%" height="100%" id="primeshowingmodal' + id + '" class="psmodalIframe psmodalIframe' + id + '"></iframe></div></div>';

            $('body').append(Outhtml);

            $('#primeshowingmodalshadow' + id).click(function () {
                $('#primeshowingmodalshadow' + id).hide();
            });
            $('#closewindow' + id).click(function () {
                $('#primeshowingmodalshadow' + id).hide();
            });

            //console.log('$iframe is ready');
            $('#primeshowingmodalshadow' + id).show();
        });
    });
}

function listener(event) {

    if (event.data == 'close') {
        //console.log('event close: ' + event.data);
        $(".psmodalshadow").hide();
    }
    if (event.data == 'loaded') {
        //console.log('event page loaded: ' + event.data);
        $(".psmodalshadow .glyphicon-spin").hide();
    }
}

if (window.addEventListener) {
    window.addEventListener("message", listener);
} else {
    // IE8
    window.attachEvent("onmessage", listener);
}

// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
