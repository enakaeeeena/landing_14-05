import axios, { AxiosResponse } from 'axios';

// Base API URL - you may need to adjust this based on your environment
const API_BASE_URL = '/api';

// Type definitions based on the schema
interface UUID {
  [key: string]: string;
}

// Response types
interface UserResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
}

interface GetUsersResponse {
  users?: UserResponse[];
  totalCount: number;
}

interface FormResponse {
  id: string;
  data?: string;
  date?: string;
  isHidden: boolean;
  blockId: string;
}

interface FormsResponse {
  forms?: FormResponse[];
  totalCount: number;
}

interface BlockResponse {
  id: string;
  data?: string;
  isExample?: string;
  type: number;
  nextBlockId?: string;
  previousBlockId?: string;
  form: FormResponse;
}

interface PageResponse {
  id: string;
  blocks?: BlockResponse[];
}

interface ProgramResponse {
  id: string;
  name?: string;
  menu?: string;
  isActive: boolean;
  pages?: PageResponse[];
}

interface ProfessorResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  photo?: string;
  link?: string;
  position?: string;
}

interface ProfessorsResponse {
  professors?: ProfessorResponse[];
  totalCount: number;
}

interface ProfileResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  yearOfStudyStart?: number;
  isActive: boolean;
  skills?: SkillResponse[];
}

interface ReviewResponse {
  id: string;
  userId: string;
  programId: string;
  content?: string;
  createdDate: string;
  isSelected: boolean;
}

interface SkillResponse {
  id: string;
  name?: string;
}

interface TagResponse {
  id: string;
  name?: string;
}

interface WorkResponse {
  id: string;
  userId: string;
  programId: string;
  title?: string;
  description?: string;
  mainPhotoUrl?: string;
  additionalPhotoUrls?: string;
  tags?: string;
  publishDate: string;
  course: number;
  isHide: boolean;
  tagList?: TagResponse[];
  skillList?: SkillResponse[];
  likesCount: number;
}

// Request types
interface AddProgramAdminRequest {
  userId: string;
  programId: string;
  adminId: string;
}

interface RemoveProgramAdminRequest {
  userId: string;
  programId: string;
  adminId: string;
}

interface GetUsersRequest {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  pageNumber?: number;
  pageSize?: number;
}

interface FormRequest {
  blockId: string;
  data?: string;
}

interface GetFormsRequest {
  userId: string;
  programId?: string;
  blockId?: string;
  includeHidden: boolean;
  pageNumber?: number;
  pageSize?: number;
}

interface HideFormsRequest {
  userId: string;
  blockId?: string;
  formIds?: string[];
  fromDate?: string;
  toDate?: string;
}

interface ShowFormsRequest {
  userId: string;
  blockId?: string;
  formIds?: string[];
  fromDate?: string;
  toDate?: string;
}

interface RemoveFormsRequest {
  userId: string;
  blockId?: string;
  formIds?: string[];
  fromDate?: string;
  toDate?: string;
}

interface GetProfessorsRequest {
  programId?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  pageNumber?: number;
  pageSize?: number;
}

interface AddProfessorRequest {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  photo?: string;
  link?: string;
  position?: string;
  adminId: string;
  programId?: string;
}

interface UpdateProfessorRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  adminId: string;
}

interface RemoveProfessorFromProgramRequest {
  professorId: string;
  programId: string;
  adminId: string;
}

interface AddProfessorToProgramRequest {
  professorId: string;
  programId: string;
  afterProfessorId?: string;
  adminId: string;
}

interface ChangeProfessorProgramPositionRequest {
  professorId: string;
  programId: string;
  afterProfessorId?: string;
  adminId: string;
}

interface GetPageRequest {
  programId: string;
  includeExample: boolean;
}

interface AddBlockToPageRequest {
  pageId: string;
  data?: string;
  isExample?: string;
  type: number;
  afterBlockId?: string;
}

interface ChangeBlockPositionRequest {
  blockId: string;
  afterBlockId?: string;
}

interface EditBlockRequest {
  id: string;
  data?: string;
  isExample?: string;
  type: number;
}

interface AddProgramRequest {
  name?: string;
  menu?: string;
}

interface EditProgramRequest {
  id: string;
  name?: string;
  menu?: string;
  isActive: boolean;
}

interface GetReviewsRequest {
  pageNumber: number;
  pageSize: number;
  programId?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface UpdateStudentReviewsRequest {
  reviewIds?: string[];
}

interface AddReviewRequest {
  programId: string;
  content?: string;
}

interface AddSkillRequest {
  name?: string;
  programId?: string;
}

interface UpdateSkillRequest {
  id?: string;
  oldName?: string;
  newName?: string;
  programId?: string;
}

interface RemoveSkillRequest {
  id?: string;
  name?: string;
  programId?: string;
}

interface AddSkillToWorkRequest {
  skillId: string;
  workId: string;
}

interface RemoveSkillFromWorkRequest {
  skillId: string;
  workId: string;
}

interface AddSkillToUserRequest {
  skillId: string;
  userId: string;
}

interface RemoveSkillFromUserRequest {
  skillId: string;
  userId: string;
}

interface AddTagRequest {
  name?: string;
  programId?: string;
}

interface UpdateTagRequest {
  id?: string;
  oldName?: string;
  newName?: string;
  programId?: string;
}

interface RemoveTagRequest {
  id?: string;
  name?: string;
  programId?: string;
}

interface AddTagToWorkRequest {
  tagId: string;
  workId: string;
}

interface RemoveTagFromWorkRequest {
  tagId: string;
  workId: string;
}

interface GetProfilesRequest {
  pageNumber: number;
  pageSize: number;
  programId?: string;
  searchQuery?: string;
}

interface CreateStudentProfileRequest {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  yearOfStudyStart?: number;
  programId?: string;
}

interface UpdateProfileRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  yearOfStudyStart?: number;
}

interface HideProfileRequest {
  userId: string;
}

interface ShowProfileRequest {
  userId: string;
}

interface GetWorksRequest {
  pageNumber: number;
  pageSize: number;
  year?: number;
  userId?: string;
  programId?: string;
  favorite?: boolean;
  showHidedWorks: boolean;
}

interface UpdateWorkRequest {
  id: string;
  programId: string;
  title?: string;
  description?: string;
  mainPhotoUrl?: string;
  additionalPhotoUrls?: string;
  tags?: string;
  course: number;
}

interface AddWorkRequest {
  programId: string;
  title?: string;
  description?: string;
  mainPhotoUrl?: string;
  additionalPhotoUrls?: string;
  tags?: string;
  course: number;
}

interface HideWorkRequest {
  workId: string;
}

interface ShowWorkRequest {
  workId: string;
}

interface LikeWorkRequest {
  workId: string;
  userId?: string;
}

interface UnlikeWorkRequest {
  workId: string;
  userId?: string;
}

// Admins Controller
export const AdminsController = {
  addAdmin: (id: string): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Admins/AddAdmin/${id}`);
  },
  
  removeAdmin: (id: string): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Admins/RemoveAdmin/${id}`);
  },
  
  getAdmins: (): Promise<AxiosResponse<UserResponse[]>> => {
    return axios.get(`${API_BASE_URL}/Admins/GetAdmins`);
  },
  
  addProgramAdmin: (request: AddProgramAdminRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Admins/AddProgramAdmin`, request);
  },
  
  removeProgramAdmin: (request: RemoveProgramAdminRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Admins/RemoveProgramAdmin`, request);
  },
  
  getUsers: (request: GetUsersRequest): Promise<AxiosResponse<GetUsersResponse>> => {
    return axios.post(`${API_BASE_URL}/Admins/GetUsers`, request);
  }
};

// Forms Controller
export const FormsController = {
  addForm: (request: FormRequest): Promise<AxiosResponse<FormResponse>> => {
    return axios.post(`${API_BASE_URL}/Forms/AddForm`, request);
  },
  
  getForms: (request: GetFormsRequest): Promise<AxiosResponse<FormsResponse>> => {
    return axios.post(`${API_BASE_URL}/Forms/GetForms`, request);
  },
  
  hideForm: (id: string): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Forms/HideForm/${id}`);
  },
  
  hideForms: (request: HideFormsRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Forms/HideForms`, request);
  },
  
  showForm: (id: string): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Forms/ShowForm/${id}`);
  },
  
  showForms: (request: ShowFormsRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Forms/ShowForms`, request);
  },
  
  removeForm: (id: string): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/Forms/RemoveForm/${id}`);
  },
  
  removeForms: (request: RemoveFormsRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Forms/RemoveForms`, request);
  }
};

// Professors Controller
export const ProfessorsController = {
  getProfessors: (request: GetProfessorsRequest): Promise<AxiosResponse<ProfessorsResponse>> => {
    return axios.post(`${API_BASE_URL}/Professors/GetProfessors`, request);
  },
  
  addProfessor: (request: AddProfessorRequest): Promise<AxiosResponse<ProfessorResponse>> => {
    return axios.post(`${API_BASE_URL}/Professors/AddProfessor`, request);
  },
  
  updateProfessor: (request: UpdateProfessorRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Professors/UpdateProfessor`, request);
  },
  
  removeProfessorFromProgram: (request: RemoveProfessorFromProgramRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Professors/RemoveProfessorFromProgram`, request);
  },
  
  addProfessorToProgram: (request: AddProfessorToProgramRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Professors/AddProfessorToProgram`, request);
  },
  
  changeProfessorProgramPosition: (request: ChangeProfessorProgramPositionRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Professors/ChangeProfessorProgramPosition`, request);
  }
};

// Program Pages Controller
export const ProgramPagesController = {
  getProgramMainPage: (programId: string): Promise<AxiosResponse<ProgramResponse>> => {
    return axios.get(`${API_BASE_URL}/ProgramPages/GetProgramMainPage/${programId}`);
  },
  
  getPage: (request: GetPageRequest): Promise<AxiosResponse<ProgramResponse>> => {
    return axios.post(`${API_BASE_URL}/ProgramPages/GetPage`, request);
  },
  
  addBlockToPage: (request: AddBlockToPageRequest): Promise<AxiosResponse<BlockResponse>> => {
    return axios.post(`${API_BASE_URL}/ProgramPages/AddBlockToPage`, request);
  },
  
  changeBlockPosition: (request: ChangeBlockPositionRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/ProgramPages/ChangeBlockPosition`, request);
  },
  
  editBlock: (request: EditBlockRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/ProgramPages/EditBlock`, request);
  },
  
  removeBlock: (id: string): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/ProgramPages/RemoveBlock/${id}`);
  },
  
  addProgram: (request: AddProgramRequest): Promise<AxiosResponse<ProgramResponse>> => {
    return axios.post(`${API_BASE_URL}/ProgramPages/AddProgram`, request);
  },
  
  editProgram: (request: EditProgramRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/ProgramPages/EditProgram`, request);
  },
  
  deleteProgram: (id: string): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/ProgramPages/DeleteProgram/${id}`);
  }
};

// Reviews Controller
export const ReviewsController = {
  getReviews: (request: GetReviewsRequest): Promise<AxiosResponse<ReviewResponse[]>> => {
    return axios.post(`${API_BASE_URL}/Reviews/GetReviews`, request);
  },
  
  updateStudentReviews: (request: UpdateStudentReviewsRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Reviews/UpdateStudentReviews`, request);
  },
  
  addReview: (request: AddReviewRequest): Promise<AxiosResponse<ReviewResponse>> => {
    return axios.post(`${API_BASE_URL}/Reviews/AddReview`, request);
  }
};

// Skills Controller
export const SkillsController = {
  getSkills: (): Promise<AxiosResponse<SkillResponse[]>> => {
    return axios.get(`${API_BASE_URL}/Skills/GetSkills`);
  },
  
  addSkill: (request: AddSkillRequest): Promise<AxiosResponse<SkillResponse>> => {
    return axios.post(`${API_BASE_URL}/Skills/AddSkill`, request);
  },
  
  updateSkill: (request: UpdateSkillRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Skills/UpdateSkill`, request);
  },
  
  removeSkill: (request: RemoveSkillRequest): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/Skills/RemoveSkill`, { data: request });
  },
  
  addSkillToWork: (request: AddSkillToWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Skills/AddSkillToWork`, request);
  },
  
  removeSkillFromWork: (request: RemoveSkillFromWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Skills/RemoveSkillFromWork`, request);
  },
  
  addSkillToUser: (request: AddSkillToUserRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Skills/AddSkillToUser`, request);
  },
  
  removeSkillFromUser: (request: RemoveSkillFromUserRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Skills/RemoveSkillFromUser`, request);
  }
};

// Tags Controller
export const TagsController = {
  getTags: (): Promise<AxiosResponse<TagResponse[]>> => {
    return axios.get(`${API_BASE_URL}/Tags/GetTags`);
  },
  
  addTag: (request: AddTagRequest): Promise<AxiosResponse<TagResponse>> => {
    return axios.post(`${API_BASE_URL}/Tags/AddTag`, request);
  },
  
  updateTag: (request: UpdateTagRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Tags/UpdateTag`, request);
  },
  
  removeTag: (request: RemoveTagRequest): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/Tags/RemoveTag`, { data: request });
  },
  
  addTagToWork: (request: AddTagToWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Tags/AddTagToWork`, request);
  },
  
  removeTagFromWork: (request: RemoveTagFromWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Tags/RemoveTagFromWork`, request);
  }
};

// Users Controller
export const UsersController = {
  getProfiles: (request: GetProfilesRequest): Promise<AxiosResponse<ProfileResponse[]>> => {
    return axios.post(`${API_BASE_URL}/Users/GetProfiles`, request);
  },
  
  getProfile: (userId: string): Promise<AxiosResponse<ProfileResponse>> => {
    return axios.get(`${API_BASE_URL}/Users/GetProfile/${userId}`);
  },
  
  createStudentProfile: (request: CreateStudentProfileRequest): Promise<AxiosResponse<ProfileResponse>> => {
    return axios.post(`${API_BASE_URL}/Users/CreateStudentProfile`, request);
  },
  
  updateProfile: (request: UpdateProfileRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Users/UpdateProfile`, request);
  },
  
  hideProfile: (request: HideProfileRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Users/HideProfile`, request);
  },
  
  showProfile: (request: ShowProfileRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Users/ShowProfile`, request);
  },
  
  deleteProfile: (userId: string): Promise<AxiosResponse<void>> => {
    return axios.delete(`${API_BASE_URL}/Users/DeleteProfile/${userId}`);
  }
};

// Works Controller
export const WorksController = {
  getWorks: (request: GetWorksRequest): Promise<AxiosResponse<WorkResponse[]>> => {
    return axios.post(`${API_BASE_URL}/Works/GetWorks`, request);
  },
  
  updateWork: (request: UpdateWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.put(`${API_BASE_URL}/Works/UpdateWork`, request);
  },
  
  addWork: (request: AddWorkRequest): Promise<AxiosResponse<WorkResponse>> => {
    return axios.post(`${API_BASE_URL}/Works/AddWork`, request);
  },
  
  hideWork: (request: HideWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Works/HideWork`, request);
  },
  
  showWork: (request: ShowWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Works/ShowWork`, request);
  },
  
  likeWork: (request: LikeWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Works/LikeWork`, request);
  },
  
  unlikeWork: (request: UnlikeWorkRequest): Promise<AxiosResponse<void>> => {
    return axios.post(`${API_BASE_URL}/Works/UnlikeWork`, request);
  }
};