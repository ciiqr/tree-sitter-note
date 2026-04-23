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

    raw_text: () => /[^\n]+/,

    comment:   ($) => seq(token(prec(2, "#"  )), optional($.raw_text)),
    section:   ($) => seq(token(prec(2, "% " )), optional($.raw_text)),
    done:      ($) => seq(token(prec(2, "x " )), optional($.raw_text)),
    todo:      ($) => seq(token(prec(2, "- " )), optional($.raw_text)),
    question:  ($) => seq(token(prec(2, "? " )), optional($.raw_text)),
    partial:   ($) => seq(token(prec(2, "~ " )), optional($.raw_text)),
    important: ($) => seq(token(prec(2, "! " )), optional($.raw_text)),
    urgent:    ($) => seq(token(prec(2, "!! ")), optional($.raw_text)),

    // fallback to plain
    plain:     ($) => $.raw_text,

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
