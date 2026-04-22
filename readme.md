# tree-sitter note syntax by ciiqr

## setup
```bash
git config --local core.hookspath .hooks
mise trust --all
npm i
```

## update parser
```bash
tree-sitter generate
```

## test
```bash
tree-sitter generate && diff sample-parsed.txt <(tree-sitter parse sample.txt --grammar-path .)
```
