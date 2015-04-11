/* ===========================================================
 * jquery.smart-tabs.js
 * v 1.0.0 April 11 2015
 * ===========================================================
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

        }, options);

        var formElementContainer;
        var formElement;

        var addPluginMarkup = function(){
            formElement.wrap('<div class="smart-tabs-container"></div>');
            formElementContainer = formElement.parent();

        };

        return this.each(function() {
            if($(this).attr('smartTabs') == 'true'){
                return;
            }
            $(this).attr('smartTabs', 'true');

            formElement = $(this);

            addPluginMarkup();

        });

    };
})(jQuery);