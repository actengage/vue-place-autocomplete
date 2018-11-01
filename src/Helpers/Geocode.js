export default function geocode(options) {
    const geocoder = new window.google.maps.Geocoder();

    return new Promise((resolve, reject) => {
        if (!options.geometry) {
            geocoder.geocode(options, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    resolve(results);
                }
                else {
                    reject(status);
                }
            });
        }
        else {
            resolve([options]);
        }
    });
};
