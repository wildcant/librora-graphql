## Goals

- Schema first with type safety.
- Simplicity and good DX.
- Scalable project structure following a few best practices.
- Stablish boundaries between database access, business logic and resolvers (e.g. using eslint rules).

references:

Type safe resolvers with GraphQL Code Generator ->

- https://www.youtube.com/watch?v=tHMaNmqPIC4
- https://the-guild.dev/graphql/codegen/plugins/presets/near-operation-file-preset

Merge GraphQL resolvers with GraphQL Tools ->

- https://www.youtube.com/watch?v=6Jd5nKQrqcU
- https://the-guild.dev/graphql/tools/docs/schema-merging

Data source APIs -> https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

Split resolvers and types to have type safe resolvers and avoid names collision.

## Useful Links

- https://github.com/kriasoft/relay-starter-kit#readme

## Known problems

- typescript-resolvers plugin won't generate native typescript enums :( See https://github.com/dotansimha/graphql-code-generator/issues/8296

## Resources

- Free postgres (20MB) at elephantsql.com

## Features

- Datasources typed methods, [see playground](https://www.typescriptlang.org/play?#code/KYDwDg9gTgLgBDAnmYcBKwCOBXAllYAQRgBlgBDAZxgHkA7YAHgBUA+OAXjgG8AoOOAG0A0nFx04Aa2CIIAMzjMAugFoA-AC50WPAQAmjAAq4AxpJYAaOMNbsAZHEPlYucgBsjp88ysBRECZu2HpM0rIKPta2rLwAvoJh8opKvLygkLAIyKgYJthQlLgAbsBOLu4s7Fx8AoKGYhKJEUqainVKcKAwwHR6lHAAFOJywFBwAKoAlIIpAgJq2nkFxaXOMK4e46wz-HNazO2dIN29-RAARgBWwCYwu-OL+YUlZesVB4ZKMXNw++1xqXS0HgSBQcBoAFtcDAAJIGNiccFQmCWOAAclwejRMSBmVBOR0+GAejhlURkOhpIRDm4Yj0WmoUHEAHM4LE0uBgVkwTQwOsIHR3FSqkjKfD7Dw6a1GSy2YDOXjsnBfHRsBDRuRzm4mAiuMw4AAfOCEKBQciISqpfFwADC2GoEAhxjMqNEXR6fSkMiSup4uzqDWsSj+nwBHIyIKVGBwRL0whklDJ1V2AHoU51KG5xDAVHpcJRNdqVAxjiosww4AABfGUExMvkqYCZ7Mp87kOgqGv+0TiL3hZLqLTcWJHE6eu0Op1eV3sBYMEpjLTCOIJb3NeUR7moZhQbAwAAWiHjiETvpqQjCgaayT+YQ67tOcDk7koqCN2F6wDk4mJhrgqrcNw4DnYAF1+PsV2vZRUnDLlrR3bBgGPU8RQQg8jwTRgJxgR1nW8Kxo10YlkMqWwrSVEh8xgEjIjdY4PX6E0zQtKD2HfT9vwYPQRTosd+gIcg9AFNxEEGYZRgmaYOgWcZwPnUYYOtAAxcQ9HGOhcBwIgoGZU8rGYdTNMQwwoAgFAXCbEVzwAd33UZgC0QiiWIMgqFoBgWEMrSTLM0Z1ks3ZX21W5WgGKCpLDZTVIAWXbRATV0pM-QEWz7NaJyCBcihqHoHVvjgIKbhgULwp2dk0lVCFlXGV8oGYJVzwEQg9ChCQuAAIkIAARaKYQAOXaix7gmWrEXa8YAGVfDQdqAR6NVqtqtAIG1ZK5jIT8oAAIWgUzrIkjqSF8PquumgB9LaaDQNAaAAdWmwbhoANXzaFoDGp6YQmmFmCu2byutGrRmiiAQiA5MfnzXwIXIXA3Ce9xMXIbo9Fac4IBWigJCNACgPYkJOOJABuYaCBjAhKBtDHJFwYAqboV86GKrR0cx9s-1xv8PwJn89BJyH6QKmAmToZl+bmfEtF8IG6uyAA6GXxYEYAYbhhlhZZJWn3wag+vIdV1ZFsXhrcNy9YNoWja1sAqEoazoEFmVRa1+1RkFC2neNn43AgExkdwAVDc10nMalmXlu1EnytxSMwQAcWAGAVXWJAnEQH3BMYXYfGzrzjNM8z-MoIaBAm0cGLgFTejz7TEsiAyNO8gu-Npyg2MrmK4oSlCS4mRFrwm3gRTRQrbjRcvH1khZaQDXtKOoGirAmwQR+AYKYDRL5g0cCfPSg4C2k+OTQIkkd9nIsFmCbeAuATpOmehRA04zgwZZBsGrDwxg39BterAxLEf40Qq1hm4ceRo0SuygO7YA2IrDcFSgQIcIC1bojRLEKwo8YBaBXpiTesQYiwUVGCCaa8ioTWwOcV8KJIhbERI1C8MgrxrhvH2Xe-RrxTzaHeY+C5dgAyVAACSoKQ9e9DApkNuFoOKkUlQ2jsmYURRVUQTSsHQvU7C4DCMoEo24B9ZJaEHrwNMjhTJQlfIwO+ydH7PwgJneuNcfKF1blYKualG6IW7qiBuRlSjNwsm3duuMYjWkMMyLqyNyATQgPkEwOp9KOP8UXehdIg6izZFZVMAAqLJcAyAwH6LIbAcACAaxPnAcgBUWSrT0JEtsr4Sk3AdnAc4olMRwHeh+XxFSYAa3OHuVAWSUy7E4u43xjAACKmi3E1y8Q4jxfjfIBNsAMYaWkoCIC0BM3YkwtDyJuJIXRKIJmfzMfmPKpzHTnMsYnaxqdzQv28YkpZRcrATOiBzbAgEwwxy3CNUYESYBRJiVAOJiIwmAuBbEpgP8P6OGnLCv+6I8FAJQWAoBUCYHYkIdqeAUDIXROhVoGWBKQVguqOyH4vATACmoBUxE+LImEtBcAOWoya4DAQXZJBPA0VaDROgzBkjsFCAAWif+aLxXIsoNDUBCMsy1JRvgyYQA)

## TODOs

[ ] Try tests with [vitest](https://vitest.dev/guide/) https://www.hubburu.com/articles/testing_apollo_server_with_vitest
[ ] Add generator script to create a new modules.
[x] Add reservations module, try xstate to have more complex logic and learn about event driven architectures.
[x] Standardize the way to work with Computed Columns when mapping a graphql query to an sql query. see [join-monster](https://join-monster.readthedocs.io/en/latest/field-metadata/#computed-columns) for reference. See also an [article](https://productionreadygraphql.com/blog/2020-05-21-graphql-to-sql) about it this topic.
[ ] Reseaerch how to handle concurrent requests when making a reservation to ensure data integrity and avoid race conditions.
[ ] Research how to handle time zones, we could add a contraint e.g. it will be used in America only (research data fns lib limitations with timezones).
