/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddBlockToPageRequest {
  /** @format uuid */
  pageId?: string;
  data?: string | null;
  isExample?: string | null;
  /** @format int32 */
  type?: number;
  /** @format uuid */
  afterBlockId?: string | null;
}

export interface AddProfessorRequest {
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  photo?: string | null;
  link?: string | null;
  position?: string | null;
  /** @format uuid */
  adminId?: string;
  /** @format uuid */
  programId?: string | null;
}

export interface AddProfessorToProgramRequest {
  /** @format uuid */
  professorId?: string;
  /** @format uuid */
  programId?: string;
  /** @format uuid */
  afterProfessorId?: string | null;
  /** @format uuid */
  adminId?: string;
}

export interface AddProgramAdminRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  programId?: string;
  /** @format uuid */
  adminId?: string;
}

export interface AddProgramRequest {
  name?: string | null;
  menu?: string | null;
}

export interface AddReviewRequest {
  /** @format uuid */
  programId?: string;
  content?: string | null;
}

export interface AddSkillRequest {
  name?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface AddSkillToUserRequest {
  /** @format uuid */
  skillId?: string;
  /** @format uuid */
  userId?: string;
}

export interface AddSkillToWorkRequest {
  /** @format uuid */
  skillId?: string;
  /** @format uuid */
  workId?: string;
}

export interface AddTagRequest {
  name?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface AddTagToWorkRequest {
  /** @format uuid */
  tagId?: string;
  /** @format uuid */
  workId?: string;
}

export interface AddWorkRequest {
  /** @format uuid */
  programId?: string;
  title?: string | null;
  description?: string | null;
  mainPhotoUrl?: string | null;
  additionalPhotoUrls?: string | null;
  tags?: string | null;
  /** @format int32 */
  course?: number;
}

export interface BlockResponse {
  /** @format uuid */
  id?: string;
  data?: string | null;
  isExample?: string | null;
  /** @format int32 */
  type?: number;
  /** @format uuid */
  nextBlockId?: string | null;
  /** @format uuid */
  previousBlockId?: string | null;
  form?: FormResponse;
}

export interface ChangeBlockPositionRequest {
  /** @format uuid */
  blockId?: string;
  /** @format uuid */
  afterBlockId?: string | null;
}

export interface ChangeProfessorProgramPositionRequest {
  /** @format uuid */
  professorId?: string;
  /** @format uuid */
  programId?: string;
  /** @format uuid */
  afterProfessorId?: string | null;
  /** @format uuid */
  adminId?: string;
}

export interface CreateStudentProfileRequest {
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  email?: string | null;
  /** @format int32 */
  yearOfStudyStart?: number | null;
  /** @format uuid */
  programId?: string | null;
}

export interface EditBlockRequest {
  /** @format uuid */
  id?: string;
  data?: string | null;
  isExample?: string | null;
  /** @format int32 */
  type?: number;
}

export interface EditProgramRequest {
  /** @format uuid */
  id?: string;
  name?: string | null;
  menu?: string | null;
  isActive?: boolean;
}

export interface FormRequest {
  /** @format uuid */
  blockId?: string;
  data?: string | null;
}

export interface FormResponse {
  /** @format uuid */
  id?: string;
  data?: string | null;
  date?: string | null;
  isHidden?: boolean;
  /** @format uuid */
  blockId?: string;
}

export interface FormsResponse {
  forms?: FormResponse[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface GetFormsRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  programId?: string | null;
  /** @format uuid */
  blockId?: string | null;
  includeHidden?: boolean;
  /** @format int32 */
  pageNumber?: number | null;
  /** @format int32 */
  pageSize?: number | null;
}

export interface GetPageRequest {
  /** @format uuid */
  programId?: string;
  includeExample?: boolean;
}

export interface GetProfessorsRequest {
  /** @format uuid */
  programId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  /** @format int32 */
  pageNumber?: number | null;
  /** @format int32 */
  pageSize?: number | null;
}

export interface GetProfilesRequest {
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format uuid */
  programId?: string | null;
  searchQuery?: string | null;
}

export interface GetReviewsRequest {
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format uuid */
  programId?: string | null;
  /** @format uuid */
  userId?: string | null;
  /** @format date-time */
  dateFrom?: string | null;
  /** @format date-time */
  dateTo?: string | null;
}

export interface GetUsersRequest {
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  /** @format int32 */
  pageNumber?: number | null;
  /** @format int32 */
  pageSize?: number | null;
}

export interface GetUsersResponse {
  users?: UserResponse[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface GetWorksRequest {
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  year?: number | null;
  /** @format uuid */
  userId?: string | null;
  /** @format uuid */
  programId?: string | null;
  favorite?: boolean | null;
  showHidedWorks?: boolean;
}

export interface HideFormsRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  blockId?: string | null;
  formIds?: string[] | null;
  /** @format date-time */
  fromDate?: string | null;
  /** @format date-time */
  toDate?: string | null;
}

export interface HideProfileRequest {
  /** @format uuid */
  userId?: string;
}

export interface HideWorkRequest {
  /** @format uuid */
  workId?: string;
}

export interface LikeWorkRequest {
  /** @format uuid */
  workId?: string;
  /** @format uuid */
  userId?: string | null;
}

export interface PageResponse {
  /** @format uuid */
  id?: string;
  blocks?: BlockResponse[] | null;
}

export interface ProfessorResponse {
  /** @format uuid */
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  photo?: string | null;
  link?: string | null;
  position?: string | null;
}

export interface ProfessorsResponse {
  professors?: ProfessorResponse[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface ProfileResponse {
  /** @format uuid */
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  email?: string | null;
  /** @format int32 */
  yearOfStudyStart?: number | null;
  isActive?: boolean;
  skills?: SkillResponse[] | null;
}

export interface ProgramResponse {
  /** @format uuid */
  id?: string;
  name?: string | null;
  menu?: string | null;
  isActive?: boolean;
  pages?: PageResponse[] | null;
}

export interface RemoveFormsRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  blockId?: string | null;
  formIds?: string[] | null;
  /** @format date-time */
  fromDate?: string | null;
  /** @format date-time */
  toDate?: string | null;
}

export interface RemoveProfessorFromProgramRequest {
  /** @format uuid */
  professorId?: string;
  /** @format uuid */
  programId?: string;
  /** @format uuid */
  adminId?: string;
}

export interface RemoveProgramAdminRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  programId?: string;
  /** @format uuid */
  adminId?: string;
}

export interface RemoveSkillFromUserRequest {
  /** @format uuid */
  skillId?: string;
  /** @format uuid */
  userId?: string;
}

export interface RemoveSkillFromWorkRequest {
  /** @format uuid */
  skillId?: string;
  /** @format uuid */
  workId?: string;
}

export interface RemoveSkillRequest {
  /** @format uuid */
  id?: string | null;
  name?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface RemoveTagFromWorkRequest {
  /** @format uuid */
  tagId?: string;
  /** @format uuid */
  workId?: string;
}

export interface RemoveTagRequest {
  /** @format uuid */
  id?: string | null;
  name?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface ReviewResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  programId?: string;
  content?: string | null;
  /** @format date-time */
  createdDate?: string;
  isSelected?: boolean;
}

export interface ShowFormsRequest {
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  blockId?: string | null;
  formIds?: string[] | null;
  /** @format date-time */
  fromDate?: string | null;
  /** @format date-time */
  toDate?: string | null;
}

export interface ShowProfileRequest {
  /** @format uuid */
  userId?: string;
}

export interface ShowWorkRequest {
  /** @format uuid */
  workId?: string;
}

export interface SkillResponse {
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface TagResponse {
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UnlikeWorkRequest {
  /** @format uuid */
  workId?: string;
  /** @format uuid */
  userId?: string | null;
}

export interface UpdateProfessorRequest {
  /** @format uuid */
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  /** @format uuid */
  adminId?: string;
}

export interface UpdateProfileRequest {
  /** @format uuid */
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  email?: string | null;
  /** @format int32 */
  yearOfStudyStart?: number | null;
}

export interface UpdateSkillRequest {
  /** @format uuid */
  id?: string | null;
  oldName?: string | null;
  newName?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface UpdateStudentReviewsRequest {
  reviewIds?: string[] | null;
}

export interface UpdateTagRequest {
  /** @format uuid */
  id?: string | null;
  oldName?: string | null;
  newName?: string | null;
  /** @format uuid */
  programId?: string | null;
}

export interface UpdateWorkRequest {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  programId?: string;
  title?: string | null;
  description?: string | null;
  mainPhotoUrl?: string | null;
  additionalPhotoUrls?: string | null;
  tags?: string | null;
  /** @format int32 */
  course?: number;
}

export interface UserResponse {
  /** @format uuid */
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
}

export interface WorkResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  /** @format uuid */
  programId?: string;
  title?: string | null;
  description?: string | null;
  mainPhotoUrl?: string | null;
  additionalPhotoUrls?: string | null;
  tags?: string | null;
  /** @format date-time */
  publishDate?: string;
  /** @format int32 */
  course?: number;
  isHide?: boolean;
  tagList?: TagResponse[] | null;
  skillList?: SkillResponse[] | null;
  /** @format int32 */
  likesCount?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title lending_skills_backend
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Admins
     * @name AdminsAddAdminUpdate
     * @request PUT:/api/Admins/AddAdmin/{id}
     */
    adminsAddAdminUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Admins/AddAdmin/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admins
     * @name AdminsRemoveAdminUpdate
     * @request PUT:/api/Admins/RemoveAdmin/{id}
     */
    adminsRemoveAdminUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Admins/RemoveAdmin/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admins
     * @name AdminsGetAdminsList
     * @request GET:/api/Admins/GetAdmins
     */
    adminsGetAdminsList: (params: RequestParams = {}) =>
      this.request<UserResponse[], any>({
        path: `/api/Admins/GetAdmins`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admins
     * @name AdminsAddProgramAdminCreate
     * @request POST:/api/Admins/AddProgramAdmin
     */
    adminsAddProgramAdminCreate: (
      data: AddProgramAdminRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Admins/AddProgramAdmin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admins
     * @name AdminsRemoveProgramAdminCreate
     * @request POST:/api/Admins/RemoveProgramAdmin
     */
    adminsRemoveProgramAdminCreate: (
      data: RemoveProgramAdminRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Admins/RemoveProgramAdmin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admins
     * @name AdminsGetUsersCreate
     * @request POST:/api/Admins/GetUsers
     */
    adminsGetUsersCreate: (data: GetUsersRequest, params: RequestParams = {}) =>
      this.request<GetUsersResponse, any>({
        path: `/api/Admins/GetUsers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsAddFormCreate
     * @request POST:/api/Forms/AddForm
     */
    formsAddFormCreate: (data: FormRequest, params: RequestParams = {}) =>
      this.request<FormResponse, any>({
        path: `/api/Forms/AddForm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsGetFormsCreate
     * @request POST:/api/Forms/GetForms
     */
    formsGetFormsCreate: (data: GetFormsRequest, params: RequestParams = {}) =>
      this.request<FormsResponse, any>({
        path: `/api/Forms/GetForms`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsHideFormUpdate
     * @request PUT:/api/Forms/HideForm/{id}
     */
    formsHideFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Forms/HideForm/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsHideFormsCreate
     * @request POST:/api/Forms/HideForms
     */
    formsHideFormsCreate: (
      data: HideFormsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Forms/HideForms`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsShowFormUpdate
     * @request PUT:/api/Forms/ShowForm/{id}
     */
    formsShowFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Forms/ShowForm/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsShowFormsCreate
     * @request POST:/api/Forms/ShowForms
     */
    formsShowFormsCreate: (
      data: ShowFormsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Forms/ShowForms`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsRemoveFormDelete
     * @request DELETE:/api/Forms/RemoveForm/{id}
     */
    formsRemoveFormDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Forms/RemoveForm/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forms
     * @name FormsRemoveFormsCreate
     * @request POST:/api/Forms/RemoveForms
     */
    formsRemoveFormsCreate: (
      data: RemoveFormsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Forms/RemoveForms`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsGetProfessorsCreate
     * @request POST:/api/Professors/GetProfessors
     */
    professorsGetProfessorsCreate: (
      data: GetProfessorsRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProfessorsResponse, any>({
        path: `/api/Professors/GetProfessors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsAddProfessorCreate
     * @request POST:/api/Professors/AddProfessor
     */
    professorsAddProfessorCreate: (
      data: AddProfessorRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProfessorResponse, any>({
        path: `/api/Professors/AddProfessor`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsUpdateProfessorUpdate
     * @request PUT:/api/Professors/UpdateProfessor
     */
    professorsUpdateProfessorUpdate: (
      data: UpdateProfessorRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Professors/UpdateProfessor`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsRemoveProfessorFromProgramCreate
     * @request POST:/api/Professors/RemoveProfessorFromProgram
     */
    professorsRemoveProfessorFromProgramCreate: (
      data: RemoveProfessorFromProgramRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Professors/RemoveProfessorFromProgram`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsAddProfessorToProgramCreate
     * @request POST:/api/Professors/AddProfessorToProgram
     */
    professorsAddProfessorToProgramCreate: (
      data: AddProfessorToProgramRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Professors/AddProfessorToProgram`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Professors
     * @name ProfessorsChangeProfessorProgramPositionCreate
     * @request POST:/api/Professors/ChangeProfessorProgramPosition
     */
    professorsChangeProfessorProgramPositionCreate: (
      data: ChangeProfessorProgramPositionRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Professors/ChangeProfessorProgramPosition`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesGetProgramMainPageDetail
     * @request GET:/api/ProgramPages/GetProgramMainPage/{programId}
     */
    programPagesGetProgramMainPageDetail: (
      programId: string,
      params: RequestParams = {},
    ) =>
      this.request<ProgramResponse, any>({
        path: `/api/ProgramPages/GetProgramMainPage/${programId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesGetPageCreate
     * @request POST:/api/ProgramPages/GetPage
     */
    programPagesGetPageCreate: (
      data: GetPageRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProgramResponse, any>({
        path: `/api/ProgramPages/GetPage`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesAddBlockToPageCreate
     * @request POST:/api/ProgramPages/AddBlockToPage
     */
    programPagesAddBlockToPageCreate: (
      data: AddBlockToPageRequest,
      params: RequestParams = {},
    ) =>
      this.request<BlockResponse, any>({
        path: `/api/ProgramPages/AddBlockToPage`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesChangeBlockPositionCreate
     * @request POST:/api/ProgramPages/ChangeBlockPosition
     */
    programPagesChangeBlockPositionCreate: (
      data: ChangeBlockPositionRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ProgramPages/ChangeBlockPosition`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesEditBlockUpdate
     * @request PUT:/api/ProgramPages/EditBlock
     */
    programPagesEditBlockUpdate: (
      data: EditBlockRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ProgramPages/EditBlock`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesRemoveBlockDelete
     * @request DELETE:/api/ProgramPages/RemoveBlock/{id}
     */
    programPagesRemoveBlockDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ProgramPages/RemoveBlock/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesAddProgramCreate
     * @request POST:/api/ProgramPages/AddProgram
     */
    programPagesAddProgramCreate: (
      data: AddProgramRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProgramResponse, any>({
        path: `/api/ProgramPages/AddProgram`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesEditProgramUpdate
     * @request PUT:/api/ProgramPages/EditProgram
     */
    programPagesEditProgramUpdate: (
      data: EditProgramRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ProgramPages/EditProgram`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProgramPages
     * @name ProgramPagesDeleteProgramDelete
     * @request DELETE:/api/ProgramPages/DeleteProgram/{id}
     */
    programPagesDeleteProgramDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ProgramPages/DeleteProgram/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reviews
     * @name ReviewsGetReviewsCreate
     * @request POST:/api/Reviews/GetReviews
     */
    reviewsGetReviewsCreate: (
      data: GetReviewsRequest,
      params: RequestParams = {},
    ) =>
      this.request<ReviewResponse[], any>({
        path: `/api/Reviews/GetReviews`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reviews
     * @name ReviewsUpdateStudentReviewsUpdate
     * @request PUT:/api/Reviews/UpdateStudentReviews
     */
    reviewsUpdateStudentReviewsUpdate: (
      data: UpdateStudentReviewsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Reviews/UpdateStudentReviews`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reviews
     * @name ReviewsAddReviewCreate
     * @request POST:/api/Reviews/AddReview
     */
    reviewsAddReviewCreate: (
      data: AddReviewRequest,
      params: RequestParams = {},
    ) =>
      this.request<ReviewResponse, any>({
        path: `/api/Reviews/AddReview`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsGetSkillsList
     * @request GET:/api/Skills/GetSkills
     */
    skillsGetSkillsList: (params: RequestParams = {}) =>
      this.request<SkillResponse[], any>({
        path: `/api/Skills/GetSkills`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsAddSkillCreate
     * @request POST:/api/Skills/AddSkill
     */
    skillsAddSkillCreate: (data: AddSkillRequest, params: RequestParams = {}) =>
      this.request<SkillResponse, any>({
        path: `/api/Skills/AddSkill`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsUpdateSkillUpdate
     * @request PUT:/api/Skills/UpdateSkill
     */
    skillsUpdateSkillUpdate: (
      data: UpdateSkillRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/UpdateSkill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsRemoveSkillDelete
     * @request DELETE:/api/Skills/RemoveSkill
     */
    skillsRemoveSkillDelete: (
      data: RemoveSkillRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/RemoveSkill`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsAddSkillToWorkCreate
     * @request POST:/api/Skills/AddSkillToWork
     */
    skillsAddSkillToWorkCreate: (
      data: AddSkillToWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/AddSkillToWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsRemoveSkillFromWorkCreate
     * @request POST:/api/Skills/RemoveSkillFromWork
     */
    skillsRemoveSkillFromWorkCreate: (
      data: RemoveSkillFromWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/RemoveSkillFromWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsAddSkillToUserCreate
     * @request POST:/api/Skills/AddSkillToUser
     */
    skillsAddSkillToUserCreate: (
      data: AddSkillToUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/AddSkillToUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillsRemoveSkillFromUserCreate
     * @request POST:/api/Skills/RemoveSkillFromUser
     */
    skillsRemoveSkillFromUserCreate: (
      data: RemoveSkillFromUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Skills/RemoveSkillFromUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsGetTagsList
     * @request GET:/api/Tags/GetTags
     */
    tagsGetTagsList: (params: RequestParams = {}) =>
      this.request<TagResponse[], any>({
        path: `/api/Tags/GetTags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsAddTagCreate
     * @request POST:/api/Tags/AddTag
     */
    tagsAddTagCreate: (data: AddTagRequest, params: RequestParams = {}) =>
      this.request<TagResponse, any>({
        path: `/api/Tags/AddTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsUpdateTagUpdate
     * @request PUT:/api/Tags/UpdateTag
     */
    tagsUpdateTagUpdate: (data: UpdateTagRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Tags/UpdateTag`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsRemoveTagDelete
     * @request DELETE:/api/Tags/RemoveTag
     */
    tagsRemoveTagDelete: (data: RemoveTagRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Tags/RemoveTag`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsAddTagToWorkCreate
     * @request POST:/api/Tags/AddTagToWork
     */
    tagsAddTagToWorkCreate: (
      data: AddTagToWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Tags/AddTagToWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name TagsRemoveTagFromWorkCreate
     * @request POST:/api/Tags/RemoveTagFromWork
     */
    tagsRemoveTagFromWorkCreate: (
      data: RemoveTagFromWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Tags/RemoveTagFromWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersGetProfilesCreate
     * @request POST:/api/Users/GetProfiles
     */
    usersGetProfilesCreate: (
      data: GetProfilesRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProfileResponse[], any>({
        path: `/api/Users/GetProfiles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersGetProfileDetail
     * @request GET:/api/Users/GetProfile/{userId}
     */
    usersGetProfileDetail: (userId: string, params: RequestParams = {}) =>
      this.request<ProfileResponse, any>({
        path: `/api/Users/GetProfile/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreateStudentProfileCreate
     * @request POST:/api/Users/CreateStudentProfile
     */
    usersCreateStudentProfileCreate: (
      data: CreateStudentProfileRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProfileResponse, any>({
        path: `/api/Users/CreateStudentProfile`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdateProfileUpdate
     * @request PUT:/api/Users/UpdateProfile
     */
    usersUpdateProfileUpdate: (
      data: UpdateProfileRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Users/UpdateProfile`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersHideProfileCreate
     * @request POST:/api/Users/HideProfile
     */
    usersHideProfileCreate: (
      data: HideProfileRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Users/HideProfile`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersShowProfileCreate
     * @request POST:/api/Users/ShowProfile
     */
    usersShowProfileCreate: (
      data: ShowProfileRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Users/ShowProfile`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDeleteProfileDelete
     * @request DELETE:/api/Users/DeleteProfile/{userId}
     */
    usersDeleteProfileDelete: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/DeleteProfile/${userId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksGetWorksCreate
     * @request POST:/api/Works/GetWorks
     */
    worksGetWorksCreate: (data: GetWorksRequest, params: RequestParams = {}) =>
      this.request<WorkResponse[], any>({
        path: `/api/Works/GetWorks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksUpdateWorkUpdate
     * @request PUT:/api/Works/UpdateWork
     */
    worksUpdateWorkUpdate: (
      data: UpdateWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Works/UpdateWork`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksAddWorkCreate
     * @request POST:/api/Works/AddWork
     */
    worksAddWorkCreate: (data: AddWorkRequest, params: RequestParams = {}) =>
      this.request<WorkResponse, any>({
        path: `/api/Works/AddWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksHideWorkCreate
     * @request POST:/api/Works/HideWork
     */
    worksHideWorkCreate: (data: HideWorkRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Works/HideWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksShowWorkCreate
     * @request POST:/api/Works/ShowWork
     */
    worksShowWorkCreate: (data: ShowWorkRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Works/ShowWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksLikeWorkCreate
     * @request POST:/api/Works/LikeWork
     */
    worksLikeWorkCreate: (data: LikeWorkRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Works/LikeWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Works
     * @name WorksUnlikeWorkCreate
     * @request POST:/api/Works/UnlikeWork
     */
    worksUnlikeWorkCreate: (
      data: UnlikeWorkRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Works/UnlikeWork`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
