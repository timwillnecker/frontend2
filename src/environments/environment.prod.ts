// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: true,
  version: '0.0.1',
  services: {
    customer: {
      name: 'customer',
      query: 'http://localhost:8090/',
      cmd: 'http://localhost:8090/',
      authorization: 'Basic dGltd2lsbG5lY2tlcjp0aW13aWxsbmVja2Vy'
    }
  }
};
