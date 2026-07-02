# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment

- OS: NixOS (Linux)
- Shell: zsh with starship prompt, zsh-autosuggestions, zsh-syntax-highlighting
- NIX_PATH: `nixpkgs=/nix/var/nix/profiles/per-user/root/channels/nixpkgs`
- Local scripts: `~/.local/bin` is on PATH

## snd_hda_macbookpro — Cirrus CS8409 Kernel Driver

A Linux kernel HDA audio driver for MacBooks with Cirrus CS8409 chips. Supports MAX98706, SSM3515, and TAS5764L amplifiers only.

### Build & Install

```bash
# Build driver against running kernel
make

# Install (run as root)
sudo make install

# Full install via script (handles kernel version detection, pre/post 6.17)
sudo ./install.cirrus.driver.sh

# DKMS install (auto-rebuilds on kernel updates)
sudo ./install.cirrus.driver.sh -i

# DKMS remove
sudo ./install.cirrus.driver.sh -r
```

### Kernel version notes

- Kernel ≥ 6.17: use `install.cirrus.driver.sh` (new source layout, new files in `patch_cirrus/`)
- Kernel < 6.17: use `install.cirrus.driver.pre617.sh` directly
- The install script auto-detects and dispatches to the correct variant

### Build flags

Defined in `Makefile`. Two modes:
- **Normal**: `APPLE_PINSENSE_FIXUP`, `APPLE_CODECS`, `CONFIG_SND_HDA_RECONFIG=1`
- **Debug**: adds `CONFIG_SND_DEBUG=1`, `MYSOUNDDEBUGFULL`

To enable debug build, uncomment the debug `KBUILD_EXTRA_CFLAGS` line in `Makefile` and comment out the normal one.

### Delete driver

```bash
sudo rm /lib/modules/$(uname -r)/updates/snd-hda-codec-cs8409.ko
sudo depmod -a
```
