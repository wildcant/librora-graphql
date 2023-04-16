import { RESTDataSource } from '@apollo/datasource-rest'
import { LocationModel } from '@librora/schemas'
import { GeoJson } from '../../graph/types'

export interface Place {
  place_id: number
  osm_type: string
  osm_id: number
  boundingbox: [string, string, string, string]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
  geojson: GeoJson
}

export class OpenStreetMapDataSources extends RESTDataSource {
  override baseURL = 'https://nominatim.openstreetmap.org'

  async searchPlaces({ zipcode, country, city }: Pick<LocationModel, 'zipcode' | 'country' | 'city'>) {
    const response = (await this.get(
      `search.php?city=${city}&country=${country}&postalcode=${zipcode}&format=jsonv2&polygon_geojson=1`
    )) as (Place | undefined)[]

    return response
  }
}
