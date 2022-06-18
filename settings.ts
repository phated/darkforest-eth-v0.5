import { AdminPlanets, Contracts, Initializers } from '@darkforest_eth/settings';
// HRE stuff
import 'hardhat/types/runtime';
import * as path from 'path';
import resolvePackage from 'resolve-package-path';

declare module 'hardhat/types/runtime' {
  interface HardhatSettings {
    contracts: Contracts;

    darkforest: {
      initializers: Initializers;
      adminPlanets: AdminPlanets;
    }
  }

  interface HardhatRuntimeEnvironment {
    DEPLOYER_MNEMONIC: string | undefined;
    ADMIN_PUBLIC_ADDRESS: string | undefined;

    packageDirs: {
      '@darkforest_eth/contracts': string;
      '@darkforest_eth/snarks': string;
    };
  }
}

// Resolve workspace package directories
export function resolvePackageDir(pkg: string) {
  const contractsPkg = resolvePackage(pkg, __dirname);
  if (!contractsPkg) {
    throw new Error(`Unable to find the ${pkg} package. Exiting...`);
  }
  return path.dirname(contractsPkg);
}
