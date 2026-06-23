import { CaseDocument, DownloadDocumentResponse } from "@/types/case.types";
import { baseApi } from "../../api/baseApi";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentOfCase: builder.query<CaseDocument[], { caseId: string }>({
      query: ({ caseId }) => ({
        url: `/cases/${caseId}/documents/`,
        method: "GET",
      }),
      providesTags: ["case"],
    }),

    downloadCaseDocument: builder.mutation<
      DownloadDocumentResponse,
      { caseId: string; documentId: number }
    >({
      query: ({ caseId, documentId }) => ({
        url: `/cases/${caseId}/documents/${documentId}/download/`,
        method: "GET",
      }),
      // NOTE: this is a read-only fetch (no server-side mutation actually
      // happens), so it intentionally does NOT invalidate the "case" tag —
      // doing so would trigger a needless refetch of the whole document list
      // every time someone clicks "Download".
    }),

    // NOTE on the payload: a raw `File` cannot be JSON-serialized, so the
    // request body must be sent as `multipart/form-data` via `FormData`,
    // not as a plain JS object. We build the FormData here, inside the
    // endpoint's `query` function, so callers can keep passing a simple
    // `{ file, file_name }` object exactly as the original type declared —
    // fetchBaseQuery will detect the FormData body and let the browser set
    // the correct `Content-Type` (with boundary) automatically.
    uploadDocumentToCase: builder.mutation<
      CaseDocument,
      { caseId: string; payload: { file: File; file_name: string } }
    >({
      query: ({ caseId, payload }) => {
        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("file_name", payload.file_name);

        return {
          url: `/cases/${caseId}/documents/`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["case"],
    }),

    deleteDocumentFromCase: builder.mutation<
      void,
      { caseId: string; documentId: number }
    >({
      query: ({ caseId, documentId }) => ({
        url: `/cases/${caseId}/documents/${documentId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["case"],
    }),
  }),
});

export const {
  useGetDocumentOfCaseQuery,
  useDownloadCaseDocumentMutation,
  useUploadDocumentToCaseMutation,
  useDeleteDocumentFromCaseMutation,
} = documentApi;