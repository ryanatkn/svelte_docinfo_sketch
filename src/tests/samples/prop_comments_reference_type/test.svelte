<script lang="ts">
	interface Props {
		/**
		 * Some prop comment.
		 * @hi lol
		 */
		some_commented_prop: boolean;

		// some ignored comment
		some_prop_with_no_comment: boolean;

		/**
		 * Some comment with preserved newlines.
		 *
		 *
		 * preserved newline above
		 */
		some_comment_with_preserved_newlines: boolean;

		/**
		 * Some comment with 2 preserved newlines.
		 *
		 *
		 *
		 * 2 preserved newline above
		 */
		some_comment_with_two_preserved_newlines: boolean;

		/**
		 * Some comment with many preserved newlines.
		 *
		 *
		 *
		 * 2 preserved newlines above
		 *
		 *
		 *
		 *
		 *
		 * 4 preserved newlines above
		 */
		some_comment_with_many_preserved_newlines: boolean;

		/** Some doc comment on a single line */
		some_comment_on_a_single_line: boolean;

		/**
		 * Some comment followed by a `// comment` but not ignored.
		 */
		// doesnt matter
		still_has_comment: boolean;

		/**
		 * This is ignored.
		 */
		/**
		 * Uses closest jsdoc comment.
		 */
		uses_closest_comment: boolean;
	}

	const {
		some_commented_prop,
		some_prop_with_no_comment,
		some_comment_with_preserved_newlines,
		some_comment_with_two_preserved_newlines,
		some_comment_with_many_preserved_newlines,
		some_comment_on_a_single_line,
		still_has_comment,
		uses_closest_comment,
	}: Props = $props();

	// silence the errors
	some_commented_prop;
	some_prop_with_no_comment;
	some_comment_with_preserved_newlines;
	some_comment_with_two_preserved_newlines;
	some_comment_with_many_preserved_newlines;
	some_comment_on_a_single_line;
	still_has_comment;
	uses_closest_comment;
</script>
