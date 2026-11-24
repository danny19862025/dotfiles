# Danny's NixOS & Dotfiles

[![NixOS 26.05](https://img.shields.io/badge/NixOS-26.05-5277C3?style=flat-square&logo=nixos&logoColor=white)](https://nixos.org/)
[![Home Manager](https://img.shields.io/badge/Home%20Manager-Flake-769ff0?style=flat-square&logo=nixos&logoColor=white)](https://github.com/nix-community/home-manager)
[![Hyprland](https://img.shields.io/badge/WM-Hyprland%20%2B%20GNOME-33ccff?style=flat-square&logo=hyprland&logoColor=white)](https://hyprland.org/)
[![k3s Homelab](https://img.shields.io/badge/Homelab-k3s%20Agent-FFC61C?style=flat-square&logo=k3s&logoColor=black)](https://k3s.io/)
[![Website](https://img.shields.io/badge/Website-Live%20Docs-ff99c8?style=flat-square&logo=githubpages&logoColor=white)](https://danny19862025.github.io/dotfiles/)

Personal **NixOS Flakes**, **Home Manager**, **Hyprland / GNOME** desktop dotfiles, and **k3s homelab** node configuration.

> **Live Website:** [danny19862025.github.io/dotfiles](https://danny19862025.github.io/dotfiles/)

---

## Hosts

| Host | Role | OS / Channel | Desktop / Runtime | Networking |
| :--- | :--- | :--- | :--- | :--- |
| **`nixos`** | Primary workstation / daily driver | NixOS `26.05` + Home Manager | GNOME (GDM) + Hyprland | NetworkManager, Tailscale, WireGuard |
| **`asus-worker`** | Homelab Kubernetes worker node | NixOS `26.05` (Flake) | Headless + `k3s` agent | Static LAN (`192.168.0.11`), OpenSSH |

---

## Highlights & Stack

- **Declarative System & User Config**: Split cleanly between [`configuration.nix`](./configuration.nix) (system-wide) and [`home.nix`](./home.nix) (user-level via Home Manager). See [`CONFIG-VS-HOME.md`](./CONFIG-VS-HOME.md) for the breakdown.
- **Shell & Prompt**: `zsh` with `zsh-autosuggestions`, `zsh-syntax-highlighting`, `fastfetch` on startup, `bat` aliased to `cat`, and a custom powerline [Starship prompt](./.config/starship.toml).
- **Terminal**: [Ghostty](./home.nix) configured with **TokyoNight Moon**, `0.85` opacity, and `FantasqueSansM Nerd Font Mono`, alongside Kitty themes.
- **Desktop & Rice**:
  - **GNOME** for day-to-day stability (with NetworkManager & GDM).
  - **Hyprland** setup with Pywal colors, smooth bezier animations, rounded blurred windows, vertical right-side **Waybar**, **Wofi / Rofi**, **Wlogout**, **SwayNC**, **Hyprpaper**, **Hypridle**, and **Hyprlock**.
- **Browsers & Tools**: Zen Browser (via flake input), Brave, Firefox, Neovim (default editor), tmux, btop, htop, Claude Code.
- **Automated Backups**: Systemd user timers running `rclone` syncs from `~/Documents` to `NixosBackup:NixosBackup`.
- **Custom Hardware Packaging**: Includes a Nix derivation ([`packages/snd-hda-cs8409.nix`](./packages/snd-hda-cs8409.nix)) for the Cirrus Logic CS8409 HDA speaker driver on 2016/2017 MacBook Pro hardware.
- **Homelab (`asus-worker`)**: Declarative NixOS `k3s` agent joining the control plane at `192.168.0.10:6443` with firewall rules for SSH (`22/tcp`), kubelet (`10250/tcp`), and Flannel VXLAN (`8472/udp`).

---

## Repository Structure

```text
.
├── flake.nix                  # Main NixOS + Home Manager + Zen Browser flake
├── configuration.nix          # System-wide NixOS config (nixos host)
├── hardware-configuration.nix # Hardware scan for nixos host
├── home.nix                   # Home Manager config (zsh, starship, ghostty, neovim, dotfiles)
├── dotfiles/                  # Home Manager managed configs (~/.config/*)
│   ├── hypr/                  # Hyprland, hyprpaper, hypridle, hyprlock
│   ├── waybar/                # Vertical right-side Waybar config & styling
│   ├── rofi/                  # Rofi launcher & clipboard menu
│   ├── wofi/                  # Wofi drun launcher styling
│   └── wlogout/               # Power menu layout, CSS & icons
├── asus-worker/               # Homelab k3s worker node flake & config
│   ├── flake.nix
│   ├── configuration.nix
│   └── hardware-configuration.nix
├── packages/
│   └── snd-hda-cs8409.nix     # Cirrus CS8409 MacBook Pro audio kernel module
├── .config/                   # Additional configs (starship.toml, kitty, ghostty, btop, htop, quickshell, gtk)
├── docs/                      # Static showcase website (GitHub Pages)
├── CHEATSHEET.md              # Day-to-day NixOS rebuild, health-check & git cheatsheet
├── CONFIG-VS-HOME.md          # Quick reference: configuration.nix vs home.nix
└── CLAUDE.md                  # Environment & CS8409 driver build notes
```

---

## Quick Start

### Rebuild Primary Workstation (`nixos`)

```bash
cd /etc/nixos
sudo nixos-rebuild switch --flake .#nixos
```

### Rebuild Homelab Worker (`asus-worker`)

```bash
cd /etc/nixos
sudo nixos-rebuild switch --flake ./asus-worker#asus-worker
```

### Update Flake Inputs

```bash
# Update all inputs
sudo nix flake update

# Update a single input (e.g. zen-browser)
sudo nix flake lock --update-input zen-browser
```

> **Golden Rule:** Never edit symlinked files directly inside `~/.config/` for Home Manager–managed configs. Always edit the source under `/etc/nixos/` and rebuild.

---

## Hyprland Keybindings (Highlights)

| Keybinding | Action |
| :--- | :--- |
| `Super + Q` | Open Ghostty terminal |
| `Super + C` | Close active window |
| `Super + E` | Open Thunar file manager |
| `Super + R` / `Super + Space` | Application launcher (`wofi` / `rofi`) |
| `Super + V` | Toggle floating / Clipboard history (`cliphist` + `rofi`) |
| `Super + Arrows` | Move focus between windows |
| `Super + Shift + Arrows` | Move active window |
| `Print` | Region screenshot (`grim` + `slurp` -> `~/Pictures/screenshot.png`) |
| `Super + Escape` | Exit Hyprland session |

---

## Documentation & Guides

- **[Interactive Website](./docs/index.html)** — Browse hosts, stack, keybindings, and cheatsheets at [danny19862025.github.io/dotfiles](https://danny19862025.github.io/dotfiles/)
- **[CHEATSHEET.md](./CHEATSHEET.md)** — Rebuild workflow, WireGuard/NetworkManager notes, and health checks
- **[CONFIG-VS-HOME.md](./CONFIG-VS-HOME.md)** — Deciding what goes in `configuration.nix` vs `home.nix`
- **[CLAUDE.md](./CLAUDE.md)** — Environment summary and Cirrus CS8409 kernel driver build steps

---

## Publishing the Website (GitHub Pages)

The static site lives in [`docs/`](./docs/) and includes a GitHub Actions workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml).

To enable it on GitHub:
1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (or **Deploy from a branch** → `master` → `/docs`).
3. Push to `master` — your site will publish at `https://danny19862025.github.io/dotfiles/`.
