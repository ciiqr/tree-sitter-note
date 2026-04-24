# note

note syntax by ciiqr

![sample](https://raw.githubusercontent.com/ciiqr/tree-sitter-note/main/images/sample.png)

## File extensions

-   `.txt` and `.todo` by default
-   other extensions can be configured in your `settings.json`:

```jsonc
{
    "file_types": {
        "Note": ["exp"],
    },
}
```

## Customize

### Font colors/styles

The defaults work best with Monokai / Dracula based themes, but can be customized for other themes in
`settings.json`

```jsonc
{
    "experimental.theme_overrides": {
        "syntax": {
            // #
            "note.comment": {
                "color": "#88846f",
            },
            // %
            "note.section": {
                "color": "#E6DB74",
            },
            // x
            "note.done": {
                "color": "#A6E22E",
            },
            // -
            "note.todo": {
                "color": "#FD971F",
            },
            // ?
            "note.question": {
                "color": "#66D9EF",
            },
            // ~
            "note.partial": {
                "color": "#66D9EF",
            },
            // !
            "note.important": {
                "color": "#F92672",
            },
            // !!
            "note.urgent": {
                "color": "#F92672",
                "font_weight": 700,
            },
            // the text of a line without the prefix
            // "note.raw_text": {
            //     "color": "#FFFFFF",
            // },
            // non-prefixed lines
            // "note.plain": {
            //     "color": "#DDDDDD",
            // },
        },
    },
}
```
