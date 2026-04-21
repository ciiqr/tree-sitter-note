/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "note",

  rules: {
    source_file: ($) => repeat($._line),

    _line: ($) =>
      seq(
        /[ \t]*/,
        choice(
          $.comment,
          $.section,
          $.done,
          $.todo,
          $.question,
          $.partial,
          $.important,
          $.urgent,
          $.plain,
        ),
        "\n",
      ),

    comment:   () => token(prec(2, seq("#"  , /[^\n]*/))),
    section:   () => token(prec(2, seq("% " , /[^\n]*/))),
    done:      () => token(prec(2, seq("x " , /[^\n]*/))),
    todo:      () => token(prec(2, seq("- " , /[^\n]*/))),
    question:  () => token(prec(2, seq("? " , /[^\n]*/))),
    partial:   () => token(prec(2, seq("~ " , /[^\n]*/))),
    important: () => token(prec(2, seq("! " , /[^\n]*/))),
    urgent:    () => token(prec(3, seq("!! ", /[^\n]*/))), // higher than !
    plain:     () => token(prec(1, /[^\n]+/)), // lower than everything else
  }
});
