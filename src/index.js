
/**
 * @type {Object}
 */
this.mapDog = (

    /**
     * @param {window} root
     * @returns {Object}
     */
    function (root) {

        /**
         * Context onload
         */
        function onload () {
            this.document.body.appendChild(this.document.createElement("main"));
            try {
                if (!this.localStorage){
                    throw new Error("This app need localStorage");
                }
                if (!this.navigator.geolocation){
                    throw new Error("This app need geolocation");
                }
                this.mapDog.run();
            } catch (e) {
                this.mapDog.die(e);
            }
        }

        return {

            /**
             * Dog model
             */
            dog: undefined,

            /**
             * Login View
             */
            login: undefined,

            /**
             * Map View
             */
            map: undefined,

            /**
             * Template
             */
            template: undefined,

            /**
             * Run
             */
            run: function () {
                return !root.onload
                     ? (root.onload = onload)
                     : (!this.dog.name
                     ? this.login.display()
                     : this.map.display(
                           delete mapDog.login
                       ));
            },

            /**
             * @param {Error} e 
             */
            die: function (e) {
                this.getCanvas().innerHTML = this.template.error.replace(
                    "{error}",
                    e.message);
            },

            /**
             * @returns {HTMLElement}
             */
            getCanvas: function(){
                return root.document.body.getElementsByTagName("main")[0];
            }

        };

    }

)(this);
