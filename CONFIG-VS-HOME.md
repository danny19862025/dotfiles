# configuration.nix vs home.nix — Quick Reference

## The one question to ask

**"Does this affect every user on the machine, or just me?"**

- Every user / whole machine → `configuration.nix`
- Just your account → `home.nix`

Both files are still active. home-manager did NOT replace configuration.nix —
it just took over a category of config (personal dotfiles/app settings)
that configuration.nix was never really meant for.

---

## Installing a package — two ways, pick based on scope

**System-wide** (every user on the machine can run it):
```nix
# in /etc/nixos/configuration.nix
environment.systemPackages = with pkgs; [
  htop
  brave
];
```

**Just for your user** (only you get it, only in your shell/session):
```nix
# in /etc/nixos/home.nix
home.packages = with pkgs; [
  htop
];
```

For a single-user desktop like this one, system-wide is usually simpler
and the difference barely matters. User-level packages matter more once
you have multiple real users on one machine, or want a package available
in home-manager's own generation without touching the system generation.

---

## Quick examples of what goes where

| Task | File |
|---|---|
| Install a new app/package | `configuration.nix` (usually) |
| Change your shell prompt/aliases | `home.nix` |
| Add a new system user | `configuration.nix` |
| Change your git name/email | `home.nix` |
| Enable a system service (ssh, docker) | `configuration.nix` |
| Change your terminal theme/font | `home.nix` |
| Set hostname, timezone, locale | `configuration.nix` |
| Edit Hyprland/Waybar config | `home.nix` (via dotfiles/ passthrough) |
| Set up WiFi, firewall, networking | `configuration.nix` |

---

## Applying changes — same command either way

```bash
cd /etc/nixos
sudo nixos-rebuild switch --flake .#nixos
```

One rebuild command applies changes from BOTH files together — you don't
run separate commands for configuration.nix vs home.nix changes.
