import departmentData from "@/services/mockData/departments.json";

class DepartmentService {
  constructor() {
    this.departments = [...departmentData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.departments];
  }

  async getById(id) {
    await this.delay(200);
    const department = this.departments.find(d => d.Id === id);
    if (!department) {
      throw new Error("Department not found");
    }
    return { ...department };
  }

  async create(departmentData) {
    await this.delay(400);
    const newId = Math.max(...this.departments.map(d => d.Id)) + 1;
    const newDepartment = {
      ...departmentData,
      Id: newId
    };
    this.departments.unshift(newDepartment);
    return { ...newDepartment };
  }

  async update(id, departmentData) {
    await this.delay(300);
    const index = this.departments.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Department not found");
    }
    this.departments[index] = { ...departmentData, Id: id };
    return { ...this.departments[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.departments.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Department not found");
    }
    this.departments.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new DepartmentService();