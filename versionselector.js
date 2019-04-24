/**
 * Open max. 4 buttons for selecting versions in top right
 *
 * The functionality here should be integrated into theme.js in
 * https://github.com/TYPO3-Documentation/t3SphinxThemeRtd
 */


var dynamicVersionSelectorOverlay = document.createElement('div');
dynamicVersionSelectorOverlay.setAttribute('id', 'dynamicVersionSelectorOverlay');

var parent = getAppendableParent();
parent.appendChild(dynamicVersionSelectorOverlay);

getVersionList(dynamicVersionSelectorOverlay);



var moreVersionsLink = document.getElementById('top-version-more-link');
moreVersionsLink.addEventListener('click', openMoreVersions);

/**
 * simulate a click on element with class="rst-current-version"
 * to open more versions
 */
function openMoreVersions()
{
    window.scrollTo(0, document.body.scrollHeight);

    //var clickableVersionElement = document.querySelector('.rst-current-version');
    var clickableVersionElement = document.getElementById('relatedLinksText');
    if (clickableVersionElement != null) {
        clickableVersionElement.click();
    }
}


/**
 * Get an element in dom tree, we can append the version selector to
 *
 * @returns {*}
 */
function getAppendableParent()
{
    var element = document.getElementById('EditMeOnGitHub');
    element = getParentElement(element, 3);
    if (element != null) {
        return element;
    }

    var elements = document.getElementsByClassName("wy-breadcrumbs");
    if (elements.length > 0) {
        return getParentElement(elements[0], 1);

    }
}

/**
 * Get parent element of current element (recursive)
 * @param element
 * @param count
 * @returns {*}
 */
function getParentElement(element, count)
{
    for (var i=0;i<count;i++) {
        if (element == null) {
            return element;
        }
        element = element.parentElement;
    }
    return element;
}

/**
 * Get version list and append it to element
 * @param element
 */
function getVersionList(element)
{
    var currentUrl = document.URL;
    var versionUrl = 'https://docs.typo3.org/services/ajaxversions.php?url='
        + encodeURI(currentUrl);

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var result = parseVersionResults(xmlhttp.responseText, currentUrl);
            element.innerHTML = result;
        }
    }
    xmlhttp.open("GET", versionUrl, false );
    xmlhttp.send();
}

/**
 * parse version results
 *
 * - remove links to one file version
 * - show current version as normal text without link
 * - make sure link to other version points to same page,
 *   if not, do not display link.
 *   Example: security page: https://docs.typo3.org/typo3cms/CoreApiReference/Security/Index.html
 *     other versions point to start page, to not use these:
 *     https://docs.typo3.org/typo3cms/CoreApiReference/8.7/
 *
 * @param str
 * @param originalUrl
 * @returns {string}
 */
function parseVersionResults(str, originalUrl)
{
    /* do not match for 1 file versions: "In one file" */
    var regex = /<a href="(.*)">((?!In one file).*)<\/a>/g;
    match = regex.exec(str);
    var result = '';
    // assume latest by default
    var currentVersion = 'latest';

    var anchortexts = [];
    var links = [];
    var urls = [];

    while (match != null) {
        var anchortext = match[2];
        var url = match[1];
        var link = match[0];

        if (originalUrl.includes(anchortext)) {
            currentVersion = anchortext;
        }
        anchortexts.push(anchortext);
        links.push(link);
        urls.push(url);
        match = regex.exec(str);
    }

    len = anchortexts.length;

    // create clickable buttons for each version
    for (var i=0;i < len;i++) {

        var url = urls[i];
        var version = anchortexts[i];
        var link = links[i];
        var isSame = false;

        // check if other version points to same page
        // if not, will be styled differently
        if (isUrlForSamePage(url, originalUrl)) {
            isSame = true;
        }


        if (currentVersion == anchortexts[i]) {
            result += '<span title="current version" class="top-version top-version-current">' + version + '</span>';
        } else {
            // do not show more than 4 versions
            if (i < 4) {
                if (isSame) {
                    result += '<span title="Show current page in version '
                        + version
                        + '" class="top-version top-version-same-page">';
                } else {
                    result += '<span title="Current page not available in other version, show best match in version'
                        + version
                        + '" class="top-version top-version-not-same-page">';
                }
                result += link;
                result += '</span>';
            }
        }

    }

    if (len >= 4) {
        result += '<span><a href="#" id="top-version-more-link" title="Show more versions. You can also scroll down and click on <<Related Links>> in bottom left to see all available versions."> ...</a></span>';
    }


    return result;
}

/**
 * Checks if both URLs are for the same page
 *
 * @param url
 * @param originalUrl
 */
function isUrlForSamePage(url, originalUrl)
{
    var normalizedUrl = normalizeUrl(url);
    var normalizedOriginalUrl = normalizeUrl(originalUrl);

    console.log('isUrlForSamePage:   normalizedUrl=' + normalizedUrl + ' --- normalized origin=' + normalizedOriginalUrl);

    return (normalizedUrl.localeCompare(normalizedOriginalUrl) == 0);
}

function normalizeUrl(url)
{
    return removeTrailingSlashFromUrl(removeIndexFromUrl(removeVersionFromUrl(url)));
}

function removeTrailingSlashFromUrl(url)
{
    return url.replace(/\/$/, '');
}

function removeIndexFromUrl(url)
{
    return url.replace(/\/Index\.html/, '');
}

function removeVersionFromUrl(url)
{
   return url.replace(/\/(latest|[0-9]+(\.[0-9])*)\//, '/');
}