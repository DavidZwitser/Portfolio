{
  description = "Portfolio shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      inherit (pkgs.elmPackages) elm elm-live elm-format elm-test;
    in {
      devShells.default = pkgs.mkShell {
        packages = [
          elm
          elm-live
          elm-format
          elm-test
        ];

        shellHook = ''
          ${elm-live} ./src/Main.elm
        '';
      };
    }
  );
}
