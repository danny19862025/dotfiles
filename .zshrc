source /run/current-system/sw/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /run/current-system/sw/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

export NIX_PATH=nixpkgs=/nix/var/nix/profiles/per-user/root/channels/nixpkgs

eval "$(starship init zsh)"

# Import colorscheme from 'wal'
if [ -f ~/.cache/wal/sequences ]; then
    cat ~/.cache/wal/sequences
fi

# Add local scripts to PATH
export PATH="$HOME/.local/bin:$PATH"
