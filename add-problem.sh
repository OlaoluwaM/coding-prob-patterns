#!/usr/bin/env bash

patternName="$1"
problemName="$2"
rootDir=$(dirname "$(realpath 0)")

test -z "$patternName" && echo "Please specify a pattern name" && exit 130
test -z "$problemName" && echo "Please specify a problem name" && exit 130

echo "Creating directory and boilerplate files for $patternName/$problemName...."
targetDir="$rootDir/patterns/$patternName/$problemName"

test -d "$targetDir" || mkdir "$targetDir"
test -f "$targetDir/README.md" || touch "$targetDir/README.md"

touch "$targetDir/solution.ts"
touch "$targetDir/solution.py"

echo "Done"
