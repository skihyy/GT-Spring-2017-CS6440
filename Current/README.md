
Near Care with Shout App

## Installation

* Using the following setting steps could avoid computer be full of unknown packages.
    * Install python, pip.
    * Install `virtualenv` by typing `pip install virtualenv`.
    * `cd Current`, create a new virtual Python environment by typing `virtualenv pyenvironment --no-site-packages` where `pyenvironment` is the name of all drivers. You can change to other names. But note, git ignore only contains **`pyenvironment`**.
    * Activate the virtual environment by typing `source pyenvironment/bin/activate`. To quit the current environment type `deactivate` or close current terminal.
    * Install node js virtual environment tool by typing `pip install nodeenv` under the activated virtual Python environment. Otherwise, the node js virtual environment tool will be installed in your system.
    * Similarly, using `nodeenv nodejsenv --node=6.9.0` to set up node js environment.
    * Similarly, using `source nodejsenv/bin/activate` for activation, `deactivate` or closing current terminal to quit environment.
    * Then you can go to `npm update` and `npm start` to start.

* After installation, the project has the following structure:

```
/Current      
   /pyenvironment       
   /node_modules      
   /nodejsenv  
   other files in the original shout  
/Old  
   / files in the previous solution of 6440
```

Updated by YH @ 031617.
