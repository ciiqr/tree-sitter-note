; DOCS:
; - neovim: https://neovim.io/doc/user/treesitter/#treesitter-highlight-groups
; - zed: https://zed.dev/docs/extensions/languages
(comment)   @comment @note.comment
(section)   @string @note.section
(done)      @function @note.done
(todo)      @variable.parameter @note.todo
(question)  @constant @note.question
(partial)   @constant @note.partial
(important) @keyword @note.important
(urgent)    @invalid @note.urgent
; TODO: consider alternatives to @invalid (preference may be different per-editor)
; - @warning @markup.strong

; code block
(code_fence_start) @punctuation.delimiter
(code_fence_end)   @punctuation.delimiter
(code_language)    @label
(code_line)        @string
