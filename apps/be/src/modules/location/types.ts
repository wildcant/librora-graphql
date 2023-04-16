/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graph/types";
export namespace LocationModule {
  interface DefinedFields {
    GeoJSON: 'type' | 'coordinates';
    LatLngLiteral: 'lat' | 'lng';
    Location: 'id' | 'country' | 'city' | 'zipcode' | 'latitude' | 'longitude' | 'geojson' | 'bounds';
  };
  
  export type GeoJSON = Pick<Types.GeoJson, DefinedFields['GeoJSON']>;
  export type JSON = Types.Json;
  export type LatLngLiteral = Pick<Types.LatLngLiteral, DefinedFields['LatLngLiteral']>;
  export type Location = Pick<Types.Location, DefinedFields['Location']>;
  
  export type GeoJSONResolvers = Pick<Types.GeoJsonResolvers, DefinedFields['GeoJSON'] | '__isTypeOf'>;
  export type LatLngLiteralResolvers = Pick<Types.LatLngLiteralResolvers, DefinedFields['LatLngLiteral'] | '__isTypeOf'>;
  export type LocationResolvers = Pick<Types.LocationResolvers, DefinedFields['Location'] | '__isTypeOf'>;
  
  export interface Resolvers {
    GeoJSON?: GeoJSONResolvers;
    LatLngLiteral?: LatLngLiteralResolvers;
    Location?: LocationResolvers;
  };
}