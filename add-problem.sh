#!/usr/bin/env bash

patternName="$1"
problemName="$2"
lang="${3:="ts"}"

test -z "$patternName" && echo "Please specify a pattern name" && exit 130
test -z "$problemName" && echo "Please specify a problem name" && exit 130

echo "Note: Languages can only be Python (py | python) or Typescript (ts | typescript)"
rootDir=$(dirname "$(realpath 0)")

echo "Creating directory and boilerplate files for $patternName/$problemName...."
targetDir="$rootDir/patterns/$patternName/$problemName"

test -d "$targetDir" || mkdir "$targetDir"
test -f "$targetDir/README.md" || touch "$targetDir/README.md"

case $lang in
ts | typescript)
	touch "$targetDir/solution.ts"
	;;
py | python)
	touch "$targetDir/solution.py"
	;;
*)
	echo -e "$lang is currently not supported"
	;;
esac

echo "Done"
