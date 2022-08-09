import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import type { WalletModuleFactory } from "@near-wallet-selector/core";
import type {
  RecommendedWalletsModule,
  RecommendedWalletsParams,
} from "./recommended-wallets.types";

export const setupRecommendedWallets = (
  params: RecommendedWalletsParams
): Array<WalletModuleFactory> => {
  const modules: Array<RecommendedWalletsModule> = [
    {
      id: "my-near-wallet",
      module: setupMyNearWallet(params.wallets["my-near-wallet"]),
    },
    {
      id: "ledger",
      module: setupLedger(params.wallets["ledger"]),
    },
    {
      id: "wallet-connect",
      module: setupWalletConnect(params.wallets["wallet-connect"]),
    },
  ];

  if (params.whitelist && params.whitelist.length > 0) {
    const filteredModules = modules.filter(({ id }) =>
      params.whitelist!.includes(id)
    );
    return filteredModules.map((m) => m.module);
  }

  return modules.map((m) => m.module);
};
