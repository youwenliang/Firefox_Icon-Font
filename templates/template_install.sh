#!/bin/bash

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function is_installed_by_brew {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  brew list 2>/dev/null | grep -w $1 >/dev/null || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules 2>/dev/null | grep -w $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

echo " "
echo " "
echo "Check if Homebrew installed"
if [ $(program_is_installed brew) == 1 ]; then
  echo "Homebrew installed"
else
  echo "Homebrew not installed... Install it..."
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

echo " "
echo " "
echo "Check if Nodejs installed"
if [ $(program_is_installed node) == 1 ]; then
  echo "Nodejs installed"
else
  echo "Nodejs not installed... Install it..."
  brew install node
fi

echo " "
echo " "
echo "Check if grunt installed"
if [ $(program_is_installed grunt) == 1 ]; then
  echo "grunt installed"
else
  echo "grunt not installed... Install it..."
  npm install -g grunt-cli
fi

echo " "
echo " "
echo "Check if ttfautohint installed"
if [ $(is_installed_by_brew ttfautohint) == 1 ]; then
  echo "ttfautohint installed"
else
  echo "ttfautohint not installed... Install it..."
  brew install ttfautohint --with-python
fi

echo " "
echo " "
echo "Check if fontforge installed"
if [ $(is_installed_by_brew fontforge) == 1 ]; then
  echo "fontforge installed"
else
  echo "fontforge not installed... Install it..."
  brew install fontforge --with-python
fi

echo " "
echo " "
echo "Execute >>> npm install"
cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install

printf "\e[32m" # Set green color
echo " "
echo " "
echo "Installation finished. Please close the terminal window"
echo -e "\033[0m" # Reset color
