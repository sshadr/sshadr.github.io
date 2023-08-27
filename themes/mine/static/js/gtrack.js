window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

function trackOutboundLink(url, target) {
    gtag('event', 'click', {
        'event_category': 'outbound',
        'event_label': url,
        'transport_type': 'beacon',
        'event_callback': function () {
            if (target !== '_blank') {
                document.location = url;
            }
        }
    });
    console.debug("Outbound link clicked: " + url);
}

function onClickCallback(event) {
    if ((event.target.tagName !== 'A') || (event.target.host === window.location.host)) {
        return;
    }
    trackOutboundLink(event.target, event.target.getAttribute('target'));
}

gtag('js', new Date());
gtag('config', 'UA-151247604-1', {});


document.addEventListener('click', onClickCallback, false);