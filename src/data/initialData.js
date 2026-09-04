const img = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;
const urbanChaletAsset = (filename) => `${import.meta.env.BASE_URL}assets/urbanChalet/${filename}`;

export const initialData = {
  company: {
    name: "Advithiya",
    corporateName: "Advithiya Developers",
    tagline: "Thoughtfully built. Transparently delivered.",
    subtagline: "Creating thoughtfully designed residential and commercial communities in Bangalore.",
    phone: "+91 9886036366",
    phoneDisplay: "+91 98860 36366",
    email: "shwetha@Advithiyaa.com",
    address: "RC Heights, No. 5, 3rd Floor, 4th Cross, New BEL Road, RMV 2nd Stage, Bangalore - 560094",
    reraReg: "PRM/KA/RERA/1251/309/AG/190212/001205",
    grievanceContact: "Customer Support | Reach out to shwetha@Advithiyaa.com"
  },
  projects: [
    {
      id: "shreyas",
      name: "Advithiya Shreyas",
      tagline: "16 homes. One considered community.",
      subheadline: "Boutique communities. Everyday intelligence.",
      status: "Upcoming",
      statusBadgeStyle: "upcoming",
      type: "Residential",
      location: "Bangalore",
      locationSubtitle: "Bangalore",
      neighborhoodDescription: "Located in Bangalore with convenient access to established residential, employment and everyday-service corridors.",
      neighborhoodHighlights: [
        "Well connected to key North Bangalore corridors",
        "Access to established schools, healthcare and retail",
        "Detailed site location shared during a project enquiry"
      ],
      units: "16 Homes",
      floors: "4 Floors",
      typology: "2 & 3 BHK",
      specsTag: "16 Homes | 4 Floors | 2 & 3 BHK",
      landExtent: "0.42 Acres",
      carpetArea: "1,240 – 1,890 sq. ft.",
      reraNo: "PRM/KA/RERA/1251/309/PR/240826/006892",
      heroImage: img("shreyas_exterior.jpg"),
      interiorImage: img("shreyas_interior.jpg"),
      textureImage: img("material_texture.jpg"),
      description: "A boutique residential community designed around privacy, comfort and everyday functionality.",
      vision: "A considered collection of 16 homes across four levels, offering 2 and 3 BHK residences designed around privacy, comfort and everyday functionality.",
      pricing: "Pricing on request (Launching Soon)",
      pricingNote: "Verified project facts, approvals, and pricing basis will be published upon launch.",
      amenities: [
        { title: "Considered Privacy", desc: "Designed around acoustic separation, low resident density, and peaceful living." },
        { title: "Everyday Intelligence", desc: "Thoughtful space planning, natural daylight channeling, and cross-ventilation." },
        { title: "Quality Handover", desc: "Rigorous construction checkpoints and transparent documentation from ground up." }
      ],
      specifications: [
        { category: "Structure", detail: "RCC framed structure built to verified seismic standards and quality review checkpoints." },
        { category: "Flooring & Finishes", detail: "Carefully curated premium materials with attention to long-term durability." },
        { category: "Doors & Windows", detail: "Acoustically insulated window sections and precision timber door joinery." },
        { category: "Sanitary & Plumbing", detail: "Water-efficient branded fixtures and dual-plumbing infrastructure." }
      ],
      constructionLogs: [
        {
          date: "Q3 2026",
          milestone: "Project Planning & Internal Verification",
          description: "Micro-climate site analysis, structural engineering reviews, and RERA documentation completed.",
          image: img("shreyas_exterior.jpg")
        }
      ],
      lastUpdated: "September 2026"
    },
    {
      id: "urban-chalet",
      name: "Advithiya Urban Chalet",
      tagline: "Boutique design homes. Limited by design.",
      subheadline: "A boutique collection of 3 BHK homes across two towers, created for just 10 families.",
      status: "Ongoing",
      statusBadgeStyle: "ongoing",
      type: "Residential",
      location: "Hebbal Kempapura, Bengaluru",
      locationSubtitle: "Hebbal Kempapura, Bengaluru",
      fullAddress: "24, 14th Cross Road, Sonnappa Layout, H A Farm Post, Maruthi Layout, Hebbal Kempapura, Bengaluru, Karnataka 560024",
      mapUrl: "https://maps.app.goo.gl/2YNzNfXCYog362gY8?g_st=aw",
      mapEmbedUrl: "https://www.google.com/maps?q=Advithiya+Urban+Chalet,+24,+14th+Cross+Rd,+Sonnappa+Layout,+H+A+Farm+Post,+Maruthi+Layout,+Hebbal+Kempapura,+Bengaluru,+Karnataka+560024&output=embed",
      neighborhoodDescription: "Located in Hebbal Kempapura, with convenient access to North Bangalore's major employment, healthcare and transport corridors.",
      neighborhoodHighlights: [
        "Established residential neighborhood",
        "Convenient access to Bellary Road",
        "Close to healthcare, retail and employment hubs"
      ],
      units: "10 Families",
      floors: "5 Stories (2 Towers)",
      towers: "2 Towers",
      parking: "2 Parking Spaces per Apartment",
      typology: "3 BHK",
      specsTag: "2 Towers | 5 Stories | 10 Families | 2 Parking Spaces per Apartment",
      landExtent: "Boutique Enclave",
      carpetArea: "3 BHK Boutique Residences",
      reraNo: "PRM/KA/RERA/1251/309/PR/210515/004120",
      heroImage: img("urban_chalet.jpg"),
      interiorImage: img("hero_architecture.jpg"),
      textureImage: img("material_texture.jpg"),
      galleryImages: [
        { title: "Front Elevation", src: urbanChaletAsset("1_1 - Photo.jpg.jpeg") },
        { title: "Corner Perspective", src: urbanChaletAsset("1_6 - Photo.jpg.jpeg") },
        { title: "Balcony & Facade Detail", src: urbanChaletAsset("1_4 - Photo.jpg.jpeg") },
        { title: "Landscaped Arrival", src: urbanChaletAsset("1_2 - Photo.jpg.jpeg") }
      ],
      floorPlanPdf: urbanChaletAsset("URBAN CHALET_REVISED PLAN RENDERS (R2)_12.07.25.pdf"),
      floorPlanDownloadName: "Advithiya-Urban-Chalet-Floor-Plans.pdf",
      description: "A boutique collection of 3 BHK homes across two towers, created for just 10 families.",
      vision: "Boutique design homes limited by design. Featuring two towers across five stories with two parking spaces per apartment and elevator access in Hebbal Kempapura.",
      pricing: "Delivered & Occupied",
      pricingNote: "Successfully completed and handed over to 10 families.",
      amenities: [
        { title: "2 Towers & 5 Stories", desc: "Low-density architecture catering exclusively to 10 families." },
        { title: "2 Parking Spaces / Unit", desc: "Dedicated spacious parking allocations per apartment." },
        { title: "Elevator & Security", desc: "Modern vertical mobility and private gated community access." }
      ],
      specifications: [
        { category: "Location Context", detail: "Hebbal Kempapura, Bengaluru." },
        { category: "Configuration", detail: "3 BHK spacious residences across 2 towers." },
        { category: "Parking & Access", detail: "2 reserved car parking spaces per home, elevator infrastructure." }
      ],
      constructionLogs: [
        {
          date: "Completed & Delivered",
          milestone: "Handover to 10 Families",
          description: "All residences completed and handed over in Hebbal Kempapura, Bengaluru.",
          image: img("urban_chalet.jpg")
        }
      ],
      lastUpdated: "September 2026"
    }
  ],
  articles: [
    {
      id: "verify-rera-karnataka",
      title: "How do I verify a residential project's RERA registration in Karnataka?",
      category: "Project Verification",
      readTime: "5 min read",
      date: "August 2026",
      excerpt: "Step-by-step guidance on verifying approvals, promoter records, and sanctioned plans on the official Karnataka RERA portal.",
      content: `Verifying a residential project's RERA registration is the first and most critical step for any homebuyer in Karnataka.

1. **Locate the RERA Registration Number**: Every compliant real estate project must display a registration number format like PRM/KA/RERA/1251/309/PR/XXXXXX.
2. **Visit the Official Karnataka RERA Portal**: Navigate to rera.karnataka.gov.in. Always ensure you are on the government domain.
3. **Search for Project Records**: Under the 'Project Status' section, enter the registration number or project title.
4. **Inspect Sanctioned Drawings & Approvals**: Check approved floor plans, commencement certificates, land titles, and registered encumbrance certificates directly.
5. **Review Quarterly Progress Reports (QPR)**: Check whether the developer regularly files quarterly updates on construction and financial milestones.

At Advithiya, we believe in radical transparency: all project facts, RERA certificates, and verifiable documents are made directly accessible to our buyers.`
    },
    {
      id: "carpet-vs-builtup-area",
      title: "What is the difference between carpet area, built-up area and saleable area?",
      category: "Buying Guidance",
      readTime: "6 min read",
      date: "July 2026",
      excerpt: "Understanding usable floor space versus loading multipliers so you make fully informed homebuying decisions.",
      content: `Understanding real estate area terminologies ensures you know exactly how much usable space you are purchasing.

- **Carpet Area**: The net usable floor area of an apartment, measured from inner face of walls, excluding the area covered by external walls and service shafts. RERA mandates that all home sales and pricing must strictly be based on Carpet Area.
- **Built-Up Area**: Includes the carpet area plus the thickness of internal & external walls, along with private balconies and terraces.
- **Saleable Area (Super Built-Up Area)**: A commercial metric that adds a proportionate share of common areas (elevators, staircases, lobbies, amenities) to the built-up area.

**Advithiya Standard**: We believe in clear information with no unnecessary complexity. We provide verified carpet area measurements alongside room-by-room dimensions so you know exactly what you are receiving.`
    },
    {
      id: "booking-amount-checklist",
      title: "What should a buyer check before paying a booking amount?",
      category: "Legal & Due Diligence",
      readTime: "4 min read",
      date: "June 2026",
      excerpt: "Key legal, financial, and title checks to perform before signing or transferring initial deposits.",
      content: `Before paying any booking amount or token deposit for a home, review these crucial checkpoints:

1. **RERA Approved Bank Escrow Account**: Verify that payment cheques or transfers are made directly to the project's designated RERA Escrow Account, not a general developer account.
2. **Review Agreement for Sale Terms**: Request a standard draft of the Agreement for Sale to review handover timelines, force majeure clauses, and cancellation policies.
3. **Clear Title & Ownership Chain**: Ensure clear, unencumbered land title search report validated by an independent legal counsel.
4. **All Statutory Sanctions in Place**: Confirm building plan sanction from civic authorities (BBMP/BDA) and pollution/fire NOCs where required.

Advithiya provides transparent documentation and respectful guidance at every step of your home journey.`
    },
    {
      id: "boutique-apartment-living",
      title: "What makes a low-density or boutique apartment community different?",
      category: "Design & Living",
      readTime: "5 min read",
      date: "May 2026",
      excerpt: "Why discerning homeowners choose low-density communities with privacy, spaciousness, and thoughtful design.",
      content: `Urban living is evolving. More families are seeking low-density, boutique residential communities instead of overcrowded high-rise complexes.

- **Privacy & Quiet**: With fewer homes (like 10 to 16 families), daily living is calm, quiet, and private without crowded elevators or lobbies.
- **Higher Land Share (UDS)**: Low-density developments allocate a significantly higher undivided share of land to each homeowner.
- **Personalized Architectural Detailing**: Boutique scales enable higher attention to detail, quality materials, and bespoke space planning.
- **Efficient Living & Maintenance**: Without oversized, under-utilized amenities, maintenance costs remain sensible while community governance remains harmonious.`
    }
  ],
  leadership: [
    {
      name: "Advithiya Leadership Team",
      role: "Multidisciplinary Experience",
      bio: "More than 30 years of collective experience across project management, construction, procurement, land, legal, marketing and operations."
    },
    {
      name: "Project Management & Construction",
      role: "Engineering & Execution",
      bio: "Dedicated to disciplined site management, structural safety standards, and rigorous quality controls from planning to handover."
    },
    {
      name: "Design & Procurement",
      role: "Architectural & Materials",
      bio: "Focused on thoughtful space planning, durable material selections, and sustainable resource choices tailored for Bangalore."
    },
    {
      name: "Legal, Land & Customer Relations",
      role: "Transparency & Governance",
      bio: "Ensuring uncompromised title due diligence, RERA compliance, and clear, respectful customer communication."
    }
  ],
  charter: [
    {
      title: "We verify.",
      desc: "Project information is reviewed internally before publication."
    },
    {
      title: "We disclose.",
      desc: "Important information such as approvals, pricing basis, availability and timelines is presented with relevant dates and context."
    },
    {
      title: "We communicate.",
      desc: "Material changes are explained and project updates are maintained."
    },
    {
      title: "We respect your choice.",
      desc: "We collect only the information required to respond and respect communication preferences."
    },
    {
      title: "We provide a route forward.",
      desc: "Questions, complaints and escalations have a clear channel and accountable owner."
    }
  ],
  qualityPillars: [
    {
      title: "Design Reviews",
      summary: "Spaces considered around how people live.",
      detail: "Thorough planning and architectural evaluation before construction begins to ensure optimal light, ventilation, and space utilization."
    },
    {
      title: "Construction Controls",
      summary: "Attention to detail throughout the build phase.",
      detail: "On-site quality monitoring, structural integrity audits, and rigorous engineering checkpoints at every milestone."
    },
    {
      title: "Material Selection",
      summary: "Considered choices around resources and materials.",
      detail: "Selecting proven, high-grade materials that guarantee structural longevity, safety, and aesthetic timelessness."
    },
    {
      title: "Safety",
      summary: "Safety standards for workers, residents, and structural systems.",
      detail: "Adhering to strict safety protocols, structural codes, and site welfare practices."
    },
    {
      title: "Handover Quality",
      summary: "Precision checks before handing over keys.",
      detail: "Detailed pre-handover snagging and documentation review to ensure homes are delivered to committed standards."
    }
  ],
  standardsPillars: [
    {
      title: "Thoughtful Design",
      desc: "Spaces considered around how people live."
    },
    {
      title: "Quality",
      desc: "Attention to detail from planning through delivery."
    },
    {
      title: "Responsible Development",
      desc: "Considered choices around resources, materials and long-term community well-being."
    },
    {
      title: "Transparency",
      desc: "Clear information, respectful guidance and accountable delivery."
    }
  ],
  values: [
    {
      title: "Thoughtfulness",
      desc: "Consider the way spaces are experienced and used."
    },
    {
      title: "Integrity",
      desc: "Communicate clearly. Act with accountability."
    },
    {
      title: "Quality",
      desc: "Pay attention to the details that matter."
    },
    {
      title: "Transparency",
      desc: "Make relevant information clear and accessible."
    },
    {
      title: "Responsibility",
      desc: "Consider the long-term impact of development decisions."
    }
  ],
  visibleStandards: [
    {
      title: "Verified Project Facts",
      desc: "Key information with relevant dates and revisions."
    },
    {
      title: "Approvals & Documentation",
      desc: "Applicable RERA registration and approval information."
    },
    {
      title: "Construction Updates",
      desc: "Dated photographs, videos and milestone updates."
    },
    {
      title: "Current Pricing Information",
      desc: "Price basis, applicable charges and validity information where published."
    },
    {
      title: "Customer Support",
      desc: "Clear contact routes and escalation channels."
    }
  ]
};
