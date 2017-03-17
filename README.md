Near Care with Shout App
============

A React-based version of the Shout resource tool, intended for use as a hybrid app (web, Android, IOS).

##Examples

* Shout Atlanta:
[example](http://shoutapp.org)

##Installation

* Go to `/current`, all steps are handled in either `/current` or folders inside it.
* Using the following setting steps could avoid computer be full of unknown packages. In this way, if the environment is no longer needed, just delete the environment folder and that's all.
    * Install python, pip.
    * Install `virtualenv` by typing `pip install virtualenv` (`virtualenv` will be installed with the system).
    * Under `/current`, create a new virtual Python environment by typing `virtualenv pyenvironment` where `pyenvironment` is the name of the environment folder (delete it if the environment is no longer needed and you will find out the system is still clean). You can change to other names. But note, git ignore only contains **`pyenvironment`**.
    * Activate the virtual environment by typing `source pyenvironment/bin/activate` or `. pyenvironment/bin/activate`. To quit the current environment type `deactivate` or close current terminal.
    * Under `/current`, install node js virtual environment tool by typing `pip install nodeenv` under the **activated** virtual Python environment. Otherwise, the node js virtual environment tool will be installed in your system. 
    * Similarly, using `nodeenv nodejsenv` to set up node js environment. The folder name `/nodejsenv` is also pre-defined in the git ignore.
    * Similarly, using `source nodejsenv/bin/activate` or `. nodejsenv/bin/activate` for activation, `deactivate-node` or closing current terminal to quit environment.
    * Then you can go to `npm start` step for the following instructions.
* Install Node.js (developed with version 6)
* clone the repo and ```cd``` to it
* ```npm install```
* ```npm start``` to start dev server
* open a browser to http://localhost:8080 (Webpack is used for hot updates as files are edited)
* Install Cordova as used
* run cordova app, eg ```cordova run android```

##How it works
* [Data](#data)
* [Search](#search)

### Data
Shout uses PouchDB's offline-first database library. Data entries are structured into three types, all stored as JSON objects.

1) Resources - These documents store general information about a resource, such as it's address, phone number, description, latitude, longitude, and a list of services.
These documents are rarely modified after they are first created. Users cannot modify these documents as of latest version.
The format of a Resource object ID is :"Resource_" + resource zip code + _ + resource name

2) Tags - These documents store all of the tags associated with a particular resource. They are a separate document, because tags can be frequently updated, downvoted, or upvoted by users.
The format of a Tags object ID is: "tags" + _ + resource name

3) Feedback - Every new feedback (per user, per resource) is stored as a new Feedback object. These are expected to be frequently added by users, but never modified.
The format of a feedback object ID is: "Feedback" + _ + name of resource + _ + current date

Creating ID's like so makes it easier to filter all of the feedback or tags associated with a particular resource purely by selecting documents that have an ID that starts with, for instance, the string "Tags_ExampleClinic" without actually searching the database.

### Search
For search, Shout uses PouchDB quick-search in order to filter data. 
