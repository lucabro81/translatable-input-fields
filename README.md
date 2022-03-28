# Typescript Web Component Boilerplate

Template to build lazy loaded web components collections with Typescript and nothing(almost)else. Well, there're some other dependencies but are mainly for webpack.

### Installation

```
https://github.com/lucabro81/typescript-web-component-boilerplate.git
cd path/to/project/folder
npm install
```

### How to use

```
npm run create-new-component nameComponent
```
This command will create a component folder in ```/src```, named ```/name-component```, with seven files inside: a Typescript class and dts, a file that exports an array of observed attributes, an index file and relatively dts to export a function to register the component, the css file and the html template.

An import will be added to ```main.ts```

### Scripts

```
npm run start
```
Start a webpack dev server with hot reloading

---

```
npm run watch
```
Start a webpack watcher

---

```
npm run build
```
Guess what... yep.

---

```
npm run build:prod:patch | build:prod:minor | build:prod:major
```
Guess what... yep, but production mode. Useful when you want to deploy to a cdn the components' library. Also bump the version project

---

```
npm run build:npm
```
Prepare the package for the npm publish

---

```
npm run publish:npm:patch | publish:npm:minor ! publish:npm:major
```
Clean the package folder, emit the js ready for the publication, move, dts in the right place and publish. Also bump the version project

---

```
npm run clean
```
Get rid of ```node_modules``` and ```package-lock.json``` and reinstall all the (few) dependencies

---

```
npm run update
```
Update dependencies.

---

```
npm run lint
```
Linter and prettier that run on staged changes, it seems the git hook on commit doesn't work with phpstorm, I've to understand why