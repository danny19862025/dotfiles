# NixOS Cheatsheet — Danny's Setup

## Applying config changes

```bash
cd /etc/nixos
sudo nixos-rebuild switch --flake .#nixos
```

Every change to any file below only takes effect after running this.

---

## Where to edit things

| What you want to change | File to edit |
|---|---|
| System packages, users, boot, networking | `sudo nvim /etc/nixos/configuration.nix` |
| Flake inputs (nixpkgs, zen-browser, home-manager) | `sudo nvim /etc/nixos/flake.nix` |
| git identity, zsh, starship, ghostty, neovim | `sudo nvim /etc/nixos/home.nix` |
| Hyprland | `sudo nvim /etc/nixos/dotfiles/hypr/hyprland.conf` |
| Waybar — what shows | `sudo nvim /etc/nixos/dotfiles/waybar/config.jsonc` |
| Waybar — how it looks | `sudo nvim /etc/nixos/dotfiles/waybar/style.css` |

**Golden rule:** never edit files directly inside `~/.config/` for anything
in the table above — they're symlinks into the read-only Nix store now.
Always edit the source under `/etc/nixos/`, then rebuild.

---

## Updating flake inputs

```bash
sudo nix flake update                       # bump ALL inputs
sudo nix flake lock --update-input <name>   # bump just one, e.g. zen-browser
```

---

## Health checks

```bash
# Confirm a flake input's "follows" actually worked (shared nixpkgs, no duplication)
cat /etc/nixos/flake.lock | grep -A15 '"nixpkgs_2":'

# home-manager status/logs
systemctl status home-manager-danny.service
journalctl -u home-manager-danny.service -n 40 --no-pager

# Confirm home-manager actually symlinked something (look for the "->" arrow)
ls -la ~/.config/hypr

# Confirm git identity is resolving from home-manager, not a stray file
git config --global user.email
```

---

## WireGuard / NetworkManager conflict

If `wg-quick-wg0.service` shows up as failed after a rebuild:

```bash
sudo bat /etc/nixos/configuration.nix | grep -A3 wg-quick
```

If that block is present, delete it (it conflicts with NetworkManager,
which already owns wg0 on this machine) and rebuild. Then confirm:

```bash
systemctl status wg-quick-wg0.service   # should say "could not be found"
nmcli connection show                    # NetworkManager still owns wg0
sudo wg show                             # tunnel still connected
```

---

## Git / dotfiles repo (github.com/danny19862025/dotfiles)

This repo tracks your home directory (`~`) directly.

```bash
cd ~
git status
git add <file>
git commit -m "message"
git push
```

Auth is via SSH key, not password/token — set up once already:

```bash
cat ~/.ssh/id_ed25519.pub   # public key, already added to GitHub
```

---

## Waybar fast-iteration (styling preview only)

```bash
killall waybar && waybar &
```

Only shows already-rebuilt changes — not a substitute for the real
rebuild, just a faster way to preview CSS tweaks before committing to
a full `nixos-rebuild switch`.

---

## Things to remember about this setup

- Two flake inputs beyond nixpkgs: `zen-browser` and `home-manager`,
  both use `inputs.nixpkgs.follows = "nixpkgs"` to avoid duplicate
  nixpkgs downloads/builds.
- `home-manager.backupFileExtension = "backup"` is set in `flake.nix` —
  if home-manager ever finds a pre-existing file in its way, it renames
  it to `filename.backup` instead of failing. Check for `.backup` files
  after big home.nix changes in case old customizations need merging in.
- You're on GNOME day-to-day, not Hyprland — NetworkManager is required
  for GNOME's WiFi settings panel, so it can't be removed even though
  Hyprland/Waybar configs exist in the repo too.
