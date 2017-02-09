#!/bin/sh

FILE="jsonFolders.json"

echo -e '{\n' >> $FILE

for i in {1..50}
do
  echo -e '"''": "'C$i'",\n' >> $FILE
done


echo -e "}" >> $FILE
