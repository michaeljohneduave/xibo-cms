/**
* Xibo - Digital Signage - http://www.xibo.org.uk
* Copyright (C) 2009-2013 Daniel Garner
*
* This file is part of Xibo.
*
* Xibo is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* Xibo is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with Xibo.  If not, see <http://www.gnu.org/licenses/>.
*/
jQuery.fn.extend({
    xiboRender: function(options) {

        // Any options?
        if (options === undefined || options === null) {
            options = {
                direction: "none",
                width: 100,
                height: 100,
                originalWidth: 100,
                originalHeight: 100,
                scrollSpeed: 2,
                scaleText: false,
                fitText: false,
                scaleFactor: 1
            };
        }

        this.each(function() {
            // Scale text to fit the box
            if (options.scaleText) {
                // Apply the ZOOM attribute to the body
                $(this).css({
                    zoom: options.scaleFactor,
                    width: options.originalWidth,
                    height: options.originalHeight
                });
            }

            // Fit text?
            else if (options.fitText) {

                // Make sure our element has a width and height - and is display:block
                $(this).css({
                    width: options.width,
                    height: options.height,
                    display: "block"
                });

                // Remove the font-size property of all children
                $("*", this).css("font-size", "");

                // Run the Fit Text plugin
                $(this).fitText(1.75);
            }

            // Ticker?
            if (options.type == "ticker") {
                $(".article", this).css({
                    "padding-left": "4px",
                    display: "inline"
                });

                $(".XiboRssItem", this).css({
                    display: "block",
                    width: options.originalWidth
                });
            }

            // Animated somehow?
            if (options.direction == "single") {
                // Use the cycle plugin to switch between the items
                var totalDuration = options.duration * 1000;
                var itemCount = $('.XiboRssItem').size();
                var itemTime;

                if (options.durationIsPerItem)
                    itemTime = totalDuration / itemCount;
                else
                    itemTime = totalDuration;

                if (itemTime < 2000)
                    itemTime = 2000;

               // Cycle handles this for us
               $('#text').cycle({
                   fx: 'fade',
                   timeout:itemTime
               });
            }
            else if (options.direction == "left" || options.direction == "right") {
                $("p", this).css("display", "inline");
            }

            // Marquee?
            if (options.direction != "none" && options.direction != "single") {

                // Set some options on the node, before calling marquee (behaviour, direction, scrollAmount, width, height)
                $(this).attr({
                    width: options.originalWidth,
                    height: options.originalHeight                    
                });
                
                // Wrap in an extra DIV - this will be what is scrolled.
                $(this).wrap("<div class='scroll'>");
                
                // Set some options on the extra DIV and make it a marquee
                $(this).parent().attr({
                    scrollamount: options.scrollSpeed,
                    scaleFactor: options.scaleFactor,
                    behaviour: "scroll",
                    direction: options.direction,
                    height: options.height,
                    width: options.width
                }).marquee();
            }
        });
    },
    dataSetRender: function(options) {

        // Any options?
        if (options === undefined || options === null) {
            options = {
                duration : 5,
                transition: "fade"
            };
        }

        var numberItems = $(this).attr("totalPages");

        // Cycle handles this for us
       $(this).cycle({
           fx: options.transition,
           timeout: (options.duration * 1000) / numberItems,
           slides: '> table'
       });
    }
});