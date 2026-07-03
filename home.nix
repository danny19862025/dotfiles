
{ config, pkgs, ... }:

{
  home.stateVersion = "26.05";

  home.packages = with pkgs; [
    fastfetch
    btop
  ];

  programs.git = {
    enable = true;
    userName = "Danny";
    userEmail = "danny.rudd@icloud.com";
  };

  # --- Shell ---
  programs.zsh = {
    enable = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    shellAliases = {
      ll = "ls -la";
      cat = "bat";
    };
    initContent = ''
      fastfetch
    '';
  };

  programs.starship = {
    enable = true;
    enableZshIntegration = true;
  };

  # --- Terminal ---
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

  # --- Editor ---
  programs.neovim = {
    enable = true;
    defaultEditor = true;
    viAlias = true;
    vimAlias = true;
  };

   #---hyprland---
home.file.".config/hypr" = {
  source = ./dotfiles/hypr;
  recursive = true;
};
home.file.".config/waybar" = {
  source = ./dotfiles/waybar;
  recursive = true;
};
home.file.".config/rofi" = {
  source = ./dotfiles/rofi;
  recursive = true;
};
home.file.".config/wofi" = {
  source = ./dotfiles/wofi;
  recursive = true;
};
home.file.".config/wlogout" = {
  source = ./dotfiles/wlogout;
  recursive = true;
};
}
