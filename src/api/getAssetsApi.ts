import { map } from "rxjs/operators";
import { get$ } from "../services/restApi";
import { Asset } from "../types/Asset";

export const getAssets = () =>
  get$<Asset[]>(
    "https://rest.coinapi.io/v1/assets?apikey=82965B7D-F4C7-4705-976A-1304BED10522"
  ).pipe(map((response) => response));
