# Periodic Table Of Monosaccharides

The original periodic table of monosaccharides was published by Dr. Richard D. Cummings in the journal [Glycobiology](https://doi.org/10.1093/glycob/cwad088). 

This repository contains the code for the dynamic periodic table of monosaccharides as hosted on [GlycoToolKit - Periodic Table of Monosaccharides](https://glycotoolkit.com/Tools/periodic-table-of-monosaccharides/).




## How it works

The application is built using JavaScript, D3.js, Bootstrap 5 and works in modern web browsers. The data for the monosaccharides is stored as a tsv file: `src > public > assets > monosaccharide-list.txt`. This file describes each monosaccharide's metadata and also contains the `x` and `y` coordinates for the tiles along with the `block` information. The app uses these coordinates and block information to position the tile within the table.


## Developer Guide

For development you must have node installed and a package manager. In this case we are using npm (node package manager) and thus the instructions are using npm. If you use some other package manager you may need to use different commands.

To run the app locally:
1. Clone this repository.
2. Go to the directory where the repository is cloned using a terminal (e.g. command prompt or shell) and run `npm install`.
3. Then run `npm run dev` to start the vite server which will give instructions on the localhost url where the table can be seen.

All the logic is in the `src > js` folder and specific parts of the logic are broken up into `modules`.


## Contributors

- [Akul Mehta](https://github.com/akulmehta)