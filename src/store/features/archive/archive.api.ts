import { baseApi } from "../../api/baseApi";

interface IArchiveParams {
  search?: string,
  case_name?: string,
  year?: number,
  page_size?: number,
  page?: number,
  category?: string,
  sub_category?: string,
  court?: string,
  responsible?: string,
}

export const archiveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArchivedCases: builder.query<any, IArchiveParams | void>({ 
      query: (params) => ({
        url: `/cases/archived/`,
        method: "GET",
        params: params || undefined
      }),
      providesTags: ["archive"],
    }),
    getArchiveCaseDetails: builder.query<any, {id: string}>({
      query: ({id})=>({
          url: `/cases/archived/${id}/`,
          method: "GET",
        }
      ),
      providesTags: ["archive"],
    }),
    deleteArchiveCase: builder.mutation<any, {id: string}>({
      query: ({id})=>({
        url: `/cases/archived/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["archive"],
    }),
  }),
});

export const {
   useGetAllArchivedCasesQuery,
   useGetArchiveCaseDetailsQuery,
   useDeleteArchiveCaseMutation
} = archiveApi;
