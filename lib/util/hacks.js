var log = require('logging').from(__filename);

var USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';

    function getViewstate(body) {
        // <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTU4ODA5Mjg0OWQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgIFCUF1dG9Mb2dpbgUHU3VibWl0MQ==" />
        // <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTE1MTcwMTkzOWQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgIFCUF1dG9Mb2dpbgUHU3VibWl0MQ==" />
        var viewstate = body.match(/__VIEWSTATE" value="([^"]*)"/);
        return viewstate && viewstate.length ? viewstate[1] : false;
    }
    function getEventValidation(body) {
        // __EVENTVALIDATION" value="/wEWAgKuvoTcBwL26uW2Ag==" />
        var eventvalidation = body.match(/__EVENTVALIDATION" value="([^"]*)"/);
        return eventvalidation && eventvalidation.length ? eventvalidation[1] : false;
    }

    function encodeCookies(session_cookies, cookies) {
        cookies = cookies || [];
        var cookieArray = cookies.concat(session_cookies).map(function(cookie){
                return cookie.split(';')[0];
        });

        return cookieArray.join(';')
    }

    function getTitle(data) {
        return data.length < 1000 ? 'no title' : data.match('<title[^>]*>([^<]*)<\/title>')[1];
    }

module.exports = {
    getViewstate: getViewstate,
    getEventValidation: getEventValidation,
    encodeCookies: encodeCookies,
    getTitle: getTitle
};