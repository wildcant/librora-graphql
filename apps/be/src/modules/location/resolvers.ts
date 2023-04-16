import { LocationModule } from './types'

// TODO: It's probably more performant to create another table with latitud, longitud and geojson.
export const resolvers: LocationModule.Resolvers = {
  Location: {
    latitude: async (location, _args, context) => {
      const { zipcode, city, country } = location
      if (!zipcode || !city || !country) {
        return null
      }

      const [place] = await context.dataSources.openstreetmap.searchPlaces({ zipcode, city, country })
      return place?.lat ? parseFloat(place.lat) : null
    },

    longitude: async (location, _args, context) => {
      const { zipcode, city, country } = location
      if (!zipcode || !city || !country) {
        return null
      }

      const [place] = await context.dataSources.openstreetmap.searchPlaces({ zipcode, city, country })
      return place?.lon ? parseFloat(place.lon) : null
    },

    geojson: async (location, _args, context) => {
      const { zipcode, city, country } = location
      if (!zipcode || !city || !country) {
        return null
      }

      const [place] = await context.dataSources.openstreetmap.searchPlaces({ zipcode, city, country })
      return place?.geojson ?? null
    },

    bounds: async (location, _args, context) => {
      const { zipcode, city, country } = location
      if (!zipcode || !city || !country) {
        return null
      }

      const [place] = await context.dataSources.openstreetmap.searchPlaces({ zipcode, city, country })
      if (!place) return null

      return [
        { lat: parseFloat(place.boundingbox[0]), lng: parseFloat(place.boundingbox[2]) },
        { lat: parseFloat(place.boundingbox[1]), lng: parseFloat(place.boundingbox[3]) },
      ]
    },
  },
}
