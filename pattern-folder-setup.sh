#!/usr/bin/env bash

patternName="$1"
test -z $patternName && echo "Please specify a pattern name" && exit 130

rootDir=$(dirname $(realpath 0))
test -d $rootDir/patterns/$patternName && echo "Directory for $patternName already exists" && exit 1

echo "Creating Directory and boilerplate files for ${patternName}...."

mkdir $rootDir/patterns/$patternName
touch $rootDir/patterns/$patternName/pattern-info.md

echo "Done"
