#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

echo " "
echo " "
echo "Execute grunt to convert svg to font icon"
grunt

printf "\e[32m" # Set green color
echo " "
echo " "
echo "Converting finished... "
echo "The font icons are saved in the fonts folder."
echo "Please open index.html to inpsect the font icons and close the termianl window"
echo -e "\033[0m" # Reset color