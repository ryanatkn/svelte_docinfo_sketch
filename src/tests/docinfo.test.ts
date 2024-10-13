import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {format_file} from '@ryanatkn/gro/format_file.js';

import {parse_docinfo} from '../lib/docinfo.js';

// TODO extract to `@ryanatkn/zzz/test_helpers.ts`
const write_json = async (path: string, data: unknown): Promise<void> => {
	writeFileSync(path, await format_file(JSON.stringify(data), {parser: 'json'}), 'utf8');
};
// TODO schema parsing
const read_json = <T>(path: string): T | null => {
	const contents = readFileSync(path, 'utf8');
	try {
		return JSON.parse(contents);
	} catch (_err) {
		return null;
	}
};

// const update_expected = true; // TODO @many CLI arg

interface Test_Sample {
	name: string;
	only?: boolean;
}

const samples = readdirSync('./src/tests/samples').map((name) => ({
	name,
	// only: name === 'bindable_props',
	// only: name === 'exported_const',
	// only: name === 'exported_function',
	// only: name === 'full_props_literal_type'
	// only: name === 'full_props_reference_type',
	// only: name === 'generic_prop',
	// only: name === 'prop_comments_literal_type',
	// only: name === 'prop_comments_reference_type',
	// only: name === 'simple_prop',
}));

const run_sample_test = (sample: Test_Sample) => {
	const test_fn = sample.only ? test.only : test;

	test_fn('sample: ' + sample.name, async () => {
		const contents = readFileSync(`./src/tests/samples/${sample.name}/test.svelte`, 'utf8');

		const {docinfo, ast} = parse_docinfo(contents);

		await write_json(`./src/tests/samples/${sample.name}/ast.json`, ast);

		// TODO @many CLI arg
		// if (update_expected) await write_json(`./src/tests/samples/${sample.name}/expected.json`, docinfo); // prettier-ignore

		const expected = read_json(`./src/tests/samples/${sample.name}/expected.json`);

		assert.equal(docinfo, expected);
	});
};

for (const sample of samples) {
	run_sample_test(sample);
}

test.run();
