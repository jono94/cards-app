import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cardTemplatesApi,
  CreateCardTemplateData,
  UpdateCardTemplateData,
} from "@/src/api/CardTemplates/api";

export const cardTemplateQueryKeys = {
  all: ["cardTemplates"] as const,
  list: () => [...cardTemplateQueryKeys.all, "list"] as const,
  details: (uuid: string) => [...cardTemplateQueryKeys.all, uuid] as const,
};

export const useCardTemplateQueries = () => {
  const queryClient = useQueryClient();

  /// LIST
  const useListCardTemplatesQuery = () => {
    return useQuery({
      queryKey: cardTemplateQueryKeys.list(),
      queryFn: cardTemplatesApi.listCardTemplates,
    });
  };

  /// GET
  const useGetCardTemplateQuery = (uuid: string) => {
    return useQuery({
      queryKey: cardTemplateQueryKeys.details(uuid),
      queryFn: () => cardTemplatesApi.getCardTemplate(uuid),
    });
  };

  /// CREATE
  const useCreateCardTemplateMutation = () => {
    return useMutation({
      mutationFn: (data: CreateCardTemplateData) => cardTemplatesApi.createCardTemplate(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cardTemplateQueryKeys.list() });
      },
    });
  };

  /// UPDATE
  const useUpdateCardTemplateMutation = () => {
    return useMutation({
      mutationFn: (data: UpdateCardTemplateData) => cardTemplatesApi.updateCardTemplate(data),
      onSuccess: (data, variables: UpdateCardTemplateData) => {
        queryClient.invalidateQueries({ queryKey: cardTemplateQueryKeys.list() });
        queryClient.invalidateQueries({
          queryKey: cardTemplateQueryKeys.details(variables.cardTemplateId),
        });
      },
    });
  };

  /// DELETE
  const useDeleteCardTemplateMutation = () => {
    return useMutation({
      mutationFn: (cardTemplateId: string) => cardTemplatesApi.deleteCardTemplate(cardTemplateId),
      onSuccess: (data, cardTemplateId: string) => {
        queryClient.invalidateQueries({ queryKey: cardTemplateQueryKeys.list() });
        queryClient.removeQueries({ queryKey: cardTemplateQueryKeys.details(cardTemplateId) });
      },
    });
  };

  return {
    useListCardTemplatesQuery,
    useGetCardTemplateQuery,
    useCreateCardTemplateMutation,
    useUpdateCardTemplateMutation,
    useDeleteCardTemplateMutation,
  };
};
