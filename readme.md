echo "# murals" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ng-rgb/murals.git
git push -u origin main

# to run
```
python3 -m http.server 8011
```