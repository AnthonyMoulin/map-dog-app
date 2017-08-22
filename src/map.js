
this.mapDog = this.mapDog || {};

/**
 * @type {Object}
 */
this.mapDog.map = (

    /**
     * @param {window} root
     * @returns {Object}
     */
    function (root) {

        return {

            /**
             * Display
             */
            display: function () {
                mapDog.getCanvas().innerHTML = "";
                this.google.load(this.refresh);
            },

            /**
             * Refresh map
             */
            refresh: function () {
                root.clearTimeout();
                root.navigator.geolocation.getCurrentPosition(
                    function(e) {
                        var lat = parseInt(
                            e.coords.latitude * 100000, 10) / 100000;
                        var lng = parseInt(
                            e.coords.longitude * 100000, 10) / 100000;
                        if (mapDog.dog.lat !== lat || mapDog.dog.lng !== lng) {
                            mapDog.dog.lat = lat;
                            mapDog.dog.lng = lng;
                            mapDog.dog.persist();
                            mapDog.dog.put();
                        }
                        mapDog.map.google.refresh();
                        mapDog.dog.get(mapDog.map.google.refreshDogs);
                        root.setTimeout(mapDog.map.refresh, 10000);
                    },
                    function() {
                       mapDog.die({ message: "Geolocation error"} );
                    }
                );
            }

        };

    }
)(this);
