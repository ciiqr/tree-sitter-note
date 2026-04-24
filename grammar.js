export default grammar({
  name: "note",
  rules: {
    source_file: ($) => repeat($.line),
    line: ($) => seq(/[^\n]*/, "\n"),
  },
});
