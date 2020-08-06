#!/bin/bash
git pull
git add -A
git commit -m "upload.sh $(date)"
git push origin master
