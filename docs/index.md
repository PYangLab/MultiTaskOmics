---
template: home.html
hide:
  - navigation
  - toc
---

<div class="dc-home">

<!-- ━━━━━━━━ MAIN ━━━━━━━━ -->
<main style="max-width:1120px; margin:0 auto; padding:0 28px;">

<!-- HERO — asymmetric split (text + meta on the left, sphere on the right) -->
<section class="dc-hero-split" style="display:grid; grid-template-columns:1fr 1.05fr; gap:52px; align-items:center; padding:58px 0 48px;">
<div style="min-width:0;">
<div style="font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:var(--brand-600); margin-bottom:20px;">Single&#8209;cell method ecosystem</div>
<h1 style="font-family:'Newsreader','Charter',Georgia,serif; font-size:54px; line-height:1.03; font-weight:600; letter-spacing:-0.022em; margin:0 0 22px; color:var(--text); max-width:13ch; text-wrap:balance;">Multi&#8209;Task Omics</h1>
<p style="font-size:16.5px; line-height:1.62; color:var(--text-muted); margin:0 0 28px; max-width:46ch;">An ecosystem of methods for multimodal, multibatch multi&#8209;condition single&#8209;cell analysis.</p>
<div style="display:inline-block; background:var(--bg-subtle); border:1px solid var(--border); border-radius:8px; padding:12px 18px; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:14px; line-height:1.5; color:var(--text); white-space:nowrap; max-width:100%; overflow-x:auto;"><span style="color:var(--brand-600);">$</span> pip install m3&#8209;sc multibench&#8209;sc matilda&#8209;sc</div>
<div style="display:flex; align-items:center; gap:18px; margin-top:24px; flex-wrap:wrap;">
<a class="dc-metalink" href="https://github.com/PYangLab/MultiTaskOmics" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; color:var(--text-muted); text-decoration:none;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.32 9.32 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"></path></svg>GitHub</a>
<span style="width:1px; height:13px; background:var(--border);"></span>
<a class="dc-metalink" href="#references" style="font-size:13px; font-weight:500; color:var(--text-muted); text-decoration:none;">Read the papers ↗</a>
<span style="width:1px; height:13px; background:var(--border);"></span>
<span style="font-size:13px; color:var(--text-faint);">3 packages · 11 tasks</span>
</div>
</div>
<div style="position:relative;"><canvas id="taskSphere" aria-label="A slowly rotating globe: a shared Omics core connected to single-cell tasks across M3, scMultiBench and Matilda, with related tasks linked on the surface. Drag to spin; hover a task to highlight its connections." style="display:block; width:100%; height:520px; cursor:grab; touch-action:none;"></canvas></div>
</section>

<!-- PACKAGES -->
<section style="padding:6px 0 0;">
<div style="max-width:820px; margin:0 auto;">
<div style="font-family:'Newsreader','Charter',Georgia,serif; font-size:26px; font-weight:600; letter-spacing:-0.015em; color:var(--text); margin-bottom:22px;">Packages</div>
<div style="display:flex; flex-direction:column; gap:14px;">

<a class="dc-pkg" href="https://pyanglab.github.io/M3/" style="display:grid; grid-template-columns:auto 1fr; align-items:center; gap:20px; padding:18px 22px; border:1px solid var(--border); border-radius:14px; background:var(--bg-card); text-decoration:none; color:var(--text);">
<span style="display:inline-flex; align-items:center; justify-content:center; width:50px; height:50px; flex:0 0 auto;"><img src="assets/m3-mark.svg" alt="M3" width="50" height="50" style="display:block; width:50px; height:50px; object-fit:contain;"></span>
<span style="display:flex; flex-direction:column; min-width:0; gap:5px;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:20px; font-weight:600; line-height:1; color:var(--text);">M3</span>
<span style="font-size:13.5px; line-height:1.5; color:var(--text-muted);">Factorised, condition&#8209;aware embeddings — multimodal integration with patient&#8209;level inference.</span>
<span style="display:flex; flex-wrap:wrap; gap:6px; margin-top:3px;"><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Integration</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Patient prediction</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Attribution</span></span>
</span>
</a>

<a class="dc-pkg" href="https://dsichang.github.io/scMultiBench/" style="display:grid; grid-template-columns:auto 1fr; align-items:center; gap:20px; padding:18px 22px; border:1px solid var(--border); border-radius:14px; background:var(--bg-card); text-decoration:none; color:var(--text);">
<span style="display:inline-flex; align-items:center; justify-content:center; width:50px; height:50px; flex:0 0 auto;"><img src="assets/benchmark-logo-card.png" alt="scMultiBench" width="50" height="50" style="display:block; width:50px; height:50px; object-fit:contain;"></span>
<span style="display:flex; flex-direction:column; min-width:0; gap:5px;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:20px; font-weight:600; line-height:1; color:var(--text);">scMultiBench</span>
<span style="font-size:13.5px; line-height:1.5; color:var(--text-muted);">Run &amp; score 40+ integration methods with scIB metrics — rankings, bubble tables, an interactive explorer.</span>
<span style="display:flex; flex-wrap:wrap; gap:6px; margin-top:3px;"><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Integration</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Batch correction</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Benchmarking</span></span>
</span>
</a>

<a class="dc-pkg" href="https://pyanglab.github.io/Matilda/" style="display:grid; grid-template-columns:auto 1fr; align-items:center; gap:20px; padding:18px 22px; border:1px solid var(--border); border-radius:14px; background:var(--bg-card); text-decoration:none; color:var(--text);">
<span style="display:inline-flex; align-items:center; justify-content:center; width:50px; height:50px; flex:0 0 auto;"><img src="assets/matilda-logo-card.png" alt="Matilda" width="50" height="50" style="display:block; width:50px; height:50px; object-fit:contain;"></span>
<span style="display:flex; flex-direction:column; min-width:0; gap:5px;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:20px; font-weight:600; line-height:1; color:var(--text);">Matilda</span>
<span style="font-size:13.5px; line-height:1.5; color:var(--text-muted);">One network for many tasks — trained once, reused across the analysis pipeline.</span>
<span style="display:flex; flex-wrap:wrap; gap:6px; margin-top:3px;"><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Classification</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Dimension reduction</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Feature selection</span><span style="font-size:11px; color:var(--text-faint); border:1px solid var(--border); border-radius:5px; padding:2px 8px; white-space:nowrap;">Simulation</span></span>
</span>
</a>

</div>
</div>
</section>

<!-- REFERENCES -->
<section id="references" style="padding:48px 0 0; scroll-margin-top:90px;">
<div style="max-width:820px; margin:0 auto;">
<div style="font-family:'Newsreader','Charter',Georgia,serif; font-size:26px; font-weight:600; letter-spacing:-0.015em; color:var(--text); margin-bottom:8px;">References</div>
<div style="display:flex; flex-direction:column; gap:4px; margin:0 -16px;">

<div class="dc-ref-static" style="display:block; padding:14px 16px; border-radius:10px; color:var(--text);">
<span style="display:flex; flex-direction:column; gap:6px; min-width:0;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:17.5px; font-weight:600; line-height:1.32; color:var(--text); text-wrap:pretty;">Condition-aware deep factor learning with M3 enables integration, patient-level inference, and multi-resolution interpretation in multimodal single-cell data</span>
<span style="font-size:13px; line-height:1.5; color:var(--text-muted);">Chunlei Liu, Sichang Ding, Shila Ghazanfar, Pengyi Yang</span>
</span>
</div>

<a class="dc-ref" href="https://www.nature.com/articles/s41592-025-02856-3" target="_blank" rel="noopener noreferrer" style="display:block; padding:14px 16px; border-radius:10px; text-decoration:none; color:var(--text);">
<span style="display:flex; flex-direction:column; gap:6px; min-width:0;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:17.5px; font-weight:600; line-height:1.32; color:var(--text); text-wrap:pretty;">Multitask benchmarking of single-cell multimodal omics integration methods</span>
<span style="font-size:13px; line-height:1.5; color:var(--text-muted);">Chunlei Liu, Sichang Ding, Hani Jieun Kim, Siqu Long, Di Xiao, Shila Ghazanfar, Pengyi Yang</span>
<span style="font-size:12.5px; color:var(--text-faint);"><em>Nature Methods</em> · 22, 2449–2460 (2025)</span>
</span>
</a>

<a class="dc-ref" href="https://academic.oup.com/nar/article/51/8/e45/7076464" target="_blank" rel="noopener noreferrer" style="display:block; padding:14px 16px; border-radius:10px; text-decoration:none; color:var(--text);">
<span style="display:flex; flex-direction:column; gap:6px; min-width:0;">
<span style="font-family:'Newsreader','Charter',Georgia,serif; font-size:17.5px; font-weight:600; line-height:1.32; color:var(--text); text-wrap:pretty;">Multi-task learning from multimodal single-cell omics with Matilda</span>
<span style="font-size:13px; line-height:1.5; color:var(--text-muted);">Chunlei Liu, Hao Huang, Pengyi Yang</span>
<span style="font-size:12.5px; color:var(--text-faint);"><em>Nucleic Acids Research</em> · 51(8), e45 (2023)</span>
</span>
</a>

</div>
</div>
</section>
</main>

<!-- ━━━━━━━━ BAND ━━━━━━━━ -->
<section style="margin-top:56px; padding:26px 0 28px; background:var(--bg-elevated); border-top:1px solid var(--border); border-bottom:1px solid var(--border);">
<div style="max-width:980px; margin:0 auto; padding:0 28px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
<span style="font-size:13.5px; color:var(--text-muted);">Independent packages — <strong style="color:var(--text); font-weight:500;">install only what you need</strong>.</span>
<a href="methods/" style="font-size:13.5px; font-weight:500; color:var(--brand-600); text-decoration:none;">Which tool do I need? →</a>
</div>
</section>

</div>
