#!/bin/bash
konsole -e bash -c "
for file in documents/*/*; do mv -v "$file" "$(echo $file | sed 's/é/e/g')"; done
git pull
git add -A
git commit -m \"upload.sh $(date)\"
git push origin master
echo -e \"\nappuie sur une touche pour quitter\"
read
"
