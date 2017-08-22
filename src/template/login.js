
this.mapDog = this.mapDog ||  {};

mapDog.login = mapDog.login ||  {};

/**
 * @type {Object}
 */
this.mapDog.login.template = (

    /**
     * @param {window} root
     * @returns {Object}
     */
    function (root) {
        
        return {

            /**
             * @type {String}
             */
            login: (function () {
                var template = '\
<div class="splash dog col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 z-depth-2">\
    <div class="slider container-fluid  z-depth-2">\
        <span class="col-xs-4 control">\
            <a class="glyphicon glyphicon-chevron-left z-depth-2-hover"></a>\
        </span>\
        <div class="col-xs-4 col-lg-2 col-lg-offset-1 z-depth-2-ring">\
            <div id="dogs">';
                for (var key in this.mapDog.login.getDogs()) {
                    template += '\<img src="./images/dog-'
                              + this.mapDog.login.getDogs()[key] + '.png">';
                }
                template += '\
            </div>\n\
        </div>\
        <span class="col-xs-4 col-lg-offset-1 control">\
            <a class="glyphicon glyphicon-chevron-right z-depth-2-hover"></a>\
        </span>\
    </div>\
    <input name="dog" placeholder="Name" class="col-xs-10 col-xs-offset-1">\
    <span class="col-xs-10 col-xs-offset-1 confirm">\
        <a class="z-depth-2-hover"></a>\
    </div>\
</div>';
                return template;
            })(),

            /**
             * @returns {HTMLElement}
             */
            getSlider: function () {
                return root.document.getElementById("dogs");
            },

            /**
             * @returns {HTMLElement}
             */
            getInput: function () {
                return mapDog.getCanvas().getElementsByTagName("input")[0];
            },

            /**
             * @returns {HTMLElementCollection}
             */
            getControls: function () {
                return mapDog.getCanvas().getElementsByTagName("a");
            }

        };

    }
)(this);
