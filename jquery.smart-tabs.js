/* ===========================================================
 * jquery.smart-tabs.js
 * Copyright 2015 Vladimir Mikhaylovskiy.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function($) {

    $.fn.smartTabs = function(options) {

        var settings = $.extend({
            //Events:
            onClickInsideTab: function(tabId){},
            onShowTab: function(tabId){}
        }, options);

        var tabElement;
        var tabHeader;
        var tabLinks;
        var tabContent;
        var tabContentTabs;

        var currentTab;

        //Core functions:
        var initPlugin = function(){
            getInitialTab();
            showCurrentTab();
        };

        var getInitialTab = function(){
            var hashLocation = getHashLocation();
            var tabInstance  = [];
            if(hashLocation){
                window.location.hash = '';
                setTimeout(
                    function(){
                        setHashLocation(hashLocation);
                    },
                    100
                );
                tabInstance = tabContentTabs.filter(hashLocation);
            }
            if(tabInstance.length) {
                currentTab = tabInstance;
                scrollToCurrentTab();
            }
            else{
                currentTab = tabContentTabs.first();
            }
        };

        var getHashLocation = function(){
            return window.location.hash;
        };

        var setHashLocation = function(hash){
            if(history.pushState) {
                history.pushState(null, null, hash);
            }
            //window.location.hash = currentTab.attr('id');
        };

        var showCurrentTab = function(){
            tabContentTabs.hide();
            setContainerSize();
            currentTab.show();

            var tabId = currentTab.attr('id');

            tabLinks.removeClass('active');
            tabLinks.filter('[href="#'+tabId+'"]').addClass('active');

            settings.onShowTab(tabId);
        };

        var setContainerSize = function(){
            var height = currentTab.height();
            tabContent.css('height', height);
        };

        var openTab = function(tabInstance, scroll){
            if(tabInstance.length) {
                currentTab = tabInstance;

                setHashLocation('#'+currentTab.attr('id'));

                showCurrentTab();

                if(scroll){
                    scrollToCurrentTab(scroll);
                }
            }
        };

        var openTabById = function(tabId, scroll){
            var tab = tabContentTabs.filter('#'+tabId);
            openTab(tab, scroll);
        };

        var openTabByNumber = function(tabNumber, scroll){
            var tab = tabContentTabs.filter(':eq( '+tabNumber+' )');
            openTab(tab, scroll);
        };

        var openTabNext = function(scroll){
            var tab = tabContentTabs.filter('#'+currentTab.attr('id')).next();
            openTab(tab, scroll);
        };

        var openTabPrevious = function(scroll){
            var tab = tabContentTabs.filter('#'+currentTab.attr('id')).prev();
            openTab(tab, scroll);
        };

        var scrollToCurrentTab = function(scroll){
            var margin = (scroll === true || typeof scroll == 'undefined') ? 20 :  scroll;

            $('html, body').animate({
                scrollTop: tabElement.offset().top - margin
            }, 2000);
        };


        //Callbacks
        var openTabFromLink = function(){
            var tabId = $(this).attr('href').replace('#', '');
            openTabById(tabId);
            return false;
        };

        var clickInsideTab = function(){
           settings.onClickInsideTab($(this).attr('id'));
        };


        //Methods:
        this.AdjustHeight = function(){
            setContainerSize();
        };

        this.OpenById = function(tabId, scroll){
            openTabById(tabId, scroll);
        };

        this.OpenByIndex = function(tabNumber, scroll){
            openTabByNumber(tabNumber, scroll);
        };

        this.OpenNext = function(scroll){
            openTabNext(scroll);
        };

        this.OpenPrevious = function(scroll){
            openTabPrevious(scroll);
        };

        this.ScrollTo = function(margin){
            scrollToCurrentTab(margin);
        };

        //

        var addPluginMarkup = function(){

            tabElement.addClass("smart-tabs-container");
            tabHeader = tabElement.find('>ul');
            tabLinks = tabHeader.find('a');
            tabContent = tabElement.find('>div');
            tabContentTabs = tabContent.find('>div');

        };

        return this.each(function() {
            if($(this).attr('smartTabs') == 'true'){
                return;
            }
            $(this).attr('smartTabs', 'true');

            tabElement = $(this);

            addPluginMarkup();

            tabLinks.bind('click.smartTabs', openTabFromLink);

            tabContentTabs.bind('click.smartTabs', clickInsideTab);

            initPlugin();

        });

    };
})(jQuery);