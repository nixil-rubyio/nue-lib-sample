Common component example

# Before start 
run 
```
npm install -g typescript
npm install -g ts-node
npm install -g conventional-changelog-cli
```

Our libraries are stored in a private npm registry. As a result, you will need to do the following:

1. Create a file in your ~ folder called `.npmrc`. Within it, put in
```
registry=http://nexus.nuedev.click/repository/npm-group/
always-auth=true
```
     
## How to test

1. To test all files, run yarn test
