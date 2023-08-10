import { useMutation } from "react-query";
import { deletePiezoReport } from "../utils/reportsMutations";

// const queryClient = useQueryClient()
export const useDeletePiezoReport = () =>
  useMutation(deletePiezoReport, {
    // onSuccess: ()=> queryClient.invalidateQueries()
  });
