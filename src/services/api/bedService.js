import bedData from "@/services/mockData/beds.json";

class BedService {
  constructor() {
    this.beds = [...bedData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.beds];
  }

  async getById(id) {
    await this.delay(200);
    const bed = this.beds.find(b => b.Id === id);
    if (!bed) {
      throw new Error("Bed not found");
    }
    return { ...bed };
  }

  async create(bedData) {
    await this.delay(400);
    const newId = Math.max(...this.beds.map(b => b.Id)) + 1;
    const newBed = {
      ...bedData,
      Id: newId
    };
    this.beds.unshift(newBed);
    return { ...newBed };
  }

  async update(id, bedData) {
    await this.delay(300);
    const index = this.beds.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Bed not found");
    }
    this.beds[index] = { ...bedData, Id: id };
    return { ...this.beds[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.beds.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Bed not found");
    }
    this.beds.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new BedService();