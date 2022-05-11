#! /usr/bin/bash
echo "Script on git beggings here"
git status
echo "Next line on script"
git add .
echo "I'm adding all file here"
git commit -m $1
echo "last line of script"
git push
echo "                         Done"
