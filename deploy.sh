git init &&
git add . &&
git commit -m "更新" &&
git branch -M master &&
git remote add origin git@github.com:Huixies/react-demo.git &&
git push -f -u origin master &&
cd -
echo https://github.com/Huixies/react-demo/#/