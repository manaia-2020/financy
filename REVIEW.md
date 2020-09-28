1. unnecessary packages in dependencies - if only the front end uses it put it into devDependencies
1. insufficient test coverage (run `npm test -- --coverage`)
    * server/routes - particularly user.js
    * server/database - some functions have been missed
    * client.api
1. some of your routes use sendErr some use console.log - make them consistent and if multiple files want to use the sendErr function, extract it into a utils file
1. database files have inconsistent naming (e.g. goals.database)
1. inconsistent naming in reducers files - everything is .reducer or nothing is
1. components need more tests
1. Landing Page components shouldbe .jsx
