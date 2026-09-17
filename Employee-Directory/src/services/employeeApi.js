const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001";

const API_URL = `${API_BASE_URL}/employees`;
const DEPARTMENT_API_URL =
  `${API_BASE_URL}/departments`;

export async function getEmployees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load employees.");
  }

  return response.json();
}

export async function getDepartments() {
  const response = await fetch(DEPARTMENT_API_URL);

  if (!response.ok) {
    throw new Error("Unable to load departments.");
  }

  return response.json();
}

export async function addEmployee(employee) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error("Unable to add employee.");
  }

  return response.json();
}

export async function updateEmployee(id, employee) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    }
  );

  if (!response.ok) {
    throw new Error("Unable to update employee.");
  }

  return response.json();
}

export async function deleteEmployee(id) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete employee.");
  }
}

export async function addDepartment(department) {
  const response = await fetch(
    DEPARTMENT_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(department)
    }
  );

  if (!response.ok) {
    throw new Error("Unable to add department.");
  }

  return response.json();
}

export async function deleteDepartment(id) {
  const response = await fetch(`${DEPARTMENT_API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Unable to delete department.");
  }
}

