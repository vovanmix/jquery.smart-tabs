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
        var tabContent;
        var tabLinks;

        var currentTab;

        //Core functions:
        var initPlugin = function(){

        };

        var getHasTag = function(){

        };


        //Methods:
        this.AdjustHeight = function(){

        };

        this.openById = function(tabId){

        };

        this.openByNumber = function(tabNumber){

        };

        this.openNext = function(){

        };

        this.openPrevious = function(){

        };

        var addPluginMarkup = function(){

            tabElement.addClass("smart-tabs-container");
            var tabHeader = tabElement.find('>ul');
            var tabLinks = tabHeader.find('a');
            var tabContent = tabElement.find('>div');

        };

        return this.each(function() {
            if($(this).attr('smartTabs') == 'true'){
                return;
            }
            $(this).attr('smartTabs', 'true');

            tabElement = $(this);

            addPluginMarkup();

            initPlugin();

        });

    };
})(jQuery);