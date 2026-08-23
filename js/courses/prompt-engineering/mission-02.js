/* M2 — THE MASK · ROLE / PERSONA (PERSONA INJECTION) */
export default {
  code: "M2", name: "THE MASK", skill: "ROLE / PERSONA",
  protocol: { name: "PERSONA INJECTION", desc: "A role is a lens: it biases the model toward an expert's vocabulary, priorities and rigor. Name the specialty, seniority and working style — not just 'be an expert'." },
  brief: {
    obj: "Legal review needed before signing the vendor contract 'NimbusOps MSA'. You need risk analysis good enough to walk into a negotiation with.",
    data: "DOCUMENT : NimbusOps Master Service Agreement\n§4.2  vendor may raise pricing with 15-day notice\n§7.1  liability capped at 3 months of fees paid\n§9.3  auto-renews unless cancelled 90 days prior\n§12   disputes settled in vendor's home jurisdiction",
    note: "Persona works like optics: <b>specialty + seniority + disposition</b> focus the output. 'Act as a lawyer' is a smudged lens; a named expertise is ground to prescription.",
    criteria: ["risks ranked", "clauses quoted", "redlines proposed"],
  },
  slots: [
    { id: "ROLE", label: "PERSONA", options: [
      { t: "Act as a brilliant, world-class expert with deep knowledge across law, business and technology, and a friendly, helpful personality.", q: 0, why: "Flattery is not a specialty. A lens that focuses on everything focuses on nothing." },
      { t: "Act as a helpful assistant.", q: 0, why: "Default persona: polite, shallow, zero domain lens." },
      { t: "Act as a lawyer.", q: 1, why: "Right field, no specialty — you'll get generalities, not contract insight." },
      { t: "Act as a senior contract attorney — 15 years negotiating SaaS vendor agreements — risk-averse and detail-obsessed.", q: 2, why: "Specialty + seniority + disposition. The lens is ground to prescription." },
    ]},
    { id: "DIR", label: "DIRECTIVE", options: [
      { t: "Review the contract from every possible angle and tell me everything you can find about it, including general considerations that might apply to agreements like this.", q: 0, why: "Unbounded scope invites an unsorted dump — volume dressed as thoroughness." },
      { t: "Tell me if this contract is good.", q: 0, why: "'Good' is undefined — an unanswerable question invites a shrug." },
      { t: "Summarize the risks in this contract.", q: 1, why: "Gets risks, but no ranking and no evidence — unusable in a negotiation." },
      { t: "List risks ranked by severity. Quote each clause number. Propose one redline per risk.", q: 2, why: "Ranked, cited, actionable — the shape of a deliverable, not a vibe." },
    ]},
  ],
  outcomes: {
    good: "RISK REVIEW — NimbusOps MSA\n\nHIGH · §7.1 — liability capped at 3 months of fees. Catastrophic for a data incident. Redline: cap at 12 months, carve-outs for confidentiality & IP.\nHIGH · §12 — disputes in vendor's home jurisdiction. Redline: neutral arbitration.\nMED  · §4.2 — price hikes on 15-day notice. Redline: 60 days + right to exit.\nMED  · §9.3 — 90-day auto-renew window. Redline: 30 days + renewal reminder.",
    mid: "This contract has some risky clauses. The liability is capped (§7.1) and they can change pricing (§4.2). You might want to negotiate those before signing.",
    bad: "Contracts are important legal documents! Generally speaking, you should read all terms carefully and consider consulting a professional. Let me know if you'd like help with anything else! 😊",
  },
};
