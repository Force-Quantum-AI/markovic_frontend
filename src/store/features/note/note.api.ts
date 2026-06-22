import { baseApi } from "../../api/baseApi";

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNoteOfCase: builder.query({
        query: ({caseId}:{
            caseId: string,
        })=>({
            url: `/cases/${caseId}/notes/`,
            method: "GET",
        }),
        providesTags: ["case"]
    }),
    addNewNoteInCase: builder.mutation({
        query: ({caseId, payload}:{
            caseId: string,
            payload: {
                title: string,
                content: string
            }
        })=>({
            url: `/cases/${caseId}/notes/`,
            method: "POST",
            body: payload
        }),
        invalidatesTags: ["case"]
    }),
    updateNoteInCase: builder.mutation({
        query: ({caseId, noteId, payload}:{
            caseId: string,
            noteId: number,
            payload: {
                title: string,
                content: string
            }
        })=>({
            url: `/cases/${caseId}/notes/${noteId}/`,
            method: "PATCH",
            body: payload
        }),
        invalidatesTags: ["case"]
    }),
    deleteNoteInCase: builder.mutation({
        query: ({caseId, noteId}:{
            caseId: string,
            noteId: number,
        })=>({
            url: `/cases/${caseId}/notes/${noteId}/`,
            method: "DELETE",
        }),
        invalidatesTags: ["case"]
    })
  }),
});

export const {
    useGetNoteOfCaseQuery,
    useAddNewNoteInCaseMutation,
    useUpdateNoteInCaseMutation,
    useDeleteNoteInCaseMutation,
} = noteApi;
