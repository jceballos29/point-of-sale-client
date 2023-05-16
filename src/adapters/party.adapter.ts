import { Party, PartyResponse } from "@/types";

export const partiesAdapter = (response: PartyResponse[]) => {
  const result: Party[] = response.map((party: PartyResponse) => {
    return {
      id: party._id,
      name: party.name,
    };
  });

  return result;
}