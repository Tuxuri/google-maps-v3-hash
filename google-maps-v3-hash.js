'use strict';

(function(window) {
  var location = window.location;

  function UrlHash(map, config) {

    var init, center;

    function hasHash() {
      return (location.hash.length > 0);
    }

    function getUrlState() {
      var matches = location.hash.match(/(#|&)(ll=(.+?))(&|$)/);
      if (matches.length > 3) {
        return matches[3].split(',').map(function(i){
          return parseFloat(i);
        });
      }
    }

    function setUrlState() {
      location.hash = '#ll=' + getMapState().join(',');
      return getUrlState();
    }

    function getMapState() {

      center = map.getCenter();

      return [
        center.lat(),
        center.lng(),
        map.getZoom()
      ];
    }

    function setMapState() {
      center = getUrlState();
      map.setZoom(center[2]);
      map.setCenter(new google.maps.LatLng(center[0], center[1]));
    }

    google.maps.event.addListener(map, 'idle', function(e) {

      if(!init) {
        if(hasHash()) {
          setMapState();
        } else {
          setUrlState();
        }

        init = true;
      } else {
        setUrlState();
      }

    });

    window.onhashchange = function() {
       setMapState();
    };

  };

  google.maps.UrlHash = UrlHash;

}(window));
