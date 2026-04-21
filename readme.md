# tree-sitter note syntax by ciiqr

## setup
```bash
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
