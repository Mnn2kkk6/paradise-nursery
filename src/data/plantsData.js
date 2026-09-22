/**
 * Store catalog, organized by department.
 * Each department is an array of { category, items }.
 * Each item: { name, price, image, description, info }
 * `info` is a short highlighted line — care instructions for plants/flowers,
 * or size/material/usage details for pots, supplies, and decor.
 */
const storeData = {
  plants: [
    {
      category: 'Air Purifying Plants',
      items: [
        { name: 'Snake Plant', price: 15, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Snake+Plant', description: 'A hardy, upright plant with stiff sword-like leaves. Tolerates low light and irregular watering, and is known for filtering indoor air.', info: 'Low to bright indirect light · Water every 2–3 weeks' },
        { name: 'Spider Plant', price: 12, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Spider+Plant', description: 'Arching green-and-white striped leaves that send out small plantlets on long stems. Easygoing and great for hanging baskets.', info: 'Bright indirect light · Water weekly' },
        { name: 'Peace Lily', price: 18, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Peace+Lily', description: 'Glossy dark green leaves and elegant white blooms. A classic air-purifying plant that tells you when it is thirsty by drooping slightly.', info: 'Medium, indirect light · Water weekly' },
        { name: 'Boston Fern', price: 14, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Boston+Fern', description: 'Lush, feathery fronds that bring a soft, jungle-like texture to any room. Loves humidity, ideal for bathrooms.', info: 'Indirect light, high humidity · Keep soil moist' },
        { name: 'Rubber Plant', price: 20, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Rubber+Plant', description: 'Bold, glossy oval leaves on a sturdy stem that grows into a striking indoor tree over time.', info: 'Bright indirect light · Water every 1–2 weeks' },
        { name: 'Areca Palm', price: 25, image: 'https://placehold.co/300x300/1f4d3a/ffffff?text=Areca+Palm', description: 'Feathery, arching fronds that add a breezy, tropical feel. One of the best natural humidifiers for indoor spaces.', info: 'Bright indirect light · Water weekly' },
      ],
    },
    {
      category: 'Aromatic Plants',
      items: [
        { name: 'Lavender', price: 10, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Lavender', description: 'Fragrant purple blooms with a calming scent, often used for relaxation and in homemade sachets.', info: 'Full sun · Water when soil is dry' },
        { name: 'Rosemary', price: 9, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Rosemary', description: 'A woody, fragrant herb with needle-like leaves, perfect on a sunny kitchen windowsill for cooking.', info: 'Full sun · Water sparingly' },
        { name: 'Mint', price: 7, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Mint', description: 'Fast-growing and refreshingly scented, great for teas and drinks. Best kept in its own pot as it spreads quickly.', info: 'Partial sun · Keep soil consistently moist' },
        { name: 'Jasmine', price: 16, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Jasmine', description: 'Delicate white flowers with a sweet evening fragrance, often trained to climb a small trellis.', info: 'Bright light · Water when top inch is dry' },
        { name: 'Lemon Balm', price: 8, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Lemon+Balm', description: 'A citrus-scented member of the mint family, popular for calming teas and as a natural insect deterrent.', info: 'Partial sun · Water regularly' },
        { name: 'Basil', price: 6, image: 'https://placehold.co/300x300/6b3fa0/ffffff?text=Basil', description: 'A kitchen staple with glossy, aromatic leaves used fresh in cooking. Pinch regularly to keep it bushy.', info: 'Full sun · Water when soil feels dry' },
      ],
    },
    {
      category: 'Succulents & Cacti',
      items: [
        { name: 'Aloe Vera', price: 11, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Aloe+Vera', description: 'Thick, spiky leaves filled with soothing gel, useful for minor skin care as well as being an easy houseplant.', info: 'Bright light · Water every 2–3 weeks' },
        { name: 'Echeveria', price: 13, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Echeveria', description: 'A rosette-shaped succulent with plump, colorful leaves that looks like a blooming flower.', info: 'Bright light · Water sparingly' },
        { name: 'Jade Plant', price: 15, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Jade+Plant', description: 'Thick, glossy oval leaves on branching stems. A long-lived, low-maintenance succulent often kept as a lucky charm.', info: 'Bright light · Water every 2 weeks' },
        { name: 'Barrel Cactus', price: 17, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Barrel+Cactus', description: 'A round, ribbed cactus covered in spines — striking, sculptural, and needs almost no attention.', info: 'Full sun · Water once a month' },
        { name: 'Zebra Haworthia', price: 12, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Zebra+Haworthia', description: 'Small pointed leaves striped with white bumps, resembling a tiny aloe. Great for desks and small spaces.', info: 'Bright indirect light · Water every 2–3 weeks' },
        { name: 'Ponytail Palm', price: 22, image: 'https://placehold.co/300x300/c07a3f/ffffff?text=Ponytail+Palm', description: 'A bulbous trunk topped with long, curly leaves. Actually a succulent, not a true palm, and very drought tolerant.', info: 'Bright light · Water every 3–4 weeks' },
      ],
    },
    {
      category: 'Flowering Plants',
      items: [
        { name: 'Orchid', price: 24, image: 'https://placehold.co/300x300/b5548c/ffffff?text=Orchid', description: 'Elegant, long-lasting blooms in graceful arching sprays. A striking centerpiece plant for any bright room.', info: 'Bright indirect light · Water weekly, let roots dry between' },
        { name: 'African Violet', price: 13, image: 'https://placehold.co/300x300/b5548c/ffffff?text=African+Violet', description: 'Fuzzy leaves and clusters of small purple flowers that bloom nearly year-round on a sunny windowsill.', info: 'Bright indirect light · Water from below' },
        { name: 'Anthurium', price: 19, image: 'https://placehold.co/300x300/b5548c/ffffff?text=Anthurium', description: 'Glossy heart-shaped flowers in vivid red or pink that last for weeks, paired with deep green foliage.', info: 'Bright indirect light · Water weekly' },
        { name: 'Begonia', price: 14, image: 'https://placehold.co/300x300/b5548c/ffffff?text=Begonia', description: 'Colorful, patterned leaves alongside delicate clusters of flowers — a versatile plant for shaded spots.', info: 'Partial shade · Water when topsoil is dry' },
        { name: 'Hibiscus', price: 21, image: 'https://placehold.co/300x300/b5548c/ffffff?text=Hibiscus', description: 'Large, showy trumpet-shaped blooms that open for a day at a time in a steady, tropical display.', info: 'Full sun · Water regularly' },
        { name: 'Kalanchoe', price: 10, image: 'https://placehold.co/300x300/b5548c/ffffff?text=Kalanchoe', description: 'Clusters of tiny, bright flowers sitting atop thick, scalloped leaves. Blooms for weeks with very little care.', info: 'Bright light · Water every 1–2 weeks' },
      ],
    },
    {
      category: 'Low-Light Plants',
      items: [
        { name: 'ZZ Plant', price: 20, image: 'https://placehold.co/300x300/2f5233/ffffff?text=ZZ+Plant', description: 'Waxy, dark green leaflets on upright stems. Extremely tolerant of neglect and low light — nearly impossible to kill.', info: 'Low to bright indirect light · Water every 2–3 weeks' },
        { name: 'Pothos', price: 9, image: 'https://placehold.co/300x300/2f5233/ffffff?text=Pothos', description: 'Trailing vines with heart-shaped leaves, perfect for shelves or hanging planters. Very forgiving for beginners.', info: 'Low to bright indirect light · Water when topsoil is dry' },
        { name: 'Philodendron', price: 16, image: 'https://placehold.co/300x300/2f5233/ffffff?text=Philodendron', description: 'Heart-shaped leaves on trailing or climbing stems, with a relaxed, lush look that fills a room quickly.', info: 'Low to medium light · Water weekly' },
        { name: 'Calathea', price: 18, image: 'https://placehold.co/300x300/2f5233/ffffff?text=Calathea', description: 'Boldly patterned leaves that fold up at night, earning it the nickname "prayer plant". Prefers shade and humidity.', info: 'Low to medium light, high humidity · Keep soil moist' },
        { name: 'Cast Iron Plant', price: 19, image: 'https://placehold.co/300x300/2f5233/ffffff?text=Cast+Iron+Plant', description: 'Dark, broad leaves that live up to the name — tolerant of low light, dry air, and irregular care.', info: 'Low light · Water every 2–3 weeks' },
        { name: 'Dracaena', price: 17, image: 'https://placehold.co/300x300/2f5233/ffffff?text=Dracaena', description: 'Long, narrow leaves on a slender trunk, growing into a sculptural small tree that thrives in dim corners.', info: 'Low to bright indirect light · Water every 1–2 weeks' },
      ],
    },
  ],

  flowers: [
    {
      category: 'Fresh Cut Flowers',
      items: [
        { name: 'Rose Bouquet', price: 30, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Rose+Bouquet', description: 'A classic dozen-rose bouquet in rich red, hand-tied and ready to gift or display.', info: '12 stems · Lasts about 1 week' },
        { name: 'Tulip Bouquet', price: 22, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Tulip+Bouquet', description: 'A cheerful bunch of seasonal tulips in mixed colors, bringing fresh spring energy indoors.', info: '10 stems · Lasts about 5–7 days' },
        { name: 'Sunflower Bunch', price: 18, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Sunflower+Bunch', description: 'Bright, bold sunflowers that bring instant warmth and sunshine to any room.', info: '5 stems · Lasts about 1 week' },
        { name: 'Lily Bouquet', price: 26, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Lily+Bouquet', description: 'Fragrant stargazer lilies with dramatic blooms, a striking centerpiece for any table.', info: '6 stems · Lasts about 1 week' },
        { name: 'Carnation Bouquet', price: 15, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Carnation+Bouquet', description: 'Long-lasting ruffled carnations in soft pastel tones, a budget-friendly way to brighten a space.', info: '12 stems · Lasts up to 2 weeks' },
        { name: 'Mixed Seasonal Bouquet', price: 28, image: 'https://placehold.co/300x300/e0567f/ffffff?text=Seasonal+Bouquet', description: "A hand-picked assortment of the season's freshest blooms, arranged by our florists.", info: 'Assorted stems · Lasts 5–7 days' },
      ],
    },
  ],

  pots: [
    {
      category: 'Plant Pots',
      items: [
        { name: 'Classic Terracotta Pot', price: 8, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Terracotta+Pot', description: 'A timeless unglazed clay pot that lets roots breathe — the classic choice for succulents and herbs.', info: '6-inch diameter · Includes drainage hole' },
        { name: 'Matte Ceramic Pot', price: 16, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Ceramic+Pot', description: 'A smooth, minimalist ceramic pot in a soft matte finish, perfect for modern interiors.', info: '7-inch diameter · Includes saucer' },
        { name: 'Woven Rattan Basket Pot', price: 19, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Rattan+Basket', description: 'A natural woven basket sleeve that dresses up a plastic nursery pot with warm, textured style.', info: 'Fits pots up to 8 inches · Handwoven rattan' },
        { name: 'Modern Concrete Pot', price: 22, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Concrete+Pot', description: 'A heavyweight concrete planter with clean geometric lines, ideal for structural plants like snake plants or palms.', info: '8-inch diameter · Drainage hole included' },
        { name: 'Self-Watering Pot', price: 25, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Self-Watering+Pot', description: 'A built-in reservoir slowly wicks water to the roots, perfect for busy plant owners or frequent travelers.', info: '8-inch diameter · 2-week water reservoir' },
        { name: 'Hanging Planter Pot', price: 14, image: 'https://placehold.co/300x300/8a5a3c/ffffff?text=Hanging+Planter', description: 'A lightweight pot with an attached hanging cord, great for trailing plants like pothos or string of pearls.', info: '5-inch diameter · Macrame cord included' },
      ],
    },
  ],

  supplies: [
    {
      category: 'Soil & Plant Care',
      items: [
        { name: 'All-Purpose Potting Mix', price: 12, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Potting+Mix', description: 'A well-balanced blend of soil, compost, and perlite suited to most houseplants.', info: '8-quart bag' },
        { name: 'Succulent & Cactus Mix', price: 10, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Cactus+Mix', description: 'A fast-draining mix formulated to prevent root rot in succulents and cacti.', info: '4-quart bag' },
        { name: 'Orchid Bark Mix', price: 11, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Orchid+Bark', description: 'Chunky bark blend that gives orchid roots the airflow they need to thrive.', info: '4-quart bag' },
        { name: 'Liquid Plant Fertilizer', price: 9, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Fertilizer', description: 'A gentle, balanced liquid fertilizer that feeds houseplants during regular watering.', info: '16 fl oz · Use every 2–4 weeks' },
        { name: 'Neem Oil Spray', price: 13, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Neem+Oil+Spray', description: 'A natural pest deterrent that keeps common houseplant pests like spider mites and aphids away.', info: '8 fl oz spray bottle' },
        { name: 'Watering Can', price: 17, image: 'https://placehold.co/300x300/3d7a6b/ffffff?text=Watering+Can', description: 'A slim-spout watering can that makes it easy to water precisely without spilling or overwatering.', info: '1.5-liter capacity' },
      ],
    },
  ],

  decor: [
    {
      category: 'Plant Decor & Accessories',
      items: [
        { name: 'Wooden Plant Stand', price: 28, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Plant+Stand', description: 'A mid-century style wooden stand that lifts your plant up to catch more light and adds visual height.', info: 'Fits pots up to 10 inches · 14 inches tall' },
        { name: 'Macrame Plant Hanger', price: 15, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Macrame+Hanger', description: 'A handwoven cotton macrame hanger for showcasing trailing plants from the ceiling or a hook.', info: 'Fits pots up to 6 inches · 40 inches long' },
        { name: 'Decorative Pebbles', price: 6, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Decorative+Pebbles', description: 'Smooth polished stones for topping soil, adding a clean finished look while helping retain moisture.', info: '1 lb bag · Mixed neutral tones' },
        { name: 'Moss Rock Accent', price: 9, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Moss+Rock', description: 'A preserved moss-covered accent stone that adds a naturalistic touch to any potted arrangement.', info: 'Approx. 4 inches wide' },
        { name: 'String Fairy Lights', price: 12, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Fairy+Lights', description: 'Warm white micro LED lights that wrap gently around leaves and stems for a cozy glow at night.', info: '10 feet · Battery powered' },
        { name: 'Wall-Mounted Planter', price: 20, image: 'https://placehold.co/300x300/9c7a3f/ffffff?text=Wall+Planter', description: 'A sleek wall-mounted vessel for displaying small plants as living wall art.', info: '5-inch diameter · Includes mounting hardware' },
      ],
    },
  ],
};

export default storeData;
