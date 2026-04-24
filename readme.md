# tree-sitter note syntax by ciiqr

![sample](https://raw.githubusercontent.com/ciiqr/tree-sitter-note/main/images/sample.png)

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
tree-sitter generate
diff sample-parsed.txt <(tree-sitter parse sample.txt --grammar-path .)
tree-sitter test
```

## dev
```bash
watchexec --watch grammar.js --shell sh --  'tree-sitter generate && tree-sitter parse sample.txt --grammar-path .'
```
