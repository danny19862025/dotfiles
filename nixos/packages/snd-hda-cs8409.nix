{ stdenv, lib, fetchgit, kernel }:

let
  kernelVersion = kernel.modDirVersion;
in stdenv.mkDerivation {
  pname = "snd-hda-codec-cs8409";
  version = "6.18-1";

  src = fetchgit {
    url = "https://github.com/davidjo/snd_hda_macbookpro.git";
    rev = "cb27cc483f4fe98be03a4f4bef466c00aa7d244b";
    sha256 = "sha256-I1wueOMaYvdF80LdH8gua1h5sgmiD7oU9flNbutESkk=";
  };

  nativeBuildInputs = kernel.moduleBuildDependencies;

  postPatch = ''
    mkdir -p build
    cp -r --no-preserve=mode,ownership \
      ${kernel.dev}/lib/modules/${kernelVersion}/build/source/sound/hda \
      build/hda

    hda_dir=build/hda

    cp makefiles/Makefile          $hda_dir/Makefile
    cp makefiles/Makefile_common   $hda_dir/common/Makefile
    cp makefiles/Makefile_codecs   $hda_dir/codecs/Makefile
    cp makefiles/Makefile_cirrus   $hda_dir/codecs/cirrus/Makefile
    
    cp patch_cirrus/cirrus_apple.h                  $hda_dir/codecs/cirrus
    cp patch_cirrus/patch_cirrus_boot84.h            $hda_dir/codecs/cirrus
    cp patch_cirrus/patch_cirrus_new84.h             $hda_dir/codecs/cirrus
    cp patch_cirrus/patch_cirrus_real84.h            $hda_dir/codecs/cirrus
    cp patch_cirrus/patch_cirrus_hda_generic_copy.h  $hda_dir/codecs/cirrus
    cp patch_cirrus/patch_cirrus_real84_i2c.h        $hda_dir/codecs/cirrus

    # The kernel's own sound/hda/codecs/cirrus only ships cs8409.h, not
    # cs8409.c - the driver repo provides the base cs8409.c itself, which
    # the .diff files expect to find renamed to cs8409.c.orig before patching.
    cp patch_cirrus/cs8409.c  $hda_dir/codecs/cirrus/cs8409.c
    cp patch_cirrus/cs8409.h  $hda_dir/codecs/cirrus/cs8409.h

    pushd $hda_dir/codecs/cirrus
    cp cs8409.c cs8409.c.orig
    cp cs8409.h cs8409.h.orig
    popd

    pushd $hda_dir
    patch -p1 < ../../patch_cs8409.c.diff
    patch -p1 < ../../patch_cs8409.h.diff
    popd

  '';

   buildPhase = ''
    runHook preBuild
    make -C ${kernel.dev}/lib/modules/${kernelVersion}/build \
      M=$(pwd)/build/hda \
      KERNELRELEASE=${kernelVersion} \
      modules
    runHook postBuild
  '';
 
    installPhase = ''
    runHook preInstall
    installdir=$out/lib/modules/${kernelVersion}/updates/codecs/cirrus
    mkdir -p $installdir
    find build/hda -name 'snd-hda-codec-cs8409.ko*' -exec cp {} $installdir \;
    runHook postInstall
  '';

  meta = {
    description = "Cirrus Logic CS8409 HDA codec driver for 2016/2017 MacBook Pro speakers";
    homepage = "https://github.com/davidjo/snd_hda_macbookpro";
    platforms = lib.platforms.linux;
  };
}
