

function initMap() {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlFile, "application/xml")
    const errorNode = xml.querySelector("parsererror");
    if (errorNode) {
        console.log("error while parsing");
        return;
    } 
    
    const gpxPoints = xml.documentElement.getRootNode().getElementsByTagName("gpx")[0].getElementsByTagName("trk")[0].getElementsByTagName("trkseg")[0].getElementsByTagName("trkpt")
    
    const points = Array.from(gpxPoints).map((node) => {
        return {pos: { lat: Number(node.getAttribute("lat")), lng: Number(node.getAttribute("lon")) }, timestamp: new Date(node.getElementsByTagName("time")[0].innerHTML)}
    })
    console.log(points)
    // return;
    // The location of Uluru
    // const points = [{pos: { lat: -25.344, lng: 131.036 }, label: "Uluru", timestamp: new Date(2022, 1, 24, 7, 33, 30, 0)},
    //                 {pos: { lat: -33.8688, lng: 151.2093}, label: "Sydney", timestamp: new Date(2022, 1, 24, 11, 35, 0, 0)},
    //                 {pos: { lat: -34.9285, lng: 138.6007}, label: "Adelaide", timestamp: new Date(202, 1, 24, 16, 27, 30, 0)},
    //                 {pos: { lat: -37.8136, lng: 144.9631}, label: "Melbourne", timestamp: new Date(2022, 1, 24, 17, 33, 22, 0)},
    //                 {pos: { lat: 4.2105, lng: 101.9758}, label: "Malaysia", timestamp: new Date(2022, 1, 25, 8, 23, 12, 0)}
    //                 ];
                

    

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: points[0].pos,

      mapTypeId: "terrain",
    });

    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });

    const markers = points.map((info, i) => {
        if (i%85 != 0) return;
        const marker = new google.maps.Marker({
            position: info.pos,
            map: map,
        });

        marker.addListener("click", () => {
            infoWindow.setContent(//"<h2>"+info.label+"</h2>"+
                                    "<p>Location: "+ info.pos.lat +"&deg;N, " + info.pos.lng + "&deg;E</p>"+
                                    "<p>Timestamp: "+info.timestamp.toLocaleTimeString() + " " + info.timestamp.toDateString() + "</p>");
            infoWindow.open(map, marker);
        })
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
      path: points.map((info) => {return info.pos}),
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


  const xmlFile = `<?xml version="1.0" encoding="UTF-8"?>
  <gpx creator="StravaGPX Android" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
   <metadata>
    <time>2021-12-16T20:49:13Z</time>
   </metadata>
   <trk>
    <name>Well my phone crashed halfway through, but 8 miles is solid for not running in a month or so</name>
    <type>9</type>
    <trkseg>
     <trkpt lat="43.6629120" lon="-79.3788890">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:13Z</time>
     </trkpt>
     <trkpt lat="43.6628600" lon="-79.3788590">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:17Z</time>
     </trkpt>
     <trkpt lat="43.6627920" lon="-79.3788210">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:19Z</time>
     </trkpt>
     <trkpt lat="43.6628130" lon="-79.3788390">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:20Z</time>
     </trkpt>
     <trkpt lat="43.6628190" lon="-79.3788450">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:21Z</time>
     </trkpt>
     <trkpt lat="43.6628250" lon="-79.3788510">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:22Z</time>
     </trkpt>
     <trkpt lat="43.6628510" lon="-79.3788740">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:24Z</time>
     </trkpt>
     <trkpt lat="43.6628590" lon="-79.3788960">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:25Z</time>
     </trkpt>
     <trkpt lat="43.6628570" lon="-79.3789250">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:27Z</time>
     </trkpt>
     <trkpt lat="43.6628590" lon="-79.3789420">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:28Z</time>
     </trkpt>
     <trkpt lat="43.6628910" lon="-79.3789540">
      <ele>101.4</ele>
      <time>2021-12-16T20:49:30Z</time>
     </trkpt>
     <trkpt lat="43.6629100" lon="-79.3789870">
      <ele>101.5</ele>
      <time>2021-12-16T20:49:31Z</time>
     </trkpt>
     <trkpt lat="43.6629170" lon="-79.3790040">
      <ele>101.5</ele>
      <time>2021-12-16T20:49:32Z</time>
     </trkpt>
     <trkpt lat="43.6629240" lon="-79.3790560">
      <ele>101.5</ele>
      <time>2021-12-16T20:49:33Z</time>
     </trkpt>
     <trkpt lat="43.6629300" lon="-79.3791090">
      <ele>101.5</ele>
      <time>2021-12-16T20:49:34Z</time>
     </trkpt>
     <trkpt lat="43.6629370" lon="-79.3791630">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:36Z</time>
     </trkpt>
     <trkpt lat="43.6629460" lon="-79.3792410">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:37Z</time>
     </trkpt>
     <trkpt lat="43.6629450" lon="-79.3792990">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:39Z</time>
     </trkpt>
     <trkpt lat="43.6629460" lon="-79.3793500">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:40Z</time>
     </trkpt>
     <trkpt lat="43.6629390" lon="-79.3793960">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:41Z</time>
     </trkpt>
     <trkpt lat="43.6629270" lon="-79.3794660">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:42Z</time>
     </trkpt>
     <trkpt lat="43.6629150" lon="-79.3795270">
      <ele>101.6</ele>
      <time>2021-12-16T20:49:43Z</time>
     </trkpt>
     <trkpt lat="43.6628850" lon="-79.3796270">
      <ele>101.7</ele>
      <time>2021-12-16T20:49:45Z</time>
     </trkpt>
     <trkpt lat="43.6628710" lon="-79.3796770">
      <ele>101.7</ele>
      <time>2021-12-16T20:49:46Z</time>
     </trkpt>
     <trkpt lat="43.6628550" lon="-79.3797260">
      <ele>101.9</ele>
      <time>2021-12-16T20:49:47Z</time>
     </trkpt>
     <trkpt lat="43.6628330" lon="-79.3798220">
      <ele>102.1</ele>
      <time>2021-12-16T20:49:48Z</time>
     </trkpt>
     <trkpt lat="43.6628280" lon="-79.3798490">
      <ele>102.1</ele>
      <time>2021-12-16T20:49:49Z</time>
     </trkpt>
     <trkpt lat="43.6628240" lon="-79.3799020">
      <ele>102.0</ele>
      <time>2021-12-16T20:49:51Z</time>
     </trkpt>
     <trkpt lat="43.6628180" lon="-79.3799410">
      <ele>101.9</ele>
      <time>2021-12-16T20:49:52Z</time>
     </trkpt>
     <trkpt lat="43.6628080" lon="-79.3799820">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:53Z</time>
     </trkpt>
     <trkpt lat="43.6627830" lon="-79.3800870">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:54Z</time>
     </trkpt>
     <trkpt lat="43.6627750" lon="-79.3801340">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:56Z</time>
     </trkpt>
     <trkpt lat="43.6627650" lon="-79.3801720">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:57Z</time>
     </trkpt>
     <trkpt lat="43.6627530" lon="-79.3802270">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:58Z</time>
     </trkpt>
     <trkpt lat="43.6627480" lon="-79.3802460">
      <ele>101.8</ele>
      <time>2021-12-16T20:49:59Z</time>
     </trkpt>
     <trkpt lat="43.6627350" lon="-79.3803040">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:00Z</time>
     </trkpt>
     <trkpt lat="43.6627080" lon="-79.3803950">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:02Z</time>
     </trkpt>
     <trkpt lat="43.6626800" lon="-79.3804680">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:04Z</time>
     </trkpt>
     <trkpt lat="43.6626560" lon="-79.3805170">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:05Z</time>
     </trkpt>
     <trkpt lat="43.6626340" lon="-79.3805640">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:06Z</time>
     </trkpt>
     <trkpt lat="43.6626130" lon="-79.3806320">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:07Z</time>
     </trkpt>
     <trkpt lat="43.6625960" lon="-79.3806770">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:08Z</time>
     </trkpt>
     <trkpt lat="43.6625730" lon="-79.3807200">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:09Z</time>
     </trkpt>
     <trkpt lat="43.6625380" lon="-79.3807570">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:10Z</time>
     </trkpt>
     <trkpt lat="43.6624850" lon="-79.3807950">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:11Z</time>
     </trkpt>
     <trkpt lat="43.6624420" lon="-79.3808170">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:12Z</time>
     </trkpt>
     <trkpt lat="43.6624060" lon="-79.3808410">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:14Z</time>
     </trkpt>
     <trkpt lat="43.6623670" lon="-79.3808740">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:15Z</time>
     </trkpt>
     <trkpt lat="43.6623420" lon="-79.3808990">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:16Z</time>
     </trkpt>
     <trkpt lat="43.6623210" lon="-79.3809290">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:17Z</time>
     </trkpt>
     <trkpt lat="43.6623060" lon="-79.3809830">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:18Z</time>
     </trkpt>
     <trkpt lat="43.6623070" lon="-79.3810290">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:19Z</time>
     </trkpt>
     <trkpt lat="43.6622940" lon="-79.3810750">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:20Z</time>
     </trkpt>
     <trkpt lat="43.6622660" lon="-79.3811360">
      <ele>102.1</ele>
      <time>2021-12-16T20:50:22Z</time>
     </trkpt>
     <trkpt lat="43.6622730" lon="-79.3812120">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:24Z</time>
     </trkpt>
     <trkpt lat="43.6622880" lon="-79.3812550">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:25Z</time>
     </trkpt>
     <trkpt lat="43.6623040" lon="-79.3813050">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:26Z</time>
     </trkpt>
     <trkpt lat="43.6623140" lon="-79.3813490">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:27Z</time>
     </trkpt>
     <trkpt lat="43.6623480" lon="-79.3814230">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:28Z</time>
     </trkpt>
     <trkpt lat="43.6624040" lon="-79.3814980">
      <ele>102.0</ele>
      <time>2021-12-16T20:50:29Z</time>
     </trkpt>
     <trkpt lat="43.6624150" lon="-79.3815490">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:31Z</time>
     </trkpt>
     <trkpt lat="43.6624200" lon="-79.3815970">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:32Z</time>
     </trkpt>
     <trkpt lat="43.6624210" lon="-79.3816770">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:33Z</time>
     </trkpt>
     <trkpt lat="43.6624170" lon="-79.3817230">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:34Z</time>
     </trkpt>
     <trkpt lat="43.6624100" lon="-79.3817750">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:36Z</time>
     </trkpt>
     <trkpt lat="43.6624010" lon="-79.3818180">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:37Z</time>
     </trkpt>
     <trkpt lat="43.6623890" lon="-79.3818630">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:38Z</time>
     </trkpt>
     <trkpt lat="43.6623580" lon="-79.3819100">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:39Z</time>
     </trkpt>
     <trkpt lat="43.6623190" lon="-79.3819420">
      <ele>101.7</ele>
      <time>2021-12-16T20:50:40Z</time>
     </trkpt>
     <trkpt lat="43.6622770" lon="-79.3819810">
      <ele>101.7</ele>
      <time>2021-12-16T20:50:41Z</time>
     </trkpt>
     <trkpt lat="43.6622410" lon="-79.3820570">
      <ele>101.6</ele>
      <time>2021-12-16T20:50:43Z</time>
     </trkpt>
     <trkpt lat="43.6622300" lon="-79.3821030">
      <ele>101.6</ele>
      <time>2021-12-16T20:50:44Z</time>
     </trkpt>
     <trkpt lat="43.6622050" lon="-79.3822100">
      <ele>101.5</ele>
      <time>2021-12-16T20:50:45Z</time>
     </trkpt>
     <trkpt lat="43.6622190" lon="-79.3822270">
      <ele>101.6</ele>
      <time>2021-12-16T20:50:46Z</time>
     </trkpt>
     <trkpt lat="43.6622390" lon="-79.3822800">
      <ele>101.6</ele>
      <time>2021-12-16T20:50:48Z</time>
     </trkpt>
     <trkpt lat="43.6622570" lon="-79.3823290">
      <ele>101.7</ele>
      <time>2021-12-16T20:50:49Z</time>
     </trkpt>
     <trkpt lat="43.6622810" lon="-79.3824430">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:50Z</time>
     </trkpt>
     <trkpt lat="43.6622970" lon="-79.3824760">
      <ele>101.9</ele>
      <time>2021-12-16T20:50:51Z</time>
     </trkpt>
     <trkpt lat="43.6623040" lon="-79.3825150">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:52Z</time>
     </trkpt>
     <trkpt lat="43.6623100" lon="-79.3825700">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:54Z</time>
     </trkpt>
     <trkpt lat="43.6623120" lon="-79.3826840">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:55Z</time>
     </trkpt>
     <trkpt lat="43.6623160" lon="-79.3827230">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:56Z</time>
     </trkpt>
     <trkpt lat="43.6623120" lon="-79.3827760">
      <ele>101.7</ele>
      <time>2021-12-16T20:50:58Z</time>
     </trkpt>
     <trkpt lat="43.6623080" lon="-79.3827930">
      <ele>101.8</ele>
      <time>2021-12-16T20:50:59Z</time>
     </trkpt>
     <trkpt lat="43.6622710" lon="-79.3828810">
      <ele>102.0</ele>
      <time>2021-12-16T20:51:00Z</time>
     </trkpt>
     <trkpt lat="43.6622460" lon="-79.3829080">
      <ele>102.1</ele>
      <time>2021-12-16T20:51:01Z</time>
     </trkpt>
     <trkpt lat="43.6622380" lon="-79.3829190">
      <ele>102.1</ele>
      <time>2021-12-16T20:51:02Z</time>
     </trkpt>
     <trkpt lat="43.6622130" lon="-79.3829620">
      <ele>102.3</ele>
      <time>2021-12-16T20:51:03Z</time>
     </trkpt>
     <trkpt lat="43.6622040" lon="-79.3829780">
      <ele>102.3</ele>
      <time>2021-12-16T20:51:04Z</time>
     </trkpt>
     <trkpt lat="43.6621820" lon="-79.3830080">
      <ele>102.4</ele>
      <time>2021-12-16T20:51:05Z</time>
     </trkpt>
     <trkpt lat="43.6621590" lon="-79.3830310">
      <ele>102.5</ele>
      <time>2021-12-16T20:51:06Z</time>
     </trkpt>
     <trkpt lat="43.6621300" lon="-79.3830610">
      <ele>102.7</ele>
      <time>2021-12-16T20:51:08Z</time>
     </trkpt>
     <trkpt lat="43.6621020" lon="-79.3830930">
      <ele>102.8</ele>
      <time>2021-12-16T20:51:09Z</time>
     </trkpt>
     <trkpt lat="43.6620650" lon="-79.3831200">
      <ele>102.9</ele>
      <time>2021-12-16T20:51:10Z</time>
     </trkpt>
     <trkpt lat="43.6620500" lon="-79.3831340">
      <ele>103.3</ele>
      <time>2021-12-16T20:51:11Z</time>
     </trkpt>
     <trkpt lat="43.6620270" lon="-79.3831720">
      <ele>103.3</ele>
      <time>2021-12-16T20:51:12Z</time>
     </trkpt>
     <trkpt lat="43.6619830" lon="-79.3831600">
      <ele>103.3</ele>
      <time>2021-12-16T20:51:13Z</time>
     </trkpt>
     <trkpt lat="43.6619630" lon="-79.3831480">
      <ele>103.3</ele>
      <time>2021-12-16T20:51:14Z</time>
     </trkpt>
     <trkpt lat="43.6619450" lon="-79.3831520">
      <ele>102.9</ele>
      <time>2021-12-16T20:51:15Z</time>
     </trkpt>
     <trkpt lat="43.6619040" lon="-79.3831900">
      <ele>102.8</ele>
      <time>2021-12-16T20:51:17Z</time>
     </trkpt>
     <trkpt lat="43.6618470" lon="-79.3832310">
      <ele>102.7</ele>
      <time>2021-12-16T20:51:18Z</time>
     </trkpt>
     <trkpt lat="43.6617740" lon="-79.3832740">
      <ele>102.5</ele>
      <time>2021-12-16T20:51:20Z</time>
     </trkpt>
     <trkpt lat="43.6617120" lon="-79.3833070">
      <ele>102.4</ele>
      <time>2021-12-16T20:51:21Z</time>
     </trkpt>
     <trkpt lat="43.6616650" lon="-79.3833100">
      <ele>102.2</ele>
      <time>2021-12-16T20:51:22Z</time>
     </trkpt>
     <trkpt lat="43.6616030" lon="-79.3833040">
      <ele>102.1</ele>
      <time>2021-12-16T20:51:23Z</time>
     </trkpt>
     <trkpt lat="43.6615480" lon="-79.3832980">
      <ele>101.9</ele>
      <time>2021-12-16T20:51:24Z</time>
     </trkpt>
     <trkpt lat="43.6614980" lon="-79.3833040">
      <ele>101.8</ele>
      <time>2021-12-16T20:51:26Z</time>
     </trkpt>
     <trkpt lat="43.6614560" lon="-79.3833200">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:28Z</time>
     </trkpt>
     <trkpt lat="43.6614360" lon="-79.3833480">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:30Z</time>
     </trkpt>
     <trkpt lat="43.6614250" lon="-79.3833710">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:32Z</time>
     </trkpt>
     <trkpt lat="43.6614290" lon="-79.3833850">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:33Z</time>
     </trkpt>
     <trkpt lat="43.6614240" lon="-79.3833930">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:34Z</time>
     </trkpt>
     <trkpt lat="43.6614160" lon="-79.3833960">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:35Z</time>
     </trkpt>
     <trkpt lat="43.6614000" lon="-79.3834000">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:37Z</time>
     </trkpt>
     <trkpt lat="43.6613680" lon="-79.3833880">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:38Z</time>
     </trkpt>
     <trkpt lat="43.6613400" lon="-79.3833630">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:39Z</time>
     </trkpt>
     <trkpt lat="43.6613120" lon="-79.3833290">
      <ele>101.7</ele>
      <time>2021-12-16T20:51:40Z</time>
     </trkpt>
     <trkpt lat="43.6612840" lon="-79.3832940">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:42Z</time>
     </trkpt>
     <trkpt lat="43.6612600" lon="-79.3832670">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:43Z</time>
     </trkpt>
     <trkpt lat="43.6612790" lon="-79.3832440">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:45Z</time>
     </trkpt>
     <trkpt lat="43.6612870" lon="-79.3832430">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:46Z</time>
     </trkpt>
     <trkpt lat="43.6612930" lon="-79.3832430">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:47Z</time>
     </trkpt>
     <trkpt lat="43.6613040" lon="-79.3832410">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:49Z</time>
     </trkpt>
     <trkpt lat="43.6613080" lon="-79.3832360">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:50Z</time>
     </trkpt>
     <trkpt lat="43.6613130" lon="-79.3832210">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:52Z</time>
     </trkpt>
     <trkpt lat="43.6613160" lon="-79.3832100">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:54Z</time>
     </trkpt>
     <trkpt lat="43.6613180" lon="-79.3832020">
      <ele>101.6</ele>
      <time>2021-12-16T20:51:55Z</time>
     </trkpt>
     <trkpt lat="43.6613190" lon="-79.3831970">
      <ele>101.5</ele>
      <time>2021-12-16T20:51:56Z</time>
     </trkpt>
     <trkpt lat="43.6613200" lon="-79.3831860">
      <ele>101.5</ele>
      <time>2021-12-16T20:51:58Z</time>
     </trkpt>
     <trkpt lat="43.6613200" lon="-79.3831840">
      <ele>101.5</ele>
      <time>2021-12-16T20:51:59Z</time>
     </trkpt>
     <trkpt lat="43.6613220" lon="-79.3831800">
      <ele>101.5</ele>
      <time>2021-12-16T20:52:00Z</time>
     </trkpt>
     <trkpt lat="43.6613230" lon="-79.3831770">
      <ele>101.5</ele>
      <time>2021-12-16T20:52:01Z</time>
     </trkpt>
     <trkpt lat="43.6613260" lon="-79.3831260">
      <ele>101.5</ele>
      <time>2021-12-16T20:52:03Z</time>
     </trkpt>
     <trkpt lat="43.6613310" lon="-79.3830540">
      <ele>101.4</ele>
      <time>2021-12-16T20:52:05Z</time>
     </trkpt>
     <trkpt lat="43.6613320" lon="-79.3830310">
      <ele>101.4</ele>
      <time>2021-12-16T20:52:06Z</time>
     </trkpt>
     <trkpt lat="43.6613290" lon="-79.3829810">
      <ele>101.4</ele>
      <time>2021-12-16T20:52:08Z</time>
     </trkpt>
     <trkpt lat="43.6613310" lon="-79.3831070">
      <ele>101.4</ele>
      <time>2021-12-16T20:52:09Z</time>
     </trkpt>
     <trkpt lat="43.6613470" lon="-79.3831460">
      <ele>101.5</ele>
      <time>2021-12-16T20:52:11Z</time>
     </trkpt>
     <trkpt lat="43.6613570" lon="-79.3831500">
      <ele>101.6</ele>
      <time>2021-12-16T20:52:13Z</time>
     </trkpt>
     <trkpt lat="43.6613670" lon="-79.3831550">
      <ele>101.6</ele>
      <time>2021-12-16T20:52:14Z</time>
     </trkpt>
     <trkpt lat="43.6613770" lon="-79.3831590">
      <ele>101.6</ele>
      <time>2021-12-16T20:52:16Z</time>
     </trkpt>
     <trkpt lat="43.6613870" lon="-79.3831630">
      <ele>101.6</ele>
      <time>2021-12-16T20:52:17Z</time>
     </trkpt>
     <trkpt lat="43.6614040" lon="-79.3831850">
      <ele>101.6</ele>
      <time>2021-12-16T20:52:18Z</time>
     </trkpt>
     <trkpt lat="43.6614390" lon="-79.3832440">
      <ele>101.7</ele>
      <time>2021-12-16T20:52:20Z</time>
     </trkpt>
     <trkpt lat="43.6614350" lon="-79.3833090">
      <ele>101.7</ele>
      <time>2021-12-16T20:52:21Z</time>
     </trkpt>
     <trkpt lat="43.6613150" lon="-79.3835230">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:22Z</time>
     </trkpt>
     <trkpt lat="43.6612690" lon="-79.3836180">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:23Z</time>
     </trkpt>
     <trkpt lat="43.6612530" lon="-79.3837000">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:24Z</time>
     </trkpt>
     <trkpt lat="43.6612470" lon="-79.3837460">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:25Z</time>
     </trkpt>
     <trkpt lat="43.6612450" lon="-79.3837940">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:27Z</time>
     </trkpt>
     <trkpt lat="43.6612460" lon="-79.3838410">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:28Z</time>
     </trkpt>
     <trkpt lat="43.6612450" lon="-79.3838860">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:29Z</time>
     </trkpt>
     <trkpt lat="43.6612390" lon="-79.3839360">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:30Z</time>
     </trkpt>
     <trkpt lat="43.6612330" lon="-79.3839860">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:31Z</time>
     </trkpt>
     <trkpt lat="43.6612210" lon="-79.3840500">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:33Z</time>
     </trkpt>
     <trkpt lat="43.6612070" lon="-79.3840900">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:34Z</time>
     </trkpt>
     <trkpt lat="43.6611880" lon="-79.3841400">
      <ele>101.9</ele>
      <time>2021-12-16T20:52:35Z</time>
     </trkpt>
     <trkpt lat="43.6611680" lon="-79.3842060">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:37Z</time>
     </trkpt>
     <trkpt lat="43.6611580" lon="-79.3842650">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:38Z</time>
     </trkpt>
     <trkpt lat="43.6611460" lon="-79.3843100">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:39Z</time>
     </trkpt>
     <trkpt lat="43.6611370" lon="-79.3843510">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:40Z</time>
     </trkpt>
     <trkpt lat="43.6611280" lon="-79.3843940">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:41Z</time>
     </trkpt>
     <trkpt lat="43.6611190" lon="-79.3844390">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:42Z</time>
     </trkpt>
     <trkpt lat="43.6611060" lon="-79.3844960">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:44Z</time>
     </trkpt>
     <trkpt lat="43.6610960" lon="-79.3845430">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:45Z</time>
     </trkpt>
     <trkpt lat="43.6610860" lon="-79.3845890">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:46Z</time>
     </trkpt>
     <trkpt lat="43.6610780" lon="-79.3846370">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:47Z</time>
     </trkpt>
     <trkpt lat="43.6610710" lon="-79.3846840">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:48Z</time>
     </trkpt>
     <trkpt lat="43.6610630" lon="-79.3847440">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:49Z</time>
     </trkpt>
     <trkpt lat="43.6610560" lon="-79.3848140">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:51Z</time>
     </trkpt>
     <trkpt lat="43.6610490" lon="-79.3848800">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:52Z</time>
     </trkpt>
     <trkpt lat="43.6610430" lon="-79.3849300">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:53Z</time>
     </trkpt>
     <trkpt lat="43.6610350" lon="-79.3849790">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:54Z</time>
     </trkpt>
     <trkpt lat="43.6610210" lon="-79.3850350">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:55Z</time>
     </trkpt>
     <trkpt lat="43.6610050" lon="-79.3850930">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:56Z</time>
     </trkpt>
     <trkpt lat="43.6609930" lon="-79.3851420">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:57Z</time>
     </trkpt>
     <trkpt lat="43.6609800" lon="-79.3851980">
      <ele>101.8</ele>
      <time>2021-12-16T20:52:59Z</time>
     </trkpt>
     <trkpt lat="43.6609670" lon="-79.3852790">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:00Z</time>
     </trkpt>
     <trkpt lat="43.6609610" lon="-79.3853330">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:01Z</time>
     </trkpt>
     <trkpt lat="43.6609560" lon="-79.3853880">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:02Z</time>
     </trkpt>
     <trkpt lat="43.6609490" lon="-79.3854570">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:04Z</time>
     </trkpt>
     <trkpt lat="43.6609430" lon="-79.3855120">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:05Z</time>
     </trkpt>
     <trkpt lat="43.6609360" lon="-79.3855660">
      <ele>101.9</ele>
      <time>2021-12-16T20:53:06Z</time>
     </trkpt>
     <trkpt lat="43.6609260" lon="-79.3856300">
      <ele>101.9</ele>
      <time>2021-12-16T20:53:07Z</time>
     </trkpt>
     <trkpt lat="43.6609150" lon="-79.3856840">
      <ele>101.9</ele>
      <time>2021-12-16T20:53:08Z</time>
     </trkpt>
     <trkpt lat="43.6609030" lon="-79.3857420">
      <ele>102.0</ele>
      <time>2021-12-16T20:53:09Z</time>
     </trkpt>
     <trkpt lat="43.6608900" lon="-79.3858080">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:11Z</time>
     </trkpt>
     <trkpt lat="43.6608810" lon="-79.3858610">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:12Z</time>
     </trkpt>
     <trkpt lat="43.6608730" lon="-79.3859120">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:13Z</time>
     </trkpt>
     <trkpt lat="43.6608640" lon="-79.3859710">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:14Z</time>
     </trkpt>
     <trkpt lat="43.6608540" lon="-79.3860310">
      <ele>102.2</ele>
      <time>2021-12-16T20:53:15Z</time>
     </trkpt>
     <trkpt lat="43.6608400" lon="-79.3860650">
      <ele>102.2</ele>
      <time>2021-12-16T20:53:16Z</time>
     </trkpt>
     <trkpt lat="43.6608000" lon="-79.3860710">
      <ele>102.2</ele>
      <time>2021-12-16T20:53:18Z</time>
     </trkpt>
     <trkpt lat="43.6607860" lon="-79.3860630">
      <ele>102.2</ele>
      <time>2021-12-16T20:53:19Z</time>
     </trkpt>
     <trkpt lat="43.6607720" lon="-79.3860550">
      <ele>102.2</ele>
      <time>2021-12-16T20:53:20Z</time>
     </trkpt>
     <trkpt lat="43.6607440" lon="-79.3860450">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:21Z</time>
     </trkpt>
     <trkpt lat="43.6607050" lon="-79.3860260">
      <ele>102.1</ele>
      <time>2021-12-16T20:53:23Z</time>
     </trkpt>
     <trkpt lat="43.6606650" lon="-79.3860050">
      <ele>102.0</ele>
      <time>2021-12-16T20:53:25Z</time>
     </trkpt>
     <trkpt lat="43.6606310" lon="-79.3859800">
      <ele>101.9</ele>
      <time>2021-12-16T20:53:26Z</time>
     </trkpt>
     <trkpt lat="43.6605940" lon="-79.3859380">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:27Z</time>
     </trkpt>
     <trkpt lat="43.6605710" lon="-79.3859110">
      <ele>101.8</ele>
      <time>2021-12-16T20:53:28Z</time>
     </trkpt>
     <trkpt lat="43.6605500" lon="-79.3858840">
      <ele>101.7</ele>
      <time>2021-12-16T20:53:29Z</time>
     </trkpt>
     <trkpt lat="43.6605230" lon="-79.3858490">
      <ele>101.6</ele>
      <time>2021-12-16T20:53:31Z</time>
     </trkpt>
     <trkpt lat="43.6605010" lon="-79.3858190">
      <ele>101.5</ele>
      <time>2021-12-16T20:53:32Z</time>
     </trkpt>
     <trkpt lat="43.6604830" lon="-79.3857890">
      <ele>101.5</ele>
      <time>2021-12-16T20:53:33Z</time>
     </trkpt>
     <trkpt lat="43.6604550" lon="-79.3857400">
      <ele>101.4</ele>
      <time>2021-12-16T20:53:35Z</time>
     </trkpt>
     <trkpt lat="43.6604270" lon="-79.3856990">
      <ele>101.3</ele>
      <time>2021-12-16T20:53:36Z</time>
     </trkpt>
     <trkpt lat="43.6604160" lon="-79.3856840">
      <ele>101.3</ele>
      <time>2021-12-16T20:53:37Z</time>
     </trkpt>
     <trkpt lat="43.6603940" lon="-79.3856440">
      <ele>101.2</ele>
      <time>2021-12-16T20:53:38Z</time>
     </trkpt>
     <trkpt lat="43.6603870" lon="-79.3856300">
      <ele>101.2</ele>
      <time>2021-12-16T20:53:39Z</time>
     </trkpt>
     <trkpt lat="43.6603580" lon="-79.3855880">
      <ele>101.1</ele>
      <time>2021-12-16T20:53:40Z</time>
     </trkpt>
     <trkpt lat="43.6603470" lon="-79.3855730">
      <ele>101.1</ele>
      <time>2021-12-16T20:53:41Z</time>
     </trkpt>
     <trkpt lat="43.6603190" lon="-79.3855440">
      <ele>101.0</ele>
      <time>2021-12-16T20:53:42Z</time>
     </trkpt>
     <trkpt lat="43.6602990" lon="-79.3855280">
      <ele>101.0</ele>
      <time>2021-12-16T20:53:43Z</time>
     </trkpt>
     <trkpt lat="43.6602680" lon="-79.3855080">
      <ele>100.9</ele>
      <time>2021-12-16T20:53:45Z</time>
     </trkpt>
     <trkpt lat="43.6602340" lon="-79.3854900">
      <ele>100.9</ele>
      <time>2021-12-16T20:53:46Z</time>
     </trkpt>
     <trkpt lat="43.6602220" lon="-79.3854850">
      <ele>100.8</ele>
      <time>2021-12-16T20:53:47Z</time>
     </trkpt>
     <trkpt lat="43.6601850" lon="-79.3854650">
      <ele>100.8</ele>
      <time>2021-12-16T20:53:48Z</time>
     </trkpt>
     <trkpt lat="43.6601730" lon="-79.3854580">
      <ele>100.7</ele>
      <time>2021-12-16T20:53:49Z</time>
     </trkpt>
     <trkpt lat="43.6601400" lon="-79.3854440">
      <ele>100.7</ele>
      <time>2021-12-16T20:53:50Z</time>
     </trkpt>
     <trkpt lat="43.6601050" lon="-79.3854390">
      <ele>100.6</ele>
      <time>2021-12-16T20:53:51Z</time>
     </trkpt>
     <trkpt lat="43.6600760" lon="-79.3854420">
      <ele>100.6</ele>
      <time>2021-12-16T20:53:52Z</time>
     </trkpt>
     <trkpt lat="43.6600390" lon="-79.3854480">
      <ele>100.5</ele>
      <time>2021-12-16T20:53:54Z</time>
     </trkpt>
     <trkpt lat="43.6599950" lon="-79.3854700">
      <ele>100.4</ele>
      <time>2021-12-16T20:53:55Z</time>
     </trkpt>
     <trkpt lat="43.6599470" lon="-79.3854880">
      <ele>100.4</ele>
      <time>2021-12-16T20:53:57Z</time>
     </trkpt>
     <trkpt lat="43.6599270" lon="-79.3854950">
      <ele>100.3</ele>
      <time>2021-12-16T20:53:58Z</time>
     </trkpt>
     <trkpt lat="43.6599070" lon="-79.3855020">
      <ele>100.3</ele>
      <time>2021-12-16T20:53:59Z</time>
     </trkpt>
     <trkpt lat="43.6598710" lon="-79.3855030">
      <ele>100.2</ele>
      <time>2021-12-16T20:54:00Z</time>
     </trkpt>
     <trkpt lat="43.6598590" lon="-79.3855020">
      <ele>100.2</ele>
      <time>2021-12-16T20:54:01Z</time>
     </trkpt>
     <trkpt lat="43.6598190" lon="-79.3855010">
      <ele>100.1</ele>
      <time>2021-12-16T20:54:02Z</time>
     </trkpt>
     <trkpt lat="43.6598060" lon="-79.3855020">
      <ele>100.1</ele>
      <time>2021-12-16T20:54:03Z</time>
     </trkpt>
     <trkpt lat="43.6597470" lon="-79.3855360">
      <ele>100.0</ele>
      <time>2021-12-16T20:54:05Z</time>
     </trkpt>
     <trkpt lat="43.6597210" lon="-79.3855570">
      <ele>100.0</ele>
      <time>2021-12-16T20:54:06Z</time>
     </trkpt>
     <trkpt lat="43.6596790" lon="-79.3856040">
      <ele>99.9</ele>
      <time>2021-12-16T20:54:07Z</time>
     </trkpt>
     <trkpt lat="43.6596490" lon="-79.3856360">
      <ele>99.8</ele>
      <time>2021-12-16T20:54:08Z</time>
     </trkpt>
     <trkpt lat="43.6596220" lon="-79.3856600">
      <ele>99.8</ele>
      <time>2021-12-16T20:54:09Z</time>
     </trkpt>
     <trkpt lat="43.6595880" lon="-79.3856930">
      <ele>99.7</ele>
      <time>2021-12-16T20:54:11Z</time>
     </trkpt>
     <trkpt lat="43.6595610" lon="-79.3857200">
      <ele>99.7</ele>
      <time>2021-12-16T20:54:12Z</time>
     </trkpt>
     <trkpt lat="43.6595360" lon="-79.3857370">
      <ele>99.6</ele>
      <time>2021-12-16T20:54:13Z</time>
     </trkpt>
     <trkpt lat="43.6594990" lon="-79.3857580">
      <ele>99.5</ele>
      <time>2021-12-16T20:54:14Z</time>
     </trkpt>
     <trkpt lat="43.6594860" lon="-79.3857640">
      <ele>99.5</ele>
      <time>2021-12-16T20:54:15Z</time>
     </trkpt>
     <trkpt lat="43.6594470" lon="-79.3857800">
      <ele>99.4</ele>
      <time>2021-12-16T20:54:16Z</time>
     </trkpt>
     <trkpt lat="43.6594330" lon="-79.3857850">
      <ele>99.4</ele>
      <time>2021-12-16T20:54:17Z</time>
     </trkpt>
     <trkpt lat="43.6594060" lon="-79.3857920">
      <ele>99.3</ele>
      <time>2021-12-16T20:54:18Z</time>
     </trkpt>
     <trkpt lat="43.6593550" lon="-79.3857940">
      <ele>99.3</ele>
      <time>2021-12-16T20:54:20Z</time>
     </trkpt>
     <trkpt lat="43.6593380" lon="-79.3857920">
      <ele>99.2</ele>
      <time>2021-12-16T20:54:21Z</time>
     </trkpt>
     <trkpt lat="43.6593220" lon="-79.3857900">
      <ele>99.2</ele>
      <time>2021-12-16T20:54:22Z</time>
     </trkpt>
     <trkpt lat="43.6592950" lon="-79.3857790">
      <ele>99.1</ele>
      <time>2021-12-16T20:54:23Z</time>
     </trkpt>
     <trkpt lat="43.6592670" lon="-79.3857680">
      <ele>99.1</ele>
      <time>2021-12-16T20:54:24Z</time>
     </trkpt>
     <trkpt lat="43.6592290" lon="-79.3857390">
      <ele>99.0</ele>
      <time>2021-12-16T20:54:25Z</time>
     </trkpt>
     <trkpt lat="43.6591860" lon="-79.3856830">
      <ele>98.9</ele>
      <time>2021-12-16T20:54:26Z</time>
     </trkpt>
     <trkpt lat="43.6591520" lon="-79.3856340">
      <ele>98.8</ele>
      <time>2021-12-16T20:54:27Z</time>
     </trkpt>
     <trkpt lat="43.6591040" lon="-79.3855470">
      <ele>98.7</ele>
      <time>2021-12-16T20:54:29Z</time>
     </trkpt>
     <trkpt lat="43.6590660" lon="-79.3854780">
      <ele>98.7</ele>
      <time>2021-12-16T20:54:30Z</time>
     </trkpt>
     <trkpt lat="43.6590260" lon="-79.3854150">
      <ele>98.6</ele>
      <time>2021-12-16T20:54:31Z</time>
     </trkpt>
     <trkpt lat="43.6589740" lon="-79.3853550">
      <ele>98.5</ele>
      <time>2021-12-16T20:54:32Z</time>
     </trkpt>
     <trkpt lat="43.6589050" lon="-79.3852970">
      <ele>98.4</ele>
      <time>2021-12-16T20:54:34Z</time>
     </trkpt>
     <trkpt lat="43.6588410" lon="-79.3852550">
      <ele>98.2</ele>
      <time>2021-12-16T20:54:35Z</time>
     </trkpt>
     <trkpt lat="43.6587890" lon="-79.3852240">
      <ele>98.1</ele>
      <time>2021-12-16T20:54:36Z</time>
     </trkpt>
     <trkpt lat="43.6587350" lon="-79.3851900">
      <ele>98.0</ele>
      <time>2021-12-16T20:54:37Z</time>
     </trkpt>
     <trkpt lat="43.6586660" lon="-79.3851430">
      <ele>98.0</ele>
      <time>2021-12-16T20:54:39Z</time>
     </trkpt>
     <trkpt lat="43.6586210" lon="-79.3851110">
      <ele>97.9</ele>
      <time>2021-12-16T20:54:40Z</time>
     </trkpt>
     <trkpt lat="43.6585650" lon="-79.3850720">
      <ele>97.8</ele>
      <time>2021-12-16T20:54:41Z</time>
     </trkpt>
     <trkpt lat="43.6585200" lon="-79.3850450">
      <ele>97.8</ele>
      <time>2021-12-16T20:54:42Z</time>
     </trkpt>
     <trkpt lat="43.6584840" lon="-79.3850270">
      <ele>97.7</ele>
      <time>2021-12-16T20:54:43Z</time>
     </trkpt>
     <trkpt lat="43.6584440" lon="-79.3850110">
      <ele>97.6</ele>
      <time>2021-12-16T20:54:45Z</time>
     </trkpt>
     <trkpt lat="43.6584060" lon="-79.3849980">
      <ele>97.5</ele>
      <time>2021-12-16T20:54:46Z</time>
     </trkpt>
     <trkpt lat="43.6583670" lon="-79.3849880">
      <ele>97.5</ele>
      <time>2021-12-16T20:54:47Z</time>
     </trkpt>
     <trkpt lat="43.6583080" lon="-79.3849750">
      <ele>97.4</ele>
      <time>2021-12-16T20:54:49Z</time>
     </trkpt>
     <trkpt lat="43.6582690" lon="-79.3849630">
      <ele>97.3</ele>
      <time>2021-12-16T20:54:50Z</time>
     </trkpt>
     <trkpt lat="43.6582340" lon="-79.3849500">
      <ele>97.2</ele>
      <time>2021-12-16T20:54:51Z</time>
     </trkpt>
     <trkpt lat="43.6582010" lon="-79.3849330">
      <ele>97.2</ele>
      <time>2021-12-16T20:54:52Z</time>
     </trkpt>
     <trkpt lat="43.6581720" lon="-79.3849140">
      <ele>97.1</ele>
      <time>2021-12-16T20:54:53Z</time>
     </trkpt>
     <trkpt lat="43.6581410" lon="-79.3848910">
      <ele>97.1</ele>
      <time>2021-12-16T20:54:54Z</time>
     </trkpt>
     <trkpt lat="43.6581040" lon="-79.3848630">
      <ele>97.0</ele>
      <time>2021-12-16T20:54:55Z</time>
     </trkpt>
     <trkpt lat="43.6580520" lon="-79.3848230">
      <ele>97.0</ele>
      <time>2021-12-16T20:54:57Z</time>
     </trkpt>
     <trkpt lat="43.6580250" lon="-79.3847920">
      <ele>96.9</ele>
      <time>2021-12-16T20:54:58Z</time>
     </trkpt>
     <trkpt lat="43.6580020" lon="-79.3847620">
      <ele>96.9</ele>
      <time>2021-12-16T20:54:59Z</time>
     </trkpt>
     <trkpt lat="43.6579760" lon="-79.3847290">
      <ele>96.9</ele>
      <time>2021-12-16T20:55:00Z</time>
     </trkpt>
     <trkpt lat="43.6579470" lon="-79.3847030">
      <ele>96.8</ele>
      <time>2021-12-16T20:55:01Z</time>
     </trkpt>
     <trkpt lat="43.6579160" lon="-79.3846870">
      <ele>96.8</ele>
      <time>2021-12-16T20:55:02Z</time>
     </trkpt>
     <trkpt lat="43.6578740" lon="-79.3846710">
      <ele>96.8</ele>
      <time>2021-12-16T20:55:04Z</time>
     </trkpt>
     <trkpt lat="43.6578390" lon="-79.3846570">
      <ele>96.8</ele>
      <time>2021-12-16T20:55:05Z</time>
     </trkpt>
     <trkpt lat="43.6578000" lon="-79.3846450">
      <ele>96.7</ele>
      <time>2021-12-16T20:55:06Z</time>
     </trkpt>
     <trkpt lat="43.6577630" lon="-79.3846330">
      <ele>96.7</ele>
      <time>2021-12-16T20:55:07Z</time>
     </trkpt>
     <trkpt lat="43.6577340" lon="-79.3846230">
      <ele>96.7</ele>
      <time>2021-12-16T20:55:08Z</time>
     </trkpt>
     <trkpt lat="43.6577050" lon="-79.3846110">
      <ele>96.6</ele>
      <time>2021-12-16T20:55:09Z</time>
     </trkpt>
     <trkpt lat="43.6576630" lon="-79.3845950">
      <ele>96.6</ele>
      <time>2021-12-16T20:55:11Z</time>
     </trkpt>
     <trkpt lat="43.6576200" lon="-79.3845820">
      <ele>96.6</ele>
      <time>2021-12-16T20:55:13Z</time>
     </trkpt>
     <trkpt lat="43.6575880" lon="-79.3845750">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:15Z</time>
     </trkpt>
     <trkpt lat="43.6575770" lon="-79.3845750">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:16Z</time>
     </trkpt>
     <trkpt lat="43.6575690" lon="-79.3845810">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:18Z</time>
     </trkpt>
     <trkpt lat="43.6575740" lon="-79.3845920">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:20Z</time>
     </trkpt>
     <trkpt lat="43.6575760" lon="-79.3845950">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:21Z</time>
     </trkpt>
     <trkpt lat="43.6575770" lon="-79.3845970">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:22Z</time>
     </trkpt>
     <trkpt lat="43.6575810" lon="-79.3845970">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:24Z</time>
     </trkpt>
     <trkpt lat="43.6575830" lon="-79.3845950">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:25Z</time>
     </trkpt>
     <trkpt lat="43.6575840" lon="-79.3845920">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:27Z</time>
     </trkpt>
     <trkpt lat="43.6575840" lon="-79.3845790">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:29Z</time>
     </trkpt>
     <trkpt lat="43.6575820" lon="-79.3845700">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:30Z</time>
     </trkpt>
     <trkpt lat="43.6575790" lon="-79.3845590">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:31Z</time>
     </trkpt>
     <trkpt lat="43.6575750" lon="-79.3845500">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:32Z</time>
     </trkpt>
     <trkpt lat="43.6575560" lon="-79.3845390">
      <ele>96.5</ele>
      <time>2021-12-16T20:55:34Z</time>
     </trkpt>
     <trkpt lat="43.6575440" lon="-79.3845370">
      <ele>96.4</ele>
      <time>2021-12-16T20:55:35Z</time>
     </trkpt>
     <trkpt lat="43.6575120" lon="-79.3845410">
      <ele>96.4</ele>
      <time>2021-12-16T20:55:37Z</time>
     </trkpt>
     <trkpt lat="43.6575530" lon="-79.3845720">
      <ele>96.4</ele>
      <time>2021-12-16T20:55:39Z</time>
     </trkpt>
     <trkpt lat="43.6575450" lon="-79.3845730">
      <ele>96.4</ele>
      <time>2021-12-16T20:55:40Z</time>
     </trkpt>
     <trkpt lat="43.6575220" lon="-79.3845750">
      <ele>96.3</ele>
      <time>2021-12-16T20:55:41Z</time>
     </trkpt>
     <trkpt lat="43.6574890" lon="-79.3845850">
      <ele>96.3</ele>
      <time>2021-12-16T20:55:42Z</time>
     </trkpt>
     <trkpt lat="43.6574160" lon="-79.3846180">
      <ele>96.2</ele>
      <time>2021-12-16T20:55:44Z</time>
     </trkpt>
     <trkpt lat="43.6573750" lon="-79.3846450">
      <ele>96.1</ele>
      <time>2021-12-16T20:55:45Z</time>
     </trkpt>
     <trkpt lat="43.6573340" lon="-79.3846780">
      <ele>96.1</ele>
      <time>2021-12-16T20:55:46Z</time>
     </trkpt>
     <trkpt lat="43.6573050" lon="-79.3847020">
      <ele>96.0</ele>
      <time>2021-12-16T20:55:47Z</time>
     </trkpt>
     <trkpt lat="43.6572760" lon="-79.3847250">
      <ele>96.0</ele>
      <time>2021-12-16T20:55:48Z</time>
     </trkpt>
     <trkpt lat="43.6572440" lon="-79.3847410">
      <ele>96.0</ele>
      <time>2021-12-16T20:55:50Z</time>
     </trkpt>
     <trkpt lat="43.6572160" lon="-79.3847460">
      <ele>95.9</ele>
      <time>2021-12-16T20:55:51Z</time>
     </trkpt>
     <trkpt lat="43.6571690" lon="-79.3847310">
      <ele>95.8</ele>
      <time>2021-12-16T20:55:52Z</time>
     </trkpt>
     <trkpt lat="43.6571480" lon="-79.3847230">
      <ele>95.8</ele>
      <time>2021-12-16T20:55:53Z</time>
     </trkpt>
     <trkpt lat="43.6571100" lon="-79.3847000">
      <ele>95.7</ele>
      <time>2021-12-16T20:55:54Z</time>
     </trkpt>
     <trkpt lat="43.6570760" lon="-79.3846840">
      <ele>95.7</ele>
      <time>2021-12-16T20:55:55Z</time>
     </trkpt>
     <trkpt lat="43.6569920" lon="-79.3845930">
      <ele>95.6</ele>
      <time>2021-12-16T20:55:57Z</time>
     </trkpt>
     <trkpt lat="43.6569500" lon="-79.3845600">
      <ele>95.5</ele>
      <time>2021-12-16T20:55:58Z</time>
     </trkpt>
     <trkpt lat="43.6569110" lon="-79.3845280">
      <ele>95.5</ele>
      <time>2021-12-16T20:55:59Z</time>
     </trkpt>
     <trkpt lat="43.6568700" lon="-79.3844930">
      <ele>95.4</ele>
      <time>2021-12-16T20:56:00Z</time>
     </trkpt>
     <trkpt lat="43.6568230" lon="-79.3844420">
      <ele>95.3</ele>
      <time>2021-12-16T20:56:01Z</time>
     </trkpt>
     <trkpt lat="43.6567740" lon="-79.3844060">
      <ele>95.3</ele>
      <time>2021-12-16T20:56:02Z</time>
     </trkpt>
     <trkpt lat="43.6567090" lon="-79.3843800">
      <ele>95.2</ele>
      <time>2021-12-16T20:56:04Z</time>
     </trkpt>
     <trkpt lat="43.6566450" lon="-79.3843680">
      <ele>95.2</ele>
      <time>2021-12-16T20:56:06Z</time>
     </trkpt>
     <trkpt lat="43.6566020" lon="-79.3843650">
      <ele>95.1</ele>
      <time>2021-12-16T20:56:07Z</time>
     </trkpt>
     <trkpt lat="43.6565650" lon="-79.3843590">
      <ele>95.1</ele>
      <time>2021-12-16T20:56:08Z</time>
     </trkpt>
     <trkpt lat="43.6565260" lon="-79.3843500">
      <ele>95.0</ele>
      <time>2021-12-16T20:56:09Z</time>
     </trkpt>
     <trkpt lat="43.6564790" lon="-79.3843340">
      <ele>95.0</ele>
      <time>2021-12-16T20:56:10Z</time>
     </trkpt>
     <trkpt lat="43.6564460" lon="-79.3843180">
      <ele>94.9</ele>
      <time>2021-12-16T20:56:11Z</time>
     </trkpt>
     <trkpt lat="43.6564140" lon="-79.3843000">
      <ele>94.9</ele>
      <time>2021-12-16T20:56:12Z</time>
     </trkpt>
     <trkpt lat="43.6563870" lon="-79.3842900">
      <ele>94.9</ele>
      <time>2021-12-16T20:56:13Z</time>
     </trkpt>
     <trkpt lat="43.6563510" lon="-79.3842810">
      <ele>94.8</ele>
      <time>2021-12-16T20:56:15Z</time>
     </trkpt>
     <trkpt lat="43.6563220" lon="-79.3842710">
      <ele>94.7</ele>
      <time>2021-12-16T20:56:16Z</time>
     </trkpt>
     <trkpt lat="43.6562740" lon="-79.3842550">
      <ele>94.7</ele>
      <time>2021-12-16T20:56:17Z</time>
     </trkpt>
     <trkpt lat="43.6562360" lon="-79.3842430">
      <ele>94.6</ele>
      <time>2021-12-16T20:56:19Z</time>
     </trkpt>
     <trkpt lat="43.6562010" lon="-79.3842310">
      <ele>94.6</ele>
      <time>2021-12-16T20:56:20Z</time>
     </trkpt>
     <trkpt lat="43.6561650" lon="-79.3842190">
      <ele>94.5</ele>
      <time>2021-12-16T20:56:21Z</time>
     </trkpt>
     <trkpt lat="43.6561340" lon="-79.3842050">
      <ele>94.5</ele>
      <time>2021-12-16T20:56:22Z</time>
     </trkpt>
     <trkpt lat="43.6560950" lon="-79.3841860">
      <ele>94.4</ele>
      <time>2021-12-16T20:56:23Z</time>
     </trkpt>
     <trkpt lat="43.6560400" lon="-79.3841560">
      <ele>94.4</ele>
      <time>2021-12-16T20:56:25Z</time>
     </trkpt>
     <trkpt lat="43.6560090" lon="-79.3841320">
      <ele>94.4</ele>
      <time>2021-12-16T20:56:26Z</time>
     </trkpt>
     <trkpt lat="43.6559840" lon="-79.3841110">
      <ele>94.3</ele>
      <time>2021-12-16T20:56:27Z</time>
     </trkpt>
     <trkpt lat="43.6559600" lon="-79.3840890">
      <ele>94.3</ele>
      <time>2021-12-16T20:56:28Z</time>
     </trkpt>
     <trkpt lat="43.6559240" lon="-79.3840490">
      <ele>94.3</ele>
      <time>2021-12-16T20:56:29Z</time>
     </trkpt>
     <trkpt lat="43.6559080" lon="-79.3840320">
      <ele>94.2</ele>
      <time>2021-12-16T20:56:30Z</time>
     </trkpt>
     <trkpt lat="43.6558800" lon="-79.3840090">
      <ele>94.2</ele>
      <time>2021-12-16T20:56:31Z</time>
     </trkpt>
     <trkpt lat="43.6558510" lon="-79.3839890">
      <ele>94.2</ele>
      <time>2021-12-16T20:56:32Z</time>
     </trkpt>
     <trkpt lat="43.6558150" lon="-79.3839670">
      <ele>94.1</ele>
      <time>2021-12-16T20:56:34Z</time>
     </trkpt>
     <trkpt lat="43.6557840" lon="-79.3839490">
      <ele>94.1</ele>
      <time>2021-12-16T20:56:35Z</time>
     </trkpt>
     <trkpt lat="43.6557470" lon="-79.3839300">
      <ele>94.0</ele>
      <time>2021-12-16T20:56:36Z</time>
     </trkpt>
     <trkpt lat="43.6556970" lon="-79.3839070">
      <ele>94.0</ele>
      <time>2021-12-16T20:56:38Z</time>
     </trkpt>
     <trkpt lat="43.6556420" lon="-79.3838870">
      <ele>93.9</ele>
      <time>2021-12-16T20:56:39Z</time>
     </trkpt>
     <trkpt lat="43.6555980" lon="-79.3838760">
      <ele>93.9</ele>
      <time>2021-12-16T20:56:40Z</time>
     </trkpt>
     <trkpt lat="43.6555480" lon="-79.3838660">
      <ele>93.8</ele>
      <time>2021-12-16T20:56:42Z</time>
     </trkpt>
     <trkpt lat="43.6555080" lon="-79.3838580">
      <ele>93.7</ele>
      <time>2021-12-16T20:56:43Z</time>
     </trkpt>
     <trkpt lat="43.6554670" lon="-79.3838500">
      <ele>93.7</ele>
      <time>2021-12-16T20:56:44Z</time>
     </trkpt>
     <trkpt lat="43.6554010" lon="-79.3838250">
      <ele>93.5</ele>
      <time>2021-12-16T20:56:45Z</time>
     </trkpt>
     <trkpt lat="43.6553180" lon="-79.3837910">
      <ele>93.4</ele>
      <time>2021-12-16T20:56:47Z</time>
     </trkpt>
     <trkpt lat="43.6552900" lon="-79.3837780">
      <ele>93.3</ele>
      <time>2021-12-16T20:56:48Z</time>
     </trkpt>
     <trkpt lat="43.6552500" lon="-79.3837530">
      <ele>93.2</ele>
      <time>2021-12-16T20:56:50Z</time>
     </trkpt>
     <trkpt lat="43.6551910" lon="-79.3837360">
      <ele>93.1</ele>
      <time>2021-12-16T20:56:51Z</time>
     </trkpt>
     <trkpt lat="43.6551180" lon="-79.3837240">
      <ele>93.0</ele>
      <time>2021-12-16T20:56:52Z</time>
     </trkpt>
     <trkpt lat="43.6550710" lon="-79.3837120">
      <ele>92.9</ele>
      <time>2021-12-16T20:56:53Z</time>
     </trkpt>
     <trkpt lat="43.6550130" lon="-79.3836860">
      <ele>92.8</ele>
      <time>2021-12-16T20:56:55Z</time>
     </trkpt>
     <trkpt lat="43.6549650" lon="-79.3836510">
      <ele>92.7</ele>
      <time>2021-12-16T20:56:56Z</time>
     </trkpt>
     <trkpt lat="43.6549260" lon="-79.3835980">
      <ele>92.6</ele>
      <time>2021-12-16T20:56:57Z</time>
     </trkpt>
     <trkpt lat="43.6548920" lon="-79.3835420">
      <ele>92.5</ele>
      <time>2021-12-16T20:56:58Z</time>
     </trkpt>
     <trkpt lat="43.6548630" lon="-79.3834850">
      <ele>92.4</ele>
      <time>2021-12-16T20:56:59Z</time>
     </trkpt>
     <trkpt lat="43.6548340" lon="-79.3834100">
      <ele>92.3</ele>
      <time>2021-12-16T20:57:00Z</time>
     </trkpt>
     <trkpt lat="43.6547860" lon="-79.3833350">
      <ele>92.2</ele>
      <time>2021-12-16T20:57:02Z</time>
     </trkpt>
     <trkpt lat="43.6547530" lon="-79.3833020">
      <ele>92.2</ele>
      <time>2021-12-16T20:57:03Z</time>
     </trkpt>
     <trkpt lat="43.6547220" lon="-79.3832720">
      <ele>92.1</ele>
      <time>2021-12-16T20:57:04Z</time>
     </trkpt>
     <trkpt lat="43.6546890" lon="-79.3832420">
      <ele>92.1</ele>
      <time>2021-12-16T20:57:05Z</time>
     </trkpt>
     <trkpt lat="43.6546230" lon="-79.3832150">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:07Z</time>
     </trkpt>
     <trkpt lat="43.6545770" lon="-79.3832450">
      <ele>91.9</ele>
      <time>2021-12-16T20:57:08Z</time>
     </trkpt>
     <trkpt lat="43.6545380" lon="-79.3832760">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:09Z</time>
     </trkpt>
     <trkpt lat="43.6544890" lon="-79.3833330">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:10Z</time>
     </trkpt>
     <trkpt lat="43.6544590" lon="-79.3833740">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:11Z</time>
     </trkpt>
     <trkpt lat="43.6544300" lon="-79.3834240">
      <ele>91.7</ele>
      <time>2021-12-16T20:57:13Z</time>
     </trkpt>
     <trkpt lat="43.6543970" lon="-79.3834640">
      <ele>91.6</ele>
      <time>2021-12-16T20:57:14Z</time>
     </trkpt>
     <trkpt lat="43.6543780" lon="-79.3834910">
      <ele>91.5</ele>
      <time>2021-12-16T20:57:15Z</time>
     </trkpt>
     <trkpt lat="43.6543580" lon="-79.3835370">
      <ele>91.4</ele>
      <time>2021-12-16T20:57:17Z</time>
     </trkpt>
     <trkpt lat="43.6543420" lon="-79.3835910">
      <ele>91.3</ele>
      <time>2021-12-16T20:57:18Z</time>
     </trkpt>
     <trkpt lat="43.6543260" lon="-79.3836450">
      <ele>91.3</ele>
      <time>2021-12-16T20:57:19Z</time>
     </trkpt>
     <trkpt lat="43.6543110" lon="-79.3837040">
      <ele>91.2</ele>
      <time>2021-12-16T20:57:20Z</time>
     </trkpt>
     <trkpt lat="43.6543010" lon="-79.3837800">
      <ele>91.1</ele>
      <time>2021-12-16T20:57:21Z</time>
     </trkpt>
     <trkpt lat="43.6542910" lon="-79.3838840">
      <ele>91.0</ele>
      <time>2021-12-16T20:57:23Z</time>
     </trkpt>
     <trkpt lat="43.6542710" lon="-79.3839730">
      <ele>91.0</ele>
      <time>2021-12-16T20:57:24Z</time>
     </trkpt>
     <trkpt lat="43.6542330" lon="-79.3840840">
      <ele>91.3</ele>
      <time>2021-12-16T20:57:27Z</time>
     </trkpt>
     <trkpt lat="43.6542400" lon="-79.3841450">
      <ele>91.4</ele>
      <time>2021-12-16T20:57:28Z</time>
     </trkpt>
     <trkpt lat="43.6542330" lon="-79.3842080">
      <ele>91.6</ele>
      <time>2021-12-16T20:57:30Z</time>
     </trkpt>
     <trkpt lat="43.6542210" lon="-79.3842440">
      <ele>91.7</ele>
      <time>2021-12-16T20:57:31Z</time>
     </trkpt>
     <trkpt lat="43.6542070" lon="-79.3842930">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:32Z</time>
     </trkpt>
     <trkpt lat="43.6541900" lon="-79.3843520">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:33Z</time>
     </trkpt>
     <trkpt lat="43.6541700" lon="-79.3843920">
      <ele>92.1</ele>
      <time>2021-12-16T20:57:34Z</time>
     </trkpt>
     <trkpt lat="43.6541520" lon="-79.3844180">
      <ele>92.2</ele>
      <time>2021-12-16T20:57:35Z</time>
     </trkpt>
     <trkpt lat="43.6541330" lon="-79.3844530">
      <ele>92.3</ele>
      <time>2021-12-16T20:57:37Z</time>
     </trkpt>
     <trkpt lat="43.6541160" lon="-79.3844900">
      <ele>92.4</ele>
      <time>2021-12-16T20:57:38Z</time>
     </trkpt>
     <trkpt lat="43.6540980" lon="-79.3845250">
      <ele>92.6</ele>
      <time>2021-12-16T20:57:39Z</time>
     </trkpt>
     <trkpt lat="43.6540810" lon="-79.3845740">
      <ele>92.4</ele>
      <time>2021-12-16T20:57:40Z</time>
     </trkpt>
     <trkpt lat="43.6540610" lon="-79.3846420">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:42Z</time>
     </trkpt>
     <trkpt lat="43.6540430" lon="-79.3846960">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:44Z</time>
     </trkpt>
     <trkpt lat="43.6540270" lon="-79.3847440">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:45Z</time>
     </trkpt>
     <trkpt lat="43.6540100" lon="-79.3847930">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:46Z</time>
     </trkpt>
     <trkpt lat="43.6539900" lon="-79.3848530">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:47Z</time>
     </trkpt>
     <trkpt lat="43.6539760" lon="-79.3848990">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:48Z</time>
     </trkpt>
     <trkpt lat="43.6539630" lon="-79.3849430">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:49Z</time>
     </trkpt>
     <trkpt lat="43.6539480" lon="-79.3849950">
      <ele>91.8</ele>
      <time>2021-12-16T20:57:50Z</time>
     </trkpt>
     <trkpt lat="43.6539300" lon="-79.3850470">
      <ele>91.9</ele>
      <time>2021-12-16T20:57:51Z</time>
     </trkpt>
     <trkpt lat="43.6539030" lon="-79.3851070">
      <ele>91.9</ele>
      <time>2021-12-16T20:57:52Z</time>
     </trkpt>
     <trkpt lat="43.6538980" lon="-79.3851490">
      <ele>91.9</ele>
      <time>2021-12-16T20:57:53Z</time>
     </trkpt>
     <trkpt lat="43.6538970" lon="-79.3851780">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:54Z</time>
     </trkpt>
     <trkpt lat="43.6538810" lon="-79.3852320">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:56Z</time>
     </trkpt>
     <trkpt lat="43.6538910" lon="-79.3852470">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:57Z</time>
     </trkpt>
     <trkpt lat="43.6538890" lon="-79.3852690">
      <ele>92.0</ele>
      <time>2021-12-16T20:57:58Z</time>
     </trkpt>
     <trkpt lat="43.6538860" lon="-79.3852920">
      <ele>92.1</ele>
      <time>2021-12-16T20:57:59Z</time>
     </trkpt>
     <trkpt lat="43.6538850" lon="-79.3853280">
      <ele>92.3</ele>
      <time>2021-12-16T20:58:01Z</time>
     </trkpt>
     <trkpt lat="43.6538690" lon="-79.3853590">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:02Z</time>
     </trkpt>
     <trkpt lat="43.6538540" lon="-79.3853940">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:04Z</time>
     </trkpt>
     <trkpt lat="43.6538440" lon="-79.3854070">
      <ele>92.3</ele>
      <time>2021-12-16T20:58:05Z</time>
     </trkpt>
     <trkpt lat="43.6538400" lon="-79.3854360">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:07Z</time>
     </trkpt>
     <trkpt lat="43.6538380" lon="-79.3854500">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:08Z</time>
     </trkpt>
     <trkpt lat="43.6538380" lon="-79.3854610">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:09Z</time>
     </trkpt>
     <trkpt lat="43.6538420" lon="-79.3854720">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:11Z</time>
     </trkpt>
     <trkpt lat="43.6538640" lon="-79.3854820">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:13Z</time>
     </trkpt>
     <trkpt lat="43.6538920" lon="-79.3854910">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:15Z</time>
     </trkpt>
     <trkpt lat="43.6539070" lon="-79.3854930">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:16Z</time>
     </trkpt>
     <trkpt lat="43.6539390" lon="-79.3855010">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:18Z</time>
     </trkpt>
     <trkpt lat="43.6539690" lon="-79.3855130">
      <ele>92.4</ele>
      <time>2021-12-16T20:58:20Z</time>
     </trkpt>
     <trkpt lat="43.6539940" lon="-79.3855230">
      <ele>92.5</ele>
      <time>2021-12-16T20:58:22Z</time>
     </trkpt>
     <trkpt lat="43.6540100" lon="-79.3855340">
      <ele>92.5</ele>
      <time>2021-12-16T20:58:24Z</time>
     </trkpt>
     <trkpt lat="43.6540110" lon="-79.3855430">
      <ele>92.5</ele>
      <time>2021-12-16T20:58:25Z</time>
     </trkpt>
     <trkpt lat="43.6540130" lon="-79.3855550">
      <ele>92.5</ele>
      <time>2021-12-16T20:58:26Z</time>
     </trkpt>
     <trkpt lat="43.6540120" lon="-79.3855700">
      <ele>92.5</ele>
      <time>2021-12-16T20:58:28Z</time>
     </trkpt>
     <trkpt lat="43.6533380" lon="-79.3856200">
      <ele>91.5</ele>
      <time>2021-12-16T20:59:32Z</time>
     </trkpt>
     <trkpt lat="43.6533360" lon="-79.3855970">
      <ele>91.5</ele>
      <time>2021-12-16T20:59:34Z</time>
     </trkpt>
     <trkpt lat="43.6533400" lon="-79.3855880">
      <ele>91.5</ele>
      <time>2021-12-16T20:59:35Z</time>
     </trkpt>
     <trkpt lat="43.6533540" lon="-79.3855650">
      <ele>91.6</ele>
      <time>2021-12-16T20:59:37Z</time>
     </trkpt>
     <trkpt lat="43.6534200" lon="-79.3855260">
      <ele>91.6</ele>
      <time>2021-12-16T20:59:39Z</time>
     </trkpt>
     <trkpt lat="43.6535070" lon="-79.3854880">
      <ele>91.7</ele>
      <time>2021-12-16T20:59:41Z</time>
     </trkpt>
     <trkpt lat="43.6535360" lon="-79.3854870">
      <ele>91.7</ele>
      <time>2021-12-16T20:59:43Z</time>
     </trkpt>
     <trkpt lat="43.6536270" lon="-79.3854890">
      <ele>91.8</ele>
      <time>2021-12-16T20:59:45Z</time>
     </trkpt>
     <trkpt lat="43.6536380" lon="-79.3854920">
      <ele>91.9</ele>
      <time>2021-12-16T20:59:46Z</time>
     </trkpt>
     <trkpt lat="43.6536620" lon="-79.3854970">
      <ele>91.9</ele>
      <time>2021-12-16T20:59:48Z</time>
     </trkpt>
     <trkpt lat="43.6536710" lon="-79.3854940">
      <ele>91.9</ele>
      <time>2021-12-16T20:59:50Z</time>
     </trkpt>
     <trkpt lat="43.6536760" lon="-79.3855000">
      <ele>91.9</ele>
      <time>2021-12-16T20:59:52Z</time>
     </trkpt>
     <trkpt lat="43.6536750" lon="-79.3855070">
      <ele>92.0</ele>
      <time>2021-12-16T20:59:54Z</time>
     </trkpt>
     <trkpt lat="43.6536730" lon="-79.3855070">
      <ele>92.0</ele>
      <time>2021-12-16T20:59:55Z</time>
     </trkpt>
     <trkpt lat="43.6536790" lon="-79.3855130">
      <ele>92.0</ele>
      <time>2021-12-16T20:59:56Z</time>
     </trkpt>
     <trkpt lat="43.6537230" lon="-79.3855160">
      <ele>92.1</ele>
      <time>2021-12-16T20:59:58Z</time>
     </trkpt>
     <trkpt lat="43.6537690" lon="-79.3855230">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:00Z</time>
     </trkpt>
     <trkpt lat="43.6537980" lon="-79.3855380">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:01Z</time>
     </trkpt>
     <trkpt lat="43.6538080" lon="-79.3855460">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:02Z</time>
     </trkpt>
     <trkpt lat="43.6538200" lon="-79.3855860">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:03Z</time>
     </trkpt>
     <trkpt lat="43.6538210" lon="-79.3856010">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:04Z</time>
     </trkpt>
     <trkpt lat="43.6538340" lon="-79.3856550">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:05Z</time>
     </trkpt>
     <trkpt lat="43.6538110" lon="-79.3856850">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:06Z</time>
     </trkpt>
     <trkpt lat="43.6537820" lon="-79.3857000">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:08Z</time>
     </trkpt>
     <trkpt lat="43.6537660" lon="-79.3856990">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:09Z</time>
     </trkpt>
     <trkpt lat="43.6537110" lon="-79.3856480">
      <ele>92.0</ele>
      <time>2021-12-16T21:00:10Z</time>
     </trkpt>
     <trkpt lat="43.6536500" lon="-79.3855730">
      <ele>92.1</ele>
      <time>2021-12-16T21:00:12Z</time>
     </trkpt>
     <trkpt lat="43.6535960" lon="-79.3855200">
      <ele>91.9</ele>
      <time>2021-12-16T21:00:13Z</time>
     </trkpt>
     <trkpt lat="43.6535670" lon="-79.3854910">
      <ele>91.7</ele>
      <time>2021-12-16T21:00:14Z</time>
     </trkpt>
     <trkpt lat="43.6535070" lon="-79.3854000">
      <ele>91.2</ele>
      <time>2021-12-16T21:00:15Z</time>
     </trkpt>
     <trkpt lat="43.6534660" lon="-79.3853340">
      <ele>91.1</ele>
      <time>2021-12-16T21:00:16Z</time>
     </trkpt>
     <trkpt lat="43.6534360" lon="-79.3852940">
      <ele>91.1</ele>
      <time>2021-12-16T21:00:18Z</time>
     </trkpt>
     <trkpt lat="43.6534110" lon="-79.3852560">
      <ele>91.1</ele>
      <time>2021-12-16T21:00:19Z</time>
     </trkpt>
     <trkpt lat="43.6533940" lon="-79.3852200">
      <ele>91.0</ele>
      <time>2021-12-16T21:00:20Z</time>
     </trkpt>
     <trkpt lat="43.6533770" lon="-79.3851630">
      <ele>91.0</ele>
      <time>2021-12-16T21:00:21Z</time>
     </trkpt>
     <trkpt lat="43.6533760" lon="-79.3851250">
      <ele>91.0</ele>
      <time>2021-12-16T21:00:22Z</time>
     </trkpt>
     <trkpt lat="43.6533740" lon="-79.3850620">
      <ele>91.0</ele>
      <time>2021-12-16T21:00:23Z</time>
     </trkpt>
     <trkpt lat="43.6533640" lon="-79.3849720">
      <ele>90.9</ele>
      <time>2021-12-16T21:00:25Z</time>
     </trkpt>
     <trkpt lat="43.6533520" lon="-79.3849220">
      <ele>90.9</ele>
      <time>2021-12-16T21:00:26Z</time>
     </trkpt>
     <trkpt lat="43.6533380" lon="-79.3848730">
      <ele>90.9</ele>
      <time>2021-12-16T21:00:27Z</time>
     </trkpt>
     <trkpt lat="43.6533340" lon="-79.3848570">
      <ele>90.9</ele>
      <time>2021-12-16T21:00:28Z</time>
     </trkpt>
     <trkpt lat="43.6533230" lon="-79.3848080">
      <ele>90.8</ele>
      <time>2021-12-16T21:00:29Z</time>
     </trkpt>
     <trkpt lat="43.6533180" lon="-79.3847900">
      <ele>90.8</ele>
      <time>2021-12-16T21:00:30Z</time>
     </trkpt>
     <trkpt lat="43.6533060" lon="-79.3847560">
      <ele>90.8</ele>
      <time>2021-12-16T21:00:31Z</time>
     </trkpt>
     <trkpt lat="43.6532860" lon="-79.3847170">
      <ele>90.7</ele>
      <time>2021-12-16T21:00:32Z</time>
     </trkpt>
     <trkpt lat="43.6532770" lon="-79.3847040">
      <ele>90.7</ele>
      <time>2021-12-16T21:00:33Z</time>
     </trkpt>
     <trkpt lat="43.6532480" lon="-79.3846730">
      <ele>90.7</ele>
      <time>2021-12-16T21:00:35Z</time>
     </trkpt>
     <trkpt lat="43.6532150" lon="-79.3846500">
      <ele>90.7</ele>
      <time>2021-12-16T21:00:36Z</time>
     </trkpt>
     <trkpt lat="43.6531830" lon="-79.3846440">
      <ele>90.6</ele>
      <time>2021-12-16T21:00:37Z</time>
     </trkpt>
     <trkpt lat="43.6531390" lon="-79.3846370">
      <ele>90.6</ele>
      <time>2021-12-16T21:00:38Z</time>
     </trkpt>
     <trkpt lat="43.6530820" lon="-79.3846220">
      <ele>90.6</ele>
      <time>2021-12-16T21:00:40Z</time>
     </trkpt>
     <trkpt lat="43.6530530" lon="-79.3846110">
      <ele>90.6</ele>
      <time>2021-12-16T21:00:41Z</time>
     </trkpt>
     <trkpt lat="43.6530280" lon="-79.3845950">
      <ele>90.5</ele>
      <time>2021-12-16T21:00:42Z</time>
     </trkpt>
     <trkpt lat="43.6530020" lon="-79.3845770">
      <ele>90.5</ele>
      <time>2021-12-16T21:00:43Z</time>
     </trkpt>
     <trkpt lat="43.6529730" lon="-79.3845580">
      <ele>90.5</ele>
      <time>2021-12-16T21:00:44Z</time>
     </trkpt>
     <trkpt lat="43.6529460" lon="-79.3845390">
      <ele>90.5</ele>
      <time>2021-12-16T21:00:45Z</time>
     </trkpt>
     <trkpt lat="43.6529120" lon="-79.3845090">
      <ele>90.4</ele>
      <time>2021-12-16T21:00:46Z</time>
     </trkpt>
     <trkpt lat="43.6529000" lon="-79.3844990">
      <ele>90.4</ele>
      <time>2021-12-16T21:00:47Z</time>
     </trkpt>
     <trkpt lat="43.6528670" lon="-79.3844740">
      <ele>90.4</ele>
      <time>2021-12-16T21:00:49Z</time>
     </trkpt>
     <trkpt lat="43.6528390" lon="-79.3844520">
      <ele>90.4</ele>
      <time>2021-12-16T21:00:50Z</time>
     </trkpt>
     <trkpt lat="43.6527970" lon="-79.3844160">
      <ele>90.3</ele>
      <time>2021-12-16T21:00:51Z</time>
     </trkpt>
     <trkpt lat="43.6527580" lon="-79.3843710">
      <ele>90.3</ele>
      <time>2021-12-16T21:00:53Z</time>
     </trkpt>
     <trkpt lat="43.6527320" lon="-79.3843270">
      <ele>90.3</ele>
      <time>2021-12-16T21:00:54Z</time>
     </trkpt>
     <trkpt lat="43.6526990" lon="-79.3842800">
      <ele>90.2</ele>
      <time>2021-12-16T21:00:56Z</time>
     </trkpt>
     <trkpt lat="43.6526870" lon="-79.3842640">
      <ele>90.2</ele>
      <time>2021-12-16T21:00:57Z</time>
     </trkpt>
     <trkpt lat="43.6526750" lon="-79.3842470">
      <ele>90.2</ele>
      <time>2021-12-16T21:00:58Z</time>
     </trkpt>
     <trkpt lat="43.6526570" lon="-79.3842200">
      <ele>90.2</ele>
      <time>2021-12-16T21:00:59Z</time>
     </trkpt>
     <trkpt lat="43.6526470" lon="-79.3841850">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:00Z</time>
     </trkpt>
     <trkpt lat="43.6526440" lon="-79.3841700">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:01Z</time>
     </trkpt>
     <trkpt lat="43.6526520" lon="-79.3840860">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:02Z</time>
     </trkpt>
     <trkpt lat="43.6526420" lon="-79.3840450">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:03Z</time>
     </trkpt>
     <trkpt lat="43.6526190" lon="-79.3840230">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:04Z</time>
     </trkpt>
     <trkpt lat="43.6525760" lon="-79.3840070">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:06Z</time>
     </trkpt>
     <trkpt lat="43.6525300" lon="-79.3839970">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:07Z</time>
     </trkpt>
     <trkpt lat="43.6524940" lon="-79.3839760">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:08Z</time>
     </trkpt>
     <trkpt lat="43.6524440" lon="-79.3839440">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:10Z</time>
     </trkpt>
     <trkpt lat="43.6523850" lon="-79.3839060">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:11Z</time>
     </trkpt>
     <trkpt lat="43.6523470" lon="-79.3838880">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:13Z</time>
     </trkpt>
     <trkpt lat="43.6523040" lon="-79.3838700">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:14Z</time>
     </trkpt>
     <trkpt lat="43.6522740" lon="-79.3838590">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:15Z</time>
     </trkpt>
     <trkpt lat="43.6522270" lon="-79.3838380">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:17Z</time>
     </trkpt>
     <trkpt lat="43.6522110" lon="-79.3838310">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:18Z</time>
     </trkpt>
     <trkpt lat="43.6521950" lon="-79.3838250">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:19Z</time>
     </trkpt>
     <trkpt lat="43.6521690" lon="-79.3838120">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:20Z</time>
     </trkpt>
     <trkpt lat="43.6521430" lon="-79.3838020">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:21Z</time>
     </trkpt>
     <trkpt lat="43.6521030" lon="-79.3837830">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:22Z</time>
     </trkpt>
     <trkpt lat="43.6520630" lon="-79.3837630">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:24Z</time>
     </trkpt>
     <trkpt lat="43.6520240" lon="-79.3837510">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:25Z</time>
     </trkpt>
     <trkpt lat="43.6520090" lon="-79.3837470">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:26Z</time>
     </trkpt>
     <trkpt lat="43.6519660" lon="-79.3837260">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:28Z</time>
     </trkpt>
     <trkpt lat="43.6519510" lon="-79.3837190">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:29Z</time>
     </trkpt>
     <trkpt lat="43.6519350" lon="-79.3837110">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:30Z</time>
     </trkpt>
     <trkpt lat="43.6518990" lon="-79.3837040">
      <ele>90.1</ele>
      <time>2021-12-16T21:01:31Z</time>
     </trkpt>
     <trkpt lat="43.6518600" lon="-79.3836970">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:33Z</time>
     </trkpt>
     <trkpt lat="43.6518330" lon="-79.3836910">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:34Z</time>
     </trkpt>
     <trkpt lat="43.6518060" lon="-79.3836830">
      <ele>90.0</ele>
      <time>2021-12-16T21:01:35Z</time>
     </trkpt>
     <trkpt lat="43.6517650" lon="-79.3836650">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:36Z</time>
     </trkpt>
     <trkpt lat="43.6517500" lon="-79.3836570">
      <ele>89.9</ele>
      <time>2021-12-16T21:01:37Z</time>
     </trkpt>
     <trkpt lat="43.6517140" lon="-79.3836340">
      <ele>89.8</ele>
      <time>2021-12-16T21:01:39Z</time>
     </trkpt>
     <trkpt lat="43.6516780" lon="-79.3836100">
      <ele>89.8</ele>
      <time>2021-12-16T21:01:41Z</time>
     </trkpt>
     <trkpt lat="43.6516490" lon="-79.3835680">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:42Z</time>
     </trkpt>
     <trkpt lat="43.6516400" lon="-79.3835440">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:43Z</time>
     </trkpt>
     <trkpt lat="43.6516370" lon="-79.3835060">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:44Z</time>
     </trkpt>
     <trkpt lat="43.6516390" lon="-79.3834580">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:46Z</time>
     </trkpt>
     <trkpt lat="43.6516570" lon="-79.3833980">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:47Z</time>
     </trkpt>
     <trkpt lat="43.6516700" lon="-79.3833530">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:49Z</time>
     </trkpt>
     <trkpt lat="43.6516900" lon="-79.3832990">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:50Z</time>
     </trkpt>
     <trkpt lat="43.6517050" lon="-79.3832500">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:51Z</time>
     </trkpt>
     <trkpt lat="43.6517190" lon="-79.3832020">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:53Z</time>
     </trkpt>
     <trkpt lat="43.6517420" lon="-79.3831420">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:54Z</time>
     </trkpt>
     <trkpt lat="43.6517600" lon="-79.3830990">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:55Z</time>
     </trkpt>
     <trkpt lat="43.6517730" lon="-79.3830640">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:56Z</time>
     </trkpt>
     <trkpt lat="43.6517930" lon="-79.3829970">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:58Z</time>
     </trkpt>
     <trkpt lat="43.6518000" lon="-79.3829740">
      <ele>89.7</ele>
      <time>2021-12-16T21:01:59Z</time>
     </trkpt>
     <trkpt lat="43.6518070" lon="-79.3829510">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:00Z</time>
     </trkpt>
     <trkpt lat="43.6518160" lon="-79.3829150">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:01Z</time>
     </trkpt>
     <trkpt lat="43.6518260" lon="-79.3828790">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:02Z</time>
     </trkpt>
     <trkpt lat="43.6518370" lon="-79.3828230">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:03Z</time>
     </trkpt>
     <trkpt lat="43.6518400" lon="-79.3828010">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:04Z</time>
     </trkpt>
     <trkpt lat="43.6518470" lon="-79.3827480">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:05Z</time>
     </trkpt>
     <trkpt lat="43.6518490" lon="-79.3827290">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:06Z</time>
     </trkpt>
     <trkpt lat="43.6518520" lon="-79.3826890">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:07Z</time>
     </trkpt>
     <trkpt lat="43.6518600" lon="-79.3826470">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:08Z</time>
     </trkpt>
     <trkpt lat="43.6518710" lon="-79.3825990">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:10Z</time>
     </trkpt>
     <trkpt lat="43.6518830" lon="-79.3825600">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:11Z</time>
     </trkpt>
     <trkpt lat="43.6518960" lon="-79.3825060">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:12Z</time>
     </trkpt>
     <trkpt lat="43.6519010" lon="-79.3824840">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:13Z</time>
     </trkpt>
     <trkpt lat="43.6519090" lon="-79.3824270">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:15Z</time>
     </trkpt>
     <trkpt lat="43.6519100" lon="-79.3823880">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:16Z</time>
     </trkpt>
     <trkpt lat="43.6519030" lon="-79.3823320">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:17Z</time>
     </trkpt>
     <trkpt lat="43.6518950" lon="-79.3822840">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:18Z</time>
     </trkpt>
     <trkpt lat="43.6518870" lon="-79.3822350">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:19Z</time>
     </trkpt>
     <trkpt lat="43.6518870" lon="-79.3821730">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:21Z</time>
     </trkpt>
     <trkpt lat="43.6518890" lon="-79.3821430">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:22Z</time>
     </trkpt>
     <trkpt lat="43.6518850" lon="-79.3820910">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:24Z</time>
     </trkpt>
     <trkpt lat="43.6518800" lon="-79.3820570">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:26Z</time>
     </trkpt>
     <trkpt lat="43.6518750" lon="-79.3820430">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:28Z</time>
     </trkpt>
     <trkpt lat="43.6518740" lon="-79.3820480">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:29Z</time>
     </trkpt>
     <trkpt lat="43.6518740" lon="-79.3820670">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:31Z</time>
     </trkpt>
     <trkpt lat="43.6518760" lon="-79.3820810">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:32Z</time>
     </trkpt>
     <trkpt lat="43.6518770" lon="-79.3820920">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:33Z</time>
     </trkpt>
     <trkpt lat="43.6518790" lon="-79.3821020">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:35Z</time>
     </trkpt>
     <trkpt lat="43.6518780" lon="-79.3821040">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:36Z</time>
     </trkpt>
     <trkpt lat="43.6518780" lon="-79.3821060">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:38Z</time>
     </trkpt>
     <trkpt lat="43.6518770" lon="-79.3821050">
      <ele>89.7</ele>
      <time>2021-12-16T21:02:39Z</time>
     </trkpt>
     <trkpt lat="43.6518730" lon="-79.3821100">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:41Z</time>
     </trkpt>
     <trkpt lat="43.6518710" lon="-79.3821140">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:42Z</time>
     </trkpt>
     <trkpt lat="43.6518680" lon="-79.3821300">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:44Z</time>
     </trkpt>
     <trkpt lat="43.6518620" lon="-79.3821480">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:46Z</time>
     </trkpt>
     <trkpt lat="43.6518740" lon="-79.3821020">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:48Z</time>
     </trkpt>
     <trkpt lat="43.6518760" lon="-79.3820910">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:49Z</time>
     </trkpt>
     <trkpt lat="43.6518760" lon="-79.3820800">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:50Z</time>
     </trkpt>
     <trkpt lat="43.6518760" lon="-79.3820600">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:51Z</time>
     </trkpt>
     <trkpt lat="43.6518780" lon="-79.3820320">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:53Z</time>
     </trkpt>
     <trkpt lat="43.6518800" lon="-79.3819800">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:54Z</time>
     </trkpt>
     <trkpt lat="43.6518810" lon="-79.3819570">
      <ele>89.6</ele>
      <time>2021-12-16T21:02:55Z</time>
     </trkpt>
     <trkpt lat="43.6518830" lon="-79.3818540">
      <ele>89.5</ele>
      <time>2021-12-16T21:02:57Z</time>
     </trkpt>
     <trkpt lat="43.6518720" lon="-79.3817940">
      <ele>89.4</ele>
      <time>2021-12-16T21:02:58Z</time>
     </trkpt>
     <trkpt lat="43.6518490" lon="-79.3817500">
      <ele>89.3</ele>
      <time>2021-12-16T21:03:00Z</time>
     </trkpt>
     <trkpt lat="43.6518060" lon="-79.3817120">
      <ele>89.1</ele>
      <time>2021-12-16T21:03:01Z</time>
     </trkpt>
     <trkpt lat="43.6517740" lon="-79.3816910">
      <ele>89.0</ele>
      <time>2021-12-16T21:03:02Z</time>
     </trkpt>
     <trkpt lat="43.6517400" lon="-79.3816760">
      <ele>88.9</ele>
      <time>2021-12-16T21:03:03Z</time>
     </trkpt>
     <trkpt lat="43.6517060" lon="-79.3816630">
      <ele>88.9</ele>
      <time>2021-12-16T21:03:04Z</time>
     </trkpt>
     <trkpt lat="43.6516720" lon="-79.3816430">
      <ele>88.8</ele>
      <time>2021-12-16T21:03:05Z</time>
     </trkpt>
     <trkpt lat="43.6516370" lon="-79.3816230">
      <ele>88.8</ele>
      <time>2021-12-16T21:03:06Z</time>
     </trkpt>
     <trkpt lat="43.6516010" lon="-79.3816030">
      <ele>88.7</ele>
      <time>2021-12-16T21:03:08Z</time>
     </trkpt>
     <trkpt lat="43.6515670" lon="-79.3815830">
      <ele>88.6</ele>
      <time>2021-12-16T21:03:09Z</time>
     </trkpt>
     <trkpt lat="43.6515260" lon="-79.3815590">
      <ele>88.6</ele>
      <time>2021-12-16T21:03:10Z</time>
     </trkpt>
     <trkpt lat="43.6514730" lon="-79.3815260">
      <ele>88.5</ele>
      <time>2021-12-16T21:03:12Z</time>
     </trkpt>
     <trkpt lat="43.6514470" lon="-79.3815100">
      <ele>88.4</ele>
      <time>2021-12-16T21:03:13Z</time>
     </trkpt>
     <trkpt lat="43.6514160" lon="-79.3814920">
      <ele>88.4</ele>
      <time>2021-12-16T21:03:14Z</time>
     </trkpt>
     <trkpt lat="43.6513830" lon="-79.3814740">
      <ele>88.3</ele>
      <time>2021-12-16T21:03:15Z</time>
     </trkpt>
     <trkpt lat="43.6513570" lon="-79.3814580">
      <ele>88.3</ele>
      <time>2021-12-16T21:03:16Z</time>
     </trkpt>
     <trkpt lat="43.6513210" lon="-79.3814380">
      <ele>88.2</ele>
      <time>2021-12-16T21:03:17Z</time>
     </trkpt>
     <trkpt lat="43.6513090" lon="-79.3814330">
      <ele>88.2</ele>
      <time>2021-12-16T21:03:18Z</time>
     </trkpt>
     <trkpt lat="43.6512800" lon="-79.3814200">
      <ele>88.2</ele>
      <time>2021-12-16T21:03:19Z</time>
     </trkpt>
     <trkpt lat="43.6512690" lon="-79.3814160">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:20Z</time>
     </trkpt>
     <trkpt lat="43.6512350" lon="-79.3814010">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:22Z</time>
     </trkpt>
     <trkpt lat="43.6512200" lon="-79.3813750">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:24Z</time>
     </trkpt>
     <trkpt lat="43.6512170" lon="-79.3813660">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:25Z</time>
     </trkpt>
     <trkpt lat="43.6512120" lon="-79.3813490">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:27Z</time>
     </trkpt>
     <trkpt lat="43.6512130" lon="-79.3813460">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:28Z</time>
     </trkpt>
     <trkpt lat="43.6512230" lon="-79.3813520">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:30Z</time>
     </trkpt>
     <trkpt lat="43.6512300" lon="-79.3813610">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:31Z</time>
     </trkpt>
     <trkpt lat="43.6512370" lon="-79.3813830">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:33Z</time>
     </trkpt>
     <trkpt lat="43.6512380" lon="-79.3813880">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:34Z</time>
     </trkpt>
     <trkpt lat="43.6512370" lon="-79.3813980">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:36Z</time>
     </trkpt>
     <trkpt lat="43.6512350" lon="-79.3814010">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:37Z</time>
     </trkpt>
     <trkpt lat="43.6512310" lon="-79.3814050">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:39Z</time>
     </trkpt>
     <trkpt lat="43.6512330" lon="-79.3814230">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:40Z</time>
     </trkpt>
     <trkpt lat="43.6512350" lon="-79.3814300">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:41Z</time>
     </trkpt>
     <trkpt lat="43.6512460" lon="-79.3814310">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:43Z</time>
     </trkpt>
     <trkpt lat="43.6512540" lon="-79.3814310">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:44Z</time>
     </trkpt>
     <trkpt lat="43.6512600" lon="-79.3814250">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:45Z</time>
     </trkpt>
     <trkpt lat="43.6512600" lon="-79.3814260">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:46Z</time>
     </trkpt>
     <trkpt lat="43.6512590" lon="-79.3814310">
      <ele>88.1</ele>
      <time>2021-12-16T21:03:47Z</time>
     </trkpt>
     <trkpt lat="43.6512510" lon="-79.3814450">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:49Z</time>
     </trkpt>
     <trkpt lat="43.6512410" lon="-79.3814630">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:51Z</time>
     </trkpt>
     <trkpt lat="43.6512370" lon="-79.3814740">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:52Z</time>
     </trkpt>
     <trkpt lat="43.6512320" lon="-79.3814920">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:54Z</time>
     </trkpt>
     <trkpt lat="43.6512320" lon="-79.3815040">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:56Z</time>
     </trkpt>
     <trkpt lat="43.6512300" lon="-79.3815090">
      <ele>88.0</ele>
      <time>2021-12-16T21:03:58Z</time>
     </trkpt>
     <trkpt lat="43.6512280" lon="-79.3815090">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:00Z</time>
     </trkpt>
     <trkpt lat="43.6512440" lon="-79.3814990">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:02Z</time>
     </trkpt>
     <trkpt lat="43.6512610" lon="-79.3814830">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:04Z</time>
     </trkpt>
     <trkpt lat="43.6512670" lon="-79.3814780">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:05Z</time>
     </trkpt>
     <trkpt lat="43.6512700" lon="-79.3814760">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:06Z</time>
     </trkpt>
     <trkpt lat="43.6512710" lon="-79.3814800">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:07Z</time>
     </trkpt>
     <trkpt lat="43.6512730" lon="-79.3814820">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:09Z</time>
     </trkpt>
     <trkpt lat="43.6512750" lon="-79.3814840">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:10Z</time>
     </trkpt>
     <trkpt lat="43.6512370" lon="-79.3814350">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:12Z</time>
     </trkpt>
     <trkpt lat="43.6512170" lon="-79.3814130">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:13Z</time>
     </trkpt>
     <trkpt lat="43.6512090" lon="-79.3814100">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:14Z</time>
     </trkpt>
     <trkpt lat="43.6512010" lon="-79.3814130">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:16Z</time>
     </trkpt>
     <trkpt lat="43.6511830" lon="-79.3814170">
      <ele>88.0</ele>
      <time>2021-12-16T21:04:17Z</time>
     </trkpt>
     <trkpt lat="43.6511360" lon="-79.3814250">
      <ele>87.9</ele>
      <time>2021-12-16T21:04:19Z</time>
     </trkpt>
     <trkpt lat="43.6510830" lon="-79.3814320">
      <ele>87.9</ele>
      <time>2021-12-16T21:04:20Z</time>
     </trkpt>
     <trkpt lat="43.6510370" lon="-79.3814290">
      <ele>87.8</ele>
      <time>2021-12-16T21:04:22Z</time>
     </trkpt>
     <trkpt lat="43.6510040" lon="-79.3814170">
      <ele>87.8</ele>
      <time>2021-12-16T21:04:23Z</time>
     </trkpt>
     <trkpt lat="43.6509710" lon="-79.3814040">
      <ele>87.8</ele>
      <time>2021-12-16T21:04:24Z</time>
     </trkpt>
     <trkpt lat="43.6509410" lon="-79.3813770">
      <ele>87.8</ele>
      <time>2021-12-16T21:04:25Z</time>
     </trkpt>
     <trkpt lat="43.6509050" lon="-79.3813390">
      <ele>87.7</ele>
      <time>2021-12-16T21:04:26Z</time>
     </trkpt>
     <trkpt lat="43.6508770" lon="-79.3813050">
      <ele>87.7</ele>
      <time>2021-12-16T21:04:27Z</time>
     </trkpt>
     <trkpt lat="43.6508470" lon="-79.3812860">
      <ele>87.7</ele>
      <time>2021-12-16T21:04:28Z</time>
     </trkpt>
     <trkpt lat="43.6508110" lon="-79.3812720">
      <ele>87.6</ele>
      <time>2021-12-16T21:04:29Z</time>
     </trkpt>
     <trkpt lat="43.6507690" lon="-79.3812570">
      <ele>87.6</ele>
      <time>2021-12-16T21:04:30Z</time>
     </trkpt>
     <trkpt lat="43.6507360" lon="-79.3812430">
      <ele>87.6</ele>
      <time>2021-12-16T21:04:31Z</time>
     </trkpt>
     <trkpt lat="43.6506920" lon="-79.3812240">
      <ele>87.5</ele>
      <time>2021-12-16T21:04:33Z</time>
     </trkpt>
     <trkpt lat="43.6506610" lon="-79.3812120">
      <ele>87.5</ele>
      <time>2021-12-16T21:04:34Z</time>
     </trkpt>
     <trkpt lat="43.6506160" lon="-79.3811940">
      <ele>87.5</ele>
      <time>2021-12-16T21:04:36Z</time>
     </trkpt>
     <trkpt lat="43.6505770" lon="-79.3811840">
      <ele>87.5</ele>
      <time>2021-12-16T21:04:37Z</time>
     </trkpt>
     <trkpt lat="43.6505510" lon="-79.3811760">
      <ele>87.4</ele>
      <time>2021-12-16T21:04:38Z</time>
     </trkpt>
     <trkpt lat="43.6505100" lon="-79.3811640">
      <ele>87.4</ele>
      <time>2021-12-16T21:04:40Z</time>
     </trkpt>
     <trkpt lat="43.6504700" lon="-79.3811560">
      <ele>87.3</ele>
      <time>2021-12-16T21:04:41Z</time>
     </trkpt>
     <trkpt lat="43.6504340" lon="-79.3811480">
      <ele>87.3</ele>
      <time>2021-12-16T21:04:42Z</time>
     </trkpt>
     <trkpt lat="43.6504220" lon="-79.3811450">
      <ele>87.3</ele>
      <time>2021-12-16T21:04:43Z</time>
     </trkpt>
     <trkpt lat="43.6503990" lon="-79.3811400">
      <ele>87.3</ele>
      <time>2021-12-16T21:04:44Z</time>
     </trkpt>
     <trkpt lat="43.6503660" lon="-79.3811320">
      <ele>87.2</ele>
      <time>2021-12-16T21:04:46Z</time>
     </trkpt>
     <trkpt lat="43.6503340" lon="-79.3811280">
      <ele>87.2</ele>
      <time>2021-12-16T21:04:47Z</time>
     </trkpt>
     <trkpt lat="43.6503240" lon="-79.3811260">
      <ele>87.2</ele>
      <time>2021-12-16T21:04:48Z</time>
     </trkpt>
     <trkpt lat="43.6502920" lon="-79.3811150">
      <ele>87.2</ele>
      <time>2021-12-16T21:04:49Z</time>
     </trkpt>
     <trkpt lat="43.6502790" lon="-79.3811090">
      <ele>87.1</ele>
      <time>2021-12-16T21:04:50Z</time>
     </trkpt>
     <trkpt lat="43.6502610" lon="-79.3810950">
      <ele>87.1</ele>
      <time>2021-12-16T21:04:51Z</time>
     </trkpt>
     <trkpt lat="43.6502320" lon="-79.3810640">
      <ele>87.1</ele>
      <time>2021-12-16T21:04:53Z</time>
     </trkpt>
     <trkpt lat="43.6502070" lon="-79.3810220">
      <ele>87.1</ele>
      <time>2021-12-16T21:04:55Z</time>
     </trkpt>
     <trkpt lat="43.6501880" lon="-79.3809920">
      <ele>87.0</ele>
      <time>2021-12-16T21:04:56Z</time>
     </trkpt>
     <trkpt lat="43.6501810" lon="-79.3809770">
      <ele>87.0</ele>
      <time>2021-12-16T21:04:57Z</time>
     </trkpt>
     <trkpt lat="43.6501680" lon="-79.3809400">
      <ele>87.0</ele>
      <time>2021-12-16T21:04:59Z</time>
     </trkpt>
     <trkpt lat="43.6501600" lon="-79.3809160">
      <ele>87.0</ele>
      <time>2021-12-16T21:05:00Z</time>
     </trkpt>
     <trkpt lat="43.6501440" lon="-79.3808660">
      <ele>86.9</ele>
      <time>2021-12-16T21:05:02Z</time>
     </trkpt>
     <trkpt lat="43.6501310" lon="-79.3808310">
      <ele>86.9</ele>
      <time>2021-12-16T21:05:04Z</time>
     </trkpt>
     <trkpt lat="43.6501090" lon="-79.3807960">
      <ele>86.9</ele>
      <time>2021-12-16T21:05:05Z</time>
     </trkpt>
     <trkpt lat="43.6500830" lon="-79.3807710">
      <ele>86.8</ele>
      <time>2021-12-16T21:05:06Z</time>
     </trkpt>
     <trkpt lat="43.6500560" lon="-79.3807550">
      <ele>86.8</ele>
      <time>2021-12-16T21:05:07Z</time>
     </trkpt>
     <trkpt lat="43.6500320" lon="-79.3807440">
      <ele>86.8</ele>
      <time>2021-12-16T21:05:08Z</time>
     </trkpt>
     <trkpt lat="43.6499770" lon="-79.3807290">
      <ele>86.7</ele>
      <time>2021-12-16T21:05:10Z</time>
     </trkpt>
     <trkpt lat="43.6499360" lon="-79.3807320">
      <ele>86.7</ele>
      <time>2021-12-16T21:05:11Z</time>
     </trkpt>
     <trkpt lat="43.6498950" lon="-79.3807340">
      <ele>86.7</ele>
      <time>2021-12-16T21:05:12Z</time>
     </trkpt>
     <trkpt lat="43.6498560" lon="-79.3807340">
      <ele>86.7</ele>
      <time>2021-12-16T21:05:13Z</time>
     </trkpt>
     <trkpt lat="43.6498100" lon="-79.3807290">
      <ele>86.6</ele>
      <time>2021-12-16T21:05:14Z</time>
     </trkpt>
     <trkpt lat="43.6497710" lon="-79.3807110">
      <ele>86.6</ele>
      <time>2021-12-16T21:05:16Z</time>
     </trkpt>
     <trkpt lat="43.6497310" lon="-79.3806900">
      <ele>86.5</ele>
      <time>2021-12-16T21:05:17Z</time>
     </trkpt>
     <trkpt lat="43.6496980" lon="-79.3806640">
      <ele>86.5</ele>
      <time>2021-12-16T21:05:19Z</time>
     </trkpt>
     <trkpt lat="43.6496690" lon="-79.3806340">
      <ele>86.5</ele>
      <time>2021-12-16T21:05:20Z</time>
     </trkpt>
     <trkpt lat="43.6496430" lon="-79.3806050">
      <ele>86.4</ele>
      <time>2021-12-16T21:05:21Z</time>
     </trkpt>
     <trkpt lat="43.6496130" lon="-79.3805700">
      <ele>86.2</ele>
      <time>2021-12-16T21:05:23Z</time>
     </trkpt>
     <trkpt lat="43.6495780" lon="-79.3805290">
      <ele>86.2</ele>
      <time>2021-12-16T21:05:24Z</time>
     </trkpt>
     <trkpt lat="43.6495530" lon="-79.3805080">
      <ele>86.1</ele>
      <time>2021-12-16T21:05:25Z</time>
     </trkpt>
     <trkpt lat="43.6495280" lon="-79.3804920">
      <ele>86.1</ele>
      <time>2021-12-16T21:05:26Z</time>
     </trkpt>
     <trkpt lat="43.6494940" lon="-79.3804670">
      <ele>86.1</ele>
      <time>2021-12-16T21:05:28Z</time>
     </trkpt>
     <trkpt lat="43.6494700" lon="-79.3804490">
      <ele>86.0</ele>
      <time>2021-12-16T21:05:29Z</time>
     </trkpt>
     <trkpt lat="43.6494390" lon="-79.3804280">
      <ele>86.0</ele>
      <time>2021-12-16T21:05:30Z</time>
     </trkpt>
     <trkpt lat="43.6494260" lon="-79.3804200">
      <ele>86.0</ele>
      <time>2021-12-16T21:05:31Z</time>
     </trkpt>
     <trkpt lat="43.6494000" lon="-79.3804050">
      <ele>86.0</ele>
      <time>2021-12-16T21:05:32Z</time>
     </trkpt>
     <trkpt lat="43.6493710" lon="-79.3803920">
      <ele>85.9</ele>
      <time>2021-12-16T21:05:33Z</time>
     </trkpt>
     <trkpt lat="43.6493300" lon="-79.3803790">
      <ele>85.9</ele>
      <time>2021-12-16T21:05:35Z</time>
     </trkpt>
     <trkpt lat="43.6492860" lon="-79.3803680">
      <ele>85.8</ele>
      <time>2021-12-16T21:05:36Z</time>
     </trkpt>
     <trkpt lat="43.6492430" lon="-79.3803550">
      <ele>85.8</ele>
      <time>2021-12-16T21:05:38Z</time>
     </trkpt>
     <trkpt lat="43.6492140" lon="-79.3803540">
      <ele>85.8</ele>
      <time>2021-12-16T21:05:39Z</time>
     </trkpt>
     <trkpt lat="43.6491780" lon="-79.3803540">
      <ele>85.7</ele>
      <time>2021-12-16T21:05:40Z</time>
     </trkpt>
     <trkpt lat="43.6491500" lon="-79.3803560">
      <ele>85.7</ele>
      <time>2021-12-16T21:05:41Z</time>
     </trkpt>
     <trkpt lat="43.6491080" lon="-79.3803660">
      <ele>85.7</ele>
      <time>2021-12-16T21:05:43Z</time>
     </trkpt>
     <trkpt lat="43.6490740" lon="-79.3803730">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:44Z</time>
     </trkpt>
     <trkpt lat="43.6490330" lon="-79.3803750">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:46Z</time>
     </trkpt>
     <trkpt lat="43.6489980" lon="-79.3803750">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:47Z</time>
     </trkpt>
     <trkpt lat="43.6489880" lon="-79.3803740">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:48Z</time>
     </trkpt>
     <trkpt lat="43.6489720" lon="-79.3803650">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:49Z</time>
     </trkpt>
     <trkpt lat="43.6489590" lon="-79.3803540">
      <ele>85.6</ele>
      <time>2021-12-16T21:05:50Z</time>
     </trkpt>
     <trkpt lat="43.6489420" lon="-79.3803250">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:51Z</time>
     </trkpt>
     <trkpt lat="43.6489280" lon="-79.3802860">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:53Z</time>
     </trkpt>
     <trkpt lat="43.6489180" lon="-79.3802430">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:54Z</time>
     </trkpt>
     <trkpt lat="43.6489110" lon="-79.3802190">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:55Z</time>
     </trkpt>
     <trkpt lat="43.6489050" lon="-79.3802040">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:56Z</time>
     </trkpt>
     <trkpt lat="43.6488780" lon="-79.3801790">
      <ele>85.5</ele>
      <time>2021-12-16T21:05:58Z</time>
     </trkpt>
     <trkpt lat="43.6488530" lon="-79.3801610">
      <ele>85.4</ele>
      <time>2021-12-16T21:05:59Z</time>
     </trkpt>
     <trkpt lat="43.6488240" lon="-79.3801470">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:00Z</time>
     </trkpt>
     <trkpt lat="43.6487870" lon="-79.3801320">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:01Z</time>
     </trkpt>
     <trkpt lat="43.6487550" lon="-79.3801230">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:02Z</time>
     </trkpt>
     <trkpt lat="43.6487190" lon="-79.3801200">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:03Z</time>
     </trkpt>
     <trkpt lat="43.6486830" lon="-79.3801230">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:04Z</time>
     </trkpt>
     <trkpt lat="43.6486230" lon="-79.3801310">
      <ele>85.4</ele>
      <time>2021-12-16T21:06:06Z</time>
     </trkpt>
     <trkpt lat="43.6485850" lon="-79.3801560">
      <ele>85.3</ele>
      <time>2021-12-16T21:06:07Z</time>
     </trkpt>
     <trkpt lat="43.6485380" lon="-79.3801910">
      <ele>85.3</ele>
      <time>2021-12-16T21:06:09Z</time>
     </trkpt>
     <trkpt lat="43.6484890" lon="-79.3802320">
      <ele>85.0</ele>
      <time>2021-12-16T21:06:10Z</time>
     </trkpt>
     <trkpt lat="43.6484530" lon="-79.3802600">
      <ele>84.9</ele>
      <time>2021-12-16T21:06:11Z</time>
     </trkpt>
     <trkpt lat="43.6484170" lon="-79.3802940">
      <ele>84.9</ele>
      <time>2021-12-16T21:06:12Z</time>
     </trkpt>
     <trkpt lat="43.6483820" lon="-79.3803300">
      <ele>84.8</ele>
      <time>2021-12-16T21:06:13Z</time>
     </trkpt>
     <trkpt lat="43.6483600" lon="-79.3803570">
      <ele>84.8</ele>
      <time>2021-12-16T21:06:14Z</time>
     </trkpt>
     <trkpt lat="43.6483390" lon="-79.3803840">
      <ele>84.7</ele>
      <time>2021-12-16T21:06:15Z</time>
     </trkpt>
     <trkpt lat="43.6483020" lon="-79.3804270">
      <ele>84.6</ele>
      <time>2021-12-16T21:06:17Z</time>
     </trkpt>
     <trkpt lat="43.6482900" lon="-79.3804420">
      <ele>84.6</ele>
      <time>2021-12-16T21:06:18Z</time>
     </trkpt>
     <trkpt lat="43.6482780" lon="-79.3804560">
      <ele>84.6</ele>
      <time>2021-12-16T21:06:19Z</time>
     </trkpt>
     <trkpt lat="43.6482480" lon="-79.3804830">
      <ele>84.5</ele>
      <time>2021-12-16T21:06:20Z</time>
     </trkpt>
     <trkpt lat="43.6482380" lon="-79.3804900">
      <ele>84.5</ele>
      <time>2021-12-16T21:06:21Z</time>
     </trkpt>
     <trkpt lat="43.6482190" lon="-79.3805010">
      <ele>84.5</ele>
      <time>2021-12-16T21:06:22Z</time>
     </trkpt>
     <trkpt lat="43.6481940" lon="-79.3805120">
      <ele>84.4</ele>
      <time>2021-12-16T21:06:24Z</time>
     </trkpt>
     <trkpt lat="43.6481640" lon="-79.3805220">
      <ele>84.3</ele>
      <time>2021-12-16T21:06:25Z</time>
     </trkpt>
     <trkpt lat="43.6481310" lon="-79.3805250">
      <ele>84.3</ele>
      <time>2021-12-16T21:06:26Z</time>
     </trkpt>
     <trkpt lat="43.6481190" lon="-79.3805240">
      <ele>84.3</ele>
      <time>2021-12-16T21:06:27Z</time>
     </trkpt>
     <trkpt lat="43.6480980" lon="-79.3805210">
      <ele>84.2</ele>
      <time>2021-12-16T21:06:28Z</time>
     </trkpt>
     <trkpt lat="43.6480690" lon="-79.3805160">
      <ele>84.2</ele>
      <time>2021-12-16T21:06:30Z</time>
     </trkpt>
     <trkpt lat="43.6480330" lon="-79.3805040">
      <ele>84.1</ele>
      <time>2021-12-16T21:06:31Z</time>
     </trkpt>
     <trkpt lat="43.6480070" lon="-79.3804920">
      <ele>84.1</ele>
      <time>2021-12-16T21:06:32Z</time>
     </trkpt>
     <trkpt lat="43.6479640" lon="-79.3804620">
      <ele>84.0</ele>
      <time>2021-12-16T21:06:34Z</time>
     </trkpt>
     <trkpt lat="43.6479500" lon="-79.3804500">
      <ele>84.0</ele>
      <time>2021-12-16T21:06:35Z</time>
     </trkpt>
     <trkpt lat="43.6479350" lon="-79.3804380">
      <ele>84.0</ele>
      <time>2021-12-16T21:06:36Z</time>
     </trkpt>
     <trkpt lat="43.6479140" lon="-79.3804140">
      <ele>84.0</ele>
      <time>2021-12-16T21:06:37Z</time>
     </trkpt>
     <trkpt lat="43.6478880" lon="-79.3803770">
      <ele>83.9</ele>
      <time>2021-12-16T21:06:38Z</time>
     </trkpt>
     <trkpt lat="43.6478520" lon="-79.3803190">
      <ele>83.9</ele>
      <time>2021-12-16T21:06:40Z</time>
     </trkpt>
     <trkpt lat="43.6478290" lon="-79.3802750">
      <ele>83.9</ele>
      <time>2021-12-16T21:06:41Z</time>
     </trkpt>
     <trkpt lat="43.6478080" lon="-79.3802350">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:42Z</time>
     </trkpt>
     <trkpt lat="43.6477720" lon="-79.3801770">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:44Z</time>
     </trkpt>
     <trkpt lat="43.6477520" lon="-79.3801480">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:45Z</time>
     </trkpt>
     <trkpt lat="43.6477310" lon="-79.3801160">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:46Z</time>
     </trkpt>
     <trkpt lat="43.6477240" lon="-79.3801060">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:47Z</time>
     </trkpt>
     <trkpt lat="43.6477010" lon="-79.3800770">
      <ele>83.8</ele>
      <time>2021-12-16T21:06:48Z</time>
     </trkpt>
     <trkpt lat="43.6476670" lon="-79.3800500">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:49Z</time>
     </trkpt>
     <trkpt lat="43.6476550" lon="-79.3800420">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:50Z</time>
     </trkpt>
     <trkpt lat="43.6476220" lon="-79.3800210">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:51Z</time>
     </trkpt>
     <trkpt lat="43.6475870" lon="-79.3800010">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:52Z</time>
     </trkpt>
     <trkpt lat="43.6475460" lon="-79.3799800">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:54Z</time>
     </trkpt>
     <trkpt lat="43.6475200" lon="-79.3799700">
      <ele>83.7</ele>
      <time>2021-12-16T21:06:55Z</time>
     </trkpt>
     <trkpt lat="43.6474730" lon="-79.3799570">
      <ele>83.6</ele>
      <time>2021-12-16T21:06:57Z</time>
     </trkpt>
     <trkpt lat="43.6474230" lon="-79.3799520">
      <ele>83.5</ele>
      <time>2021-12-16T21:06:58Z</time>
     </trkpt>
     <trkpt lat="43.6473930" lon="-79.3799470">
      <ele>83.5</ele>
      <time>2021-12-16T21:06:59Z</time>
     </trkpt>
     <trkpt lat="43.6473560" lon="-79.3799430">
      <ele>83.4</ele>
      <time>2021-12-16T21:07:00Z</time>
     </trkpt>
     <trkpt lat="43.6473190" lon="-79.3799350">
      <ele>83.3</ele>
      <time>2021-12-16T21:07:01Z</time>
     </trkpt>
     <trkpt lat="43.6472770" lon="-79.3799210">
      <ele>83.2</ele>
      <time>2021-12-16T21:07:03Z</time>
     </trkpt>
     <trkpt lat="43.6472430" lon="-79.3799060">
      <ele>83.2</ele>
      <time>2021-12-16T21:07:04Z</time>
     </trkpt>
     <trkpt lat="43.6472080" lon="-79.3798930">
      <ele>83.2</ele>
      <time>2021-12-16T21:07:05Z</time>
     </trkpt>
     <trkpt lat="43.6471730" lon="-79.3798770">
      <ele>83.1</ele>
      <time>2021-12-16T21:07:06Z</time>
     </trkpt>
     <trkpt lat="43.6471370" lon="-79.3798620">
      <ele>83.1</ele>
      <time>2021-12-16T21:07:07Z</time>
     </trkpt>
     <trkpt lat="43.6470780" lon="-79.3798380">
      <ele>83.0</ele>
      <time>2021-12-16T21:07:09Z</time>
     </trkpt>
     <trkpt lat="43.6470390" lon="-79.3798200">
      <ele>83.0</ele>
      <time>2021-12-16T21:07:10Z</time>
     </trkpt>
     <trkpt lat="43.6470040" lon="-79.3798020">
      <ele>82.9</ele>
      <time>2021-12-16T21:07:11Z</time>
     </trkpt>
     <trkpt lat="43.6469650" lon="-79.3797810">
      <ele>82.9</ele>
      <time>2021-12-16T21:07:12Z</time>
     </trkpt>
     <trkpt lat="43.6469310" lon="-79.3797620">
      <ele>82.8</ele>
      <time>2021-12-16T21:07:13Z</time>
     </trkpt>
     <trkpt lat="43.6468980" lon="-79.3797420">
      <ele>82.8</ele>
      <time>2021-12-16T21:07:14Z</time>
     </trkpt>
     <trkpt lat="43.6468550" lon="-79.3797040">
      <ele>82.7</ele>
      <time>2021-12-16T21:07:15Z</time>
     </trkpt>
     <trkpt lat="43.6468260" lon="-79.3796770">
      <ele>82.7</ele>
      <time>2021-12-16T21:07:16Z</time>
     </trkpt>
     <trkpt lat="43.6467930" lon="-79.3796450">
      <ele>82.6</ele>
      <time>2021-12-16T21:07:18Z</time>
     </trkpt>
     <trkpt lat="43.6467670" lon="-79.3796160">
      <ele>82.6</ele>
      <time>2021-12-16T21:07:19Z</time>
     </trkpt>
     <trkpt lat="43.6467390" lon="-79.3795790">
      <ele>82.6</ele>
      <time>2021-12-16T21:07:20Z</time>
     </trkpt>
     <trkpt lat="43.6467130" lon="-79.3795370">
      <ele>82.5</ele>
      <time>2021-12-16T21:07:21Z</time>
     </trkpt>
     <trkpt lat="43.6466800" lon="-79.3794780">
      <ele>82.5</ele>
      <time>2021-12-16T21:07:22Z</time>
     </trkpt>
     <trkpt lat="43.6466470" lon="-79.3794200">
      <ele>82.3</ele>
      <time>2021-12-16T21:07:23Z</time>
     </trkpt>
     <trkpt lat="43.6466100" lon="-79.3793540">
      <ele>82.2</ele>
      <time>2021-12-16T21:07:25Z</time>
     </trkpt>
     <trkpt lat="43.6465840" lon="-79.3793120">
      <ele>82.1</ele>
      <time>2021-12-16T21:07:26Z</time>
     </trkpt>
     <trkpt lat="43.6465580" lon="-79.3792720">
      <ele>82.0</ele>
      <time>2021-12-16T21:07:27Z</time>
     </trkpt>
     <trkpt lat="43.6465160" lon="-79.3792210">
      <ele>81.9</ele>
      <time>2021-12-16T21:07:29Z</time>
     </trkpt>
     <trkpt lat="43.6464810" lon="-79.3791900">
      <ele>81.8</ele>
      <time>2021-12-16T21:07:30Z</time>
     </trkpt>
     <trkpt lat="43.6464350" lon="-79.3791560">
      <ele>81.7</ele>
      <time>2021-12-16T21:07:31Z</time>
     </trkpt>
     <trkpt lat="43.6463870" lon="-79.3791350">
      <ele>81.6</ele>
      <time>2021-12-16T21:07:32Z</time>
     </trkpt>
     <trkpt lat="43.6463460" lon="-79.3791230">
      <ele>81.5</ele>
      <time>2021-12-16T21:07:33Z</time>
     </trkpt>
     <trkpt lat="43.6462970" lon="-79.3791150">
      <ele>81.4</ele>
      <time>2021-12-16T21:07:34Z</time>
     </trkpt>
     <trkpt lat="43.6462570" lon="-79.3791130">
      <ele>81.4</ele>
      <time>2021-12-16T21:07:35Z</time>
     </trkpt>
     <trkpt lat="43.6462180" lon="-79.3791220">
      <ele>81.3</ele>
      <time>2021-12-16T21:07:36Z</time>
     </trkpt>
     <trkpt lat="43.6461700" lon="-79.3791420">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:38Z</time>
     </trkpt>
     <trkpt lat="43.6461350" lon="-79.3791520">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:39Z</time>
     </trkpt>
     <trkpt lat="43.6460970" lon="-79.3791600">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:40Z</time>
     </trkpt>
     <trkpt lat="43.6460610" lon="-79.3791640">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:41Z</time>
     </trkpt>
     <trkpt lat="43.6460250" lon="-79.3791660">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:42Z</time>
     </trkpt>
     <trkpt lat="43.6459840" lon="-79.3791730">
      <ele>81.2</ele>
      <time>2021-12-16T21:07:43Z</time>
     </trkpt>
     <trkpt lat="43.6459430" lon="-79.3791770">
      <ele>81.1</ele>
      <time>2021-12-16T21:07:44Z</time>
     </trkpt>
     <trkpt lat="43.6459090" lon="-79.3791790">
      <ele>81.0</ele>
      <time>2021-12-16T21:07:45Z</time>
     </trkpt>
     <trkpt lat="43.6458700" lon="-79.3791840">
      <ele>81.0</ele>
      <time>2021-12-16T21:07:47Z</time>
     </trkpt>
     <trkpt lat="43.6458340" lon="-79.3791900">
      <ele>80.7</ele>
      <time>2021-12-16T21:07:48Z</time>
     </trkpt>
     <trkpt lat="43.6458000" lon="-79.3791980">
      <ele>80.6</ele>
      <time>2021-12-16T21:07:49Z</time>
     </trkpt>
     <trkpt lat="43.6457650" lon="-79.3792020">
      <ele>80.5</ele>
      <time>2021-12-16T21:07:50Z</time>
     </trkpt>
     <trkpt lat="43.6457370" lon="-79.3792040">
      <ele>80.5</ele>
      <time>2021-12-16T21:07:51Z</time>
     </trkpt>
     <trkpt lat="43.6456930" lon="-79.3792040">
      <ele>80.4</ele>
      <time>2021-12-16T21:07:52Z</time>
     </trkpt>
     <trkpt lat="43.6456750" lon="-79.3792030">
      <ele>80.3</ele>
      <time>2021-12-16T21:07:53Z</time>
     </trkpt>
     <trkpt lat="43.6456480" lon="-79.3791970">
      <ele>80.2</ele>
      <time>2021-12-16T21:07:55Z</time>
     </trkpt>
     <trkpt lat="43.6456190" lon="-79.3791840">
      <ele>80.1</ele>
      <time>2021-12-16T21:07:56Z</time>
     </trkpt>
     <trkpt lat="43.6455730" lon="-79.3791590">
      <ele>80.0</ele>
      <time>2021-12-16T21:07:57Z</time>
     </trkpt>
     <trkpt lat="43.6455450" lon="-79.3791430">
      <ele>79.9</ele>
      <time>2021-12-16T21:07:58Z</time>
     </trkpt>
     <trkpt lat="43.6455100" lon="-79.3791160">
      <ele>79.8</ele>
      <time>2021-12-16T21:07:59Z</time>
     </trkpt>
     <trkpt lat="43.6454760" lon="-79.3790880">
      <ele>79.7</ele>
      <time>2021-12-16T21:08:01Z</time>
     </trkpt>
     <trkpt lat="43.6454420" lon="-79.3790570">
      <ele>79.5</ele>
      <time>2021-12-16T21:08:02Z</time>
     </trkpt>
     <trkpt lat="43.6454050" lon="-79.3790270">
      <ele>79.4</ele>
      <time>2021-12-16T21:08:03Z</time>
     </trkpt>
     <trkpt lat="43.6453890" lon="-79.3790160">
      <ele>79.4</ele>
      <time>2021-12-16T21:08:04Z</time>
     </trkpt>
     <trkpt lat="43.6453560" lon="-79.3790020">
      <ele>79.4</ele>
      <time>2021-12-16T21:08:06Z</time>
     </trkpt>
     <trkpt lat="43.6453460" lon="-79.3789970">
      <ele>79.3</ele>
      <time>2021-12-16T21:08:07Z</time>
     </trkpt>
     <trkpt lat="43.6453190" lon="-79.3789840">
      <ele>79.3</ele>
      <time>2021-12-16T21:08:08Z</time>
     </trkpt>
     <trkpt lat="43.6452840" lon="-79.3789630">
      <ele>79.3</ele>
      <time>2021-12-16T21:08:10Z</time>
     </trkpt>
     <trkpt lat="43.6452560" lon="-79.3789450">
      <ele>79.3</ele>
      <time>2021-12-16T21:08:11Z</time>
     </trkpt>
     <trkpt lat="43.6452250" lon="-79.3789260">
      <ele>79.3</ele>
      <time>2021-12-16T21:08:12Z</time>
     </trkpt>
     <trkpt lat="43.6452120" lon="-79.3789180">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:13Z</time>
     </trkpt>
     <trkpt lat="43.6451800" lon="-79.3788990">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:15Z</time>
     </trkpt>
     <trkpt lat="43.6451390" lon="-79.3788750">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:16Z</time>
     </trkpt>
     <trkpt lat="43.6451140" lon="-79.3788600">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:17Z</time>
     </trkpt>
     <trkpt lat="43.6450770" lon="-79.3788380">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:18Z</time>
     </trkpt>
     <trkpt lat="43.6450640" lon="-79.3788310">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:19Z</time>
     </trkpt>
     <trkpt lat="43.6452660" lon="-79.3783010">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:42Z</time>
     </trkpt>
     <trkpt lat="43.6452300" lon="-79.3783160">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:44Z</time>
     </trkpt>
     <trkpt lat="43.6452160" lon="-79.3783210">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:45Z</time>
     </trkpt>
     <trkpt lat="43.6451690" lon="-79.3783340">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:47Z</time>
     </trkpt>
     <trkpt lat="43.6451390" lon="-79.3783350">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:48Z</time>
     </trkpt>
     <trkpt lat="43.6451280" lon="-79.3783350">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:49Z</time>
     </trkpt>
     <trkpt lat="43.6451170" lon="-79.3783340">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:50Z</time>
     </trkpt>
     <trkpt lat="43.6450810" lon="-79.3783270">
      <ele>79.1</ele>
      <time>2021-12-16T21:08:51Z</time>
     </trkpt>
     <trkpt lat="43.6450700" lon="-79.3783230">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:52Z</time>
     </trkpt>
     <trkpt lat="43.6450360" lon="-79.3783090">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:53Z</time>
     </trkpt>
     <trkpt lat="43.6450230" lon="-79.3783040">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:54Z</time>
     </trkpt>
     <trkpt lat="43.6449900" lon="-79.3782890">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:56Z</time>
     </trkpt>
     <trkpt lat="43.6449490" lon="-79.3782700">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:57Z</time>
     </trkpt>
     <trkpt lat="43.6449230" lon="-79.3782580">
      <ele>79.2</ele>
      <time>2021-12-16T21:08:58Z</time>
     </trkpt>
     <trkpt lat="43.6448790" lon="-79.3782430">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:00Z</time>
     </trkpt>
     <trkpt lat="43.6448410" lon="-79.3782260">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:01Z</time>
     </trkpt>
     <trkpt lat="43.6447810" lon="-79.3781930">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:02Z</time>
     </trkpt>
     <trkpt lat="43.6447260" lon="-79.3781580">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:03Z</time>
     </trkpt>
     <trkpt lat="43.6446610" lon="-79.3781090">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:05Z</time>
     </trkpt>
     <trkpt lat="43.6445950" lon="-79.3780650">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:06Z</time>
     </trkpt>
     <trkpt lat="43.6445430" lon="-79.3780320">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:07Z</time>
     </trkpt>
     <trkpt lat="43.6444830" lon="-79.3779900">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:08Z</time>
     </trkpt>
     <trkpt lat="43.6444390" lon="-79.3779610">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:09Z</time>
     </trkpt>
     <trkpt lat="43.6443940" lon="-79.3779320">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:10Z</time>
     </trkpt>
     <trkpt lat="43.6443430" lon="-79.3779030">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:12Z</time>
     </trkpt>
     <trkpt lat="43.6443030" lon="-79.3778780">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:13Z</time>
     </trkpt>
     <trkpt lat="43.6442600" lon="-79.3778490">
      <ele>79.2</ele>
      <time>2021-12-16T21:09:14Z</time>
     </trkpt>
     <trkpt lat="43.6442260" lon="-79.3778240">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:15Z</time>
     </trkpt>
     <trkpt lat="43.6441950" lon="-79.3777990">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:16Z</time>
     </trkpt>
     <trkpt lat="43.6441660" lon="-79.3777740">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:17Z</time>
     </trkpt>
     <trkpt lat="43.6441380" lon="-79.3777470">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:18Z</time>
     </trkpt>
     <trkpt lat="43.6441110" lon="-79.3777200">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:19Z</time>
     </trkpt>
     <trkpt lat="43.6440840" lon="-79.3776940">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:20Z</time>
     </trkpt>
     <trkpt lat="43.6440590" lon="-79.3776760">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:21Z</time>
     </trkpt>
     <trkpt lat="43.6439980" lon="-79.3776620">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:23Z</time>
     </trkpt>
     <trkpt lat="43.6439310" lon="-79.3776580">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:24Z</time>
     </trkpt>
     <trkpt lat="43.6439010" lon="-79.3776550">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:25Z</time>
     </trkpt>
     <trkpt lat="43.6438710" lon="-79.3776560">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:26Z</time>
     </trkpt>
     <trkpt lat="43.6438230" lon="-79.3776680">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:27Z</time>
     </trkpt>
     <trkpt lat="43.6437880" lon="-79.3776720">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:28Z</time>
     </trkpt>
     <trkpt lat="43.6437320" lon="-79.3776730">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:30Z</time>
     </trkpt>
     <trkpt lat="43.6436840" lon="-79.3776680">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:32Z</time>
     </trkpt>
     <trkpt lat="43.6436650" lon="-79.3776670">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:33Z</time>
     </trkpt>
     <trkpt lat="43.6436400" lon="-79.3776720">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:35Z</time>
     </trkpt>
     <trkpt lat="43.6436290" lon="-79.3776790">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:36Z</time>
     </trkpt>
     <trkpt lat="43.6436200" lon="-79.3776910">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:37Z</time>
     </trkpt>
     <trkpt lat="43.6436170" lon="-79.3777400">
      <ele>79.3</ele>
      <time>2021-12-16T21:09:39Z</time>
     </trkpt>
     <trkpt lat="43.6436180" lon="-79.3777650">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:40Z</time>
     </trkpt>
     <trkpt lat="43.6436160" lon="-79.3777930">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:42Z</time>
     </trkpt>
     <trkpt lat="43.6436140" lon="-79.3778030">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:43Z</time>
     </trkpt>
     <trkpt lat="43.6435960" lon="-79.3777920">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:45Z</time>
     </trkpt>
     <trkpt lat="43.6435790" lon="-79.3777740">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:47Z</time>
     </trkpt>
     <trkpt lat="43.6435730" lon="-79.3777630">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:48Z</time>
     </trkpt>
     <trkpt lat="43.6435640" lon="-79.3777510">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:49Z</time>
     </trkpt>
     <trkpt lat="43.6435460" lon="-79.3777170">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:51Z</time>
     </trkpt>
     <trkpt lat="43.6435290" lon="-79.3776810">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:53Z</time>
     </trkpt>
     <trkpt lat="43.6435220" lon="-79.3776630">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:54Z</time>
     </trkpt>
     <trkpt lat="43.6435070" lon="-79.3776280">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:56Z</time>
     </trkpt>
     <trkpt lat="43.6435000" lon="-79.3776100">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:57Z</time>
     </trkpt>
     <trkpt lat="43.6434930" lon="-79.3775910">
      <ele>79.4</ele>
      <time>2021-12-16T21:09:58Z</time>
     </trkpt>
     <trkpt lat="43.6434750" lon="-79.3775400">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:00Z</time>
     </trkpt>
     <trkpt lat="43.6434690" lon="-79.3775250">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:02Z</time>
     </trkpt>
     <trkpt lat="43.6434630" lon="-79.3775090">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:03Z</time>
     </trkpt>
     <trkpt lat="43.6434520" lon="-79.3774870">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:05Z</time>
     </trkpt>
     <trkpt lat="43.6434480" lon="-79.3774770">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:06Z</time>
     </trkpt>
     <trkpt lat="43.6434400" lon="-79.3774620">
      <ele>79.4</ele>
      <time>2021-12-16T21:10:08Z</time>
     </trkpt>
     <trkpt lat="43.6434340" lon="-79.3774500">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:10Z</time>
     </trkpt>
     <trkpt lat="43.6434310" lon="-79.3774440">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:11Z</time>
     </trkpt>
     <trkpt lat="43.6434250" lon="-79.3774340">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:13Z</time>
     </trkpt>
     <trkpt lat="43.6434240" lon="-79.3774320">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:14Z</time>
     </trkpt>
     <trkpt lat="43.6434230" lon="-79.3774310">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:16Z</time>
     </trkpt>
     <trkpt lat="43.6434220" lon="-79.3774300">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:17Z</time>
     </trkpt>
     <trkpt lat="43.6434210" lon="-79.3774280">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:18Z</time>
     </trkpt>
     <trkpt lat="43.6434200" lon="-79.3774270">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:20Z</time>
     </trkpt>
     <trkpt lat="43.6434190" lon="-79.3774260">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:22Z</time>
     </trkpt>
     <trkpt lat="43.6434180" lon="-79.3774240">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:24Z</time>
     </trkpt>
     <trkpt lat="43.6434170" lon="-79.3774230">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:26Z</time>
     </trkpt>
     <trkpt lat="43.6434160" lon="-79.3774210">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:28Z</time>
     </trkpt>
     <trkpt lat="43.6434150" lon="-79.3774200">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:29Z</time>
     </trkpt>
     <trkpt lat="43.6434140" lon="-79.3774190">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:31Z</time>
     </trkpt>
     <trkpt lat="43.6434130" lon="-79.3774170">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:33Z</time>
     </trkpt>
     <trkpt lat="43.6434120" lon="-79.3774160">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:35Z</time>
     </trkpt>
     <trkpt lat="43.6434110" lon="-79.3774150">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:37Z</time>
     </trkpt>
     <trkpt lat="43.6434100" lon="-79.3774130">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:39Z</time>
     </trkpt>
     <trkpt lat="43.6434090" lon="-79.3774120">
      <ele>79.5</ele>
      <time>2021-12-16T21:10:41Z</time>
     </trkpt>
     <trkpt lat="43.6434080" lon="-79.3774100">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:42Z</time>
     </trkpt>
     <trkpt lat="43.6434070" lon="-79.3774090">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:44Z</time>
     </trkpt>
     <trkpt lat="43.6434060" lon="-79.3774080">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:45Z</time>
     </trkpt>
     <trkpt lat="43.6434040" lon="-79.3774060">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:47Z</time>
     </trkpt>
     <trkpt lat="43.6434030" lon="-79.3774050">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:48Z</time>
     </trkpt>
     <trkpt lat="43.6434020" lon="-79.3774040">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:50Z</time>
     </trkpt>
     <trkpt lat="43.6434010" lon="-79.3774020">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:51Z</time>
     </trkpt>
     <trkpt lat="43.6434000" lon="-79.3774010">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:52Z</time>
     </trkpt>
     <trkpt lat="43.6433990" lon="-79.3774000">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:56Z</time>
     </trkpt>
     <trkpt lat="43.6433980" lon="-79.3773980">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:57Z</time>
     </trkpt>
     <trkpt lat="43.6433970" lon="-79.3773970">
      <ele>79.6</ele>
      <time>2021-12-16T21:10:58Z</time>
     </trkpt>
     <trkpt lat="43.6433960" lon="-79.3773950">
      <ele>79.6</ele>
      <time>2021-12-16T21:11:00Z</time>
     </trkpt>
     <trkpt lat="43.6433950" lon="-79.3773940">
      <ele>79.6</ele>
      <time>2021-12-16T21:11:01Z</time>
     </trkpt>
     <trkpt lat="43.6433690" lon="-79.3774140">
      <ele>79.6</ele>
      <time>2021-12-16T21:11:02Z</time>
     </trkpt>
     <trkpt lat="43.6433360" lon="-79.3774540">
      <ele>79.6</ele>
      <time>2021-12-16T21:11:04Z</time>
     </trkpt>
     <trkpt lat="43.6433220" lon="-79.3774730">
      <ele>79.6</ele>
      <time>2021-12-16T21:11:05Z</time>
     </trkpt>
     <trkpt lat="43.6432940" lon="-79.3775180">
      <ele>79.5</ele>
      <time>2021-12-16T21:11:07Z</time>
     </trkpt>
     <trkpt lat="43.6432540" lon="-79.3775800">
      <ele>79.2</ele>
      <time>2021-12-16T21:11:08Z</time>
     </trkpt>
     <trkpt lat="43.6432190" lon="-79.3776320">
      <ele>79.0</ele>
      <time>2021-12-16T21:11:09Z</time>
     </trkpt>
     <trkpt lat="43.6431830" lon="-79.3776780">
      <ele>78.8</ele>
      <time>2021-12-16T21:11:10Z</time>
     </trkpt>
     <trkpt lat="43.6431300" lon="-79.3777300">
      <ele>78.5</ele>
      <time>2021-12-16T21:11:11Z</time>
     </trkpt>
     <trkpt lat="43.6430890" lon="-79.3777590">
      <ele>78.3</ele>
      <time>2021-12-16T21:11:13Z</time>
     </trkpt>
     <trkpt lat="43.6430380" lon="-79.3777840">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:14Z</time>
     </trkpt>
     <trkpt lat="43.6429940" lon="-79.3777980">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:15Z</time>
     </trkpt>
     <trkpt lat="43.6429280" lon="-79.3778060">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:17Z</time>
     </trkpt>
     <trkpt lat="43.6428880" lon="-79.3778080">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:18Z</time>
     </trkpt>
     <trkpt lat="43.6428490" lon="-79.3778080">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:19Z</time>
     </trkpt>
     <trkpt lat="43.6428120" lon="-79.3778100">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:20Z</time>
     </trkpt>
     <trkpt lat="43.6427580" lon="-79.3778110">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:21Z</time>
     </trkpt>
     <trkpt lat="43.6427160" lon="-79.3778150">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:22Z</time>
     </trkpt>
     <trkpt lat="43.6426760" lon="-79.3778170">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:23Z</time>
     </trkpt>
     <trkpt lat="43.6426250" lon="-79.3778210">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:25Z</time>
     </trkpt>
     <trkpt lat="43.6425850" lon="-79.3778230">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:26Z</time>
     </trkpt>
     <trkpt lat="43.6425470" lon="-79.3778250">
      <ele>78.2</ele>
      <time>2021-12-16T21:11:27Z</time>
     </trkpt>
     <trkpt lat="43.6425020" lon="-79.3778260">
      <ele>78.2</ele>
      <time>2021-12-16T21:11:28Z</time>
     </trkpt>
     <trkpt lat="43.6424490" lon="-79.3778240">
      <ele>78.2</ele>
      <time>2021-12-16T21:11:29Z</time>
     </trkpt>
     <trkpt lat="43.6424050" lon="-79.3778230">
      <ele>78.2</ele>
      <time>2021-12-16T21:11:30Z</time>
     </trkpt>
     <trkpt lat="43.6423510" lon="-79.3778220">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:32Z</time>
     </trkpt>
     <trkpt lat="43.6423100" lon="-79.3778190">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:33Z</time>
     </trkpt>
     <trkpt lat="43.6422640" lon="-79.3778140">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:34Z</time>
     </trkpt>
     <trkpt lat="43.6422050" lon="-79.3778070">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:36Z</time>
     </trkpt>
     <trkpt lat="43.6421660" lon="-79.3778020">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:37Z</time>
     </trkpt>
     <trkpt lat="43.6421300" lon="-79.3777920">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:38Z</time>
     </trkpt>
     <trkpt lat="43.6420990" lon="-79.3777800">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:39Z</time>
     </trkpt>
     <trkpt lat="43.6420640" lon="-79.3777590">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:40Z</time>
     </trkpt>
     <trkpt lat="43.6420230" lon="-79.3777240">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:42Z</time>
     </trkpt>
     <trkpt lat="43.6419970" lon="-79.3776980">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:43Z</time>
     </trkpt>
     <trkpt lat="43.6419700" lon="-79.3776700">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:44Z</time>
     </trkpt>
     <trkpt lat="43.6419460" lon="-79.3776450">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:45Z</time>
     </trkpt>
     <trkpt lat="43.6419210" lon="-79.3776240">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:46Z</time>
     </trkpt>
     <trkpt lat="43.6418890" lon="-79.3775940">
      <ele>78.1</ele>
      <time>2021-12-16T21:11:47Z</time>
     </trkpt>
     <trkpt lat="43.6418540" lon="-79.3775670">
      <ele>78.0</ele>
      <time>2021-12-16T21:11:49Z</time>
     </trkpt>
     <trkpt lat="43.6418200" lon="-79.3775440">
      <ele>78.0</ele>
      <time>2021-12-16T21:11:50Z</time>
     </trkpt>
     <trkpt lat="43.6417770" lon="-79.3775130">
      <ele>78.0</ele>
      <time>2021-12-16T21:11:52Z</time>
     </trkpt>
     <trkpt lat="43.6417510" lon="-79.3774920">
      <ele>78.0</ele>
      <time>2021-12-16T21:11:53Z</time>
     </trkpt>
     <trkpt lat="43.6417280" lon="-79.3774670">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:54Z</time>
     </trkpt>
     <trkpt lat="43.6416980" lon="-79.3774330">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:55Z</time>
     </trkpt>
     <trkpt lat="43.6416580" lon="-79.3773920">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:57Z</time>
     </trkpt>
     <trkpt lat="43.6416340" lon="-79.3773700">
      <ele>77.9</ele>
      <time>2021-12-16T21:11:58Z</time>
     </trkpt>
     <trkpt lat="43.6416080" lon="-79.3773490">
      <ele>77.8</ele>
      <time>2021-12-16T21:11:59Z</time>
     </trkpt>
     <trkpt lat="43.6415740" lon="-79.3773270">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:00Z</time>
     </trkpt>
     <trkpt lat="43.6415410" lon="-79.3773120">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:01Z</time>
     </trkpt>
     <trkpt lat="43.6415120" lon="-79.3772980">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:02Z</time>
     </trkpt>
     <trkpt lat="43.6414670" lon="-79.3772730">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:04Z</time>
     </trkpt>
     <trkpt lat="43.6414250" lon="-79.3772370">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:06Z</time>
     </trkpt>
     <trkpt lat="43.6413870" lon="-79.3771920">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:08Z</time>
     </trkpt>
     <trkpt lat="43.6413630" lon="-79.3771510">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:10Z</time>
     </trkpt>
     <trkpt lat="43.6413500" lon="-79.3771180">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:12Z</time>
     </trkpt>
     <trkpt lat="43.6413470" lon="-79.3771090">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:13Z</time>
     </trkpt>
     <trkpt lat="43.6413430" lon="-79.3771220">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:15Z</time>
     </trkpt>
     <trkpt lat="43.6413480" lon="-79.3771490">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:16Z</time>
     </trkpt>
     <trkpt lat="43.6413430" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:18Z</time>
     </trkpt>
     <trkpt lat="43.6413420" lon="-79.3771740">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:19Z</time>
     </trkpt>
     <trkpt lat="43.6413410" lon="-79.3771790">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:21Z</time>
     </trkpt>
     <trkpt lat="43.6413410" lon="-79.3771790">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:22Z</time>
     </trkpt>
     <trkpt lat="43.6413400" lon="-79.3771790">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:24Z</time>
     </trkpt>
     <trkpt lat="43.6413420" lon="-79.3771770">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:25Z</time>
     </trkpt>
     <trkpt lat="43.6413440" lon="-79.3771760">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:26Z</time>
     </trkpt>
     <trkpt lat="43.6413470" lon="-79.3771750">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:27Z</time>
     </trkpt>
     <trkpt lat="43.6413520" lon="-79.3771770">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:29Z</time>
     </trkpt>
     <trkpt lat="43.6413570" lon="-79.3771790">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:31Z</time>
     </trkpt>
     <trkpt lat="43.6413620" lon="-79.3771820">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:33Z</time>
     </trkpt>
     <trkpt lat="43.6413630" lon="-79.3771820">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:34Z</time>
     </trkpt>
     <trkpt lat="43.6413650" lon="-79.3771830">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:35Z</time>
     </trkpt>
     <trkpt lat="43.6413670" lon="-79.3771830">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:37Z</time>
     </trkpt>
     <trkpt lat="43.6413670" lon="-79.3771830">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:39Z</time>
     </trkpt>
     <trkpt lat="43.6413670" lon="-79.3771810">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:41Z</time>
     </trkpt>
     <trkpt lat="43.6413670" lon="-79.3771800">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:42Z</time>
     </trkpt>
     <trkpt lat="43.6413650" lon="-79.3771780">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:44Z</time>
     </trkpt>
     <trkpt lat="43.6413630" lon="-79.3771760">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:46Z</time>
     </trkpt>
     <trkpt lat="43.6413620" lon="-79.3771750">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:47Z</time>
     </trkpt>
     <trkpt lat="43.6413610" lon="-79.3771750">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:48Z</time>
     </trkpt>
     <trkpt lat="43.6413590" lon="-79.3771730">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:50Z</time>
     </trkpt>
     <trkpt lat="43.6413580" lon="-79.3771720">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:52Z</time>
     </trkpt>
     <trkpt lat="43.6413570" lon="-79.3771710">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:54Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771700">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:55Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771700">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:56Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:58Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771680">
      <ele>77.8</ele>
      <time>2021-12-16T21:12:59Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771680">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:01Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771680">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:03Z</time>
     </trkpt>
     <trkpt lat="43.6413560" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:05Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:06Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:07Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:09Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:10Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771690">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:12Z</time>
     </trkpt>
     <trkpt lat="43.6413540" lon="-79.3771630">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:14Z</time>
     </trkpt>
     <trkpt lat="43.6413540" lon="-79.3771620">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:15Z</time>
     </trkpt>
     <trkpt lat="43.6413550" lon="-79.3771610">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:16Z</time>
     </trkpt>
     <trkpt lat="43.6413580" lon="-79.3771640">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:17Z</time>
     </trkpt>
     <trkpt lat="43.6413640" lon="-79.3771700">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:19Z</time>
     </trkpt>
     <trkpt lat="43.6413670" lon="-79.3771730">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:21Z</time>
     </trkpt>
     <trkpt lat="43.6413690" lon="-79.3771760">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:23Z</time>
     </trkpt>
     <trkpt lat="43.6413640" lon="-79.3771460">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:25Z</time>
     </trkpt>
     <trkpt lat="43.6413520" lon="-79.3771210">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:26Z</time>
     </trkpt>
     <trkpt lat="43.6413320" lon="-79.3770920">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:27Z</time>
     </trkpt>
     <trkpt lat="43.6413100" lon="-79.3770600">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:28Z</time>
     </trkpt>
     <trkpt lat="43.6412990" lon="-79.3770130">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:29Z</time>
     </trkpt>
     <trkpt lat="43.6412770" lon="-79.3769700">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:31Z</time>
     </trkpt>
     <trkpt lat="43.6412430" lon="-79.3769200">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:32Z</time>
     </trkpt>
     <trkpt lat="43.6411930" lon="-79.3768740">
      <ele>77.6</ele>
      <time>2021-12-16T21:13:33Z</time>
     </trkpt>
     <trkpt lat="43.6411540" lon="-79.3768390">
      <ele>77.6</ele>
      <time>2021-12-16T21:13:34Z</time>
     </trkpt>
     <trkpt lat="43.6411110" lon="-79.3768010">
      <ele>77.6</ele>
      <time>2021-12-16T21:13:35Z</time>
     </trkpt>
     <trkpt lat="43.6410660" lon="-79.3767730">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:36Z</time>
     </trkpt>
     <trkpt lat="43.6410290" lon="-79.3767580">
      <ele>77.7</ele>
      <time>2021-12-16T21:13:37Z</time>
     </trkpt>
     <trkpt lat="43.6409700" lon="-79.3767480">
      <ele>77.8</ele>
      <time>2021-12-16T21:13:39Z</time>
     </trkpt>
     <trkpt lat="43.6409120" lon="-79.3767570">
      <ele>77.9</ele>
      <time>2021-12-16T21:13:40Z</time>
     </trkpt>
     <trkpt lat="43.6408430" lon="-79.3767620">
      <ele>78.0</ele>
      <time>2021-12-16T21:13:42Z</time>
     </trkpt>
     <trkpt lat="43.6407980" lon="-79.3767680">
      <ele>78.0</ele>
      <time>2021-12-16T21:13:43Z</time>
     </trkpt>
     <trkpt lat="43.6407530" lon="-79.3767680">
      <ele>78.1</ele>
      <time>2021-12-16T21:13:44Z</time>
     </trkpt>
     <trkpt lat="43.6407200" lon="-79.3767660">
      <ele>78.2</ele>
      <time>2021-12-16T21:13:45Z</time>
     </trkpt>
     <trkpt lat="43.6406880" lon="-79.3767610">
      <ele>78.2</ele>
      <time>2021-12-16T21:13:46Z</time>
     </trkpt>
     <trkpt lat="43.6406580" lon="-79.3767500">
      <ele>78.3</ele>
      <time>2021-12-16T21:13:47Z</time>
     </trkpt>
     <trkpt lat="43.6406250" lon="-79.3767320">
      <ele>78.3</ele>
      <time>2021-12-16T21:13:48Z</time>
     </trkpt>
     <trkpt lat="43.6405850" lon="-79.3766970">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:50Z</time>
     </trkpt>
     <trkpt lat="43.6405600" lon="-79.3766570">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:51Z</time>
     </trkpt>
     <trkpt lat="43.6405440" lon="-79.3766200">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:52Z</time>
     </trkpt>
     <trkpt lat="43.6405230" lon="-79.3765600">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:54Z</time>
     </trkpt>
     <trkpt lat="43.6405040" lon="-79.3765230">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:55Z</time>
     </trkpt>
     <trkpt lat="43.6404810" lon="-79.3764950">
      <ele>78.4</ele>
      <time>2021-12-16T21:13:56Z</time>
     </trkpt>
     <trkpt lat="43.6404610" lon="-79.3764740">
      <ele>78.3</ele>
      <time>2021-12-16T21:13:57Z</time>
     </trkpt>
     <trkpt lat="43.6404280" lon="-79.3764320">
      <ele>78.3</ele>
      <time>2021-12-16T21:13:59Z</time>
     </trkpt>
     <trkpt lat="43.6404100" lon="-79.3764040">
      <ele>78.2</ele>
      <time>2021-12-16T21:14:00Z</time>
     </trkpt>
     <trkpt lat="43.6403920" lon="-79.3763680">
      <ele>78.2</ele>
      <time>2021-12-16T21:14:01Z</time>
     </trkpt>
     <trkpt lat="43.6403680" lon="-79.3763120">
      <ele>78.1</ele>
      <time>2021-12-16T21:14:02Z</time>
     </trkpt>
     <trkpt lat="43.6403350" lon="-79.3762250">
      <ele>78.0</ele>
      <time>2021-12-16T21:14:04Z</time>
     </trkpt>
     <trkpt lat="43.6403120" lon="-79.3761740">
      <ele>78.0</ele>
      <time>2021-12-16T21:14:06Z</time>
     </trkpt>
     <trkpt lat="43.6402900" lon="-79.3761400">
      <ele>77.9</ele>
      <time>2021-12-16T21:14:07Z</time>
     </trkpt>
     <trkpt lat="43.6402520" lon="-79.3760950">
      <ele>77.7</ele>
      <time>2021-12-16T21:14:08Z</time>
     </trkpt>
     <trkpt lat="43.6402170" lon="-79.3760570">
      <ele>77.6</ele>
      <time>2021-12-16T21:14:10Z</time>
     </trkpt>
     <trkpt lat="43.6401770" lon="-79.3760270">
      <ele>77.5</ele>
      <time>2021-12-16T21:14:11Z</time>
     </trkpt>
     <trkpt lat="43.6401480" lon="-79.3760070">
      <ele>77.5</ele>
      <time>2021-12-16T21:14:12Z</time>
     </trkpt>
     <trkpt lat="43.6401160" lon="-79.3759850">
      <ele>77.4</ele>
      <time>2021-12-16T21:14:13Z</time>
     </trkpt>
     <trkpt lat="43.6400840" lon="-79.3759640">
      <ele>77.4</ele>
      <time>2021-12-16T21:14:14Z</time>
     </trkpt>
     <trkpt lat="43.6400320" lon="-79.3759260">
      <ele>77.3</ele>
      <time>2021-12-16T21:14:16Z</time>
     </trkpt>
     <trkpt lat="43.6399990" lon="-79.3759030">
      <ele>77.2</ele>
      <time>2021-12-16T21:14:18Z</time>
     </trkpt>
     <trkpt lat="43.6399730" lon="-79.3758890">
      <ele>77.2</ele>
      <time>2021-12-16T21:14:19Z</time>
     </trkpt>
     <trkpt lat="43.6399450" lon="-79.3758800">
      <ele>77.2</ele>
      <time>2021-12-16T21:14:20Z</time>
     </trkpt>
     <trkpt lat="43.6399140" lon="-79.3758740">
      <ele>77.2</ele>
      <time>2021-12-16T21:14:21Z</time>
     </trkpt>
     <trkpt lat="43.6398850" lon="-79.3758720">
      <ele>77.1</ele>
      <time>2021-12-16T21:14:22Z</time>
     </trkpt>
     <trkpt lat="43.6398510" lon="-79.3758720">
      <ele>77.1</ele>
      <time>2021-12-16T21:14:23Z</time>
     </trkpt>
     <trkpt lat="43.6398240" lon="-79.3758690">
      <ele>77.1</ele>
      <time>2021-12-16T21:14:24Z</time>
     </trkpt>
     <trkpt lat="43.6397930" lon="-79.3758500">
      <ele>77.1</ele>
      <time>2021-12-16T21:14:26Z</time>
     </trkpt>
     <trkpt lat="43.6397590" lon="-79.3758220">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:27Z</time>
     </trkpt>
     <trkpt lat="43.6397470" lon="-79.3758120">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:28Z</time>
     </trkpt>
     <trkpt lat="43.6397220" lon="-79.3757900">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:29Z</time>
     </trkpt>
     <trkpt lat="43.6396940" lon="-79.3757600">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:30Z</time>
     </trkpt>
     <trkpt lat="43.6396730" lon="-79.3757340">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:31Z</time>
     </trkpt>
     <trkpt lat="43.6396460" lon="-79.3757070">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:32Z</time>
     </trkpt>
     <trkpt lat="43.6396140" lon="-79.3756780">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:34Z</time>
     </trkpt>
     <trkpt lat="43.6395930" lon="-79.3756780">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:35Z</time>
     </trkpt>
     <trkpt lat="43.6395790" lon="-79.3756840">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:36Z</time>
     </trkpt>
     <trkpt lat="43.6395600" lon="-79.3756900">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:37Z</time>
     </trkpt>
     <trkpt lat="43.6395490" lon="-79.3757020">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:38Z</time>
     </trkpt>
     <trkpt lat="43.6395340" lon="-79.3757410">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:39Z</time>
     </trkpt>
     <trkpt lat="43.6395310" lon="-79.3757540">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:40Z</time>
     </trkpt>
     <trkpt lat="43.6395230" lon="-79.3758010">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:41Z</time>
     </trkpt>
     <trkpt lat="43.6395200" lon="-79.3758170">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:42Z</time>
     </trkpt>
     <trkpt lat="43.6395110" lon="-79.3758860">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:44Z</time>
     </trkpt>
     <trkpt lat="43.6395080" lon="-79.3759120">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:45Z</time>
     </trkpt>
     <trkpt lat="43.6395060" lon="-79.3759380">
      <ele>77.0</ele>
      <time>2021-12-16T21:14:46Z</time>
     </trkpt>
     <trkpt lat="43.6395000" lon="-79.3759880">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:47Z</time>
     </trkpt>
     <trkpt lat="43.6394980" lon="-79.3760050">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:48Z</time>
     </trkpt>
     <trkpt lat="43.6394850" lon="-79.3760570">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:49Z</time>
     </trkpt>
     <trkpt lat="43.6394800" lon="-79.3760760">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:50Z</time>
     </trkpt>
     <trkpt lat="43.6394690" lon="-79.3761140">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:51Z</time>
     </trkpt>
     <trkpt lat="43.6394580" lon="-79.3761560">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:52Z</time>
     </trkpt>
     <trkpt lat="43.6394470" lon="-79.3761990">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:53Z</time>
     </trkpt>
     <trkpt lat="43.6394370" lon="-79.3762530">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:54Z</time>
     </trkpt>
     <trkpt lat="43.6394280" lon="-79.3763010">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:56Z</time>
     </trkpt>
     <trkpt lat="43.6394180" lon="-79.3763560">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:57Z</time>
     </trkpt>
     <trkpt lat="43.6394080" lon="-79.3764090">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:58Z</time>
     </trkpt>
     <trkpt lat="43.6393970" lon="-79.3764550">
      <ele>76.9</ele>
      <time>2021-12-16T21:14:59Z</time>
     </trkpt>
     <trkpt lat="43.6393860" lon="-79.3765140">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:01Z</time>
     </trkpt>
     <trkpt lat="43.6393760" lon="-79.3765530">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:02Z</time>
     </trkpt>
     <trkpt lat="43.6393660" lon="-79.3765890">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:03Z</time>
     </trkpt>
     <trkpt lat="43.6393540" lon="-79.3766240">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:04Z</time>
     </trkpt>
     <trkpt lat="43.6393420" lon="-79.3766590">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:05Z</time>
     </trkpt>
     <trkpt lat="43.6393270" lon="-79.3767000">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:06Z</time>
     </trkpt>
     <trkpt lat="43.6393100" lon="-79.3767520">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:07Z</time>
     </trkpt>
     <trkpt lat="43.6392970" lon="-79.3767890">
      <ele>76.9</ele>
      <time>2021-12-16T21:15:08Z</time>
     </trkpt>
     <trkpt lat="43.6392850" lon="-79.3768240">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:10Z</time>
     </trkpt>
     <trkpt lat="43.6392700" lon="-79.3768600">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:11Z</time>
     </trkpt>
     <trkpt lat="43.6392550" lon="-79.3768980">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:12Z</time>
     </trkpt>
     <trkpt lat="43.6392360" lon="-79.3769460">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:13Z</time>
     </trkpt>
     <trkpt lat="43.6392300" lon="-79.3769620">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:14Z</time>
     </trkpt>
     <trkpt lat="43.6392210" lon="-79.3770110">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:15Z</time>
     </trkpt>
     <trkpt lat="43.6392180" lon="-79.3770270">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:16Z</time>
     </trkpt>
     <trkpt lat="43.6392060" lon="-79.3770920">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:18Z</time>
     </trkpt>
     <trkpt lat="43.6392110" lon="-79.3771420">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:20Z</time>
     </trkpt>
     <trkpt lat="43.6392250" lon="-79.3772040">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:21Z</time>
     </trkpt>
     <trkpt lat="43.6392390" lon="-79.3772300">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:22Z</time>
     </trkpt>
     <trkpt lat="43.6392500" lon="-79.3772620">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:24Z</time>
     </trkpt>
     <trkpt lat="43.6392650" lon="-79.3772940">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:25Z</time>
     </trkpt>
     <trkpt lat="43.6392700" lon="-79.3773060">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:26Z</time>
     </trkpt>
     <trkpt lat="43.6392800" lon="-79.3773500">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:27Z</time>
     </trkpt>
     <trkpt lat="43.6392840" lon="-79.3773670">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:28Z</time>
     </trkpt>
     <trkpt lat="43.6392990" lon="-79.3774140">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:29Z</time>
     </trkpt>
     <trkpt lat="43.6393040" lon="-79.3774280">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:30Z</time>
     </trkpt>
     <trkpt lat="43.6393250" lon="-79.3774670">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:31Z</time>
     </trkpt>
     <trkpt lat="43.6393320" lon="-79.3774800">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:32Z</time>
     </trkpt>
     <trkpt lat="43.6393490" lon="-79.3775090">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:33Z</time>
     </trkpt>
     <trkpt lat="43.6393760" lon="-79.3775430">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:34Z</time>
     </trkpt>
     <trkpt lat="43.6393930" lon="-79.3775670">
      <ele>77.2</ele>
      <time>2021-12-16T21:15:35Z</time>
     </trkpt>
     <trkpt lat="43.6394080" lon="-79.3775980">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:37Z</time>
     </trkpt>
     <trkpt lat="43.6394090" lon="-79.3776220">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:38Z</time>
     </trkpt>
     <trkpt lat="43.6394000" lon="-79.3776440">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:39Z</time>
     </trkpt>
     <trkpt lat="43.6393880" lon="-79.3776600">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:40Z</time>
     </trkpt>
     <trkpt lat="43.6393750" lon="-79.3776780">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:41Z</time>
     </trkpt>
     <trkpt lat="43.6393570" lon="-79.3777140">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:42Z</time>
     </trkpt>
     <trkpt lat="43.6393530" lon="-79.3777270">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:43Z</time>
     </trkpt>
     <trkpt lat="43.6393480" lon="-79.3777520">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:44Z</time>
     </trkpt>
     <trkpt lat="43.6393460" lon="-79.3777840">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:46Z</time>
     </trkpt>
     <trkpt lat="43.6393470" lon="-79.3778070">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:47Z</time>
     </trkpt>
     <trkpt lat="43.6393450" lon="-79.3778250">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:48Z</time>
     </trkpt>
     <trkpt lat="43.6393530" lon="-79.3778280">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:49Z</time>
     </trkpt>
     <trkpt lat="43.6393470" lon="-79.3778410">
      <ele>77.1</ele>
      <time>2021-12-16T21:15:50Z</time>
     </trkpt>
     <trkpt lat="43.6393320" lon="-79.3778650">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:51Z</time>
     </trkpt>
     <trkpt lat="43.6393080" lon="-79.3778980">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:53Z</time>
     </trkpt>
     <trkpt lat="43.6392860" lon="-79.3779290">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:54Z</time>
     </trkpt>
     <trkpt lat="43.6392670" lon="-79.3779620">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:55Z</time>
     </trkpt>
     <trkpt lat="43.6392510" lon="-79.3779950">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:56Z</time>
     </trkpt>
     <trkpt lat="43.6392320" lon="-79.3780410">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:57Z</time>
     </trkpt>
     <trkpt lat="43.6392200" lon="-79.3780830">
      <ele>77.0</ele>
      <time>2021-12-16T21:15:58Z</time>
     </trkpt>
     <trkpt lat="43.6392150" lon="-79.3781570">
      <ele>77.0</ele>
      <time>2021-12-16T21:16:00Z</time>
     </trkpt>
     <trkpt lat="43.6392190" lon="-79.3782080">
      <ele>77.0</ele>
      <time>2021-12-16T21:16:01Z</time>
     </trkpt>
     <trkpt lat="43.6392180" lon="-79.3782540">
      <ele>77.0</ele>
      <time>2021-12-16T21:16:02Z</time>
     </trkpt>
     <trkpt lat="43.6392170" lon="-79.3783010">
      <ele>77.0</ele>
      <time>2021-12-16T21:16:03Z</time>
     </trkpt>
     <trkpt lat="43.6392160" lon="-79.3783510">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:04Z</time>
     </trkpt>
     <trkpt lat="43.6392010" lon="-79.3783930">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:05Z</time>
     </trkpt>
     <trkpt lat="43.6391960" lon="-79.3784080">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:06Z</time>
     </trkpt>
     <trkpt lat="43.6391910" lon="-79.3784340">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:07Z</time>
     </trkpt>
     <trkpt lat="43.6391840" lon="-79.3784660">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:09Z</time>
     </trkpt>
     <trkpt lat="43.6391720" lon="-79.3785030">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:10Z</time>
     </trkpt>
     <trkpt lat="43.6391670" lon="-79.3785140">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:11Z</time>
     </trkpt>
     <trkpt lat="43.6391500" lon="-79.3785440">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:12Z</time>
     </trkpt>
     <trkpt lat="43.6391340" lon="-79.3785650">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:13Z</time>
     </trkpt>
     <trkpt lat="43.6391070" lon="-79.3785870">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:15Z</time>
     </trkpt>
     <trkpt lat="43.6390820" lon="-79.3786030">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:16Z</time>
     </trkpt>
     <trkpt lat="43.6390730" lon="-79.3786100">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:17Z</time>
     </trkpt>
     <trkpt lat="43.6390400" lon="-79.3786320">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:18Z</time>
     </trkpt>
     <trkpt lat="43.6390290" lon="-79.3786410">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:19Z</time>
     </trkpt>
     <trkpt lat="43.6390080" lon="-79.3786700">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:21Z</time>
     </trkpt>
     <trkpt lat="43.6389960" lon="-79.3787230">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:22Z</time>
     </trkpt>
     <trkpt lat="43.6389980" lon="-79.3787960">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:23Z</time>
     </trkpt>
     <trkpt lat="43.6389980" lon="-79.3788610">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:24Z</time>
     </trkpt>
     <trkpt lat="43.6389980" lon="-79.3789440">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:26Z</time>
     </trkpt>
     <trkpt lat="43.6389840" lon="-79.3789860">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:27Z</time>
     </trkpt>
     <trkpt lat="43.6389780" lon="-79.3790410">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:29Z</time>
     </trkpt>
     <trkpt lat="43.6389940" lon="-79.3790910">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:30Z</time>
     </trkpt>
     <trkpt lat="43.6390010" lon="-79.3791100">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:31Z</time>
     </trkpt>
     <trkpt lat="43.6390170" lon="-79.3791460">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:32Z</time>
     </trkpt>
     <trkpt lat="43.6390320" lon="-79.3791800">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:33Z</time>
     </trkpt>
     <trkpt lat="43.6390530" lon="-79.3792280">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:34Z</time>
     </trkpt>
     <trkpt lat="43.6391120" lon="-79.3792850">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:35Z</time>
     </trkpt>
     <trkpt lat="43.6391620" lon="-79.3793350">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:36Z</time>
     </trkpt>
     <trkpt lat="43.6392050" lon="-79.3793850">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:38Z</time>
     </trkpt>
     <trkpt lat="43.6392330" lon="-79.3794150">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:39Z</time>
     </trkpt>
     <trkpt lat="43.6392620" lon="-79.3794370">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:40Z</time>
     </trkpt>
     <trkpt lat="43.6392990" lon="-79.3794620">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:41Z</time>
     </trkpt>
     <trkpt lat="43.6393280" lon="-79.3794800">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:42Z</time>
     </trkpt>
     <trkpt lat="43.6393580" lon="-79.3794900">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:43Z</time>
     </trkpt>
     <trkpt lat="43.6393930" lon="-79.3794890">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:44Z</time>
     </trkpt>
     <trkpt lat="43.6394320" lon="-79.3794850">
      <ele>77.1</ele>
      <time>2021-12-16T21:16:45Z</time>
     </trkpt>
     <trkpt lat="43.6394700" lon="-79.3794920">
      <ele>77.2</ele>
      <time>2021-12-16T21:16:47Z</time>
     </trkpt>
     <trkpt lat="43.6395020" lon="-79.3794980">
      <ele>77.2</ele>
      <time>2021-12-16T21:16:48Z</time>
     </trkpt>
     <trkpt lat="43.6395350" lon="-79.3794980">
      <ele>77.2</ele>
      <time>2021-12-16T21:16:49Z</time>
     </trkpt>
     <trkpt lat="43.6395670" lon="-79.3794990">
      <ele>77.4</ele>
      <time>2021-12-16T21:16:50Z</time>
     </trkpt>
     <trkpt lat="43.6395970" lon="-79.3794950">
      <ele>77.7</ele>
      <time>2021-12-16T21:16:51Z</time>
     </trkpt>
     <trkpt lat="43.6396310" lon="-79.3794910">
      <ele>77.9</ele>
      <time>2021-12-16T21:16:52Z</time>
     </trkpt>
     <trkpt lat="43.6396590" lon="-79.3794910">
      <ele>78.1</ele>
      <time>2021-12-16T21:16:53Z</time>
     </trkpt>
     <trkpt lat="43.6397020" lon="-79.3794870">
      <ele>78.3</ele>
      <time>2021-12-16T21:16:55Z</time>
     </trkpt>
     <trkpt lat="43.6397330" lon="-79.3794850">
      <ele>78.5</ele>
      <time>2021-12-16T21:16:56Z</time>
     </trkpt>
     <trkpt lat="43.6397630" lon="-79.3794830">
      <ele>78.7</ele>
      <time>2021-12-16T21:16:57Z</time>
     </trkpt>
     <trkpt lat="43.6397960" lon="-79.3794790">
      <ele>78.9</ele>
      <time>2021-12-16T21:16:58Z</time>
     </trkpt>
     <trkpt lat="43.6398300" lon="-79.3794790">
      <ele>79.1</ele>
      <time>2021-12-16T21:16:59Z</time>
     </trkpt>
     <trkpt lat="43.6398570" lon="-79.3794820">
      <ele>79.3</ele>
      <time>2021-12-16T21:17:00Z</time>
     </trkpt>
     <trkpt lat="43.6398930" lon="-79.3794870">
      <ele>79.5</ele>
      <time>2021-12-16T21:17:02Z</time>
     </trkpt>
     <trkpt lat="43.6399230" lon="-79.3794940">
      <ele>79.7</ele>
      <time>2021-12-16T21:17:03Z</time>
     </trkpt>
     <trkpt lat="43.6399530" lon="-79.3794990">
      <ele>79.9</ele>
      <time>2021-12-16T21:17:04Z</time>
     </trkpt>
     <trkpt lat="43.6399830" lon="-79.3795120">
      <ele>80.1</ele>
      <time>2021-12-16T21:17:05Z</time>
     </trkpt>
     <trkpt lat="43.6400110" lon="-79.3795560">
      <ele>80.3</ele>
      <time>2021-12-16T21:17:06Z</time>
     </trkpt>
     <trkpt lat="43.6400160" lon="-79.3796520">
      <ele>80.3</ele>
      <time>2021-12-16T21:17:07Z</time>
     </trkpt>
     <trkpt lat="43.6400060" lon="-79.3797370">
      <ele>80.4</ele>
      <time>2021-12-16T21:17:08Z</time>
     </trkpt>
     <trkpt lat="43.6399920" lon="-79.3798140">
      <ele>80.5</ele>
      <time>2021-12-16T21:17:10Z</time>
     </trkpt>
     <trkpt lat="43.6399770" lon="-79.3798920">
      <ele>80.3</ele>
      <time>2021-12-16T21:17:11Z</time>
     </trkpt>
     <trkpt lat="43.6399510" lon="-79.3799580">
      <ele>80.0</ele>
      <time>2021-12-16T21:17:12Z</time>
     </trkpt>
     <trkpt lat="43.6399390" lon="-79.3799930">
      <ele>80.0</ele>
      <time>2021-12-16T21:17:13Z</time>
     </trkpt>
     <trkpt lat="43.6399170" lon="-79.3800380">
      <ele>79.7</ele>
      <time>2021-12-16T21:17:14Z</time>
     </trkpt>
     <trkpt lat="43.6399070" lon="-79.3800530">
      <ele>79.6</ele>
      <time>2021-12-16T21:17:15Z</time>
     </trkpt>
     <trkpt lat="43.6398660" lon="-79.3800810">
      <ele>79.4</ele>
      <time>2021-12-16T21:17:17Z</time>
     </trkpt>
     <trkpt lat="43.6398330" lon="-79.3800920">
      <ele>78.9</ele>
      <time>2021-12-16T21:17:18Z</time>
     </trkpt>
     <trkpt lat="43.6397990" lon="-79.3800920">
      <ele>78.7</ele>
      <time>2021-12-16T21:17:19Z</time>
     </trkpt>
     <trkpt lat="43.6397660" lon="-79.3800910">
      <ele>78.5</ele>
      <time>2021-12-16T21:17:20Z</time>
     </trkpt>
     <trkpt lat="43.6397340" lon="-79.3800940">
      <ele>78.3</ele>
      <time>2021-12-16T21:17:21Z</time>
     </trkpt>
     <trkpt lat="43.6396970" lon="-79.3800960">
      <ele>78.1</ele>
      <time>2021-12-16T21:17:22Z</time>
     </trkpt>
     <trkpt lat="43.6396630" lon="-79.3801020">
      <ele>78.0</ele>
      <time>2021-12-16T21:17:23Z</time>
     </trkpt>
     <trkpt lat="43.6396220" lon="-79.3801080">
      <ele>77.8</ele>
      <time>2021-12-16T21:17:24Z</time>
     </trkpt>
     <trkpt lat="43.6395890" lon="-79.3801130">
      <ele>77.7</ele>
      <time>2021-12-16T21:17:25Z</time>
     </trkpt>
     <trkpt lat="43.6395330" lon="-79.3801310">
      <ele>77.7</ele>
      <time>2021-12-16T21:17:26Z</time>
     </trkpt>
     <trkpt lat="43.6394660" lon="-79.3801470">
      <ele>77.6</ele>
      <time>2021-12-16T21:17:28Z</time>
     </trkpt>
     <trkpt lat="43.6394100" lon="-79.3801490">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:29Z</time>
     </trkpt>
     <trkpt lat="43.6393710" lon="-79.3801470">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:30Z</time>
     </trkpt>
     <trkpt lat="43.6393360" lon="-79.3801440">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:31Z</time>
     </trkpt>
     <trkpt lat="43.6393040" lon="-79.3801400">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:32Z</time>
     </trkpt>
     <trkpt lat="43.6392710" lon="-79.3801370">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:33Z</time>
     </trkpt>
     <trkpt lat="43.6392290" lon="-79.3801350">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:35Z</time>
     </trkpt>
     <trkpt lat="43.6391960" lon="-79.3801330">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:36Z</time>
     </trkpt>
     <trkpt lat="43.6391660" lon="-79.3801320">
      <ele>77.3</ele>
      <time>2021-12-16T21:17:37Z</time>
     </trkpt>
     <trkpt lat="43.6391360" lon="-79.3801330">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:38Z</time>
     </trkpt>
     <trkpt lat="43.6391010" lon="-79.3801340">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:39Z</time>
     </trkpt>
     <trkpt lat="43.6390720" lon="-79.3801370">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:40Z</time>
     </trkpt>
     <trkpt lat="43.6390420" lon="-79.3801400">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:41Z</time>
     </trkpt>
     <trkpt lat="43.6390110" lon="-79.3801420">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:42Z</time>
     </trkpt>
     <trkpt lat="43.6389810" lon="-79.3801430">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:43Z</time>
     </trkpt>
     <trkpt lat="43.6389560" lon="-79.3801400">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:44Z</time>
     </trkpt>
     <trkpt lat="43.6389210" lon="-79.3801350">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:46Z</time>
     </trkpt>
     <trkpt lat="43.6388900" lon="-79.3801320">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:47Z</time>
     </trkpt>
     <trkpt lat="43.6388510" lon="-79.3801320">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:48Z</time>
     </trkpt>
     <trkpt lat="43.6388110" lon="-79.3801260">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:49Z</time>
     </trkpt>
     <trkpt lat="43.6387760" lon="-79.3801140">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:50Z</time>
     </trkpt>
     <trkpt lat="43.6387440" lon="-79.3801000">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:51Z</time>
     </trkpt>
     <trkpt lat="43.6387140" lon="-79.3800820">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:52Z</time>
     </trkpt>
     <trkpt lat="43.6386870" lon="-79.3800530">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:53Z</time>
     </trkpt>
     <trkpt lat="43.6386630" lon="-79.3800290">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:54Z</time>
     </trkpt>
     <trkpt lat="43.6386300" lon="-79.3799980">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:56Z</time>
     </trkpt>
     <trkpt lat="43.6386020" lon="-79.3799750">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:57Z</time>
     </trkpt>
     <trkpt lat="43.6385730" lon="-79.3799540">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:58Z</time>
     </trkpt>
     <trkpt lat="43.6385450" lon="-79.3799390">
      <ele>77.2</ele>
      <time>2021-12-16T21:17:59Z</time>
     </trkpt>
     <trkpt lat="43.6385130" lon="-79.3799260">
      <ele>77.2</ele>
      <time>2021-12-16T21:18:00Z</time>
     </trkpt>
     <trkpt lat="43.6384880" lon="-79.3799170">
      <ele>77.2</ele>
      <time>2021-12-16T21:18:01Z</time>
     </trkpt>
     <trkpt lat="43.6384420" lon="-79.3799020">
      <ele>77.1</ele>
      <time>2021-12-16T21:18:03Z</time>
     </trkpt>
     <trkpt lat="43.6384010" lon="-79.3798930">
      <ele>77.1</ele>
      <time>2021-12-16T21:18:04Z</time>
     </trkpt>
     <trkpt lat="43.6383870" lon="-79.3798910">
      <ele>77.1</ele>
      <time>2021-12-16T21:18:05Z</time>
     </trkpt>
     <trkpt lat="43.6383550" lon="-79.3798910">
      <ele>77.1</ele>
      <time>2021-12-16T21:18:06Z</time>
     </trkpt>
     <trkpt lat="43.6383220" lon="-79.3798930">
      <ele>77.1</ele>
      <time>2021-12-16T21:18:07Z</time>
     </trkpt>
     <trkpt lat="43.6382720" lon="-79.3799220">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:08Z</time>
     </trkpt>
     <trkpt lat="43.6382360" lon="-79.3799390">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:09Z</time>
     </trkpt>
     <trkpt lat="43.6381940" lon="-79.3799450">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:11Z</time>
     </trkpt>
     <trkpt lat="43.6381810" lon="-79.3799410">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:12Z</time>
     </trkpt>
     <trkpt lat="43.6381680" lon="-79.3799380">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:13Z</time>
     </trkpt>
     <trkpt lat="43.6381620" lon="-79.3799190">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:14Z</time>
     </trkpt>
     <trkpt lat="43.6381570" lon="-79.3799000">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:15Z</time>
     </trkpt>
     <trkpt lat="43.6381530" lon="-79.3798900">
      <ele>77.0</ele>
      <time>2021-12-16T21:18:16Z</time>
     </trkpt>
     <trkpt lat="43.6381520" lon="-79.3799020">
      <ele>76.9</ele>
      <time>2021-12-16T21:18:17Z</time>
     </trkpt>
     <trkpt lat="43.6381450" lon="-79.3799290">
      <ele>76.9</ele>
      <time>2021-12-16T21:18:18Z</time>
     </trkpt>
     <trkpt lat="43.6381420" lon="-79.3799580">
      <ele>76.9</ele>
      <time>2021-12-16T21:18:20Z</time>
     </trkpt>
     <trkpt lat="43.6381430" lon="-79.3800010">
      <ele>76.9</ele>
      <time>2021-12-16T21:18:21Z</time>
     </trkpt>
     <trkpt lat="43.6381440" lon="-79.3800540">
      <ele>76.8</ele>
      <time>2021-12-16T21:18:22Z</time>
     </trkpt>
     <trkpt lat="43.6381430" lon="-79.3800960">
      <ele>76.8</ele>
      <time>2021-12-16T21:18:23Z</time>
     </trkpt>
     <trkpt lat="43.6381480" lon="-79.3801450">
      <ele>76.8</ele>
      <time>2021-12-16T21:18:24Z</time>
     </trkpt>
     <trkpt lat="43.6381520" lon="-79.3801940">
      <ele>76.8</ele>
      <time>2021-12-16T21:18:25Z</time>
     </trkpt>
     <trkpt lat="43.6381560" lon="-79.3802440">
      <ele>76.8</ele>
      <time>2021-12-16T21:18:26Z</time>
     </trkpt>
     <trkpt lat="43.6381620" lon="-79.3802940">
      <ele>76.7</ele>
      <time>2021-12-16T21:18:27Z</time>
     </trkpt>
     <trkpt lat="43.6381660" lon="-79.3803510">
      <ele>76.7</ele>
      <time>2021-12-16T21:18:29Z</time>
     </trkpt>
     <trkpt lat="43.6381690" lon="-79.3803940">
      <ele>76.7</ele>
      <time>2021-12-16T21:18:30Z</time>
     </trkpt>
     <trkpt lat="43.6381740" lon="-79.3804590">
      <ele>76.7</ele>
      <time>2021-12-16T21:18:31Z</time>
     </trkpt>
     <trkpt lat="43.6381760" lon="-79.3805140">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:32Z</time>
     </trkpt>
     <trkpt lat="43.6381780" lon="-79.3805620">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:33Z</time>
     </trkpt>
     <trkpt lat="43.6381770" lon="-79.3806230">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:35Z</time>
     </trkpt>
     <trkpt lat="43.6381750" lon="-79.3806930">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:36Z</time>
     </trkpt>
     <trkpt lat="43.6381740" lon="-79.3807360">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:37Z</time>
     </trkpt>
     <trkpt lat="43.6381700" lon="-79.3807720">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:38Z</time>
     </trkpt>
     <trkpt lat="43.6381700" lon="-79.3808110">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:40Z</time>
     </trkpt>
     <trkpt lat="43.6381670" lon="-79.3808640">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:41Z</time>
     </trkpt>
     <trkpt lat="43.6381650" lon="-79.3808810">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:42Z</time>
     </trkpt>
     <trkpt lat="43.6381540" lon="-79.3809320">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:43Z</time>
     </trkpt>
     <trkpt lat="43.6381370" lon="-79.3809700">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:44Z</time>
     </trkpt>
     <trkpt lat="43.6381110" lon="-79.3810140">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:45Z</time>
     </trkpt>
     <trkpt lat="43.6381020" lon="-79.3810300">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:46Z</time>
     </trkpt>
     <trkpt lat="43.6380810" lon="-79.3810820">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:48Z</time>
     </trkpt>
     <trkpt lat="43.6380690" lon="-79.3811210">
      <ele>76.6</ele>
      <time>2021-12-16T21:18:49Z</time>
     </trkpt>
     <trkpt lat="43.6380560" lon="-79.3811730">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:50Z</time>
     </trkpt>
     <trkpt lat="43.6380520" lon="-79.3811910">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:51Z</time>
     </trkpt>
     <trkpt lat="43.6380430" lon="-79.3812280">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:52Z</time>
     </trkpt>
     <trkpt lat="43.6380360" lon="-79.3812700">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:53Z</time>
     </trkpt>
     <trkpt lat="43.6380300" lon="-79.3813130">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:54Z</time>
     </trkpt>
     <trkpt lat="43.6380230" lon="-79.3813690">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:56Z</time>
     </trkpt>
     <trkpt lat="43.6380210" lon="-79.3813890">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:57Z</time>
     </trkpt>
     <trkpt lat="43.6380150" lon="-79.3814310">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:58Z</time>
     </trkpt>
     <trkpt lat="43.6380080" lon="-79.3814920">
      <ele>76.5</ele>
      <time>2021-12-16T21:18:59Z</time>
     </trkpt>
     <trkpt lat="43.6380050" lon="-79.3815170">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:00Z</time>
     </trkpt>
     <trkpt lat="43.6380050" lon="-79.3815710">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:02Z</time>
     </trkpt>
     <trkpt lat="43.6380080" lon="-79.3816100">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:03Z</time>
     </trkpt>
     <trkpt lat="43.6380100" lon="-79.3816700">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:04Z</time>
     </trkpt>
     <trkpt lat="43.6380100" lon="-79.3816970">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:05Z</time>
     </trkpt>
     <trkpt lat="43.6380030" lon="-79.3817470">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:06Z</time>
     </trkpt>
     <trkpt lat="43.6379990" lon="-79.3817620">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:07Z</time>
     </trkpt>
     <trkpt lat="43.6379900" lon="-79.3818120">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:09Z</time>
     </trkpt>
     <trkpt lat="43.6379870" lon="-79.3818330">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:10Z</time>
     </trkpt>
     <trkpt lat="43.6379890" lon="-79.3818610">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:11Z</time>
     </trkpt>
     <trkpt lat="43.6379910" lon="-79.3818980">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:13Z</time>
     </trkpt>
     <trkpt lat="43.6379900" lon="-79.3819500">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:14Z</time>
     </trkpt>
     <trkpt lat="43.6379900" lon="-79.3819710">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:15Z</time>
     </trkpt>
     <trkpt lat="43.6379910" lon="-79.3820210">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:16Z</time>
     </trkpt>
     <trkpt lat="43.6379910" lon="-79.3820380">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:17Z</time>
     </trkpt>
     <trkpt lat="43.6379910" lon="-79.3820760">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:18Z</time>
     </trkpt>
     <trkpt lat="43.6379880" lon="-79.3821330">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:20Z</time>
     </trkpt>
     <trkpt lat="43.6379840" lon="-79.3821810">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:21Z</time>
     </trkpt>
     <trkpt lat="43.6379850" lon="-79.3822360">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:23Z</time>
     </trkpt>
     <trkpt lat="43.6379880" lon="-79.3822790">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:24Z</time>
     </trkpt>
     <trkpt lat="43.6379910" lon="-79.3823200">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:25Z</time>
     </trkpt>
     <trkpt lat="43.6379890" lon="-79.3823670">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:26Z</time>
     </trkpt>
     <trkpt lat="43.6379830" lon="-79.3824040">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:27Z</time>
     </trkpt>
     <trkpt lat="43.6379710" lon="-79.3824510">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:28Z</time>
     </trkpt>
     <trkpt lat="43.6379510" lon="-79.3824940">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:29Z</time>
     </trkpt>
     <trkpt lat="43.6379340" lon="-79.3825320">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:30Z</time>
     </trkpt>
     <trkpt lat="43.6379200" lon="-79.3825640">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:31Z</time>
     </trkpt>
     <trkpt lat="43.6378990" lon="-79.3826030">
      <ele>76.5</ele>
      <time>2021-12-16T21:19:33Z</time>
     </trkpt>
     <trkpt lat="43.6378750" lon="-79.3826440">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:34Z</time>
     </trkpt>
     <trkpt lat="43.6378540" lon="-79.3826790">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:35Z</time>
     </trkpt>
     <trkpt lat="43.6378360" lon="-79.3827180">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:36Z</time>
     </trkpt>
     <trkpt lat="43.6378210" lon="-79.3827610">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:37Z</time>
     </trkpt>
     <trkpt lat="43.6378060" lon="-79.3828110">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:38Z</time>
     </trkpt>
     <trkpt lat="43.6377950" lon="-79.3828770">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:40Z</time>
     </trkpt>
     <trkpt lat="43.6377930" lon="-79.3829200">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:41Z</time>
     </trkpt>
     <trkpt lat="43.6377940" lon="-79.3829820">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:43Z</time>
     </trkpt>
     <trkpt lat="43.6377940" lon="-79.3830390">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:44Z</time>
     </trkpt>
     <trkpt lat="43.6377930" lon="-79.3830790">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:45Z</time>
     </trkpt>
     <trkpt lat="43.6377910" lon="-79.3831310">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:46Z</time>
     </trkpt>
     <trkpt lat="43.6377910" lon="-79.3831490">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:47Z</time>
     </trkpt>
     <trkpt lat="43.6377960" lon="-79.3832140">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:49Z</time>
     </trkpt>
     <trkpt lat="43.6378010" lon="-79.3832330">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:50Z</time>
     </trkpt>
     <trkpt lat="43.6378050" lon="-79.3832530">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:51Z</time>
     </trkpt>
     <trkpt lat="43.6378180" lon="-79.3833050">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:52Z</time>
     </trkpt>
     <trkpt lat="43.6378240" lon="-79.3833260">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:53Z</time>
     </trkpt>
     <trkpt lat="43.6378330" lon="-79.3833670">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:54Z</time>
     </trkpt>
     <trkpt lat="43.6378400" lon="-79.3834100">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:55Z</time>
     </trkpt>
     <trkpt lat="43.6378450" lon="-79.3834490">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:56Z</time>
     </trkpt>
     <trkpt lat="43.6378500" lon="-79.3834900">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:57Z</time>
     </trkpt>
     <trkpt lat="43.6378530" lon="-79.3835460">
      <ele>76.6</ele>
      <time>2021-12-16T21:19:59Z</time>
     </trkpt>
     <trkpt lat="43.6378630" lon="-79.3835880">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:00Z</time>
     </trkpt>
     <trkpt lat="43.6378720" lon="-79.3836010">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:01Z</time>
     </trkpt>
     <trkpt lat="43.6378920" lon="-79.3836250">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:02Z</time>
     </trkpt>
     <trkpt lat="43.6379010" lon="-79.3836330">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:03Z</time>
     </trkpt>
     <trkpt lat="43.6379330" lon="-79.3836630">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:05Z</time>
     </trkpt>
     <trkpt lat="43.6379430" lon="-79.3836730">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:06Z</time>
     </trkpt>
     <trkpt lat="43.6379720" lon="-79.3836990">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:07Z</time>
     </trkpt>
     <trkpt lat="43.6379820" lon="-79.3837070">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:08Z</time>
     </trkpt>
     <trkpt lat="43.6380070" lon="-79.3837270">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:09Z</time>
     </trkpt>
     <trkpt lat="43.6380510" lon="-79.3837530">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:11Z</time>
     </trkpt>
     <trkpt lat="43.6380640" lon="-79.3837600">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:12Z</time>
     </trkpt>
     <trkpt lat="43.6380770" lon="-79.3837670">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:13Z</time>
     </trkpt>
     <trkpt lat="43.6381060" lon="-79.3837780">
      <ele>76.7</ele>
      <time>2021-12-16T21:20:14Z</time>
     </trkpt>
     <trkpt lat="43.6381380" lon="-79.3837820">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:15Z</time>
     </trkpt>
     <trkpt lat="43.6381810" lon="-79.3837850">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:17Z</time>
     </trkpt>
     <trkpt lat="43.6382120" lon="-79.3837940">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:18Z</time>
     </trkpt>
     <trkpt lat="43.6382470" lon="-79.3838090">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:19Z</time>
     </trkpt>
     <trkpt lat="43.6382820" lon="-79.3838260">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:20Z</time>
     </trkpt>
     <trkpt lat="43.6383190" lon="-79.3838460">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:21Z</time>
     </trkpt>
     <trkpt lat="43.6383560" lon="-79.3838620">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:22Z</time>
     </trkpt>
     <trkpt lat="43.6383900" lon="-79.3838730">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:23Z</time>
     </trkpt>
     <trkpt lat="43.6384180" lon="-79.3838820">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:24Z</time>
     </trkpt>
     <trkpt lat="43.6384490" lon="-79.3838880">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:25Z</time>
     </trkpt>
     <trkpt lat="43.6384820" lon="-79.3838960">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:26Z</time>
     </trkpt>
     <trkpt lat="43.6385100" lon="-79.3839040">
      <ele>76.8</ele>
      <time>2021-12-16T21:20:27Z</time>
     </trkpt>
     <trkpt lat="43.6385520" lon="-79.3839170">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:28Z</time>
     </trkpt>
     <trkpt lat="43.6385670" lon="-79.3839210">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:29Z</time>
     </trkpt>
     <trkpt lat="43.6385980" lon="-79.3839280">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:30Z</time>
     </trkpt>
     <trkpt lat="43.6386260" lon="-79.3839370">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:31Z</time>
     </trkpt>
     <trkpt lat="43.6386570" lon="-79.3839500">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:32Z</time>
     </trkpt>
     <trkpt lat="43.6387000" lon="-79.3839700">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:34Z</time>
     </trkpt>
     <trkpt lat="43.6387350" lon="-79.3839850">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:35Z</time>
     </trkpt>
     <trkpt lat="43.6387730" lon="-79.3839970">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:36Z</time>
     </trkpt>
     <trkpt lat="43.6388050" lon="-79.3840100">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:37Z</time>
     </trkpt>
     <trkpt lat="43.6388460" lon="-79.3840310">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:39Z</time>
     </trkpt>
     <trkpt lat="43.6388710" lon="-79.3840500">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:40Z</time>
     </trkpt>
     <trkpt lat="43.6388780" lon="-79.3840550">
      <ele>76.9</ele>
      <time>2021-12-16T21:20:41Z</time>
     </trkpt>
     <trkpt lat="43.6389050" lon="-79.3840770">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:42Z</time>
     </trkpt>
     <trkpt lat="43.6389150" lon="-79.3840840">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:43Z</time>
     </trkpt>
     <trkpt lat="43.6389440" lon="-79.3841040">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:44Z</time>
     </trkpt>
     <trkpt lat="43.6389510" lon="-79.3841100">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:45Z</time>
     </trkpt>
     <trkpt lat="43.6389660" lon="-79.3841200">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:46Z</time>
     </trkpt>
     <trkpt lat="43.6389790" lon="-79.3841300">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:47Z</time>
     </trkpt>
     <trkpt lat="43.6389980" lon="-79.3841400">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:49Z</time>
     </trkpt>
     <trkpt lat="43.6390120" lon="-79.3841500">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:50Z</time>
     </trkpt>
     <trkpt lat="43.6390250" lon="-79.3841600">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:51Z</time>
     </trkpt>
     <trkpt lat="43.6390390" lon="-79.3841740">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:52Z</time>
     </trkpt>
     <trkpt lat="43.6390660" lon="-79.3842100">
      <ele>77.0</ele>
      <time>2021-12-16T21:20:53Z</time>
     </trkpt>
     <trkpt lat="43.6390760" lon="-79.3842270">
      <ele>77.1</ele>
      <time>2021-12-16T21:20:54Z</time>
     </trkpt>
     <trkpt lat="43.6390880" lon="-79.3842940">
      <ele>77.2</ele>
      <time>2021-12-16T21:20:56Z</time>
     </trkpt>
     <trkpt lat="43.6390900" lon="-79.3843510">
      <ele>77.2</ele>
      <time>2021-12-16T21:20:57Z</time>
     </trkpt>
     <trkpt lat="43.6390670" lon="-79.3844070">
      <ele>77.2</ele>
      <time>2021-12-16T21:20:59Z</time>
     </trkpt>
     <trkpt lat="43.6390540" lon="-79.3844430">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:00Z</time>
     </trkpt>
     <trkpt lat="43.6390340" lon="-79.3844760">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:01Z</time>
     </trkpt>
     <trkpt lat="43.6390250" lon="-79.3845150">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:02Z</time>
     </trkpt>
     <trkpt lat="43.6390220" lon="-79.3845270">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:03Z</time>
     </trkpt>
     <trkpt lat="43.6390170" lon="-79.3845770">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:05Z</time>
     </trkpt>
     <trkpt lat="43.6390170" lon="-79.3845940">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:06Z</time>
     </trkpt>
     <trkpt lat="43.6390180" lon="-79.3846520">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:07Z</time>
     </trkpt>
     <trkpt lat="43.6390120" lon="-79.3847200">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:08Z</time>
     </trkpt>
     <trkpt lat="43.6390050" lon="-79.3847750">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:09Z</time>
     </trkpt>
     <trkpt lat="43.6389960" lon="-79.3848320">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:11Z</time>
     </trkpt>
     <trkpt lat="43.6389940" lon="-79.3848550">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:12Z</time>
     </trkpt>
     <trkpt lat="43.6389930" lon="-79.3848920">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:13Z</time>
     </trkpt>
     <trkpt lat="43.6389890" lon="-79.3849360">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:14Z</time>
     </trkpt>
     <trkpt lat="43.6389870" lon="-79.3849770">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:15Z</time>
     </trkpt>
     <trkpt lat="43.6389870" lon="-79.3849900">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:16Z</time>
     </trkpt>
     <trkpt lat="43.6389840" lon="-79.3850620">
      <ele>77.2</ele>
      <time>2021-12-16T21:21:18Z</time>
     </trkpt>
     <trkpt lat="43.6389790" lon="-79.3850850">
      <ele>77.3</ele>
      <time>2021-12-16T21:21:19Z</time>
     </trkpt>
     <trkpt lat="43.6389750" lon="-79.3851080">
      <ele>77.3</ele>
      <time>2021-12-16T21:21:20Z</time>
     </trkpt>
     <trkpt lat="43.6389630" lon="-79.3851480">
      <ele>77.3</ele>
      <time>2021-12-16T21:21:21Z</time>
     </trkpt>
     <trkpt lat="43.6389450" lon="-79.3852030">
      <ele>77.3</ele>
      <time>2021-12-16T21:21:23Z</time>
     </trkpt>
     <trkpt lat="43.6389330" lon="-79.3852540">
      <ele>77.3</ele>
      <time>2021-12-16T21:21:24Z</time>
     </trkpt>
     <trkpt lat="43.6389280" lon="-79.3853000">
      <ele>77.4</ele>
      <time>2021-12-16T21:21:25Z</time>
     </trkpt>
     <trkpt lat="43.6389250" lon="-79.3853430">
      <ele>77.4</ele>
      <time>2021-12-16T21:21:26Z</time>
     </trkpt>
     <trkpt lat="43.6389240" lon="-79.3853840">
      <ele>77.4</ele>
      <time>2021-12-16T21:21:27Z</time>
     </trkpt>
     <trkpt lat="43.6389200" lon="-79.3854410">
      <ele>77.4</ele>
      <time>2021-12-16T21:21:29Z</time>
     </trkpt>
     <trkpt lat="43.6389180" lon="-79.3854610">
      <ele>77.4</ele>
      <time>2021-12-16T21:21:30Z</time>
     </trkpt>
     <trkpt lat="43.6389140" lon="-79.3855140">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:31Z</time>
     </trkpt>
     <trkpt lat="43.6389130" lon="-79.3855340">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:32Z</time>
     </trkpt>
     <trkpt lat="43.6389090" lon="-79.3855760">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:33Z</time>
     </trkpt>
     <trkpt lat="43.6389070" lon="-79.3856150">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:34Z</time>
     </trkpt>
     <trkpt lat="43.6389050" lon="-79.3856740">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:35Z</time>
     </trkpt>
     <trkpt lat="43.6389050" lon="-79.3857350">
      <ele>77.5</ele>
      <time>2021-12-16T21:21:36Z</time>
     </trkpt>
     <trkpt lat="43.6388990" lon="-79.3857890">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:38Z</time>
     </trkpt>
     <trkpt lat="43.6388920" lon="-79.3858360">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:39Z</time>
     </trkpt>
     <trkpt lat="43.6388850" lon="-79.3858800">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:40Z</time>
     </trkpt>
     <trkpt lat="43.6388810" lon="-79.3859210">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:41Z</time>
     </trkpt>
     <trkpt lat="43.6388840" lon="-79.3859670">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:42Z</time>
     </trkpt>
     <trkpt lat="43.6388850" lon="-79.3859840">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:43Z</time>
     </trkpt>
     <trkpt lat="43.6388880" lon="-79.3860370">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:44Z</time>
     </trkpt>
     <trkpt lat="43.6388880" lon="-79.3860770">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:46Z</time>
     </trkpt>
     <trkpt lat="43.6388780" lon="-79.3861230">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:47Z</time>
     </trkpt>
     <trkpt lat="43.6388630" lon="-79.3861660">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:48Z</time>
     </trkpt>
     <trkpt lat="43.6388440" lon="-79.3862080">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:49Z</time>
     </trkpt>
     <trkpt lat="43.6388170" lon="-79.3862600">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:50Z</time>
     </trkpt>
     <trkpt lat="43.6387790" lon="-79.3863220">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:51Z</time>
     </trkpt>
     <trkpt lat="43.6387490" lon="-79.3863750">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:52Z</time>
     </trkpt>
     <trkpt lat="43.6387360" lon="-79.3864290">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:53Z</time>
     </trkpt>
     <trkpt lat="43.6387340" lon="-79.3864510">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:54Z</time>
     </trkpt>
     <trkpt lat="43.6387340" lon="-79.3864900">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:55Z</time>
     </trkpt>
     <trkpt lat="43.6387230" lon="-79.3865480">
      <ele>77.6</ele>
      <time>2021-12-16T21:21:57Z</time>
     </trkpt>
     <trkpt lat="43.6387110" lon="-79.3865980">
      <ele>77.7</ele>
      <time>2021-12-16T21:21:58Z</time>
     </trkpt>
     <trkpt lat="43.6387050" lon="-79.3866380">
      <ele>77.7</ele>
      <time>2021-12-16T21:21:59Z</time>
     </trkpt>
     <trkpt lat="43.6386980" lon="-79.3866870">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:00Z</time>
     </trkpt>
     <trkpt lat="43.6386950" lon="-79.3867030">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:01Z</time>
     </trkpt>
     <trkpt lat="43.6386900" lon="-79.3867490">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:02Z</time>
     </trkpt>
     <trkpt lat="43.6386910" lon="-79.3867960">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:03Z</time>
     </trkpt>
     <trkpt lat="43.6386900" lon="-79.3868340">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:04Z</time>
     </trkpt>
     <trkpt lat="43.6386860" lon="-79.3868850">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:06Z</time>
     </trkpt>
     <trkpt lat="43.6386800" lon="-79.3869250">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:07Z</time>
     </trkpt>
     <trkpt lat="43.6386740" lon="-79.3869660">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:08Z</time>
     </trkpt>
     <trkpt lat="43.6386680" lon="-79.3870090">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:09Z</time>
     </trkpt>
     <trkpt lat="43.6386620" lon="-79.3870500">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:10Z</time>
     </trkpt>
     <trkpt lat="43.6386560" lon="-79.3870880">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:11Z</time>
     </trkpt>
     <trkpt lat="43.6386500" lon="-79.3871240">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:12Z</time>
     </trkpt>
     <trkpt lat="43.6386420" lon="-79.3871820">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:14Z</time>
     </trkpt>
     <trkpt lat="43.6386400" lon="-79.3872320">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:15Z</time>
     </trkpt>
     <trkpt lat="43.6386390" lon="-79.3872800">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:16Z</time>
     </trkpt>
     <trkpt lat="43.6386420" lon="-79.3873340">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:17Z</time>
     </trkpt>
     <trkpt lat="43.6386370" lon="-79.3873770">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:18Z</time>
     </trkpt>
     <trkpt lat="43.6386240" lon="-79.3874120">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:20Z</time>
     </trkpt>
     <trkpt lat="43.6386060" lon="-79.3874410">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:21Z</time>
     </trkpt>
     <trkpt lat="43.6385850" lon="-79.3874680">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:22Z</time>
     </trkpt>
     <trkpt lat="43.6385650" lon="-79.3874980">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:23Z</time>
     </trkpt>
     <trkpt lat="43.6385390" lon="-79.3875430">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:24Z</time>
     </trkpt>
     <trkpt lat="43.6385200" lon="-79.3875800">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:25Z</time>
     </trkpt>
     <trkpt lat="43.6385010" lon="-79.3876260">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:27Z</time>
     </trkpt>
     <trkpt lat="43.6384900" lon="-79.3876690">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:28Z</time>
     </trkpt>
     <trkpt lat="43.6384830" lon="-79.3877130">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:29Z</time>
     </trkpt>
     <trkpt lat="43.6384820" lon="-79.3877290">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:30Z</time>
     </trkpt>
     <trkpt lat="43.6384770" lon="-79.3877640">
      <ele>77.6</ele>
      <time>2021-12-16T21:22:31Z</time>
     </trkpt>
     <trkpt lat="43.6384700" lon="-79.3878160">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:33Z</time>
     </trkpt>
     <trkpt lat="43.6384660" lon="-79.3878580">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:34Z</time>
     </trkpt>
     <trkpt lat="43.6384550" lon="-79.3879020">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:35Z</time>
     </trkpt>
     <trkpt lat="43.6384400" lon="-79.3879600">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:36Z</time>
     </trkpt>
     <trkpt lat="43.6384300" lon="-79.3879990">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:37Z</time>
     </trkpt>
     <trkpt lat="43.6384220" lon="-79.3880370">
      <ele>77.7</ele>
      <time>2021-12-16T21:22:38Z</time>
     </trkpt>
     <trkpt lat="43.6384120" lon="-79.3880880">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:40Z</time>
     </trkpt>
     <trkpt lat="43.6384020" lon="-79.3881380">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:41Z</time>
     </trkpt>
     <trkpt lat="43.6383940" lon="-79.3881930">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:43Z</time>
     </trkpt>
     <trkpt lat="43.6383900" lon="-79.3882310">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:44Z</time>
     </trkpt>
     <trkpt lat="43.6383840" lon="-79.3882800">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:45Z</time>
     </trkpt>
     <trkpt lat="43.6383820" lon="-79.3882950">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:46Z</time>
     </trkpt>
     <trkpt lat="43.6383800" lon="-79.3883240">
      <ele>77.8</ele>
      <time>2021-12-16T21:22:47Z</time>
     </trkpt>
     <trkpt lat="43.6383500" lon="-79.3884580">
      <ele>77.9</ele>
      <time>2021-12-16T21:22:53Z</time>
     </trkpt>
     <trkpt lat="43.6382810" lon="-79.3884400">
      <ele>77.9</ele>
      <time>2021-12-16T21:22:54Z</time>
     </trkpt>
     <trkpt lat="43.6382890" lon="-79.3885160">
      <ele>77.9</ele>
      <time>2021-12-16T21:22:56Z</time>
     </trkpt>
     <trkpt lat="43.6382960" lon="-79.3885630">
      <ele>77.9</ele>
      <time>2021-12-16T21:22:57Z</time>
     </trkpt>
     <trkpt lat="43.6382740" lon="-79.3888500">
      <ele>78.1</ele>
      <time>2021-12-16T21:23:04Z</time>
     </trkpt>
     <trkpt lat="43.6382680" lon="-79.3888760">
      <ele>78.1</ele>
      <time>2021-12-16T21:23:05Z</time>
     </trkpt>
     <trkpt lat="43.6382620" lon="-79.3889010">
      <ele>78.1</ele>
      <time>2021-12-16T21:23:06Z</time>
     </trkpt>
     <trkpt lat="43.6382480" lon="-79.3889450">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:08Z</time>
     </trkpt>
     <trkpt lat="43.6382450" lon="-79.3889840">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:09Z</time>
     </trkpt>
     <trkpt lat="43.6382440" lon="-79.3890180">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:10Z</time>
     </trkpt>
     <trkpt lat="43.6382390" lon="-79.3890740">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:12Z</time>
     </trkpt>
     <trkpt lat="43.6382360" lon="-79.3891110">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:13Z</time>
     </trkpt>
     <trkpt lat="43.6382350" lon="-79.3891640">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:14Z</time>
     </trkpt>
     <trkpt lat="43.6382360" lon="-79.3891810">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:15Z</time>
     </trkpt>
     <trkpt lat="43.6382410" lon="-79.3892320">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:16Z</time>
     </trkpt>
     <trkpt lat="43.6382430" lon="-79.3892530">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:17Z</time>
     </trkpt>
     <trkpt lat="43.6382470" lon="-79.3893040">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:19Z</time>
     </trkpt>
     <trkpt lat="43.6382360" lon="-79.3893560">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:20Z</time>
     </trkpt>
     <trkpt lat="43.6382330" lon="-79.3893740">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:21Z</time>
     </trkpt>
     <trkpt lat="43.6382270" lon="-79.3894180">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:22Z</time>
     </trkpt>
     <trkpt lat="43.6382260" lon="-79.3894300">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:23Z</time>
     </trkpt>
     <trkpt lat="43.6382080" lon="-79.3894680">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:25Z</time>
     </trkpt>
     <trkpt lat="43.6382030" lon="-79.3894790">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:26Z</time>
     </trkpt>
     <trkpt lat="43.6381780" lon="-79.3895130">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:27Z</time>
     </trkpt>
     <trkpt lat="43.6381670" lon="-79.3895240">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:28Z</time>
     </trkpt>
     <trkpt lat="43.6381350" lon="-79.3895420">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:29Z</time>
     </trkpt>
     <trkpt lat="43.6380970" lon="-79.3895590">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:30Z</time>
     </trkpt>
     <trkpt lat="43.6380730" lon="-79.3895750">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:31Z</time>
     </trkpt>
     <trkpt lat="43.6380350" lon="-79.3896000">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:33Z</time>
     </trkpt>
     <trkpt lat="43.6380080" lon="-79.3896210">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:34Z</time>
     </trkpt>
     <trkpt lat="43.6379790" lon="-79.3896510">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:35Z</time>
     </trkpt>
     <trkpt lat="43.6379580" lon="-79.3896810">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:36Z</time>
     </trkpt>
     <trkpt lat="43.6379350" lon="-79.3897390">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:38Z</time>
     </trkpt>
     <trkpt lat="43.6379240" lon="-79.3897910">
      <ele>78.6</ele>
      <time>2021-12-16T21:23:39Z</time>
     </trkpt>
     <trkpt lat="43.6379150" lon="-79.3898630">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:40Z</time>
     </trkpt>
     <trkpt lat="43.6379110" lon="-79.3899250">
      <ele>78.5</ele>
      <time>2021-12-16T21:23:41Z</time>
     </trkpt>
     <trkpt lat="43.6379080" lon="-79.3899740">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:42Z</time>
     </trkpt>
     <trkpt lat="43.6379080" lon="-79.3900270">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:44Z</time>
     </trkpt>
     <trkpt lat="43.6379060" lon="-79.3900740">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:45Z</time>
     </trkpt>
     <trkpt lat="43.6379070" lon="-79.3901240">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:46Z</time>
     </trkpt>
     <trkpt lat="43.6379100" lon="-79.3901730">
      <ele>78.4</ele>
      <time>2021-12-16T21:23:47Z</time>
     </trkpt>
     <trkpt lat="43.6379140" lon="-79.3902270">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:48Z</time>
     </trkpt>
     <trkpt lat="43.6379170" lon="-79.3902750">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:49Z</time>
     </trkpt>
     <trkpt lat="43.6379190" lon="-79.3903330">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:50Z</time>
     </trkpt>
     <trkpt lat="43.6379320" lon="-79.3903950">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:52Z</time>
     </trkpt>
     <trkpt lat="43.6379310" lon="-79.3904430">
      <ele>78.3</ele>
      <time>2021-12-16T21:23:53Z</time>
     </trkpt>
     <trkpt lat="43.6379260" lon="-79.3904840">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:54Z</time>
     </trkpt>
     <trkpt lat="43.6379110" lon="-79.3905340">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:55Z</time>
     </trkpt>
     <trkpt lat="43.6379060" lon="-79.3905520">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:56Z</time>
     </trkpt>
     <trkpt lat="43.6378940" lon="-79.3905940">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:58Z</time>
     </trkpt>
     <trkpt lat="43.6378920" lon="-79.3906030">
      <ele>78.2</ele>
      <time>2021-12-16T21:23:59Z</time>
     </trkpt>
     <trkpt lat="43.6378880" lon="-79.3906200">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:01Z</time>
     </trkpt>
     <trkpt lat="43.6378850" lon="-79.3906290">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:03Z</time>
     </trkpt>
     <trkpt lat="43.6378820" lon="-79.3906380">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:04Z</time>
     </trkpt>
     <trkpt lat="43.6378720" lon="-79.3906710">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:06Z</time>
     </trkpt>
     <trkpt lat="43.6378690" lon="-79.3906860">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:07Z</time>
     </trkpt>
     <trkpt lat="43.6378630" lon="-79.3907290">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:09Z</time>
     </trkpt>
     <trkpt lat="43.6378510" lon="-79.3907630">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:10Z</time>
     </trkpt>
     <trkpt lat="43.6378320" lon="-79.3907990">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:11Z</time>
     </trkpt>
     <trkpt lat="43.6378070" lon="-79.3908300">
      <ele>78.1</ele>
      <time>2021-12-16T21:24:12Z</time>
     </trkpt>
     <trkpt lat="43.6377720" lon="-79.3908630">
      <ele>78.0</ele>
      <time>2021-12-16T21:24:13Z</time>
     </trkpt>
     <trkpt lat="43.6377170" lon="-79.3909100">
      <ele>78.0</ele>
      <time>2021-12-16T21:24:15Z</time>
     </trkpt>
     <trkpt lat="43.6376860" lon="-79.3909410">
      <ele>77.9</ele>
      <time>2021-12-16T21:24:16Z</time>
     </trkpt>
     <trkpt lat="43.6376670" lon="-79.3909970">
      <ele>77.9</ele>
      <time>2021-12-16T21:24:17Z</time>
     </trkpt>
     <trkpt lat="43.6376620" lon="-79.3910210">
      <ele>77.9</ele>
      <time>2021-12-16T21:24:18Z</time>
     </trkpt>
     <trkpt lat="43.6376570" lon="-79.3910910">
      <ele>77.8</ele>
      <time>2021-12-16T21:24:20Z</time>
     </trkpt>
     <trkpt lat="43.6376620" lon="-79.3911450">
      <ele>77.8</ele>
      <time>2021-12-16T21:24:21Z</time>
     </trkpt>
     <trkpt lat="43.6376660" lon="-79.3911920">
      <ele>77.8</ele>
      <time>2021-12-16T21:24:23Z</time>
     </trkpt>
     <trkpt lat="43.6376720" lon="-79.3912460">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:24Z</time>
     </trkpt>
     <trkpt lat="43.6376730" lon="-79.3913040">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:26Z</time>
     </trkpt>
     <trkpt lat="43.6376780" lon="-79.3913460">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:27Z</time>
     </trkpt>
     <trkpt lat="43.6376820" lon="-79.3913940">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:28Z</time>
     </trkpt>
     <trkpt lat="43.6376890" lon="-79.3914470">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:29Z</time>
     </trkpt>
     <trkpt lat="43.6376890" lon="-79.3914890">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:30Z</time>
     </trkpt>
     <trkpt lat="43.6376900" lon="-79.3915410">
      <ele>77.7</ele>
      <time>2021-12-16T21:24:32Z</time>
     </trkpt>
     <trkpt lat="43.6376850" lon="-79.3915890">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:33Z</time>
     </trkpt>
     <trkpt lat="43.6376730" lon="-79.3916650">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:35Z</time>
     </trkpt>
     <trkpt lat="43.6376670" lon="-79.3916950">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:36Z</time>
     </trkpt>
     <trkpt lat="43.6376620" lon="-79.3917250">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:37Z</time>
     </trkpt>
     <trkpt lat="43.6376550" lon="-79.3917690">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:38Z</time>
     </trkpt>
     <trkpt lat="43.6376410" lon="-79.3918120">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:39Z</time>
     </trkpt>
     <trkpt lat="43.6376300" lon="-79.3918470">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:40Z</time>
     </trkpt>
     <trkpt lat="43.6376180" lon="-79.3918960">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:42Z</time>
     </trkpt>
     <trkpt lat="43.6376090" lon="-79.3919330">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:43Z</time>
     </trkpt>
     <trkpt lat="43.6376030" lon="-79.3919890">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:44Z</time>
     </trkpt>
     <trkpt lat="43.6375990" lon="-79.3920280">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:45Z</time>
     </trkpt>
     <trkpt lat="43.6375890" lon="-79.3920980">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:47Z</time>
     </trkpt>
     <trkpt lat="43.6375850" lon="-79.3921210">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:48Z</time>
     </trkpt>
     <trkpt lat="43.6375810" lon="-79.3921440">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:49Z</time>
     </trkpt>
     <trkpt lat="43.6375720" lon="-79.3922020">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:50Z</time>
     </trkpt>
     <trkpt lat="43.6375690" lon="-79.3922240">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:51Z</time>
     </trkpt>
     <trkpt lat="43.6375620" lon="-79.3922690">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:52Z</time>
     </trkpt>
     <trkpt lat="43.6375490" lon="-79.3923190">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:53Z</time>
     </trkpt>
     <trkpt lat="43.6375440" lon="-79.3923340">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:54Z</time>
     </trkpt>
     <trkpt lat="43.6375240" lon="-79.3923980">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:56Z</time>
     </trkpt>
     <trkpt lat="43.6375170" lon="-79.3924180">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:57Z</time>
     </trkpt>
     <trkpt lat="43.6375090" lon="-79.3924380">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:58Z</time>
     </trkpt>
     <trkpt lat="43.6374870" lon="-79.3924780">
      <ele>77.6</ele>
      <time>2021-12-16T21:24:59Z</time>
     </trkpt>
     <trkpt lat="43.6374800" lon="-79.3924920">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:00Z</time>
     </trkpt>
     <trkpt lat="43.6374660" lon="-79.3925260">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:01Z</time>
     </trkpt>
     <trkpt lat="43.6374570" lon="-79.3925560">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:02Z</time>
     </trkpt>
     <trkpt lat="43.6374430" lon="-79.3926100">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:04Z</time>
     </trkpt>
     <trkpt lat="43.6374350" lon="-79.3926590">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:06Z</time>
     </trkpt>
     <trkpt lat="43.6374320" lon="-79.3927080">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:07Z</time>
     </trkpt>
     <trkpt lat="43.6374270" lon="-79.3927470">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:08Z</time>
     </trkpt>
     <trkpt lat="43.6374160" lon="-79.3928190">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:10Z</time>
     </trkpt>
     <trkpt lat="43.6374130" lon="-79.3928850">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:12Z</time>
     </trkpt>
     <trkpt lat="43.6374100" lon="-79.3929260">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:13Z</time>
     </trkpt>
     <trkpt lat="43.6374040" lon="-79.3929680">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:14Z</time>
     </trkpt>
     <trkpt lat="43.6373920" lon="-79.3930300">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:15Z</time>
     </trkpt>
     <trkpt lat="43.6373860" lon="-79.3930700">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:17Z</time>
     </trkpt>
     <trkpt lat="43.6373780" lon="-79.3931330">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:18Z</time>
     </trkpt>
     <trkpt lat="43.6373740" lon="-79.3931870">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:19Z</time>
     </trkpt>
     <trkpt lat="43.6373710" lon="-79.3932350">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:20Z</time>
     </trkpt>
     <trkpt lat="43.6373690" lon="-79.3932950">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:22Z</time>
     </trkpt>
     <trkpt lat="43.6373690" lon="-79.3933380">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:23Z</time>
     </trkpt>
     <trkpt lat="43.6373680" lon="-79.3933760">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:24Z</time>
     </trkpt>
     <trkpt lat="43.6373660" lon="-79.3934220">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:25Z</time>
     </trkpt>
     <trkpt lat="43.6373590" lon="-79.3934840">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:27Z</time>
     </trkpt>
     <trkpt lat="43.6373450" lon="-79.3935320">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:28Z</time>
     </trkpt>
     <trkpt lat="43.6373310" lon="-79.3935640">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:29Z</time>
     </trkpt>
     <trkpt lat="43.6373190" lon="-79.3935990">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:30Z</time>
     </trkpt>
     <trkpt lat="43.6373080" lon="-79.3936440">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:32Z</time>
     </trkpt>
     <trkpt lat="43.6373020" lon="-79.3936840">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:33Z</time>
     </trkpt>
     <trkpt lat="43.6372950" lon="-79.3937260">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:34Z</time>
     </trkpt>
     <trkpt lat="43.6372860" lon="-79.3937670">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:35Z</time>
     </trkpt>
     <trkpt lat="43.6372780" lon="-79.3938070">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:36Z</time>
     </trkpt>
     <trkpt lat="43.6372720" lon="-79.3938480">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:37Z</time>
     </trkpt>
     <trkpt lat="43.6372750" lon="-79.3939070">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:38Z</time>
     </trkpt>
     <trkpt lat="43.6372820" lon="-79.3939620">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:40Z</time>
     </trkpt>
     <trkpt lat="43.6372810" lon="-79.3940050">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:41Z</time>
     </trkpt>
     <trkpt lat="43.6372770" lon="-79.3940460">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:42Z</time>
     </trkpt>
     <trkpt lat="43.6372690" lon="-79.3940900">
      <ele>77.8</ele>
      <time>2021-12-16T21:25:43Z</time>
     </trkpt>
     <trkpt lat="43.6372580" lon="-79.3941410">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:44Z</time>
     </trkpt>
     <trkpt lat="43.6372550" lon="-79.3941590">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:45Z</time>
     </trkpt>
     <trkpt lat="43.6372450" lon="-79.3942110">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:46Z</time>
     </trkpt>
     <trkpt lat="43.6372410" lon="-79.3942290">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:47Z</time>
     </trkpt>
     <trkpt lat="43.6372270" lon="-79.3942670">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:48Z</time>
     </trkpt>
     <trkpt lat="43.6372110" lon="-79.3943000">
      <ele>77.7</ele>
      <time>2021-12-16T21:25:49Z</time>
     </trkpt>
     <trkpt lat="43.6371900" lon="-79.3943430">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:51Z</time>
     </trkpt>
     <trkpt lat="43.6371770" lon="-79.3943760">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:52Z</time>
     </trkpt>
     <trkpt lat="43.6371690" lon="-79.3944180">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:53Z</time>
     </trkpt>
     <trkpt lat="43.6371580" lon="-79.3944720">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:54Z</time>
     </trkpt>
     <trkpt lat="43.6371530" lon="-79.3944910">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:55Z</time>
     </trkpt>
     <trkpt lat="43.6371420" lon="-79.3945310">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:56Z</time>
     </trkpt>
     <trkpt lat="43.6371330" lon="-79.3945730">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:57Z</time>
     </trkpt>
     <trkpt lat="43.6371270" lon="-79.3946220">
      <ele>77.6</ele>
      <time>2021-12-16T21:25:58Z</time>
     </trkpt>
     <trkpt lat="43.6371270" lon="-79.3946780">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:00Z</time>
     </trkpt>
     <trkpt lat="43.6371270" lon="-79.3946990">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:01Z</time>
     </trkpt>
     <trkpt lat="43.6371290" lon="-79.3947450">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:02Z</time>
     </trkpt>
     <trkpt lat="43.6371300" lon="-79.3947870">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:03Z</time>
     </trkpt>
     <trkpt lat="43.6371300" lon="-79.3948330">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:04Z</time>
     </trkpt>
     <trkpt lat="43.6371240" lon="-79.3948690">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:05Z</time>
     </trkpt>
     <trkpt lat="43.6371220" lon="-79.3949240">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:07Z</time>
     </trkpt>
     <trkpt lat="43.6371200" lon="-79.3949450">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:08Z</time>
     </trkpt>
     <trkpt lat="43.6371210" lon="-79.3950010">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:09Z</time>
     </trkpt>
     <trkpt lat="43.6371230" lon="-79.3950480">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:10Z</time>
     </trkpt>
     <trkpt lat="43.6371200" lon="-79.3950870">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:11Z</time>
     </trkpt>
     <trkpt lat="43.6371170" lon="-79.3951280">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:12Z</time>
     </trkpt>
     <trkpt lat="43.6371150" lon="-79.3951730">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:13Z</time>
     </trkpt>
     <trkpt lat="43.6371130" lon="-79.3952210">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:15Z</time>
     </trkpt>
     <trkpt lat="43.6371120" lon="-79.3952610">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:16Z</time>
     </trkpt>
     <trkpt lat="43.6371130" lon="-79.3953100">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:17Z</time>
     </trkpt>
     <trkpt lat="43.6371140" lon="-79.3953240">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:18Z</time>
     </trkpt>
     <trkpt lat="43.6371100" lon="-79.3953710">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:19Z</time>
     </trkpt>
     <trkpt lat="43.6371090" lon="-79.3953880">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:20Z</time>
     </trkpt>
     <trkpt lat="43.6371010" lon="-79.3954470">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:22Z</time>
     </trkpt>
     <trkpt lat="43.6370910" lon="-79.3954960">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:24Z</time>
     </trkpt>
     <trkpt lat="43.6370650" lon="-79.3955340">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:25Z</time>
     </trkpt>
     <trkpt lat="43.6370540" lon="-79.3955480">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:26Z</time>
     </trkpt>
     <trkpt lat="43.6370300" lon="-79.3955900">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:28Z</time>
     </trkpt>
     <trkpt lat="43.6370180" lon="-79.3956300">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:29Z</time>
     </trkpt>
     <trkpt lat="43.6370130" lon="-79.3956480">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:30Z</time>
     </trkpt>
     <trkpt lat="43.6370020" lon="-79.3956860">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:31Z</time>
     </trkpt>
     <trkpt lat="43.6369900" lon="-79.3957150">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:32Z</time>
     </trkpt>
     <trkpt lat="43.6369790" lon="-79.3957480">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:34Z</time>
     </trkpt>
     <trkpt lat="43.6369600" lon="-79.3957910">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:35Z</time>
     </trkpt>
     <trkpt lat="43.6369540" lon="-79.3958050">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:36Z</time>
     </trkpt>
     <trkpt lat="43.6369390" lon="-79.3958370">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:37Z</time>
     </trkpt>
     <trkpt lat="43.6369240" lon="-79.3958730">
      <ele>77.7</ele>
      <time>2021-12-16T21:26:38Z</time>
     </trkpt>
     <trkpt lat="43.6369030" lon="-79.3959100">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:39Z</time>
     </trkpt>
     <trkpt lat="43.6368770" lon="-79.3959490">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:41Z</time>
     </trkpt>
     <trkpt lat="43.6368470" lon="-79.3959670">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:42Z</time>
     </trkpt>
     <trkpt lat="43.6368160" lon="-79.3959860">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:43Z</time>
     </trkpt>
     <trkpt lat="43.6368030" lon="-79.3959870">
      <ele>77.6</ele>
      <time>2021-12-16T21:26:44Z</time>
     </trkpt>
     <trkpt lat="43.6367700" lon="-79.3959630">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:45Z</time>
     </trkpt>
     <trkpt lat="43.6367610" lon="-79.3959510">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:46Z</time>
     </trkpt>
     <trkpt lat="43.6367500" lon="-79.3958980">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:48Z</time>
     </trkpt>
     <trkpt lat="43.6367470" lon="-79.3958450">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:49Z</time>
     </trkpt>
     <trkpt lat="43.6367490" lon="-79.3958280">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:50Z</time>
     </trkpt>
     <trkpt lat="43.6367460" lon="-79.3957530">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:52Z</time>
     </trkpt>
     <trkpt lat="43.6367520" lon="-79.3957050">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:53Z</time>
     </trkpt>
     <trkpt lat="43.6367670" lon="-79.3956730">
      <ele>77.8</ele>
      <time>2021-12-16T21:26:55Z</time>
     </trkpt>
     <trkpt lat="43.6367910" lon="-79.3956500">
      <ele>77.9</ele>
      <time>2021-12-16T21:26:57Z</time>
     </trkpt>
     <trkpt lat="43.6368130" lon="-79.3956270">
      <ele>77.9</ele>
      <time>2021-12-16T21:26:58Z</time>
     </trkpt>
     <trkpt lat="43.6368410" lon="-79.3955980">
      <ele>77.9</ele>
      <time>2021-12-16T21:26:59Z</time>
     </trkpt>
     <trkpt lat="43.6368710" lon="-79.3955600">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:00Z</time>
     </trkpt>
     <trkpt lat="43.6368920" lon="-79.3955230">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:01Z</time>
     </trkpt>
     <trkpt lat="43.6369100" lon="-79.3954870">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:02Z</time>
     </trkpt>
     <trkpt lat="43.6369200" lon="-79.3954500">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:03Z</time>
     </trkpt>
     <trkpt lat="43.6369230" lon="-79.3954130">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:04Z</time>
     </trkpt>
     <trkpt lat="43.6369200" lon="-79.3953620">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:06Z</time>
     </trkpt>
     <trkpt lat="43.6369090" lon="-79.3953140">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:07Z</time>
     </trkpt>
     <trkpt lat="43.6368990" lon="-79.3952670">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:08Z</time>
     </trkpt>
     <trkpt lat="43.6368980" lon="-79.3952260">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:09Z</time>
     </trkpt>
     <trkpt lat="43.6368960" lon="-79.3951850">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:10Z</time>
     </trkpt>
     <trkpt lat="43.6368910" lon="-79.3951420">
      <ele>78.1</ele>
      <time>2021-12-16T21:27:11Z</time>
     </trkpt>
     <trkpt lat="43.6368820" lon="-79.3951060">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:12Z</time>
     </trkpt>
     <trkpt lat="43.6368740" lon="-79.3950550">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:13Z</time>
     </trkpt>
     <trkpt lat="43.6368700" lon="-79.3950390">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:14Z</time>
     </trkpt>
     <trkpt lat="43.6368550" lon="-79.3950100">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:15Z</time>
     </trkpt>
     <trkpt lat="43.6368370" lon="-79.3949770">
      <ele>78.0</ele>
      <time>2021-12-16T21:27:17Z</time>
     </trkpt>
     <trkpt lat="43.6368120" lon="-79.3949360">
      <ele>77.9</ele>
      <time>2021-12-16T21:27:18Z</time>
     </trkpt>
     <trkpt lat="43.6368030" lon="-79.3949220">
      <ele>77.8</ele>
      <time>2021-12-16T21:27:19Z</time>
     </trkpt>
     <trkpt lat="43.6367860" lon="-79.3948910">
      <ele>77.8</ele>
      <time>2021-12-16T21:27:20Z</time>
     </trkpt>
     <trkpt lat="43.6367710" lon="-79.3948560">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:21Z</time>
     </trkpt>
     <trkpt lat="43.6367570" lon="-79.3948070">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:22Z</time>
     </trkpt>
     <trkpt lat="43.6367530" lon="-79.3947890">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:23Z</time>
     </trkpt>
     <trkpt lat="43.6367440" lon="-79.3947360">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:24Z</time>
     </trkpt>
     <trkpt lat="43.6367400" lon="-79.3946970">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:26Z</time>
     </trkpt>
     <trkpt lat="43.6367410" lon="-79.3946480">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:27Z</time>
     </trkpt>
     <trkpt lat="43.6367450" lon="-79.3945930">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:28Z</time>
     </trkpt>
     <trkpt lat="43.6367460" lon="-79.3945540">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:29Z</time>
     </trkpt>
     <trkpt lat="43.6367460" lon="-79.3945220">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:30Z</time>
     </trkpt>
     <trkpt lat="43.6367470" lon="-79.3944830">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:32Z</time>
     </trkpt>
     <trkpt lat="43.6367480" lon="-79.3944280">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:33Z</time>
     </trkpt>
     <trkpt lat="43.6367480" lon="-79.3944070">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:34Z</time>
     </trkpt>
     <trkpt lat="43.6367510" lon="-79.3943690">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:35Z</time>
     </trkpt>
     <trkpt lat="43.6367550" lon="-79.3943250">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:36Z</time>
     </trkpt>
     <trkpt lat="43.6367610" lon="-79.3942830">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:37Z</time>
     </trkpt>
     <trkpt lat="43.6367700" lon="-79.3942420">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:38Z</time>
     </trkpt>
     <trkpt lat="43.6367760" lon="-79.3942030">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:39Z</time>
     </trkpt>
     <trkpt lat="43.6367820" lon="-79.3941670">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:40Z</time>
     </trkpt>
     <trkpt lat="43.6367890" lon="-79.3941220">
      <ele>77.6</ele>
      <time>2021-12-16T21:27:42Z</time>
     </trkpt>
     <trkpt lat="43.6367980" lon="-79.3940730">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:43Z</time>
     </trkpt>
     <trkpt lat="43.6368040" lon="-79.3940150">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:45Z</time>
     </trkpt>
     <trkpt lat="43.6368090" lon="-79.3939760">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:46Z</time>
     </trkpt>
     <trkpt lat="43.6368140" lon="-79.3939390">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:47Z</time>
     </trkpt>
     <trkpt lat="43.6368190" lon="-79.3938880">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:48Z</time>
     </trkpt>
     <trkpt lat="43.6368270" lon="-79.3938360">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:49Z</time>
     </trkpt>
     <trkpt lat="43.6368290" lon="-79.3938170">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:50Z</time>
     </trkpt>
     <trkpt lat="43.6368350" lon="-79.3937610">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:51Z</time>
     </trkpt>
     <trkpt lat="43.6368360" lon="-79.3937410">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:52Z</time>
     </trkpt>
     <trkpt lat="43.6368380" lon="-79.3937080">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:53Z</time>
     </trkpt>
     <trkpt lat="43.6368390" lon="-79.3936750">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:55Z</time>
     </trkpt>
     <trkpt lat="43.6368390" lon="-79.3936300">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:56Z</time>
     </trkpt>
     <trkpt lat="43.6368450" lon="-79.3935740">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:57Z</time>
     </trkpt>
     <trkpt lat="43.6368480" lon="-79.3935550">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:58Z</time>
     </trkpt>
     <trkpt lat="43.6368530" lon="-79.3935160">
      <ele>77.7</ele>
      <time>2021-12-16T21:27:59Z</time>
     </trkpt>
     <trkpt lat="43.6368590" lon="-79.3934640">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:01Z</time>
     </trkpt>
     <trkpt lat="43.6368670" lon="-79.3934150">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:02Z</time>
     </trkpt>
     <trkpt lat="43.6368710" lon="-79.3933980">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:03Z</time>
     </trkpt>
     <trkpt lat="43.6368800" lon="-79.3933480">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:04Z</time>
     </trkpt>
     <trkpt lat="43.6368840" lon="-79.3933300">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:05Z</time>
     </trkpt>
     <trkpt lat="43.6368910" lon="-79.3932820">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:06Z</time>
     </trkpt>
     <trkpt lat="43.6368930" lon="-79.3932650">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:07Z</time>
     </trkpt>
     <trkpt lat="43.6368920" lon="-79.3932150">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:08Z</time>
     </trkpt>
     <trkpt lat="43.6368910" lon="-79.3931980">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:09Z</time>
     </trkpt>
     <trkpt lat="43.6368940" lon="-79.3931600">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:10Z</time>
     </trkpt>
     <trkpt lat="43.6368980" lon="-79.3931220">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:11Z</time>
     </trkpt>
     <trkpt lat="43.6369000" lon="-79.3930840">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:12Z</time>
     </trkpt>
     <trkpt lat="43.6369020" lon="-79.3930400">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:14Z</time>
     </trkpt>
     <trkpt lat="43.6369060" lon="-79.3930030">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:15Z</time>
     </trkpt>
     <trkpt lat="43.6369070" lon="-79.3929640">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:16Z</time>
     </trkpt>
     <trkpt lat="43.6369080" lon="-79.3929180">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:17Z</time>
     </trkpt>
     <trkpt lat="43.6369120" lon="-79.3928590">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:19Z</time>
     </trkpt>
     <trkpt lat="43.6369140" lon="-79.3928030">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:20Z</time>
     </trkpt>
     <trkpt lat="43.6369170" lon="-79.3927600">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:21Z</time>
     </trkpt>
     <trkpt lat="43.6369210" lon="-79.3927190">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:22Z</time>
     </trkpt>
     <trkpt lat="43.6369240" lon="-79.3926800">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:23Z</time>
     </trkpt>
     <trkpt lat="43.6369300" lon="-79.3926430">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:24Z</time>
     </trkpt>
     <trkpt lat="43.6369430" lon="-79.3925810">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:26Z</time>
     </trkpt>
     <trkpt lat="43.6369540" lon="-79.3925340">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:27Z</time>
     </trkpt>
     <trkpt lat="43.6369630" lon="-79.3924850">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:28Z</time>
     </trkpt>
     <trkpt lat="43.6369680" lon="-79.3924240">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:29Z</time>
     </trkpt>
     <trkpt lat="43.6369740" lon="-79.3923810">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:30Z</time>
     </trkpt>
     <trkpt lat="43.6369830" lon="-79.3923400">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:31Z</time>
     </trkpt>
     <trkpt lat="43.6369950" lon="-79.3922950">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:32Z</time>
     </trkpt>
     <trkpt lat="43.6370010" lon="-79.3922370">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:34Z</time>
     </trkpt>
     <trkpt lat="43.6370030" lon="-79.3921970">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:35Z</time>
     </trkpt>
     <trkpt lat="43.6370090" lon="-79.3921420">
      <ele>77.4</ele>
      <time>2021-12-16T21:28:36Z</time>
     </trkpt>
     <trkpt lat="43.6370110" lon="-79.3921240">
      <ele>77.4</ele>
      <time>2021-12-16T21:28:37Z</time>
     </trkpt>
     <trkpt lat="43.6370190" lon="-79.3920680">
      <ele>77.4</ele>
      <time>2021-12-16T21:28:38Z</time>
     </trkpt>
     <trkpt lat="43.6370230" lon="-79.3920490">
      <ele>77.4</ele>
      <time>2021-12-16T21:28:39Z</time>
     </trkpt>
     <trkpt lat="43.6370320" lon="-79.3920010">
      <ele>77.4</ele>
      <time>2021-12-16T21:28:41Z</time>
     </trkpt>
     <trkpt lat="43.6370340" lon="-79.3919520">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:42Z</time>
     </trkpt>
     <trkpt lat="43.6370420" lon="-79.3918880">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:44Z</time>
     </trkpt>
     <trkpt lat="43.6370480" lon="-79.3918670">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:45Z</time>
     </trkpt>
     <trkpt lat="43.6370540" lon="-79.3918450">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:46Z</time>
     </trkpt>
     <trkpt lat="43.6370900" lon="-79.3918120">
      <ele>77.5</ele>
      <time>2021-12-16T21:28:47Z</time>
     </trkpt>
     <trkpt lat="43.6371170" lon="-79.3918030">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:48Z</time>
     </trkpt>
     <trkpt lat="43.6371510" lon="-79.3918250">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:49Z</time>
     </trkpt>
     <trkpt lat="43.6371620" lon="-79.3918320">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:50Z</time>
     </trkpt>
     <trkpt lat="43.6371950" lon="-79.3918510">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:52Z</time>
     </trkpt>
     <trkpt lat="43.6372230" lon="-79.3918650">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:53Z</time>
     </trkpt>
     <trkpt lat="43.6372540" lon="-79.3918810">
      <ele>77.6</ele>
      <time>2021-12-16T21:28:54Z</time>
     </trkpt>
     <trkpt lat="43.6372880" lon="-79.3919050">
      <ele>77.7</ele>
      <time>2021-12-16T21:28:55Z</time>
     </trkpt>
     <trkpt lat="43.6373210" lon="-79.3919200">
      <ele>77.7</ele>
      <time>2021-12-16T21:28:56Z</time>
     </trkpt>
     <trkpt lat="43.6373470" lon="-79.3919360">
      <ele>77.7</ele>
      <time>2021-12-16T21:28:58Z</time>
     </trkpt>
     <trkpt lat="43.6373730" lon="-79.3919470">
      <ele>77.7</ele>
      <time>2021-12-16T21:28:59Z</time>
     </trkpt>
     <trkpt lat="43.6374030" lon="-79.3919580">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:00Z</time>
     </trkpt>
     <trkpt lat="43.6374390" lon="-79.3919690">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:01Z</time>
     </trkpt>
     <trkpt lat="43.6374720" lon="-79.3919840">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:02Z</time>
     </trkpt>
     <trkpt lat="43.6374830" lon="-79.3919890">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:03Z</time>
     </trkpt>
     <trkpt lat="43.6375300" lon="-79.3920040">
      <ele>77.8</ele>
      <time>2021-12-16T21:29:05Z</time>
     </trkpt>
     <trkpt lat="43.6375460" lon="-79.3920070">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:06Z</time>
     </trkpt>
     <trkpt lat="43.6375630" lon="-79.3920100">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:07Z</time>
     </trkpt>
     <trkpt lat="43.6375930" lon="-79.3919850">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:08Z</time>
     </trkpt>
     <trkpt lat="43.6376050" lon="-79.3919740">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:09Z</time>
     </trkpt>
     <trkpt lat="43.6376190" lon="-79.3919400">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:10Z</time>
     </trkpt>
     <trkpt lat="43.6376290" lon="-79.3919020">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:11Z</time>
     </trkpt>
     <trkpt lat="43.6376350" lon="-79.3918520">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:12Z</time>
     </trkpt>
     <trkpt lat="43.6376390" lon="-79.3917980">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:14Z</time>
     </trkpt>
     <trkpt lat="43.6376430" lon="-79.3917530">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:15Z</time>
     </trkpt>
     <trkpt lat="43.6376510" lon="-79.3917080">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:16Z</time>
     </trkpt>
     <trkpt lat="43.6376560" lon="-79.3916700">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:17Z</time>
     </trkpt>
     <trkpt lat="43.6376610" lon="-79.3916290">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:18Z</time>
     </trkpt>
     <trkpt lat="43.6376650" lon="-79.3915880">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:19Z</time>
     </trkpt>
     <trkpt lat="43.6376740" lon="-79.3915420">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:20Z</time>
     </trkpt>
     <trkpt lat="43.6376820" lon="-79.3914870">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:21Z</time>
     </trkpt>
     <trkpt lat="43.6376950" lon="-79.3914250">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:23Z</time>
     </trkpt>
     <trkpt lat="43.6376990" lon="-79.3913990">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:24Z</time>
     </trkpt>
     <trkpt lat="43.6377070" lon="-79.3913630">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:25Z</time>
     </trkpt>
     <trkpt lat="43.6377120" lon="-79.3913250">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:26Z</time>
     </trkpt>
     <trkpt lat="43.6377160" lon="-79.3912850">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:27Z</time>
     </trkpt>
     <trkpt lat="43.6377180" lon="-79.3912390">
      <ele>77.7</ele>
      <time>2021-12-16T21:29:28Z</time>
     </trkpt>
     <trkpt lat="43.6377220" lon="-79.3911900">
      <ele>77.8</ele>
      <time>2021-12-16T21:29:30Z</time>
     </trkpt>
     <trkpt lat="43.6377240" lon="-79.3911730">
      <ele>77.8</ele>
      <time>2021-12-16T21:29:31Z</time>
     </trkpt>
     <trkpt lat="43.6377380" lon="-79.3911240">
      <ele>77.8</ele>
      <time>2021-12-16T21:29:32Z</time>
     </trkpt>
     <trkpt lat="43.6377430" lon="-79.3911080">
      <ele>77.9</ele>
      <time>2021-12-16T21:29:33Z</time>
     </trkpt>
     <trkpt lat="43.6377580" lon="-79.3910620">
      <ele>77.9</ele>
      <time>2021-12-16T21:29:34Z</time>
     </trkpt>
     <trkpt lat="43.6377630" lon="-79.3910470">
      <ele>77.9</ele>
      <time>2021-12-16T21:29:35Z</time>
     </trkpt>
     <trkpt lat="43.6377700" lon="-79.3910250">
      <ele>77.9</ele>
      <time>2021-12-16T21:29:36Z</time>
     </trkpt>
     <trkpt lat="43.6377790" lon="-79.3909980">
      <ele>78.0</ele>
      <time>2021-12-16T21:29:38Z</time>
     </trkpt>
     <trkpt lat="43.6377940" lon="-79.3909510">
      <ele>78.0</ele>
      <time>2021-12-16T21:29:39Z</time>
     </trkpt>
     <trkpt lat="43.6378010" lon="-79.3909330">
      <ele>78.0</ele>
      <time>2021-12-16T21:29:40Z</time>
     </trkpt>
     <trkpt lat="43.6378180" lon="-79.3908940">
      <ele>78.0</ele>
      <time>2021-12-16T21:29:41Z</time>
     </trkpt>
     <trkpt lat="43.6378320" lon="-79.3908460">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:42Z</time>
     </trkpt>
     <trkpt lat="43.6378380" lon="-79.3908130">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:43Z</time>
     </trkpt>
     <trkpt lat="43.6378450" lon="-79.3907650">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:45Z</time>
     </trkpt>
     <trkpt lat="43.6378560" lon="-79.3907190">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:46Z</time>
     </trkpt>
     <trkpt lat="43.6378600" lon="-79.3907030">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:47Z</time>
     </trkpt>
     <trkpt lat="43.6378730" lon="-79.3906500">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:48Z</time>
     </trkpt>
     <trkpt lat="43.6378770" lon="-79.3906320">
      <ele>78.1</ele>
      <time>2021-12-16T21:29:49Z</time>
     </trkpt>
     <trkpt lat="43.6378890" lon="-79.3905870">
      <ele>78.2</ele>
      <time>2021-12-16T21:29:50Z</time>
     </trkpt>
     <trkpt lat="43.6378930" lon="-79.3905750">
      <ele>78.2</ele>
      <time>2021-12-16T21:29:51Z</time>
     </trkpt>
     <trkpt lat="43.6379020" lon="-79.3905380">
      <ele>78.2</ele>
      <time>2021-12-16T21:29:53Z</time>
     </trkpt>
     <trkpt lat="43.6379090" lon="-79.3904930">
      <ele>78.2</ele>
      <time>2021-12-16T21:29:54Z</time>
     </trkpt>
     <trkpt lat="43.6379130" lon="-79.3904420">
      <ele>78.3</ele>
      <time>2021-12-16T21:29:55Z</time>
     </trkpt>
     <trkpt lat="43.6379120" lon="-79.3904260">
      <ele>78.3</ele>
      <time>2021-12-16T21:29:56Z</time>
     </trkpt>
     <trkpt lat="43.6379140" lon="-79.3903910">
      <ele>78.3</ele>
      <time>2021-12-16T21:29:57Z</time>
     </trkpt>
     <trkpt lat="43.6379240" lon="-79.3903440">
      <ele>78.3</ele>
      <time>2021-12-16T21:29:59Z</time>
     </trkpt>
     <trkpt lat="43.6379370" lon="-79.3903050">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:00Z</time>
     </trkpt>
     <trkpt lat="43.6379460" lon="-79.3902650">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:01Z</time>
     </trkpt>
     <trkpt lat="43.6379570" lon="-79.3902260">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:02Z</time>
     </trkpt>
     <trkpt lat="43.6379680" lon="-79.3901860">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:03Z</time>
     </trkpt>
     <trkpt lat="43.6379760" lon="-79.3901460">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:04Z</time>
     </trkpt>
     <trkpt lat="43.6379840" lon="-79.3901030">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:05Z</time>
     </trkpt>
     <trkpt lat="43.6379930" lon="-79.3900570">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:06Z</time>
     </trkpt>
     <trkpt lat="43.6379970" lon="-79.3900100">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:07Z</time>
     </trkpt>
     <trkpt lat="43.6380050" lon="-79.3899710">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:09Z</time>
     </trkpt>
     <trkpt lat="43.6380100" lon="-79.3899290">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:10Z</time>
     </trkpt>
     <trkpt lat="43.6380180" lon="-79.3898800">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:11Z</time>
     </trkpt>
     <trkpt lat="43.6380270" lon="-79.3898290">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:12Z</time>
     </trkpt>
     <trkpt lat="43.6380400" lon="-79.3897790">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:13Z</time>
     </trkpt>
     <trkpt lat="43.6380530" lon="-79.3897360">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:15Z</time>
     </trkpt>
     <trkpt lat="43.6380680" lon="-79.3896800">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:17Z</time>
     </trkpt>
     <trkpt lat="43.6380810" lon="-79.3896410">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:18Z</time>
     </trkpt>
     <trkpt lat="43.6380920" lon="-79.3896040">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:19Z</time>
     </trkpt>
     <trkpt lat="43.6381020" lon="-79.3895590">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:20Z</time>
     </trkpt>
     <trkpt lat="43.6381060" lon="-79.3895210">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:21Z</time>
     </trkpt>
     <trkpt lat="43.6381050" lon="-79.3894810">
      <ele>78.6</ele>
      <time>2021-12-16T21:30:22Z</time>
     </trkpt>
     <trkpt lat="43.6381030" lon="-79.3894330">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:23Z</time>
     </trkpt>
     <trkpt lat="43.6381110" lon="-79.3893800">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:25Z</time>
     </trkpt>
     <trkpt lat="43.6381250" lon="-79.3893400">
      <ele>78.5</ele>
      <time>2021-12-16T21:30:26Z</time>
     </trkpt>
     <trkpt lat="43.6381380" lon="-79.3893020">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:27Z</time>
     </trkpt>
     <trkpt lat="43.6381540" lon="-79.3892700">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:28Z</time>
     </trkpt>
     <trkpt lat="43.6381710" lon="-79.3892250">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:29Z</time>
     </trkpt>
     <trkpt lat="43.6381760" lon="-79.3892100">
      <ele>78.4</ele>
      <time>2021-12-16T21:30:30Z</time>
     </trkpt>
     <trkpt lat="43.6381890" lon="-79.3891520">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:31Z</time>
     </trkpt>
     <trkpt lat="43.6381940" lon="-79.3891270">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:32Z</time>
     </trkpt>
     <trkpt lat="43.6381980" lon="-79.3890860">
      <ele>78.3</ele>
      <time>2021-12-16T21:30:33Z</time>
     </trkpt>
     <trkpt lat="43.6382000" lon="-79.3890430">
      <ele>78.2</ele>
      <time>2021-12-16T21:30:35Z</time>
     </trkpt>
     <trkpt lat="43.6382030" lon="-79.3890000">
      <ele>78.2</ele>
      <time>2021-12-16T21:30:36Z</time>
     </trkpt>
     <trkpt lat="43.6382070" lon="-79.3889520">
      <ele>78.2</ele>
      <time>2021-12-16T21:30:37Z</time>
     </trkpt>
     <trkpt lat="43.6382190" lon="-79.3888950">
      <ele>78.1</ele>
      <time>2021-12-16T21:30:38Z</time>
     </trkpt>
     <trkpt lat="43.6382300" lon="-79.3888540">
      <ele>78.1</ele>
      <time>2021-12-16T21:30:39Z</time>
     </trkpt>
     <trkpt lat="43.6382420" lon="-79.3888110">
      <ele>78.1</ele>
      <time>2021-12-16T21:30:40Z</time>
     </trkpt>
     <trkpt lat="43.6382530" lon="-79.3887710">
      <ele>78.0</ele>
      <time>2021-12-16T21:30:41Z</time>
     </trkpt>
     <trkpt lat="43.6382620" lon="-79.3887320">
      <ele>78.0</ele>
      <time>2021-12-16T21:30:42Z</time>
     </trkpt>
     <trkpt lat="43.6382730" lon="-79.3886780">
      <ele>78.0</ele>
      <time>2021-12-16T21:30:43Z</time>
     </trkpt>
     <trkpt lat="43.6382780" lon="-79.3886570">
      <ele>78.0</ele>
      <time>2021-12-16T21:30:44Z</time>
     </trkpt>
     <trkpt lat="43.6382930" lon="-79.3885990">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:46Z</time>
     </trkpt>
     <trkpt lat="43.6382980" lon="-79.3885540">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:47Z</time>
     </trkpt>
     <trkpt lat="43.6383110" lon="-79.3885110">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:48Z</time>
     </trkpt>
     <trkpt lat="43.6383220" lon="-79.3884750">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:49Z</time>
     </trkpt>
     <trkpt lat="43.6383360" lon="-79.3884360">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:50Z</time>
     </trkpt>
     <trkpt lat="43.6383520" lon="-79.3883940">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:51Z</time>
     </trkpt>
     <trkpt lat="43.6383640" lon="-79.3883420">
      <ele>77.9</ele>
      <time>2021-12-16T21:30:52Z</time>
     </trkpt>
     <trkpt lat="43.6383680" lon="-79.3883230">
      <ele>77.8</ele>
      <time>2021-12-16T21:30:53Z</time>
     </trkpt>
     <trkpt lat="43.6383740" lon="-79.3882920">
      <ele>77.8</ele>
      <time>2021-12-16T21:30:54Z</time>
     </trkpt>
     <trkpt lat="43.6383810" lon="-79.3882510">
      <ele>77.8</ele>
      <time>2021-12-16T21:30:56Z</time>
     </trkpt>
     <trkpt lat="43.6383870" lon="-79.3882150">
      <ele>77.8</ele>
      <time>2021-12-16T21:30:57Z</time>
     </trkpt>
     <trkpt lat="43.6383940" lon="-79.3881600">
      <ele>77.8</ele>
      <time>2021-12-16T21:30:58Z</time>
     </trkpt>
     <trkpt lat="43.6384010" lon="-79.3881030">
      <ele>77.8</ele>
      <time>2021-12-16T21:31:00Z</time>
     </trkpt>
     <trkpt lat="43.6384030" lon="-79.3880810">
      <ele>77.8</ele>
      <time>2021-12-16T21:31:01Z</time>
     </trkpt>
     <trkpt lat="43.6384090" lon="-79.3880370">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:02Z</time>
     </trkpt>
     <trkpt lat="43.6384170" lon="-79.3879980">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:03Z</time>
     </trkpt>
     <trkpt lat="43.6384280" lon="-79.3879320">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:05Z</time>
     </trkpt>
     <trkpt lat="43.6384320" lon="-79.3879100">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:06Z</time>
     </trkpt>
     <trkpt lat="43.6384370" lon="-79.3878890">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:07Z</time>
     </trkpt>
     <trkpt lat="43.6384490" lon="-79.3878520">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:08Z</time>
     </trkpt>
     <trkpt lat="43.6384630" lon="-79.3878230">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:09Z</time>
     </trkpt>
     <trkpt lat="43.6384730" lon="-79.3877680">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:11Z</time>
     </trkpt>
     <trkpt lat="43.6384740" lon="-79.3877170">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:12Z</time>
     </trkpt>
     <trkpt lat="43.6384750" lon="-79.3877010">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:13Z</time>
     </trkpt>
     <trkpt lat="43.6384860" lon="-79.3876400">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:14Z</time>
     </trkpt>
     <trkpt lat="43.6384920" lon="-79.3876150">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:15Z</time>
     </trkpt>
     <trkpt lat="43.6385050" lon="-79.3875590">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:17Z</time>
     </trkpt>
     <trkpt lat="43.6385090" lon="-79.3875370">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:18Z</time>
     </trkpt>
     <trkpt lat="43.6385140" lon="-79.3874950">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:19Z</time>
     </trkpt>
     <trkpt lat="43.6385230" lon="-79.3874580">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:20Z</time>
     </trkpt>
     <trkpt lat="43.6385360" lon="-79.3874150">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:21Z</time>
     </trkpt>
     <trkpt lat="43.6385420" lon="-79.3874000">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:22Z</time>
     </trkpt>
     <trkpt lat="43.6385570" lon="-79.3873600">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:24Z</time>
     </trkpt>
     <trkpt lat="43.6385740" lon="-79.3873120">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:25Z</time>
     </trkpt>
     <trkpt lat="43.6385840" lon="-79.3872680">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:26Z</time>
     </trkpt>
     <trkpt lat="43.6385910" lon="-79.3872250">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:27Z</time>
     </trkpt>
     <trkpt lat="43.6385970" lon="-79.3871730">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:29Z</time>
     </trkpt>
     <trkpt lat="43.6386000" lon="-79.3871340">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:30Z</time>
     </trkpt>
     <trkpt lat="43.6386070" lon="-79.3870930">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:31Z</time>
     </trkpt>
     <trkpt lat="43.6386130" lon="-79.3870560">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:32Z</time>
     </trkpt>
     <trkpt lat="43.6386190" lon="-79.3870120">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:33Z</time>
     </trkpt>
     <trkpt lat="43.6386270" lon="-79.3869550">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:35Z</time>
     </trkpt>
     <trkpt lat="43.6386320" lon="-79.3869110">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:36Z</time>
     </trkpt>
     <trkpt lat="43.6386390" lon="-79.3868550">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:37Z</time>
     </trkpt>
     <trkpt lat="43.6386440" lon="-79.3868160">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:38Z</time>
     </trkpt>
     <trkpt lat="43.6386510" lon="-79.3867790">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:39Z</time>
     </trkpt>
     <trkpt lat="43.6386610" lon="-79.3867340">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:40Z</time>
     </trkpt>
     <trkpt lat="43.6386720" lon="-79.3866890">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:42Z</time>
     </trkpt>
     <trkpt lat="43.6386840" lon="-79.3866420">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:43Z</time>
     </trkpt>
     <trkpt lat="43.6386930" lon="-79.3866130">
      <ele>77.7</ele>
      <time>2021-12-16T21:31:44Z</time>
     </trkpt>
     <trkpt lat="43.6387100" lon="-79.3865660">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:46Z</time>
     </trkpt>
     <trkpt lat="43.6387250" lon="-79.3865230">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:48Z</time>
     </trkpt>
     <trkpt lat="43.6387370" lon="-79.3864890">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:49Z</time>
     </trkpt>
     <trkpt lat="43.6387600" lon="-79.3864270">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:50Z</time>
     </trkpt>
     <trkpt lat="43.6387790" lon="-79.3863730">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:52Z</time>
     </trkpt>
     <trkpt lat="43.6387990" lon="-79.3863220">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:53Z</time>
     </trkpt>
     <trkpt lat="43.6388210" lon="-79.3862790">
      <ele>77.6</ele>
      <time>2021-12-16T21:31:54Z</time>
     </trkpt>
     <trkpt lat="43.6388390" lon="-79.3862440">
      <ele>77.5</ele>
      <time>2021-12-16T21:31:55Z</time>
     </trkpt>
     <trkpt lat="43.6388560" lon="-79.3862040">
      <ele>77.5</ele>
      <time>2021-12-16T21:31:56Z</time>
     </trkpt>
     <trkpt lat="43.6388700" lon="-79.3861660">
      <ele>77.5</ele>
      <time>2021-12-16T21:31:57Z</time>
     </trkpt>
     <trkpt lat="43.6388870" lon="-79.3861270">
      <ele>77.5</ele>
      <time>2021-12-16T21:31:59Z</time>
     </trkpt>
     <trkpt lat="43.6389060" lon="-79.3860870">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:00Z</time>
     </trkpt>
     <trkpt lat="43.6389420" lon="-79.3860400">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:01Z</time>
     </trkpt>
     <trkpt lat="43.6389720" lon="-79.3859960">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:02Z</time>
     </trkpt>
     <trkpt lat="43.6389990" lon="-79.3859520">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:03Z</time>
     </trkpt>
     <trkpt lat="43.6390180" lon="-79.3859180">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:05Z</time>
     </trkpt>
     <trkpt lat="43.6390410" lon="-79.3858790">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:06Z</time>
     </trkpt>
     <trkpt lat="43.6390610" lon="-79.3858480">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:07Z</time>
     </trkpt>
     <trkpt lat="43.6390800" lon="-79.3858160">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:08Z</time>
     </trkpt>
     <trkpt lat="43.6391000" lon="-79.3857830">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:09Z</time>
     </trkpt>
     <trkpt lat="43.6391210" lon="-79.3857370">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:11Z</time>
     </trkpt>
     <trkpt lat="43.6391320" lon="-79.3856820">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:12Z</time>
     </trkpt>
     <trkpt lat="43.6391330" lon="-79.3856580">
      <ele>77.5</ele>
      <time>2021-12-16T21:32:13Z</time>
     </trkpt>
     <trkpt lat="43.6391280" lon="-79.3856160">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:14Z</time>
     </trkpt>
     <trkpt lat="43.6390970" lon="-79.3855530">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:16Z</time>
     </trkpt>
     <trkpt lat="43.6390770" lon="-79.3855170">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:17Z</time>
     </trkpt>
     <trkpt lat="43.6390600" lon="-79.3854760">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:18Z</time>
     </trkpt>
     <trkpt lat="43.6390440" lon="-79.3854280">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:19Z</time>
     </trkpt>
     <trkpt lat="43.6390330" lon="-79.3853870">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:20Z</time>
     </trkpt>
     <trkpt lat="43.6390260" lon="-79.3853450">
      <ele>77.4</ele>
      <time>2021-12-16T21:32:21Z</time>
     </trkpt>
     <trkpt lat="43.6390210" lon="-79.3852750">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:23Z</time>
     </trkpt>
     <trkpt lat="43.6390210" lon="-79.3852510">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:24Z</time>
     </trkpt>
     <trkpt lat="43.6390200" lon="-79.3852260">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:25Z</time>
     </trkpt>
     <trkpt lat="43.6390180" lon="-79.3851850">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:26Z</time>
     </trkpt>
     <trkpt lat="43.6390170" lon="-79.3851320">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:27Z</time>
     </trkpt>
     <trkpt lat="43.6390190" lon="-79.3850940">
      <ele>77.3</ele>
      <time>2021-12-16T21:32:28Z</time>
     </trkpt>
     <trkpt lat="43.6390320" lon="-79.3850350">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:30Z</time>
     </trkpt>
     <trkpt lat="43.6390390" lon="-79.3849960">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:31Z</time>
     </trkpt>
     <trkpt lat="43.6390420" lon="-79.3849350">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:32Z</time>
     </trkpt>
     <trkpt lat="43.6390400" lon="-79.3848940">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:33Z</time>
     </trkpt>
     <trkpt lat="43.6390420" lon="-79.3848340">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:35Z</time>
     </trkpt>
     <trkpt lat="43.6390440" lon="-79.3847920">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:36Z</time>
     </trkpt>
     <trkpt lat="43.6390410" lon="-79.3847380">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:37Z</time>
     </trkpt>
     <trkpt lat="43.6390400" lon="-79.3847200">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:38Z</time>
     </trkpt>
     <trkpt lat="43.6390360" lon="-79.3846720">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:39Z</time>
     </trkpt>
     <trkpt lat="43.6390400" lon="-79.3846010">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:41Z</time>
     </trkpt>
     <trkpt lat="43.6390480" lon="-79.3845470">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:42Z</time>
     </trkpt>
     <trkpt lat="43.6390510" lon="-79.3845290">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:43Z</time>
     </trkpt>
     <trkpt lat="43.6390580" lon="-79.3844910">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:44Z</time>
     </trkpt>
     <trkpt lat="43.6390690" lon="-79.3844370">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:46Z</time>
     </trkpt>
     <trkpt lat="43.6390800" lon="-79.3843960">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:47Z</time>
     </trkpt>
     <trkpt lat="43.6390880" lon="-79.3843530">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:48Z</time>
     </trkpt>
     <trkpt lat="43.6390990" lon="-79.3843030">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:49Z</time>
     </trkpt>
     <trkpt lat="43.6391060" lon="-79.3842680">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:50Z</time>
     </trkpt>
     <trkpt lat="43.6391130" lon="-79.3842170">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:52Z</time>
     </trkpt>
     <trkpt lat="43.6391140" lon="-79.3841610">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:53Z</time>
     </trkpt>
     <trkpt lat="43.6391060" lon="-79.3841120">
      <ele>77.2</ele>
      <time>2021-12-16T21:32:54Z</time>
     </trkpt>
     <trkpt lat="43.6390970" lon="-79.3840750">
      <ele>77.0</ele>
      <time>2021-12-16T21:32:55Z</time>
     </trkpt>
     <trkpt lat="43.6390680" lon="-79.3840180">
      <ele>77.0</ele>
      <time>2021-12-16T21:32:57Z</time>
     </trkpt>
     <trkpt lat="43.6390530" lon="-79.3840020">
      <ele>77.0</ele>
      <time>2021-12-16T21:32:58Z</time>
     </trkpt>
     <trkpt lat="43.6390370" lon="-79.3839850">
      <ele>77.0</ele>
      <time>2021-12-16T21:32:59Z</time>
     </trkpt>
     <trkpt lat="43.6390110" lon="-79.3839690">
      <ele>77.0</ele>
      <time>2021-12-16T21:33:00Z</time>
     </trkpt>
     <trkpt lat="43.6389720" lon="-79.3839530">
      <ele>77.0</ele>
      <time>2021-12-16T21:33:01Z</time>
     </trkpt>
     <trkpt lat="43.6389570" lon="-79.3839490">
      <ele>77.0</ele>
      <time>2021-12-16T21:33:02Z</time>
     </trkpt>
     <trkpt lat="43.6389340" lon="-79.3839420">
      <ele>77.0</ele>
      <time>2021-12-16T21:33:03Z</time>
     </trkpt>
     <trkpt lat="43.6389040" lon="-79.3839340">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:05Z</time>
     </trkpt>
     <trkpt lat="43.6388720" lon="-79.3839290">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:06Z</time>
     </trkpt>
     <trkpt lat="43.6388430" lon="-79.3839260">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:07Z</time>
     </trkpt>
     <trkpt lat="43.6388090" lon="-79.3839260">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:08Z</time>
     </trkpt>
     <trkpt lat="43.6387970" lon="-79.3839260">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:09Z</time>
     </trkpt>
     <trkpt lat="43.6387520" lon="-79.3839270">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:10Z</time>
     </trkpt>
     <trkpt lat="43.6387320" lon="-79.3839350">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:11Z</time>
     </trkpt>
     <trkpt lat="43.6387010" lon="-79.3839420">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:13Z</time>
     </trkpt>
     <trkpt lat="43.6386690" lon="-79.3839440">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:14Z</time>
     </trkpt>
     <trkpt lat="43.6386400" lon="-79.3839450">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:15Z</time>
     </trkpt>
     <trkpt lat="43.6385990" lon="-79.3839470">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:16Z</time>
     </trkpt>
     <trkpt lat="43.6385670" lon="-79.3839490">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:17Z</time>
     </trkpt>
     <trkpt lat="43.6385220" lon="-79.3839540">
      <ele>76.9</ele>
      <time>2021-12-16T21:33:19Z</time>
     </trkpt>
     <trkpt lat="43.6384850" lon="-79.3839590">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:20Z</time>
     </trkpt>
     <trkpt lat="43.6384570" lon="-79.3839530">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:21Z</time>
     </trkpt>
     <trkpt lat="43.6384300" lon="-79.3839410">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:22Z</time>
     </trkpt>
     <trkpt lat="43.6383950" lon="-79.3839250">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:23Z</time>
     </trkpt>
     <trkpt lat="43.6383590" lon="-79.3839090">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:25Z</time>
     </trkpt>
     <trkpt lat="43.6383250" lon="-79.3838890">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:26Z</time>
     </trkpt>
     <trkpt lat="43.6383110" lon="-79.3838820">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:27Z</time>
     </trkpt>
     <trkpt lat="43.6382920" lon="-79.3838710">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:28Z</time>
     </trkpt>
     <trkpt lat="43.6382570" lon="-79.3838410">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:30Z</time>
     </trkpt>
     <trkpt lat="43.6382270" lon="-79.3838100">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:31Z</time>
     </trkpt>
     <trkpt lat="43.6382150" lon="-79.3838020">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:32Z</time>
     </trkpt>
     <trkpt lat="43.6381900" lon="-79.3837880">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:33Z</time>
     </trkpt>
     <trkpt lat="43.6381640" lon="-79.3837740">
      <ele>76.8</ele>
      <time>2021-12-16T21:33:34Z</time>
     </trkpt>
     <trkpt lat="43.6381300" lon="-79.3837600">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:36Z</time>
     </trkpt>
     <trkpt lat="43.6381000" lon="-79.3837450">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:37Z</time>
     </trkpt>
     <trkpt lat="43.6380730" lon="-79.3837360">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:38Z</time>
     </trkpt>
     <trkpt lat="43.6380430" lon="-79.3837290">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:39Z</time>
     </trkpt>
     <trkpt lat="43.6380140" lon="-79.3837260">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:40Z</time>
     </trkpt>
     <trkpt lat="43.6379750" lon="-79.3837200">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:42Z</time>
     </trkpt>
     <trkpt lat="43.6379370" lon="-79.3837070">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:43Z</time>
     </trkpt>
     <trkpt lat="43.6379050" lon="-79.3836800">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:44Z</time>
     </trkpt>
     <trkpt lat="43.6378820" lon="-79.3836530">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:45Z</time>
     </trkpt>
     <trkpt lat="43.6378590" lon="-79.3836160">
      <ele>76.7</ele>
      <time>2021-12-16T21:33:47Z</time>
     </trkpt>
     <trkpt lat="43.6378520" lon="-79.3835440">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:48Z</time>
     </trkpt>
     <trkpt lat="43.6378460" lon="-79.3834610">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:50Z</time>
     </trkpt>
     <trkpt lat="43.6378460" lon="-79.3834110">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:51Z</time>
     </trkpt>
     <trkpt lat="43.6378430" lon="-79.3833520">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:52Z</time>
     </trkpt>
     <trkpt lat="43.6378430" lon="-79.3832760">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:54Z</time>
     </trkpt>
     <trkpt lat="43.6378420" lon="-79.3832380">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:55Z</time>
     </trkpt>
     <trkpt lat="43.6378400" lon="-79.3832000">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:56Z</time>
     </trkpt>
     <trkpt lat="43.6378410" lon="-79.3831610">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:57Z</time>
     </trkpt>
     <trkpt lat="43.6378470" lon="-79.3831110">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:58Z</time>
     </trkpt>
     <trkpt lat="43.6378550" lon="-79.3830580">
      <ele>76.6</ele>
      <time>2021-12-16T21:33:59Z</time>
     </trkpt>
     <trkpt lat="43.6378570" lon="-79.3830410">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:00Z</time>
     </trkpt>
     <trkpt lat="43.6378620" lon="-79.3830000">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:02Z</time>
     </trkpt>
     <trkpt lat="43.6378710" lon="-79.3829370">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:03Z</time>
     </trkpt>
     <trkpt lat="43.6378740" lon="-79.3828670">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:05Z</time>
     </trkpt>
     <trkpt lat="43.6378730" lon="-79.3828280">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:06Z</time>
     </trkpt>
     <trkpt lat="43.6378720" lon="-79.3827870">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:07Z</time>
     </trkpt>
     <trkpt lat="43.6378720" lon="-79.3827260">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:09Z</time>
     </trkpt>
     <trkpt lat="43.6378750" lon="-79.3826630">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:10Z</time>
     </trkpt>
     <trkpt lat="43.6378760" lon="-79.3826350">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:11Z</time>
     </trkpt>
     <trkpt lat="43.6378740" lon="-79.3825650">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:13Z</time>
     </trkpt>
     <trkpt lat="43.6378770" lon="-79.3825010">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:14Z</time>
     </trkpt>
     <trkpt lat="43.6378780" lon="-79.3824740">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:15Z</time>
     </trkpt>
     <trkpt lat="43.6378830" lon="-79.3824210">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:17Z</time>
     </trkpt>
     <trkpt lat="43.6378850" lon="-79.3824040">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:18Z</time>
     </trkpt>
     <trkpt lat="43.6378890" lon="-79.3823590">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:19Z</time>
     </trkpt>
     <trkpt lat="43.6378950" lon="-79.3823090">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:20Z</time>
     </trkpt>
     <trkpt lat="43.6378960" lon="-79.3822530">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:21Z</time>
     </trkpt>
     <trkpt lat="43.6378970" lon="-79.3822100">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:22Z</time>
     </trkpt>
     <trkpt lat="43.6379010" lon="-79.3821570">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:24Z</time>
     </trkpt>
     <trkpt lat="43.6379060" lon="-79.3821080">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:25Z</time>
     </trkpt>
     <trkpt lat="43.6379130" lon="-79.3820490">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:27Z</time>
     </trkpt>
     <trkpt lat="43.6379190" lon="-79.3820040">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:28Z</time>
     </trkpt>
     <trkpt lat="43.6379340" lon="-79.3819480">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:29Z</time>
     </trkpt>
     <trkpt lat="43.6379460" lon="-79.3819090">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:30Z</time>
     </trkpt>
     <trkpt lat="43.6379560" lon="-79.3818680">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:31Z</time>
     </trkpt>
     <trkpt lat="43.6379660" lon="-79.3818320">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:33Z</time>
     </trkpt>
     <trkpt lat="43.6379780" lon="-79.3817900">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:34Z</time>
     </trkpt>
     <trkpt lat="43.6379850" lon="-79.3817610">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:35Z</time>
     </trkpt>
     <trkpt lat="43.6379950" lon="-79.3817230">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:37Z</time>
     </trkpt>
     <trkpt lat="43.6380030" lon="-79.3816810">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:38Z</time>
     </trkpt>
     <trkpt lat="43.6380040" lon="-79.3816640">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:39Z</time>
     </trkpt>
     <trkpt lat="43.6380090" lon="-79.3816230">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:40Z</time>
     </trkpt>
     <trkpt lat="43.6380090" lon="-79.3815670">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:41Z</time>
     </trkpt>
     <trkpt lat="43.6380080" lon="-79.3815460">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:42Z</time>
     </trkpt>
     <trkpt lat="43.6380060" lon="-79.3815120">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:43Z</time>
     </trkpt>
     <trkpt lat="43.6380070" lon="-79.3814730">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:45Z</time>
     </trkpt>
     <trkpt lat="43.6380100" lon="-79.3814230">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:46Z</time>
     </trkpt>
     <trkpt lat="43.6380110" lon="-79.3814050">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:47Z</time>
     </trkpt>
     <trkpt lat="43.6380130" lon="-79.3813540">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:48Z</time>
     </trkpt>
     <trkpt lat="43.6380140" lon="-79.3813380">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:49Z</time>
     </trkpt>
     <trkpt lat="43.6380170" lon="-79.3812930">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:50Z</time>
     </trkpt>
     <trkpt lat="43.6380190" lon="-79.3812790">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:51Z</time>
     </trkpt>
     <trkpt lat="43.6380200" lon="-79.3812420">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:52Z</time>
     </trkpt>
     <trkpt lat="43.6380270" lon="-79.3811820">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:54Z</time>
     </trkpt>
     <trkpt lat="43.6380300" lon="-79.3811420">
      <ele>76.5</ele>
      <time>2021-12-16T21:34:55Z</time>
     </trkpt>
     <trkpt lat="43.6380320" lon="-79.3811020">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:56Z</time>
     </trkpt>
     <trkpt lat="43.6380340" lon="-79.3810600">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:57Z</time>
     </trkpt>
     <trkpt lat="43.6380390" lon="-79.3810070">
      <ele>76.6</ele>
      <time>2021-12-16T21:34:59Z</time>
     </trkpt>
     <trkpt lat="43.6380440" lon="-79.3809570">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:00Z</time>
     </trkpt>
     <trkpt lat="43.6380500" lon="-79.3809060">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:01Z</time>
     </trkpt>
     <trkpt lat="43.6380560" lon="-79.3808660">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:02Z</time>
     </trkpt>
     <trkpt lat="43.6380650" lon="-79.3808110">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:03Z</time>
     </trkpt>
     <trkpt lat="43.6380690" lon="-79.3807720">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:04Z</time>
     </trkpt>
     <trkpt lat="43.6380730" lon="-79.3807320">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:05Z</time>
     </trkpt>
     <trkpt lat="43.6380760" lon="-79.3806910">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:06Z</time>
     </trkpt>
     <trkpt lat="43.6380810" lon="-79.3806320">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:08Z</time>
     </trkpt>
     <trkpt lat="43.6380850" lon="-79.3805790">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:09Z</time>
     </trkpt>
     <trkpt lat="43.6380860" lon="-79.3805370">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:10Z</time>
     </trkpt>
     <trkpt lat="43.6380910" lon="-79.3805000">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:11Z</time>
     </trkpt>
     <trkpt lat="43.6380940" lon="-79.3804630">
      <ele>76.6</ele>
      <time>2021-12-16T21:35:12Z</time>
     </trkpt>
     <trkpt lat="43.6381010" lon="-79.3804060">
      <ele>76.7</ele>
      <time>2021-12-16T21:35:14Z</time>
     </trkpt>
     <trkpt lat="43.6381020" lon="-79.3803570">
      <ele>76.7</ele>
      <time>2021-12-16T21:35:15Z</time>
     </trkpt>
     <trkpt lat="43.6381060" lon="-79.3802940">
      <ele>76.7</ele>
      <time>2021-12-16T21:35:17Z</time>
     </trkpt>
     <trkpt lat="43.6381100" lon="-79.3802560">
      <ele>76.7</ele>
      <time>2021-12-16T21:35:18Z</time>
     </trkpt>
     <trkpt lat="43.6381150" lon="-79.3802020">
      <ele>76.8</ele>
      <time>2021-12-16T21:35:19Z</time>
     </trkpt>
     <trkpt lat="43.6381160" lon="-79.3801820">
      <ele>76.8</ele>
      <time>2021-12-16T21:35:20Z</time>
     </trkpt>
     <trkpt lat="43.6381240" lon="-79.3801330">
      <ele>76.8</ele>
      <time>2021-12-16T21:35:22Z</time>
     </trkpt>
     <trkpt lat="43.6381270" lon="-79.3801170">
      <ele>76.8</ele>
      <time>2021-12-16T21:35:23Z</time>
     </trkpt>
     <trkpt lat="43.6381340" lon="-79.3800670">
      <ele>76.8</ele>
      <time>2021-12-16T21:35:24Z</time>
     </trkpt>
     <trkpt lat="43.6381380" lon="-79.3800230">
      <ele>76.9</ele>
      <time>2021-12-16T21:35:25Z</time>
     </trkpt>
     <trkpt lat="43.6381420" lon="-79.3799820">
      <ele>76.9</ele>
      <time>2021-12-16T21:35:26Z</time>
     </trkpt>
     <trkpt lat="43.6381520" lon="-79.3799290">
      <ele>76.9</ele>
      <time>2021-12-16T21:35:27Z</time>
     </trkpt>
     <trkpt lat="43.6381560" lon="-79.3799130">
      <ele>76.9</ele>
      <time>2021-12-16T21:35:28Z</time>
     </trkpt>
     <trkpt lat="43.6381740" lon="-79.3798460">
      <ele>77.0</ele>
      <time>2021-12-16T21:35:30Z</time>
     </trkpt>
     <trkpt lat="43.6381800" lon="-79.3798250">
      <ele>77.0</ele>
      <time>2021-12-16T21:35:31Z</time>
     </trkpt>
     <trkpt lat="43.6381860" lon="-79.3798040">
      <ele>77.0</ele>
      <time>2021-12-16T21:35:32Z</time>
     </trkpt>
     <trkpt lat="43.6382020" lon="-79.3797590">
      <ele>77.0</ele>
      <time>2021-12-16T21:35:33Z</time>
     </trkpt>
     <trkpt lat="43.6382080" lon="-79.3797450">
      <ele>77.0</ele>
      <time>2021-12-16T21:35:34Z</time>
     </trkpt>
     <trkpt lat="43.6382360" lon="-79.3796970">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:35Z</time>
     </trkpt>
     <trkpt lat="43.6382500" lon="-79.3796810">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:36Z</time>
     </trkpt>
     <trkpt lat="43.6382920" lon="-79.3796690">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:37Z</time>
     </trkpt>
     <trkpt lat="43.6383080" lon="-79.3796670">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:38Z</time>
     </trkpt>
     <trkpt lat="43.6383390" lon="-79.3796680">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:39Z</time>
     </trkpt>
     <trkpt lat="43.6383750" lon="-79.3796770">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:41Z</time>
     </trkpt>
     <trkpt lat="43.6384030" lon="-79.3796880">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:42Z</time>
     </trkpt>
     <trkpt lat="43.6384300" lon="-79.3796950">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:43Z</time>
     </trkpt>
     <trkpt lat="43.6384570" lon="-79.3797060">
      <ele>77.1</ele>
      <time>2021-12-16T21:35:44Z</time>
     </trkpt>
     <trkpt lat="43.6384840" lon="-79.3797200">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:45Z</time>
     </trkpt>
     <trkpt lat="43.6385200" lon="-79.3797380">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:46Z</time>
     </trkpt>
     <trkpt lat="43.6385570" lon="-79.3797650">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:48Z</time>
     </trkpt>
     <trkpt lat="43.6385930" lon="-79.3797840">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:49Z</time>
     </trkpt>
     <trkpt lat="43.6386220" lon="-79.3797960">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:50Z</time>
     </trkpt>
     <trkpt lat="43.6386490" lon="-79.3798040">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:51Z</time>
     </trkpt>
     <trkpt lat="43.6386750" lon="-79.3798150">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:52Z</time>
     </trkpt>
     <trkpt lat="43.6387090" lon="-79.3798410">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:53Z</time>
     </trkpt>
     <trkpt lat="43.6387490" lon="-79.3798520">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:55Z</time>
     </trkpt>
     <trkpt lat="43.6387780" lon="-79.3798540">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:56Z</time>
     </trkpt>
     <trkpt lat="43.6388080" lon="-79.3798540">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:57Z</time>
     </trkpt>
     <trkpt lat="43.6388480" lon="-79.3798580">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:58Z</time>
     </trkpt>
     <trkpt lat="43.6388610" lon="-79.3798600">
      <ele>77.2</ele>
      <time>2021-12-16T21:35:59Z</time>
     </trkpt>
     <trkpt lat="43.6388940" lon="-79.3798660">
      <ele>77.2</ele>
      <time>2021-12-16T21:36:00Z</time>
     </trkpt>
     <trkpt lat="43.6389210" lon="-79.3798680">
      <ele>77.2</ele>
      <time>2021-12-16T21:36:01Z</time>
     </trkpt>
     <trkpt lat="43.6389550" lon="-79.3798690">
      <ele>77.2</ele>
      <time>2021-12-16T21:36:02Z</time>
     </trkpt>
     <trkpt lat="43.6390040" lon="-79.3798720">
      <ele>77.2</ele>
      <time>2021-12-16T21:36:04Z</time>
     </trkpt>
     <trkpt lat="43.6390350" lon="-79.3798730">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:05Z</time>
     </trkpt>
     <trkpt lat="43.6390840" lon="-79.3798770">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:07Z</time>
     </trkpt>
     <trkpt lat="43.6391120" lon="-79.3798810">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:08Z</time>
     </trkpt>
     <trkpt lat="43.6391450" lon="-79.3798860">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:09Z</time>
     </trkpt>
     <trkpt lat="43.6391720" lon="-79.3798920">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:10Z</time>
     </trkpt>
     <trkpt lat="43.6392150" lon="-79.3799100">
      <ele>77.1</ele>
      <time>2021-12-16T21:36:12Z</time>
     </trkpt>
     <trkpt lat="43.6392540" lon="-79.3799200">
      <ele>77.0</ele>
      <time>2021-12-16T21:36:13Z</time>
     </trkpt>
     <trkpt lat="43.6392680" lon="-79.3799230">
      <ele>77.0</ele>
      <time>2021-12-16T21:36:14Z</time>
     </trkpt>
     <trkpt lat="43.6393050" lon="-79.3799280">
      <ele>76.9</ele>
      <time>2021-12-16T21:36:15Z</time>
     </trkpt>
     <trkpt lat="43.6393180" lon="-79.3799290">
      <ele>76.8</ele>
      <time>2021-12-16T21:36:16Z</time>
     </trkpt>
     <trkpt lat="43.6393570" lon="-79.3799230">
      <ele>76.8</ele>
      <time>2021-12-16T21:36:17Z</time>
     </trkpt>
     <trkpt lat="43.6393700" lon="-79.3799200">
      <ele>76.7</ele>
      <time>2021-12-16T21:36:18Z</time>
     </trkpt>
     <trkpt lat="43.6394150" lon="-79.3799090">
      <ele>76.7</ele>
      <time>2021-12-16T21:36:20Z</time>
     </trkpt>
     <trkpt lat="43.6394510" lon="-79.3798860">
      <ele>76.7</ele>
      <time>2021-12-16T21:36:21Z</time>
     </trkpt>
     <trkpt lat="43.6394630" lon="-79.3798770">
      <ele>76.7</ele>
      <time>2021-12-16T21:36:22Z</time>
     </trkpt>
     <trkpt lat="43.6395050" lon="-79.3798530">
      <ele>76.9</ele>
      <time>2021-12-16T21:36:24Z</time>
     </trkpt>
     <trkpt lat="43.6395190" lon="-79.3798460">
      <ele>76.9</ele>
      <time>2021-12-16T21:36:25Z</time>
     </trkpt>
     <trkpt lat="43.6395340" lon="-79.3798390">
      <ele>77.0</ele>
      <time>2021-12-16T21:36:26Z</time>
     </trkpt>
     <trkpt lat="43.6395720" lon="-79.3798320">
      <ele>77.2</ele>
      <time>2021-12-16T21:36:27Z</time>
     </trkpt>
     <trkpt lat="43.6395860" lon="-79.3798310">
      <ele>77.4</ele>
      <time>2021-12-16T21:36:28Z</time>
     </trkpt>
     <trkpt lat="43.6396200" lon="-79.3798350">
      <ele>77.6</ele>
      <time>2021-12-16T21:36:29Z</time>
     </trkpt>
     <trkpt lat="43.6396320" lon="-79.3798360">
      <ele>77.6</ele>
      <time>2021-12-16T21:36:30Z</time>
     </trkpt>
     <trkpt lat="43.6396550" lon="-79.3798380">
      <ele>77.9</ele>
      <time>2021-12-16T21:36:31Z</time>
     </trkpt>
     <trkpt lat="43.6396900" lon="-79.3798320">
      <ele>78.1</ele>
      <time>2021-12-16T21:36:33Z</time>
     </trkpt>
     <trkpt lat="43.6397200" lon="-79.3798190">
      <ele>78.6</ele>
      <time>2021-12-16T21:36:34Z</time>
     </trkpt>
     <trkpt lat="43.6397420" lon="-79.3797990">
      <ele>78.9</ele>
      <time>2021-12-16T21:36:35Z</time>
     </trkpt>
     <trkpt lat="43.6397660" lon="-79.3797660">
      <ele>79.0</ele>
      <time>2021-12-16T21:36:37Z</time>
     </trkpt>
     <trkpt lat="43.6397850" lon="-79.3797380">
      <ele>79.3</ele>
      <time>2021-12-16T21:36:38Z</time>
     </trkpt>
     <trkpt lat="43.6398120" lon="-79.3797180">
      <ele>79.5</ele>
      <time>2021-12-16T21:36:39Z</time>
     </trkpt>
     <trkpt lat="43.6398220" lon="-79.3797100">
      <ele>79.5</ele>
      <time>2021-12-16T21:36:40Z</time>
     </trkpt>
     <trkpt lat="43.6398380" lon="-79.3796980">
      <ele>79.6</ele>
      <time>2021-12-16T21:36:41Z</time>
     </trkpt>
     <trkpt lat="43.6398540" lon="-79.3796950">
      <ele>79.6</ele>
      <time>2021-12-16T21:36:42Z</time>
     </trkpt>
     <trkpt lat="43.6398660" lon="-79.3796870">
      <ele>79.7</ele>
      <time>2021-12-16T21:36:43Z</time>
     </trkpt>
     <trkpt lat="43.6398720" lon="-79.3796870">
      <ele>79.7</ele>
      <time>2021-12-16T21:36:44Z</time>
     </trkpt>
     <trkpt lat="43.6398740" lon="-79.3796740">
      <ele>79.7</ele>
      <time>2021-12-16T21:36:46Z</time>
     </trkpt>
     <trkpt lat="43.6398700" lon="-79.3796640">
      <ele>79.7</ele>
      <time>2021-12-16T21:36:47Z</time>
     </trkpt>
     <trkpt lat="43.6398620" lon="-79.3796380">
      <ele>79.5</ele>
      <time>2021-12-16T21:36:48Z</time>
     </trkpt>
     <trkpt lat="43.6398550" lon="-79.3796280">
      <ele>79.5</ele>
      <time>2021-12-16T21:36:50Z</time>
     </trkpt>
     <trkpt lat="43.6398480" lon="-79.3796180">
      <ele>79.4</ele>
      <time>2021-12-16T21:36:51Z</time>
     </trkpt>
     <trkpt lat="43.6398220" lon="-79.3795920">
      <ele>79.3</ele>
      <time>2021-12-16T21:36:52Z</time>
     </trkpt>
     <trkpt lat="43.6398120" lon="-79.3795820">
      <ele>79.2</ele>
      <time>2021-12-16T21:36:53Z</time>
     </trkpt>
     <trkpt lat="43.6397830" lon="-79.3795630">
      <ele>79.1</ele>
      <time>2021-12-16T21:36:54Z</time>
     </trkpt>
     <trkpt lat="43.6397740" lon="-79.3795550">
      <ele>79.0</ele>
      <time>2021-12-16T21:36:55Z</time>
     </trkpt>
     <trkpt lat="43.6397420" lon="-79.3795180">
      <ele>78.9</ele>
      <time>2021-12-16T21:36:57Z</time>
     </trkpt>
     <trkpt lat="43.6397130" lon="-79.3794930">
      <ele>78.7</ele>
      <time>2021-12-16T21:36:58Z</time>
     </trkpt>
     <trkpt lat="43.6396770" lon="-79.3794720">
      <ele>78.4</ele>
      <time>2021-12-16T21:37:00Z</time>
     </trkpt>
     <trkpt lat="43.6396430" lon="-79.3794630">
      <ele>78.3</ele>
      <time>2021-12-16T21:37:01Z</time>
     </trkpt>
     <trkpt lat="43.6396060" lon="-79.3794720">
      <ele>78.0</ele>
      <time>2021-12-16T21:37:02Z</time>
     </trkpt>
     <trkpt lat="43.6395730" lon="-79.3794740">
      <ele>77.8</ele>
      <time>2021-12-16T21:37:03Z</time>
     </trkpt>
     <trkpt lat="43.6395240" lon="-79.3794760">
      <ele>77.6</ele>
      <time>2021-12-16T21:37:04Z</time>
     </trkpt>
     <trkpt lat="43.6394720" lon="-79.3794910">
      <ele>77.2</ele>
      <time>2021-12-16T21:37:06Z</time>
     </trkpt>
     <trkpt lat="43.6394320" lon="-79.3794900">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:07Z</time>
     </trkpt>
     <trkpt lat="43.6394010" lon="-79.3794990">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:08Z</time>
     </trkpt>
     <trkpt lat="43.6393730" lon="-79.3795000">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:09Z</time>
     </trkpt>
     <trkpt lat="43.6393290" lon="-79.3794920">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:11Z</time>
     </trkpt>
     <trkpt lat="43.6392920" lon="-79.3794770">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:12Z</time>
     </trkpt>
     <trkpt lat="43.6392670" lon="-79.3794670">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:13Z</time>
     </trkpt>
     <trkpt lat="43.6392240" lon="-79.3794340">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:15Z</time>
     </trkpt>
     <trkpt lat="43.6391950" lon="-79.3794050">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:16Z</time>
     </trkpt>
     <trkpt lat="43.6391610" lon="-79.3793630">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:18Z</time>
     </trkpt>
     <trkpt lat="43.6391360" lon="-79.3793370">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:19Z</time>
     </trkpt>
     <trkpt lat="43.6391110" lon="-79.3793100">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:20Z</time>
     </trkpt>
     <trkpt lat="43.6390890" lon="-79.3792850">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:21Z</time>
     </trkpt>
     <trkpt lat="43.6390660" lon="-79.3792580">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:22Z</time>
     </trkpt>
     <trkpt lat="43.6390400" lon="-79.3792280">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:23Z</time>
     </trkpt>
     <trkpt lat="43.6390150" lon="-79.3791970">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:24Z</time>
     </trkpt>
     <trkpt lat="43.6389980" lon="-79.3791700">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:25Z</time>
     </trkpt>
     <trkpt lat="43.6389820" lon="-79.3791400">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:27Z</time>
     </trkpt>
     <trkpt lat="43.6389700" lon="-79.3791000">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:28Z</time>
     </trkpt>
     <trkpt lat="43.6389620" lon="-79.3790810">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:29Z</time>
     </trkpt>
     <trkpt lat="43.6389530" lon="-79.3790610">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:30Z</time>
     </trkpt>
     <trkpt lat="43.6389460" lon="-79.3790390">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:31Z</time>
     </trkpt>
     <trkpt lat="43.6389490" lon="-79.3790170">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:32Z</time>
     </trkpt>
     <trkpt lat="43.6389590" lon="-79.3789770">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:33Z</time>
     </trkpt>
     <trkpt lat="43.6389620" lon="-79.3789610">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:34Z</time>
     </trkpt>
     <trkpt lat="43.6389800" lon="-79.3789170">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:36Z</time>
     </trkpt>
     <trkpt lat="43.6389870" lon="-79.3789050">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:37Z</time>
     </trkpt>
     <trkpt lat="43.6390090" lon="-79.3788780">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:38Z</time>
     </trkpt>
     <trkpt lat="43.6390340" lon="-79.3788420">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:39Z</time>
     </trkpt>
     <trkpt lat="43.6390520" lon="-79.3788140">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:40Z</time>
     </trkpt>
     <trkpt lat="43.6390690" lon="-79.3787830">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:41Z</time>
     </trkpt>
     <trkpt lat="43.6390880" lon="-79.3787340">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:42Z</time>
     </trkpt>
     <trkpt lat="43.6391000" lon="-79.3786890">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:44Z</time>
     </trkpt>
     <trkpt lat="43.6391110" lon="-79.3786480">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:45Z</time>
     </trkpt>
     <trkpt lat="43.6391240" lon="-79.3786100">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:46Z</time>
     </trkpt>
     <trkpt lat="43.6391390" lon="-79.3785590">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:47Z</time>
     </trkpt>
     <trkpt lat="43.6391440" lon="-79.3785420">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:48Z</time>
     </trkpt>
     <trkpt lat="43.6391560" lon="-79.3784950">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:49Z</time>
     </trkpt>
     <trkpt lat="43.6391780" lon="-79.3784400">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:51Z</time>
     </trkpt>
     <trkpt lat="43.6391960" lon="-79.3783900">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:52Z</time>
     </trkpt>
     <trkpt lat="43.6392080" lon="-79.3783460">
      <ele>77.1</ele>
      <time>2021-12-16T21:37:53Z</time>
     </trkpt>
     <trkpt lat="43.6392180" lon="-79.3783050">
      <ele>77.0</ele>
      <time>2021-12-16T21:37:54Z</time>
     </trkpt>
     <trkpt lat="43.6392320" lon="-79.3782500">
      <ele>77.0</ele>
      <time>2021-12-16T21:37:56Z</time>
     </trkpt>
     <trkpt lat="43.6392420" lon="-79.3782130">
      <ele>77.0</ele>
      <time>2021-12-16T21:37:57Z</time>
     </trkpt>
     <trkpt lat="43.6392540" lon="-79.3781760">
      <ele>77.0</ele>
      <time>2021-12-16T21:37:58Z</time>
     </trkpt>
     <trkpt lat="43.6392640" lon="-79.3781350">
      <ele>77.0</ele>
      <time>2021-12-16T21:37:59Z</time>
     </trkpt>
     <trkpt lat="43.6392770" lon="-79.3780890">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:00Z</time>
     </trkpt>
     <trkpt lat="43.6392910" lon="-79.3780240">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:02Z</time>
     </trkpt>
     <trkpt lat="43.6393030" lon="-79.3779810">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:03Z</time>
     </trkpt>
     <trkpt lat="43.6393120" lon="-79.3779450">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:04Z</time>
     </trkpt>
     <trkpt lat="43.6393300" lon="-79.3778970">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:05Z</time>
     </trkpt>
     <trkpt lat="43.6393360" lon="-79.3778810">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:06Z</time>
     </trkpt>
     <trkpt lat="43.6393570" lon="-79.3778330">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:07Z</time>
     </trkpt>
     <trkpt lat="43.6393630" lon="-79.3778170">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:08Z</time>
     </trkpt>
     <trkpt lat="43.6393770" lon="-79.3777740">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:09Z</time>
     </trkpt>
     <trkpt lat="43.6393860" lon="-79.3777280">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:10Z</time>
     </trkpt>
     <trkpt lat="43.6393960" lon="-79.3776900">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:11Z</time>
     </trkpt>
     <trkpt lat="43.6394090" lon="-79.3776400">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:13Z</time>
     </trkpt>
     <trkpt lat="43.6394270" lon="-79.3775920">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:14Z</time>
     </trkpt>
     <trkpt lat="43.6394330" lon="-79.3775750">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:15Z</time>
     </trkpt>
     <trkpt lat="43.6394490" lon="-79.3775280">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:16Z</time>
     </trkpt>
     <trkpt lat="43.6394550" lon="-79.3775140">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:17Z</time>
     </trkpt>
     <trkpt lat="43.6394780" lon="-79.3774740">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:18Z</time>
     </trkpt>
     <trkpt lat="43.6394870" lon="-79.3774590">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:19Z</time>
     </trkpt>
     <trkpt lat="43.6395000" lon="-79.3774350">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:20Z</time>
     </trkpt>
     <trkpt lat="43.6395130" lon="-79.3773980">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:22Z</time>
     </trkpt>
     <trkpt lat="43.6395210" lon="-79.3773620">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:23Z</time>
     </trkpt>
     <trkpt lat="43.6395300" lon="-79.3773110">
      <ele>77.2</ele>
      <time>2021-12-16T21:38:24Z</time>
     </trkpt>
     <trkpt lat="43.6395330" lon="-79.3772590">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:25Z</time>
     </trkpt>
     <trkpt lat="43.6395330" lon="-79.3772140">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:27Z</time>
     </trkpt>
     <trkpt lat="43.6395270" lon="-79.3771580">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:28Z</time>
     </trkpt>
     <trkpt lat="43.6395000" lon="-79.3771290">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:29Z</time>
     </trkpt>
     <trkpt lat="43.6394670" lon="-79.3771060">
      <ele>77.1</ele>
      <time>2021-12-16T21:38:30Z</time>
     </trkpt>
     <trkpt lat="43.6394290" lon="-79.3771060">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:31Z</time>
     </trkpt>
     <trkpt lat="43.6393960" lon="-79.3771120">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:32Z</time>
     </trkpt>
     <trkpt lat="43.6393650" lon="-79.3771170">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:33Z</time>
     </trkpt>
     <trkpt lat="43.6393310" lon="-79.3771160">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:34Z</time>
     </trkpt>
     <trkpt lat="43.6392960" lon="-79.3771190">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:35Z</time>
     </trkpt>
     <trkpt lat="43.6392580" lon="-79.3771110">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:37Z</time>
     </trkpt>
     <trkpt lat="43.6392260" lon="-79.3771080">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:38Z</time>
     </trkpt>
     <trkpt lat="43.6391960" lon="-79.3770910">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:39Z</time>
     </trkpt>
     <trkpt lat="43.6391600" lon="-79.3770430">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:41Z</time>
     </trkpt>
     <trkpt lat="43.6391520" lon="-79.3770220">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:42Z</time>
     </trkpt>
     <trkpt lat="43.6391450" lon="-79.3770010">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:43Z</time>
     </trkpt>
     <trkpt lat="43.6391430" lon="-79.3769490">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:45Z</time>
     </trkpt>
     <trkpt lat="43.6391510" lon="-79.3769090">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:46Z</time>
     </trkpt>
     <trkpt lat="43.6391600" lon="-79.3768740">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:47Z</time>
     </trkpt>
     <trkpt lat="43.6391710" lon="-79.3768260">
      <ele>77.0</ele>
      <time>2021-12-16T21:38:48Z</time>
     </trkpt>
     <trkpt lat="43.6391900" lon="-79.3767690">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:50Z</time>
     </trkpt>
     <trkpt lat="43.6392080" lon="-79.3767230">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:51Z</time>
     </trkpt>
     <trkpt lat="43.6392220" lon="-79.3766860">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:52Z</time>
     </trkpt>
     <trkpt lat="43.6392360" lon="-79.3766520">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:53Z</time>
     </trkpt>
     <trkpt lat="43.6392690" lon="-79.3765790">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:55Z</time>
     </trkpt>
     <trkpt lat="43.6392900" lon="-79.3765280">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:56Z</time>
     </trkpt>
     <trkpt lat="43.6393030" lon="-79.3764920">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:57Z</time>
     </trkpt>
     <trkpt lat="43.6393200" lon="-79.3764380">
      <ele>76.9</ele>
      <time>2021-12-16T21:38:58Z</time>
     </trkpt>
     <trkpt lat="43.6393300" lon="-79.3764030">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:00Z</time>
     </trkpt>
     <trkpt lat="43.6393450" lon="-79.3763570">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:01Z</time>
     </trkpt>
     <trkpt lat="43.6393580" lon="-79.3763260">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:02Z</time>
     </trkpt>
     <trkpt lat="43.6393750" lon="-79.3762770">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:04Z</time>
     </trkpt>
     <trkpt lat="43.6393890" lon="-79.3762440">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:05Z</time>
     </trkpt>
     <trkpt lat="43.6394120" lon="-79.3761900">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:07Z</time>
     </trkpt>
     <trkpt lat="43.6394290" lon="-79.3761510">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:08Z</time>
     </trkpt>
     <trkpt lat="43.6394460" lon="-79.3761010">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:09Z</time>
     </trkpt>
     <trkpt lat="43.6394510" lon="-79.3760820">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:10Z</time>
     </trkpt>
     <trkpt lat="43.6394600" lon="-79.3760460">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:11Z</time>
     </trkpt>
     <trkpt lat="43.6394740" lon="-79.3760090">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:12Z</time>
     </trkpt>
     <trkpt lat="43.6394870" lon="-79.3759750">
      <ele>76.9</ele>
      <time>2021-12-16T21:39:13Z</time>
     </trkpt>
     <trkpt lat="43.6395050" lon="-79.3759240">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:14Z</time>
     </trkpt>
     <trkpt lat="43.6395190" lon="-79.3758910">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:16Z</time>
     </trkpt>
     <trkpt lat="43.6395320" lon="-79.3758560">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:17Z</time>
     </trkpt>
     <trkpt lat="43.6395460" lon="-79.3758160">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:18Z</time>
     </trkpt>
     <trkpt lat="43.6395570" lon="-79.3757800">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:19Z</time>
     </trkpt>
     <trkpt lat="43.6395690" lon="-79.3757400">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:20Z</time>
     </trkpt>
     <trkpt lat="43.6395840" lon="-79.3757040">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:21Z</time>
     </trkpt>
     <trkpt lat="43.6396040" lon="-79.3756660">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:22Z</time>
     </trkpt>
     <trkpt lat="43.6396110" lon="-79.3756550">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:23Z</time>
     </trkpt>
     <trkpt lat="43.6396420" lon="-79.3756200">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:24Z</time>
     </trkpt>
     <trkpt lat="43.6396520" lon="-79.3756100">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:25Z</time>
     </trkpt>
     <trkpt lat="43.6396830" lon="-79.3755970">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:27Z</time>
     </trkpt>
     <trkpt lat="43.6397110" lon="-79.3755870">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:28Z</time>
     </trkpt>
     <trkpt lat="43.6397490" lon="-79.3755690">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:30Z</time>
     </trkpt>
     <trkpt lat="43.6397680" lon="-79.3755640">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:31Z</time>
     </trkpt>
     <trkpt lat="43.6398040" lon="-79.3755740">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:33Z</time>
     </trkpt>
     <trkpt lat="43.6398390" lon="-79.3755940">
      <ele>77.0</ele>
      <time>2021-12-16T21:39:35Z</time>
     </trkpt>
     <trkpt lat="43.6398740" lon="-79.3756230">
      <ele>77.1</ele>
      <time>2021-12-16T21:39:37Z</time>
     </trkpt>
     <trkpt lat="43.6398930" lon="-79.3756370">
      <ele>77.1</ele>
      <time>2021-12-16T21:39:38Z</time>
     </trkpt>
     <trkpt lat="43.6399360" lon="-79.3756700">
      <ele>77.1</ele>
      <time>2021-12-16T21:39:40Z</time>
     </trkpt>
     <trkpt lat="43.6399750" lon="-79.3757290">
      <ele>77.1</ele>
      <time>2021-12-16T21:39:42Z</time>
     </trkpt>
     <trkpt lat="43.6400000" lon="-79.3757730">
      <ele>77.2</ele>
      <time>2021-12-16T21:39:43Z</time>
     </trkpt>
     <trkpt lat="43.6400220" lon="-79.3757920">
      <ele>77.3</ele>
      <time>2021-12-16T21:39:44Z</time>
     </trkpt>
     <trkpt lat="43.6400600" lon="-79.3758330">
      <ele>77.3</ele>
      <time>2021-12-16T21:39:46Z</time>
     </trkpt>
     <trkpt lat="43.6400870" lon="-79.3758540">
      <ele>77.3</ele>
      <time>2021-12-16T21:39:47Z</time>
     </trkpt>
     <trkpt lat="43.6401090" lon="-79.3758790">
      <ele>77.4</ele>
      <time>2021-12-16T21:39:48Z</time>
     </trkpt>
     <trkpt lat="43.6401340" lon="-79.3759070">
      <ele>77.4</ele>
      <time>2021-12-16T21:39:49Z</time>
     </trkpt>
     <trkpt lat="43.6401600" lon="-79.3759330">
      <ele>77.5</ele>
      <time>2021-12-16T21:39:50Z</time>
     </trkpt>
     <trkpt lat="43.6401930" lon="-79.3759630">
      <ele>77.5</ele>
      <time>2021-12-16T21:39:51Z</time>
     </trkpt>
     <trkpt lat="43.6402260" lon="-79.3760210">
      <ele>77.6</ele>
      <time>2021-12-16T21:39:53Z</time>
     </trkpt>
     <trkpt lat="43.6402460" lon="-79.3760710">
      <ele>77.7</ele>
      <time>2021-12-16T21:39:54Z</time>
     </trkpt>
     <trkpt lat="43.6402720" lon="-79.3761290">
      <ele>77.9</ele>
      <time>2021-12-16T21:39:55Z</time>
     </trkpt>
     <trkpt lat="43.6402920" lon="-79.3761650">
      <ele>78.0</ele>
      <time>2021-12-16T21:39:56Z</time>
     </trkpt>
     <trkpt lat="43.6403200" lon="-79.3762030">
      <ele>78.0</ele>
      <time>2021-12-16T21:39:57Z</time>
     </trkpt>
     <trkpt lat="43.6403310" lon="-79.3762160">
      <ele>78.0</ele>
      <time>2021-12-16T21:39:58Z</time>
     </trkpt>
     <trkpt lat="43.6403500" lon="-79.3762620">
      <ele>78.1</ele>
      <time>2021-12-16T21:39:59Z</time>
     </trkpt>
     <trkpt lat="43.6403550" lon="-79.3762780">
      <ele>78.1</ele>
      <time>2021-12-16T21:40:00Z</time>
     </trkpt>
     <trkpt lat="43.6403600" lon="-79.3763070">
      <ele>78.1</ele>
      <time>2021-12-16T21:40:02Z</time>
     </trkpt>
     <trkpt lat="43.6403860" lon="-79.3763420">
      <ele>78.2</ele>
      <time>2021-12-16T21:40:04Z</time>
     </trkpt>
     <trkpt lat="43.6404180" lon="-79.3763460">
      <ele>78.2</ele>
      <time>2021-12-16T21:40:05Z</time>
     </trkpt>
     <trkpt lat="43.6404680" lon="-79.3763410">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:06Z</time>
     </trkpt>
     <trkpt lat="43.6405060" lon="-79.3763710">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:08Z</time>
     </trkpt>
     <trkpt lat="43.6405160" lon="-79.3763800">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:09Z</time>
     </trkpt>
     <trkpt lat="43.6405270" lon="-79.3763900">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:10Z</time>
     </trkpt>
     <trkpt lat="43.6405430" lon="-79.3764060">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:11Z</time>
     </trkpt>
     <trkpt lat="43.6405620" lon="-79.3764220">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:13Z</time>
     </trkpt>
     <trkpt lat="43.6405850" lon="-79.3764440">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:14Z</time>
     </trkpt>
     <trkpt lat="43.6406170" lon="-79.3764610">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:15Z</time>
     </trkpt>
     <trkpt lat="43.6406280" lon="-79.3764640">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:16Z</time>
     </trkpt>
     <trkpt lat="43.6406440" lon="-79.3764720">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:17Z</time>
     </trkpt>
     <trkpt lat="43.6406540" lon="-79.3764750">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:18Z</time>
     </trkpt>
     <trkpt lat="43.6406560" lon="-79.3764710">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:20Z</time>
     </trkpt>
     <trkpt lat="43.6406640" lon="-79.3764680">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:21Z</time>
     </trkpt>
     <trkpt lat="43.6406750" lon="-79.3764700">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:22Z</time>
     </trkpt>
     <trkpt lat="43.6406930" lon="-79.3764810">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:24Z</time>
     </trkpt>
     <trkpt lat="43.6407040" lon="-79.3764760">
      <ele>78.3</ele>
      <time>2021-12-16T21:40:25Z</time>
     </trkpt>
     <trkpt lat="43.6626900" lon="-79.3790220">
      <ele>103.2</ele>
      <time>2021-12-16T22:07:49Z</time>
     </trkpt>
    </trkseg>
   </trk>
  </gpx>
  `