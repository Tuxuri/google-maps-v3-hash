'use strict';

(function(window) {

  function UrlHash(map, config) {

    var init, center;

    function hasHash() {
      return (location.hash.length > 0);
    }

    function getUrlState() {
      return location.hash.substring(1).split('/').map(function(item) {
        return parseFloat(item, 10);
      });
    }

    function setUrlState() {
      location.hash = '#' + getMapState().join('/');
      return getUrlState();
    }

    function getMapState() {

      center = map.getCenter();

      return [
        map.getZoom(),
        center.lat(),
        center.lng()
      ];
    }

    function setMapState() {
      center = getUrlState();
      map.setZoom(center[0]);
      map.setCenter(new google.maps.LatLng(center[1], center[2]));
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
