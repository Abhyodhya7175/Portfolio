import { useState, useEffect, useRef } from "react";
import { animate, createTimeline, remove, set, stagger } from "animejs";
import emailjs from "@emailjs/browser";
import { ChartBar, CloudSun, EnvelopeSimple, GithubLogo, Handshake, InstagramLogo, Lightning, LinkedinLogo, Moon, Phone, ShieldCheck, Sun, Target, Trophy } from "phosphor-react";

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #07080d;
      --bg2:      #0d0f18;
      --bg3:      #131623;
      --surface:  #181b28;
      --surface2: #1e2133;
      --nav-bg:   rgba(7,8,13,0.82);
      --border:   rgba(255,255,255,0.07);
      --text:     #eeeef8;
      --text2:    #8888aa;
      --text3:    #44445a;
      --cyan:     #00e5cc;
      --cyan2:    #00bfae;
      --cyan-glow:rgba(0,229,204,0.18);
      --grid-line:rgba(0,229,204,0.04);
      --accent-contrast:#07080d;
      --amber:    #ffb347;
      --rose:     #ff6b8a;
      --ff-head:  'Clash Display', sans-serif;
      --ff-body:  'Cabinet Grotesk', sans-serif;
      --r:        18px;
      --r-sm:     10px;
      --ease:     0.35s cubic-bezier(0.4,0,0.2,1);
    }

    :root[data-theme="light"] {
      --bg:       #f7fafc;
      --bg2:      #edf3f8;
      --bg3:      #e6eef6;
      --surface:  #ffffff;
      --surface2: #f1f6fb;
      --nav-bg:   rgba(255,255,255,0.86);
      --border:   rgba(15,23,42,0.12);
      --text:     #111827;
      --text2:    #475569;
      --text3:    #7c8797;
      --cyan:     #007f73;
      --cyan2:    #006a61;
      --cyan-glow:rgba(0,127,115,0.16);
      --grid-line:rgba(0,127,115,0.09);
      --accent-contrast:#ffffff;
      --amber:    #b85d00;
      --rose:     #c8325b;
    }

    html { scroll-behavior: smooth; scroll-padding-top: 76px; color-scheme: dark; }
    :root[data-theme="light"] { color-scheme: light; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--ff-body);
      font-size: 16px;
      line-height: 1.65;
      overflow-x: hidden;
    }

    /* custom cursor */
    .cursor-shell {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      pointer-events: none;
      z-index: 1200;
      opacity: 0;
      transition: opacity .24s ease;
      mix-blend-mode: screen;
    }
    .cursor-shell.visible { opacity: 1; }
    .cursor-ring,
    .cursor-dot,
    .cursor-label {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate3d(-50%, -50%, 0);
      pointer-events: none;
      will-change: transform, opacity;
    }
    .cursor-ring {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(0, 229, 204, .62);
      background: radial-gradient(circle, rgba(0,229,204,.16), rgba(0,229,204,0) 68%);
      box-shadow: 0 0 22px rgba(0,229,204,.3);
      transition: transform .26s cubic-bezier(.4,0,.2,1), border-color .24s ease, background .24s ease;
    }
    .cursor-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 14px rgba(0,229,204,.65);
      transition: transform .22s cubic-bezier(.4,0,.2,1), opacity .2s ease;
    }
    .cursor-label {
      font-family: var(--ff-head);
      font-size: 10px;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: #0b121c;
      background: rgba(0, 229, 204, .92);
      border-radius: 100px;
      padding: 5px 10px;
      transform: translate3d(14px, 14px, 0) scale(.8);
      opacity: 0;
      transition: opacity .2s ease, transform .24s cubic-bezier(.4,0,.2,1);
      white-space: nowrap;
    }

    .cursor-shell.variant-link .cursor-ring {
      transform: translate3d(-50%, -50%, 0) scale(1.45);
      border-color: rgba(255,255,255,.82);
      background: radial-gradient(circle, rgba(255,255,255,.22), rgba(255,255,255,0) 74%);
    }
    .cursor-shell.variant-link .cursor-dot {
      transform: translate3d(-50%, -50%, 0) scale(.65);
    }
    .cursor-shell.variant-cta .cursor-ring {
      transform: translate3d(-50%, -50%, 0) scale(1.7);
      border-color: rgba(255,179,71,.86);
      background: radial-gradient(circle, rgba(255,179,71,.24), rgba(255,179,71,0) 74%);
      box-shadow: 0 0 26px rgba(255,179,71,.33);
    }
    .cursor-shell.variant-card .cursor-ring {
      transform: translate3d(-50%, -50%, 0) scale(1.95);
      border-color: rgba(0,229,204,.42);
      background: radial-gradient(circle, rgba(0,229,204,.12), rgba(0,229,204,0) 72%);
    }
    .cursor-shell.variant-text .cursor-ring {
      transform: translate3d(-50%, -50%, 0) scale(1.14);
      border-color: rgba(255,255,255,.7);
      background: radial-gradient(circle, rgba(255,255,255,.18), rgba(255,255,255,0) 65%);
    }
    .cursor-shell.has-label .cursor-label {
      opacity: 1;
      transform: translate3d(16px, 16px, 0) scale(1);
    }
    .cursor-shell.is-pressed .cursor-ring {
      transform: translate3d(-50%, -50%, 0) scale(.85);
    }
    .cursor-shell.is-pressed .cursor-dot {
      transform: translate3d(-50%, -50%, 0) scale(1.5);
    }

    /* scrollbar */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

    /* grain overlay */
    body::after {
      content:''; position:fixed; inset:0; pointer-events:none; z-index:999;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      opacity:.55;
    }

    /* grid bg pattern */
    .grid-bg {
      background-image:
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* ── nav ── */
    nav {
      position:fixed; top:0; left:0; right:0; z-index:100;
      display:grid; align-items:center; grid-template-columns:max-content 1fr max-content;
      gap:30px;
      padding:14px 36px;
      background:var(--nav-bg);
      backdrop-filter:blur(20px);
      border-bottom:1px solid var(--border);
      transition:background var(--ease);
    }
    .nav-logo {
      display:inline-flex; align-items:center; gap:10px;
      font-family:var(--ff-head); font-size:20px; font-weight:700;
      color:var(--text); text-decoration:none; letter-spacing:-0.5px;
      min-width:max-content;
    }
    .nav-logo-icon {
      width:36px; height:36px; border-radius:8px; object-fit:cover;
      flex-shrink:0; display:block;
    }
    .nav-logo-text { line-height:1; }
    .nav-logo em { color:var(--cyan); font-style:normal; }
    .nav-links { display:flex; justify-content:center; gap:24px; list-style:none; min-width:0; }
    .nav-links a {
      text-decoration:none; color:var(--text2); font-size:13.5px;
      font-weight:500; letter-spacing:.3px;
      transition:color var(--ease);
      position:relative;
    }
    .nav-links a::after {
      content:''; position:absolute; bottom:-2px; left:0;
      width:0; height:1.5px; background:var(--cyan);
      transition:width var(--ease);
    }
    .nav-links a:hover { color:var(--text); }
    .nav-links a:hover::after { width:100%; }
    .nav-actions { display:flex; align-items:center; justify-content:flex-end; gap:10px; min-width:max-content; }
    .nav-cta {
      min-height:46px; padding:0 18px; background:var(--cyan); color:var(--accent-contrast);
      border-radius:100px; font-size:13px; font-weight:700;
      text-decoration:none; letter-spacing:.3px;
      display:inline-flex; align-items:center; justify-content:center; white-space:nowrap; line-height:1;
      transition:all var(--ease);
      box-shadow:0 0 24px var(--cyan-glow);
    }
    .nav-cta:hover { opacity:.88; transform:translateY(-1px); box-shadow:0 4px 32px var(--cyan-glow); }
    .theme-toggle {
      width:40px; height:40px; border-radius:50%;
      border:1px solid var(--border); background:var(--surface);
      color:var(--text); display:inline-flex; align-items:center; justify-content:center;
      cursor:pointer; transition:background var(--ease), border-color var(--ease), color var(--ease), transform var(--ease), box-shadow var(--ease);
      box-shadow:0 8px 24px rgba(0,0,0,.08);
    }
    .theme-toggle:hover {
      border-color:var(--cyan); color:var(--cyan); transform:translateY(-1px);
      box-shadow:0 8px 28px var(--cyan-glow);
    }
    .theme-toggle:focus-visible {
      outline:2px solid var(--cyan);
      outline-offset:3px;
    }

    /* hamburger */
    .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
    .hamburger span { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:all var(--ease); }
    .mob-nav {
      display:none; position:fixed; top:73px; left:0; right:0;
      background:var(--bg2); border-bottom:1px solid var(--border);
      padding:28px 24px; z-index:98; flex-direction:column; gap:22px;
    }
    .mob-nav.open { display:flex; }
    .mob-nav a { color:var(--text2); text-decoration:none; font-size:18px; font-weight:500; }
    .mob-nav a:hover { color:var(--cyan); }

    /* ── section base ── */
    .section-wrap { max-width:1160px; margin:0 auto; padding:100px 40px; }
    .section-label {
      display:inline-flex; align-items:center; gap:10px;
      font-size:11px; font-weight:700; letter-spacing:3px;
      text-transform:uppercase; color:var(--cyan); margin-bottom:14px;
    }
    .section-label::before { content:''; width:22px; height:1.5px; background:var(--cyan); }
    .section-title {
      font-family:var(--ff-head);
      font-size:clamp(34px,5vw,54px);
      font-weight:700; letter-spacing:-2px; line-height:1.05;
      margin-bottom:16px;
    }
    .section-sub { color:var(--text2); max-width:500px; font-size:16.5px; line-height:1.75; }

    /* ── hero ── */
    #hero {
      min-height:100vh; display:flex; flex-direction:column;
      justify-content:center; padding:130px 48px 90px;
      position:relative; overflow:hidden;
    }
    .hero-orb {
      position:absolute; border-radius:50%;
      filter:blur(110px); opacity:.12; pointer-events:none;
      animation:floatOrb 9s ease-in-out infinite;
    }
    @keyframes floatOrb {
      0%,100%{ transform:translateY(0) scale(1);}
      50%{ transform:translateY(-28px) scale(1.06);}
    }
    .hero-inner { max-width:1160px; margin:0 auto; width:100%; display:grid; grid-template-columns:1fr 420px; gap:60px; align-items:center; }
    .hero-badge {
      display:inline-flex; align-items:center; gap:10px;
      padding:7px 16px 7px 9px; background:var(--surface);
      border:1px solid var(--border); border-radius:100px;
      font-size:13px; color:var(--text2); margin-bottom:30px;
      animation:fadeUp .5s ease forwards; animation-delay:.1s; opacity:0;
    }
    .badge-dot {
      width:9px; height:9px; background:var(--cyan); border-radius:50%;
      animation:blink 2.2s ease infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(1.4);} }
    .hero-name {
      font-family:var(--ff-head);
      font-size:clamp(50px,8vw,82px);
      font-weight:700; letter-spacing:-4px; line-height:.95;
      margin-bottom:18px;
      animation:fadeUp .55s ease forwards; animation-delay:.2s; opacity:0;
    }
    .hero-name .line { display:block; }
    .hero-name .accent { color:var(--cyan); }
    .hero-role {
      font-size:17px; color:var(--text2); margin-bottom:18px;
      font-weight:400; letter-spacing:.2px;
      animation:fadeUp .55s ease forwards; animation-delay:.3s; opacity:0;
    }
    .hero-desc {
      font-size:15.5px; color:var(--text2); line-height:1.85;
      max-width:480px; margin-bottom:38px;
      animation:fadeUp .55s ease forwards; animation-delay:.4s; opacity:0;
    }
    .hero-ctas {
      display:flex; gap:14px; flex-wrap:wrap;
      animation:fadeUp .55s ease forwards; animation-delay:.5s; opacity:0;
    }
    .btn-primary {
      padding:14px 28px; background:var(--cyan); color:var(--accent-contrast);
      border-radius:100px; font-size:14.5px; font-weight:700;
      text-decoration:none; cursor:pointer; border:none;
      transition:all var(--ease); display:inline-flex; align-items:center; gap:8px;
      box-shadow:0 0 28px var(--cyan-glow);
    }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 40px var(--cyan-glow); opacity:.92; }
    .btn-outline {
      padding:14px 28px; background:transparent; color:var(--text);
      border:1.5px solid var(--border); border-radius:100px;
      font-size:14.5px; font-weight:500; text-decoration:none;
      transition:all var(--ease); display:inline-flex; align-items:center; gap:8px;
    }
    .btn-outline:hover { border-color:var(--cyan); color:var(--cyan); transform:translateY(-2px); }

    /* hero card */
    .hero-card {
      background:var(--surface); border:1px solid var(--border);
      border-radius:24px; padding:32px; position:relative; overflow:hidden;
      animation:fadeIn .9s ease forwards; animation-delay:.6s; opacity:0;
    }
    .hero-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,var(--cyan),var(--amber));
    }
    .card-avatar {
      width:68px; height:68px; border-radius:50%;
      background:linear-gradient(135deg,var(--cyan),var(--amber));
      display:flex; align-items:center; justify-content:center;
      font-size:26px; margin-bottom:18px; font-weight:700; color:var(--accent-contrast);
      font-family:var(--ff-head);
    }
    .card-name { font-family:var(--ff-head); font-size:20px; font-weight:700; letter-spacing:-.5px; margin-bottom:3px; }
    .card-role { font-size:13px; color:var(--text2); margin-bottom:22px; }
    .card-stats { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:22px; }
    .cstat { background:var(--bg2); border-radius:12px; padding:14px 8px; text-align:center; }
    .cstat-num { font-family:var(--ff-head); font-size:20px; font-weight:700; display:block; color:var(--cyan); }
    .cstat-lbl { font-size:10px; color:var(--text3); letter-spacing:.5px; text-transform:uppercase; }
    .card-tags { display:flex; gap:7px; flex-wrap:wrap; }
    .ctag {
      padding:4px 11px; background:var(--bg); border:1px solid var(--border);
      border-radius:6px; font-size:11.5px; color:var(--text2); font-weight:500;
    }

    @keyframes fadeUp { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }

    .scroll-hint {
      position:absolute; bottom:38px; left:50%; transform:translateX(-50%);
      display:flex; flex-direction:column; align-items:center; gap:8px;
      color:var(--text3); font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
      animation:fadeIn 1s ease forwards; animation-delay:1s; opacity:0;
    }
    .scroll-line { width:1px; height:50px; background:linear-gradient(180deg,var(--cyan),transparent); animation:scrollPulse 2.2s ease infinite; }
    @keyframes scrollPulse { 0%,100%{opacity:.4;} 50%{opacity:1;} }

    /* ── about ── */
    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:start; margin-top:56px; }
    .about-bio { color:var(--text2); font-size:15.5px; line-height:1.9; margin-bottom:18px; }
    .about-hi { color:var(--text); font-weight:600; }
    .value-cards { display:flex; flex-direction:column; gap:14px; margin-top:28px; }
    .vcard {
      display:flex; align-items:flex-start; gap:14px;
      padding:16px 20px; background:var(--surface); border:1px solid var(--border);
      border-radius:var(--r-sm); transition:border-color var(--ease), transform var(--ease);
    }
    .vcard:hover { border-color:var(--cyan); transform:translateX(5px); }
    .vcard-icon {
      width:24px; height:24px; display:flex; align-items:center; justify-content:center;
      color:var(--cyan); flex-shrink:0; margin-top:1px;
    }
    .vcard-title { font-family:var(--ff-head); font-size:14px; font-weight:600; margin-bottom:3px; }
    .vcard-desc { font-size:13px; color:var(--text2); line-height:1.6; }

    /* ── skills ── */
    .skills-bg { background:var(--bg2); padding:100px 0; }
    .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:56px; }
    .sk-cat {
      background:var(--surface); border:1px solid var(--border);
      border-radius:var(--r); padding:30px; position:relative; overflow:visible;
      transition:transform var(--ease), border-color var(--ease);
    }
    .sk-cat::after {
      content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
      opacity:0; transition:opacity var(--ease);
    }
    .sk-cat.fe::after { background:linear-gradient(90deg,var(--cyan),#4af3e0); }
    .sk-cat.be::after { background:linear-gradient(90deg,var(--amber),#ff9a3c); }
    .sk-cat.tl::after { background:linear-gradient(90deg,var(--rose),#ff8c69); }
    .sk-cat:hover { transform:translateY(-5px); border-color:transparent; }
    .sk-cat:hover::after { opacity:1; }
    .sk-cat-title { font-family:var(--ff-head); font-size:17px; font-weight:700; margin-bottom:4px; }
    .sk-cat-sub { font-size:12.5px; color:var(--text3); margin-bottom:26px; }
    .sk-list { display:flex; flex-direction:column; gap:10px; }
    .sk-item {
      width:100%; position:relative; display:grid; grid-template-columns:34px 1fr; gap:12px; align-items:start;
      padding:13px 14px; margin:0; border:1px solid var(--border);
      border-radius:12px; background:var(--bg2); color:inherit; text-align:left;
      font-family:var(--ff-body); cursor:pointer;
      transition:background var(--ease), border-color var(--ease), transform var(--ease), box-shadow var(--ease);
    }
    .sk-item:hover,
    .sk-item:focus-visible {
      background:var(--surface2);
      border-color:var(--cyan);
      transform:translateY(-2px);
      box-shadow:0 12px 26px rgba(0,0,0,.12);
      outline:none;
    }
    .sk-sigil {
      width:34px; height:34px; border-radius:10px;
      display:flex; align-items:center; justify-content:center;
      background:var(--surface); border:1px solid var(--border);
      color:var(--cyan); flex-shrink:0;
    }
    .sk-sigil::before {
      content:''; width:9px; height:9px; border-radius:50%;
      background:currentColor; box-shadow:0 0 14px currentColor;
    }
    .sk-cat.be .sk-sigil { color:var(--amber); }
    .sk-cat.tl .sk-sigil { color:var(--rose); }
    .sk-copy { min-width:0; }
    .sk-info { display:flex; justify-content:space-between; align-items:center; gap:10px; }
    .sk-name { font-size:14px; font-weight:700; color:var(--text); line-height:1.25; }
    .sk-tag {
      color:var(--text3); font-size:10px; font-weight:700;
      letter-spacing:.8px; text-transform:uppercase; white-space:nowrap;
    }
    .sk-tooltip {
      max-height:0; overflow:hidden; opacity:0; transform:translateY(-4px);
      color:var(--text2); font-size:12.5px; line-height:1.6;
      transition:max-height .32s ease, opacity .24s ease, transform .24s ease, margin-top .24s ease;
    }
    .sk-item:hover .sk-tooltip,
    .sk-item:focus-visible .sk-tooltip {
      max-height:72px; opacity:1; transform:translateY(0); margin-top:9px;
    }

    /* ── projects ── */
    .proj-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:52px; flex-wrap:wrap; gap:16px; }
    .proj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
    .proj-card {
      background:var(--surface); border:1px solid var(--border);
      border-radius:var(--r); padding:30px; position:relative; overflow:hidden;
      transition:all var(--ease);
    }
    .proj-card::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,var(--cyan-glow),transparent);
      opacity:0; transition:opacity var(--ease);
    }
    .proj-card:hover { transform:translateY(-6px); border-color:rgba(0,229,204,.25); }
    .proj-card:hover::before { opacity:1; }
    .proj-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
    .proj-icon {
      width:46px; height:46px; border-radius:12px;
      display:flex; align-items:center; justify-content:center; font-size:20px;
    }
    .proj-links { display:flex; gap:8px; opacity:0; transform:translateY(-4px); transition:all var(--ease); }
    .proj-card:hover .proj-links { opacity:1; transform:translateY(0); }
    .proj-link {
      width:33px; height:33px; background:var(--bg2); border:1px solid var(--border);
      border-radius:8px; display:flex; align-items:center; justify-content:center;
      text-decoration:none; font-size:13px; color:var(--text2);
      transition:all var(--ease);
    }
    .proj-link:hover { background:var(--cyan); color:var(--accent-contrast); border-color:transparent; }
    .proj-title { font-family:var(--ff-head); font-size:18px; font-weight:700; letter-spacing:-.4px; margin-bottom:9px; }
    .proj-desc { font-size:13.5px; color:var(--text2); line-height:1.75; margin-bottom:22px; }
    .proj-stack { display:flex; gap:7px; flex-wrap:wrap; }
    .stk-tag { padding:4px 10px; background:var(--bg); border:1px solid var(--border); border-radius:6px; font-size:11px; color:var(--text3); font-weight:500; }
    .proj-actions { display:flex; align-items:center; justify-content:flex-start; gap:10px; margin-top:22px; }
    .proj-details-btn {
      border:1px solid var(--border); background:var(--bg2); color:var(--text);
      border-radius:100px; padding:9px 14px; font-size:12.5px; font-weight:600;
      cursor:pointer; transition:all var(--ease);
    }
    .proj-details-btn:hover { border-color:var(--cyan); color:var(--cyan); transform:translateY(-1px); }
    .proj-details-btn.active {
      border-color:var(--cyan);
      color:var(--cyan);
      background:rgba(0,229,204,0.06);
    }
    .proj-details-panel {
      margin-top:14px; background:var(--bg2); border:1px solid var(--border);
      border-radius:14px; max-height:0; overflow:hidden; opacity:0;
      transform:translateY(-4px); padding:0 14px;
      transition:max-height .48s cubic-bezier(.4,0,.2,1), opacity .3s ease, transform .3s ease, padding .3s ease;
    }
    .proj-details-panel.open {
      max-height:540px; opacity:1; transform:translateY(0); padding:14px;
    }
    .proj-details-summary { color:var(--text2); font-size:13.5px; line-height:1.75; margin-bottom:10px; }
    .project-detail-box {
      background:var(--bg2); border:1px solid var(--border); border-radius:14px;
      padding:16px 16px 14px; margin-bottom:12px;
    }
    .project-detail-label {
      font-size:11px; color:var(--cyan); letter-spacing:1.2px; font-weight:700;
      text-transform:uppercase; margin-bottom:7px;
    }
    .project-detail-copy { font-size:13.5px; color:var(--text2); line-height:1.75; }
    .project-inline-points { margin-top:12px; display:grid; gap:8px; }
    .project-inline-point {
      background:var(--bg); border:1px solid var(--border); border-radius:10px;
      padding:8px 11px; font-size:12.5px; color:var(--text2);
    }

    /* ── certs ── */
    .cert-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:52px; }
    .cert-card {
      background:var(--surface); border:1px solid var(--border);
      border-radius:var(--r); padding:26px; transition:all var(--ease);
      position:relative; overflow:hidden;
    }
    .cert-card::after {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,var(--cyan),var(--amber)); opacity:0;
      transition:opacity var(--ease);
    }
    .cert-card:hover { transform:translateY(-4px); border-color:rgba(0,229,204,.2); }
    .cert-card:hover::after { opacity:1; }
    .cert-score {
      display:inline-block; padding:4px 12px; border-radius:100px;
      font-size:11px; font-weight:700; background:rgba(0,229,204,.12); color:var(--cyan);
      margin-bottom:14px;
    }
    .cert-title { font-family:var(--ff-head); font-size:16px; font-weight:700; letter-spacing:-.3px; margin-bottom:5px; }
    .cert-org { font-size:12.5px; color:var(--text3); margin-bottom:12px; }
    .cert-desc { font-size:13px; color:var(--text2); line-height:1.7; }

    /* ── experience ── */
    .exp-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; margin-top:56px; }
    .exp-sec-title {
      font-family:var(--ff-head); font-size:19px; font-weight:700;
      margin-bottom:30px; padding-bottom:14px; border-bottom:1px solid var(--border);
    }
    .tl { display:flex; flex-direction:column; }
    .tl-item { display:flex; gap:18px; }
    .tl-left { display:flex; flex-direction:column; align-items:center; flex-shrink:0; width:18px; }
    .tl-dot { width:11px; height:11px; background:var(--cyan); border-radius:50%; box-shadow:0 0 10px var(--cyan-glow); margin-top:5px; flex-shrink:0; }
    .tl-line { width:1px; flex:1; background:var(--border); margin:5px 0; min-height:28px; }
    .tl-content { padding-bottom:30px; flex:1; }
    .tl-date { font-size:11px; color:var(--cyan); font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-bottom:5px; }
    .tl-title { font-family:var(--ff-head); font-size:16px; font-weight:700; letter-spacing:-.3px; margin-bottom:3px; }
    .tl-org { font-size:12.5px; color:var(--text2); margin-bottom:9px; }
    .tl-desc { font-size:13.5px; color:var(--text2); line-height:1.72; }
    .tl-pct {
      display:inline-flex; align-items:center; gap:6px;
      margin-top:8px; padding:3px 10px; border-radius:100px;
      background:rgba(0,229,204,.1); color:var(--cyan); font-size:11.5px; font-weight:700;
    }

    /* ── contact ── */
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; margin-top:56px; }
    .contact-title { font-family:var(--ff-head); font-size:30px; font-weight:700; letter-spacing:-1px; margin-bottom:14px; }
    .contact-text { color:var(--text2); line-height:1.85; margin-bottom:36px; }
    .c-links { display:flex; flex-direction:column; gap:12px; }
    .c-link {
      display:flex; align-items:center; gap:14px;
      padding:15px 19px; background:var(--surface); border:1px solid var(--border);
      border-radius:var(--r-sm); text-decoration:none; color:var(--text);
      transition:all var(--ease); font-size:14px;
    }
    .c-link:hover { border-color:var(--cyan); transform:translateX(4px); }
    .c-link-icon {
      width:36px; height:36px; background:var(--bg2); border-radius:9px;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      color:var(--cyan);
    }
    .c-link-lbl { font-size:10.5px; color:var(--text3); letter-spacing:.5px; text-transform:uppercase; }
    .c-link-val { font-weight:600; color:var(--text); font-size:14px; }
    .cf { display:flex; flex-direction:column; gap:18px; }
    .fg { display:flex; flex-direction:column; gap:7px; }
    .fl { font-size:12.5px; font-weight:600; color:var(--text2); letter-spacing:.3px; }
    .fi, .fta {
      background:var(--surface); border:1.5px solid var(--border);
      border-radius:var(--r-sm); padding:13px 17px; color:var(--text);
      font-family:var(--ff-body); font-size:14.5px; outline:none; width:100%;
      transition:border-color var(--ease), box-shadow var(--ease);
    }
    .fi::placeholder, .fta::placeholder { color:var(--text3); }
    .fi:focus, .fta:focus { border-color:var(--cyan); box-shadow:0 0 0 3px var(--cyan-glow); }
    .fta { min-height:130px; resize:none; }
    .frow { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

    /* ── footer ── */
    footer {
      background:var(--bg2); border-top:1px solid var(--border);
      padding:36px 48px;
    }
    .footer-in { max-width:1160px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px; }
    .footer-logo { font-family:var(--ff-head); font-size:20px; font-weight:700; text-decoration:none; color:var(--text); }
    .footer-logo em { color:var(--cyan); font-style:normal; }
    .footer-copy { color:var(--text3); font-size:13.5px; }
    .footer-soc { display:flex; gap:10px; }
    .fsoc {
      width:35px; height:35px; background:var(--surface); border:1px solid var(--border);
      border-radius:8px; display:flex; align-items:center; justify-content:center;
      text-decoration:none; color:var(--text2);
      transition:all var(--ease);
    }
    .fsoc svg, .c-link-icon svg, .vcard-icon svg { width:16px; height:16px; }
    .fsoc:hover { background:var(--cyan); color:var(--accent-contrast); border-color:transparent; transform:translateY(-2px); }

    /* ── reveal ── */
    .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
    .reveal.vis { opacity:1; transform:translateY(0); }
    .d1 { transition-delay:.1s; } .d2 { transition-delay:.2s; } .d3 { transition-delay:.3s; }

    /* ── responsive ── */
    @media(max-width:1024px){
      nav { gap:22px; padding:14px 28px; }
      .nav-links { gap:18px; }
      .nav-cta { min-height:42px; padding:0 15px; }
      .hero-inner { grid-template-columns:1fr; }
      .hero-card-wrap { display:none; }
      .about-grid, .exp-grid, .contact-grid { grid-template-columns:1fr; gap:40px; }
      .skills-grid, .proj-grid, .cert-grid { grid-template-columns:1fr 1fr; }
    }
    @media(max-width:920px){
      nav { grid-template-columns:max-content max-content; justify-content:space-between; }
      .nav-links { display:none; }
      .hamburger { display:flex; }
    }
    @media(max-width:768px){
      nav { padding:15px 20px; }
      .nav-links, .nav-cta { display:none; }
      .hamburger { display:flex; }
      .section-wrap { padding:72px 20px; }
      #hero { padding:110px 20px 80px; }
      .skills-grid, .proj-grid, .cert-grid { grid-template-columns:1fr; }
      .proj-header { flex-direction:column; align-items:flex-start; }
      .frow { grid-template-columns:1fr; }
      footer { padding:28px 20px; }
      .footer-in { flex-direction:column; align-items:flex-start; }
    }

    @media (hover: hover) and (pointer: fine) {
      body,
      a,
      button,
      input,
      textarea,
      .proj-card,
      .sk-cat,
      .cert-card,
      .vcard,
      .c-link,
      .fsoc,
      .hero-card {
        cursor: none;
      }
    }

    @media (hover: none), (pointer: coarse) {
      .cursor-shell { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cursor-ring,
      .cursor-dot,
      .cursor-label { transition: none; }
    }
  `}</style>
);

/* ─── HOOKS ─────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, []);
  return ref;
}

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    icon: <CloudSun size={20} />,
    iconBg: "linear-gradient(135deg,#00e5cc22,#4af3e022)",
    title: "Weather App",
    desc: "A live weather dashboard fetching real-time data via the OpenWeather API. Features clean state management, dynamic UI updates per city, and structured API response handling.",
    stack: ["React.js", "HTML", "CSS", "OpenWeather API"],
    details: {
      summary: "Built to solve unreliable and cluttered weather interfaces by delivering clear, location-specific information with predictable states.",
      challenge: "API responses were inconsistent between valid cities, unknown locations, and rate-limited calls. Without guardrails, users saw empty sections and confusing transitions while data was loading.",
      solution: "Created a strict fetch lifecycle with loading, success, and failure states. Normalized API payloads before rendering and added resilient fallbacks for unknown city inputs.",
      impact: [
        "Reduced UI flicker by rendering only normalized response models.",
        "Made failures understandable with actionable error messages.",
        "Improved usability by aligning city search, units, and refresh flow.",
      ],
    },
    github: "#", live: "#",
  },
  {
    icon: <Target size={20} />,
    iconBg: "linear-gradient(135deg,#ffb34722,#ff9a3c22)",
    title: "TalentPulse",
    desc: "Full-stack AI-powered career portal with multi-role architecture (Students, Recruiters, Admins). Features gamified profile completion with dynamic progress bars to boost data quality.",
    stack: ["React.js", "Tailwind CSS", "Full Stack", "AI/ML"],
    details: {
      summary: "Designed to fix low-quality candidate profiles and disconnected hiring workflows across students, recruiters, and admins.",
      challenge: "Different users needed different permissions and journeys, but the core profile data had to stay consistent. In early versions, missing profile fields caused recruiter drop-offs and weak matching outcomes.",
      solution: "Implemented role-aware UI flows and a profile completeness engine that highlights blockers. Added progress-driven nudges and validation checkpoints before profile publishing.",
      impact: [
        "Increased profile data completeness through visible progress milestones.",
        "Reduced recruiter friction with cleaner, standardized candidate cards.",
        "Enabled safer administration via explicit multi-role boundaries.",
      ],
    },
    github: "#", live: "#",
  },
  {
    icon: <ShieldCheck size={20} />,
    iconBg: "linear-gradient(135deg,#ff6b8a22,#ff8c6922)",
    title: "Preventive Healthcare System",
    desc: "Early risk assessment platform developed during Ignithon hackathon at KIIT. Conducts health screenings and identifies at-risk users through structured data collection.",
    stack: ["Python", "Data Analysis", "Healthcare", "Team Project"],
    details: {
      summary: "Created to move from reactive care to early risk flagging using fast, structured screening signals.",
      challenge: "Healthcare inputs were noisy and came from users with varied medical literacy. The system needed to produce understandable risk outputs quickly without oversimplifying sensitive cases.",
      solution: "Defined a guided questionnaire pipeline with strict field validation, weighted indicators, and transparent risk bands. Focused on explainable outputs so non-technical users could understand next steps.",
      impact: [
        "Delivered quick preliminary risk categorization for hackathon demos.",
        "Improved trust with explainable factors behind each risk score.",
        "Created a reusable screening workflow for future iterations.",
      ],
    },
    github: "#", live: "#",
  },
];

const SKILLS = [
  {
    cls: "fe",
    title: "Frontend",
    sub: "Building what users see",
    items: [
      { name: "React.js", tag: "Components", note: "Built portfolio sections, API-driven weather UI, and role-aware career portal interfaces with reusable components." },
      { name: "HTML / CSS", tag: "Responsive", note: "Comfortable with responsive layouts, CSS variables, animations, accessibility states, and polished page structure." },
      { name: "JavaScript", tag: "UI Logic", note: "Used for dynamic UI state, form handling, API fetch lifecycles, DOM events, and interactive project details." },
      { name: "Tailwind CSS", tag: "Utility UI", note: "Applied utility-first styling in TalentPulse for fast layout iteration, spacing systems, and consistent UI states." },
    ],
  },
  {
    cls: "be",
    title: "Programming",
    sub: "Core CS foundations",
    items: [
      { name: "Python", tag: "Data", note: "Used for data analysis, healthcare screening logic, statistical workflows, and quick prototype scripts." },
      { name: "Java", tag: "Coursework", note: "Practiced core programming, object-oriented design, and structured problem solving through coursework." },
      { name: "C", tag: "DSA Base", note: "Built foundation in memory-aware programming, DSA practice, pointers, and low-level control flow." },
      { name: "OOP Concepts", tag: "Design", note: "Applied encapsulation, abstraction, and modular thinking while designing multi-role application flows." },
    ],
  },
  {
    cls: "tl",
    title: "Tools & Data",
    sub: "Ecosystem & analytics",
    items: [
      { name: "Git / GitHub", tag: "Workflow", note: "Managed project versions, GitHub repositories, collaboration flow, and deployment-ready portfolio changes." },
      { name: "Pandas / NumPy", tag: "Analysis", note: "Handled tabular data cleaning, basic analysis, transformations, and numeric workflows for insights." },
      { name: "Matplotlib / Tableau", tag: "Visuals", note: "Created charts and dashboards to communicate trends, distributions, and project findings clearly." },
      { name: "VS Code / Canva", tag: "Daily Tools", note: "Daily development setup in VS Code, plus Canva for quick visual assets, thumbnails, and presentations." },
    ],
  },
];

const CERTS = [
  {
    score: "Completed",
    title: "DSA in C/C++",
    org: "Udemy",
    desc: "Strengthened problem-solving, memory optimization, and time-complexity analysis skills through structured algorithm training.",
  },
  {
    score: "Score: 97%",
    title: "Meta Front-End Developer",
    org: "Coursera",
    desc: "Gained hands-on expertise in modern frontend development — responsive design, component architecture, and React ecosystem.",
  },
  {
    score: "Grade: A",
    title: "Palo Alto Cybersecurity",
    org: "AICTE",
    desc: "Foundational knowledge in network security, threat detection methodologies, and secure system practices.",
  },
];

const EDUCATION = [
  {
    date: "2023 – 2027",
    title: "B.Tech — CSCE (Pursuing)",
    org: "KIIT University, Bhubaneswar",
    desc: "Computer Science & Communication Engineering. Active hackathon participant, full-stack project builder.",
    pct: "GPA: 8.98",
  },
  {
    date: "2022",
    title: "AISSCE — Science (Class XII)",
    org: "Guru Gobind Singh Public School, Bokaro",
    desc: "Completed senior secondary education with a strong foundation in Science and Mathematics.",
    pct: "85.4%",
  },
  {
    date: "2020",
    title: "ICSE (Class X)",
    org: "Saint Joseph's School, Banka",
    desc: "Completed secondary schooling with distinction across core subjects.",
    pct: "87.8%",
  },
];

const HACKATHONS = [
  {
    date: "Buildfolio Hackathon",
    title: "Portfolio Solution Developer",
    org: "Manipal University, Jaipur",
    desc: "Worked in a team to design workflow and implement features for a portfolio-focused solution under tight schedule constraints.",
  },
  {
    date: "Ignithon",
    title: "Healthcare System Builder",
    org: "K1000 Society, KIIT University",
    desc: "Developed a preventive healthcare system for early risk assessments. Led solution architecture and core system operations.",
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────── */
function SkillCategory({ data }) {
  return (
    <div className={`sk-cat ${data.cls}`}>
      <div className="sk-cat-title">{data.title}</div>
      <div className="sk-cat-sub">{data.sub}</div>
      <div className="sk-list">
        {data.items.map((s, index) => {
          const tooltipId = `${data.cls}-skill-${index}`;
          return (
          <button
            type="button"
            className="sk-item"
            key={s.name}
            aria-describedby={tooltipId}
            data-cursor-label="Skill details"
          >
            <span className="sk-sigil" aria-hidden="true" />
            <span className="sk-copy">
              <span className="sk-info">
                <span className="sk-name">{s.name}</span>
                <span className="sk-tag">{s.tag}</span>
              </span>
              <span className="sk-tooltip" id={tooltipId}>{s.note}</span>
            </span>
          </button>
        );})}
      </div>
    </div>
  );
}

function RevealDiv({ className, children, delay = "" }) {
  const ref = useReveal();
  return (
    <div className={`reveal ${delay} ${className || ""}`} ref={ref}>
      {children}
    </div>
  );
}

function CustomCursor() {
  const shellRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsFinePointer) return;

    const shell = shellRef.current;
    if (!shell) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const target = { ...pos };
    const speed = reduceMotion ? 1 : 0.18;
    let raf = 0;

    const setVariantFromElement = (el) => {
      shell.classList.remove("variant-link", "variant-cta", "variant-card", "variant-text", "has-label");
      if (labelRef.current) labelRef.current.textContent = "";

      if (!el) return;

      let variant = "";
      let label = el.getAttribute("data-cursor-label") || "";

      if (el.matches("input, textarea")) {
        variant = "variant-text";
        label = label || "Type";
      } else if (el.matches(".btn-primary, .nav-cta")) {
        variant = "variant-cta";
        label = label || "Go";
      } else if (el.matches(".proj-card, .sk-cat, .cert-card, .vcard, .c-link, .hero-card")) {
        variant = "variant-card";
        label = label || "Explore";
      } else if (el.matches("a, button, .fsoc, .proj-link, .proj-details-btn, .hamburger")) {
        variant = "variant-link";
        label = label || "Open";
      }

      if (variant) shell.classList.add(variant);
      if (label) {
        if (labelRef.current) labelRef.current.textContent = label;
        shell.classList.add("has-label");
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * speed;
      pos.y += (target.y - pos.y) * speed;
      shell.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!shell.classList.contains("visible")) shell.classList.add("visible");
    };

    const onPointerDown = () => shell.classList.add("is-pressed");
    const onPointerUp = () => shell.classList.remove("is-pressed");

    const onPointerOver = (event) => {
      const interactive = event.target.closest(
        "[data-cursor-label], .btn-primary, .nav-cta, .proj-card, .sk-cat, .cert-card, .vcard, .c-link, .hero-card, a, button, input, textarea, .fsoc, .proj-link, .proj-details-btn, .hamburger"
      );
      setVariantFromElement(interactive);
    };

    const onPointerOut = (event) => {
      const toElement = event.relatedTarget;
      if (toElement && toElement.closest) {
        const nextInteractive = toElement.closest(
          "[data-cursor-label], .btn-primary, .nav-cta, .proj-card, .sk-cat, .cert-card, .vcard, .c-link, .hero-card, a, button, input, textarea, .fsoc, .proj-link, .proj-details-btn, .hamburger"
        );
        setVariantFromElement(nextInteractive);
        return;
      }
      setVariantFromElement(null);
    };

    const onPointerLeaveWindow = () => {
      shell.classList.remove("visible", "is-pressed", "variant-link", "variant-cta", "variant-card", "variant-text", "has-label");
      if (labelRef.current) labelRef.current.textContent = "";
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("mouseleave", onPointerLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mouseleave", onPointerLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-shell" ref={shellRef} aria-hidden="true">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
      <div className="cursor-label" ref={labelRef} />
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [expandedProject, setExpandedProject] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const supportsObserver = typeof window !== "undefined" && "IntersectionObserver" in window;

    const intro = createTimeline({ autoplay: true })
      .add("nav", {
        opacity: [0, 1],
        translateY: [-26, 0],
        duration: 680,
        easing: "easeOutExpo",
      })
      .add(
        [
            ".hero-badge",
            ".hero-name .line",
            ".hero-role",
            ".hero-desc",
            ".hero-ctas",
            ".hero-card",
        ],
        {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 820,
          delay: stagger(90),
          easing: "easeOutExpo",
        },
        "-=260"
      );

    const cardObserver = supportsObserver ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            easing: "easeOutCubic",
          });
          cardObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    ) : null;

    const sectionObserver = supportsObserver ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [46, 0],
            filter: ["blur(12px)", "blur(0px)"],
            duration: 980,
            easing: "easeOutExpo",
          });
          sectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    ) : null;

    const sectionNodes = document.querySelectorAll(".section-stage");
    if (sectionObserver) {
      sectionNodes.forEach((node) => {
        set(node, { opacity: 0, translateY: 46, filter: "blur(12px)" });
        sectionObserver.observe(node);
      });
    }

    if (cardObserver) {
      document
        .querySelectorAll(".proj-card, .cert-card, .tl-item, .c-link")
        .forEach((el) => cardObserver.observe(el));
    }

    const hoverUnsubscribers = [];
    const bindHover = (selector, enterProps, leaveProps) => {
      document.querySelectorAll(selector).forEach((el) => {
        const onEnter = () => animate(el, enterProps);
        const onLeave = () => animate(el, leaveProps);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        hoverUnsubscribers.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    };

    bindHover(
      ".nav-links a",
      { translateY: -4, scale: 1.05, duration: 240, easing: "easeOutBack" },
      { translateY: 0, scale: 1, duration: 280, easing: "easeOutQuad" }
    );
    bindHover(
      ".nav-cta, .btn-primary, .btn-outline",
      { translateY: -5, scale: 1.03, duration: 240, easing: "easeOutBack" },
      { translateY: 0, scale: 1, duration: 280, easing: "easeOutQuad" }
    );

    const shell = document.querySelector(".page-shell");
    let isSectionTransitioning = false;
    const onAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || anchor.target === "_blank") return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target || !shell || isSectionTransitioning) return;

      event.preventDefault();
      isSectionTransitioning = true;

      animate(shell, {
        opacity: [1, 0.56],
        translateY: [0, -14],
        duration: 220,
        easing: "easeInOutQuad",
      })
        .then(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", hash);
          return animate(shell, {
            opacity: [0.56, 1],
            translateY: [14, 0],
            duration: 420,
            easing: "easeOutExpo",
          });
        })
        .finally(() => {
          isSectionTransitioning = false;
        });
    };
    document.addEventListener("click", onAnchorClick);

    const orbLoop = animate(".hero-orb", {
      translateY: [-10, 10],
      duration: 4200,
      delay: stagger(320),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    return () => {
      intro.pause();
      orbLoop.pause();
      cardObserver?.disconnect();
      sectionObserver?.disconnect();
      hoverUnsubscribers.forEach((unsubscribe) => unsubscribe());
      document.removeEventListener("click", onAnchorClick);
      remove(".proj-card, .cert-card, .tl-item, .c-link, .hero-orb, nav");
    };
  }, []);

  useEffect(() => {
    if (!expandedProject) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpandedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedProject]);

  function closeMenu() { setMenuOpen(false); }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("FAILED... Missing EmailJS environment variables");
      setFormState("idle");
      alert("Message failed to send. Please try again.");
      return;
    }

    const form = e.target;
    // These keys must match the {{variable_names}} in your EmailJS template.
    const templateParams = {
      from_name: form.name.value,
      reply_to: form.email.value,
      subject: form.subject.value || "No Subject",
      message: form.msg.value,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setFormState("sent");
      setTimeout(() => {
        setFormState("idle");
        form.reset();
      }, 3000);
    } catch (error) {
      console.error("FAILED...", error);
      const reason = error?.text || error?.message || "Unknown EmailJS error";
      setFormState("idle");
      alert(`Message failed to send. ${reason}`);
    }
  }

  const isLightTheme = theme === "light";

  return (
    <>
      <GlobalStyles />
      <CustomCursor />

      <div className="page-shell">

      {/* ── NAV ── */}
      <nav>
        <a href="#hero" className="nav-logo">
          <img
            src="https://cdn.colorexpertsbd.com/wp-content/uploads/2018/05/011_1.jpg"
            alt="Logo"
            className="nav-logo-icon"
          />
          <span className="nav-logo-text">Abhyodhya<em>.</em></span>
        </a>
        <ul className="nav-links">
          {["about","skills","projects","experience","contact"].map(s => (
            <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${isLightTheme ? "dark" : "light"} mode`}
            aria-pressed={isLightTheme}
            title={`Switch to ${isLightTheme ? "dark" : "light"} mode`}
          >
            {isLightTheme ? <Moon size={18} weight="bold" /> : <Sun size={18} weight="bold" />}
          </button>
          <a 
          href="https://drive.google.com/file/d/1W_D2ieM8UwQcTUMdAL-A7g0p_uAia0FG/view?usp=sharing" 
          download="Abhyodhya_Kumar_Resume.pdf"
          className="nav-cta" 
          style={{ background: "transparent", border: "1px solid var(--cyan)", color: "var(--cyan)" }}
          onClick={(e) => {
            // Optional: Add a click animation
            animate(e.currentTarget, { scale: 0.95, duration: 150, easing: "easeOutQuad" })
              .then(() => animate(e.currentTarget, { scale: 1, duration: 150, easing: "easeOutQuad" }));
          }}
          >
            Resume ↓
          </a>
          <a href="#contact" className="nav-cta">Hire Me →</a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={menuOpen?{transform:"rotate(45deg) translate(5px,5px)"}:{}} />
            <span style={menuOpen?{opacity:0}:{}} />
            <span style={menuOpen?{transform:"rotate(-45deg) translate(5px,-5px)"}:{}} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <div className={`mob-nav ${menuOpen ? "open" : ""}`}>
        {["about","skills","projects","experience","contact"].map(s => (
          <a key={s} href={`#${s}`} onClick={closeMenu}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="hero" className="grid-bg">
        {/* orbs */}
        <div className="hero-orb" style={{width:560,height:560,background:"var(--cyan)",top:-160,right:-80,animationDelay:"0s"}} />
        <div className="hero-orb" style={{width:380,height:380,background:"var(--amber)",bottom:-80,left:-60,animationDelay:"-4.5s"}} />

        <div className="hero-inner" style={{maxWidth:1160,margin:"0 auto",width:"100%"}}>
          <div>
            <div className="hero-badge">
              <div className="badge-dot" />
              Open to internships &amp; collaborative projects
            </div>
            <h1 className="hero-name">
              <span className="line">Hey, I'm</span>
              <span className="line accent">Abhyodhya</span>
              <span className="line">Kumar</span>
            </h1>
            <p className="hero-role">Full Stack Developer · Data Enthusiast · Problem Solver</p>
            <p className="hero-desc">
              B.Tech CS student at KIIT University crafting full-stack web experiences, 
              turning raw data into insights, and building products people love to use.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects ↓</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </div>

          <div className="hero-card-wrap">
            <div className="hero-card">
              <div className="card-avatar">AK</div>
              <div className="card-name">Abhyodhya Kumar</div>
              <div className="card-role">B.Tech CSCE · KIIT University · 2027</div>
              <div className="card-stats">
                <div className="cstat"><span className="cstat-num">8.98</span><span className="cstat-lbl">GPA</span></div>
                <div className="cstat"><span className="cstat-num">3+</span><span className="cstat-lbl">Projects</span></div>
                <div className="cstat"><span className="cstat-num">97%</span><span className="cstat-lbl">Meta Certification</span></div>
              </div>
              <div className="card-tags">
                {["React","Python","Java","Node.js","Git"].map(t => <span key={t} className="ctag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-stage">
        <div className="section-wrap">
          <div className="section-label">About Me</div>
          <h2 className="section-title">CS student building<br />real-world solutions</h2>
          <div className="about-grid">
            <div>
              <p className="about-bio">
                I'm <span className="about-hi">Abhyodhya Kumar</span>, a B.Tech student in Computer Science &amp; Communication Engineering at <span className="about-hi">KIIT University</span> (GPA 8.98), graduating in 2027.
              </p>
              <p className="about-bio">
                I'm passionate about <span className="about-hi">full-stack web development</span>, data analysis, and building AI-powered products. From weather dashboards to career portals, I focus on writing clean code and creating meaningful user experiences.
              </p>
              <p className="about-bio">
                Beyond academics, I've competed in hackathons at Manipal University and KIIT, where I honed my ability to <span className="about-hi">design, build, and ship under pressure</span>. I'm driven by curiosity and a love for turning ideas into working products.
              </p>
              <a href="mailto:abhyodhyaoff2344@gmail.com" className="btn-primary" style={{marginTop:22,display:"inline-flex"}}>Get In Touch →</a>
            </div>
            <div className="value-cards">
              {[
                { icon:<Lightning size={18} />, title:"Fast Learner", desc:"97% on Meta's Front-End certificate. I absorb new technologies quickly and apply them in real projects." },
                { icon:<Target size={18} />, title:"Problem Solver", desc:"DSA-trained thinking combined with hands-on hackathon experience. I tackle hard problems systematically." },
                { icon:<ChartBar size={18} />, title:"Data Driven", desc:"Proficient in statistical analysis and visualization with Python, Pandas, Numpy, and Tableau." },
                { icon:<Handshake size={18} />, title:"Team Player", desc:"Proven collaboration through multi-day hackathons. I design workflows and help teammates ship." },
              ].map((v, i) => (
                <RevealDiv key={v.title} className="vcard" delay={`d${i}`}>
                  <div className="vcard-icon">{v.icon}</div>
                  <div>
                    <div className="vcard-title">{v.title}</div>
                    <div className="vcard-desc">{v.desc}</div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <div id="skills" className="skills-bg section-stage">
        <div className="section-wrap" style={{paddingTop:0,paddingBottom:0}}>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <div className="skills-grid">
            {SKILLS.map(s => <SkillCategory key={s.title} data={s} />)}
          </div>
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-stage">
        <div className="section-wrap">
          <div className="proj-header">
            <div>
              <div className="section-label">Portfolio</div>
              <h2 className="section-title" style={{marginBottom:0}}>Featured Projects</h2>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-outline">GitHub Profile →</a>
          </div>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => {
              const isExpanded = expandedProject === p.title;
              return (
              <RevealDiv key={p.title} className="proj-card" delay={`d${i % 3}`}>
                <div className="proj-top">
                  <div className="proj-icon" style={{background:p.iconBg}}>{p.icon}</div>
                  <div className="proj-links">
                    <a href={p.github} className="proj-link" title="GitHub">⌥</a>
                    <a href={p.live} className="proj-link" title="Live Demo">↗</a>
                  </div>
                </div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-stack">
                  {p.stack.map(t => <span key={t} className="stk-tag">{t}</span>)}
                </div>
                <div className="proj-actions">
                  <button
                    type="button"
                    className={`proj-details-btn ${isExpanded ? "active" : ""}`}
                    onClick={() => setExpandedProject(isExpanded ? null : p.title)}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle details for ${p.title}`}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                </div>
                <div className={`proj-details-panel ${isExpanded ? "open" : ""}`}>
                  <div className="proj-details-summary">{p.details.summary}</div>

                  <div className="project-detail-box">
                    <div className="project-detail-label">Challenge</div>
                    <div className="project-detail-copy">{p.details.challenge}</div>
                  </div>

                  <div className="project-detail-box">
                    <div className="project-detail-label">How I Solved It</div>
                    <div className="project-detail-copy">{p.details.solution}</div>
                  </div>

                  <div className="project-detail-label" style={{ marginTop: 8 }}>Key Outcomes</div>
                  <div className="project-inline-points">
                    {p.details.impact.map((point) => (
                      <div key={point} className="project-inline-point">{point}</div>
                    ))}
                  </div>
                </div>
              </RevealDiv>
            );})}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <div className="section-stage" style={{background:"var(--bg2)",padding:"0"}}>
        <div className="section-wrap">
          <div className="section-label">Credentials</div>
          <h2 className="section-title">Certifications &amp; Training</h2>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <RevealDiv key={c.title} className="cert-card" delay={`d${i}`}>
                <div className="cert-score">{c.score}</div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-org">{c.org}</div>
                <div className="cert-desc">{c.desc}</div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE / EDUCATION ── */}
      <section id="experience" className="section-stage">
        <div className="section-wrap">
          <div className="section-label">Background</div>
          <h2 className="section-title">Education &amp;<br />Hackathons</h2>
          <div className="exp-grid">
            <RevealDiv>
              <div className="exp-sec-title">Education</div>
              <div className="tl">
                {EDUCATION.map((e, i) => (
                  <div className="tl-item" key={e.title}>
                    <div className="tl-left">
                      <div className="tl-dot" style={i===0?{}:{background: i===1?"var(--amber)":"var(--rose)",boxShadow:`0 0 10px rgba(${i===1?"255,179,71":"255,107,138"},0.3)`}} />
                      {i < EDUCATION.length - 1 && <div className="tl-line" />}
                    </div>
                    <div className="tl-content">
                      <div className="tl-date">{e.date}</div>
                      <div className="tl-title">{e.title}</div>
                      <div className="tl-org">{e.org}</div>
                      <div className="tl-desc">{e.desc}</div>
                      <div className="tl-pct"><Trophy size={13} /> {e.pct}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealDiv>
            <RevealDiv delay="d1">
              <div className="exp-sec-title">Hackathons</div>
              <div className="tl">
                {HACKATHONS.map((h, i) => (
                  <div className="tl-item" key={h.title}>
                    <div className="tl-left">
                      <div className="tl-dot" style={i===0?{background:"var(--amber)",boxShadow:"0 0 10px rgba(255,179,71,0.3)"}:{background:"var(--rose)",boxShadow:"0 0 10px rgba(255,107,138,0.3)"}} />
                      {i < HACKATHONS.length - 1 && <div className="tl-line" />}
                    </div>
                    <div className="tl-content">
                      <div className="tl-date">{h.date}</div>
                      <div className="tl-title">{h.title}</div>
                      <div className="tl-org">{h.org}</div>
                      <div className="tl-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra activities */}
              <div style={{marginTop:36,padding:24,background:"var(--surface)",borderRadius:"var(--r)",border:"1px solid var(--border)"}}>
                <div style={{fontFamily:"var(--ff-head)",fontSize:15,fontWeight:700,marginBottom:14}}>Core Skills Snapshot</div>
                {[
                  { label:"Languages", val:"C · Java · Python" },
                  { label:"Frontend", val:"HTML · CSS · JavaScript · React.js" },
                  { label:"Frameworks", val:"React · Pandas · NumPy · Matplotlib" },
                  { label:"Tools", val:"Git · VS Code · Canva · MS Office 365" },
                  { label:"Design", val:"Canva · Figma (basics)" },
                ].map(r => (
                  <div key={r.label} style={{display:"flex",gap:12,marginBottom:9,fontSize:13.5}}>
                    <span style={{color:"var(--text3)",minWidth:90,flexShrink:0}}>{r.label}</span>
                    <span style={{color:"var(--text2)"}}>{r.val}</span>
                  </div>
                ))}
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-stage" style={{background:"var(--bg2)"}}>
        <div className="section-wrap">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's Build Something<br />Together</h2>
          <div className="contact-grid">
            <RevealDiv>
              <div className="contact-title">Open to opportunities</div>
              <p className="contact-text">
                Whether it's an internship, freelance project, open-source collaboration, or just a technical conversation — I'm always happy to connect. I usually respond within 24 hours.
              </p>
              <div className="c-links">
                <a href="mailto:abhyodhyaoff2344@gmail.com" className="c-link">
                  <div className="c-link-icon"><EnvelopeSimple size={16} /></div>
                  <div>
                    <div className="c-link-lbl">Email</div>
                    <div className="c-link-val">abhyodhyaoff2344@gmail.com</div>
                  </div>
                  <span style={{color:"var(--text3)",marginLeft:"auto"}}>↗</span>
                </a>
                <a href="tel:+919430576250" className="c-link">
                  <div className="c-link-icon"><Phone size={16} /></div>
                  <div>
                    <div className="c-link-lbl">Phone</div>
                    <div className="c-link-val">+91 9430576250</div>
                  </div>
                  <span style={{color:"var(--text3)",marginLeft:"auto"}}>↗</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-icon"><LinkedinLogo size={16} /></div>
                  <div>
                    <div className="c-link-lbl">LinkedIn</div>
                    <div className="c-link-val">linkedin.com/in/abhyodhya</div>
                  </div>
                  <span style={{color:"var(--text3)",marginLeft:"auto"}}>↗</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-icon"><GithubLogo size={16} /></div>
                  <div>
                    <div className="c-link-lbl">GitHub</div>
                    <div className="c-link-val">github.com/abhyodhya</div>
                  </div>
                  <span style={{color:"var(--text3)",marginLeft:"auto"}}>↗</span>
                </a>
                <a href="https://instagram.com/abhyodhya" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-icon"><InstagramLogo size={16} /></div>
                  <div>
                    <div className="c-link-lbl">Instagram</div>
                    <div className="c-link-val">instagram.com/abhyodhya</div>
                  </div>
                  <span style={{color:"var(--text3)",marginLeft:"auto"}}>↗</span>
                </a>
              </div>
            </RevealDiv>
            <RevealDiv delay="d1">
              <form className="cf" onSubmit={handleSubmit}>
                <div className="frow">
                  <div className="fg">
                    <label className="fl" htmlFor="name">Name</label>
                    <input id="name" className="fi" type="text" placeholder="Your name" required />
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="email">Email</label>
                    <input id="email" className="fi" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="subject">Subject</label>
                  <input id="subject" className="fi" type="text" placeholder="Internship, project collab..." />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="msg">Message</label>
                  <textarea id="msg" className="fta" placeholder="Tell me about what you're working on..." required />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={
                    formState === "sent"
                      ? { background: "#4ade80", boxShadow: "0 0 28px rgba(74,222,128,0.3)" }
                      : formState === "error"
                        ? { background: "#ef4444", boxShadow: "0 0 28px rgba(239,68,68,0.25)" }
                        : {}
                  }
                  disabled={formState === "sending"}
                >
                  {formState === "idle" && "Send Message ↑"}
                  {formState === "sending" && "Sending…"}
                  {formState === "sent" && "Message Sent ✓"}
                  {formState === "error" && "Config/Send Failed ✕"}
                </button>
              </form>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-in">
          <a href="#hero" className="footer-logo">Abhyodhya<em>.</em></a>
          <p className="footer-copy">© 2026 Abhyodhya Kumar · Built with React &amp; passion</p>
          <div className="footer-soc">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="fsoc" title="GitHub"><GithubLogo size={16} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="fsoc" title="LinkedIn"><LinkedinLogo size={16} /></a>
            <a href="https://instagram.com/abhyodhya" target="_blank" rel="noreferrer" className="fsoc" title="Instagram"><InstagramLogo size={16} /></a>
            <a href="mailto:abhyodhyaoff2344@gmail.com" className="fsoc" title="Email"><EnvelopeSimple size={16} /></a>
            <a href="tel:+919430576250" className="fsoc" title="Phone"><Phone size={16} /></a>
          </div>
        </div>
      </footer>

      </div>
    </>
  );
}
