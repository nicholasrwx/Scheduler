# Interview Scheduler

Interview Scheduler is a complex application, built with React, that can create appointments. It gives you a list of available interviewers to choose from, and calculates available timeslots on a particular day based off how many empty appointments there are. It also gives you the option to edit or delete an appointment. It will let you know if a field is missing information before it will allow you to create an appointment. Also, if there is something wrong with creating or deleting the appointment, it will display an error message letting the user know something went wrong.  

## Final Product

!["Create"](https://github.com/nicholasrwx/Scheduler/blob/master/docs/Create.png?raw=true)

!["Show"](https://github.com/nicholasrwx/Scheduler/blob/master/docs/Show.png?raw=true)

!["Confirm"](https://github.com/nicholasrwx/Scheduler/blob/master/docs/Confirm.png?raw=true)

!["Delete"](https://github.com/nicholasrwx/Scheduler/blob/master/docs/Delete.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository on your LOCALHOST machine.
2. Install dependencies using the `npm install` command.
3. Fork the scheduler-api repository, then clone this repository on your VM.
4. Follow the README.md instructions to create and seed the database on your VM.
5. Run scheduler with `npm start`, and scheduler-api with `npm start`  
6. The app will run on <http://localhost:8000/>.
7. The api will run on <http://localhost:8001/>.
4. Go to <http://localhost:8000/> in your browser, to view the app if it doens't open automatically.


## Dependencies

 - node 14.20.0
 - npm 8.19.1 ( Installs with node )
 - axios 0.21.1
 - classnames 2.2.6
 - normalize.css 8.0.1
 - react 16.9.0
 - react-dom 16.9.0
 - react-scripts 3.0.0
 - babel-loader 8.0.5
 - node-sass 4.14.0

## Dependency Notes
  - Ensure node and npm versions are correct
  - ```npm install -g npm@8.19.1``` May help in case of pre-installed npm causing conflict
  - Ensure babel-loader remains at 8.0.5
  - Don't upgrade node-sass to sass

```Later versions of node install modules which cause dependency issues. Babel and Story Book become deprecated and the newer versions require sass instead of node-sass, which causes further dependency issues.```

## Setup
Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
