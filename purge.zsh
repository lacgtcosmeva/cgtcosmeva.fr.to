index=$(rg -o '^\.[\w|-]*' static/css/style.css)

while read class; do 
  class=$(echo $class | sed 's/\.//g')
  if ! rg -q $class index.html; then
    echo $class is ununsed
  fi
done <<< $index
