{
  "openapi": "3.0.1",
  "info": {
    "title": "lending_skills_backend",
    "version": "1.0"
  },
  "paths": {
    "/api/Admins/AddAdmin/{id}": {
      "put": {
        "tags": [
          "Admins"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Admins/RemoveAdmin/{id}": {
      "put": {
        "tags": [
          "Admins"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Admins/GetAdmins": {
      "get": {
        "tags": [
          "Admins"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Admins/AddProgramAdmin": {
      "post": {
        "tags": [
          "Admins"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramAdminRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramAdminRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramAdminRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Admins/RemoveProgramAdmin": {
      "post": {
        "tags": [
          "Admins"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProgramAdminRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProgramAdminRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProgramAdminRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Admins/GetUsers": {
      "post": {
        "tags": [
          "Admins"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUsersRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUsersRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetUsersRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/GetUsersResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetUsersResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetUsersResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Forms/AddForm": {
      "post": {
        "tags": [
          "Forms"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FormRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/FormRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/FormRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/FormResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FormResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/FormResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Forms/GetForms": {
      "post": {
        "tags": [
          "Forms"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetFormsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetFormsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetFormsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/FormsResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FormsResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/FormsResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Forms/HideForm/{id}": {
      "put": {
        "tags": [
          "Forms"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Forms/HideForms": {
      "post": {
        "tags": [
          "Forms"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HideFormsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/HideFormsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/HideFormsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Forms/ShowForm/{id}": {
      "put": {
        "tags": [
          "Forms"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Forms/ShowForms": {
      "post": {
        "tags": [
          "Forms"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowFormsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowFormsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ShowFormsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Forms/RemoveForm/{id}": {
      "delete": {
        "tags": [
          "Forms"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Forms/RemoveForms": {
      "post": {
        "tags": [
          "Forms"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveFormsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveFormsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveFormsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Professors/GetProfessors": {
      "post": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfessorsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfessorsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfessorsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorsResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorsResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorsResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Professors/AddProfessor": {
      "post": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfessorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Professors/UpdateProfessor": {
      "put": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfessorRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfessorRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfessorRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Professors/RemoveProfessorFromProgram": {
      "post": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProfessorFromProgramRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProfessorFromProgramRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveProfessorFromProgramRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Professors/AddProfessorToProgram": {
      "post": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorToProgramRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorToProgramRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddProfessorToProgramRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Professors/ChangeProfessorProgramPosition": {
      "post": {
        "tags": [
          "Professors"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeProfessorProgramPositionRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeProfessorProgramPositionRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeProfessorProgramPositionRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/ProgramPages/GetProgramMainPage/{programId}": {
      "get": {
        "tags": [
          "ProgramPages"
        ],
        "parameters": [
          {
            "name": "programId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ProgramPages/GetPage": {
      "post": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetPageRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetPageRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetPageRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ProgramPages/AddBlockToPage": {
      "post": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddBlockToPageRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddBlockToPageRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddBlockToPageRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/BlockResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlockResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlockResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ProgramPages/ChangeBlockPosition": {
      "post": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeBlockPositionRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeBlockPositionRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ChangeBlockPositionRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/ProgramPages/EditBlock": {
      "put": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EditBlockRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/EditBlockRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/EditBlockRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/ProgramPages/RemoveBlock/{id}": {
      "delete": {
        "tags": [
          "ProgramPages"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/ProgramPages/AddProgram": {
      "post": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddProgramRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProgramResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ProgramPages/EditProgram": {
      "put": {
        "tags": [
          "ProgramPages"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EditProgramRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/EditProgramRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/EditProgramRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/ProgramPages/DeleteProgram/{id}": {
      "delete": {
        "tags": [
          "ProgramPages"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Reviews/GetReviews": {
      "post": {
        "tags": [
          "Reviews"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetReviewsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetReviewsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetReviewsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReviewResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReviewResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReviewResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Reviews/UpdateStudentReviews": {
      "put": {
        "tags": [
          "Reviews"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateStudentReviewsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateStudentReviewsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateStudentReviewsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Reviews/AddReview": {
      "post": {
        "tags": [
          "Reviews"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddReviewRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddReviewRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddReviewRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ReviewResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReviewResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReviewResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Skills/GetSkills": {
      "get": {
        "tags": [
          "Skills"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SkillResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SkillResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SkillResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Skills/AddSkill": {
      "post": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SkillResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SkillResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SkillResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Skills/UpdateSkill": {
      "put": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateSkillRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateSkillRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateSkillRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Skills/RemoveSkill": {
      "delete": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Skills/AddSkillToWork": {
      "post": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Skills/RemoveSkillFromWork": {
      "post": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Skills/AddSkillToUser": {
      "post": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddSkillToUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Skills/RemoveSkillFromUser": {
      "post": {
        "tags": [
          "Skills"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveSkillFromUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Tags/GetTags": {
      "get": {
        "tags": [
          "Tags"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TagResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TagResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TagResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Tags/AddTag": {
      "post": {
        "tags": [
          "Tags"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TagResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Tags/UpdateTag": {
      "put": {
        "tags": [
          "Tags"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTagRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTagRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTagRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Tags/RemoveTag": {
      "delete": {
        "tags": [
          "Tags"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Tags/AddTagToWork": {
      "post": {
        "tags": [
          "Tags"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagToWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagToWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddTagToWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Tags/RemoveTagFromWork": {
      "post": {
        "tags": [
          "Tags"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagFromWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagFromWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveTagFromWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users/GetProfiles": {
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfilesRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfilesRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetProfilesRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProfileResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProfileResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProfileResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Users/GetProfile/{userId}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Users/CreateStudentProfile": {
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateStudentProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateStudentProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateStudentProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Users/UpdateProfile": {
      "put": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users/HideProfile": {
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HideProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/HideProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/HideProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users/ShowProfile": {
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ShowProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users/DeleteProfile/{userId}": {
      "delete": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Works/GetWorks": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetWorksRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/GetWorksRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/GetWorksRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/Works/UpdateWork": {
      "put": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Works/AddWork": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/WorkResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/Works/HideWork": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HideWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/HideWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/HideWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Works/ShowWork": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ShowWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ShowWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Works/LikeWork": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LikeWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LikeWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LikeWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Works/UnlikeWork": {
      "post": {
        "tags": [
          "Works"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UnlikeWorkRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UnlikeWorkRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UnlikeWorkRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AddBlockToPageRequest": {
        "type": "object",
        "properties": {
          "pageId": {
            "type": "string",
            "format": "uuid"
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "isExample": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "integer",
            "format": "int32"
          },
          "afterBlockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddProfessorRequest": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "photo": {
            "type": "string",
            "nullable": true
          },
          "link": {
            "type": "string",
            "nullable": true
          },
          "position": {
            "type": "string",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddProfessorToProgramRequest": {
        "type": "object",
        "properties": {
          "professorId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "afterProfessorId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "AddProgramAdminRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "AddProgramRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "menu": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddReviewRequest": {
        "type": "object",
        "properties": {
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "content": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddSkillRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddSkillToUserRequest": {
        "type": "object",
        "properties": {
          "skillId": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "AddSkillToWorkRequest": {
        "type": "object",
        "properties": {
          "skillId": {
            "type": "string",
            "format": "uuid"
          },
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "AddTagRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AddTagToWorkRequest": {
        "type": "object",
        "properties": {
          "tagId": {
            "type": "string",
            "format": "uuid"
          },
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "AddWorkRequest": {
        "type": "object",
        "properties": {
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "mainPhotoUrl": {
            "type": "string",
            "nullable": true
          },
          "additionalPhotoUrls": {
            "type": "string",
            "nullable": true
          },
          "tags": {
            "type": "string",
            "nullable": true
          },
          "course": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "BlockResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "isExample": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "integer",
            "format": "int32"
          },
          "nextBlockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "previousBlockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "form": {
            "$ref": "#/components/schemas/FormResponse"
          }
        },
        "additionalProperties": false
      },
      "ChangeBlockPositionRequest": {
        "type": "object",
        "properties": {
          "blockId": {
            "type": "string",
            "format": "uuid"
          },
          "afterBlockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ChangeProfessorProgramPositionRequest": {
        "type": "object",
        "properties": {
          "professorId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "afterProfessorId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "CreateStudentProfileRequest": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "yearOfStudyStart": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "EditBlockRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "isExample": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "EditProgramRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "menu": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "FormRequest": {
        "type": "object",
        "properties": {
          "blockId": {
            "type": "string",
            "format": "uuid"
          },
          "data": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "FormResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "date": {
            "type": "string",
            "nullable": true
          },
          "isHidden": {
            "type": "boolean"
          },
          "blockId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "FormsResponse": {
        "type": "object",
        "properties": {
          "forms": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FormResponse"
            },
            "nullable": true
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "GetFormsRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "blockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "includeHidden": {
            "type": "boolean"
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "GetPageRequest": {
        "type": "object",
        "properties": {
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "includeExample": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "GetProfessorsRequest": {
        "type": "object",
        "properties": {
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "GetProfilesRequest": {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "searchQuery": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "GetReviewsRequest": {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "dateFrom": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "dateTo": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "GetUsersRequest": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "GetUsersResponse": {
        "type": "object",
        "properties": {
          "users": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserResponse"
            },
            "nullable": true
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "GetWorksRequest": {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "year": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "favorite": {
            "type": "boolean",
            "nullable": true
          },
          "showHidedWorks": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "HideFormsRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "blockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "formIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          },
          "fromDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "toDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "HideProfileRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "HideWorkRequest": {
        "type": "object",
        "properties": {
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "LikeWorkRequest": {
        "type": "object",
        "properties": {
          "workId": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "PageResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "blocks": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BlockResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ProfessorResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "photo": {
            "type": "string",
            "nullable": true
          },
          "link": {
            "type": "string",
            "nullable": true
          },
          "position": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ProfessorsResponse": {
        "type": "object",
        "properties": {
          "professors": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ProfessorResponse"
            },
            "nullable": true
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "ProfileResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "yearOfStudyStart": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "skills": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SkillResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ProgramResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "menu": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "pages": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PageResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RemoveFormsRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "blockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "formIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          },
          "fromDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "toDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RemoveProfessorFromProgramRequest": {
        "type": "object",
        "properties": {
          "professorId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "RemoveProgramAdminRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "RemoveSkillFromUserRequest": {
        "type": "object",
        "properties": {
          "skillId": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "RemoveSkillFromWorkRequest": {
        "type": "object",
        "properties": {
          "skillId": {
            "type": "string",
            "format": "uuid"
          },
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "RemoveSkillRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RemoveTagFromWorkRequest": {
        "type": "object",
        "properties": {
          "tagId": {
            "type": "string",
            "format": "uuid"
          },
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "RemoveTagRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ReviewResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "content": {
            "type": "string",
            "nullable": true
          },
          "createdDate": {
            "type": "string",
            "format": "date-time"
          },
          "isSelected": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "ShowFormsRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "blockId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "formIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          },
          "fromDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "toDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ShowProfileRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "ShowWorkRequest": {
        "type": "object",
        "properties": {
          "workId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "SkillResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "TagResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UnlikeWorkRequest": {
        "type": "object",
        "properties": {
          "workId": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateProfessorRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "UpdateProfileRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "yearOfStudyStart": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateSkillRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "oldName": {
            "type": "string",
            "nullable": true
          },
          "newName": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateStudentReviewsRequest": {
        "type": "object",
        "properties": {
          "reviewIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateTagRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "oldName": {
            "type": "string",
            "nullable": true
          },
          "newName": {
            "type": "string",
            "nullable": true
          },
          "programId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateWorkRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "mainPhotoUrl": {
            "type": "string",
            "nullable": true
          },
          "additionalPhotoUrls": {
            "type": "string",
            "nullable": true
          },
          "tags": {
            "type": "string",
            "nullable": true
          },
          "course": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "UserResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "patronymic": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "WorkResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "programId": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "mainPhotoUrl": {
            "type": "string",
            "nullable": true
          },
          "additionalPhotoUrls": {
            "type": "string",
            "nullable": true
          },
          "tags": {
            "type": "string",
            "nullable": true
          },
          "publishDate": {
            "type": "string",
            "format": "date-time"
          },
          "course": {
            "type": "integer",
            "format": "int32"
          },
          "isHide": {
            "type": "boolean"
          },
          "tagList": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TagResponse"
            },
            "nullable": true
          },
          "skillList": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SkillResponse"
            },
            "nullable": true
          },
          "likesCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      }
    }
  }
}