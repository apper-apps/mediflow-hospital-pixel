import patientData from "@/services/mockData/patients.json";

class PatientService {
  constructor() {
    this.patients = [...patientData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.patients];
  }

  async getById(id) {
    await this.delay(200);
    const patient = this.patients.find(p => p.Id === id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return { ...patient };
  }

  async create(patientData) {
    await this.delay(400);
    const newId = Math.max(...this.patients.map(p => p.Id)) + 1;
    const newPatient = {
      ...patientData,
      Id: newId
    };
    this.patients.unshift(newPatient);
    return { ...newPatient };
  }

  async update(id, patientData) {
    await this.delay(300);
    const index = this.patients.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    this.patients[index] = { ...patientData, Id: id };
    return { ...this.patients[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.patients.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    this.patients.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new PatientService();