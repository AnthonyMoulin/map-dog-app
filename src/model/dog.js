
this.mapDog = this.mapDog || {};

/**
 * @type {Object}
 */
this.mapDog.dog = (

    /**
     * @returns {Object}
     * @param {window} root
     */
    function (root) {

        /**
         * @type String
         */
        // var endPoint = root.location.href.replace("map-dog", "api.map-dog")
                     // + "dog/";
			var endPoint = "http://localhost/dev.api.map-dog.game/web/dog/";
        return (

            /**
             * @constructor
             * @returns {Object}
             */
            function () {
                var dog = root.JSON.parse(root.localStorage.getItem("dog"));
                if (dog) {
                    this.name = dog.name;
                    this.avatar = dog.avatar;
                    this.lat = dog.lat;
                    this.lng = dog.lng;
                }
                return this;
            }
        ).call({

            /**
             * @param {Function} success
             */
            get: function(success) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", endPoint + "?name=" + mapDog.dog.name);
                xhr.onload = function() {
                    if (200 === this.status && success) {
                        var dogs = root.JSON.parse(xhr.response).dogs;
                        for (var i = 0, l = dogs.length; i < l; i++) {
                            dogs[i].lat = root.parseFloat(dogs[i].lat);
                            dogs[i].lng = root.parseFloat(dogs[i].lng);
                            dogs[i].time = root.parseInt(dogs[i].time, 10);
                        }
                        mapDog.dog.dogs = dogs;
                        success();
                    }  
                };
                xhr.send();
            },

            /**
             * @param {Function} success
             */
            put: function(success) {
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", endPoint);
                xhr.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded");
                xhr.onload = function() {
                    if (200 === this.status && success) {
                        success();
                    }  
                };
                xhr.send("name=" + mapDog.dog.name
                       + "&lat=" + mapDog.dog.lat
                       + "&lng=" + mapDog.dog.lng);
            },

            /**
             * @param {type} name
             * @param {type} avatar
             * @param {Function} success
             * @param {Function} error
             */
            post: function (name, avatar, success, error) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", endPoint);
                xhr.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded");
                xhr.onload = function() {
                    if (409 === this.status) {
                        return error({ message: "Exists!" }); 
                    } else if (200 !== this.status) {
                        return this.onerror();
                    }
                    mapDog.dog.name = name;
                    mapDog.dog.avatar = avatar;
                    mapDog.dog.persist();
                    success();
                };
                xhr.onerror = function () {
                    return error({ message: "An error occurs" }); 
                };
                xhr.send("name=" + name + "&avatar=" + avatar);
            },

            /**
             * Persist
             */
            persist: function () {
                root.localStorage.setItem("dog", root.JSON.stringify(this));
            }

        });

    }
)(this);
