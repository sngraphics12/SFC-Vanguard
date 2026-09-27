function showLocation() {

    let myMap = document.getElementById("map");

    if (navigator.geolocation) {

        myMap.innerHTML = "Getting your location.....";


        navigator.geolocation.getCurrentPosition(

            function(position) {

                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                myMap.innerHTML = `

                    <iframe
                        src="https://www.google.com/maps?q=${lat},${lng}&output=embed"
                        width="100%"
                        height="250"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>

                `;

            },


            function() {

                myMap.innerHTML =
                    "Could not get your location. Access denied.";

            }

        );

    }

    else {

        myMap.innerHTML =
            "Geolocation is not supported by this browser.";

    }

}