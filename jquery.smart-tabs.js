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
            //todo: handle hashes
            currentTab = tabContentTabs.first();
        };

        var getHasLocation = function(){

        };

        var showCurrentTab = function(){
            tabContentTabs.hide();
            setContainerSize();
            currentTab.show();
            tabLinks.removeClass('active');
            tabLinks.filter('[href="#'+currentTab.attr('id')+'"]').addClass('active');
        };

        var setContainerSize = function(){
            var height = currentTab.height();
            tabContent.css('height', height);
        };

        var openTab = function(tabInstance){
            if(tabInstance.length) {
                currentTab = tabInstance;
                window.location.hash = currentTab.attr('id');
                showCurrentTab();
            }
        };

        var openTabById = function(tabId){
            var tab = tabContentTabs.filter('#'+tabId);
            openTab(tab);
        };

        var openTabByNumber = function(tabNumber){
            var tab = tabContentTabs.filter(':eq( '+tabNumber+' )');
            openTab(tab);
        };

        var openTabNext = function(){
            var tab = tabContentTabs.filter('#'+currentTab.attr('id')).next();
            openTab(tab);
        };

        var openTabPrevious = function(){
            var tab = tabContentTabs.filter('#'+currentTab.attr('id')).prev();
            openTab(tab);
        };


        //Callbacks
        var openTabFromLink = function(){
            var tabId = $(this).attr('href').replace('#', '');
            openTabById(tabId);
            return false;
        };


        //Methods:
        this.AdjustHeight = function(){
            setContainerSize();
        };

        this.OpenById = function(tabId){
            openTabById(tabId);
        };

        this.OpenByIndex = function(tabNumber){
            openTabByNumber(tabNumber);
        };

        this.OpenNext = function(){
            openTabNext();
        };

        this.OpenPrevious = function(){
            openTabPrevious();
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

            initPlugin();

        });

    };
})(jQuery);