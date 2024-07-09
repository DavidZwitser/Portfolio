{
  description = "Portfolio shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    pkgs = import nixpkgs {system = "aarch64-darwin"; };
  in {
    devShells.aarch64-darwin.default = pkgs.mkShell {

      buildInputs = with pkgs.elmPackages; [
        elm
        elm-live
        elm-format
      ];

    };
  };
}
