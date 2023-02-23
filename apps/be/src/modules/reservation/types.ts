/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graphql/types";
export namespace ReservationModule {
  interface DefinedFields {
    Reservation: 'id' | 'state' | 'subState';
    Query: 'reservation';
  };
  
  interface DefinedEnumValues {
    EReservationState: 'PENDING' | 'WITHDRAWN' | 'DENIED' | 'CONFIRMED' | 'CANCELED' | 'EXPIRED' | 'ACTIVE' | 'RETURNED';
    EReservationChangeRequestState: 'CHANGE_PENDING' | 'CHANGE_CANCELLED' | 'CHANGE_DENIED' | 'CHANGE_CONFIRMED';
  };
  
  export type EReservationState = DefinedEnumValues['EReservationState'];
  export type EReservationChangeRequestState = DefinedEnumValues['EReservationChangeRequestState'];
  export type Reservation = Pick<Types.Reservation, DefinedFields['Reservation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type ReservationResolvers = Pick<Types.ReservationResolvers, DefinedFields['Reservation'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Reservation?: ReservationResolvers;
    Query?: QueryResolvers;
  };
}