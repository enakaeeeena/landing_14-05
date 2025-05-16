import axios, { AxiosResponse } from 'axios';

// Базовый URL для API
const API_BASE_URL = '/api';

// Интерфейсы для DTO запросов и ответов
interface AddBlockToPageRequest {
  pageId: string;
  data: string;
  isExample: string;
  type: number;
  afterBlockId?: string | null;
}

interface AddProfessorRequest {
  firstName: string;
  lastName: string;
  patronymic?: string | null;
  photo?: string | null;
  link?: string | null;
  position: string;
  adminId: string;
  programId?: string | null;
}

interface AddProfessorToProgramRequest {
  professorId: string;
  programId: string;
  afterProfessorId?: string | null;
  adminId: string;
}

interface AddProgramAdminRequest {
  userId: string;
  programId: string;
  adminId: string;
}

interface AddProgramRequest {
  name: string;
  menu: string;
}

interface AddReviewRequest {
  programId: string;
  content: string;
}

interface AddSkillRequest {
  name: string;
  programId?: string | null;
}

interface AddSkillToUserRequest {
  skillId: string;
  userId: string;
}

interface AddSkillToWorkRequest {
  skillId: string;
  workId: string;
}

interface AddTagRequest {
  name: string;
  programId?: string | null;
}

interface AddTagToWorkRequest {
  tagId: string;
  workId: string;
}

interface AddWorkRequest {
  programId: string;
  title: string;
  description: string;
  mainPhotoUrl: string;
  additionalPhotoUrls: string;
  tags: string;
  course: number;
}

interface ChangeBlockPositionRequest {
  blockId: string;
  afterBlockId?: string | null;
}

interface ChangeProfessorProgramPositionRequest {
  professorId: string;
  programId: string;
  afterProfessorId?: string | null;
  adminId: string;
}

interface CreateStudentProfileRequest {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  yearOfStudyStart?: number | null;
  programId?: string | null;
}

interface EditBlockRequest {
  id: string;
  data: string;
  isExample: string;
  type: number;
}

interface EditProgramRequest {
  id: string;
  name: string;
  menu: string;
  isActive: boolean;
}

interface FormRequest {
  blockId: string;
  data: string;
}

interface GetFormsRequest {
  userId: string;
  programId?: string | null;
  blockId?: string | null;
  includeHidden: boolean;
  pageNumber?: number | null;
  pageSize?: number | null;
}

interface GetPageRequest {
  programId: string;
  includeExample: boolean;
}

interface GetProfessorsRequest {
  programId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
}

interface GetProfilesRequest {
  pageNumber: number;
  pageSize: number;
  programId?: string | null;
  searchQuery: string;
}

interface GetReviewsRequest {
  pageNumber: number;
  pageSize: number;
  programId?: string | null;
  userId?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}

interface GetUsersRequest {
  firstName?: string | null;
  lastName?: string | null;
  patronymic?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
}

interface GetWorksRequest {
  pageNumber: number;
  pageSize: number;
  year?: number | null;
  userId?: string | null;
  programId?: string | null;
  favorite?: boolean | null;
  showHidedWorks: boolean;
}

interface HideFormsRequest {
  userId: string;
  blockId?: string | null;
  formIds: string[];
  fromDate?: string | null;
  toDate?: string | null;
}

interface HideProfileRequest {
  userId: string;
}

interface HideWorkRequest {
  workId: string;
}

interface LikeWorkRequest {
  workId: string;
  userId?: string | null;
}

interface RemoveFormsRequest {
  userId: string;
  blockId?: string | null;
  formIds: string[];
  fromDate?: string | null;
  toDate?: string | null;
}

interface RemoveProfessorFromProgramRequest {
  professorId: string;
  programId: string;
  adminId: string;
}

interface RemoveProgramAdminRequest {
  userId: string;
  programId: string;
  adminId: string;
}

interface RemoveSkillRequest {
  id?: string | null;
  name: string;
  programId?: string | null;
}

interface RemoveSkillFromUserRequest {
  skillId: string;
  userId: string;
}

interface RemoveSkillFromWorkRequest {
  skillId: string;
  workId: string;
}

interface RemoveTagRequest {
  id?: string | null;
  name: string;
  programId?: string | null;
}

interface RemoveTagFromWorkRequest {
  tagId: string;
  workId: string;
}

interface ShowFormsRequest {
  userId: string;
  blockId?: string | null;
  formIds: string[];
  fromDate?: string | null;
  toDate?: string | null;
}

interface ShowProfileRequest {
  userId: string;
}

interface ShowWorkRequest {
  workId: string;
}

interface UnlikeWorkRequest {
  workId: string;
  userId?: string | null;
}

interface UpdateProfessorRequest {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  adminId: string;
}

interface UpdateProfileRequest {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  yearOfStudyStart?: number | null;
}

interface UpdateSkillRequest {
  id?: string | null;
  oldName: string;
  newName: string;
  programId?: string | null;
}

interface UpdateStudentReviewsRequest {
  reviewIds: string[];
}

interface UpdateTagRequest {
  id?: string | null;
  oldName: string;
  newName: string;
  programId?: string | null;
}

interface UpdateWorkRequest {
  id: string;
  programId: string;
  title: string;
  description: string;
  mainPhotoUrl: string;
  additionalPhotoUrls: string;
  tags: string;
  course: number;
}

interface BlockResponse {
  id: string;
  data: string;
  isExample: string;
  type: number;
  nextBlockId?: string | null;
  previousBlockId?: string | null;
  form: FormResponse;
}

interface FormResponse {
  id: string;
  data: string;
  date: string;
  isHidden: boolean;
  blockId: string;
}

interface FormsResponse {
  forms: FormResponse[];
  totalCount: number;
}

interface PageResponse {
  id: string;
  blocks: BlockResponse[];
}

interface ProfessorResponse {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  photo?: string | null;
  link?: string | null;
  position: string;
}

interface ProfessorsResponse {
  professors: ProfessorResponse[];
  totalCount: number;
}

interface ProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  yearOfStudyStart?: number | null;
  isActive: boolean;
  skills: SkillResponse[];
}

interface ProgramResponse {
  id: string;
  name: string;
  menu: string;
  isActive: boolean;
  pages: PageResponse[];
}

interface ReviewResponse {
  id: string;
  userId: string;
  programId: string;
  content: string;
  createdDate: string;
  isSelected: boolean;
}

interface SkillResponse {
  id: string;
  name: string;
}

interface TagResponse {
  id: string;
  name: string;
}

interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
}

interface GetUsersResponse {
  users: UserResponse[];
  totalCount: number;
}

interface WorkResponse {
  id: string;
  userId: string;
  programId: string;
  title: string;
  description: string;
  mainPhotoUrl: string;
  additionalPhotoUrls: string;
  tags: string;
  publishDate: string;
  course: number;
  isHide: boolean;
  tagList: TagResponse[];
  skillList: SkillResponse[];
  likesCount: number;
}

// API-клиент
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Эндпоинты для AdminsController
export const adminsApi = {
  addAdmin: async (id: string): Promise<void> => {
    await apiClient.put(`/Admins/AddAdmin/${id}`);
  },

  addProgramAdmin: async (request: AddProgramAdminRequest): Promise<void> => {
    await apiClient.post('/Admins/AddProgramAdmin', request);
  },

  getAdmins: async (): Promise<UserResponse[]> => {
    const response: AxiosResponse<UserResponse[]> = await apiClient.get('/Admins/GetAdmins');
    return response.data;
  },

  getUsers: async (request: GetUsersRequest): Promise<GetUsersResponse> => {
    const response: AxiosResponse<GetUsersResponse> = await apiClient.post('/Admins/GetUsers', request);
    return response.data;
  },

  removeAdmin: async (id: string): Promise<void> => {
    await apiClient.put(`/Admins/RemoveAdmin/${id}`);
  },

  removeProgramAdmin: async (request: RemoveProgramAdminRequest): Promise<void> => {
    await apiClient.post('/Admins/RemoveProgramAdmin', request);
  },
};

// Эндпоинты для FormsController
export const formsApi = {
  addForm: async (request: FormRequest): Promise<FormResponse> => {
    const response: AxiosResponse<FormResponse> = await apiClient.post('/Forms/AddForm', request);
    return response.data;
  },

  getForms: async (request: GetFormsRequest): Promise<FormsResponse> => {
    const response: AxiosResponse<FormsResponse> = await apiClient.post('/Forms/GetForms', request);
    return response.data;
  },

  hideForm: async (id: string): Promise<void> => {
    await apiClient.put(`/Forms/HideForm/${id}`);
  },

  hideForms: async (request: HideFormsRequest): Promise<void> => {
    await apiClient.post('/Forms/HideForms', request);
  },

  removeForm: async (id: string): Promise<void> => {
    await apiClient.delete(`/Forms/RemoveForm/${id}`);
  },

  removeForms: async (request: RemoveFormsRequest): Promise<void> => {
    await apiClient.post('/Forms/RemoveForms', request);
  },

  showForm: async (id: string): Promise<void> => {
    await apiClient.put(`/Forms/ShowForm/${id}`);
  },

  showForms: async (request: ShowFormsRequest): Promise<void> => {
    await apiClient.post('/Forms/ShowForms', request);
  },
};

// Эндпоинты для ProfessorsController
export const professorsApi = {
  addProfessor: async (request: AddProfessorRequest): Promise<ProfessorResponse> => {
    const response: AxiosResponse<ProfessorResponse> = await apiClient.post('/Professors/AddProfessor', request);
    return response.data;
  },

  addProfessorToProgram: async (request: AddProfessorToProgramRequest): Promise<void> => {
    await apiClient.post('/Professors/AddProfessorToProgram', request);
  },

  changeProfessorProgramPosition: async (request: ChangeProfessorProgramPositionRequest): Promise<void> => {
    await apiClient.post('/Professors/ChangeProfessorProgramPosition', request);
  },

  getProfessors: async (request: GetProfessorsRequest): Promise<ProfessorsResponse> => {
    const response: AxiosResponse<ProfessorsResponse> = await apiClient.post('/Professors/GetProfessors', request);
    return response.data;
  },

  removeProfessorFromProgram: async (request: RemoveProfessorFromProgramRequest): Promise<void> => {
    await apiClient.post('/Professors/RemoveProfessorFromProgram', request);
  },

  updateProfessor: async (request: UpdateProfessorRequest): Promise<void> => {
    await apiClient.put('/Professors/UpdateProfessor', request);
  },
};

// Эндпоинты для ProgramPagesController
export const programPagesApi = {
  addBlockToPage: async (request: AddBlockToPageRequest): Promise<BlockResponse> => {
    const response: AxiosResponse<BlockResponse> = await apiClient.post('/ProgramPages/AddBlockToPage', request);
    return response.data;
  },

  addProgram: async (request: AddProgramRequest): Promise<ProgramResponse> => {
    const response: AxiosResponse<ProgramResponse> = await apiClient.post('/ProgramPages/AddProgram', request);
    return response.data;
  },

  changeBlockPosition: async (request: ChangeBlockPositionRequest): Promise<void> => {
    await apiClient.post('/ProgramPages/ChangeBlockPosition', request);
  },

  deleteProgram: async (id: string): Promise<void> => {
    await apiClient.delete(`/ProgramPages/DeleteProgram/${id}`);
  },

  editBlock: async (request: EditBlockRequest): Promise<void> => {
    await apiClient.put('/ProgramPages/EditBlock', request);
  },

  editProgram: async (request: EditProgramRequest): Promise<void> => {
    await apiClient.put('/ProgramPages/EditProgram', request);
  },

  getPage: async (request: GetPageRequest): Promise<ProgramResponse> => {
    const response: AxiosResponse<ProgramResponse> = await apiClient.post('/ProgramPages/GetPage', request);
    return response.data;
  },

  getProgramMainPage: async (programId: string): Promise<ProgramResponse> => {
    const response: AxiosResponse<ProgramResponse> = await apiClient.get(`/ProgramPages/GetProgramMainPage/${programId}`);
    return response.data;
  },

  removeBlock: async (id: string): Promise<void> => {
    await apiClient.delete(`/ProgramPages/RemoveBlock/${id}`);
  },
};

// Эндпоинты для ReviewsController
export const reviewsApi = {
  addReview: async (request: AddReviewRequest): Promise<ReviewResponse> => {
    const response: AxiosResponse<ReviewResponse> = await apiClient.post('/Reviews/AddReview', request);
    return response.data;
  },

  getReviews: async (request: GetReviewsRequest): Promise<ReviewResponse[]> => {
    const response: AxiosResponse<ReviewResponse[]> = await apiClient.post('/Reviews/GetReviews', request);
    return response.data;
  },

  updateStudentReviews: async (request: UpdateStudentReviewsRequest): Promise<void> => {
    await apiClient.put('/Reviews/UpdateStudentReviews', request);
  },
};

// Эндпоинты для SkillsController
export const skillsApi = {
  addSkill: async (request: AddSkillRequest): Promise<SkillResponse> => {
    const response: AxiosResponse<SkillResponse> = await apiClient.post('/Skills/AddSkill', request);
    return response.data;
  },

  addSkillToUser: async (request: AddSkillToUserRequest): Promise<void> => {
    await apiClient.post('/Skills/AddSkillToUser', request);
  },

  addSkillToWork: async (request: AddSkillToWorkRequest): Promise<void> => {
    await apiClient.post('/Skills/AddSkillToWork', request);
  },

  getSkills: async (): Promise<SkillResponse[]> => {
    const response: AxiosResponse<SkillResponse[]> = await apiClient.get('/Skills/GetSkills');
    return response.data;
  },

  removeSkill: async (request: RemoveSkillRequest): Promise<void> => {
    await apiClient.delete('/Skills/RemoveSkill', request);
  },

  removeSkillFromUser: async (request: RemoveSkillFromUserRequest): Promise<void> => {
    await apiClient.post('/Skills/RemoveSkillFromUser', request);
  },

  removeSkillFromWork: async (request: RemoveSkillFromWorkRequest): Promise<void> => {
    await apiClient.post('/Skills/RemoveSkillFromWork', request);
  },

  updateSkill: async (request: UpdateSkillRequest): Promise<void> => {
    await apiClient.put('/Skills/UpdateSkill', request);
  },
};

// Эндпоинты для TagsController
export const tagsApi = {
  addTag: async (request: AddTagRequest): Promise<TagResponse> => {
    const response: AxiosResponse<TagResponse> = await apiClient.post('/Tags/AddTag', request);
    return response.data;
  },

  addTagToWork: async (request: AddTagToWorkRequest): Promise<void> => {
    await apiClient.post('/Tags/AddTagToWork', request);
  },

  getTags: async (): Promise<TagResponse[]> => {
    const response: AxiosResponse<TagResponse[]> = await apiClient.get('/Tags/GetTags');
    return response.data;
  },

  removeTag: async (request: RemoveTagRequest): Promise<void> => {
    await apiClient.delete('/Tags/RemoveTag', request);
  },

  removeTagFromWork: async (request: RemoveTagFromWorkRequest): Promise<void> => {
    await apiClient.post('/Tags/RemoveTagFromWork', request);
  },

  updateTag: async (request: UpdateTagRequest): Promise<void> => {
    await apiClient.put('/Tags/UpdateTag', request);
  },
};

// Эндпоинты для UsersController
export const usersApi = {
  createStudentProfile: async (request: CreateStudentProfileRequest): Promise<ProfileResponse> => {
    const response: AxiosResponse<ProfileResponse> = await apiClient.post('/Users/CreateStudentProfile', request);
    return response.data;
  },

  deleteProfile: async (userId: string): Promise<void> => {
    await apiClient.delete(`/Users/DeleteProfile/${userId}`);
  },

  getProfile: async (userId: string): Promise<ProfileResponse> => {
    const response: AxiosResponse<ProfileResponse> = await apiClient.get(`/Users/GetProfile/${userId}`);
    return response.data;
  },

  getProfiles: async (request: GetProfilesRequest): Promise<ProfileResponse[]> => {
    const response: AxiosResponse<ProfileResponse[]> = await apiClient.post('/Users/GetProfiles', request);
    return response.data;
  },

  hideProfile: async (request: HideProfileRequest): Promise<void> => {
    await apiClient.post('/Users/HideProfile', request);
  },

  showProfile: async (request: ShowProfileRequest): Promise<void> => {
    await apiClient.post('/Users/ShowProfile', request);
  },

  updateProfile: async (request: UpdateProfileRequest): Promise<void> => {
    await apiClient.put('/Users/UpdateProfile', request);
  },
};

// Эндпоинты для WorksController
export const worksApi = {
  addWork: async (request: AddWorkRequest): Promise<WorkResponse> => {
    const response: AxiosResponse<WorkResponse> = await apiClient.post('/Works/AddWork', request);
    return response.data;
  },

  getWorks: async (request: GetWorksRequest): Promise<WorkResponse[]> => {
    const response: AxiosResponse<WorkResponse[]> = await apiClient.post('/Works/GetWorks', request);
    return response.data;
  },

  hideWork: async (request: HideWorkRequest): Promise<void> => {
    await apiClient.post('/Works/HideWork', request);
  },

  likeWork: async (request: LikeWorkRequest): Promise<void> => {
    await apiClient.post('/Works/LikeWork', request);
  },

  showWork: async (request: ShowWorkRequest): Promise<void> => {
    await apiClient.post('/Works/ShowWork', request);
  },

  unlikeWork: async (request: UnlikeWorkRequest): Promise<void> => {
    await apiClient.post('/Works/UnlikeWork', request);
  },

  updateWork: async (request: UpdateWorkRequest): Promise<void> => {
    await apiClient.put('/Works/UpdateWork', request);
  },
};