#!/usr/bin/env bash

patternName="$1"
rootDir=$(dirname $(realpath 0))

echo "Creating Directory and boilerplate files for ${patternName}...."

mkdir $rootDir/$patternName
touch $rootDir/$patternName/{README.md,index.ts,test.ts}

echo "Done"
