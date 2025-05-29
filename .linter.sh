#!/bin/bash
cd /home/kavia/workspace/code-generation/quizgenie-27303-f5979df7/quizgenie
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

