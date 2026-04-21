/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "note",

  rules: {
    source_file: ($) => repeat(choice($._line, $.code_block)),

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
    urgent:    () => token(prec(2, seq("!! ", /[^\n]*/))),

    // fallback to plain
    plain:     () => token(prec(1, /[^\n]+/)), // lower than everything else

    // code blocks
    code_block: ($) =>
      seq(
        $.code_fence_start,
        optional($.code_language),
        "\n",
        repeat(seq($.code_line, "\n")),
        $.code_fence_end,
        optional("\n"),
      ),
    code_fence_start: ($) => token(prec(2, "```")),
    code_language: () => /[^\n]+/,
    code_fence_end: () => token(prec(2, "```")),
    code_line: () => /[^\n]+/,
  },
});
