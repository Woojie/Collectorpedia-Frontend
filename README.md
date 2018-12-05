This project was made as a Final Project for brainstation. The MVP of the project was built in 10 days to showcase to Brainstation's industry partners.

## Description

In the habit of collecting things as a hobby? Collectorpedia is a collection management systems that makes an inventory of everything you are trying to collect, whether that be shoes, collectible minatures, cards, or tshirts. As collections of items get larger and larger, it gets harder for people to keep track of everything they own; collectorpeida makes it a lot easier!

### Features

**Easy to Use Library of Items**: Add collections and collections at the ease of a couple of clicks!! 

**Customizable with default and custom parameters**: You have several default parameters to define your collection, but you can set your own custom parameters too! If you are collecting magic cards for example, you can set parameters for the color, rarity, and condition of the cards.

**Easily Editable**: Super easy to edit, just click the edit button for the items to edit the details of the items or even the collections themselves!

**Take Pictures!**: You can take pictures of your collection and post them with the item! If you have multiple images, the image becomes a carousel. 


### Tech Stack

This app is a PWA MERN stach that uses the following frameworks/modules:
<br>
#### Front End:
**React** - main ui framework being used for theproject. <br>
**redux** (TBD) - state management for react for ease of flow.<br>
**axios** - HTTP methods to communicate with the backend server <br>
**semantic-ui-react** - Main CSS framework used to style the website <br>
**Other minor modules**:<br>
form-data<br>
prop-types<br>
classnames<br>
getUserMedia(for getting access to camera)<br>
uuidv4<br>
react-responsive-carousel<br>
react-router-dom<br>

#### Back-End

**Node.js** - Back-end and Front-end was done in Node.js and using NPM modules
**MongoDB & Mongoose** - Database for the project was Mongo for its ease of use and JSON-like nature
**Express** - Used to connect all the HTTP routes with the front-end. 
**cors & bodyParser & multer** - Make cross-origin HTTP requests possible
**Passport.js, bcrypt, express-sessios** - Makes a persistent user database with hashed passports and unique sessions. Specifically, used local strategies for now.
