import { BookBySlugQuery } from '@librora/api/schema'
import { LatLngBoundsLiteral } from 'leaflet'
import { GeoJSON, GeoJSONProps, MapContainer, TileLayer } from 'react-leaflet'

type LocationProps = NonNullable<NonNullable<BookBySlugQuery['book']>['owner']['location']>

const Location = ({ latitude, longitude, geojson, bounds }: LocationProps) => {
  if (!latitude || !longitude || !geojson) return <></>

  return (
    <MapContainer
      center={[latitude, longitude]}
      style={{ height: '100%', width: '100%' }}
      bounds={bounds as LatLngBoundsLiteral}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      <GeoJSON
        data={geojson as GeoJSONProps['data']}
        style={{ fillColor: '#edcdff', fillOpacity: 0.5, weight: 2, color: '#edcdff', opacity: 0.6 }}
      />
    </MapContainer>
  )
}

export default Location
