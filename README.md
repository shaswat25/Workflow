# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

installs the dependencies added in package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Brief  Explaination

There is default Task nodes on first appearance without any data.

There are 3 button on the header ,
 1. Open work flow is to trigger the the side panel.
 2. Import button is used to import the json file for same work flow ,once you import the json,it will render the workflow as described.
 3. Export is used to download your work flow in JSON format.


 - Side panel consist of +Add/Drag Node which has a dropdown consisting if all the 3 node (Task,Condition,Notification)

 - There are two ways to add the nodes either click on it or drag the node.

  - if you drag the node to main flow it will add the node just with the heading,One can select that node it will trigger the form    with required fields to be added and saved succesffully.

  - if you click the node then the form will appear in the panel after filling,the node will get added with required data after saving it.

 - There are two points to connect the edges,Top is treated as target and bottom one as source.

 - you can connect edges through these points and also remove the edges after seleting it again. 

 - There is a delete button in the form to delete the selected node in main flow.

 - React table is present with all the nodes with desired columns.

  - Action column can be used to edit or delete the node within the table.
  
  - Table has a propert of virtualisd scroll after a certain height
 



