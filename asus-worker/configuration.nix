{ config, lib, pkgs, ... }:

{
  imports = [ ./hardware-configuration.nix ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  networking.hostName = "asus-worker";
  networking.useDHCP = false;
  networking.interfaces.enp2s0.useDHCP = false;
  networking.interfaces.enp2s0.ipv4.addresses = [{
    address = "192.168.0.11";
    prefixLength = 24;
  }];
  networking.defaultGateway = "192.168.0.1";
  networking.nameservers = [ "192.168.0.10" "1.1.1.1" ];

  networking.firewall = {
    enable = true;
    allowedTCPPorts = [ 22 10250 ];
    allowedUDPPorts = [ 8472 ];
  };

  time.timeZone = "Australia/Sydney";
  i18n.defaultLocale = "en_AU.UTF-8";

  users.users.danny = {
    isNormalUser = true;
    description = "Danny";
    extraGroups = [ "wheel" ];
    shell = pkgs.zsh;
    initialPassword = "changeme";
  };
  programs.zsh = {
    enable = true;
    autosuggestions.enable = true;
    syntaxHighlighting.enable = true;
    enableCompletion = true;
  };
  security.sudo.wheelNeedsPassword = true;

  services.openssh = {
    enable = true;
    settings.PermitRootLogin = "no";
    settings.PasswordAuthentication = true;
  };

services.k3s = {
  enable = true;
  role = "agent";
  serverAddr = "https://192.168.0.10:6443";
  tokenFile = "/etc/k3s-token";
  extraFlags = toString [
    "--node-name=asus-worker"
  ];
};

  environment.systemPackages = with pkgs; [
    vim
    git
    wget
    curl
    htop
    kubectl
fastfetch
btop
bat

  ];

  nix.settings.experimental-features = [ "nix-command" "flakes" ];

  system.stateVersion = "26.05";
}
