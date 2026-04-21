/**
 * @file note syntax by ciiqr
 * @author ciiqr
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "note",

  rules: {
    source_file: $ => repeat($._line),

    _line: $ =>
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

    comment:   $ => token(prec(2, seq(/[ \t]*/, '#' , /[^\n]*/, '\n'))),
    section:   $ => token(prec(2, seq(/[ \t]*/, '% ', /[^\n]*/, '\n'))),
    done:      $ => token(prec(2, seq(/[ \t]*/, 'x ', /[^\n]*/, '\n'))),
    todo:      $ => token(prec(2, seq(/[ \t]*/, '- ', /[^\n]*/, '\n'))),
    question:  $ => token(prec(2, seq(/[ \t]*/, '? ', /[^\n]*/, '\n'))),
    partial:   $ => token(prec(2, seq(/[ \t]*/, '~ ', /[^\n]*/, '\n'))),
    important: $ => token(prec(2, seq(/[ \t]*/, '! ', /[^\n]*/, '\n'))),
    urgent:    $ => token(prec(3, seq(/[ \t]*/, '!! ', /[^\n]*/, '\n'))),

    plain:     $ => token(prec(1, seq(/[ \t]*/, /[^\n]+/, '\n'))), // lower than everything else
  }
});
