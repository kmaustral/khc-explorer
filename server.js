const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const KNOWLEDGE_BASE = `
=== KNOWLEDGE HOUSE FOR CRAFT — VALUE OF CRAFT DATABASE ===

VALUE DOMAINS:
Practical: Economic, Health, Psychological, Scientific, Social, Environmental
Symbolic: Aesthetic, Cultural, Historical, Creative, Spiritual
Ethical: Equity, Peace and justice, Migrant and refugee, Disaster recovery

--- CLAIMS ---

CLAIM: Craft improves well-being [Psychological]
Great satisfaction comes from mastery of a complex skill. Completing a craft project provides tangible achievement. Italy's San Patrignano program rehabilitates drug and alcohol addicts through craft labour — fine craftsmanship is essential to building self-esteem.
Articles: "4 Reasons Craft Is Good for Your Mental Health" (reduces anxiety, depression, loneliness); "Arts and Crafts Give Greater Life Satisfaction Than Work" (survey of 7,000); "Craft Psychology" (reduces stress); "The Healing Power of Bello" (SanPa program); "Lifting Depression - A Neuroscientist's Hands-On Approach" (brain resilience); "Craftsmanship names an enduring, basic human impulse" (long-term well-being from doing work well).

CLAIM: Craft helps recovery from trauma [Psychological + Disaster recovery]
Craft has positive effect on recovery from trauma including illness, disaster, war. Making reduces need for small talk; silence provides space for profound conversation. Making can be constructive experience that kindles hope.
Articles: "Common Threads Project" (story cloths in sewing circles for women affected by trauma); "PTSD How I Turned My Life Around on a Potter's Wheel" (veteran Craig Mealing); "Strathewen - The Letterbox Project" (bushfire victims made mosaic letterboxes); "Sashiko Gals Project" (recovery from Great East Japan Earthquake); "Use of Domestic Craft for Meaning-Making Post-Disaster" (Christchurch earthquake); "Things Needed Made" (Khiam detention camp prisoners made needle from orange stem); "Beading as a therapeutic activity in Ghana".

CLAIM: Craft plays an important role in prisons [Social]
Craft activity can play a useful role in rehabilitation of prisoners. It provides a sense of achievement and contribution to the outside world. Queen Azizah of Malaysia introduced weaving into Malaysian prisons as rehabilitation and support for a dying craft. In 2023, the Symphony of Love event celebrated prisoners' contribution to sustaining Malay cultural heritage.
Articles: "67 Blankets for Nelson Mandela Day" (knitting and crocheting blankets for social justice); "Queen thanks prisons dept for helping to revive royal pahang weave".
Related: "Things Needed Made" (Khiam detention camp prisoners crafting under trauma); "A box had been carved by an incarcerated person" (carved box focused attention of New Zealand Prime Minister).

CLAIM: Repetitive craft activity facilitates mindfulness which improves well-being [Psychological]
Repetitive craft processes such as spinning or carving offer mental relaxation, inducing flow state releasing norepinephrine and dopamine.
Articles: "Avid knitters describe health and well-being through occupation"; "Knitting Helps Tom Daley Switch Off"; "Spinning as Meditation"; "Evidence of the contribution of craft to occupational therapy".

CLAIM: Working with your hands stimulates mental development [Psychological]
Manipulating the material world by hand is key to mental development through life, especially childhood.
Articles: "Handwriting Activates Broader Brain Networks Than Typing"; "The Importance of Cursive Handwriting Over Typewriting" (EEG study); "Intelligent Hands - Why Making is a Skill for Life"; "The Benefits of Art and Craft for Children's Skill Development".

CLAIM: Craft humanises clinical settings [Health]
Presence of craft in clinical settings has positive effect on patient well-being.
Articles: "In Conversation With Frances Priest" (ceramic installation in hospital); "Slow TV in hospital waiting rooms"; "Parallel Practices - Craft and Medicine at Kings College Hospital".

CLAIM: Hand skills play a role in medical procedures [Health]
Craft skills important in surgery and production of equipment.
Articles: "What Can a Surgeon Learn From a Tailor"; "Craft skills are key to the making of medical prosthetics" (glass eye making); "I'm not a doctor, but I can sew a mask" (COVID).

CLAIM: Craft makes an important contribution to the economy [Economic]
International trade in arts/crafts: $35 billion (2015), $50 billion (2020), 70%+ from developing economies. Australia's crafts: $AU 19.2 billion gross value (2021). Germany's craft sector: 561 billion euros. Cultural industries provide 6.2% of all employment globally.
Articles: "Handwerk - Crafts and Trades in Germany"; "Study of the Crafts Sector in Canada - 2024" ($2.7b GDP, 30k jobs); "The value of craft skills to the future of making in Australia"; "UNESCO approach to crafts" (Morocco craft = 19% of GDP).

CLAIM: Craft is an enduring source of employment [Economic]
Locally based craft promises more long-term employment than global corporations.

CLAIM: Craft skills add value to other industries [Economic]
UK Craft Council: craft skills generate GBP 3.4 billion across industries. 75% of Bentley production line staff use craft skills.

CLAIM: Craft provides employment at a time of de-growth [Economic + Environmental]
As automation and AI replace workers, craft remains intrinsically humanistic. Italy: 500,000 artisans experiencing resurgence.
Articles: "Craft and degrowth - An exploration of craft-orientation as a mode of organizing production and consumption".

CLAIM: Craft alleviates poverty [Equity]
Vital source of income for local communities, especially rural areas.
Articles: "Paying the School Fees Bolga Baskets in Ghana"; "The Role of Crafts and Small Enterprises in Fighting Against Poverty and Hunger in Africa"; "Tharangini Studio" (employs disadvantaged).

CLAIM: Craft provides empowerment for women [Equity]
Craft often pays directly to female producers, granting independence. Flexible work complementing domestic responsibilities.
Articles: "Saheli Women" (Indian NGO); "Tackling Climate Change Through Craft Development - Rural Women in uPhongolo"; "The Question of Women and Craft, Pre- and Post Independence India"; "Weaving, Guardian of Identity" (Timorese women).

CLAIM: Craft encourages greater care of the environment [Environmental]
Craft promotes awareness of climate injustices. Glenn Adamson's case for fewer, better things.
Articles: "Craft at COP26"; "Fewer Better Things"; "Craft in the age of climate crisis - British Council".

CLAIM: Craft production is environmentally responsible [Environmental]
Craft practitioners tend to be small-scale, use locally sourced materials, employ less detrimental methods.
Articles: "Factors Influencing Pro-Environmental Behaviors in Craft Businesses"; "Piña weaving and climate change in Kalibo"; "Sustainable Crafts - Bibliometric Analysis".

CLAIM: Craft promotes local development [Environmental + Social + Economic]
Favours local materials and distribution to local markets, offering enduring employment and community pride.

CLAIM: Craft is a collective activity that forges trust and belonging [Social + Migrant]
Collective craft-making builds trust and belonging through open dialogue. Making together allows communication without frequent eye contact.
Articles: "Men's Sheds"; "Tapestry of home" (Hong Kong migrant weaving in London); "Community among Afghan refugees at the Silaiwali workshop"; "Creating sanctuary through beading - South Sudanese Elders group".

CLAIM: Craft provides a livelihood with dignity through market access [Migrant + Disaster recovery]
Displaced artisans bring specific cultural and craft skills, equipped to earn a livelihood when given market access.
Articles: "IKEA's Partnership with the Jordan River Foundation" (Syrian refugee women in Jordan); "When Afghan Refugee Weavers Meet Swedish Designers"; "Crafting displacement - Syrian artisans in Amman"; "Indego Africa's Basket Weaving, Rwanda and Ghana".

CLAIM: Craft provides a way of sustaining cultural attachments to home [Migrant]
Creating something tangible symbolising home allows active way of sustaining psychological attachment to roots.
Articles: "Tapestry of home"; "Weaving a Safety Net - How Embroidering Links Two Waves of Armenian Refugees"; "A Handwoven Textile Narrates a Karenni Refugee Woman's Journeys to Resettlement in Massachusetts".

CLAIM: Craft is a means to keep traditions alive and evolving in new environments [Migrant]
Displaced artisans rebuild connections through craft, enabling new creative transformations.
Articles: "Crafting displacement - Syrian artisans in Amman"; "In 'Hmong Capital,' Refugees' Stories Are Told in Tapestry"; "Afghan refugees continue their crafts in various forms".

CLAIM: Craft connects members of a cultural group in the diaspora [Cultural]
For those who have migrated, craft helps sustain culture in a foreign environment.
Articles: "What We Keep - A Single Mother's Escape from Laos"; "Three Dresses From Rafah Palestinian Culture Hangs by a Thread".

CLAIM: Craft strengthens relationships between members of a cultural group [Cultural]
Craft products play crucial roles in strengthening relationships — textiles and jewellery exchanged at weddings, gifts between elders and youth.
Articles: "Cherokee Craftspeople Are Stronger Together"; "Reviving an Ancient Lost Fabric"; "The Roma Artist Sewing a New History for Her People"; "Cambodian silk ikat".

CLAIM: Craft fosters the resilience of a minority cultural group [Cultural]
Craft fosters resilience when minority culture is not reflected in mainstream society.
Articles: "Cultural values - why Heritage Crafts is redefining craft" (Romani community UK); "Textiles Show History of Secret War in Laos" (Hmong story cloths); "The Story of the Keffiyeh Part Two".

CLAIM: Craft can foster cultural tolerance [Cultural]
Promotes cultural understanding and tolerance. Example: Bábbarra Women's Centre (Australia) and Tharangini Studio (Bangalore) collaboration.

CLAIM: Craft plays an important role in worship [Spiritual]
Making objects for worship is significant in many religions.
Articles: "Alchemy in Japanese traditional craft" (Shinto mirror polishing); "Sustaining Spaces of idol-crafting - Kumartuli, Kolkata" (Durga Puja); "Sacred Space - Geometric Patterns in Moroccan Art"; "The Great Stupa of Compassion" (Buddhist structure in Australian forest).

CLAIM: Craft gives meaning to life [Spiritual]
Craft has intrinsic value. A well-crafted object is made with enjoyment and pride.
Articles: "Albert Borgmann on focal things"; "Craftsmanship as Spiritual Practice" (Baha'i commitment to excellence as worship).

CLAIM: Craft sustains a connection to ancestors and traditional lands [Spiritual]
Cosmologies across millennia represent the universe as an act of divine craft.
Articles: "Maker Mythologies Classical Origin Stories"; "Spider Woman's Children - Navajo Weavers Today"; "The spiritual value of black ash baskets".

CLAIM: Craft beautifies our everyday life [Aesthetic]
Unlike fine arts limited to the gallery, craft brings creativity into everyday life. Japan's mingei folk craft movement celebrated the beauty of the humble utensil.

CLAIM: Handmade is beautiful [Aesthetic]
Handmade objects are more beautiful because they are unique. Slight imperfections give objects value.
Articles: "AI Will Make Human Art More Valuable"; "Imperfectionist Aesthetics in Art and Everyday Life"; "The Handmade Effect - What's Love Got to Do With It".

CLAIM: Craft is an established art form [Aesthetic]
Represented by large network of galleries, museums, festivals and prizes.
Articles: "2023 Cheongju International Craft Biennale" (300,000 visitors); "Victoria & Albert Museum" (2.3m objects); "Loewe Craft Prize".

CLAIM: Craft helps us understand the past [Historical]
Craft recounts the story of the world through materiality. We define civilisations by the materials — stone, bronze, iron — that were used.
Articles: "A history of the world in 100 objects"; "Stone Age Institute".

CLAIM: Craft attests to continuous human innovation [Historical]
Demonstrates human capacity to resolve problems, innovate and adapt.
Articles: "The ancient fabric that no one knows how to make" (Dhaka muslin).

CLAIM: Traditional craft skills play a critical role in maintaining historic buildings [Historical]
Articles: "Notre Dame - time to call in the French builders with medieval skills".

CLAIM: Makers are creative [Creative]
Through practical knowledge of materials, makers unlock new creative possibilities.
Articles: "Innovation through Craft – from policy to research to impact"; "Steve Jobs - A Great Idea Doesn't Always Translate Into a Great Product".

CLAIM: Craft skills can strengthen creativity in STEM [Creative + Scientific]
Nobel Prize winners are 15-25 times more likely to engage in arts and crafts as adults.
Articles: "Maths Craft New Zealand - An Unexpected Journey"; "The Art and Craft of Science".

CLAIM: There is craft in laboratory and other scientific work [Scientific]
Craft skills play important role in scientific activities. Computers originated from Jacquard weaving techniques.
Articles: "Glass Blower Crafts Intricate Creations for Cornell Scientists"; "That Time When Computer Memory Was Handwoven by Women"; "The Body of the Artisan".

CLAIM: The physical manipulation of materials can help solve an abstract problem [Scientific]
Watson created a cardboard model to develop the double helix model in 1953.
Articles: "Discovery of the double helix"; "Crafts and the Origins of Geometry".

CLAIM: Craft provides a peaceful means of championing justice [Peace and justice]
Craftivism champions a cause in an engaging, non-threatening way.
Articles: "The Protest Banner Library"; "Interweaving the Archive" (Chilean collective); "Why Estonian Volunteers Are Weaving Camouflage Nets for Ukrainian Soldiers".

CLAIM: Craft helps in recovery from war [Peace and justice]
After loss of infrastructure following violent conflict, craft can provide direct means of reconstruction.
Articles: "Trench Art The Art of War".

CLAIM: Locally handmade objects provide friendly expressions of cultural identity in international exchanges [Peace and justice]
Crafted items frequently exchanged at diplomatic levels. Cowichan sweaters gifted to British royals.

COUNTER-CLAIM: Craft is an instrument of power
Craft can promote exclusive nationalism. Counter: More cases where craft promotes peace than conflict.

COUNTER-CLAIM: Craft is just for rich people
High-end craft supports the sector. Counter: Hobby craft often sits outside commercial market; neighbourhood craft markets remain accessible.

--- WORLD CRAFT DICTIONARY ---

craft (English): In Old English, referred to knowledge for doing things — not a category of objects. From 19th century, meaning shifted to category of things. Author: Liliana Morais.

artesanato (Portuguese/Brazil): Negative connotation in Brazil because of Eurocentric art/craft separation — denotes amateur, low-skilled work often by women. Author: Liliana Morais.

kôgei 工藝 (Japanese): First used in Japan in 1873 as translation of "craft" for Vienna International Exhibition. Ideogram 工 embodies "skill" or "high level of technique". Pre-modern Japanese used media-specific terms. Author: Liliana Morais.

duodji (Sami, Norway): The artistic crafts form of Indigenous people of the European Arctic. Refers to the whole process — from idea to final product. A holistic circle of creation where nature and humans collaborate.

shilp शिल्प (Sanskrit/Hindi): The skill to design, make, create. The craftsman ("shilpi") has association with "vishwakarma" (divine creator). Author: Toolika Gupta.

sanāye'-e dastī صنایع دستی (Persian/Iranian): Merges "sanāye'" (skills/crafts) and "dastī" (handmade). In contrast with fine art which is autonomous (Kantian), craft is heteronomous — rules set by religion, local culture, market. Mentioned in poetry by Rumi. Author: Azadeh Nikouei.

jitda 짓다 (Korean): "To build" or "to craft" — the creative act of engaging in activities related to necessities of life: making clothes, cooking food, constructing houses, making medicine, making poetry, connecting relationships. Author: Jaeyoung Kang.

kaivinai கைவினை (Tamil): "kai" (hand) + "vinai" (action/profession). Found throughout ancient Tamil literature. Tamil Nadu's Kalaignar Kaivinai Thittam positions craft as a right based on individual skill — contrasts with India's caste-based Vishwakarma scheme. Author: Se Dhanapal.

sina'a صناعة and hirfa حرفة (Arabic): sina'a = the art of making/production; hirfa = trade or craft profession.

--- ABOUT KHC ---
Knowledge House for Craft is an independent association for those who create and maintain craft knowledge. Website: knowledgehouseforcraft.org. Activities include the Value of Craft project (15 domains, claims linked to articles), World Craft Dictionary, Reinventing the Wheel talk series, and Country Salon events.
`;

const SYSTEM_PROMPT = `You are the Knowledge House for Craft knowledge explorer. You have access to the KHC's Value of Craft database — claims about craft's value across 15 domains, each supported by references to articles and studies. You also have the World Craft Dictionary, documenting words for craft in different languages and cultures.

Help users navigate and understand this knowledge. When answering:
- Draw directly on the claims, article titles, and summaries in the knowledge base
- Cite specific article titles and claim names when relevant
- Be concise but substantive — 2-4 paragraphs is usually right
- If a question touches multiple domains, organise your answer by domain or theme
- Be honest if the knowledge base doesn't cover something
- Occasionally suggest related claims or articles the user might find interesting
- Do not make up articles or claims not in the database

Knowledge base:
${KNOWLEDGE_BASE}`;

app.post('/ask', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages
    });

    res.json({ content: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`KHC Explorer running on port ${PORT}`));
