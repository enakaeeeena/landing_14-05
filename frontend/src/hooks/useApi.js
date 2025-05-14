import { useState, useCallback } from "react";
import { API_URL } from "../config";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error response data:", errorData);
      console.error("Error response status:", response.status);
      console.error(
        "Error response headers:",
        Object.fromEntries(response.headers.entries())
      );

      let errorMessage = "Произошла ошибка при выполнении запроса";

      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.errors) {
        // Если errors это объект, преобразуем его в строку
        if (typeof errorData.errors === "object") {
          const errorMessages = Object.entries(errorData.errors)
            .map(
              ([key, value]) =>
                `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
            )
            .join("; ");
          errorMessage = errorMessages || errorData.title || errorMessage;
        } else if (Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.join(", ");
        }
      } else if (errorData.title) {
        errorMessage = errorData.title;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    return response;
  };

  const get = useCallback(async (endpoint) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return handleResponse(response);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const post = useCallback(async (endpoint, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const put = useCallback(async (endpoint, data) => {
    try {
      setLoading(true);
      setError(null);
      console.log("PUT request:", {
        url: `${API_URL}${endpoint}`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("PUT response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      return handleResponse(response);
    } catch (err) {
      console.error("PUT error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const del = useCallback(async (endpoint) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return handleResponse(response);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};
