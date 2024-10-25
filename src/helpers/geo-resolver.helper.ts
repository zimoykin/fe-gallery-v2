export function getAddressTitleByCoords(
  geo: google.maps.Geocoder,
  lat: number,
  lng: number,
  locale: string,
  cb: (locationTitle: string) => void,
) {
  geo
    ?.geocode({ location: { lat, lng }, language: locale ?? "en" })
    .then((response) => {
      if (!response.results) return;
      const { address_components } = response.results[0];
      const newAddress: string[] = [];
      address_components.forEach(({ long_name, types }) => {
        switch (types[0]) {
          case "country":
            newAddress.push(long_name);
            break;
          case "locality":
            newAddress.unshift(long_name);
            break;
        }
      });

      if (newAddress.length > 0) {
        cb(newAddress.join(", "));
      }
    });
}

export function getCoordsByAddress(
  geo: google.maps.Geocoder,
  address: string,
  locale: string,
  cb: (lat: number, lng: number, fullTitle: string) => void,
) {
  geo?.geocode({ address, language: locale ?? "en" }).then((response) => {
    if (!response.results) return;
    const { lat, lng } = response.results[0].geometry.location;

    const { address_components } = response.results[0];
    const newAddress: string[] = [];
    address_components.forEach(({ long_name, types }) => {
      switch (types[0]) {
        case "country":
          newAddress.push(long_name);
          break;
        case "locality":
          newAddress.unshift(long_name);
          break;
      }
    });

    cb(lat(), lng(), newAddress.join(", "));
  });
}
