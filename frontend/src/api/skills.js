import api from "./config";

export const skillsApi = {
  // Get all skills
  getSkills: async () => {
    const response = await api.get("/api/Skills/GetSkills");
    return response.data;
  },

  // Add new skill
  addSkill: async (skillData) => {
    const response = await api.post("/api/Skills/AddSkill", skillData);
    return response.data;
  },

  // Update skill
  updateSkill: async (skillData) => {
    const response = await api.put("/api/Skills/UpdateSkill", skillData);
    return response.data;
  },

  // Remove skill
  removeSkill: async (skillData) => {
    const response = await api.delete("/api/Skills/RemoveSkill", {
      data: skillData,
    });
    return response.data;
  },

  // Add skill to work
  addSkillToWork: async (skillId, workId) => {
    const response = await api.post("/api/Skills/AddSkillToWork", {
      skillId,
      workId,
    });
    return response.data;
  },

  // Remove skill from work
  removeSkillFromWork: async (skillId, workId) => {
    const response = await api.post("/api/Skills/RemoveSkillFromWork", {
      skillId,
      workId,
    });
    return response.data;
  },

  // Add skill to user
  addSkillToUser: async (skillId, userId) => {
    const response = await api.post("/api/Skills/AddSkillToUser", {
      skillId,
      userId,
    });
    return response.data;
  },

  // Remove skill from user
  removeSkillFromUser: async (skillId, userId) => {
    const response = await api.post("/api/Skills/RemoveSkillFromUser", {
      skillId,
      userId,
    });
    return response.data;
  },
};
