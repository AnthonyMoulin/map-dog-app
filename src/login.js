
this.mapDog = this.mapDog || {};

/**
 * @type {Object}
 */
this.mapDog.login = (

    /**
     * @returns {Object}
     */
    function () {

        /**
         * @type {Array}
         */
        var dogs = [
            "sparky",
            "butter",
            "caramel",
            "kitty"
        ];

        /**
         * @param {Integer} direction 
         * @returns {Integer} 
         */
        function silde (direction) {
            var slider = mapDog.login.template.getSlider();
            var margin = parseInt(slider.style.marginLeft, 10) || 0;
            if (margin === (dogs.length -1) * 100 * direction ) {
                return slider.style.marginLeft = 0;
            }
            if (direction === 1 && margin === 0 ) {
                return slider.style.marginLeft = - (dogs.length - 1)
                                               * 100 * direction + "%";
            }
            return slider.style.marginLeft = margin + (100 * direction) + "%";
        }

        /**
         * @returns {Integer}
         */
        function getSelectedDog () {
            return (
                (parseInt(mapDog.login.template.getSlider().style.marginLeft)
              * -1)
              || 0
            ) / 100;
        }

        /**
         * Start loading
         */
        function startLoading () {
            var control = mapDog.login.template.getControls()[2];
            control.style.display = "none";
            control.parentNode.setAttribute(
                "class",
                control.parentNode.getAttribute("class")
               .replace(" load", "") + " load");
        }

        /**
         * Stop loading
         */
        function stopLoading () {
            var control = mapDog.login.template.getControls()[2];
            control.style.display = "block";
            control.parentNode.setAttribute(
                "class",
                control.parentNode.getAttribute("class")
               .replace(" load", ""));
        }

        return {

            /**
             * Template
             */
            template: undefined,

            /**
             * Display
             * @returns {undefined} 
             */
            display: function () {
                mapDog.getCanvas().innerHTML = this.template.login;
                this.template.getControls()[0].onclick = function () {
                    silde(1);
                };
                this.template.getControls()[1].onclick = function () {
                    silde(-1);
                };
                this.template.getControls()[2].onclick = function () {
                    if (!mapDog.login.template.getInput().value) {
                        return mapDog.login.die("Give a name!");
                    }
                    startLoading();
                    mapDog.dog.post(
                        mapDog.login.template.getInput().value,
                        dogs[getSelectedDog()],
                        function () {
                            mapDog.run.call(mapDog);
                        },
                        function (e) {
                            mapDog.login.die.call(mapDog.login, e.message);
                        }
                    );
                };
                this.template.getInput().onkeyup = function (e) {
                    if (13 === e.keyCode) {
                        mapDog.login.template.getControls()[2].onclick();
                    }
                };
            },

            /**
             * @param {String} message 
             */
            die: function (message) {
                stopLoading();
                var input = this.template.getInput();
                input.value = "";
                input.setAttribute("placeholder", message);
                input.setAttribute(
                    "class",
                     input.getAttribute("class")
                    .replace(" error", "") + " error");
                input.focus();
            },

            /**
             * @returns {Array}
             */
            getDogs: function () {
                return dogs;
            }

        };

    }

)();
