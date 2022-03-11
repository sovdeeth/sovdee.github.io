function initMap() {
    // The location of Uluru
    const points = [{ lat: -25.344, lng: 131.036 },
                    { lat: -33.8688, lng: 151.2093}, 
                    { lat: -34.9285, lng: 138.6007},
                    { lat: -37.8136, lng: 144.9631}
                    ];

    

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: points[1],
      mapTypeId: "terrain",
    });

    const markers = points.map((position, i) => {
        // const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
            position: position,
            map: map,
        });
        return marker;
    })
 
    // Define a symbol using SVG path notation, with an opacity of 1.
    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 4,
    };
    // Create the polyline, passing the symbol in the 'icons' property.
    // Give the line an opacity of 0.
    // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
    const line = new google.maps.Polyline({
      path: points,
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px",
        },
      ],
      map: map,
    });
  }