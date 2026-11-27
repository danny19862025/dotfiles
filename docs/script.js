/* Cosmic Showcase Interactions, Slide-In Animations & Live Config Explorer (No Countdown / No Typing) */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
   * 1. Top Scroll Progress Bar
   * ----------------------------------------------------------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!progressBar) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
  }
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });

  /* -----------------------------------------------------------
   * 2. Immediate Staggered Slide-From-Right Hero Entrance
   * ----------------------------------------------------------- */
  const heroSteps = Array.from(document.querySelectorAll('[data-hero-step]')).sort(
    (a, b) => Number(a.dataset.heroStep) - Number(b.dataset.heroStep)
  );

  if (prefersReducedMotion) {
    heroSteps.forEach((el) => el.classList.add('is-shown'));
  } else {
    requestAnimationFrame(() => {
      heroSteps.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('is-shown');
        }, 60 + idx * 85);
      });
    });
  }

  /* -----------------------------------------------------------
   * 3. Scroll-Triggered Slide-From-Right Reveals
   * ----------------------------------------------------------- */
  const slideItems = document.querySelectorAll('.slide-from-right');
  if (prefersReducedMotion) {
    slideItems.forEach((el) => el.classList.add('in-view'));
  } else {
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          slideObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    slideItems.forEach((el) => slideObserver.observe(el));
  }

  /* -----------------------------------------------------------
   * 4. Hero Quick-Rebuild Target Switcher
   * ----------------------------------------------------------- */
  const miniToggleBtns = document.querySelectorAll('[data-quick-host]');
  const quickPanels = document.querySelectorAll('[data-quick-panel]');
  miniToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.quickHost;
      miniToggleBtns.forEach((b) => {
        const active = b.dataset.quickHost === target;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });
      quickPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.quickPanel === target);
      });
    });
  });

  /* -----------------------------------------------------------
   * 5. Interactive Config Explorer & Live Theme Switcher
   * ----------------------------------------------------------- */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const THEMES = [
    {
      id: 'tokyonight',
      name: 'TokyoNight Moon',
      swatch: ['#161822', '#769ff0'],
      vars: {
        bg: '#161822',
        sidebar: '#1a1d2b',
        surface: '#222638',
        border: 'rgba(163, 174, 210, 0.16)',
        text: '#e3e7f5',
        muted: '#9aa5ce',
        accent: '#769ff0',
        accentSoft: 'rgba(118, 159, 240, 0.18)',
        accent2: '#33ccff',
        accent3: '#ff99c8',
        green: '#c3e88d',
        amber: '#ffc777',
      },
      palette: ['#1d2230', '#394260', '#769ff0', '#33ccff', '#ff99c8', '#a3aed2', '#c3e88d', '#ffc777'],
    },
    {
      id: 'orbit',
      name: 'Cosmic Violet',
      swatch: ['#0b0d17', '#a78bfa'],
      vars: {
        bg: '#0b0d17',
        sidebar: '#101322',
        surface: '#171b2e',
        border: 'rgba(167, 139, 250, 0.2)',
        text: '#f1f5f9',
        muted: '#94a3b8',
        accent: '#a78bfa',
        accentSoft: 'rgba(139, 92, 246, 0.2)',
        accent2: '#38bdf8',
        accent3: '#f472b6',
        green: '#34d399',
        amber: '#fbbf24',
      },
      palette: ['#0b0d17', '#1e1b4b', '#a78bfa', '#38bdf8', '#f472b6', '#94a3b8', '#34d399', '#fbbf24'],
    },
    {
      id: 'catppuccin',
      name: 'Catppuccin Mocha',
      swatch: ['#1e1e2e', '#cba6f7'],
      vars: {
        bg: '#1e1e2e',
        sidebar: '#181825',
        surface: '#313244',
        border: 'rgba(205, 214, 244, 0.15)',
        text: '#cdd6f4',
        muted: '#a6adc8',
        accent: '#cba6f7',
        accentSoft: 'rgba(203, 166, 247, 0.18)',
        accent2: '#89dceb',
        accent3: '#f5c2e7',
        green: '#a6e3a1',
        amber: '#f9e2af',
      },
      palette: ['#181825', '#313244', '#cba6f7', '#89dceb', '#f5c2e7', '#a6adc8', '#a6e3a1', '#f9e2af'],
    },
    {
      id: 'nord',
      name: 'Nord Frost',
      swatch: ['#2e3440', '#88c0d0'],
      vars: {
        bg: '#242933',
        sidebar: '#2e3440',
        surface: '#3b4252',
        border: 'rgba(216, 222, 233, 0.16)',
        text: '#eceff4',
        muted: '#9aa7bc',
        accent: '#88c0d0',
        accentSoft: 'rgba(136, 192, 208, 0.18)',
        accent2: '#81a1c1',
        accent3: '#b48ead',
        green: '#a3be8c',
        amber: '#ebcb8b',
      },
      palette: ['#2e3440', '#434c5e', '#88c0d0', '#81a1c1', '#b48ead', '#d8dee9', '#a3be8c', '#ebcb8b'],
    },
    {
      id: 'gruvbox',
      name: 'Gruvbox Dark',
      swatch: ['#282828', '#fabd2f'],
      vars: {
        bg: '#1d2021',
        sidebar: '#282828',
        surface: '#3c3836',
        border: 'rgba(235, 219, 178, 0.15)',
        text: '#ebdbb2',
        muted: '#a89984',
        accent: '#fabd2f',
        accentSoft: 'rgba(250, 189, 47, 0.18)',
        accent2: '#83a598',
        accent3: '#d3869b',
        green: '#b8bb26',
        amber: '#fe8019',
      },
      palette: ['#282828', '#504945', '#fabd2f', '#83a598', '#d3869b', '#a89984', '#b8bb26', '#fe8019'],
    },
    {
      id: 'rosepine',
      name: 'Rosé Pine',
      swatch: ['#191724', '#ebbcba'],
      vars: {
        bg: '#191724',
        sidebar: '#1f1d2e',
        surface: '#26233a',
        border: 'rgba(224, 222, 244, 0.15)',
        text: '#e0def4',
        muted: '#908caa',
        accent: '#c4a7e7',
        accentSoft: 'rgba(196, 167, 231, 0.18)',
        accent2: '#9ccfd8',
        accent3: '#ebbcba',
        green: '#31748f',
        amber: '#f6c177',
      },
      palette: ['#1f1d2e', '#403d52', '#c4a7e7', '#9ccfd8', '#ebbcba', '#908caa', '#31748f', '#f6c177'],
    },
  ];

  const SIM_FILES = [
    {
      id: 'ghostty',
      tabLabel: 'Ghostty',
      name: 'ghostty — fastfetch',
      path: '~/dotfiles · ghostty (0.85 opacity)',
      tag: 'tty',
      color: '#38bdf8',
      meta: 'ghostty · 0.85 opacity',
      copyText: 'fastfetch',
      isTerminal: true,
    },
    {
      id: 'flake',
      tabLabel: 'flake.nix',
      name: 'flake.nix',
      path: '/etc/nixos/flake.nix',
      tag: 'nix',
      color: '#a78bfa',
      meta: 'NixOS 26.05 Flake',
      desc: 'Main workstation flake wiring nixpkgs 26.05, Zen Browser, and Home Manager.',
      raw: `{
  description = "Danny NixOS config";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    zen-browser = {
      url = "github:youwen5/zen-browser-flake";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, zen-browser, home-manager, ... }: {
    nixosConfigurations.nixos = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        { environment.systemPackages = [ zen-browser.packages.x86_64-linux.default ]; }
        home-manager.nixosModules.home-manager
        {
          home-manager.useGlobalPkgs = true;
          home-manager.useUserPackages = true;
          home-manager.backupFileExtension = "backup";
          home-manager.users.danny = import ./home.nix;
        }
      ];
    };
  };
}`,
    },
    {
      id: 'home',
      tabLabel: 'home.nix',
      name: 'home.nix',
      path: '/etc/nixos/home.nix',
      tag: 'hm',
      color: '#f472b6',
      meta: 'Home Manager 26.05',
      desc: 'Declarative Zsh, Starship, Ghostty terminal, Neovim default editor, and Hyprland dotfile symlinks.',
      raw: `{ config, pkgs, ... }:
{
  home.stateVersion = "26.05";
  home.packages = with pkgs; [ fastfetch btop ];

  programs.zsh = {
    enable = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    shellAliases = { ll = "ls -la"; cat = "bat"; };
    initContent = "fastfetch";
  };

  programs.starship = { enable = true; enableZshIntegration = true; };

  programs.ghostty = {
    enable = true;
    settings = {
      theme = "TokyoNight Moon";
      background-opacity = 0.85;
      font-family = "FantasqueSansM Nerd Font Mono";
      font-size = 16;
      window-width = 110;
      window-height = 45;
    };
  };

  programs.neovim = { enable = true; defaultEditor = true; viAlias = true; vimAlias = true; };

  home.file.".config/hypr"    = { source = ./dotfiles/hypr;    recursive = true; };
  home.file.".config/waybar"  = { source = ./dotfiles/waybar;  recursive = true; };
  home.file.".config/rofi"    = { source = ./dotfiles/rofi;    recursive = true; };
  home.file.".config/wofi"    = { source = ./dotfiles/wofi;    recursive = true; };
  home.file.".config/wlogout" = { source = ./dotfiles/wlogout; recursive = true; };
}`,
    },
    {
      id: 'worker',
      tabLabel: 'asus-worker',
      name: 'asus-worker/configuration.nix',
      path: '/etc/nixos/asus-worker/configuration.nix',
      tag: 'k3s',
      color: '#fbbf24',
      meta: 'Homelab k3s Agent',
      desc: 'Headless NixOS 26.05 worker node with static IPv4, strict firewall ports, and k3s agent join.',
      raw: `{ config, lib, pkgs, ... }:
{
  networking.hostName = "asus-worker";
  networking.useDHCP = false;
  networking.interfaces.enp2s0.ipv4.addresses = [{
    address = "192.168.0.11";
    prefixLength = 24;
  }];
  networking.defaultGateway = "192.168.0.1";
  networking.nameservers = [ "192.168.0.10" "1.1.1.1" ];

  networking.firewall = {
    enable = true;
    allowedTCPPorts = [ 22 10250 ];
    allowedUDPPorts = [ 8472 ]; # Flannel VXLAN
  };

  services.openssh = {
    enable = true;
    settings.PermitRootLogin = "no";
  };

  services.k3s = {
    enable = true;
    role = "agent";
    serverAddr = "https://192.168.0.10:6443";
    tokenFile = "/etc/k3s-token";
    extraFlags = toString [ "--node-name=asus-worker" ];
  };
}`,
    },
    {
      id: 'hypr',
      tabLabel: 'hyprland.conf',
      name: 'dotfiles/hypr/hyprland.conf',
      path: '/etc/nixos/dotfiles/hypr/hyprland.conf',
      tag: 'wm',
      color: '#34d399',
      meta: 'Hyprland Wayland',
      desc: 'Keybindings, bezier curves, 2-pass blur, rounded corners, and gradient borders.',
      raw: `# Hyprland Rice Highlights (symlinked via Home Manager)
$mainMod = SUPER

decoration {
  rounding = 15
  blur {
    enabled = true
    passes = 2
  }
}

# Core Workflows
bind = $mainMod, Q, exec, ghostty
bind = $mainMod, C, killactive,
bind = $mainMod, E, exec, thunar
bind = $mainMod, R, exec, wofi --show drun
bind = $mainMod, SPACE, exec, rofi -show drun
bind = $mainMod, V, exec, cliphist list | rofi -dmenu | cliphist decode | wl-copy
bind = , Print, exec, grim -g "$(slurp)" ~/Pictures/screenshot.png`,
    },
    {
      id: 'audio',
      tabLabel: 'cs8409.nix',
      name: 'packages/snd-hda-cs8409.nix',
      path: '/etc/nixos/packages/snd-hda-cs8409.nix',
      tag: 'drv',
      color: '#fb7185',
      meta: 'MacBook Pro Driver',
      desc: 'Custom out-of-tree Nix kernel module derivation for Cirrus Logic CS8409 speaker audio.',
      raw: `# Custom MacBook Pro (2016/2017) Cirrus CS8409 HDA Kernel Module
# Built reproducibly against the active NixOS kernel headers
{
  package = "packages/snd-hda-cs8409.nix";
  target  = "MacBookPro13,x / 14,x Cirrus Logic CS8409";
  stack   = "PipeWire + ALSA 32-bit + PulseAudio shim";
  boot    = "systemd-boot EFI + extraModulePackages";
}`,
    },
  ];

  let activeThemeId = 'tokyonight';
  let activeFileId = 'ghostty';
  let filterQuery = '';

  const simWindow = document.getElementById('dotfiles-sim');
  const themePillsEl = document.getElementById('theme-pills');
  const activeThemeNameEl = document.getElementById('active-theme-name');
  const simTabsEl = document.getElementById('sim-tabs');
  const simFileListEl = document.getElementById('sim-file-list');
  const simContentEl = document.getElementById('sim-content');
  const simSwatchesEl = document.getElementById('sim-swatches');
  const simPathEl = document.getElementById('sim-current-path');
  const simMetaTagEl = document.getElementById('sim-meta-tag');
  const simStatusLeftEl = document.getElementById('sim-status-left');
  const simFilterInput = document.getElementById('sim-filter-input');
  const simCopyBtn = document.getElementById('sim-copy-btn');

  function highlightNix(raw) {
    return escapeHtml(raw).replace(
      /(#[^\n]*)|("(?:[^"\\]|\\.)*")|\b(true|false|with|import|let|in|inherit)\b|\b(\d+(?:\.\d+)?)\b/g,
      (match, comment, str, kw, num) => {
        if (comment) return `<span class="tok-comment">${comment}</span>`;
        if (str) return `<span class="tok-str">${str}</span>`;
        if (kw) return `<span class="tok-kw">${kw}</span>`;
        if (num) return `<span class="tok-num">${num}</span>`;
        return match;
      }
    );
  }

  function applyTheme(themeId) {
    activeThemeId = themeId;
    const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
    if (simWindow) {
      Object.entries(theme.vars).forEach(([k, v]) => {
        const cssVar = `--sim-${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`;
        simWindow.style.setProperty(cssVar, v);
      });
    }
    if (activeThemeNameEl) activeThemeNameEl.textContent = theme.name;
    if (simSwatchesEl) {
      simSwatchesEl.innerHTML = theme.palette
        .map((hex) => `<span style="background:${hex}" title="${hex}"></span>`)
        .join('');
    }
    renderThemePills();
    renderSimStatus();
  }

  function renderThemePills() {
    if (!themePillsEl) return;
    themePillsEl.innerHTML = THEMES.map((t) => {
      const active = t.id === activeThemeId ? ' active' : '';
      return `
        <button type="button" class="theme-pill-btn${active}" data-theme-id="${t.id}">
          <span class="theme-dot" style="background:linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)"></span>
          <span>${t.name}</span>
        </button>
      `;
    }).join('');
    themePillsEl.querySelectorAll('[data-theme-id]').forEach((btn) => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.themeId));
    });
  }

  function renderSimTabs() {
    if (!simTabsEl) return;
    simTabsEl.innerHTML = SIM_FILES.slice(0, 5)
      .map((f) => {
        const active = f.id === activeFileId ? ' active' : '';
        return `<button type="button" class="sim-tab${active}" role="tab" aria-selected="${f.id === activeFileId}" data-sim-file="${f.id}">${f.tabLabel}</button>`;
      })
      .join('');
    simTabsEl.querySelectorAll('[data-sim-file]').forEach((btn) => {
      btn.addEventListener('click', () => selectSimFile(btn.dataset.simFile));
    });
  }

  function renderSimFileList() {
    if (!simFileListEl) return;
    const q = filterQuery.trim().toLowerCase();
    const visible = SIM_FILES.filter(
      (f) => !q || f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q)
    );
    if (!visible.length) {
      simFileListEl.innerHTML = `<div style="padding:0.65rem;font-size:0.74rem;color:var(--sim-muted)">No matching files</div>`;
      return;
    }
    simFileListEl.innerHTML = visible
      .map((f) => {
        const active = f.id === activeFileId ? ' active' : '';
        return `
          <button type="button" class="sim-file-btn${active}" data-sim-file="${f.id}">
            <span class="sim-file-left">
              <span class="sim-file-dot" style="background:${f.color}"></span>
              <span class="sim-file-name">${f.name}</span>
            </span>
            <span class="sim-file-tag">${f.tag}</span>
          </button>
        `;
      })
      .join('');
    simFileListEl.querySelectorAll('[data-sim-file]').forEach((btn) => {
      btn.addEventListener('click', () => selectSimFile(btn.dataset.simFile));
    });
  }

  function renderSimContent() {
    if (!simContentEl) return;
    const file = SIM_FILES.find((f) => f.id === activeFileId) || SIM_FILES[0];
    if (simPathEl) simPathEl.textContent = file.path;
    if (simMetaTagEl) simMetaTagEl.textContent = file.meta;

    if (file.isTerminal) {
      simContentEl.innerHTML = `
        <div class="starship-line">
          <span class="seg seg-os">  NixOS </span>
          <span class="seg seg-dir"> ~/dotfiles </span>
          <span class="seg seg-git">  master </span>
          <span class="seg seg-time">  26.05 </span>
        </div>
        <div class="prompt-cmd"><span class="prompt-arrow">❯</span>fastfetch</div>
        <div class="fetch-grid">
          <pre class="nix-ascii" aria-hidden="true">   ▗▄▄▖ ▗▄▄▖
  ▗▘  ▝▙▘  ▝▖
 ▗▘ ▗▄▄▖ ▗▄▄▖
 ▝▖ ▝▘ ▝▖▝▘ ▝
  ▝▖  ▗▛▖  ▗▘
   ▝▀▀▘ ▝▀▀▘</pre>
          <dl class="fetch-specs">
            <div><dt>OS</dt><dd>NixOS 26.05 (x86_64-linux)</dd></div>
            <div><dt>Hosts</dt><dd>nixos · asus-worker</dd></div>
            <div><dt>DE / WM</dt><dd>GNOME (GDM) + Hyprland</dd></div>
            <div><dt>Shell</dt><dd>zsh + starship + bat</dd></div>
            <div><dt>Terminal</dt><dd>Ghostty · FantasqueSansM (16pt)</dd></div>
            <div><dt>Editor</dt><dd>Neovim (default)</dd></div>
            <div><dt>Network</dt><dd>Tailscale · WireGuard · OpenSSH</dd></div>
            <div><dt>Cluster</dt><dd>k3s agent (192.168.0.11 → .10:6443)</dd></div>
            <div><dt>Backups</dt><dd>rclone systemd timers → NixosBackup</dd></div>
          </dl>
        </div>
      `;
    } else {
      simContentEl.innerHTML = `
        <div class="code-preview-head">
          <div>
            <div class="code-preview-title">${escapeHtml(file.name)}</div>
            <div class="code-preview-desc">${escapeHtml(file.desc)}</div>
          </div>
          <span class="sim-speed-pill">${escapeHtml(file.tag.toUpperCase())}</span>
        </div>
        <pre class="code-preview-pre">${highlightNix(file.raw)}</pre>
      `;
    }
  }

  function renderSimStatus() {
    if (!simStatusLeftEl) return;
    const theme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];
    const file = SIM_FILES.find((f) => f.id === activeFileId) || SIM_FILES[0];
    simStatusLeftEl.textContent = `${SIM_FILES.length} tracked views · Viewing: ${file.name} · Theme: ${theme.name}`;
  }

  function selectSimFile(fileId) {
    activeFileId = fileId;
    renderSimTabs();
    renderSimFileList();
    renderSimContent();
    renderSimStatus();
  }

  simFilterInput?.addEventListener('input', (e) => {
    filterQuery = e.target.value || '';
    renderSimFileList();
  });

  simCopyBtn?.addEventListener('click', async () => {
    const file = SIM_FILES.find((f) => f.id === activeFileId) || SIM_FILES[0];
    const text = file.copyText || file.raw || file.path;
    try {
      await navigator.clipboard.writeText(text);
      const label = simCopyBtn.querySelector('span');
      if (label) {
        const orig = label.textContent;
        label.textContent = 'Copied!';
        setTimeout(() => {
          label.textContent = orig;
        }, 1600);
      }
    } catch {
      /* ignore clipboard denial */
    }
  });

  applyTheme('tokyonight');
  selectSimFile('ghostty');

  /* -----------------------------------------------------------
   * 6. Stack Bento Category Filter
   * ----------------------------------------------------------- */
  const stackFilterBtns = document.querySelectorAll('[data-stack-filter]');
  const stackCards = document.querySelectorAll('[data-stack-cat]');

  stackFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.stackFilter || 'all';
      stackFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      stackCards.forEach((card) => {
        const show = cat === 'all' || card.dataset.stackCat === cat;
        card.classList.toggle('hidden-card', !show);
        if (show) card.classList.add('in-view');
      });
    });
  });

  /* -----------------------------------------------------------
   * 7. Managed Hosts Switcher
   * ----------------------------------------------------------- */
  const hostBtns = document.querySelectorAll('[data-host]');
  const hostPanels = document.querySelectorAll('[data-host-panel]');
  hostBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.host;
      hostBtns.forEach((b) => {
        const active = b.dataset.host === target;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });
      hostPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.hostPanel === target);
      });
    });
  });

  /* -----------------------------------------------------------
   * 8. Cheatsheet Category Filter + Live Search
   * ----------------------------------------------------------- */
  const cheatFilterBtns = document.querySelectorAll('[data-cheat-filter]');
  const cheatSearchInput = document.getElementById('cheat-search');
  const cheatRows = document.querySelectorAll('.cheat-row');
  let activeCheatCat = 'all';

  function applyCheatFilter() {
    const q = (cheatSearchInput?.value || '').trim().toLowerCase();
    cheatRows.forEach((row) => {
      const matchCat = activeCheatCat === 'all' || row.dataset.cat === activeCheatCat;
      const matchText = !q || row.textContent.toLowerCase().includes(q);
      row.classList.toggle('hidden', !(matchCat && matchText));
    });
  }

  cheatFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCheatCat = btn.dataset.cheatFilter || 'all';
      cheatFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      applyCheatFilter();
    });
  });
  cheatSearchInput?.addEventListener('input', applyCheatFilter);

  /* -----------------------------------------------------------
   * 9. Universal Copy Buttons
   * ----------------------------------------------------------- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      if (!text) return;
      const span = btn.querySelector('span') || btn;
      const original = span.textContent;
      try {
        await navigator.clipboard.writeText(text);
        span.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          span.textContent = original;
          btn.classList.remove('copied');
        }, 1700);
      } catch {
        span.textContent = 'Failed';
        setTimeout(() => {
          span.textContent = original;
        }, 1500);
      }
    });
  });
})();
