import {parse_docinfo} from '$lib/docinfo.js';
import some_component_contents from '$routes/+layout.svelte?raw';

// usage: `gro run src/tests/print_parsed.ts`

const parsed = parse_docinfo(some_component_contents);

console.log(`parsed`, JSON.stringify(parsed));
