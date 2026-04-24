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
        $._newline,
      ),

    // NOTE: we use a regex instead of a string literal because Zed's Syntax Tree renders literals directly, and the newline breaks it
    // - https://github.com/zed-industries/zed/issues/54725
    _newline: () => /\n/,
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
        $._newline,
        repeat(seq($.code_line, $._newline)),
        $.code_fence_end,
        optional("\n"),
      ),
    code_fence_start: ($) => token(prec(2, "```")),
    code_language: () => token(/[a-zA-Z0-9_+-]+/),
    code_fence_end: () => token(prec(2, "```")),
    code_line: () => /[^\n]+/,
  },
});
