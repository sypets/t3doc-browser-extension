======================
t3doc-chrome-extension
======================

Chrome Extension for TYPO3 documentation browsing

Installation
============

#. Download::

      git clone https://github.com/sypets/t3doc-chrome-extension.git


#. In browser address bar, go to `chrome://extensions/ <chrome://extensions/>`__

#. Click "Load unpacked" and choose the folder t3doc-chrome-extension.


Supported Browsers
==================

This plugin might work on other browsers but has only been tested with
Google Chrome.

Goal of Project
===============

This is an experimental browser plugin for **testing some theme changes** for
TYPO3 documentation on https://docs.typo3.org

The changes tested with this plugin should eventually be applied to the
official t3ShpinxThemeRtd: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd

Features
========

**version selector:**

Because the current version selector is somewhat hidden, we display
the first few versions as links in the top right. This has the advantage,
that it is immediately visible, if the page is available in other versions.
Less clicking is necessary. With the current version selector, you always
need 2 clicks.

We only display the latest versions, because with increasing number of versions
there are layout problems on mobile. Since TYPO3 7.6 is in ELTS and 6.2 and later
are not even supported anymore, this should be enough.

Versions that have a corresponding exact page are displayed in bold
with default background color, versions that do not are displayed
in non-bold with a darker background color (see also tooltip for explanation)

**readabiliy:**

* because text is not well readable on wide screens, we set a maximum
  width
* because pages are not well readable with images (with text):

  * always set a drop-shadow for images
  * make the drop-shadow more visible
  * add extra padding around images

**usability:**

* previous / next button on top is barely visible: make it more visible

Related Issues
==============

Related issues already exist in the t3SphinxThemeRtd repo:

* drop shadow for images: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/114
* space around images: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/104
* one click version selection: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/93
* unhide version selector: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/82
* max width of text: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/83
* dimmed next / prev buttons: https://github.com/TYPO3-Documentation/t3SphinxThemeRtd/issues/89


Sample Pages
============

These are some sample pages, where you can see it in action (once you
installed the browser extension):

* version selector: https://docs.typo3.org/typo3cms/CoreApiReference/
* set maximum width: https://docs.typo3.org/typo3cms/CoreApiReference/Introduction/Index.html
* images: https://docs.typo3.org/typo3cms/GettingStartedTutorial/8.7/GeneralPrinciples/BackendAndFrontend/Index.html


Known Problems
==============

maximum width

* On some pages with tables, the tables might be cut off
* On pages with code snippets, if they are too wide, the code snippet gets a
  horizontal scrollbar. However, if the snippets is a little less than the
  recommended maximum line length of 130, it should be fine.

CGL:
   "Very long lines of code should be avoided for questions of readability.
   A line length of about 130 characters (including spaces) is fine. Longer
   lines should be split into several lines whenever possible."

https://docs.typo3.org/typo3cms/CoreApiReference/CodingGuidelines/CglPhp/PhpFileFormatting/GeneralRequirementsForPhpFiles.html#line-length

We did experiment a bit with the maximum width - the current solution is
a tradeoff, but definitely makes the text more readable on a lot of pages.

For more known problems, see list of issues: https://github.com/sypets/t3doc-chrome-extension/issues/

Testing
=======

For testing the version selector, you should check out some edge cases, e.g.

* start pages of manuals
* pages, which do not have a corresponding page in other versions, e.g.
  `TYPO3 Explained: Security Guidelines (latest) <https://docs.typo3.org/typo3cms/CoreApiReference/Security/Index.html>`__
* pages, with lots of versions, e.g.
  `TYPO3 Explained <https://docs.typo3.org/typo3cms/CoreApiReference/>`__
* pages with other versions and other language, e.g.
  https://docs.typo3.org/typo3cms/extensions/sphinx/
* test on various devices (or rather simulate with browser)

For testing the maximum width, try out pages with tables and code snippets:

tables:

* https://docs.typo3.org/typo3cms/GuidesAndTutorials/Index.html

code snippets:

* https://docs.typo3.org/typo3cms/ExtbaseFluidBook/3-BlogExample/4-and-action.html
* https://docs.typo3.org/typo3cms/ExtbaseFluidBook/3-BlogExample/7-Paths-on-the-Data-Map.html

Feedback
========

If you find a problem, please open an issue:

https://github.com/sypets/t3doc-chrome-extension/issues/new

Use the dedicated feedback issue for general feedback: https://github.com/sypets/t3doc-chrome-extension/issues/1

Additionally, contribution is appreciated and pull requests are welcome!
