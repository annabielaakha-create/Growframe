/**
 * All site content lives here so copy and media can be swapped
 * without touching a single component.
 *
 * Portfolio media was generated with Artlist (Seedream 5.0 stills,
 * Seedance 2.0 clips) and is served from Artlist's CDN.
 * To self-host: download each asset into /public/work/ and replace
 * the `src` value with e.g. '/work/my-file.jpg'.
 */

const img = (dir: string, id: string, sig: string) =>
  `https://ai-toolkit-generations.imgix.net/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__${dir}/-t-e-x-t_-t-o_-i-m-a-g-e-${id}.jpeg?auto=format%2Ccompress&cs=srgb&w=720&fit=max&s=${sig}`

const vid = (dir: string, id: string, expires: string, sig: string) =>
  `https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-v-i-d-e-o-v1/media__${dir}/-t-e-x-t_-t-o_-v-i-d-e-o-${id}.mp4?Expires=${expires}&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=${sig}`

const poster = (id: string) =>
  `https://cms-toolkit-public-artifacts.artlist.io/content/video/video-thumbnails/generated-thumbnail-${id}.jpg`

/* ------------------------------------------------------------------ */
/*  Glass icons                                                        */
/*  Rendered on pure black — CSS `mix-blend-mode: screen` drops the    */
/*  background so they float over any dark surface.                    */
/* ------------------------------------------------------------------ */

export const icons = {
  clapper: img('9', 'ac83d1bc-7930-4a80-9a86-0621e15fd97e', '3df2cc1a1f87fcbb15dc625dbfa79601'),
  gem: img('5', '5e538a48-f41a-4de9-99bc-18b7a6a7ff83', 'fe7242a3c98fc55f43967424c890758a'),
  camera: img('3', '4e802224-4d3b-4e47-9191-f1bdb15d174a', '8baba100c7936fbf444ec18536ce073a'),
  lens: img('10', 'c7fa3ef9-9841-4f84-940f-ea42e66cea43', 'e9fff198d4f217a59be800510ec31712'),
  mic: img('8', '8652eeb8-36b0-4433-9177-a5cfca0e3d48', '3fdbf76009d8c5b0f7c19462f9b87c83'),
  avatar: img('2', '75935635-7055-423c-84cd-37606948b3e4', 'df8fae82b86d831f20311219e5404757'),
  cursor: img('10', '9aded487-c807-4cca-83b9-8da902d7ad43', 'ba34f0439b040b2af92cdd02c5b4e2b4'),
  nib: img('9', '945e5741-ca10-48b9-af12-5ef9c62ea579', '87eec36e88390d6edce9a16d9417e564'),
  key: img('9', 'dcc08038-51b1-41f1-bd9e-155d31abf4bc', '7ee7c241cbba66f04d69c50e648d74e9'),
  rocket: img('5', 'bdd1e496-4313-4981-b87d-d65c27a2daed', 'd1505fb02b3651d5010359917290dc2a'),
} as const

export type IconName = keyof typeof icons

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export const services = [
  {
    n: '01',
    slug: 'ai-influencer',
    icon: 'avatar' as const,
    title: 'AI Influencer Creation',
    tagline: 'A face for your brand that never needs a call sheet.',
    body: 'We build photoreal brand ambassadors with locked identity across every frame — same face, same wardrobe logic, same energy, campaign after campaign. Cast once, publish forever.',
    points: ['Character identity lock', 'Wardrobe & scene systems', 'Always-on content'],
    industries: 'Fashion · Beauty · Lifestyle',
  },
  {
    n: '02',
    slug: 'talking-head',
    icon: 'mic' as const,
    title: 'AI Talking Head Videos',
    tagline: 'Your message, on camera, without the camera.',
    body: 'Founder updates, product explainers and course modules delivered as polished talking-head video — natural delivery, broadcast lighting, kinetic captions, endless variations from one script.',
    points: ['Script to screen', 'Multi-language versions', 'Kinetic captions'],
    industries: 'SaaS · Education · Corporate',
  },
  {
    n: '03',
    slug: 'product-photography',
    icon: 'camera' as const,
    title: 'AI Product Photography',
    tagline: 'Studio-grade stills without a studio day.',
    body: 'Hero shots, campaign key art and endless variations — hard light, wet stone, floating compositions. Real material response on glass, metal, fabric and liquid, at commercial resolution.',
    points: ['Hero & campaign stills', 'Infinite backdrops', 'Retail-ready output'],
    industries: 'Skincare · Tech · Automotive · Luxury',
  },
  {
    n: '04',
    slug: 'product-video',
    icon: 'lens' as const,
    title: 'AI Product Videography',
    tagline: 'Motion that makes people want it.',
    body: 'Macro pours, liquid ribbons, orbiting hero shots and light-streak reveals. The kind of product film that used to need a motion-control rig and a five-figure budget.',
    points: ['Macro & high-speed looks', 'Orbit & reveal moves', 'Loop-ready cuts'],
    industries: 'Beverage · Cosmetics · Automotive',
  },
  {
    n: '05',
    slug: 'video-editing',
    icon: 'clapper' as const,
    title: 'Video Editing',
    tagline: 'The craft layer on everything we ship.',
    body: 'Story-first cuts, colour grading, sound design and platform-native versioning. A senior editor owns your brand; AI handles the grunt work so taste decisions stay human.',
    points: ['Grade & finish', 'Sound design', 'Native versioning'],
    industries: 'Every brand we work with',
  },
  {
    n: '06',
    slug: 'visual-art',
    icon: 'gem' as const,
    title: 'AI Visual Art',
    tagline: 'Art direction that stops the scroll.',
    body: 'Liquid glass, chrome, particles and impossible environments — original art built to your palette, for campaign key visuals, album covers, launch teasers and brand worlds.',
    points: ['Key visuals', 'Brand worlds', 'Editorial art direction'],
    industries: 'Music · Fashion · Tech launches',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Portfolio                                                          */
/* ------------------------------------------------------------------ */

export const categories = [
  'All',
  'AI Influencer',
  'Talking Head',
  'Product Photography',
  'Product Video',
  'Video Editing',
  'Visual Art',
] as const

export type Category = Exclude<(typeof categories)[number], 'All'>

export type Project = {
  id: string
  title: string
  client: string
  category: Category
  industry: string
  format: 'Video' | 'Image'
  src: string
  poster?: string
  meta: string
  featured?: boolean
  /** Featured project — pinned above everything else on the portfolio. */
  best?: boolean
}

export const projects: Project[] = [
  /* ================================================================
     FEATURED — Roxy Daytona, pinned to the top of the portfolio
     ================================================================ */
  {
    id: 'roxy-daytona-cafe',
    title: 'Roxy Daytona — Café Act',
    client: 'Roxy Daytona',
    category: 'AI Influencer',
    industry: 'Fashion & Lifestyle',
    format: 'Video',
    src: '/work/roxy-walk.mp4',
    poster: '/work/roxy-walk.jpg',
    meta: 'Live-photo motion · 8s',
    featured: true,
    best: true,
  },
  {
    id: 'roxy-daytona-doorway',
    title: 'Roxy Daytona — Rue Saint',
    client: 'Roxy Daytona',
    category: 'AI Influencer',
    industry: 'Fashion & Lifestyle',
    format: 'Image',
    src: '/work/roxy-01.webp',
    meta: 'Parisian street editorial',
    featured: true,
    best: true,
  },
  {
    id: 'roxy-daytona-second-look',
    title: 'Roxy Daytona — Second Look',
    client: 'Roxy Daytona',
    category: 'AI Influencer',
    industry: 'Fashion & Lifestyle',
    format: 'Image',
    src: '/work/roxy-02.webp',
    meta: 'Identity-locked companion frame',
    featured: true,
    best: true,
  },

  /* ---------- AI Influencer ---------- */
  {
    id: 'nocturne-nightshift',
    title: 'Nocturne — Night Shift',
    client: 'Nocturne Beauty',
    category: 'AI Influencer',
    industry: 'Beauty',
    format: 'Image',
    src: img('8', 'c3e5ade3-1757-4468-bd1a-be2c524827e1', '25480cb9b7f23c6d73af2a26b8cbacd2'),
    meta: 'Virtual ambassador · city series',
    featured: true,
  },
  {
    id: 'kai-lookbook',
    title: 'Kai — SS Lookbook',
    client: 'Halcyon Studio',
    category: 'AI Influencer',
    industry: 'Fashion',
    format: 'Image',
    src: img('4', 'e8d6de26-ca11-4c8b-84b0-10eb3633a4b2', '9de9e5298306f7b65cbcaec30a3a5244'),
    meta: 'Digital model · studio campaign',
  },
  {
    id: 'sana-routine',
    title: 'Sana — Morning Routine',
    client: 'Lumen Skincare',
    category: 'AI Influencer',
    industry: 'Skincare',
    format: 'Image',
    src: img('7', 'd92136e4-32d3-4a67-a6f5-907cd26b49f8', '00e3263c18380b043b41a258a874c0b0'),
    meta: 'UGC-style creator content',
  },
  {
    id: 'ugc-serum-selfie',
    title: 'Glow Drops — UGC Cut',
    client: 'Lumen Skincare',
    category: 'AI Influencer',
    industry: 'Skincare',
    format: 'Video',
    src: vid(
      '9',
      '70281a15-bde5-4469-96c4-41dc39ea6c33',
      '2100346988',
      'XTe7lwC5HNBzTkU45X0owsyjL0QWxEzSyZHTxeqmy5k3KOU9rf4VLRvPK6quSGziMBsu91OafncCITp~DIwdRD7x8ZirL4cmWdexWr5h~tGnrZVLSBoIgal4rLrjoSqe3wOCD3SLXKjUxjhM4JIKrqPvi7IABcLIJvhM8zDGU6dguNOkS8QKvVhVmaBsYaZwQLe0ipViP2aPUlmP3PIaTsbBbX7R3P-rA1uOEI-UC0ufbtrX5hJEzG7O6wudpJncxdfalMTKgNn8FvnH3LPV7bA9KKfPUCfCnmPPzTVEk5BeMIUsRX3ZQDKj7OgPLw2H9hOLk5XfCTfG17dE-Nbg1g__',
    ),
    poster: poster('f408d8f0-7e35-49fe-a71f-63d94c1080ae'),
    meta: 'Selfie UGC ad · 5s',
    featured: true,
  },
  {
    id: 'vela-concrete',
    title: 'Vela — Concrete Season',
    client: 'Marlow Atelier',
    category: 'AI Influencer',
    industry: 'Fashion',
    format: 'Image',
    src: img('5', '86d6dfee-ba2e-4112-8c0a-b1ecf521945f', '055aeecf70c3b145520bf2bc626c7a9e'),
    meta: 'Editorial campaign · outerwear',
    featured: true,
  },

  /* ---------- Talking Head ---------- */
  {
    id: 'founder-series',
    title: 'The Founder Series',
    client: 'Northline',
    category: 'Talking Head',
    industry: 'SaaS',
    format: 'Image',
    src: img('2', '1411898b-6323-4805-9340-c796db832ce7', 'f3f5a6259bf2455e46491d5ed1d78438'),
    meta: 'Weekly podcast-style episodes',
    featured: true,
  },
  {
    id: 'ugc-drink-kitchen',
    title: 'Volt — Kitchen Take',
    client: 'Volt Energy',
    category: 'Talking Head',
    industry: 'Food & Beverage',
    format: 'Video',
    src: vid(
      '3',
      'fd229c8b-4693-4afc-aeec-41211a201ded',
      '2100346998',
      'V1RQ3SuXC9mZVWxt3sQR9eJ8wYBa4tyFO2~7YjoeIJe~3rsiTDZL0NC700EPgLxMLeaVdSggrrMuN8A45IgEtIdYhQqYBAEy5lq6ldruKa8YZTm4MzhU7mqMHxw0xpVK3KmyH9Gwugm420iEQ-UbqZUmhKuzP4LRDudaXaA1xfRF5veD-C1R3bJJJ5PcMnXz6n83bIZBp8oBZPkxsDKnOnYCKexvPgsvwuLUfrZT~y2raNWgoDhIB2tIEiDJ5Z6sVZ99mlnemhZxX0UWyJeP8H3E7TeZjvsidvMGCGn1ryd7WYR0xevxeVd7Efv1jssIN9tyMRAWPSiOMVJB4Q1TbQ__',
    ),
    poster: poster('0d473301-75db-4c3c-ac73-7a9355a382d6'),
    meta: 'Creator UGC spot · 5s',
    featured: true,
  },
  {
    id: 'boardroom-brief',
    title: 'Boardroom Brief',
    client: 'Ondo Tech',
    category: 'Talking Head',
    industry: 'Corporate',
    format: 'Image',
    src: img('7', 'd1d2cf86-b246-49cf-8edf-3686a292f8f2', '0798c999400b1487ed8a1e4c97c25853'),
    meta: 'Investor update series',
  },
  {
    id: 'creator-desk',
    title: 'Creator Desk',
    client: 'The Makers Cut',
    category: 'Talking Head',
    industry: 'Education',
    format: 'Image',
    src: img('10', 'dda0e745-b75f-48b1-83ac-11931fc92b33', '28f910b9da250a50c98e526dbcd2f8fa'),
    meta: 'Course module library',
  },

  /* ---------- Product Photography ---------- */
  {
    id: 'serum-stone',
    title: 'Hydra Serum — Stone',
    client: 'Lumen Skincare',
    category: 'Product Photography',
    industry: 'Skincare',
    format: 'Image',
    src: img('4', '6468f381-de0b-4509-9580-0927676e6f25', 'b1e1a2796a830fb06a33d81dc596e03b'),
    meta: 'Hero still · wet set',
    featured: true,
  },
  {
    id: 'runner-levitate',
    title: 'Runner 02 — Levitate',
    client: 'Vessel Activewear',
    category: 'Product Photography',
    industry: 'Footwear',
    format: 'Image',
    src: img('6', 'e41b618f-9453-4658-ac77-23e232d8f2a1', '1dbd471fef8f5d4784d48ec6051cb5a3'),
    meta: 'Launch key visual',
  },
  {
    id: 'meridian-watch',
    title: 'Meridian — Steel',
    client: 'Marlow Estate',
    category: 'Product Photography',
    industry: 'Luxury',
    format: 'Image',
    src: img('8', '004c6124-80c4-4da8-924a-e1786ded5b3d', '4dd24b523336f04bbb5f767ed858861e'),
    meta: 'Hard-light macro',
  },
  {
    id: 'ev-studio',
    title: 'Aurora EV — Light Room',
    client: 'Aurora Motors',
    category: 'Product Photography',
    industry: 'Automotive',
    format: 'Image',
    src: img('6', '5f53c5c0-2b07-4ecd-a0cd-cef56efb153d', '754d20d98aa842473daa429211db1b20'),
    meta: 'Studio automotive campaign',
    featured: true,
  },
  {
    id: 'tech-plinth',
    title: 'Pulse — Plinth',
    client: 'Ondo Tech',
    category: 'Product Photography',
    industry: 'Technology',
    format: 'Image',
    src: img('2', 'f55230e4-54cc-4980-9168-b0169ed618ee', 'b9c30d52151fccc643a1973f84358dee'),
    meta: 'Product family still',
  },
  {
    id: 'crystal-fragrance',
    title: 'Solstice — Eau de Parfum',
    client: 'Solstice',
    category: 'Product Photography',
    industry: 'Luxury',
    format: 'Image',
    src: img('2', '98cd859f-156a-42b4-83b4-336f5c42da0a', '69896959de08d0910fce729788718f5a'),
    meta: 'Caustics & crystal study',
  },
  {
    id: 'verde-supplements',
    title: 'Verde — Daily Range',
    client: 'Verde Botanics',
    category: 'Product Photography',
    industry: 'Wellness',
    format: 'Image',
    src: img('10', '123304ce-640e-4aff-977b-8d26c8f166cc', '8ec8657187e8689a649314c5a547e904'),
    meta: 'Range still · hard sun',
  },

  /* ---------- Product Video ---------- */
  {
    id: 'aurora-light-run',
    title: 'Aurora EV — Light Run',
    client: 'Aurora Motors',
    category: 'Product Video',
    industry: 'Automotive',
    format: 'Video',
    src: vid(
      '9',
      '09d6d322-eb46-42d2-a644-2b2fc8523ea1',
      '2100345423',
      'RFPbJtIEibpg8xDyakxaMqIdztBNn36mq0uaYpduEOP9pQBjfIKgj~AiSZY9A31IhU~0T4fYCqu6zWYLNW5f~sZaZRK-6bCLDUmuYjI3CsXKlW7N1hRGHxaEm9bE6R79ZURZQEaSOrfCYXlXG9DJIz3J8LaA-hNwjRCh0GxyLr741SUCdc2tym6u22L4qxrC6nXO3vwvvz85HSBYMYo72lhSf1~dI7fqO7EXUmh1RgNDRSR1FckqFnjaRNspTu0kA0eEP3z6KHOZRYff2w3ayvIAE9l76HYdVYWsgaW883-giXY63rKE12gSGw1T2-DxbR-d6JjiBosjdn~Qrdm0-A__',
    ),
    poster: poster('e620210f-f1cd-4693-adda-e1077c5db466'),
    meta: 'Hero spot · 5s loop',
    featured: true,
  },
  {
    id: 'serum-drop',
    title: 'Hydra Serum — Drop',
    client: 'Lumen Skincare',
    category: 'Product Video',
    industry: 'Skincare',
    format: 'Video',
    src: vid(
      '3',
      '3e3d9b98-8c71-4e5f-9e3d-0f72e4efa926',
      '2100345431',
      'Vmoj0xEBRhZW9vGez5tbwI-RzvEuTqFGI7hnwtY4fXRDrkTOMR2xLYtLHFxQLh2ieOEhRFvM2nEDUkeIfE4Lcphbn0J-DyG37Htm28AKO6NQeOzf7SmydPSGAXAE7xQvOubkk3iFiVletmpVxL~dWZSIV2LdiU-cEwMU0defKw5BpWsbiF5Qw7unQ9-cT-u0BAOV9nuS~KiQXr1eGY~nMdN0tRTAOumwjzMWlb2y5Vt2oiHi71H-CE1Z8AqwKsOxnr5BM9BOfgD34G--oB-pJ~~aqnFfQ1F7AAxAEWxDJif~0wHjPa2p7YbJz8MTbcrF75GLpIkHsdFv-iju1lK~jg__',
    ),
    poster: poster('1df9f93f-b3ab-4abc-b0c4-586e12f553f8'),
    meta: 'Macro film · 5s',
  },
  {
    id: 'espresso-pour',
    title: 'Brew&Co — The Pour',
    client: 'Brew&Co Coffee',
    category: 'Product Video',
    industry: 'Food & Beverage',
    format: 'Image',
    src: img('1', '14c3ed41-ac9b-4e31-887a-a4ba85b058e1', 'd4d056b3a153fd02de6e01b0ecb9fa91'),
    meta: 'High-speed macro frame',
  },
  {
    id: 'cream-ribbons',
    title: 'Lumen — Ribbons',
    client: 'Lumen Skincare',
    category: 'Product Video',
    industry: 'Cosmetics',
    format: 'Image',
    src: img('1', '41afb099-8b55-4d99-ba8f-5e6b5f8d800e', '5cb68a6d2f1bdf615fb86eddd4687f0a'),
    meta: 'Liquid simulation sequence',
  },
  {
    id: 'gilded-hour',
    title: 'The Gilded Hour',
    client: 'Kite & Co',
    category: 'Product Video',
    industry: 'Food & Beverage',
    format: 'Image',
    src: img('9', '24f63d87-19b0-481f-8675-7b803f001fb9', '7586e17c8653eab4d06330a3e120cee7'),
    meta: 'Cocktail film · key frame',
  },

  /* ---------- Video Editing ---------- */
  {
    id: 'grade-suite',
    title: 'The Grade Suite',
    client: 'GrowFrame Studio',
    category: 'Video Editing',
    industry: 'Post-production',
    format: 'Image',
    src: img('6', '3a704540-7b53-4627-815a-d9aec1c7da15', '89c6d4400fc2b63f6e5444ce5818cc2c'),
    meta: 'Colour pipeline',
  },
  {
    id: 'set-day',
    title: 'Set Day — Halcyon',
    client: 'Halcyon Labs',
    category: 'Video Editing',
    industry: 'Brand Film',
    format: 'Image',
    src: img('7', 'f1d58e95-b74b-4520-af46-ab73f9dbc121', '7317ceb2663cb35e00dabb7ce516fe37'),
    meta: 'Production & post',
    featured: true,
  },
  {
    id: 'rain-grade',
    title: 'Night Drive — Grade Study',
    client: 'Aurora Motors',
    category: 'Video Editing',
    industry: 'Automotive',
    format: 'Image',
    src: img('9', '51c40f63-11cc-4ecc-9559-9101666189e4', 'defa76cdf5f101f3fc7826855ee49aab'),
    meta: 'Split-tone colour grade',
  },

  /* ---------- Visual Art ---------- */
  {
    id: 'liquid-glass',
    title: 'Liquid Glass — Stack',
    client: 'GrowFrame Labs',
    category: 'Visual Art',
    industry: 'Design',
    format: 'Image',
    src: img('6', '8ac0d978-f420-48da-afe4-438ea876d5cf', '4a29b87a526613ade6dd1770d2fe855b'),
    meta: 'Material study',
    featured: true,
  },
  {
    id: 'chrome-form',
    title: 'Chrome Form 04',
    client: 'Framecon',
    category: 'Visual Art',
    industry: 'Music',
    format: 'Image',
    src: img('6', '870ad1ae-378d-4313-ab57-798f0904132f', 'd91d2c00b240c940d04aac537482522f'),
    meta: 'Album key visual',
  },
  {
    id: 'still-water',
    title: 'Still Water',
    client: 'Solstice',
    category: 'Visual Art',
    industry: 'Fashion',
    format: 'Image',
    src: img('2', '03c0bf11-afee-4849-bfdb-559904eea486', '93f1aa959262d33091d5c7723c3d4732'),
    meta: 'Campaign world-building',
  },
  {
    id: 'dissolve',
    title: 'Dissolve',
    client: 'Pulse Fitness',
    category: 'Visual Art',
    industry: 'Sport',
    format: 'Image',
    src: img('10', 'dee1d60e-56be-48f3-92fd-1b841c513806', '22357a1d75a9d7de0c7541ef3322123e'),
    meta: 'Generative motion poster',
  },
]

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const story = [
  'GrowFrame started with a frustration most brands know well. Good visual work took weeks and cost more than it should. Fast work looked cheap. There was nothing in between — no way to get cinema-grade craft on a content calendar that never stops.',
  'So we built the studio we wanted to hire. AI handles what machines are genuinely better at: generating variations, building impossible sets, iterating a concept forty times before lunch. Everything that decides whether a piece actually lands — the idea, the framing, the grade, the cut — stays with people who have spent years learning to make those calls.',
  'That combination changed the maths. A product launch that once meant a shoot day, a crew and a month of post now takes days. A brand ambassador who never needs a rebooking. Forty native cuts from one afternoon of footage. Same standard, a fraction of the friction.',
  'Today GrowFrame works as a subscription creative department for brands across skincare, fashion, technology, food and automotive — from founders shooting on a phone to teams publishing daily in several markets. The tools will keep changing. The standard doesn’t.',
]

export const values = [
  {
    n: '01',
    title: 'Creativity First',
    body: 'Technology is the brush, never the painting. Every project starts with an idea worth watching — the toolset is chosen afterwards, to serve it.',
  },
  {
    n: '02',
    title: 'Innovation Through AI',
    body: 'We adopt new models the week they land and test them properly. AI earns its place by removing hours of grunt work, not by replacing the judgement that makes work good.',
  },
  {
    n: '03',
    title: 'Quality Without Compromise',
    body: 'Nothing ships that we wouldn’t put in our own reel. If a frame reads as synthetic, cheap or off-brand, it gets remade — the deadline is not an excuse.',
  },
  {
    n: '04',
    title: 'Long-Term Partnerships',
    body: 'We’d rather grow with twenty brands for years than churn through two hundred. Knowing your audience, your voice and your numbers is what makes month six better than month one.',
  },
]

export const founder = {
  name: 'Annabil Aska Pratama',
  role: 'AI Visual Artist & Creative Director',
  image: '/team/annabil-circle.webp',
  bio: [
    'Annabil founded GrowFrame after more than five years in video editing, motion graphics and commercial advertising — the kind of background where you learn that a great idea still dies in a bad cut, and that clients remember how work made them feel long after they forget the brief.',
    'His practice sits where traditional craft meets generative tooling. He directs AI-produced visuals the way a DP directs a set: choosing the light, the lens, the moment, then finishing every frame by hand so nothing reads as machine-made. That discipline is what keeps GrowFrame’s output looking like premium brand work rather than AI output.',
    'As Creative Director he leads concept through delivery — writing the treatment, shaping the visual system, guiding the edit and reviewing the final grade. He works closest with founders and small brand teams who need the polish of a large agency and the speed of a single studio.',
  ],
  stats: [
    { value: '5+ yrs', label: 'Commercial creative direction' },
    { value: '120+', label: 'Brands served' },
    { value: '40M+', label: 'Views on delivered work' },
  ],
  skills: [
    'Creative Direction',
    'Video Editing',
    'Motion Graphics',
    'AI Visual Art',
    'Commercial Advertising',
    'Brand Storytelling',
  ],
}

/* ------------------------------------------------------------------ */
/*  Marketing content                                                  */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: '40M+', label: 'Views generated for clients' },
  { value: '48h', label: 'Average delivery per edit' },
  { value: '120+', label: 'Brands scaled on subscription' },
  { value: '4.9/5', label: 'Average client rating' },
]

export const process = [
  {
    step: 'Brief',
    title: 'You send the raw material',
    body: 'Footage, a Loom, a half-formed idea. Drop it in the queue any time — no meetings required to start.',
  },
  {
    step: 'Build',
    title: 'We direct, edit and design',
    body: 'A senior editor owns your brand. AI accelerates the grunt work; humans make every taste-level decision.',
  },
  {
    step: 'Review',
    title: 'One link, timestamped notes',
    body: 'Comment straight on the frame. Revisions are unlimited and usually land the same working day.',
  },
  {
    step: 'Grow',
    title: 'Ship, measure, repeat',
    body: 'We track what performs and feed it back into the next batch. The library compounds month over month.',
  },
]

export const testimonials = [
  {
    quote:
      'Working with GrowFrame is the ultimate peace of mind. The quality, the speed, the way they treat our brand like their own — it’s rare to find a team this creative and this reliable.',
    person: 'Amelia Hart',
    role: 'Marketing Director, Northline',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    quote:
      'They turn a plain white wall into a cinematic scene. Every edit comes back better than the brief — and the AI workflow means we never wait more than two days.',
    person: 'Rafi Kurniawan',
    role: 'CEO, Atelier Nova',
    avatar: 'https://i.pravatar.cc/100?img=68',
  },
  {
    quote:
      'I’ve seen the rest, now I’m with the best. Every launch video they’ve cut for our stores has gone viral. The subscription paid for itself in the first month.',
    person: 'Sofia Marchetti',
    role: 'Owner, Brew&Co Retail',
    avatar: 'https://i.pravatar.cc/100?img=33',
  },
]

export const clients = [
  'Northline',
  'Lumen',
  'Vessel',
  'Brew&Co',
  'Atelier Nova',
  'Framecon',
  'Makers Cut',
  'Halcyon Labs',
  'Verde Botanics',
  'Pulse Fitness',
  'Kite & Co',
  'Solstice',
  'Marlow Estate',
  'Ondo Tech',
  'Aurora Motors',
  'Nocturne Beauty',
]

export const plans = [
  {
    name: 'Growth',
    price: '$2,950',
    cadence: '/ month',
    blurb: 'A dependable monthly drumbeat of content for a growing brand.',
    features: [
      'Two active requests at a time',
      '12–18 deliverables per month',
      '48-hour average turnaround',
      'All six services included',
      'Dedicated senior editor + strategist',
      'Monthly performance review',
    ],
    cta: 'Start with Growth',
    featured: false,
  },
  {
    name: 'Scale',
    price: '$4,850',
    cadence: '/ month',
    blurb: 'Our most-chosen plan. A full creative department, always on.',
    features: [
      'Three active requests at a time',
      '25–35 deliverables per month',
      '24–48 hour turnaround',
      'Custom AI ambassador development',
      'Dedicated production pod',
      'Quarterly strategy sprint',
    ],
    cta: 'Start with Scale',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    blurb: 'Multi-market teams with bespoke volume, security and SLA needs.',
    features: [
      'Unlimited active requests',
      'Same-day priority lane',
      'On-location shoot days',
      'Dedicated account director',
      'Custom contracts & SLAs',
    ],
    cta: 'Talk to us',
    featured: false,
  },
]

/* ------------------------------------------------------------------ */
/*  Project brief form                                                 */
/* ------------------------------------------------------------------ */

export const briefServices = [
  'Video Editing',
  'AI Visual Artist',
  'AI Product Photography',
  'AI Product Videography',
  'AI Talking Head',
  'AI Influencer',
  'Motion Graphics',
  'Brand Identity',
  'Creative Direction',
  'Other',
] as const

export const briefPackages = ['Growth', 'Scale', 'Enterprise', 'Not Sure Yet'] as const

export const briefTimelines = ['ASAP', 'Within 1 week', 'Within 1 month', 'Flexible'] as const

export const briefChannels = ['Email', 'WhatsApp'] as const

export const faqs = [
  {
    q: 'What exactly does “unlimited” mean?',
    a: 'Add as many requests to your queue as you like. We deliver them one or two at a time depending on your plan, in the order you prioritise them. Most clients keep a rolling backlog of five to ten.',
  },
  {
    q: 'How fast is turnaround, really?',
    a: 'Most single deliverables land within 48 hours. Longer brand films are scoped up front — usually five to ten working days including revision rounds.',
  },
  {
    q: 'Is the work AI-generated or filmed?',
    a: 'Both, depending on the brief. Product stills, ambassadors and art direction are generated and hand-finished; your own footage gets edited, graded and versioned by a senior editor. Most clients mix the two.',
  },
  {
    q: 'Who owns the work?',
    a: 'You do. Full commercial rights transfer to you on delivery, including source files on request.',
  },
  {
    q: 'Can I pause or cancel?',
    a: 'Any time, from your dashboard. Pause for a month and pick up the same queue where you left it. No contracts, no exit fees.',
  },
]
