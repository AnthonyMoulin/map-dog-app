
this.mapDog = this.mapDog || {};

this.google = this.google || {};

/**
 * @type {Object}
 */
this.mapDog.map.google = (

    /**
     * @param {window} root
     * @returns {Object}
     */
    function (root) {

        /**
         * @type {google.maps.Map}
         */
        var map;

        /**
         * @type {google.maps.Marker}
         */
        var marker;

        /**
         * @type {Array}
         */
        var dogs = [];

        /**
         * @type {Array}
         */
        var style = [
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "weight": 1
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#000000"
                },
                {
                  "weight": 5
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "elementType": "labels.text",
              "stylers": [
                {
                  "color": "#d5f3a7"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#a5a5a5"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#0c5a15"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.medical",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fcfcfc"
                }
              ]
            },
            {
              "featureType": "poi.place_of_worship",
              "elementType": "geometry",
              "stylers": [
                {
                  "invert_lightness": true
                }
              ]
            },
            {
              "featureType": "poi.school",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "poi.sports_complex",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "visibility": "simplified"
                },
                {
                  "weight": 2
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d7d7d7"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ad0b0b"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#abdfec"
                }
              ]
            }
        ];

        /**
         * @param {Object} dog
         * @returns {Object}
         */
        function getPosition(dog) {
            return { lat: dog.lat, lng: dog.lng };
        }

        /**
         * @returns {google.maps.Map}
         */
        function getMap() {
            return new google.maps.Map(
               mapDog.getCanvas(), {
                    center : getPosition(mapDog.dog),
                    zoom: 15,
                    maxZoom: 16,
                    minZoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "style"]
                    }
                }
            );
        }

        /**
         * @param {Object} dog 
         * @returns {google.maps.Marker}
         */
        function getMarker (dog) {
            return new google.maps.Marker({
                position: getPosition(dog),
                map: map,
                title : dog.name,
                icon: "/images/dog-" + dog.avatar + "-icon.png"    
            });
        }

        return {

            /**
             * Refresh
             */
            refresh: function () {
                if (!map) {
                    map = getMap();
                    marker = getMarker(mapDog.dog);
                    map.mapTypes.set(
                        "style",
                        new google.maps.StyledMapType(style));
                    map.setMapTypeId("style");
                    return;
                }
                map.panTo(getPosition(mapDog.dog));
                marker.setPosition(getPosition(mapDog.dog));
            },

            /**
             * Refresh
             */
            refreshDogs: function () {
                for (var i = 0, l = mapDog.dog.dogs.length; i < l; i++) {
                    if (marker[i]) {
                        marker[i].setMap(null);
                        marker[i] = undefined;
                    }
                    marker[i] = getMarker(mapDog.dog.dogs[i]);
                }
            },
            /**
             * @param {Function} callable
             */
            load: function (callable) {
                var script = root.document.createElement("script");
                script.src = "https://maps.googleapis.com/maps/api/js?"
                           + "key=AIzaSyD21vP4lQ5LA5g_GrU0ivkXLUMO0BIKz2s";
                script.onload = callable;
                root.document.getElementsByTagName("head")[0]
                             .appendChild(script);
            }

        };

    }
)(this);
