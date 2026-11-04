/**
 * Seed script — deterministic, safe to run multiple times.
 * Run: npm run seed
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { SiteSchema } from '../sites/site.schema';
import { PersonSchema } from '../persons/person.schema';
import { VisitSchema } from '../visits/visit.schema';

const MONGO_URI = process.env.MONGODB_URI!;

// ─── Models ──────────────────────────────────────────────────────────────────
const Site = mongoose.model('Site', SiteSchema);
const Person = mongoose.model('Person', PersonSchema);
const Visit = mongoose.model('Visit', VisitSchema);

// ─── Seed Data ────────────────────────────────────────────────────────────────

const PERSONS = [
  { name: 'Lena' },
  { name: 'Tariq' },
  { name: 'Mira' },
  { name: 'Sven' },
  { name: 'Dao' },
];

const SITES = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool',
    author: 'Lena',
    body: `<h1>Tidepool</h1>
<p>Every morning I walk to the rocks at low tide and crouch over the pools left behind. Tiny crabs, anemones, snails the size of a thumbnail. A whole world that exists only because the ocean forgot it for a few hours.</p>
<p>I have been documenting them for three years. Not scientifically — I have no training — but faithfully. Same pools, same notebook, same hour.</p>
<p>If you want to read about the ocean's memory, visit <a href="deepcurrent.zz">deepcurrent.zz</a>. If you want something quieter, try <a href="mossandstone.zz">mossandstone.zz</a>.</p>`,
  },
  {
    address: 'deepcurrent.zz',
    title: 'Deep Current',
    author: 'Lena',
    body: `<h1>Deep Current</h1>
<p>The ocean moves in layers. At the surface, wind and weather. Below that, a slower current driven by temperature and salt. Deeper still, water that has not seen light in a thousand years.</p>
<p>I think about this when I am stuck on a problem. The answer is usually in the slow layer, not the surface.</p>
<p>Related: <a href="tidepool.zz">tidepool.zz</a> — where the ocean meets the land. Also worth reading: <a href="silentfreq.zz">silentfreq.zz</a> on signals we cannot hear.</p>`,
  },
  {
    address: 'mossandstone.zz',
    title: 'Moss and Stone',
    author: 'Tariq',
    body: `<h1>Moss and Stone</h1>
<p>Moss does not rush. It colonises rock over decades, millimetre by millimetre, dissolving stone with weak acids, building soil from nothing. Patience as a survival strategy.</p>
<p>I keep a small terrarium on my desk. I water it every Sunday. In two years it has grown perhaps a centimetre across the back wall of the glass. That is enough.</p>
<p>See also: <a href="tidepool.zz">tidepool.zz</a> for another slow world. And <a href="rootsystem.zz">rootsystem.zz</a> for what happens underground.</p>`,
  },
  {
    address: 'rootsystem.zz',
    title: 'Root System',
    author: 'Tariq',
    body: `<h1>Root System</h1>
<p>Trees in a forest are not competing. They are connected through fungal networks in the soil — trading sugars, sending chemical warnings, feeding stumps of long-felled neighbours.</p>
<p>A forest is a single organism that chose, for practical reasons, to wear many bodies.</p>
<p>Further reading: <a href="mossandstone.zz">mossandstone.zz</a> and <a href="coldlight.zz">coldlight.zz</a>.</p>`,
  },
  {
    address: 'silentfreq.zz',
    title: 'Silent Frequencies',
    author: 'Mira',
    body: `<h1>Silent Frequencies</h1>
<p>Elephants communicate in infrasound — frequencies below what humans can hear. They can send messages through the ground for kilometres, felt through the feet of other elephants.</p>
<p>We are surrounded by conversations we cannot perceive. This is either humbling or terrifying depending on the day.</p>
<p>Also on the subject of invisible things: <a href="deepcurrent.zz">deepcurrent.zz</a> and <a href="darkadapted.zz">darkadapted.zz</a>.</p>`,
  },
  {
    address: 'darkadapted.zz',
    title: 'Dark Adapted',
    author: 'Mira',
    body: `<h1>Dark Adapted</h1>
<p>It takes twenty minutes for your eyes to fully adjust to darkness. In that time the pupils dilate, rhodopsin builds up in the rod cells, sensitivity increases a thousandfold.</p>
<p>Most people never wait long enough. They step outside, see nothing, go back in. Patience is the only instrument required.</p>
<p>See: <a href="silentfreq.zz">silentfreq.zz</a> for other things that require waiting. And <a href="coldlight.zz">coldlight.zz</a> for the reward.</p>`,
  },
  {
    address: 'coldlight.zz',
    title: 'Cold Light',
    author: 'Sven',
    body: `<h1>Cold Light</h1>
<p>Bioluminescence produces light without heat. Fireflies, deep-sea fish, certain fungi. The chemistry is almost the same across species — luciferin and luciferase — which suggests it evolved many times independently, or once and spread.</p>
<p>I find the fungi most unsettling. A glowing log in a dark forest is not a comfortable sight.</p>
<p>Related: <a href="darkadapted.zz">darkadapted.zz</a> and <a href="rootsystem.zz">rootsystem.zz</a>.</p>`,
  },
  {
    address: 'pressurepoint.zz',
    title: 'Pressure Point',
    author: 'Sven',
    body: `<h1>Pressure Point</h1>
<p>At four kilometres depth the pressure is four hundred atmospheres. A human body would be crushed to the size of a fist. And yet things live there — not despite the pressure, but because of it. Their proteins are shaped to work only under compression.</p>
<p>Adaptation is not about tolerance. It is about redesign.</p>
<p>See also: <a href="deepcurrent.zz">deepcurrent.zz</a> and <a href="coldlight.zz">coldlight.zz</a>. If this made you uneasy, try <a href="mossandstone.zz">mossandstone.zz</a> instead.</p>`,
  },
  {
    address: 'inkandwax.zz',
    title: 'Ink and Wax',
    author: 'Dao',
    body: `<h1>Ink and Wax</h1>
<p>Medieval manuscripts were sealed with wax pressed by a ring. The ring was destroyed when its owner died, so no one could forge documents in their name. A security measure carved into the ritual of death.</p>
<p>I collect images of historical seals. Not the wax — those rarely survive — but the rings. Each one is a small portrait of how someone wanted to be known.</p>
<p>If you like old things: <a href="mossandstone.zz">mossandstone.zz</a>. If you like hidden signals: <a href="silentfreq.zz">silentfreq.zz</a>.</p>`,
  },
  {
    address: 'fieldnotes.zz',
    title: 'Field Notes',
    author: 'Dao',
    body: `<h1>Field Notes</h1>
<p>A field notebook should be ugly. Smudged, rained on, written in haste. A clean field notebook is evidence of someone who did not go outside.</p>
<p>I have kept one since I was eleven. The early ones are embarrassing. The recent ones are merely messy. Somewhere in between, something shifted — I stopped writing about what I saw and started writing about what I noticed.</p>
<p>Related: <a href="tidepool.zz">tidepool.zz</a> and <a href="inkandwax.zz">inkandwax.zz</a>. And <a href="ghost.zz">ghost.zz</a> — an address that leads nowhere.</p>`,
  },
];

// ─── History ─────────────────────────────────────────────────────────────────
// Deterministic browsing history — ~1 hour of trails across 5 people

function minsAgo(n: number): Date {
  return new Date(Date.now() - n * 60 * 1000);
}

const VISITS = [
  // Lena — long trail, nearly everywhere
  { personName: 'Lena', address: 'tidepool.zz',      via: 'typed',   visitedAt: minsAgo(120) },
  { personName: 'Lena', address: 'deepcurrent.zz',   via: 'link',    visitedAt: minsAgo(117) },
  { personName: 'Lena', address: 'silentfreq.zz',    via: 'link',    visitedAt: minsAgo(114) },
  { personName: 'Lena', address: 'darkadapted.zz',   via: 'link',    visitedAt: minsAgo(111) },
  { personName: 'Lena', address: 'coldlight.zz',     via: 'link',    visitedAt: minsAgo(108) },
  { personName: 'Lena', address: 'darkadapted.zz',   via: 'back',    visitedAt: minsAgo(106) },
  { personName: 'Lena', address: 'coldlight.zz',     via: 'forward', visitedAt: minsAgo(104) },
  { personName: 'Lena', address: 'rootsystem.zz',    via: 'link',    visitedAt: minsAgo(101) },
  { personName: 'Lena', address: 'mossandstone.zz',  via: 'link',    visitedAt: minsAgo(98)  },
  { personName: 'Lena', address: 'inkandwax.zz',     via: 'typed',   visitedAt: minsAgo(90)  },
  { personName: 'Lena', address: 'fieldnotes.zz',    via: 'link',    visitedAt: minsAgo(87)  },
  { personName: 'Lena', address: 'tidepool.zz',      via: 'history', visitedAt: minsAgo(80)  },
  { personName: 'Lena', address: 'pressurepoint.zz', via: 'typed',   visitedAt: minsAgo(70)  },

  // Tariq — medium trail with back/forward
  { personName: 'Tariq', address: 'mossandstone.zz', via: 'typed',   visitedAt: minsAgo(100) },
  { personName: 'Tariq', address: 'rootsystem.zz',   via: 'link',    visitedAt: minsAgo(97)  },
  { personName: 'Tariq', address: 'coldlight.zz',    via: 'link',    visitedAt: minsAgo(94)  },
  { personName: 'Tariq', address: 'rootsystem.zz',   via: 'back',    visitedAt: minsAgo(92)  },
  { personName: 'Tariq', address: 'coldlight.zz',    via: 'forward', visitedAt: minsAgo(90)  },
  { personName: 'Tariq', address: 'pressurepoint.zz',via: 'link',    visitedAt: minsAgo(87)  },
  { personName: 'Tariq', address: 'deepcurrent.zz',  via: 'link',    visitedAt: minsAgo(84)  },
  { personName: 'Tariq', address: 'fieldnotes.zz',   via: 'typed',   visitedAt: minsAgo(75)  },

  // Mira — search-driven browsing
  { personName: 'Mira', address: 'silentfreq.zz',    via: 'typed',   visitedAt: minsAgo(90)  },
  { personName: 'Mira', address: 'darkadapted.zz',   via: 'link',    visitedAt: minsAgo(87)  },
  { personName: 'Mira', address: 'coldlight.zz',     via: 'link',    visitedAt: minsAgo(84)  },
  { personName: 'Mira', address: 'darkadapted.zz',   via: 'back',    visitedAt: minsAgo(82)  },
  { personName: 'Mira', address: 'tidepool.zz',      via: 'typed',   visitedAt: minsAgo(75)  },
  { personName: 'Mira', address: 'inkandwax.zz',     via: 'typed',   visitedAt: minsAgo(60)  },

  // Sven — short trail
  { personName: 'Sven', address: 'coldlight.zz',     via: 'typed',   visitedAt: minsAgo(55)  },
  { personName: 'Sven', address: 'pressurepoint.zz', via: 'link',    visitedAt: minsAgo(52)  },
  { personName: 'Sven', address: 'deepcurrent.zz',   via: 'link',    visitedAt: minsAgo(49)  },
  { personName: 'Sven', address: 'rootsystem.zz',    via: 'link',    visitedAt: minsAgo(46)  },

  // Dao — wanderer, hits the ghost link
  { personName: 'Dao', address: 'fieldnotes.zz',     via: 'typed',   visitedAt: minsAgo(45)  },
  { personName: 'Dao', address: 'inkandwax.zz',      via: 'link',    visitedAt: minsAgo(42)  },
  { personName: 'Dao', address: 'ghost.zz',          via: 'link',    visitedAt: minsAgo(40)  }, // nowhere
  { personName: 'Dao', address: 'inkandwax.zz',      via: 'back',    visitedAt: minsAgo(39)  },
  { personName: 'Dao', address: 'mossandstone.zz',   via: 'link',    visitedAt: minsAgo(36)  },
  { personName: 'Dao', address: 'tidepool.zz',       via: 'link',    visitedAt: minsAgo(33)  },
  { personName: 'Dao', address: 'deepcurrent.zz',    via: 'link',    visitedAt: minsAgo(30)  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected.');

  // Upsert persons
  for (const p of PERSONS) {
    await Person.findOneAndUpdate({ name: p.name }, p, { upsert: true, returnDocument: 'after' });
  }
  console.log(`✓ ${PERSONS.length} persons seeded`);

  // Upsert sites (by address)
  for (const s of SITES) {
    await Site.findOneAndUpdate({ address: s.address }, s, { upsert: true, returnDocument: 'after' });
  }
  console.log(`✓ ${SITES.length} sites seeded`);

  // Clear old visits and re-insert (keeps history deterministic)
  await Visit.deleteMany({});
  await Visit.insertMany(VISITS);
  console.log(`✓ ${VISITS.length} visits seeded`);

  await mongoose.disconnect();
  console.log('Done. Database is ready.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
