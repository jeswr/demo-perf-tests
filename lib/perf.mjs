import {
  generateDeepTaxonomy,
  getRdfs,
  getTimblAndFoaf,
} from 'deep-taxonomy-benchmark';
// @ts-expect-error
import { SwiplEye, queryOnce } from 'eyereasoner';
import { write } from 'eyereasoner/dist/n3Writer.temp.js';
import { incremental, quadsToFacts, rdfs } from 'hylar-core';
import { Parser, Reasoner } from 'n3';
import { RDFS_RULE, SUBCLASS_RULE } from './rules.mjs';

export async function deepTaxonomy(extended = false, depth) {
  if (process.env.N3) {
    for (let i = (depth ?? 1); i <= (depth ?? 6); i += 1) {
      const TITLE = `test-dl-${10 ** i}.n3`;
      const store = generateDeepTaxonomy(10 ** i, extended);

      setTimeout(() => { }, 100);

      console.time(`Reasoning: ${TITLE}`);
      new Reasoner(store).reason(SUBCLASS_RULE);
      console.timeEnd(`Reasoning: ${TITLE}`);
    }
  }

  if (process.env.EYE) {
    for (let i = (depth ?? 1); i <= (depth ?? 6); i += 1) {
      const TITLE = `test-dl-${10 ** i}.n3`;
      const store = generateDeepTaxonomy(10 ** i, extended);
      const storeArray = [...store];

      const store3 = write([...storeArray, ...(new Parser({ format: 'n3' })).parse('{ ?s a ?o . ?o <http://www.w3.org/2000/01/rdf-schema#subClassOf> ?o2 . } => { ?s a ?o2 . } .')]);
      const swipl = await SwiplEye({ print: (e) => { } });
      swipl.FS.writeFile('data.n3', store3);

      setTimeout(() => { }, 100);

      console.time(`Reasoning EYE JS: ${TITLE}`);
      await queryOnce(swipl, 'main', ['--nope', './data.n3', '--pass-only-new']);
      console.timeEnd(`Reasoning EYE JS: ${TITLE}`);
    }
  }

  if (process.env.HYLAR) {
    for (let i = (depth ?? 1); i <= (depth ?? 6); i += 1) {
      const TITLE = `test-dl-${10 ** i}.n3`;
      const store = generateDeepTaxonomy(10 ** i, extended);
      const storeArray = [...store];

      setTimeout(() => { }, 100);

      const store2 = quadsToFacts([...storeArray]);
      console.time(`Reasoning Hylar: ${TITLE}`);
      await incremental(store2, [], [], [], [rdfs[9]]);
      console.timeEnd(`Reasoning Hylar: ${TITLE}`);
    }
  }
}

export async function run() {
  const store = await getTimblAndFoaf();

  if (process.env.N3) {
    setTimeout(() => { }, 100);
    console.time('Reasoning');
    new Reasoner(store).reason(RDFS_RULE);
    console.timeEnd('Reasoning');
  }

  if (process.env.HYLAR) {
    const store2 = quadsToFacts([...await getTimblAndFoaf()]);

    setTimeout(() => { }, 100);

    console.time('Reasoning hylar');
    await incremental(store2, [], [], [], rdfs);
    console.timeEnd('Reasoning hylar');
  }

  if (process.env.EYE) {
    const store3 = write([...await getTimblAndFoaf(), ...await getRdfs()]);
    const swipl = await SwiplEye({ print: () => { } });
    swipl.FS.writeFile('data.n3', store3);

    setTimeout(() => { }, 100);

    console.time('Reasoning eyereasoner');
    await queryOnce(swipl, 'main', ['--nope', './data.n3', '--pass-only-new']);
    console.timeEnd('Reasoning eyereasoner');
  }
}

export const runAll = async () => {
  // Warmup
  for (let i = 0; i < 10; i += 1) {
    const store = await getTimblAndFoaf();
    new Reasoner(store).reason(RDFS_RULE);
  }

  console.log('Reasoning over TimBL profile and FOAF');
  await run();

  console.log(`\n[Extended: ${process.env.EXTENDED === true || process.env.EXTENDED === 'true'}] Running Deep Taxonomy Benchmark`);
  await deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true');
};
