#!/bin/bash
konsole -e bash -c "
git pull
git add -A
git commit -m \"upload.sh $(date)\"
git push origin master
echo -e \"\nappuie sur une touche pour quitter\"
read
"
