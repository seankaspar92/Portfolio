# Portfolio v2.0 Launch Guide

## Deployment

The portfolio is a static HTML/CSS/JS site deployed through GitHub Pages.

Live target:
`https://seankaspar92.github.io/Portfolio/`

## Release checks before public promotion

1. Confirm all 11 public pages resolve: Home, AIOS, HOPS, AI Skills, EDGE, GOTS, Career Intelligence, Army, MBA, Evidence, and Resume.
2. Confirm `robots.txt` points to the live sitemap.
3. Confirm `sitemap.xml` contains all public pages, including HOPS and AI Skills.
4. Confirm the PDF and DOCX resume download links resolve.
5. Confirm GitHub, LinkedIn, and internal navigation links resolve.
6. Keep HOPS explicitly labeled as an independently developed synthetic portfolio prototype, not an employer or third-party product.
7. Keep MLB EDGE v0.2.2 labeled as the locally validated baseline and v0.3.0 as Candidate until the authentic local-data gate passes.
8. Keep NFL EDGE historical provenance claims bounded to the repository state and do not imply that provenance infrastructure is wired into live prediction generation when it is not.
9. Present only Active and Testing AI skills as governed capabilities. Planned external candidates remain lifecycle inventory, not demonstrated capability.
10. Run the repository QA workflow and resolve any claim-integrity, page-inventory, local-link, or evidence-boundary failure before setting `launch_ready` to true.

## Ongoing maintenance

Update the portfolio only after the authoritative project source changes. Public maturity follows evidence, not roadmap intent. When a project crosses a validation gate, update its case study, canonical public claims where applicable, manifest, sitemap if page inventory changes, README, and QA contract in the same release cycle.
