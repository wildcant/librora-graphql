import {
  AuthorSchema,
  BookModel,
  BookSchema,
  LocationModel,
  LocationSchema,
  UserModel,
  UserSchema,
} from 'schemas'
import { GraphQLResolveInfo } from 'graphql'
import { ResolveTree, parseResolveInfo, simplifyParsedResolveInfoFragmentWithType } from './parse-info'
import { Author, Book, Location, User } from './types'

// Remove undefined from T
type NonUndefined<T> = Exclude<T, undefined>
type TypeName =
  | NonUndefined<User['__typename']>
  | NonUndefined<Author['__typename']>
  | NonUndefined<Book['__typename']>
  | NonUndefined<Location['__typename']>

// Postgres table shape for each graphql type.
const allowedPropertiesForType: { [key in TypeName]: string[] } = {
  Author: Object.keys(AuthorSchema.shape),
  Book: Object.keys(BookSchema.shape),
  User: Object.keys(UserSchema.shape),
  Location: Object.keys(LocationSchema.shape),
}

type GraphqlSchemaType = User | Book | User | Location
type SqlSchemaType = UserModel | BookModel | UserModel | LocationModel

// sql dependencies arrays that will get retrieved if the GraphQL field is requested.
// These are exposed to your resolver, so you can write a resolve function to compute values.
const userComputedPropertiesDependencies: {
  [key in keyof Omit<User, keyof UserModel | '__typename'>]?: (keyof UserModel)[]
} = {
  name: ['firstName', 'lastName'],
  initial: ['firstName'],
}

const locationComputedPropertiesDependencies: {
  [key in keyof Omit<Location, keyof LocationModel | '__typename'>]?: (keyof LocationModel)[]
} = {
  geojson: ['city', 'country', 'zipcode'],
  latitude: ['city', 'country', 'zipcode'],
  longitude: ['city', 'country', 'zipcode'],
  bounds: ['city', 'country', 'zipcode'],
}

const computedPropertiesDependenciesForType: {
  [key in TypeName]?: {
    [k in keyof Omit<GraphqlSchemaType, keyof SqlSchemaType | '__typename'>]?: (keyof SqlSchemaType)[]
  }
} = {
  User: userComputedPropertiesDependencies,
  Location: locationComputedPropertiesDependencies,
}

/** We make sure we only return properties that are allowed in our db schemas. */
function sanitizeFields(fieldsList: string[], type: TypeName) {
  // Make sure that the type is in definitions.
  if (!Object.keys(allowedPropertiesForType).includes(type)) {
    return fieldsList
  }

  const allowedProperties = allowedPropertiesForType[type as TypeName]

  // Fields properties that are not allowed to query DB.
  return fieldsList.filter((field) => allowedProperties.includes(field))
}

/** Dynamically resolve dependency arrays for computed properties resolvers. */
function addDependencies(fieldsList: string[], type: TypeName) {
  if (!Object.keys(computedPropertiesDependenciesForType).includes(type)) {
    return fieldsList
  }

  // Get the list of dependencies for all computed property for a given graphql type.
  const computedPropertiesDependencies = computedPropertiesDependenciesForType[type as TypeName]
  if (!computedPropertiesDependencies) {
    return fieldsList
  }

  const fieldsListWithDependencies = [...fieldsList]

  // Map computed properties and add dependencies to fields list if necessary.
  Object.keys(computedPropertiesDependencies).forEach((computedProperty) => {
    if (fieldsList.includes(computedProperty)) {
      const dependencies = computedPropertiesDependencies[
        computedProperty as keyof typeof computedPropertiesDependencies
      ] as string[]

      // Check if dependency is already included in the fields list, if not we include it.
      dependencies.forEach((dependency) => {
        if (!fieldsListWithDependencies.includes(dependency)) {
          fieldsListWithDependencies.push(dependency)
        }
      })
    }
  })

  return fieldsListWithDependencies
}

/** Transform the graphql query from the info object into an sql table selection. */
export function getFields<T>(info?: GraphQLResolveInfo): (keyof T)[] | undefined {
  if (!info) return

  const parsedResolveInfoFragment = parseResolveInfo(info)

  const fields = simplifyParsedResolveInfoFragmentWithType(
    parsedResolveInfoFragment as ResolveTree,
    info.returnType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ).fields as any

  let fieldsList = Object.keys(fields)

  if (parsedResolveInfoFragment?.fieldsByTypeName) {
    // Resolve which types we are getting the fields for.
    Object.keys(parsedResolveInfoFragment.fieldsByTypeName).forEach((type) => {
      let typeName = type as TypeName
      // In case this is a connection query we must get the fields form the nodes.
      if (fieldsList.includes('nodes')) {
        const [nodeType] = Object.keys(fields.nodes.fieldsByTypeName)
        if (nodeType) {
          fieldsList = Object.keys(fields.nodes.fieldsByTypeName[nodeType])
          typeName = nodeType as TypeName
        }
      }

      // Resolve computed properties dependencies.
      fieldsList = addDependencies(fieldsList, typeName)

      // Remove properties that are not in the db schema.
      fieldsList = sanitizeFields(fieldsList, typeName)
    })
  }

  // Include id by default.
  if (fieldsList.length && !fieldsList.includes('id')) {
    fieldsList.push('id')
  }

  return fieldsList as (keyof T)[]
}
