{
  description = "Danny NixOS config";

inputs = {
  nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  zen-browser = {
    url = "github:youwen5/zen-browser-flake";
    inputs.nixpkgs.follows = "nixpkgs";
  };
};

outputs = { self, nixpkgs, zen-browser, home-manager, ... }:
  {
    nixosConfigurations.nixos = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        {
          environment.systemPackages = [
            zen-browser.packages.x86_64-linux.default
          ];
        }
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
}
